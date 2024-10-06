'use client';
import { Roboto } from 'next/font/google';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect } from 'react';
import logo from "../components/images/logo.png";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['700']
});

export default function CalorieLog() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);
  
  return (
    <div
      className="overflow-hidden w-screen h-screen flex-col"
      style={{
        background: "linear-gradient(to bottom left, #111, #000080)",
        height: "100vh", // Full height of the viewport
        color: "white", // Optional: to make the text visible
      }}
    >
      <nav className="flex items-center pt-3 pl-12 absolute z-50 w-screen">
        <Image
          src={logo}
          className="pr-2 w-[40px]"
          width={50}
          height={50}
          alt="logo"
        />
        <h1 className={`text-white text-3x1 ${roboto.className}`}>macrofy</h1>
      </nav>

      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white h-[600px] w-96 mb-10 rounded-lg flex flex-col justify-center items-col">
          <div className="justify-center">
            <h1 className={`text-black text-2xl font-bold ${roboto.className}`}>
              Calorie Log
            </h1>
            <p className="text-black text-sm mt-2 text-center">
              {currentDate}
            </p>
          </div>   
        </div>
      </div>
    </div>
  )
}