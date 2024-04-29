"use client";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../utils/constants";
import TextInput from "../../components/inputs/TextInput";
import {  FaSpinner, FaTrash } from "react-icons/fa";
import { useAppSelector } from "../store/hooks";
import { FooterSection } from "../../components";
import { generateStatusBadge } from "../utils/general_utils";
const BlogsPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const categories = ["All","Seeds", "Fertilizers", "Tools", "Plants"];
  const [search,setSearch] = useState("");
  const [myBlogs, setMyBlogs] = useState([]);
  const user = useAppSelector((state) => state.user);
  const {token} = useAppSelector((state) => state.auth);
  useEffect(() => {
    let filtered = blogs;
    if(category !== "All"){
      filtered = blogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase());
    }
    if(search){
      filtered = filtered.filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredBlogs(filtered);
  },[search,category]);

  useEffect(() => {
    async function getBlogs() {
      const response = await fetch(`${BACKEND_URL}/stories/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: "application/json",
        }
      });
      const data = await response.json();
      if (response.ok) {
        setBlogs(data);
        setFilteredBlogs(data);
        setLoading(false);
      }
    }
    async function getMyBlogs() {
      const response = await fetch(`${BACKEND_URL}/stories/user/stories/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: "application/json",
        }
      });
      const data = await response.json();
      if (response.ok) {
        setMyBlogs(data);
      }
    }
    getBlogs();
    getMyBlogs();
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
                  Dive into the World of Agriculture with Our Blogs
                  <br className="hidden lg:inline-block" />
                </h1>
                <p className="mb-8 leading-relaxed text-md">
                  Welcome to our blog section! Here, you can find a collection
                  of articles, stories, and insights from the field to help you
                  grow and succeed in agriculture. Our blogs cover a wide range
                  of topics, from industry trends and farming tips to personal
                  stories and experiences. So whether you're a seasoned farmer
                  or just starting out, we hope you'll find something here to
                  inform, inspire, and entertain you.
                </p>
                <div className="flex justify-center">
          <a className="inline-flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg"
            href="#my-blogs"
            >My Blogs</a>
          </div>
              </div>
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img
                  className="object-cover object-center rounded shadow-sm"
                  alt="crop-img"
                  src={"/success_stories.jpeg"}
                />
              </div>
            </div>
          </section>

            {/* categories filter and search*/}
        {blogs.length > 0 && 
            <div className="flex justify-center py-8 px-16 w-full">
            
              <div className="flex items-center gap-12 w-full justify-around">
                <div className="flex-1 items-center gap-4">

                <TextInput
                  label=""
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Blogs"
                  />
            </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block flex-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
        }
        {loading ? 
          <div className="flex justify-center items-center h-96">
            <FaSpinner className="animate-spin h-12 w-12 text-primary-600"/>
          </div>: blogs.length > 0 &&
          <section className="text-gray-600 body-font" id="blogs">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -mx-4 -my-8">
                {filteredBlogs.map((blog) => {
               return <div className="py-8 px-4 lg:w-1/3">
                  <div className="h-full flex items-start">
                    <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                      <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                        {new Date(blog.createdAt).toLocaleDateString('default',{month:"short"})}
                      </span>
                      <span className="font-medium text-lg text-gray-800 title-font leading-none">
                        {new Date(blog.createdAt).toLocaleDateString('default',{day:"2-digit"})}
                      </span>
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-primary-500 mb-1 uppercase">
                        {blog.category}
                      </h2>
                      <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                        {blog.title}
                      </h1>
                      <p className="leading-relaxed mb-5">
                        {blog.content.slice(0, 200)} {blog.content.length > 200 ? "..." : ""}
                        {" "} <a className="text-primary-500 cursor-pointer" onClick={() => router.push(`/blogs/${blog._id}`)}>Read More</a>
                      </p>
                      <a className="inline-flex items-center">
                        <img
                          alt="blog"
                          src={blog.author.avatar}
                          className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                        />
                        <span className="flex-grow flex flex-col pl-3">
                          <span className="title-font font-medium text-gray-900">
                            {blog.author.name}
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                })}
              </div>
            </div>
          </section>
        }
        {/* my blogs section also having section heading */}
        <section className="text-gray-600 body-font" id="my-blogs">
          <div className="container px-5 py-24 mx-auto">
            <h1 className="text-3xl mb-16 text-center text-primary-700 underline underline-offset-8 font-medium">My Blogs</h1>
            {myBlogs.length === 0 ?
            //   if no blogs show link to create blog
            <div className="flex justify-center items-center h-96">
              <h1 className="text-2xl text-gray-600">You have not created any blogs yet. <a className="text-primary-500 cursor-pointer hover:underline " onClick={() => router.push('/blogs/create')}>Create Blog</a></h1>
            </div>
              :
            
            <div className="flex flex-wrap -mx-4 -my-8">
              {myBlogs.map((blog) => {
             return <div className="py-8 px-4 lg:w-1/3">
                <div className="h-full flex items-start relative">
                  {/* on top right show delete icon */}
                  <span className="cursor-pointer absolute bottom-2 right-2 z-10" onClick={async () => {
                    const response = await fetch(`${BACKEND_URL}/stories/${blog._id}`, {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${token}`,
                        contentType: "application/json",
                      }
                    });
                    if(response.ok){
                      const updatedBlogs = myBlogs.filter((b) => b._id !== blog._id);
                      setMyBlogs(updatedBlogs);
                    }
                  }}>
                    <FaTrash className="text-red-500"/>
                  </span>
                  
                  <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                      {new Date(blog.createdAt).toLocaleDateString('default',{month:"short"})}
                    </span>
                    <span className="font-medium text-lg text-gray-800 title-font leading-none">
                      {new Date(blog.createdAt).toLocaleDateString('default',{day:"2-digit"})}
                    </span>
                  </div>
                  <div className="flex-grow pl-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-primary-500 mb-1 uppercase">
                      {blog.category}
                    </h2>
                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                      {blog.title}
                    </h1>
                    <p className="leading-relaxed mb-5">
                      {blog.content.slice(0, 200)} {blog.content.length > 200 ? "..." : ""}
                      {blog.status === "approved" ? 
                        <span className="text-primary-500 cursor-pointer" onClick={() => router.push(`/blogs/${blog._id}`)}>Read More</span>
                      :"" }
                    </p>
                    <a className="inline-flex items-center">
                      <img
                        alt="blog"
                        src={blog.author.avatar}
                        className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-3">
                        <span className="title-font font-medium text-gray-900">
                        {blog.author.name}
                        <span className="text-xs block">
                          {generateStatusBadge(blog.status)}
                        </span>
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              })}
            </div>
            }
          </div>
        </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default BlogsPage;
