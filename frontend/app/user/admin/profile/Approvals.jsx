import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import ViewBlogModal from "./blogModal";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../store/hooks";

const Approvals = () => {
  const [blogs, setBlogs] = useState([]);
  const [curBlog, setCurBlog] = useState('');

  const token = useAppSelector((state) => state.auth.token);
  const approveBlog = async (id) => {
    const response = await fetch(`http://localhost:5000/stories/status/approve/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      fetchPendingBlogs();
      toast.success("Blog approved successfully");
    }
  };
  const rejectBlog = async (id) => {
    const response = await fetch(`http://localhost:5000/stories/status/reject/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      fetchPendingBlogs();
      toast.success("Blog rejected successfully");
    }
  };

  
  const fetchPendingBlogs = async () => {
    const response = await fetch("http://localhost:5000/stories/status/pending", {
      method: "GET",
      headers: {
        "Content-Type": "application",
      },
    });
    const data = await response.json();
    if (response.ok) {
      setBlogs(data);
    }
  };
  console.log(blogs)
  useEffect(() => {
    fetchPendingBlogs();
  }, []);
  const theads = ["ID", "Owner", "Created At", "Status", "Actions"]
  return (
    <div>
      <div className="flex my-8 justify-between">
        <h1 className="text-2xl font-semibold">Approvals</h1>
      </div>

      <table className="divide-y divide-gray-300 w-11/12">
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
        {blogs.map((blog) => (
          <tr key={blog._id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {blog.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {blog.author.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {blog.createdAt}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {blog.status}
            </td>
            <td className=" flex px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button
              onClick={() => setCurBlog(blog._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white mx-2 font-bold py-2 px-4 rounded"
              >
                View
              </button>
              <button
                onClick={() => approveBlog(blog._id)} 
                className="bg-green-500 hover:bg-green-700 text-white mx-2 font-bold py-2 px-4 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => rejectBlog(blog._id)}
                className="bg-red-500 hover:bg-red-700 text-white mx-2 font-bold py-2 px-4 rounded"
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </table>
      {curBlog && <ViewBlogModal blog={blogs.find(blog=>blog._id==curBlog)} onClose={()=>setCurBlog('')}/>}
    </div> 
  );
};

export default Approvals;
