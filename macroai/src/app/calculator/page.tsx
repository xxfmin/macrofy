'use client';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['700']
});

export default function Calculator() {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLog = async () => {
    setError('');
    setSuccess('');

    try {
      console.log("Awaiting to log calories")
      const response = await axios.post('http://localhost:4000/api/users/calculator', {
        food,
        calories,
        weight,
      });
      console.log("Successfully registered calories")

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during signup.');
      }
      console.error('Error during logging calories', error);
    }

  }
  return (
    <div
      className="bg-black w-screen h-screen flex-col"
      style={{
        background: "linear-gradient(to bottom left, #111, #000080)",
        height: "100vh", // Full height of the viewport
        color: "white", // Optional: to make the text visible
      }}
      >
      <nav className="flex bg-black items-center pl-12">
        <h1 className={`text-white text-2x1 ${roboto.className}`}>macrofy</h1>
      </nav>

      <input
        type="text"
        id="food"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        placeholder="Food Item"
        className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      <input
        type="text"
        id="calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        placeholder="Calories"
        className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      <input
        type="text"
        id="weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Weight"
        className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      <button
        onClick = {handleLog}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
      Log
      </button>
    </div>
  )
}