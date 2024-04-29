"use client";
import { useRouter } from "next/navigation";
import NavBar from "../../../../components/NavBar";
import { useAppSelector } from "../../../store/hooks";
import Image from "next/image";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../utils/constants";
import OrderInvoiceModal from "../../../../components/modals/OrderInvoiceModal";
import {
  formatAmount,
  generateStatusBadge,
} from "../../../utils/general_utils";
import ReviewModal from "../../../../components/modals/ReviewModal";
import ShowEventTicketModal from "../../../../components/modals/EventTicketModal";
import Link from "next/link";
import Analytics from "./analytics";
import { FaPlus } from "react-icons/fa";
import Footer from "../../../../components/FooterSection";
export default function Profile() {
  const router = useRouter();
  const userState = useAppSelector((state) => state.user);
  const isLoggedIn = useAppSelector((state) => state.auth).token !== "";
  const { token } = useAppSelector((state) => state.auth);
  const [allOrders, setallOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const tabs = ["All Orders", "Events"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const orderFilters = ["all", "pending", "processing", "shipped", "delivered"];
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [events, setEvents] = useState([]);

  const user = useAppSelector((state) => state.user);
  const isAdmin = user.role.toLowerCase() === "admin";
  if (!isLoggedIn) {
    return router.push("/login");
  }
  if (!isAdmin) return router.push("/user/profile");

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
    if (reviews && reviews.length > 0) {
      return reviews.some((review) => review.author === userState._id);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    const getallOrders = async () => {
      const response = await fetch(`${BACKEND_URL}/orders/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setallOrders(data);
        setFilteredOrders(data);
      }
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
    getallOrders();
  }, []);

  useEffect(() => {
    setFilteredOrders(allOrders);
  }, [allOrders]);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <NavBar />
      <main className="dark:bg-gray-900 flex-1 overflow-auto ">
        <div className="container mx-auto p-4 flex flex-coll">
          <section className="flex flex-col flex-1">
            <div className="mx-auto bg-white dark:bg-gray-900 rounded-lg  shadow-sm flex items-center  justify-between flex-col lg:flex-row gap-4 flex-wrap">
            

              <div class="bg-gradient-to-br from-green-400 to-cyan-500 rounded-lg flex-1 section-bg-2">
                <div class=" mx-auto px-6 py-8 ">
                    <div class="items-center flex">
                        <div class="w-full">
                            <h2 class="text-3xl font-semibold text-white">Welcome to your profile</h2>
                            <p class="mt-4 text-gray-300">You can view your orders, give feedback and manage your store from here.</p>
                            <button class="mt-8 bg-white text-primary-500 font-semibold py-2 px-6 rounded-lg"
                              onClick={() => router.push("/marketplace")}
                            >Go to Marketplace</button>
                        </div>
                    </div>
                  </div>      
             </div>

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
              <div className=" w-80">
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
            </div>

            <Analytics orders={allOrders} />
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
                setallOrders={setallOrders}
                onClose={() => {
                  window.location.reload();
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
        <Footer />
      </main>
    </div>
  );
}
