"use client";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../app/utils/constants";
import {FaChevronCircleLeft,FaChevronCircleRight} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
const CustomerFeedbacksSection = () => {

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    fetch(`${BACKEND_URL}/feedback/`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setCurrentSlide(Math.floor(data.length/2))
      });
  }, []);

  return (
    <section className="text-gray-600 body-font px-2 sm:px-8 lg:px-16 w-full flex justify-center" id="feedback-section">
      <div className="w-full mx-auto flex  py-24 md:flex-row flex-col items-center flex-wrap">
        <h1 className={`text-3xl font-medium title-font text-primary-900 mb-12 text-center  mx-auto dark:text-primary-500
        ${inView ? "animate-fromBottom" : "opacity-0"}`}
          ref={ref}
        >
          Customer Feedbacks
        </h1>
        <div className={`flex flex-wrap w-full  h-[46rem] sm:h-[35rem] md:h-96 items-center justify-center relative -m-4 overflow-hidden
        ${inView2 ? "animate-fromBottom" : "opacity-0"}`}
          ref={ref2}
        >

          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-50 p-2 rounded-full z-10"
            onClick={() => {
              if(currentSlide>0){
                setCurrentSlide(currentSlide - 1);
              }
              else{
                setCurrentSlide(feedbacks.length-1);
              }

            }}
          >
            <FaChevronCircleLeft className="text-3xl text-gray-400" />
          </button>

          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-50 p-2 rounded-full z-10"
            onClick={() => {
              if(currentSlide<feedbacks.length-1){
                setCurrentSlide(currentSlide + 1);
              }
              else{
                setCurrentSlide(0);
              }
            }}
          >
            <FaChevronCircleRight className="text-3xl text-gray-400" />
          </button>
          {feedbacks.map((feedback,idx) => {
            
          return <div className="p-4 lg:w-2/3 w-full absolute shadow-lg rounded-md bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700" key={idx}
            style={{
              transform: `translateX(${idx - currentSlide}00%) scale(${idx === currentSlide ? 1 : 0.8})`,
              transition: "all 0.5s ease",
              backgroundColor: idx === currentSlide ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
            }}
          >
            <div className="h-full p-8 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="block w-5 h-5 text-gray-400 mb-4"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
              </svg>
              <p className="leading-relaxed mb-6">
                {feedback.feedback}
              </p>
              <a className="inline-flex items-center ">
                <img
                  alt="testimonial"
                  src={feedback.user.avatar}
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center border-primary-500 p-1 border"
                />
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                    {feedback.user.name}
                  </span>
                  <span className="text-gray-500 text-sm">Farmer</span>
                </span>
              </a>
            </div>
          </div>
        })}
        </div>{" "}
      </div>
    </section>
  );
};

export default CustomerFeedbacksSection;
