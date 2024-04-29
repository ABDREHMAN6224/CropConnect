"use client";

import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import { BACKEND_URL } from "../../utils/constants";
import NavBar from "../../../components/NavBar";
import { FooterSection } from "../../../components";
import { FaSpinner } from "react-icons/fa";

export default function SingleBlogPage ({params}) {
    const [blogData, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeImage, setActiveImage] = useState(0)
    const router = useRouter()

    useEffect(() => {
        async function getBlog(){
            setLoading(true)
            const response = await fetch(`${BACKEND_URL}/stories/${params.id}`)
            const data = await response.json()
            if(response.ok){
                setBlog(data[0])
            }else{
                router.push("/blogs")
            }
            setLoading(false)
        }
        getBlog()
    }, [])
    useEffect(() => {
        console.log(blogData)
    },[blogData])
    return (
        <>
            <NavBar/>
            {loading && 
                <div className="flex justify-center items-center h-screen">
                    <FaSpinner className="animate-spin h-10 w-10 text-primary-500"/>
                </div>
            }
            {blogData && 
            <>
            
            <section className="relative h-72 px-8 lg:px-32 text-white overflow-hidden section-bg dark:bg-gray-900">
                <div className="relative z-10 flex flex-col justify-end items-start h-full text-left">
                    <div className="flex items-center w-full justify-between gap-3 max-w-screen-2xl px-8 lg:px-16">
                        <h1 className="text-5xl font-bold leading-tight mb-4">
                            {blogData.title}
                            {/* author name like in subscript */}
                            <span className="text-lg font-semibold text-gray-300 ml-4">by {blogData.author?.name}</span>

                        </h1>
                        <span className="bg-primary-500 text-gray-900 py-2 px-6 rounded-lg text-lg font-semibold">
                            {blogData.category}
                        </span>

                    </div>
                </div>
            </section>
            <section className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center max-w-screen-2xl mx-auto">
                <div className="w-full mx-auto flex  py-24 pt-12 md:flex-row flex-col items-start">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <p className="mb-8 leading-relaxed text-md">
                            {blogData.content}
                        </p>
                        <span className="text-gray-500 text-sm">Created At: {new Date(blogData.createdAt).toDateString()}</span>
                        <span className="text-gray-500 text-sm">Author Mail: {blogData.author?.email}</span>
                        {/* read more blogs "/blogs" */}
                        <div className="flex justify-center">
                            <button className="inline-flex text-white mt-24 bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg"
                                onClick={() => router.push('/blogs')}
                            >More Blogs</button>
                         </div>   
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 flex flex-col">
                        {/* <img className="object-cover object-center rounded shadow-sm" alt="crop-img" src={blog.files[0]}/> */}
                        <div className="flex justify-center overflow-hidden h-96">
                                <img alt="blog" className="object-cover object-center rounded w-full h-full" src={blogData.files && blogData.files[activeImage]} />
                            </div>
                            <div className="flex mt-2 gap-2">
                                {blogData.files && blogData.files.map((image, index) => (
                                    <img key={index} alt="ecommerce" className={`object-cover object-center rounded w-24 h-24 ${index === activeImage ? "border-2 border-primary-500" : ""}`} src={image} onClick={() => setActiveImage(index)} />
                                ))}
                            </div>
                    </div>
                </div>
            </section>
            </>
            }
            <FooterSection/>
        </>
    )
}

