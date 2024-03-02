"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Card from "/components/Card";

export default function MarketplacePage() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function getResources() {
      const response = await fetch("http://localhost:5000/resources/all");
      console.log(response);
    }
    getResources();
  }, []);

  return (
    <>
      <NavBar />
      <main className="dark:bg-gray-900">
        <div className="container mx-auto p-4">
          <header className="flex justify-between items-center mb-5 flex-col sm:flex-row">
            <h1 className="text-3xl mt-4 mb-5">Marketplace</h1>
            <input
              type="text"
              placeholder="Search for products"
              className="max-w-sm h-min bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </header>
          <div className="grid grid-cols-1 gap-4 place-items-center md:grid-cols-2 lg:grid-cols-3">
            <Card
              imgSrc="/31343C.svg"
              productTitle="Product 1"
              productDesc="This is a description of product 1"
              productPrice="1000"
            />
            <Card
              imgSrc="/31343C.svg"
              productTitle="Product 2"
              productDesc="This is a description of product 2"
              productPrice="1000"
            />
            <Card
              imgSrc="/31343C.svg"
              productTitle="Product 3"
              productDesc="This is a description of product 3"
              productPrice="1000"
            />
            <Card
              imgSrc="/31343C.svg"
              productTitle="Product 4"
              productDesc="This is a description of product 4"
              productPrice="1000"
            />
          </div>
        </div>
      </main>
    </>
  );
}
