'use client'
import Image from "next/image";
import input from "flowbite"
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['700']
});

const handleLogin = () => {
    // logic
}

export default function Login() {
  return (
    <div
      className="bg-black w-screen h-screen flex-col"
      style={{
        background: "linear-gradient(to bottom left, #111, #000080)",
        height: "100vh", // Full height of the viewport
        color: "white", // Optional: to make the text visible
      }}
    >
      {" "}
      <nav className="flex bg-black items-center pl-12">
        <Image src={"/components/images/apple.jpg"} width={50} height={50} alt="logo" />
        <h1 className={`text-white text-2x1 ${roboto.className}`}>macrofy</h1>
      </nav>
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white h-[500px] w-96 mb-10 rounded-lg">
            <div className="flex justify-center mt-20">
                <h1 className={`header-font text-black text-2xl font-bold ${roboto.className}`}>Log in for Macrofy</h1>
            </div> 
            <div className="p-6 flex flex-col ">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    <h1 className="text-black">Username:</h1>
                </label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your username"
                />
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
                    <h1 className="text-black">Password:</h1>
                </label>
                    <input
                    type="text"
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your password"    
                />
                <div className="flex justify-center mt-12">
                    <button onClick={() => {}} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log in</button> 
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
