"use client";
import Image from "next/image";
import logo from "../images/logo.png";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"
import { AiOutlineUser } from "react-icons/ai";


const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, user, logout} = useAuth()
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
    router.push(`/profile/${user.username}`);
  };
  const handleLogout = () => {
    logout()
    router.push("/")
  }
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
        
        {!isAuthenticated ? (
          <>
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
          </>
        ): (
          <>
            {/* Show username and Log Out button if authenticated */}
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
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="text-l hover:bg-blue-400 transition duration-200 border border-white rounded-full py-1 px-4"
            >
              Log Out
            </button>
            <div className="flex flex-row justify-center items-center ">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white">
              <AiOutlineUser className="text-2xl" />
             </div>
              <span className="text-l font-bold ml-2">{user?.username}</span>
            </div>
            
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
