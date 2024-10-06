'use client';
import Image from 'next/image';
import { Roboto } from 'next/font/google';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation' 

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['700'],
});

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async () => {
    setError('');
    setSuccess('');

    try {
      console.log("Attempting to register user")
      const response = await axios.post('http://localhost:4000/api/users/signup', {
        username,
        password,
      });
      console.log("Successfully registered User")
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during signup.');
      }
      console.error('Error during signup:', error);
    }
  };

  return (
    <div
      className="bg-black w-screen h-screen flex-col"
      style={{
        background: 'linear-gradient(to bottom left, #111, #000080)',
        height: '100vh',
        color: 'white',
      }}
    >
      <nav className="flex bg-black items-center pl-12">
        <Image src="/components/images/apple.jpg" width={50} height={50} alt="logo" />
        <h1 className={`text-white text-2xl ${roboto.className}`}>macrofy</h1>
      </nav>
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white h-[500px] w-96 mb-10 rounded-lg">
          <div className="flex justify-center mt-20">
            <h1 className={`header-font text-black text-2xl font-bold ${roboto.className}`}>
              Sign Up for Macrofy
            </h1>
          </div>
          <div className="p-6 flex flex-col ">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              <h1 className="text-black">Username:</h1>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              placeholder="Enter your username"
            />
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
              <h1 className="text-black">Password:</h1>
            </label>
            <input
              type="password" // Changed to "password" for security
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              placeholder="Enter your password"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>} {/* Error Message */}
            {success && <p className="text-green-500 mt-2">{success}</p>} {/* Success Message */}
            <div className="flex justify-center mt-12">
              <button
                onClick={handleSignUp}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
