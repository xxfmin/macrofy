"use client";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import logo from "../components/images/logo.png";
import Navbar from "../components/Navbar/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700"],
});

export default function CalorieLog() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div
      className="bg-gradient-to-bl from-gray-900 to-blue-800 overflow-hidden w-screen h-screen flex-col"
      style={{
        height: "100vh", // Full height of the viewport
        color: "white", // Optional: to make the text visible
      }}
    >
      <Navbar />

      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white h-[600px] w-96 mb-10 rounded-lg flex flex-col justify-center items-col">
          <div className="justify-center">
            <h1 className={"text-black text-2xl font-bold"}>Calorie Log</h1>
            <p className="text-black text-sm mt-2 text-center">{currentDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
