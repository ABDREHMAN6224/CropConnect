"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../../context/cartContext";
import NavBar from "../../../../components/NavBar";
import { FaTrash } from "react-icons/fa";
import {formatAmount} from "../../../utils/general_utils";
import { useAppSelector } from "../../../store/hooks";
import TextInput from "../../../../components/inputs/TextInput";
import {BACKEND_URL} from "../../../utils/constants";
import Spinner from "../../../../components/Spinner";
import OrderInvoiceModal from "../../../../components/modals/OrderInvoiceModal";
import { useRouter } from "next/navigation";
import AuthWrapper from "../../../AuthWrapper";


export default function Checkout({params}) {
    const [selectedProducts, setSelectedProducts] = useState(null);
    const {cart,removeFromCart,getBill,shippingAmount}=useCart();
    const user = useAppSelector((state) => state.user);
    const {token} = useAppSelector((state) => state.auth);
    const [isValidated, setIsValidated] = useState(false);
    const [loading,setLoading]=useState(false);
    const [order,setOrder] = useState(null);
    const [openOrderModal,setOpenOrderModal] = useState(false);
    const router=useRouter();

    const [billingAddress, setBillingAddress] = useState({
        address: "",
        city: "",
        state: "",
        phone: "",
    });

    const isPhoneValid = (phone) => {
        return phone.length === 11 && phone[0] === "0" && phone[1] === "3";
    };

    useEffect(() => {
      // valifate billing address
      if (
        billingAddress.address.length>3 &&
        billingAddress.city &&
        billingAddress.state && 
        isPhoneValid(billingAddress.phone)
      ) {
        setIsValidated(true);
      }else{
        setIsValidated(false);
      }

    }, [billingAddress]);

    useEffect(() => {
        if(params.id!=="all"){
            const product = cart.find((item) => item._id === params.id);
            setSelectedProducts([product]);
        }
    }, []);

    const getStateCities = (state) => {
        switch (state) {
            case "Punjab":
                return ["Lahore", "Islamabad", "Rawalpindi", "Multan"];
            case "Sindh":
                return ["Karachi", "Hyderabad", "Sukkur", "Larkana"];
            case "Khyber Pakhtunkhwa":
                return ["Peshawar", "Mardan", "Swat", "Abbottabad"];
            case "Balochistan":
                return ["Quetta", "Gwadar", "Turbat", "Chaman"];
            case "Gilgit-Baltistan":
                return ["Gilgit", "Skardu", "Hunza", "Ghizer"];
            case "Azad Kashmir":
                return ["Muzaffarabad", "Mirpur", "Kotli", "Rawalakot"];
            default:
                return [];
        }
    };

    const PakistaniStates = [
        "Punjab",
        "Sindh",
        "Khyber Pakhtunkhwa",
        "Balochistan",
        "Gilgit-Baltistan",
        "Azad Kashmir",
    ];

    const createOrder = async () => {
      setLoading(true);
      const newOrder = {
        shippingAddress:billingAddress,
        orderItems:selectedProducts.map(p=>p._id),
        shippingPrice:shippingAmount,
        totalPrice:getBill(shippingAmount,selectedProducts)
      }
      const response = await fetch(`${BACKEND_URL}/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newOrder),
      });
      const data = await response.json();
      if(response.ok){
        setOrder(data);
        // remove items from cart
        selectedProducts.forEach((product) => {
          removeFromCart(product._id);
        })
        setOpenOrderModal(true);
      }
      setLoading(false);
    }


  return (
    <AuthWrapper>
    <NavBar />
<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 lg:pt-20">
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Order Summary</p>
    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
    <div className="mt-8 space-y-3 rounded-lg border dark:bg-gray-800 dark:border-gray-950 bg-white dark:bg-gray-600 px-2 py-4 sm:px-6 overflow-auto max-h-96">
      {cart && cart.map((product) => (
        <div className={`flex flex-col rounded-lg sm:flex-row ${
          selectedProducts && selectedProducts.find((item) => item._id === product._id)
            ? "border-2 border-primary-400"
            : ""
        }`}
        onClick={() => setSelectedProducts((prev) => {
          if (prev) {
            if (prev.find((item) => item._id === product._id)) {
              return prev.filter((item) => item._id !== product._id);
            }
            return [...prev, product];
          }
          return [product];
        })}
        >
          <img className="m-2 h-24 w-28 rounded-md border p-4 dark:border-gray-600 object-cover object-center" src={product.images[0]} alt="" />
          <div className="flex w-full flex-col px-4 py-4">
            <span className="font-semibold">{product.name}</span>
            <span className="float-right text-gray-400">{product.size}</span>
            <p className="text-lg font-bold">${product.price}</p>
            <button onClick={(e) => {
              e.stopPropagation();
              removeFromCart(product._id);
            }} className="text-primary-400 ml-auto hover:text-primary-600">
              <FaTrash />
            </button>
          </div>

        </div>
      ))}
    </div>

    <p className="mt-8 text-lg font-medium">Shipping Methods</p>
    <form className="mt-5 grid gap-6">
      <div className="relative">
        <input className="peer hidden" id="radio_1" type="radio" name="radio" checked readOnly />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white "></span>
        <label className="peer-checked:border-2 dark:peer-checked:bg-gray-600 peer-checked:border-primary-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
          <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
          <div className="ml-5">
            <span className="mt-2 font-semibold">Cash on Delivery</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
          </div>
        </label>
      </div>
    </form>
  </div>
  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 dark:bg-gray-800">
    <p className="text-xl font-medium">Payment Details</p>
    <p className="text-gray-400">Complete your order by providing your payment details.</p>
    <div className="">
      <label for="card-holder" className="mt-4 mb-2 block text-sm font-medium ">Name</label>
      <div className="relative">
        <input type="text" id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" disabled={user?.name} value={user?.name}/>
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
          </svg>
        </div>
      </div>
      <label for="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
      <div className="relative">
        <input type="text" id="email" disabled={user?.email} name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com"  value={user?.email}/>
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
      </div>
      <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex-shrink-0 sm:w-7/12">
          <input type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 dark:bg-gray-700 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" 
            value={billingAddress.address}
            onChange={(e) => {
              setBillingAddress((prev) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
          />
        </div>
        <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 dark:bg-gray-700 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          value={billingAddress.state}
          onChange={(e) => {
            setBillingAddress((prev) => ({
              ...prev,
              state: e.target.value,
            }));
          }}
        >
          <option value="">State</option>
          {PakistaniStates.map((state) => (
            <option name="billing-state" value={state}>{state}</option>
          ))}
        </select> 
        {/* city input */}
        <select type="text" name="billing-city" className="w-full rounded-md border border-gray-200 dark:bg-gray-700 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          value={billingAddress.city}
          onChange={(e) => {
            setBillingAddress((prev) => ({
              ...prev,
              city: e.target.value,
            }));
          }}
        >
          <option value="">City</option>
          {getStateCities(billingAddress.state).map((city) => (
            <option name="billing-city" value={city}>{city}</option>
          ))}
        </select>

      </div>

      <label for="phone" className="mt-4 mb-2 block text-sm font-medium">Phone</label>
      <div className="relative">
        <TextInput
          type="text"
          name="phone"
          value={billingAddress?.phone}
          onChange={(e) => {
            setBillingAddress((prev) => ({
              ...prev,
              phone: e.target.value,
            }));
          }}
          placeholder="0300-1234567"
          error={(isPhoneValid(billingAddress.phone) || billingAddress.phone.length<1) ? "" : "Invalid phone number"}
        />
      </div>

      <div className="mt-6 border-t border-b py-2  dark:border-gray-900">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Subtotal</p>
          <p className="font-semibold text-gray-900 dark:text-green-700">{
            formatAmount(getBill(shippingAmount,selectedProducts||[])-shippingAmount)
            } Rs
             </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Shipping</p>
          <p className="font-semibold text-gray-900 dark:text-green-700"> 
            {/* bill in rs */}
              {formatAmount(shippingAmount)} Rs


          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg font-medium text-gray-900 dark:text-gray-400">Total</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-green-800">
          {formatAmount(getBill(shippingAmount,selectedProducts||[]))} Rs
        </p>
      </div>
    </div>
    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white disabled:opacity-50"
      disabled={(selectedProducts===null||selectedProducts.length===0) || !isValidated || loading}
      onClick={createOrder}
    >      
      {loading ? "Placing Order..." : "Place Order"}
    </button>
  </div>
</div>
    {loading && 
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Spinner />
      </div>
    }
    {openOrderModal &&
    <OrderInvoiceModal order={order} onClose={() => {
      setOpenOrderModal(false)
      router.push("/user/profile")
    }} open={openOrderModal} />
    }
    </AuthWrapper>
  )
}