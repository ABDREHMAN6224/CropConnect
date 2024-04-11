"use client";
import DarkModeSwitcher from "/components/DarkModeSwitcher";
import useColorMode from "/hooks/useColorMode";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { createMarketplace } from "../../store/marketPlace/marketPlaceThunk";
import ProductImage from "/components/ProductImage";

export default function CreateMarketPlacePage() {
  const [colorMode, _] = useColorMode();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState(0);
  const [images, setimages] = useState([]);
  const [loading, setloading] = useState(false);
  const categories = ["Seeds", "Fertilizers", "Tools", "Plants"];
  const dispacth = useAppDispatch();

  const handleCreateMarketPlace = async (e) => {
    e.preventDefault();
    setloading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    images.forEach((image) => formData.append("images", image));
    dispacth(createMarketplace(formData));
    setloading(false);
    setcategory("");
    setdescription("");
    setname("");
    setprice(0);
    setimages([]);
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
            CropConnect
          </Link>
          <DarkModeSwitcher />
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              CropConnect
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
                  min={0}
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}

                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="Image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Images
                </label>
                <div className="flex gap-4 items-center overflow-x-auto">
                  {images.map((image, index) => (
                    <ProductImage 
                    key={index} 
                    src={URL.createObjectURL(image)}
                    alt="Product Image"
                    onClick={() => setimages(images.filter((_, i) => i !== index))}
                    
                    />
                  ))}
                </div>
                {images.length < 5 && 
                <input
                type="file"
                name="image"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setimages([...images, ...files]);
                }}
                max={5}
                />
              }
              </div>
          
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? "Loading..." : "Sell A Product"}
                
              </button>
            </form>
            {/* go to my store */}
            <Link href="/marketplace/store" className="flex items-center justify-center text-primary-600 dark:text-primary-500">
              <span className="text-sm text-gray-900 dark:text-white">Go to my store</span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer theme={colorMode} />
    </section>
  );
}
