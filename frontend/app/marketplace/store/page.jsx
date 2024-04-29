"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import NavBar from "../../../components/NavBar";
import Card from "/components/Card";
import { BACKEND_URL } from "../../utils/constants";
import Spinner from "/components/Spinner";
import TextInput from "../../../components/inputs/TextInput";
import { formatDate } from "../../utils/general_utils";
import { FaSpinner } from "react-icons/fa";
import Chart from 'chart.js/auto';
import { useSocket } from "../../context/socketContext";
import AuthWrapper from "../../AuthWrapper";


export default function Store() {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAppSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const tabs = ["My Store", "Store Orders"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [storeOrders, setStoreOrders] = useState([]);
  const [filteredStoreOrders, setFilteredStoreOrders] = useState([]);
  const orderFilters = ["all", "pending", "processing", "shipped", "delivered"];
  const [filter, setFilter] = useState(orderFilters[0]);

  const getMyMarketplaces = async () => {
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}/marketplace/my/marketplace`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setMyProducts(data);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const getStoreOrders = async () => {
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}/orders/storeorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setStoreOrders(data);
      setFilteredStoreOrders(data);
    } else {
      console.log(data);
      setError(true);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}/marketplace/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("Product deleted successfully");
      setMyProducts(myProducts.filter((product) => product._id !== id));
    } else {
      console.log(data);
      toast.error("Error deleting product");
    }
    setLoading(false);
  };
  const handleEdit = () => {};

  useEffect(() => {
    setFilteredStoreOrders(storeOrders);
  }, [storeOrders]);

  useEffect(() => {
    getMyMarketplaces();
    getStoreOrders();
  }, []);

  return (
    <AuthWrapper>
    <div className={`${activeTab===tabs[1] && "lg:h-screen lg:flex lg:flex-col lg:overflow-hidden"}`}>
      <NavBar />
      {/* my products section */}
      <main className="dark:bg-gray-900 flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              {tabs.map((tab) => (
                <span
                  key={tab}
                  className={`cursor-pointer ${
                    activeTab === tab
                      ? "text-primary-600 underline underline-offset-2"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
            {activeTab === tabs[0] && (
              <TextInput
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
            )}

            <Link href="/marketplace/create">
              <span className="bg-primary-600 text-white px-4 py-2 rounded-lg">
                Add Product
              </span>
            </Link>
          </div>
          <hr className="my-4" />
          {loading && !error && (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner />
            </div>
          )}
          {error && (
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-xl text-red-500">
                Error fetching your products
              </h1>
            </div>
          )}
          {!loading &&
            !error &&
            myProducts.length > 0 &&
            activeTab === tabs[0] && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {myProducts
                  .filter((product) =>
                    product.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((product) => (
                    <Card
                      key={product._id}
                      imgSrc={product.images[0]}
                      productTitle={product.name}
                      productPrice={product.price}
                      productDesc={product.description}
                      rating={product?.averageRating || 0}
                      admin={true}
                      product={product}
                      sold={product.status === "sold" ? true : false}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      onSave={getMyMarketplaces}
                      handleAvailable={(id) => {
                        setMyProducts(
                          myProducts.map((product) => {
                            if (product._id === id) {
                              product.status = "active";
                            }
                            return product;
                          })
                        );
                      }}
                    />
                  ))}
              </div>
            )}
          {myProducts.length === 0 &&
            !loading &&
            !error &&
            activeTab === tabs[0] && (
              <div className="w-full h-full flex flex-1 mt-12 items-center justify-center flex-col gap-4">
                <h1 className="text-xl text-gray-500">No products found</h1>
                {/* add products */}

                <p className="text-gray-500">
                  Add products to your store
                  <Link href="/marketplace/create">
                    <span className="text-primary-600 cursor-pointer">
                      {" "}
                      here
                    </span>
                  </Link>
                </p>
              </div>
            )}
          {/* store orders */}
          {!loading && !error && activeTab === tabs[1] && (
            <div className=" grid grid-cols-1 flex-1 gap-8 lg:grid-cols-3 overflow-hidden">
              <div className="border-b border-gray-200 shadow lg:flex-1 lg:col-span-2 overflow-auto">
                <div className="flex gap-4 p-4">
                  <select
                    className="border border-gray-200 rounded-lg p-2"
                    value={filter}
                    onChange={(e) => {
                      setFilter(e.target.value);
                      if (e.target.value === "all") {
                        setFilteredStoreOrders(storeOrders);
                        return;
                      }
                      setFilteredStoreOrders(
                        storeOrders.filter(
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
                        Product
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
                    {filteredStoreOrders.map((order, idx) => (
                      <tr key={order._id} className="">
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order._id}
                          </div>
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap flex gap-4">
                          {order.orders.map((o) => (
                            <div
                              key={o._id}
                              className="flex items-center gap-4 border-primary-500 border p-2 rounded-lg"
                            >
                              <img
                                src={o?.images[0]}
                                alt={o?.name}
                                className="w-8 h-8 object-cover rounded-lg"
                              />
                            </div>
                          ))}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(order.createdAt)}
                          </div>
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order.shippingAddress.city}
                          </div>
                        </td>

                        <td className="px-2 py-2 my-auto whitespace-nowrap flex items-center gap-4">
                          <UpdateOrder
                            order={order}
                            setOrders={setStoreOrders}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-1 gap-8 lg:gap-4 flex-row  lg:flex-col flex-wrap lg:flex-nowrap overflow-auto">
                
                    <h3 className="text-2xl font-bold my-8 lg:my-0 text-primary-850 underline underline-offset-4 block text-center ">
                        Analytics
                    </h3>
                <ChartComponent
                    type="bar"
                    data={{
                        labels: orderFilters,
                        datasets: [
                            {
                                label: 'Orders',
                                data: orderFilters.map((filter) => storeOrders.filter((order) => order.status === filter).length),
                                backgroundColor: 'rgb(46 204 113)',
                            }
                        ]
                    }}
                />
                    <ChartComponent
                        type="line"
                        data={{
                            labels: myProducts.map((product) => product.name),
                            datasets: [
                                {
                                    label: 'Sales',
                                    data: myProducts.map((product) => product.buyers.length),
                                    borderColor: 'rgb(46 204 113)',
                                    tension: 0.1
                                },
                                {
                                    label: 'Reviews',
                                    data: myProducts.map((product) => product.reviews.length),
                                    borderColor: 'rgb(27, 211, 27)',
                                    tension: 0.1
                                }
                            ]
                        }}
                    />

              </div>
            </div>
          )}
        </div>
      </main>
      <ToastContainer />
    </div>
    </AuthWrapper>
  );
}

const UpdateOrder = ({ order, setOrders }) => {
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  const orderFilters = ["pending", "processing", "shipped", "delivered"];
  const [filter, setFilter] = useState(order.status);
  const { token } = useAppSelector((state) => state.auth);

  const hasChnaged = () => order.status !== filter;

  const handleChange = async () => {
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}/orders/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: filter }),
    });

    if (response.ok) {
      socket.emit("notification:order", { 
        user: order.user._id,
        content: `Your order with id ${order._id} has been ${filter=="processing"?"processed":filter}`,
        link: "#",
        category: "order",
        scope: filter
       });
      toast.success("Order updated successfully");
      setOrders((prev) => {
        return prev.map((o) => {
          if (o._id === order._id) {
            o.status = filter;
          }
          return o;
        });
      });
    } else {
      toast.error("Error updating order");
    }
    setLoading(false);
  };

  return (
    
    <div className="flex gap-4 items-center">
      <select
        className="border border-gray-200 rounded-lg p-2"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        {orderFilters.slice(orderFilters.indexOf(order.status)).map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
      <button
        className={`px-4 py-2 rounded-lg ${
          hasChnaged()
            ? "bg-primary-600 text-white"
            : "bg-gray-200 text-gray-500"
        }`}
        onClick={handleChange}
        disabled={!hasChnaged()}
      >
        {loading ? <FaSpinner className="animate-spin" /> : "Update"}
      </button>
    </div>
  );
};

const ChartComponent = ({ data,type }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
          }
        if (chartRef && chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, {
                type: type,
                data: data,
              });
        }
        return () => {
            if (chartInstance.current) {
              chartInstance.current.destroy();
            }
        };
      }, [data]);
    
      return <canvas ref={chartRef} className="mb-8" />;
  
};
