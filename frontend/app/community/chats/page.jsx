"use client";
import Box from "/components/message/Box";
import MessageMine from "/components/message/MessageMine";
import MessageOther from "/components/message/MessageOther";
import { FaPlus, FaUserPlus } from "react-icons/fa";
<<<<<<< Updated upstream
import { useState } from "react";
import { useSocket } from "/app/context/socketContext";
import { useAppSelector } from "/app/store/hooks";
=======
import Image from "next/image";
import { useEffect, useState } from "react";
import {useSocket} from "/app/context/socketContext";
import { useAppSelector } from "/app/store/hooks";

>>>>>>> Stashed changes

export default function Chats() {
  const obj = useAppSelector((state) => state.chat);
  console.log(obj);

  const socket = useSocket();
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [groupModalVisible, setGroupModalVisible] = useState(false);

  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      setChatModalVisible(false);
      setGroupModalVisible(false);
    }
  });

  // useEffect(() => {
  // socket.emit("get:onlineUsers")
  // socket.on("onlineUsers", (data) => {
  //   console.log(data);
  //   })
  // },[])

  return (
    <section className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <aside className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="ml-2 font-bold text-2xl">HarvestHub Chats</div>
          </div>
          <div className="flex flex-col gap-4 items-center mt-4 w-full py-6 px-4 rounded-lg">
            <button
              className="flex flex-row items-center w-full p-2 px-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white"
              onClick={(e) => setChatModalVisible(!chatModalVisible)}
            >
              <FaUserPlus className="text-white text-xl" />
              <span className="ml-2">Start a new chat</span>
            </button>
            <button
              className="flex flex-row items-center w-full p-2 px-3 rounded-xl bg-strokedark hover:bg-form-strokedark text-white"
              onClick={(e) => setGroupModalVisible(!groupModalVisible)}
            >
              <FaPlus className="text-white text-xl" />
              <span className="ml-2">Create new group</span>
            </button>
          </div>
          <div className="flex flex-col mt-8 overflow-y-scroll overflow-x-hidden">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Direct Messages</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                1
              </span>
            </div>
            <div className="flex flex-col">
              <Box letter="H" name="Henry Boyd" />
              <Box letter="H" name="Henry Boyd" />
              <Box letter="H" name="Henry Boyd" />
              <Box letter="H" name="Henry Boyd" />
              <Box letter="H" name="Henry Boyd" />
            </div>
            <div className="flex flex-row items-center justify-between text-xs mt-6">
              <span className="font-bold">Communities</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                1
              </span>
            </div>
            <div className="flex flex-col h-full">
              <Box letter="H" name="Henry Boyd" />
              <Box letter="H" name="Henry Boyd" />
              <Box letter="H" name="Henry Boyd" />
              <Box letter="H" name="Henry Boyd" />
              <Box letter="H" name="Henry Boyd" />
            </div>
          </div>
        </aside>
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="chat-box flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  <MessageOther
                    letter="A"
                    message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsa commodi illum saepe numquam maxime asperiores voluptate sit, minima perspiciatis."
                  />
                  <MessageMine
                    letter="H"
                    message="Lorem ipsum dolor sit amet."
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 h-16 rounded-xl bg-white w-full px-2">
              <div className="message-box flex-grow">
                <textarea
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 pt-2 h-10 resize-none"
                  placeholder="Type your message..."
                  rows={1}
                ></textarea>
              </div>
              <button className="flex items-center justify-center bg-primary-500 hover:bg-primary-600 rounded-xl text-white px-4 py-2 flex-shrink-0">
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
            </div>
          </div>
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <Box letter="H" name="Henry Boyd" />
                  <Box letter="H" name="Henry Boyd" />
                  <Box letter="H" name="Henry Boyd" />
                  <Box letter="H" name="Henry Boyd" />
                  <p>Search results</p>
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
              <form className="space-y-4" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Group Name
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User email you want to add
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <Box letter="H" name="Henry Boyd" />
                  <Box letter="H" name="Henry Boyd" />
                  <Box letter="H" name="Henry Boyd" />
                  <Box letter="H" name="Henry Boyd" />
                  <p>Search results</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
