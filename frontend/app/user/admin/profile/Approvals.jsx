import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import ViewBlogModal from "./blogModal";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../store/hooks";
import { useSocket } from "../../../context/socketContext";

const Approvals = () => {
  const [blogs, setBlogs] = useState([]);
  const [curBlog, setCurBlog] = useState('');
  const socket=useSocket();
  const token = useAppSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const approveBlog = async (id) => {
    setLoading(true);
    const response = await fetch(`http://localhost:5000/stories/status/approve/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      let blg = blogs.find(blog=>blog._id==id);
      toast.success("Blog approved successfully");
      socket.emit("notification:general", {
        content: `Your blog ${blg.title} has been approved and is now live`,
        category: "blog",
        link: `/blogs/${id}`,
        user: data.author._id,
        scope: "blog"+new Date().getTime(),
      });
      setBlogs(blogs.filter(blg=>blg._id!=id));
    }
    setLoading(false);
  };
  const rejectBlog = async (id) => {
    setLoading(true);
    const response = await fetch(`http://localhost:5000/stories/status/reject/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("Blog rejected successfully");
      let blog = blogs.find(blog=>blog._id==id);
      socket.emit("notification:general", {
        content: `Your blog ${blog.title} has been rejected`,
        category: "blog",
        link: `/blogs/`,
        user: data.author._id,
        scope: "blog"+new Date().getTime(),
      });
      setBlogs(blogs.filter(blog=>blog._id!=id));
    }
    setLoading(false);
  };

  
  const fetchPendingBlogs = async () => {
    const response = await fetch("http://localhost:5000/stories/status/pending", {
      method: "GET",
      headers: {
        "Content-Type": "application",
      },
    });
    const data = await response.json();
    console.log(data)
    if (response.ok) {
      setBlogs(data);
    }
  };
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
        <tbody className="bg-white divide-y dark:bg-slate-800 dark:text-white divide-gray-300 "></tbody>
        {blogs.map((blog) => (
          <tr key={blog._id}>
            <td className="px-6 py-4 whitespace-nowrap dark:bg-slate-800 dark:text-white text-sm text-gray-500">
              {blog.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap dark:bg-slate-800 dark:text-white text-sm text-gray-500">
              {blog.author.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap dark:bg-slate-800 dark:text-white text-sm text-gray-500">
              {blog.createdAt}
            </td>
            <td className="px-6 py-4 whitespace-nowrap dark:bg-slate-800 dark:text-white text-sm text-gray-500">
              {blog.status}
            </td>
            <td className=" flex px-6 py-4 whitespace-nowrap dark:bg-slate-800 dark:text-white text-sm text-gray-500">
              <button
              onClick={() => setCurBlog(blog._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white mx-2 font-bold py-2 px-4 rounded"
              >
                View
              </button>
              <button
                onClick={() => approveBlog(blog._id)} 
                className="bg-green-500 hover:bg-green-700 text-white mx-2 font-bold py-2 px-4 rounded"
              >    console.log(data)

                {loading ? "Loading..." : "Approve"}
              </button>
              <button
                onClick={() => rejectBlog(blog._id)}
                className="bg-red-500 hover:bg-red-700 text-white mx-2 font-bold py-2 px-4 rounded"
              >
                {loading ? "Loading..." : "Reject"}
              </button>
            </td>
          </tr>
        ))}
      </table>
      {blogs.length==0 && <div className="text-center text-xl font-medium my-8 text-primary-600">No pending approvals</div>}
      {curBlog && <ViewBlogModal blog={blogs.find(blog=>blog._id==curBlog)} onClose={()=>setCurBlog('')}/>}
    </div> 
  );
};

export default Approvals;
