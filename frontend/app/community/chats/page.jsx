"use client";
import Box from "/components/message/Box";
import MessageInput from "/components/MessageInput";
import MessageMine from "/components/message/MessageMine";
import MessageOther from "/components/message/MessageOther";
import { FaPlus, FaUserPlus } from "react-icons/fa";
import { useSocket } from "/app/context/socketContext";
import { useAppSelector } from "/app/store/hooks";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "/app/store/hooks";
import { getAllChats } from "/app/store/chat/chat";
import { getUsers, updateFileteredUsers } from "../../store/users/users";
import { createCommunityChat, setRecentMessage } from "/app/store/chat/chat";
import { ToastContainer, toast } from "react-toastify";
import useColorMode from "/hooks/useColorMode";
import NavBar from "../../../components/NavBar";
import AuthWrapper from "../../AuthWrapper";

const serverUrl = "http://localhost:5000";

export default function Chats() {
  const [colorMode, _] = useColorMode();
  const msgRef = useRef(null);

  const { chats, communityChats } = useAppSelector((state) => state.chat);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { filteredUsers = [] } = useAppSelector((state) => state.users);
  const [chatEdit, setChatEdit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentChat, setCurrentChat] = useState(null);
  const [currentChatMessages, setCurrentChatMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("text");
  const [file, setFile] = useState(null);

  const socket = useSocket();
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([user]);

  const [notifications, setNotifications] = useState([]);
  const [groupNotifications, setGroupNotifications] = useState([]);

  const handleOpenChat = async (users, isGroup=false, chatId = null) => {
    setChatModalVisible(false);
    setLoader(true);
    const response = await fetch(`${serverUrl}/chats/create_chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        users,
        isGroup,
        chatId,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      socket.emit("chat:created", { chat: data.chat, user: user._id });
      dispatch(getAllChats());
      setCurrentChat(data.chat);
      if (data.chat.isGroup) {
        setGroupNotifications((n) => n.filter((id) => id !== data.chat._id));
      } else {
        setNotifications((n) => n.filter((id) => id !== data.chat._id));
      }
      setCurrentChatMessages(data.messages);
    } else {
      setError(data.message);
      toast.error(data.message);
    }
    setLoader(false);
    socket.emit("join:room", { room: data.chat._id, user: user._id });
  };



  useEffect(() => {
    dispatch(updateFileteredUsers(search));
  }, [search]);

  useEffect(() => {
    dispatch(updateFileteredUsers(search2));
  }, [search2]);

  const handleAddUsers = (user) => {
    setSelectedMembers([...selectedMembers, user]);
  };

  useEffect(()=>{
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        setChatModalVisible(false);
        setGroupModalVisible(false);
      }
    });
    
  },[])

  const handleCollapse = (id) => {
    const element = document.getElementById(id);
    if (element.style.display === "none") {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  };

  const sendMessage = async (message) => {
    const response = await fetch(`${serverUrl}/messages/sendMessage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: message,
    });
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      toast.error("Error sending message");
    }
  };

  useEffect(() => {
    if (file) {
      setMessage(file.name);
    }
  }, [file]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messgaeObj = {
      content: file ? URL.createObjectURL(file) : message,
      sender: user._id,
      chatData: currentChat,
      chat: currentChat._id,
      type: messageType,
    };
    const data = new FormData();
    data.append("file", file);
    data.append("content", message);
    data.append("chat", currentChat._id);
    data.append("sender", user._id);
    data.append("type", messageType);

    setCurrentChatMessages([...currentChatMessages, messgaeObj]);

    messgaeObj.sender = user;
    dispatch(
      setRecentMessage({ chatId: currentChat._id, message: messgaeObj })
    );

    socket.emit("send:message", {
      message: messgaeObj,
      chat: currentChat,
      sender: {
        _id: user._id,
        name: user.name,
      },
    });
    sendMessage(data);
    setMessage("");
    setFile(null);
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllChats());
    setCurrentUserId(user?._id);
  }, []);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const userId= search.get("userId");
    if(userId) handleOpenChat(userId, false, null);
    const grpChat = search.get("g_chatId");
    if(grpChat) {
      let ch = communityChats.find(chat => chat._id === grpChat);
      if(ch) {
        handleOpenChat(ch.members.map(member => member._id), true, ch._id);
      }

    };
    const chat_ = search.get("chatId");
    if(chat_) {
      let ch = chats.find(chat => chat._id === chat_);
      if(ch) {
        handleOpenChat(ch.members.map(member => member._id), false, ch._id);
      }
    };
    
  }, []);

  const handleGroupModalSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoader(true);
    dispatch(
      createCommunityChat({
        name: data.get("text"),
        members: selectedMembers.map((member) => member._id),
        isPublic: isPublic,
      })
    );
    if (!error) {
      setSearch("");
      setSearch2("");
      setIsPublic(false);
      setChatModalVisible(false);
      setGroupModalVisible(false);
      setLoader(false);
    }
  };

  const handleAddUser = async (user, groupId) => {
    const response = await fetch(`${serverUrl}/chats/add/${groupId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setCurrentChat((chat) => {
        return {
          ...chat,
          members: [...chat.members, user],
        };
      });
      socket.emit("chat:added", { user: user._id });

      toast.success("User added successfully");
    } else {
      toast.error(data.message);
      console.log(data);
    }
  };

  const handleRemoveUser = async (user, groupId) => {
    const response = await fetch(`${serverUrl}/chats/remove/${groupId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setCurrentChat((chat) => {
        return {
          ...chat,
          members: chat.members.filter((member) => member._id !== user._id),
        };
      });
      socket.emit("chat:removed", { chat: currentChat, user: user._id });

      toast.success("User removed successfully");
    } else {
      toast.error(data.message);
      console.log(data);
    }
  };

  useEffect(() => {
    setSelectedMembers([user]);
  }, [chatModalVisible, groupModalVisible]);

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [currentChatMessages, msgRef]);

  useEffect(() => {
    const handleNewMessage = (data) => {
      const { message: msg, chat } = data;
      dispatch(setRecentMessage({ chatId: chat._id, message: msg }));
      if (currentChat && chat._id === currentChat._id) {
        setCurrentChatMessages((m) => [...m, msg]);
      } else {
        if (chat.isGroup) {
          setGroupNotifications((n) => [...n, chat._id]);
        } else {
          setNotifications((n) => [...n, chat._id]);
        }
      }
    };

    const handleChatCeated = (chat) => {
      if (chat.isGroup) {
        if (communityChats.find((c) => c._id === chat._id)) {
          return;
        }
        dispatch(getAllChats());
      } else {
        if (chats.find((c) => c._id === chat._id)) {
          return;
        }
        dispatch(getAllChats());
      }
    };

    const handleChatRemoved = ({ chat }) => {
      toast.error(`admin removed you from ${chat.name}`);
      if (currentChat && chat._id === currentChat._id) {
        setCurrentChat(null);
        setCurrentChatMessages([]);
      }
      dispatch(getAllChats());
    };
    const hanldeChatAdded = () => {
      dispatch(getAllChats());
    };

    socket.on("receive:message", handleNewMessage);
    socket.on("chat:created", handleChatCeated);
    socket.on("chat:removed", handleChatRemoved);
    socket.on("chat:added", hanldeChatAdded);

    return () => {
      socket.off("receive:message", handleNewMessage);
      socket.off("chat:created", handleChatCeated);
      socket.off("chat:removed", handleChatRemoved);
      socket.off("chat:added", hanldeChatAdded);
    };
  }, [socket, currentChat, communityChats, chats]);

  return (
    <AuthWrapper>
    <div className="h-screen overflow-hidden flex flex-col">
      <NavBar />
      <section className="flex-1  antialiased text-gray-800 overflow-hidden dark:text-gray-200">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <aside className="flex flex-col py-8 pl-6 pr-2 w-72 bg-white flex-shrink-0 dark:bg-gray-800">
            <div className="flex flex-col gap-4 items-center mt-0 w-full py-6 px-4 rounded-lg">
              {/* <Link
          href="/"
          className="flex items-start space-x-3 rtl:space-x-reverse"
        >
          <span className="self-start text-2xl font-semibold whitespace-nowrap dark:text-white">
            CropConnect
          </span>
        </Link> */}

              <button
                className="flex flex-row items-center w-full p-2 px-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white"
                onClick={(e) => setChatModalVisible(true)}
              >
                <FaUserPlus className="text-white text-xl" />
                <span className="ml-2">Start a new chat</span>
              </button>
              <button
                className="flex flex-row items-center w-full p-2 px-3 rounded-xl bg-strokedark hover:bg-form-strokedark text-white"
                onClick={(e) => setGroupModalVisible(true)}
              >
                <FaPlus className="text-white text-xl" />
                <span className="ml-2">Create new Community</span>
              </button>
            </div>
            <div className="flex flex-col mt-8 overflow-y-scroll overflow-x-hidden">
              <div className="flex flex-row items-center justify-between text-xs">
                <span
                  className="font-bold cursor-pointer dark:text-white"
                  onClick={() => handleCollapse("dms")}
                >
                  Direct Messages
                </span>
                <span className="flex items-center justify-center bg-red-700 h-5 w-5 rounded-full text-white">
                  {notifications.length}
                </span>
              </div>
              <div className="flex flex-col" id="dms">
                {chats?.map((chat) => (
                  <Box
                    key={chat._id}
                    letter={
                      chat.members.find((user) => user._id !== currentUserId)
                        ?.name[0]
                    }
                    name={
                      chat.members.find((user) => user._id !== currentUserId)
                        ?.name
                    }
                    avatar={
                      chat.members.find((user) => user._id !== currentUserId)
                        ?.avatar
                    }
                    onClick={() =>
                      handleOpenChat(
                        chat.members
                          .filter((user) => user._id !== currentUserId)
                          .map((u) => u._id),
                        false,
                        null
                      )
                    }
                    highlight={chat._id === currentChat?._id}
                    chatBox={true}
                    recentMessage={
                      chat.recentMessage ? chat.recentMessage.content : ""
                    }
                    notification={notifications.includes(chat._id)}
                  />
                ))}
              </div>
              <div className="flex flex-row items-center justify-between text-xs mt-6">
                <span
                  className="font-bold cursor-pointer dark:text-white"
                  onClick={() => handleCollapse("communities")}
                >
                  Communities
                </span>
                <span className="flex items-center justify-center bg-red-700 h-5 w-5 rounded-full text-white">
                  {groupNotifications.length}
                </span>
              </div>
              <div className="flex flex-col" id="communities">
                {communityChats?.map((chat) => (
                  <Box
                    key={chat._id}
                    letter={chat.name.slice(0, 1).toUpperCase()}
                    name={chat.name}
                    onClick={() =>
                      handleOpenChat(
                        chat.members
                          .filter((user) => user._id !== currentUserId)
                          .map((u) => u._id),
                        true,
                        chat._id
                      )
                    }
                    highlight={chat._id === currentChat?._id}
                    chatBox={true}
                    recentMessage={
                      chat.recentMessage ? chat.recentMessage.content : ""
                    }
                    notification={groupNotifications.includes(chat._id)}
                  />
                ))}
              </div>
            </div>
          </aside>
          <div className="flex flex-col flex-auto h-full p-6">
            {loader ? (
              <div className="w-full h-full flex align-items-center justify-center">
                <div className="w-12 h-12 border-t-4 border-b-4 border-primary-500 rounded-full animate-spin m-auto"></div>
              </div>
            ) : (
              currentChat && (
                <div className="chat-box flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 dark:bg-gray-900">
                  <div className="flex flex-col h-full overflow-x-auto mb-4">
                    {/* create chat header */}
                    <div className="flex flex-row items-center justify-between p-2  rounded-xl bg-gray-100 shadow-sm sticky dark:bg-gray-800">
                      <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-xl font-bold">
                            {currentChat?.isGroup ? (
                              <Box
                                letter={currentChat.name[0].toUpperCase()}
                                name={currentChat.name}
                              />
                            ) : (
                              <Box
                                letter={
                                  currentChat?.members?.find(
                                    (user) => user._id !== currentUserId
                                  )?.name[0]
                                }
                                name={
                                  currentChat?.members?.find(
                                    (user) => user._id !== currentUserId
                                  )?.name
                                }
                                avatar={
                                  currentChat?.members?.find(
                                    (user) => user._id !== currentUserId
                                  )?.avatar
                                }
                              />
                            )}
                          </span>
                          {currentChat?.isGroup && (
                            <span className="text-xs text-gray-400">
                              {currentChat.members.length} members
                            </span>
                          )}
                        </div>
                      </div>

                      {/* add user icon */}

                      {/* edit and close btn */}
                      <div
                        className="flex flex-row items-center gap-2"
                        style={{
                          display:
                            currentChat?.isGroup &&
                            currentChat?.admin === user._id
                              ? "flex"
                              : "none",
                        }}
                      >
                        <button
                          className="flex items-center justify-center  hover:bg-primary-500 bg-primary-300 rounded-xl text-white px-4 py-2 flex-shrink-0"
                          onClick={(e) => setChatEdit(true)}
                        >
                          <span>Edit</span>
                          <span className="ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="12"
                              height="12"
                              viewBox="0 0 50 50"
                            >
                              <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>

                    <div
                      className="flex flex-col h-full  overflow-y-scroll overflow-x-hidden"
                      ref={msgRef}
                    >
                      <div className="grid grid-cols-12 gap-y-2 ">
                        {currentChatMessages.map((message) =>
                          message.sender === user._id ||
                          message.sender?._id === user._id ? (
                            <MessageMine
                              key={message._id}
                              letter={
                                message.sender.name
                                  ? message.sender.name[0]?.toUpperCase()
                                  : user.name[0].toUpperCase()
                              }
                              message={message.content}
                              type={message.type}
                            />
                          ) : (
                            <MessageOther
                              key={message._id}
                              letter={message.sender?.name[0]?.toUpperCase()}
                              message={message.content}
                              type={message.type}
                              avatar={
                                currentChat.isGroup && message.sender?.avatar
                              }
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2 h-16 rounded-xl bg-white w-full px-2 dark:bg-gray-800">
                    <form
                      className="flex flex-row items-center w-full"
                      onSubmit={handleSendMessage}
                    >
                      <div className="message-box flex-grow">
                        <MessageInput
                          value={message}
                          onChange={(e) => {
                            setMessageType("text");
                            setMessage(e.target.value);
                          }}
                          placeholder="Type your message..."
                          fileAllowed={true}
                          onFileChange={(e) => {
                            setMessageType("file");
                            setFile(e.target.files[0]);
                          }}
                          disabled={file !== null}
                          // required
                        />
                      </div>
                      <button
                        disabled={message.length<1}
                        type="submit"
                        className="flex items-center justify-center bg-primary-500 hover:bg-primary-600 rounded-xl text-white px-4 py-2 flex-shrink-0"
                      >
                        <span>Send</span>
                        <span className="ml-2">
                          <svg
                            className="w-4 h-4 transform rotate-45 -mt-px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
              )
            )}

            {!loader && !currentChat && (
              <div className="w-full h-full flex items-center justify-center flex-col gap-4">
                <span className="text-2xl font-bold text-primary-400">
                  Select a chat to start messaging
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Chat Modal */}
        <article
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`${
            !chatModalVisible && "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 left-0 right-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-500 bg-opacity-50 backdrop-blur-sm`}
        >
          <div className="absolute top-8 left-1/2 -translate-x-1/2 p-4 w-full max-w-md max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <header className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Select person you want to chat with
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={(e) => setChatModalVisible(!chatModalVisible)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </header>
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      User email
                    </label>

                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                      value={search2}
                      onChange={(e) => setSearch2(e.target.value)}
                    />
                    {/* show selected memberls along with input ahead of them */}
                  </div>
                  <div>
                    <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden max-h-72  ">
                      {filteredUsers
                        .filter((user) => {
                          return (
                            user._id !== currentUserId &&
                            !selectedMembers.includes(user)
                          );
                        })
                        .map((user) => (
                          <Box
                            key={user._id}
                            letter={user.name.slice(0, 1)}
                            name={user.name}
                            onClick={() => handleOpenChat(user._id, false)}
                          />
                        ))}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </article>

        {/* Group chat Modal */}
        <article
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`${
            !groupModalVisible && "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 left-0 right-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-500 bg-opacity-50 backdrop-blur-sm`}
        >
          <div className="absolute top-8 left-1/2 -translate-x-1/2 p-4 w-full max-w-md max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <header className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Select person you want to chat with
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={(e) => setGroupModalVisible(!groupModalVisible)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </header>
              <div className="p-4 md:p-5">
                <form
                  className="space-y-4"
                  action="#"
                  onSubmit={handleGroupModalSubmit}
                >
                  {/* make public check box */}
                  {user.role === "admin" && (
                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="checkbox"
                        name="isPublic"
                        id="isPublic"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-5 h-5 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white active:bg-primary-50c checked:bg-primary-500"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                      />
                      <label
                        htmlFor="isPublic"
                        className="block  text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Make public
                      </label>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Group Name
                    </label>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select users you want to add
                    </label>
                    <div className="flex flex-row gap-2 bg-gray-50 border-gray-300 flex-wrap">
                      {selectedMembers.map((member) => (
                        <button
                          className={`flex items-center cursor-pointer justify-center p-2 rounded-sm  w-fit text-xs ${
                            member._id !== user._id
                              ? "bg-primary-500 text-white"
                              : "bg-gray-300 text-gray-900"
                          }`}
                          onClick={() =>
                            setSelectedMembers(
                              selectedMembers.filter((user) => user !== member)
                            )
                          }
                          disabled={member._id === user._id}
                        >
                          {member.name.slice(0, 10)}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden max-h-72  ">
                    {filteredUsers
                      .filter((user) => {
                        return (
                          user._id !== currentUserId &&
                          !selectedMembers.includes(user)
                        );
                      })
                      .map((user) => (
                        <Box
                          key={user._id}
                          letter={user.name.slice(0, 1)}
                          name={user.name}
                          onClick={() => handleAddUsers(user)}
                        />
                      ))}
                  </div>
                  {selectedMembers.length > 1 && (
                    <button
                      className="flex flex-row items-center w-full p-2 px-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white justify-center"
                      type="submit"
                      disabled={loader}
                    >
                      <span className="ml-2">
                        {loader ? "Creating chat..." : "Create chat"}
                      </span>
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </article>

        {/* chat edit modal, where user can add members to group and remove them */}
        <article
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`${
            !chatEdit && "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 left-0 right-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-500 bg-opacity-50 backdrop-blur-sm`}
        >
          <div className="absolute top-8 left-1/2 -translate-x-1/2 p-4 w-full max-w-md max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <header className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit chat
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={(e) => setChatEdit(!chatEdit)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </header>
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                    >
                      {currentChat?.name}
                    </label>
                  </div>

                  {/* show current members with option to remove them */}
                  <div className="flex flex-row gap-2 items-center flex-wrap">
                    {currentChat?.members.map((member) => {
                      if (member._id !== user._id) {
                        return (
                          <div
                            className="flex flex-row items-center gap-2 bg-primary-500 rounded-md px-2 py-1 text-white cursor-pointer"
                            onClick={() => {
                              handleRemoveUser(member, currentChat._id);
                            }}
                          >
                            <span className="text-white text-sm">
                              {member.name}
                            </span>
                            <svg
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 64 64"
                              enable-background="new 0 0 64 64"
                            >
                              <g>
                                <line
                                  fill="none"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-miterlimit="10"
                                  x1="18.947"
                                  y1="17.153"
                                  x2="45.045"
                                  y2="43.056"
                                />
                              </g>
                              <g>
                                <line
                                  fill="none"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-miterlimit="10"
                                  x1="19.045"
                                  y1="43.153"
                                  x2="44.947"
                                  y2="17.056"
                                />
                              </g>
                            </svg>
                          </div>
                        );
                      } else {
                        // return user pill with grayish background and without remove icon
                        return null;
                      }
                    })}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select users you want to add
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Search users"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden max-h-72">
                    {filteredUsers
                      .filter((user) => {
                        return (
                          user._id !== currentUserId &&
                          !currentChat?.members.includes(user)
                        );
                      })
                      .map((user) => (
                        <Box
                          key={user._id}
                          letter={user.name.slice(0, 1)}
                          name={user.name}
                          onClick={() => {
                            handleAddUser(user, currentChat._id);
                          }}
                          addUserBox={true}
                          added={currentChat?.members.includes(user)}
                          loading={loading}
                        />
                      ))}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </article>

        {/* {loading && <Loader/>} */}
        <ToastContainer theme={colorMode} />
      </section>
    </div>
    </AuthWrapper>
  );
}
