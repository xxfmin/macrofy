"use client";
import Image from "next/image";
import logo from "../images/logo.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Popup = () => {
  const [meal, setMeal] = useState("");
  const [protein, setProtein] = useState("0");
  const [carbs, setCarbs] = useState("0");
  const [fats, setFats] = useState("0");
  const [calories, setCalories] = useState("0");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {user} = useAuth();

  const handleAddMeal = async () => {
        setError("");
        setSuccess("");

        const proteinInt = parseInt(protein);
        const carbsInt = parseInt(carbs);
        const fatsInt = parseInt(fats);
        const caloriesInt = parseInt(calories);

        try {
            console.log("Adding meal");
            const response = await axios.post(
            "http://localhost:4000/api/meals/submitmeal",
            {
                username: user.username,
                meal,
                calories: caloriesInt,
                protein: proteinInt,
                carbs: carbsInt,
                fats: fatsInt,
            }
            );
            console.log("Successfully added meal");
            setShowPopup(false);
        } catch (err) {
            console.log(err);
            if (err.response) {
              setError(err.response.data.message);
            } else {
              setError("An error occurred during meal addition");
            }
            console.error("Error during signup:", error);
        }
    };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
      >
        +
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4 text-black">Log a Meal</h2>
            <div className="mb-4">
              <label className="block text-black mb-1" htmlFor="meal">
                Meal Name
              </label>
              <input
                type="text"
                id="meal"
                name="meal"
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                placeholder="Enter Meal"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-1" htmlFor="calories">
                Calories
              </label>
              <input
                type="text"
                id="calories"
                name="calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                placeholder="Enter Calories"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-1" htmlFor="protein">
                Protein (g)
              </label>
              <input
                type="text"
                id="protein"
                name="protein"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                placeholder="Enter Protein"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-1" htmlFor="carbs">
                Carbs (g)
              </label>
              <input
                type="text"
                id="carbs"
                name="carbs"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                placeholder="Enter Carbs"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-1" htmlFor="fats">
                Fats (g)
              </label>
              <input
                type="text"
                id="fats"
                name="fats"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                placeholder="Enter Fats"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleClosePopup}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMeal}
                className="bg-blue-600 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700 focus:outline-none"
              >
                Add Meal
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
            {/* Error Message */}
            {success && <p className="text-green-500 mt-2">{success}</p>}{" "}
            {/* Success Message */}
        </div>
      )}
    </div>
  );
};

export default Popup;
