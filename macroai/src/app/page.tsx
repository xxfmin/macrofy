'use client'
import Image from "next/image";
import photo from "./components/images/IMG_7931.png";
import apple from "./components/images/apple-removebg-preview.png";
import { useRouter } from "next/navigation";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['700']
});

export default function Home() {


  const router = useRouter()
  const handleLogin = () => {
    router.push('/login');
  };
  const handleSignup = () => {
    router.push('/signup')
  }
  return (
    <div
      className='overflow-hidden h-screen w-screen flex-col'
      style={{
        background: "linear-gradient(to bottom left, #111, #000080)",
        height: "100%", // Full height of the viewport
        color: "white", // Optional: to make the text visible
      }}
    >
      {" "}
      <nav className="flex items-center pl-12 absolute z-50 w-screen">
        <Image src={apple} width={50} height={50} alt="logo" />
        <h1 className={`text-white text-2x1 ${roboto.className}`}>macrofy</h1>
      </nav>
      <div className="h-fit w-fit flex">
        <div className="flex h-screen w-1/3">
          <div className="flex flex-row">
            <div className="flex flex-col ml-7 relative top-32">
              <h1 className={`text-7xl pl-10 font-bold ${roboto.className}`}>Get Fit,</h1>
              <h1 className={`text-7xl pl-10 font-bold ${roboto.className}`}>Get Strong,</h1>
              <h1 className={`text-7xl pl-10 font-bold ${roboto.className}`}>Get Healthy!</h1>
              <p className="pl-10 pt-6 mr-10">
                Welcome to our food analysis tool! Snap a picture of your meal,
                and we'll instantly calculate its macros, calories, and offer
                tailored diet suggestions to help you achieve your nutrition and
                fitness goals.
              </p>
              <div className="ml-7 mt-4 pl-2">
                <button
                  onClick={() => {handleLogin()}}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Log in
                </button>
                <button
                  onClick={() => {handleSignup()}}
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
            className="w-[30rem] h-[40rem] object-cover rounder-tl-extraLarge rounded-br-extraLarge rounded-lg"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}
