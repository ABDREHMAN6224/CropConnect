"use client";
import { useRouter } from "next/navigation";
import NavBar from "../../../../components/NavBar";
import { useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../utils/constants";
import Link from "next/link";
import Analytics from "./analytics";
import { FaPlus } from "react-icons/fa";
import Footer from "../../../../components/FooterSection";
import { useSocket } from "../../../context/socketContext";
import { useNotification } from "../../../context/notificationContext";
import AddAdminModal from "./AddAdminModal";
import Approvals from "./Approvals";
export default function Profile() {
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth).token !== "";
  const { token } = useAppSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const socket = useSocket();
  const { createNotification } = useNotification();
  const user = useAppSelector((state) => state.user);
  const isAdmin = user.role.toLowerCase() === "admin";
  if (!isLoggedIn) {
    return router.push("/login");
  }
  if (!isAdmin) return router.push("/user/profile");

  const handleSubmit = (e) => {
    e.preventDefault();
    const makeAnnouncement = async () => {
      const response = await fetch(`${BACKEND_URL}/announcement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      if (response.ok) {
        socket.emit("notification:general", {
          content: `New announcement: ${title}`,
          category: "announcement",
          link: "/announcements",
          scope: "general" + new Date().getTime(),
        });
        setTitle("");
        setDescription("");
      }
    };
    makeAnnouncement();
  };
  return (
    <div className="">
      <NavBar />
      <main className="dark:bg-gray-900 overflow-auto ">
        <div className="container grid grid-cols-12 gap-4 max-w-screen-2xl mx-auto p-4">
          <div className="md:col-span-8 col-span-12">
            <div className=" m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Resources
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Handle resources from here.
                </p>
                <div className="flex gap-2">
                  <Link
                    href="/resources/create"
                    className="w-fit flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add resource &nbsp; <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
            <div className=" m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Events
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Handle events from here.
                </p>
                <div className="flex gap-2">
                  <Link
                    href="/events/create"
                    className="w-fit flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add event &nbsp; <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 col-span-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Make Announcement
                </h5>
              </a>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="name"
                    id="name"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Make Announcement
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="md:col-span-8 col-span-12">
            <Analytics />
            <Approvals />
          </div>
          <div className="md:col-span-4 col-span-12 mx-auto">
            <AddAdminModal />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
