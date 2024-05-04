"use client";

import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../../utils/constants";
import { useAppSelector } from "../../../store/hooks";
import {
  BarController,
  LinearScale,
  BarElement,
  TimeScale,
  Tooltip,
  PieController,
  LineController,
  ArcElement,
  PointElement,
  LineElement,
  PolarAreaController,
  RadialLinearScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { ReactChart } from "chartjs-react";
import ChartBox from "../../../../components/chartBox/ChartBox";
import Approvals from "./Approvals";
import AddAdminModal from "./AddAdminModal";
import { FaBook } from "react-icons/fa";
export const chartBoxProduct = {
  color: "skyblue",
  icon: "./productIcon.svg",
  title: "Total Products",
  number: "238",
  dataKey: "products",
  percentage: Math.round(Math.random() * 50),
  chartData: [
    { name: "Sun", products: 400 },
    { name: "Mon", products: 600 },
    { name: "Tue", products: 500 },
    { name: "Wed", products: 700 },
    { name: "Thu", products: 400 },
    { name: "Fri", products: 500 },
    { name: "Sat", products: 450 },
  ],
};

ReactChart.register(
  BarController,
  PieController,
  LineController,
  LinearScale,
  BarElement,
  TimeScale,
  ArcElement,
  PointElement,
  PolarAreaController,
  RadialLinearScale,
  LineElement,
  Tooltip
);

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});
  const { token } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch(`${BACKEND_URL}/auth/analytics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAnalytics(data);
    };
    fetchAnalytics();
  }, []);

  const statsData = {
    "Total Users": [
      analytics.totalUsers,
      <img src="/abc.jpg"  className="h-auto w-32 mb-2 mx-auto" alt="" />,
    ],
    "Total Events": [
      analytics.totalEvents,
      <img src="/a290e801-15d8-4100-82a5-d1e622bbba8b.jpg" className="h-auto w-32 mb-2 mx-auto"  alt="" />,
    ],
    "Total Orders": [
      analytics.totalOrders,
      <img src="/9212305.jpg" className="h-auto w-32 mb-2 mx-auto" alt="" />
    ],
    "Total Products": [
      analytics.totalProducts,
      <img src="/hand_giving_growing_plant_flat_style.jpg"  className="h-auto w-32 mb-2 mx-auto" alt="" />
    ],
    "Total Blogs": [
      analytics.totalBlogs,
      <img src="/A.jpg"  className="h-auto w-32 mb-2 mx-auto" alt="" />
    ],
  };
  return (
    <div className="w-full">
      <div className="flex justify-evenly w-full">
        <div>
          <div className="flex w-full justify-evenly">
            <section class="text-gray-600 body-font">
              <div class="container mx-auto">
                <div class="flex flex-wrap text-center items-center mt-4 w-full">
                  {Object.entries(statsData).map((stat) => (
                    <div class="p-2 md:w-1/5">
                      <div class="border-2 border-gray-200 dark:border-gray-500 px-4 shadow-md rounded-lg">
                        {stat[1][1]}
                        <h2 class="title-font font-medium text-3xl text-gray-900 dark:text-gray-200">
                          {stat[1][0]}
                        </h2>
                        <p class="leading-relaxed dark:text-gray-300">{stat[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>{" "}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;
