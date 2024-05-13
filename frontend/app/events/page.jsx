"use client";

import { useEffect, useState } from "react";
import { FooterSection } from "../../components";
import NavBar from "../../components/NavBar";
import { BACKEND_URL } from "../utils/constants";
import { useAppSelector } from "../store/hooks";
import { formatDate } from "../utils/general_utils";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import useColorMode from "../../hooks/useColorMode";
import { toast, ToastContainer } from "react-toastify";
import AuthWrapper from "../AuthWrapper";
import GenralHero from "../../components/GenralHero";

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const { token } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);
  const [colorMode, _] = useColorMode();

  const isRegistered = (event) => {
    return event.users.includes(user._id);
  };

  useEffect(() => {
    const getUpcomingEvents = async () => {
      const response = await fetch(`${BACKEND_URL}/events/upcoming`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUpcomingEvents(data);
      }
    };
    const getPastEvents = async () => {
      const response = await fetch(`${BACKEND_URL}/events/past`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setPastEvents(data);
      }
    };
    getUpcomingEvents();
    getPastEvents();
  }, []);

  return (
    <AuthWrapper>
      <ToastContainer theme={colorMode} />
      <NavBar />
      <main className="dark:bg-gray-900 w-full">
        <div className="p-4 mx-auto w-full max-w-screen-2xl">
          <GenralHero
            title={"Cultivating Knowledge, Harvesting Connections"}
            description={"From workshops to webinars, our events offer insights, skills, and networking opportunities for enthusiasts and professionals alike. Register now for upcoming events and join a community passionate about sustainable farming practices and agricultural innovation."}
            image={"/events_3.jpeg"}
            btnText={"Read More"}
            link={"#past-events"}
          />
          {/* upcoming events */}

          <section className="body-font text-gray-500">
            <div className="flex flex-col text-center w-full">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-primary-900 mb-4">
                Upcoming Events
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Join us for upcoming events and connect with a community of
                farmers, agronomists, and industry experts.
              </p>
            </div>
            <div className="container px-5 py-24 mx-auto grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {upcomingEvents.map((event) => {
                return (
                  <SingleEvent
                    key={event.id}
                    event={event}
                    registered={isRegistered(event)}
                    past={false}
                    setEvents={setUpcomingEvents}
                  />
                );
              })}
            </div>
          </section>

          {/* past events */}
          {pastEvents.length > 0 && (
            <section id="past-events" className="text-gray-600 body-font">
              <div className="flex flex-col text-center w-full">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-primary-900 mb-4">
                  Past Events
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                  Explore our past events and catch up on valuable insights,
                  discussions, and networking opportunities.
                </p>
              </div>
              <div className="container px-5 py-24 mx-auto grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {pastEvents.map((event) => {
                  return (
                    <SingleEvent
                      key={event.id}
                      event={event}
                      registered={isRegistered(event)}
                      past={true}
                    />
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <FooterSection />
    </AuthWrapper>
  );
};

export default EventsPage;

const SingleEvent = ({ event, registered, past, setEvents = () => {} }) => {
  const { token } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const register = async () => {
    setLoading(true);
    const response = await fetch(
      `${BACKEND_URL}/events/register/${event._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setEvents((prevEvents) => {
        return prevEvents.map((prevEvent) => {
          if (prevEvent._id === event._id) {
            return { ...prevEvent, users: [...prevEvent.users, user._id] };
          }
          return prevEvent;
        });
      });
      toast.success("Registered successfully");
    }
    setLoading(false);
  };

  return (
    <div className="w-full mx-auto">
      <div className="rounded-lg h-64 overflow-hidden">
        <img
          alt="content"
          className="object-cover object-center h-full w-full"
          src={event.image}
        />
      </div>
      <div className="flex flex-col sm:flex-row mt-2">
        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
          <div className="flex flex-col items-center text-center justify-center">
            <h2 className="title-font font-medium text-lg text-gray-900 dark:text-gray-500">
              {formatDate(event.date)}
            </h2>
            <div className="w-12 h-1 bg-primary-500 rounded mt-2 mb-4"></div>
            <p className="leading-relaxed text-gray-800 dark:text-gray-600">{event.time}</p>
            {/* location */}
            <p className="leading-relaxed text-base">{event.location}</p>
            {(!registered && !past) && (
              <div className="flex justify-start self-start mt-4">
                <button
                  className="inline-flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg"
                  onClick={register}
                  disabled={loading}
                >
                {loading && <FaSpinner className="animate-spin h-4 w-4 mr-2" />}
                  Register
                </button>
              </div>
            )}
            {registered && (
              <p className="leading-relaxed text-base text-primary-500 mt-4">
               {past? "Attended":"Registered"} <FaCheckCircle className="inline-block" />
              </p>
            )}
          </div>
        </div>
        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left pr-8">
          <h2 className="title-font font-medium text-2xl text-gray-900 dark:text-gray-300">
            {event.title}
          </h2>
          <p className="leading-relaxed text-lg mb-4">{event.description}</p>

          {/* show event.guests [name1,name2] */}
          <div className="flex justify-start self-start flex-col mb-4">
            <h3 className="text-lg font-semibold">Guests</h3>
            <div className="flex justify-start self-start flex-wrap">
              {
              typeof(event.guests==="string")?
              <span
                  className="inline-flex text-primary-500 bg-gray-200 dark:bg-gray-700 border-0 py-1 px-2 focus:outline-none hover:bg-gray-300 rounded text-xs mb-2 mr-2"
                >
                  {event.guests}
                </span>
              :
              event.guests
              .map((guest) => (
                <span
                  key={guest}
                  className="inline-flex text-primary-500 bg-gray-200 border-0 py-1 px-2 focus:outline-none hover:bg-gray-300 rounded text-xs mb-2 mr-2"
                >
                  {guest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
