"use client";
import DarkModeSwitcher from "/components/DarkModeSwitcher";
import useColorMode from "/hooks/useColorMode";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { createMarketplace } from "../../store/marketPlace/marketPlaceThunk";

export default function CreateMarketPlacePage() {
  const [colorMode, _] = useColorMode();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState(0);
  const [image, setimage] = useState("");
  const dispacth = useAppDispatch();

  const handleCreateMarketPlace = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    const img = await fetch("http://localhost:5000/auth/upload", {
        method: "POST",
        body: formData,
    });
    const imgData = await img.json();
    console.log(name, description, price, imgData.url, "reafdsafas")
    const res = dispacth(createMarketplace({ name, description, price, image: imgData.url+"" }));
    if (res.error) {
      toast.error("Failed to create product");
    }
    toast.success("Product created successfully");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full flex justify-between items-center mb-6 sm:max-w-md">
          <Link
            href="/"
            className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            HarvestHub
          </Link>
          <DarkModeSwitcher />
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              HarvestHub
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleCreateMarketPlace}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Best Seeds"
                  required
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Description
                </label>
                <textarea
                  type="description"
                  name="description"
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Best Seeds"
                  required
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="Image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
                  onChange={(e) => setimage(e.target.files[0])}
                />
              </div>
          
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sell A Product
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer theme={colorMode} />
    </section>
  );
}
