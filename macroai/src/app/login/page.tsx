"use client";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log({ username, password });
  };

  return (
    <div className="bg-gradient-to-bl from-gray-900 to-blue-800 w-screen h-screen flex-col text-white">
      <head>
        <title>macrofy</title>
      </head>
      <Navbar />
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white h-[500px] w-96 mb-10 rounded-lg">
          <div className="flex justify-center mt-20">
            <h1 className={`text-black text-2xl font-bold ${roboto.className}`}>
              Log in for macrofy
            </h1>
          </div>
          <div className="p-6 flex flex-col">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
            <div className="flex justify-center mt-12">
              <button
                onClick={handleSubmit}
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
