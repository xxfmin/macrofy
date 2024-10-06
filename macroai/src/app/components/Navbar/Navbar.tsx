"use client";
import Image from "next/image";
import logo from "../images/logo.png";
import { useRouter } from "next/navigation";
import { Roboto } from "next/font/google";

const Navbar = () => {
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
  return (
    <nav className="flex items-center justify-between pt-3 pl-12 pr-12 absolute z-50 w-screen">
      <div className="flex items-center">
        <Image
          src={logo}
          className="pr-2 w-[40px]"
          width={50}
          height={50}
          alt="logo"
        />
        <h1 className={`text-white text-3xl`}>macrofy</h1>
      </div>

      <div className="flex items-center text-white space-x-8">
        <button
          onClick={handleHome}
          className="text-l hover:bg-blue-400 transition duration-200 border border-white rounded-full py-1 px-4"
        >
          Home
        </button>
        <button
          onClick={handleLogMeal}
          className="text-l hover:bg-blue-400 transition duration-200 border border-white rounded-full py-1 px-4"
        >
          Log Meal
        </button>
        <button
          onClick={handleLogs}
          className="text-l hover:bg-blue-400 transition duration-200 border border-white rounded-full py-1 px-4"
        >
          Logs
        </button>
        <button
          onClick={handleLogin}
          className="text-l hover:bg-blue-400 transition duration-200 border border-white rounded-full py-1 px-4"
        >
          Log In
        </button>
        <button
          onClick={handleSignup}
          className="text-l hover:bg-blue-400 transition duration-200 border border-white rounded-full py-1 px-4"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar
