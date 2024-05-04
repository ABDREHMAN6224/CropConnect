"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ViewResourceModal = ({
    onClose,
    resource
}) => {
  const [activeImage, setActiveImage] = useState(0);

  const isImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
  }

  const isVideo = (url) => {
    return url.match(/\.(mp4|ogg|webm)$/) != null;
  }
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white dark:bg-gray-800 dark:text-gray-400 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* close icon */}
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              type="button"
              className="text-gray-700 hover:text-gray-500"
              aria-label="Close"
            >
              <FaTimes className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
            <div className="sm:flex sm:items-start">
              <div
                className="mt-3 text-center sm:mt-0  sm:text-left w-full modal-container-order"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h3 className="text-lg leading-6 mb-4 font-medium text-primary-900 text-center hover:text-primary-700">
                  View Resource
                </h3>
                <div className="mt-2 w-full">
                    <div className="flex w-full h-96">
                            <div className="flex flex-1  h-full overflow-hidden">
                                {resource.resources && resource.resources[activeImage] && isVideo(resource.resources[activeImage]) ? (
                                    <video className="object-contain object-center rounded w-full h-full" autoPlay loop controls>
                                        <source src={resource.resources[activeImage]} type="video/mp4"/>
                                        <source src={resource.resources[activeImage]} type="video/ogg"/>
                                        <source src={resource.resources[activeImage]} type="video/webm"/>
                                        Your browser does not support the video tag.
                                    </video>
                                ) :
                                <img alt="crop" className="object-contain object-center rounded flex-1 w-full h-full" src={resource.resources && resource.resources[activeImage]} />
                                }
                            </div>
                            <div className="flex gap-2 auto ml-4 h-full flex-col">
                                {resource.resources && resource.resources.map((image, index) => {
                                    return isVideo(image)?
                                        <video key={index} className={`object-cover object-center rounded w-24 h-24 ${index === activeImage ? "border-2 border-primary-500" : ""}`} autoPlay loop muted
                                            onClick={() => setActiveImage(index)}
                                        >
                                            <source src={image} type="video/mp4"/>
                                            <source src={image} type="video/ogg"/>
                                            <source src={image} type="video/webm"/>
                                            Your browser does not support the video tag.
                                        </video>
                                    :    <img key={index} alt="crop" className={`object-cover object-center rounded w-24 h-24 ${index === activeImage ? "border-2 border-primary-500" : ""}`} src={image} onClick={() => setActiveImage(index)} />
                                    
                                })}
                            </div>
                    </div>
                    {/* description */}
                    <div className="my-4 max-h-96 overflow-auto">
                        <h3 className="text-lg mb-4 underline underline-offset-8 leading-6  text-primary-900 text-left font-semibold hover:text-primary-700">
                            Description
                        </h3>
                        <p className="text-gray-600 dark:text-gray-500 text-md">
                            {resource.description}
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResourceModal;
