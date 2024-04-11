import Image from "next/image";
import { FaCartPlus,FaChevronCircleRight,FaEdit, FaTrash } from "react-icons/fa";
import EditProductModal from "./modals/EditProductModal";
import { useState } from "react";
import {BACKEND_URL} from "../app/utils/constants"
import { useAppSelector } from "../app/store/hooks";
import Rating from "./Rating";
import { useCart } from "../app/context/cartContext";


export default function Card({
  imgSrc,
  productTitle,
  productPrice,
  productDesc,
  product:prod,
  rating,
  admin = false,
  sold=false,
  handleDelete,
  onSave,
  handleAvailable,
  onOpen,
}) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(prod);
  const {token}=useAppSelector((state)=>state.auth);
  const {cart,addToCart,removeFromCart}=useCart()



  const makeAvailable = async (id) => {
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}/marketplace/${id}/available`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setProduct(data);
      handleAvailable(data._id);
    } else {
      console.log(data);
    }
    setLoading(false);
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-between relative">
      <Image
        className="rounded-t-lg"
        src={imgSrc}
        width={400}
        height={300}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}

        alt="Product Image"
      />
      <div className="p-5 w-full">
        <h5 className="flex items-start justify-between mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white gap-4">
          <span>{productTitle}
          </span>
          <div className="ml-2 text-primary-600 dark:text-primary-400">
            {productPrice} PKR
            <div className="flex items-center gap-1 text-sm self-end">
              <Rating rating={rating} />
            </div>
          </div>
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-wrap break-words">
          {productDesc.slice(0, 150)} {productDesc.length > 150 && "..."}
        </p>
        <div className="flex items-center justify-between gap-4">
          {!admin && 
                    <div className="flex gap-4 w-full items-center">

        {cart.find((item)=>item._id===product._id) ?
        <button className="flex justify-center items-center w-full px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
          onClick={()=>removeFromCart(product._id)} 
        >
          Remove from cart
        </button>
        :
        <button className="flex justify-center items-center w-full px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:bg-primary-700"
          onClick={()=>addToCart(product)}
        >
          <FaCartPlus className="inline" /> &nbsp; Add to cart
        </button>
      }
        <button className="flex justify-center items-center w-full px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:bg-primary-700"
          onClick={()=>onOpen(product._id)}
        >
           Learn More &nbsp; <FaChevronCircleRight className="inline" /> 
        </button>
        </div>
        }
        {admin && (
          <div className="flex gap-4 w-full items-center">
            <button className="flex justify-center items-center w-full px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:bg-primary-700"
              onClick={() => setEditModalOpen(true)}
            >
              <FaEdit className="inline" /> &nbsp; Edit
            </button>
            <button className="flex justify-center items-center w-full px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
              onClick={() => handleDelete(product._id)}
            >
              <FaTrash className="inline" /> &nbsp; Delete
            </button>
            {/* if sold show option to make it available again */}
            {sold && (
              <button className="flex justify-center items-center w-full px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                onClick={()=>makeAvailable(product._id)}
              >
                {loading ? "Loading..." : "Make Available"}
              </button>
            )}
          </div>
        )}
        </div>

      </div>
      {editModalOpen && 
      <EditProductModal
        product={product}
        setEditModalOpen={setEditModalOpen}
        setProduct={setProduct}
        onSave={onSave}
      />
    }

    {/* if sold show bage above card showing its sold status */}
    {sold && (
      <span className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 rounded-bl-lg rounded-tr-lg">
        Sold
      </span>
    )}

    </div>
  );
}
