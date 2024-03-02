"use client";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/NavBar";
import { useAppSelector } from "./store/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  console.log(user);
  return (
    <>
      <NavBar />
      <main className="dark:bg-gray-900">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-4 place-items-center md:grid-cols-2 lg:grid-cols-3"></div>
        </div>
      </main>
    </>
  );
}
