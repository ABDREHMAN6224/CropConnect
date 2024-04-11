"use client";
import { FooterSection } from "../../components";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { toast, ToastContainer } from "react-toastify";
import useColorMode from "../../hooks/useColorMode";
import { FaSpinner } from "react-icons/fa";

const CommunityPage = () => {
  const router = useRouter();
  const [publicChats, setPublicChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAppSelector((state) => state.auth);
  const [colorMode, _] = useColorMode();
  const  user  = useAppSelector((state) => state.user);

  useEffect(() => {
    async function getPublicChats() {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/chats/community/public`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        let sortedData = data;
        sortedData.sort((a, b) => {
          if (a.members.includes(user._id)) return 1;
          return -1;
        });
        setPublicChats(sortedData);
    } else {
        setError(data.message);
      }
      setLoading(false);
    }
    getPublicChats();
  }, []);

  return (
    <>
      <NavBar />

      <main className="dark:bg-gray-900 w-full">
        <div className="p-4 mx-auto w-full max-w-screen-2xl">
          <section className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center">
            <div className="w-full mx-auto flex  py-24 md:flex-row flex-col items-center">
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-primary-900">
                  Dive into Our Thriving Farming
                  Community!
                </h1>
                <p className="mb-8 leading-relaxed text-md">
                  Welcome to our vibrant farming community! Here, we cultivate
                  connections, share insights, and nurture growth together.
                  Whether you're a seasoned farmer, an aspiring enthusiast, or
                  simply curious about the world of agriculture, this space is
                  yours to explore, learn, and thrive. Join us as we celebrate
                  the rich tapestry of farming life and delve into discussions,
                  tips, and stories that cultivate a brighter, greener future.
                </p>

                <div className="flex justify-center">
                  <button
                    className="inline-flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg"
                    onClick={()=>router.push('/community/chats')}
                  >
                   Community Chats
                  </button>
                </div>
              </div>
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
                <img
                  className="object-cover object-center rounded shadow-sm "
                  alt="crop-img"
                  src={"/community.jpeg"}
                />
              </div>
            </div>
          </section>

              {loading && (
                <div className="flex justify-center items-center h-44">
                  <FaSpinner className="animate-spin h-10 w-10 text-primary-500" />
                </div>
              )}
          <section className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center">
          {/* show all public communities with first letter of name as profile along with admin having name,email and avatar */}
            <div className="w-full mx-auto flex md:flex-row flex-col items-center flex-wrap">
              
             {publicChats.map((chat) => (
                <SingleChat key={chat.id} chat={chat} setChats={setPublicChats} joined={chat?.joined || chat.members.includes(user._id)} />
              ))
            }
            </div>
            

            
          </section>
        </div>
      </main>
      <FooterSection />
      <ToastContainer theme={colorMode} />
    </>
  );
};

export default CommunityPage;

const SingleChat = ({ chat,joined=false,setChats }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const joinPublicCommunity = async () => {
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}/chats/community/join/${chat._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setChats((prev) => prev.map((c) => (c.id === chat.id ? { ...c, joined: true } : c)));
      toast.success("Joined Community");
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  };

  return (
    <div
      key={chat.id}
      className="lg:flex-grow w-auto lg:w-1/3 py-4 px-8 gap-4  flex flex-col md:text-left md:mb-0 items-center justify-center text-center shadow-lg rounded-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex items-center self-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white text-xl uppercase">
        {chat.name[0]}
      </div>
      <p className="mb-2 leading-relaxed text-md">
        {chat.name}
        {/* chat no of members */}
        <span className="text-gray-500 text-sm block">{chat.members.length} members</span>
      </p>
      {/* admin name , avtar and email */}
      <div className="flex items-center justify-start gap-2">
        <img
          src={chat.admin.avatar}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col items-start">

        <span className="text-gray-500 text-sm">{chat.admin.name}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <button
        disabled={joined}
        onClick={joinPublicCommunity}
          className="inline-flex items-center text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg dark:bg-gray-800 dark:border-gray-700 disabled:opacity-60"
        >
          {loading && <FaSpinner className="animate-spin h-5 w-5 mr-3" />}
          {joined ? "Joined" : "Join Community"}
        </button>
      </div>
    </div>
  );
}