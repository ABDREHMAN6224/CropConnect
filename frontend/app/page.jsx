"use client";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/NavBar";
import { useAppSelector } from "./store/hooks";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  const isAdmin = user.role === "admin";

  console.log(isAdmin);

  return (
    <>
      <NavBar />
      <main className="dark:bg-gray-900">
        <div className="container mx-auto p-4 max-w-screen-xl">
          <div className="">
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
                  {isAdmin && (
                    <Link
                      href="/resources"
                      className="w-fit flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      See all resources
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
