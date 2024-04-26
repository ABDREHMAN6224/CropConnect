import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/FooterSection";
// import missionImg from "./mission.jpeg"
// import visionImg from "./vision.jpeg"

const page = () => {
  return (
    <div className="flex flex-col">
      <NavBar />

    {/* about section */}
    <section className="bg-white dark:bg-gray-900 section-bg-2 min-h-[93vh] flex items-center justify-center">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <a href="/" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">Crop Connect is out! See what's new</span> 
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </a>
        <h1 className="mb-12 text-4xl font-extrabold tracking-tight leading-none text-primary-300  md:text-5xl lg:text-6xl dark:text-white">
            {/* main headline about crop connect */}
            Crop Connect: The Future of Agriculture 
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-100 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            {/* sub headline about crop connect */}
            Crop Connect: Your go-to hub for farming excellence. Shop, learn, and connect with a dynamic marketplace, informative resources, and a vibrant community of fellow enthusiasts. Discover new opportunities and insights, all in one place.        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a href="/" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Learn more
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <a href="/#contact-us" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-primary-700 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Contact us
            </a>  
        </div>
    </div>
</section>
    <section className="bg-white dark:bg-gray-900" id="our-mission">
    <div className="pt-12 px-4 mx-auto max-w-screen-2xl text-center lg:pt-16 lg:px-12">
        <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="mb-4 text-2xl font-medium tracking-tight leading-none text-primary-500 md:text-3xl lg:text-4xl dark:text-white underline underline-offset-8">
                Our Mission
            </h2>
        </div>
        <div className="flex items-center gap-3 justify-between mb-12 lg:mb-20">
            <div className="mb-8 lg:mb-16 w-1/4">
                <img className="object-cover sm:w-96 rounded-full shadow-lg sm:h-96" src="./mission.jpeg" alt="Our mission" />
            </div>
            <p className="w-3/4 mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16  dark:text-gray-400 text-left">
            Our mission at Crop Connect is to empower farmers and agricultural stakeholders worldwide by providing a comprehensive platform for commerce, education, and community building. We are dedicated to fostering innovation, sustainability, and inclusivity in agriculture, connecting individuals and businesses to resources, markets, and opportunities. Through collaboration, knowledge-sharing, and technological advancements, we aim to drive positive change and enhance the resilience and productivity of the global farming community.
            </p>

    </div>
    </div>
</section>

    
    <section className="bg-white dark:bg-gray-900" id="our-vision">
    <div className="pb-12 px-4 mx-auto max-w-screen-2xl text-center lg:pb-16 lg:px-12">
        <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="mb-4 text-2xl font-medium tracking-tight leading-none text-primary-500 md:text-3xl lg:text-4xl dark:text-white underline underline-offset-8">
                Our Vision
            </h2>
        </div>
        <div className="flex items-center gap-3 justify-between mb-12 lg:mb-20 ">
            <p className="w-3/4 mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16  dark:text-gray-400 text-left">
            Our vision at Crop Connect is to revolutionize the agricultural industry by fostering innovation, collaboration, and sustainability. We envision a future where every farmer has access to cutting-edge technologies, comprehensive resources, and a supportive community, ensuring a prosperous and sustainable global food system. Through our platform, we strive to empower farmers to achieve economic success, environmental stewardship, and social equity, creating a more resilient and interconnected agricultural ecosystem for generations to come.

By leveraging the power of technology and collective knowledge, we are committed to driving positive change in agriculture, bridging gaps, and unlocking new opportunities that benefit both farmers and consumers alike.
            </p>
            <div className="mb-8 lg:mb-16 w-1/4">
                <img className="object-cover sm:w-96 rounded-full shadow-lg sm:h-96" src="./vision.jpeg" alt="Our vision" />
            </div>
        </div>
    </div>
</section>
      <Footer />

    </div>
  );
};

export default page;