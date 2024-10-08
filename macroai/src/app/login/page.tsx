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
      const response = await axios.post("http://localhost:4000/api/users/login", { username, password });

      console.log("Login successful", response.data);
      setSuccess("Login Successful");
      login(response.data.UserProfile.username, response.data.UserProfile._id)
      router.push(`/profile/${response.data.UserProfile.username}`);
    } catch (err) {
      console.error("Login error: ", err);
      setError("Unable to login");
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
              className="mt-1 block w-full px-3 py-2 border border-gray-400 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-400 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
            <div className="flex flex-col justify-center items-center mt-4">
              <div className="mb-2">
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
              </div>
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
