import React from "react";
import { OurTeamSection } from "../../components";
import NavBar from "../../components/NavBar";
import Footer from "../../components/FooterSection";

const page = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <section
        className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center"
        id="our-team"
      >
        <div className="w-full mx-auto flex  py-24 md:flex-row flex-col items-center flex-wrap">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              About Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Meet the talented individuals behind Crop Connect, who are
              passionate about agriculture and technology. Our diverse team of
              developers, designers, and content creators is dedicated to
              providing you with the latest insights and innovations in the
              world of farming.
            </p>
          </div>
          <div className="flex w-full items-center justify-center gap-12 flex-wrap -m-2">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="/arehman.jpeg"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Abdul Rehman Memon
                  </h2>
                  <p className="text-gray-500">Full Stack Developer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="/arehman.jpeg"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Faakhir Ul hasan Zahid
                  </h2>
                  <p className="text-gray-500">Pull Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="text-gray-600 body-font px-8 lg:px-16 w-full flex justify-center"
        id="our-team"
      >
        <div className="w-full mx-auto flex  py-24 md:flex-row flex-col items-center flex-wrap">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Our Mission
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Meet the talented individuals behind Crop Connect, who are
              passionate about agriculture and technology. Our diverse team of
              developers, designers, and content creators is dedicated to
              providing you with the latest insights and innovations in the
              world of farming.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default page;
