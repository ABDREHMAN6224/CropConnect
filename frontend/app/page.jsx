"use client";
import Link from "next/link";
import NavBar from "../components/NavBar";
import { useAppSelector } from "./store/hooks";
import { FaPlus } from "react-icons/fa";
import {HomePageHeroSection,ResourcesSection,CustomerFeedbacksSection,OurTeamSection,FooterSection,ContactUsSection, OurBlogsSection, OurEventsSection, OurCommunitySection, SuccessStories, OurMarketplaceSection} from "../components"
export default function Home() {
  const user = useAppSelector((state) => state.user);
  const isAdmin = user.role.toLowerCase() === "admin";


  return (
    <>
      <NavBar />
      <main className="dark:bg-gray-900 w-full relative">
      <HomePageHeroSection isAdmin={isAdmin}/>
        <div className=" p-4 max-w-screen-2xl mx-auto">
          {isAdmin &&
          <div className=" w-80 block mb-8 absolute top-10 left-10">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
          </div>
          }
          {isAdmin &&
          <div className=" w-80 block mb-8 absolute md:top-10 top-52 left-10 md:left-auto md:right-10">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
          }
          <ResourcesSection />
          <OurCommunitySection />
          <OurBlogsSection />
          <OurEventsSection/>
          <OurMarketplaceSection/> 
          <CustomerFeedbacksSection />
          <ContactUsSection />
          <OurTeamSection />
          <FooterSection />
        </div>
      </main>

    </>
  );
}
