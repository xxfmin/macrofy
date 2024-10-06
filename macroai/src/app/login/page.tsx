"use client";
import { Roboto } from "next/font/google";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../components/images/logo.png"
import { useAuth } from "../context/AuthContext"


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async () => {
    console.log("Attempting to login");
    
    try {
      const response = await axios.post("http://localhost:4000/api/users/login", { username, password }); // Correct API endpoint

      console.log("Login successful", response.data);
      setSuccess("Login Successful");
      login(response.data.UserProfile.username, response.data.UserProfile._id)
      router.push(`/profile/${response.data.UserProfile.username}`); // Navigate to user's profile
    } catch (err) {
      console.error("Login error: ", err);
      setError("Something Happened");
    }
  };

  return (
    <div className="bg-gradient-to-bl from-gray-900 to-blue-800 w-screen h-screen flex-col text-white">
      <Head>
        <title>macrofy</title>
      </Head>
      <Navbar />
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white h-[500px] w-96 mb-10 rounded-lg">
          <div className="flex flex-col items-center justify-center mt-20">
            <Image src={logo} alt="logo" height={50} width={50}/>
            <h1 className={`text-black text-2xl mt-2 font-bold ${roboto.className}`}>
              Log in for macrofy
            </h1>
          </div>
          <div className="p-6 flex flex-col">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
            />
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 text-black border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
            <div className="flex justify-center mt-12">
              <button
                onClick={handleSubmit}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Log in
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
