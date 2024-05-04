"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/constants";
import NavBar from "../../components/NavBar";
import Footer from "../../components/FooterSection";

const page = () => {
    const [announcements, setAnnouncements] = useState([]);
    useEffect(() => {
        const fetchAnnouncements = async () => {
            const response = await fetch(`${BACKEND_URL}/announcement`);
            const data = await response.json();
            setAnnouncements(data.data.announcements);
        };
        fetchAnnouncements();
    }, []);
    // announceme thas title and description
  return (
    <div>
      <NavBar />
      <section className="container min-h-svh max-w-screen-2xl mx-auto p-4">
        <h1 className="text-2xl font-semibold underline-offset-auto">Announcements</h1>
        <div className="grid grid-cols-1 mt-12 gap-4">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-4"
            >
              <h2 className="text-xl text-primary-800 font-semibold">{announcement.title}</h2>
              <p className="text-primary-600 px-4">{announcement.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      
    </div>
  )
}

export default page
