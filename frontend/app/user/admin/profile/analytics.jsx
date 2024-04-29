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

const Analytics = ({ orders }) => {
  const [users, setusers] = useState([]);
  const [events, setEvents] = useState([]);
  const { token } = useAppSelector((state) => state.auth);
  const fetchUsers = async () => {
    const response = await fetch(`${BACKEND_URL}/chats/chats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      const newUsers = new Set();
      data.forEach((chat) => {
        chat.members.forEach((mem) => newUsers.add(mem.name));
      });
      setusers([...newUsers]);
    }
  };
  const fetchEvents = async () => {
    const response = await fetch(`${BACKEND_URL}/events/upcoming`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setEvents(data);
    }
  };
  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);
  const pieData = {};
  for (const order of orders)
    for (const orderItem of order.orderItems) {
      if (!(orderItem.name in pieData)) pieData[orderItem.name] = 0;
      pieData[orderItem.name] += 1;
    }
  const barData = {}; // {date: {totalPrice: 0, count: 0}}
  for (const order of orders) {
    const date = order.createdAt.split("T")[0];
    if (!(date in barData)) barData[date] = { totalPrice: 0, count: 0 };
    barData[date].totalPrice += order.totalPrice;
    barData[date].count += 1;
  }

  const lineData = {}; //  community-activity random line graphs for each user
  for (const user of users) {
    lineData[user] = [];
    for (let i = 0; i < 10; i++) {
      lineData[user].push(Math.floor(Math.random() * 100));
    }
  }

  const eventsData = {}; // events per week
  for (const event of events) {
    const date = event.createdAt.split("T")[0];
    if (!(date in eventsData)) eventsData[date] = 0;
    eventsData[date] += 1;
  }

  const statsData = {
    "Total Users": [
      users.length,
      <img src="/abc.jpg" alt="" />,
    ],
    "Total Events": [
      events.length,
      <img src="/a290e801-15d8-4100-82a5-d1e622bbba8b.jpg" alt="" />,
    ],
    "Total Orders": [
      orders.length,
      <img src="/9212305.jpg" alt="" />
    ],
    "Total Products": [
      Object.keys(pieData).length,
      <img src="/hand_giving_growing_plant_flat_style.jpg" alt="" />
    ],
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold my-4">Analytics</h1>
      <div className="flex justify-evenly w-100">
        <div>
          <div className="flex w-full justify-evenly">
            <section class="text-gray-600 body-font">
              <div class="container mx-auto">
                <div class="flex flex-wrap text-center">
                  {Object.entries(statsData).map((stat) => (
                    <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                      <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        {stat[1][1]}
                        <h2 class="title-font font-medium text-3xl text-gray-900">
                          {stat[1][0]}
                        </h2>
                        <p class="leading-relaxed">{stat[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>{" "}
          </div>

          <Approvals />
        </div>
        <AddAdminModal />
      </div>
    </div>
  );
};

export default Analytics;
