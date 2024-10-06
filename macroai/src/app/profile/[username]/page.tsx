"use client";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Popup from "@/app/components/Popup/Popup";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700"],
});

export default function CalorieLog() {
  const [meal, setMeal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [calories, setCalories] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleAddMeal = (async) => {};
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
        height: "100vh",
        color: "white",
      }}
    >
      <Navbar />

      {/* Grid Layout Dividing Left and Right Sections */}
      <div
        className="grid grid-cols-2 gap-4"
        style={{ height: "100%", width: "100%" }}
      >
        {/* Left Side */}
        <div
          className="flex flex-col items-center justify-center ml-12"
          style={{
            width: "80%",
            padding: "50px",
            marginTop: "4rem",
          }}
        >
          <div
            className="border border-gray-400 bg-[#f9f9f9] rounded-lg p-10 mb-10 shadow-2xl"
            style={{ width: "100%" }}
          >
            {/* Current Date */}
            <h1 className="text-black font-bold text-4xl">Today's Log</h1>
            <h1 className="text-gray-500 text-xl mb-6">{currentDate}</h1>

            {/* Total Calorie Div */}
            <div className="border border-gray-200 bg-white rounded-lg mb-8 p-8 shadow-md text-center">
              <h1 className="text-6xl text-black font-semibold">69420</h1>
              <p className="text-gray-600 text-xl mt-2">Total Calories</p>
            </div>

            {/* Total Macros Div */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col bg-white items-center border border-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-xl text-black font-medium">Protein</h2>
                <p className="text-black font-semibold text-lg">69g</p>
              </div>
              <div className="flex flex-col bg-white items-center border border-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-xl text-black font-medium">Carbs</h2>
                <p className="text-black font-semibold text-lg">69g</p>
              </div>
              <div className="flex flex-col bg-white items-center border border-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-xl text-black font-medium">Fat</h2>
                <p className="text-black font-semibold text-lg">69g</p>
              </div>
            </div>
          </div>

          <Popup />
        </div>

        {/* Right Side */}
        <div
          className="flex flex-col items-start justify-start bg-white rounded-xl shadow-lg p-8"
          style={{
            width: "85%",
            height: "85%",
            padding: "40px",
            marginTop: "5rem",
          }}
        >
          <h1 className="text-black text-3xl font-bold mb-6">Meals Logged</h1>

          {/* Meals Logged Content (Placeholder for Actual Meals) */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-md w-full text-black mb-2">
            <p className="text-lg text-gray-600">Meal 1</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-md w-full text-black mb-2">
            <p className="text-lg text-gray-600">Meal 2</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-md w-full text-black mb-2">
            <p className="text-lg text-gray-600">Meal 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
