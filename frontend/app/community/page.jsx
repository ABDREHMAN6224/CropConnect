"use client";
import { FooterSection } from "../../components";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { ToastContainer } from "react-toastify";
import useColorMode from "../../hooks/useColorMode";
import { FaSpinner } from "react-icons/fa";
import { SingleChat } from "./SingleChat";
import AuthWrapper from "../AuthWrapper";
import GenralHero from "../../components/GenralHero";

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
    <AuthWrapper>
      <NavBar />

      <main className="dark:bg-gray-900 w-full">
        <div className="p-4 mx-auto w-full max-w-screen-2xl">
          <GenralHero
            title={"Join Our Public Chats"}
            description={"Connect with fellow farmers, agronomists, and industry experts in our public chats. Share insights, ask questions, and stay updated on the latest trends in agriculture. Whether you're a novice or a seasoned professional, our community is a welcoming space for all who are passionate about farming and food production."}
            image={"/community.jpeg"}
            btnText={"Visit Chats"}
            link={"/community/chats"}
          />

              {loading && (
                <div className="flex justify-center items-center h-44">
                  <FaSpinner className="animate-spin h-10 w-10 text-primary-500" />
                </div>
              )}
          <section className="text-gray-600 body-font px-8 lg:px-16 w-full flex flex-col justify-center">

            <h1 className="title-font sm:text-2xl mx-auto text-2xl text-center mb-4 font-medium text-primary-900 underline underline-offset-auto dark:text-primary-500">
              Join Our Public Chats
            </h1>
              
            <div className="w-full mx-auto flex md:flex-row flex-col items-center flex-wrap">
             {publicChats.map((chat) => (
                <SingleChat key={chat.id} chat={chat} setChats={setPublicChats} joined={chat?.joined || chat.members.includes(user._id)} />
              ))
            }
            {publicChats.length === 0 && !loading && (
              <div className="text-center w-full">
                <p className="text-lg">No public chats available</p>
              </div>
            )}
            </div>
            

            
          </section>
        </div>
      </main>
      <FooterSection />
      <ToastContainer theme={colorMode} />
    </AuthWrapper>
  );
};

export default CommunityPage;

