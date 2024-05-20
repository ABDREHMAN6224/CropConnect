"use client";
import { BACKEND_URL } from "../utils/constants";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

export const SingleChat = ({ chat, joined = false, setChats }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const {ref:ref1, inView:inView1} = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

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
      ref={ref1}
      key={chat.id}
      className={`lg:flex-grow w-auto lg:w-1/3 py-4 px-8 gap-4  flex flex-col md:text-left md:mb-0 items-center justify-center text-center shadow-lg rounded-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${inView1 ? "animate-fromBottom" : "opacity-0"}`}
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
          className="w-8 h-8 rounded-full" />
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
};
