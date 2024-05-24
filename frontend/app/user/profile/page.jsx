"use client";
import { useRouter } from "next/navigation";
import NavBar from "../../../components/NavBar";
import { useAppSelector } from "../../store/hooks";
import Image from "next/image";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/constants";
import OrderInvoiceModal from "../../../components/modals/OrderInvoiceModal";
import { formatAmount, generateStatusBadge } from "../../utils/general_utils";
import ReviewModal from "../../../components/modals/ReviewModal";
import ShowEventTicketModal from "../../../components/modals/EventTicketModal";
import Footer from "../../../components/FooterSection";
import { FaSpinner } from "react-icons/fa";

export default function Profile() {
  const router = useRouter();
  const userState = useAppSelector((state) => state.user);
  const isLoggedIn = useAppSelector((state) => state.auth).token !== "";
  const { token } = useAppSelector((state) => state.auth);
  const [myOrders, setMyOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const tabs = ["My Orders", "Events"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const orderFilters = ["all", "pending", "processing", "shipped", "delivered"];
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading,setLoading]=useState(false)

  const user = useAppSelector((state) => state.user);
  const isAdmin = user.role.toLowerCase() === "admin";
  if (!isLoggedIn) {
    return router.push("/login");
  }

  const handleLogout = (e) => {
    Swal.fire({
      title: "Are you sure to logout?",
      text: "You would need password to login again",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        window.localStorage.clear();
        router.replace("/login");
      }
    });
  };

  const isAlreadyReviewed = (order) => {
    if (order.orderItems.length === 0) return false;
    const reviews = order.orderItems[0].reviews;
    if (reviews.length > 0) {
      return reviews.some((review) => review.author === userState._id);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    const getMyOrders = async () => {
      setLoading(true)
      const response = await fetch(`${BACKEND_URL}/orders/myorders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMyOrders(data);
        setFilteredOrders(data);
      }
      setLoading(false)
    };
    const getEvents = async () => {
      const response = await fetch(`${BACKEND_URL}/events/registered`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      }
    };
    getEvents();
    getMyOrders();
  }, []);

  useEffect(() => {
    setFilteredOrders(myOrders);
  }, [myOrders]);

  return (
    <div className="lg:h-screen lg:overflow-hidden flex flex-col">
      <NavBar />
      <main className="dark:bg-gray-900 flex-1 lg:overflow-hidden ">
        <div className="container mx-auto p-4 flex flex-col  h-full lg:overflow-hidden">
          <section className="flex flex-col flex-1 overflow-hidden">
            <div className="mx-auto bg-white dark:bg-gray-900 rounded-lg  shadow-sm flex items-center  justify-between flex-col lg:flex-row gap-4 flex-wrap">
              {/* user.avatar and name */}
              <div className="flex gap-4 items-center p-4">
                <Image
                  className="h-16 w-16 rounded-full"
                  src={userState.avatar}
                  alt=""
                  width={64}
                  height={64}
                />
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {userState.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {userState.email}
                  </p>
                </div>
                </div>

              <div class="bg-gradient-to-br from-green-400 to-cyan-500 rounded-lg flex-1 section-bg-2">
                <div class=" px-6 py-8 ">
                  <div class="items-center flex">
                    <div class="w-full">
                      <h2 class="text-3xl font-semibold text-white">
                        Welcome to your profile
                      </h2>
                      <p class="mt-4 text-gray-300">
                        You can view your orders, give feedback and manage your
                        store from here.
                      </p>
                      <button
                        class="mt-8 bg-white text-primary-500 font-semibold py-2 px-6 rounded-lg"
                        h-screen
                        onClick={() => router.push("/marketplace")}
                      >
                        Go to Marketplace
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* for community  having link to "/community/chats"*/}
              <div class="bg-gradient-to-br from-primary-400 to-yellow-500 rounded-lg flex-1 section-bg">
                <div class="px-6 py-8 ">
                  <div class="items-center flex">
                    <div class="w-full">
                      <h2 class="text-3xl font-semibold text-white">
                        Join the Community
                      </h2>
                      <p class="mt-4 text-gray-300">
                        Join the community to connect with other users and share
                        your thoughts.
                      </p>
                      <button
                        class="mt-8 bg-white text-primary-500 font-semibold py-2 px-6 rounded-lg"
                        onClick={() => router.push("/community/")}
                      >
                        Go to Community
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-8 flex-1 overflow-hidden flex flex-col items-start">
              <div className="font-bold text-gray-800 dark:text-white flex justify-between mb-8 w-full">
                {/* div showing tabs, active tab is underlined  */}
                <div className="flex gap-4">
                  {tabs.map((tab, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveTab(tab)}
                      className={`cursor-pointer ${
                        activeTab === tab
                          ? "text-primary-600 dark:text-white border-primary-900"
                          : "text-gray-600 dark:text-white"
                      }`}
                    >
                      {tab}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <div
                    className="text-gray-800 dark:text-white cursor-pointer hover:underline"
                    onClick={() => router.push("/feedback")}
                  >
                    Give Feedback
                  </div>
                  <div
                    className="text-gray-800 dark:text-white cursor-pointer hover:underline"
                    onClick={() => router.push("/marketplace/store")}
                  >
                    My Store
                  </div>
                </div>
              </div>
              {activeTab === "My Orders" && (
                <div className="container w-full flex-1 justify-center mx-auto overflow-auto ">
                  <div className="flex flex-col w-full">
                    {myOrders.length ? (
                      <div className="w-full">
                        <div className="border-b border-gray-200 shadow">
                          <div className="flex gap-4 p-4 dark:text-blue-950">
                            <select
                              className="border border-gray-200 rounded-lg p-2"
                              value={filter}
                              onChange={(e) => {
                                setFilter(e.target.value);
                                if (e.target.value === "all") {
                                  setFilteredOrders(myOrders);
                                  return;
                                }
                                setFilteredOrders(
                                  myOrders.filter(
                                    (order) => order.status === e.target.value
                                  )
                                );
                              }}
                            >
                              {orderFilters.map((filter) => (
                                <option key={filter} value={filter}>
                                  {filter}
                                </option>
                              ))}
                            </select>
                          </div>

                          <table className="divide-y divide-gray-300 w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  ID
                                </th>

                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  Items
                                </th>

                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  Created At
                                </th>

                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  Total
                                </th>
                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  Status
                                </th>

                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-300 ">
                              {filteredOrders.map((order) => (
                                <tr key={order.id} className="">
                                  <td className="px-2 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {order._id}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 flex gap-4  items-center">
                                      {order.orderItems.length > 0 ? (
                                        order.orderItems.map((item) => {
                                          return (
                                            <div className="flex gap-4 items-center ">
                                              <Image
                                                className="h-8 w-8 rounded-full"
                                                src={item.images[0]}
                                                alt=""
                                                width={20}
                                                height={20}
                                              />
                                            </div>
                                          );
                                        })
                                      ) : (
                                        <div>-</div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleString()}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {formatAmount(order.totalPrice)} PKR
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {generateStatusBadge(order.status)}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 my-auto whitespace-nowrap flex items-center gap-4">
                                    {/* review an dinvoice buttons with proper backgrounds */}
                                    <button
                                      onClick={() => {
                                        setCurrentOrder(order);
                                        setOpenInvoiceModal(true);
                                      }}
                                      className="text-primary-900  px-4 py-2 rounded-lg hover:bg-primary-600 hover:text-white"
                                    >
                                      Invoice
                                    </button>
                                    {/* check if already review */}
                                    <button
                                      className="bg-primary-300  px-4 py-2 rounded-lg hover:bg-primary-400 hover:text-white disabled:opacity-50"
                                      disabled={
                                        order.status !== "delivered" ||
                                        isAlreadyReviewed(order)
                                      }
                                      onClick={() => {
                                        setCurrentOrder(order);
                                        setOpenReviewModal(true);
                                      }}
                                    >
                                      {isAlreadyReviewed(order)
                                        ? "Reviewed"
                                        : "Review"}
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col justify-center items-center h-96">
                        {loading ?
                                    <FaSpinner className="animate-spin h-12 w-12 text-primary-600"/>
                                    :
                        <>
                        <div className="text-gray-800 dark:text-white text-2xl">
                          No Orders Yet
                        </div>
                        {/* option to order  */}

                        <p className="text-gray-800 dark:text-white text-lg mt-4">
                          You can order from our{" "}
                          <a
                            href="/marketplace"
                            className="text-primary-500 hover:underline"
                            >
                            Marketplace
                          </a>
                        </p>
                        </>
                          }
                      </div>
                    )}
                  </div>
                </div>
              )}
              {activeTab === "Events" && (
                <div className="container w-full flex-1 justify-center mx-auto overflow-auto ">
                  <div className="flex flex-col w-full">
                    {events.length ? (
                      <div className="w-full">
                        <div className="border-b border-gray-200 shadow">
                          <table className="divide-y divide-gray-300 w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  ID
                                </th>
                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  Title
                                </th>
                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  {"Description".slice(0, 50)}
                                </th>
                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  Date
                                </th>
                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  Location
                                </th>
                                <th className="px-6 py-2 text-left md:text-sm font-medium text-gray-500 uppercase tracking-wider text-lg">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-300 ">
                              {events.map((event) => (
                                <tr key={event.id} className="">
                                  <td className="px-2 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {event._id}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {event.title}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {event.description.slice(0, 10)}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {new Date(event.date).toLocaleString()}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {event.location}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 my-auto whitespace-nowrap flex items-center gap-4">
                                    {/* see ticket */}
                                    <button
                                      className="text-primary-900  px-4 py-2 rounded-lg hover:bg-primary-100 hover:text-primary-500 "
                                      onClick={() => {
                                        setCurrentEvent(event);
                                        setShowEventModal(true);
                                      }}
                                    >
                                      My Ticket
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col justify-center items-center h-96">
                        <div className="text-gray-800 dark:text-white text-2xl">
                          No Events Yet
                        </div>
                        {/* option to order  */}

                        <p className="text-gray-800 dark:text-white text-lg mt-4">
                          You can view upcoming events{" "}
                          <a
                            href="/events"
                            className="text-primary-500 hover:underline"
                          >
                            here
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {currentOrder && openInvoiceModal && (
              <OrderInvoiceModal
                order={currentOrder}
                onClose={() => {
                  setOpenInvoiceModal(false);
                  setCurrentOrder(null);
                }}
              />
            )}
            {currentOrder && openReviewModal && (
              <ReviewModal
                products={currentOrder?.orderItems}
                setMyOrders={setMyOrders}
                onClose={() => {
                  window.location.reload()
                  setOpenReviewModal(false);
                  setCurrentOrder(null);
                }}
              />
            )}
            {showEventModal && currentEvent && (
              <ShowEventTicketModal
                event={currentEvent}
                onClose={() => {
                  setShowEventModal(false);
                }}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
