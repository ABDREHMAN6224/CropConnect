import Link from "next/link";
import React from "react";
import { useState } from "react";
import AddAdminModal from "./AddAdminModal";
const dummyBlogs = [
  {
    id: 1,
    title: "Blog 1",
    owner: "Owner 1",
    createdAt: "2021-09-01",
    status: "Pending",
  },
];
const dummyEventsData = [
  {
    id: 1,
    title: "Event 1",
    participant: "Participant 1",
  },
];
const Approvals = () => {
  const [cur, setCur] = useState("blogs");

  const theads =
    cur == "blogs"
      ? ["ID", "Owner", "Created At", "Status", "Actions"]
      : ["ID", "Event Name", "Participant", "Actions"];
  return (
    <div>
      <div className="flex my-8 justify-between">
        <h1 className="text-2xl font-semibold">Approvals</h1>
      </div>

      <div className="flex gap-4">
        {['blogs', 'events'].map((tab, index) => (
          <div
            key={index}
            onClick={() => setCur(tab)}
            className={`cursor-pointer font-semibold ${
              cur === tab
                ? "text-primary-600 dark:text-white border-primary-900"
                : "text-gray-600 dark:text-white"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      <table className="divide-y divide-gray-300 w-full">
        <thead className=" bg-slate-100">
          <tr>
            {theads.map((title) => (
              <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300 "></tbody>
        {cur == "blogs"
          ? dummyBlogs.map((blog) => (
              <tr key={blog.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.owner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link
                    href={"/blog" + blog?.id}
                    className="bg-blue-500 hover:bg-blue-700 text-white mx-2 font-bold py-2 px-4 rounded"
                  >
                    View
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-green-500 hover:bg-green-700 text-white mx-2 font-bold py-2 px-4 rounded"
                  >
                    Approve
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-red-500 hover:bg-red-700 text-white mx-2 font-bold py-2 px-4 rounded"
                  >
                    Reject
                  </Link>
                </td>
              </tr>
            ))
          : dummyEventsData.map((eventData) => (
              <tr key={eventData.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {eventData.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {eventData.participant}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {eventData.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link
                    href={"/"}
                    className="bg-green-500 hover:bg-green-700 text-white mx-2 font-bold py-2 px-4 rounded"
                  >
                    Approve
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-red-500 hover:bg-red-700 text-white mx-2 font-bold py-2 px-4 rounded"
                  >
                    Reject
                  </Link>
                </td>
              </tr>
            ))}
      </table>
    </div>
  );
};

export default Approvals;
