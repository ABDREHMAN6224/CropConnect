"use client";

import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useAppSelector } from "../store/hooks";
import { BACKEND_URL } from "../utils/constants";
import { useRouter } from "next/navigation";

function FeedbackPage() {
    const user = useAppSelector((state) => state.user);
    const {token} = useAppSelector((state) => state.auth);
    const [feedback,setFeedback] = useState("");
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getFeedback = async () => {
            setLoading(true);
            const response = await fetch(`${BACKEND_URL}/feedback/my`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if(data){
                setFeedback(data.feedback);
            }
            setLoading(false);
        }
        getFeedback();
    }, []);

    const handleFeedback = async () => {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/feedback/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ feedback }),
        });
        const data = await response.json();
        setFeedback(data.feedback);
        setLoading(false);
        router.push("/");
    }
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="w-full h-full flex-1 flex items-center justify-center main-order-modal dark:bg-gray-900"
      >
        <div className="max-w-xl mx-auto mt-4 flex w-full flex-col border rounded-lg bg-white p-8 dark:bg-gray-900">
          <h2 className="title-font mb-1 text-lg font-medium text-green-500">
            Feedback
          </h2>
          <p className="mb-5 leading-relaxed text-gray-600">
            If you had any issues or you liked our product, please share with
            us!
          </p>
          <div className="mb-4">
            <label for="email" className="text-sm leading-7 text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded border border-gray-300 bg-white dark:bg-gray-800 dark:text-blue-100 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={user.email}
                disabled
            />
          </div>
          <div className="mb-4">
            <label for="message" className="text-sm leading-7 text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="h-44 w-full  rounded border border-gray-300 dark:bg-gray-800 dark:text-blue-100 py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <button className="rounded border-0 bg-primary-500 py-2 px-6 text-lg text-white hover:bg-primary-600 focus:outline-none disabled:opacity-50"
            disabled={feedback.length <= 4 || loading}
            onClick={handleFeedback}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
          <p className="mt-3 text-xs text-gray-500">
            Feel free to connect with us on social media platforms.
          </p>
        </div>{" "}
      </div>
    </div>
  );
}

export default FeedbackPage;
