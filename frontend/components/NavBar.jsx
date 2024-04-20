"use client";
import Link from "next/link";
import { useState } from "react";
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import DarkModeSwitcher from "/components/DarkModeSwitcher";
import CartItem from "./CartItem";
import { useCart } from "../app/context/cartContext";
import { useRouter } from "next/navigation";
import { formatAmount } from "../app/utils/general_utils";

export default function NavBar() {
  const [showNavBar, setShowNavBar] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const router=useRouter();

  const {cart,removeFromCart,getTotals} = useCart();

  

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            CropConnect
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
          onClick={() => setShowNavBar(!showNavBar)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${!showNavBar && "hidden"} w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-500 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/marketplace"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Community
              </Link>
            </li>
            <li>
              <Link
                href="/resources"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => setCartVisible(!cartVisible)}
              >
                <FaCartArrowDown className="text-2xl" />
              </Link>
            </li>
            <li>
              <Link
                href="/user/profile"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <FaUser className="text-2xl" />
              </Link>
            </li>
            <li>
              <DarkModeSwitcher />
            </li>
          </ul>
        </div>
      </div>

      {/* Cart area */}
      <div
        className={`relative transition-none ${
          !cartVisible ?
          "opacity-0 -z-10 transition-opacity ease-in-out duration-500":"z-50 transition-opacity ease-in-out duration-500 opacity-100"
        }`}
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur transition-opacity"></div>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div
                className={`pointer-events-auto w-screen max-w-md transition-transform duration-300 ${
                  !cartVisible && "translate-x-full"
                } ${cartVisible && "translate-x-0"}`}
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Shopping cart
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setCartVisible(!cartVisible)}
                        >
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                         {cart.map((item) => (
                           <CartItem
                             key={item.id}
                             imgSrc={"data:image/jpeg;base64,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"}
                             productPrice={item.price}
                             productTitle={item.name}
                             onRemove={()=>removeFromCart(item.id)}
                           />
                         ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{
                        getTotals(cart) > 0 ? `PKR ${formatAmount(getTotals())}` : "PKR 0"
                      }</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <Link
                        className="flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700"
                        href="/marketplace/checkout/all"
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <button
                          type="button"
                          className="font-medium text-primary-600 hover:text-primary-500"
                          onClick={() =>{
                            setCartVisible(!cartVisible);
                            router.push("/marketplace");
                          }}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
