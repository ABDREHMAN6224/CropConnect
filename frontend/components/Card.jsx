import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";

export default function Card({
  imgSrc,
  productTitle,
  productPrice,
  productDesc,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Image
        className="rounded-t-lg"
        src={imgSrc}
        width={640}
        height={480}
        alt=""
      />
      <div className="p-5">
        <h5 className="flex items-center justify-between mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span>{productTitle}</span>
          <span className="ml-2 text-primary-600 dark:text-primary-400">
            {productPrice}
          </span>
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {productDesc}
        </p>
        <button className="flex justify-center items-center w-full px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:bg-primary-700">
          <FaCartPlus className="inline" /> &nbsp; Add to cart
        </button>
      </div>
    </div>
  );
}
