"use client";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import logo from "../../components/images/logo.png"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700"],
});

export default function CalorieLog() {
  const [currentDate, setCurrentDate] = useState("");
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };
  const handleLogin = () => {
    router.push("/login");
  };
  const handleSignup = () => {
    router.push("/signup");
  };
  const handleLogMeal = () => {
    router.push("/image-recognition");
  };
  const handleLogs = () => {
    router.push("/Logs");
  };

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
      <nav className="flex items-center justify-between pt-3 pl-12 pr-12 absolute z-50 w-screen">
        <div className="flex items-center">
          <Image
            src={logo}
            className="pr-2 w-[40px]"
            width={50}
            height={50}
            alt="logo"
          />
          <h1 className={`text-white text-3xl ${roboto.className}`}>macrofy</h1>
        </div>

        <div className="flex items-center text-white space-x-8">
          <button
            onClick={handleHome}
            className="text-l hover:text-blue-400 transition duration-200 border border-white rounded-full py-1 px-4"
          >
            Home
          </button>
          <button
            onClick={handleLogMeal}
            className="text-l hover:text-blue-400 transition duration-200 border border-white rounded-full py-1 px-4"
          >
            Log Meal
          </button>
          <button
            onClick={handleLogs}
            className="text-l hover:text-blue-400 transition duration-200 border border-white rounded-full py-1 px-4"
          >
            Logs
          </button>
          <button
            onClick={handleLogin}
            className="text-l hover:text-blue-400 transition duration-200 border border-white rounded-full py-1 px-4"
          >
            Log In
          </button>
          <button
            onClick={handleSignup}
            className="text-l hover:text-blue-400 transition duration-200 border border-white rounded-full py-1 px-4"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white h-[600px] w-96 mb-10 rounded-lg flex flex-col justify-center items-col">
          <div className="justify-center">
            <h1 className={`text-black text-2xl font-bold ${roboto.className}`}>
              Calorie Log
            </h1>
            <p className="text-black text-sm mt-2 text-center">{currentDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
