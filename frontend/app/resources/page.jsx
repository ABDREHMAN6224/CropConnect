"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { BACKEND_URL } from "../utils/constants";
import { useAppSelector } from "../store/hooks";
import ViewResourceModal from "../../components/modals/ViewResourceModal";
import { FaChevronCircleRight } from "react-icons/fa";
import { FooterSection } from "../../components";
import AuthWrapper from "../AuthWrapper";

export default function ResourcesPage() {
  const [currentResource, setCurrentResource] = useState(null);
  const [openViewResourceModal, setOpenViewResourceModal] = useState(false);
  const [myResources, setResources] = useState([]);
  const {token} = useAppSelector((state) => state.auth);

  const isImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
  }

  const isVideo = (url) => {
    return url.match(/\.(mp4|ogg|webm)$/) != null;
  }

  useEffect(() => {
    async function getResources() {
      const response = await fetch(`${BACKEND_URL}/resources/all`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if(response.ok){
        setResources(data);
      }
      
    }
    getResources();
  }, []);

  return (
    <AuthWrapper>
      <NavBar />
      <main className="dark:bg-gray-900 w-full">
        <div className="p-4 mx-auto w-full max-w-screen-2xl">
        <section className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center">
          <div className="w-full mx-auto flex  py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-primary-900">
               Explore Our Resources
              </h1>
              <p className="mb-8 leading-relaxed text-md">
                Welcome to our resources, where we provide a wealth of information tailored for farmers and agricultural enthusiasts. Our dedicated team regularly updates this section with valuable resources, including guides, articles, tools, and insights to help you optimize your farming practices, enhance productivity, and stay updated with the latest trends in the agricultural industry. Whether you're a seasoned farmer or just starting out, our resources are designed to support you in achieving success and sustainability in your farming endeavors. Explore our collection and empower your farming journey today!
              </p>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img className="object-cover object-center rounded shadow-sm" alt="crop-img" src={"/crop_6.jpeg"}/>
            </div>
          </div>
        </section>

        {/* resources section, every resource will have view option wihch will open modal */}
        <section className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center">
          <div className="w-full mx-auto flex gap-4 md:flex-row flex-col items-center flex-wrap">
            {/* display all resources */}
            {myResources.map((resource) => (
              <div key={resource.id} className="lg:flex-grow w-auto lg:w-1/3 py-4 px-8 gap-4  flex flex-col md:items-start md:text-left md:mb-0 items-center text-center shadow-lg rounded-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between w-full h-48">

                {resource.resources[0] && isImage(resource.resources[2]) && (
                  <img className="object-cover object-center rounded shadow-sm" alt="crop-img" src={resource.resources[2]}/>
                )}

                {resource.resources[2] && isVideo(resource.resources[2]) && (
                  <video className="object-cover object-center rounded shadow-sm" autoPlay loop muted>
                    <source src={resource.resources[2]} type="video/mp4"/>
                    <source src={resource.resources[2]} type="video/ogg"/>
                    <source src={resource.resources[2]} type="video/webm"/>
                    Your browser does not support the video tag.
                  </video>
                )}
                </div>
                
                
                <p className="mb-8 leading-relaxed text-md">
                  {resource.description.slice(0, 200)} {resource.description.length > 200 ? "..." : ""}
                </p>
                <div className="flex justify-center">
                    <button className="inline-flex items-center text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg"
                      onClick={() => {
                        setCurrentResource(resource);
                        setOpenViewResourceModal(true);
                      }}
                    >
                      Learn More {<FaChevronCircleRight className="ml-2" />}
                    </button>
                </div>
              </div>
            ))}
         
          </div>
        </section>

        </div>
      </main>
      <FooterSection />
      {openViewResourceModal  && <ViewResourceModal
        onClose={() => setOpenViewResourceModal(false)}
        resource = {currentResource}
      />}
    </AuthWrapper>
  );
}
