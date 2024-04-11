"use client";
import { useState } from "react";
import { useAppSelector } from "../../app/store/hooks";
import { formatDate } from "../../app/utils/general_utils";
import { FaTimes } from "react-icons/fa";
const ShowEventTicketModal = ({ event, onClose }) => {
  const { token } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
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
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full main-order-modal"
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
                <h3 className="text-lg leading-6 font-medium text-primary-900 text-center hover:text-primary-700">
                  Event Ticket
                </h3>
                <div className="mt-8">
                  <p className="text-sm text-gray-500">
                    Your ticket for the event has been generated successfully.
                  </p>
                </div>
                {/* show generated ticket using event data in proper ticket format */}
                {/* ticket has details of current user as in ticket */}
                <div className="mt-4">
                 
                  </div>
                  {/* ticket */}
                  <div className="mt-2 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Email:</strong> {user.email}
                        </p>

                        <p className="text-sm text-gray-500">
                                <strong>Event:</strong> {event.title}
                        </p>

                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Event Date:</strong> {formatDate(event.date)}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Event Time:</strong> {event?.time}
                      </p>
                    </div>


                  </div>
                  {
                    new Date(event.date) >= new Date() ? <></>
                    :
                    <div className="w-full flex items-center justify-center mt-4">
                        <p className="text-sm text-red-500">This ticket is no longer applicable as event date has passed.</p>
                    </div>
                  }
                    <div className="w-full flex items-center justify-center">
                        <button
                            onClick={onClose}
                            className="bg-primary-500 text-white px-4 py-2 w-full rounded-lg mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowEventTicketModal;
