"use client";
import Image from "next/image";
import photo from "./components/images/cover-photo.png";
import { useRouter } from "next/navigation";
import { Roboto } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  const handleSignup = () => {
    router.push("/signup");
  };
  return (
    <div
      className="bg-gradient-to-bl from-gray-900 to-blue-800 overflow-hidden h-screen w-screen flex-col"
      style={{
        height: "100%",
        color: "white",
      }}
    >
      <Navbar />
      <div className="h-fit w-fit flex">
        <div className="flex h-screen w-1/3">
          <div className="flex flex-row">
            <div className="flex flex-col ml-7 relative top-32">
              <h1 className={`text-7xl pl-10 font-bold ${roboto.className}`}>
                Nourish Smart,
              </h1>
              <h1 className={`text-7xl pl-10 font-bold ${roboto.className}`}>
                Achieve More.
              </h1>
              <p className="pl-10 pt-6 mr-10 text-xl">
                Welcome to our food analysis tool! Enter a picture of your meal,
                and we'll instantly calculate its macros.
              </p>
              <div className="ml-7 mt-4 pl-2">
                <button
                  onClick={() => {
                    handleLogin();
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    handleSignup();
                  }}
                  className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3 flex justify-center items-center">
          <Image
            src={photo}
            className="w-[27rem] object-cover rounder-tl-extraLarge rounded-br-extraLarge rounded-lg"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}
