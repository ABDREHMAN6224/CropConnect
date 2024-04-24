"use client";
import { BACKEND_URL } from "../app/utils/constants";
import { useAppSelector } from "../app/store/hooks";
import { toast, ToastContainer } from "react-toastify";
import  useColorMode  from "../hooks/useColorMode";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const ContactUsSection = () => {
    const [colorMode,_]=useColorMode();
    const user= useAppSelector((state) => state.user);
    const [loading,setLoading]=useState(false);
    const handleSubmit = (e) => {

        e.preventDefault()
        setLoading(true)
        const data = new FormData(e.target)
        const obj= {
            name: user.name,
            email: user.email,
            message: data.get('message')
        }
        const sendData = async () => {
            const response = await fetch(`${BACKEND_URL}/auth/contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            })
            const data_ = await response.json()
            console.log(data_);
            if(response.ok){
                toast.success('Message Sent Successfully')
            }else{
                
                toast.error('Message not Sent')
            
            }
            setLoading(false)
        }
        sendData()
    }
  return (
    <section className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center relative" id="contact-us">

        
     <div className="px-5 grid gap-8 grid-cols-1 md:grid-cols-2 py-24 items-center mx-auto text-primary-900 rounded-lg">
         <div className="flex flex-col justify-center">
             <div>
                 <h2 className="text-3xl sm:text-4xl font-medium leading-tight">
                     Lets talk about everything!
                 </h2>
             </div>
             <div className="mt-12 text-center rounded-lg  opacity-75 shadow-lg">
                 <img src="/crop_2.jpeg" alt="Contact" className="rounded-lg"/>
             </div>
         </div>
         <form onSubmit={handleSubmit}> 
             <div>
                 <span className="uppercase text-sm text-gray-600 font-bold">
                     Full Name
                 </span>
                 <input
                     className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
                     type="text"
                     placeholder="Enter your Name"
                     required
                     value={user.name}
                     disabled
                 />
             </div>
             <div className="mt-8">
                 <span className="uppercase text-sm text-gray-600 font-bold">
                     Email
                 </span>
                 <input
                     className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
                     type="email"
                     placeholder="Enter your email address"
                     required
                     value={user.email}
                     disabled
                 />
             </div>
             <div className="mt-8">
                 <span className="uppercase text-sm text-gray-600 font-bold">
                     Message
                 </span>
                 <textarea
                     className="w-full h-32 bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
                     placeholder="Enter your Message"
                     required
                    name="message"
                 ></textarea>
             </div>
             <div className="mt-8">
             <button 
             className="tracking-wide text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg w-full"
                     type="submit"
                     disabled={loading}
                 >
                    {loading && <FaSpinner className="animate-spin inline-block" />}{" "}
                     Send Message
                 </button>
             </div>
         </form>
      </div>
      <ToastContainer theme={colorMode}/>
    </section>
  );
};

export default ContactUsSection;
