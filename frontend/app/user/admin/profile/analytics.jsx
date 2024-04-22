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
  console.log(events, "users");
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
  console.log(users, events, orders, pieData);
  return (
    <div>
      <h1 className="text-2xl font-extrabold my-4">Analytics</h1>
      <div className="flex justify-evenly w-100">
        <div>
          <div className="flex w-full justify-evenly">
            <ChartBox
              {...{
                ...chartBoxProduct,
                title: "Total Users",
                percentage: Math.round(Math.random() * 50),
                number: users.length,
                dataKey: "users",
              }}
            />
            <ChartBox
              {...{
                ...chartBoxProduct,
                percentage: Math.round(Math.random() * 50),
                title: "Total Events",
                number: events.length,
                dataKey: "events",
              }}
            />
            <ChartBox
              {...{
                ...chartBoxProduct,
                title: "Total Orders",
                percentage: Math.round(Math.random() * 50),
                number: orders.length,
                dataKey: "orders",
              }}
            />
            <ChartBox
              {...{
                ...chartBoxProduct,
                title: "Total Products",
                percentage: Math.round(Math.random() * 50),
                number: Object.keys(pieData).length,
              }}
            />
          </div>

          <Approvals />
        </div>
        <div className="">
          <div className="h-60 w-60 m-8">
            <legend>Total Transactions / Day </legend>
            <ReactChart
              type="bar"
              data={{
                labels: Object.keys(barData),
                datasets: [
                  {
                    label: "Total Price",
                    data: Object.values(barData).map((d) => d.totalPrice),
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                  },
                  {
                    label: "Count",
                    data: Object.values(barData).map((d) => d.count),
                    borderColor: "rgb(192, 75, 75)",
                    backgroundColor: "rgba(192, 75, 75, 0.2)",
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "day",
                      displayFormats: {
                        day: "MMM d",
                      },
                    },
                  },
                },
              }}
              height={50}
              width={50}
            />
          </div>
          <div className="h-60 w-60 m-8">
            <legend>Items Sold</legend>
            <ReactChart
              type="polarArea"
              data={{
                datasets: Object.entries(pieData).map(([u, d]) => ({
                  data: [d],
                  label: u,
                  borderColor: "rgb(75, 192, 192)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                })),
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "right",
                  },
                },
              }}
              height={50}
              width={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
