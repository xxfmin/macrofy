"use client";
import { Roboto } from "next/font/google";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Popup from "@/app/components/Popup/Popup";
import withAuth from "@/app/components/withAuth";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext"

interface Meal {
  meal: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
}

const CalorieLog = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [meals, setMeals] = useState<Meal[]>([])
  const [error, setError] = useState("")
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const { user } = useAuth()
  const [totalCalorie, setTotalCalorie] = useState(0);
  const [totalProtein, setTotalProtein] =  useState(0);
  const [totalCarbs, setTotalCarbs] =  useState(0);
  const [totalFat, setTotalFat] = useState(0);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    setCurrentDate(formattedDate);

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/get-user/${user.username}`)
        console.log(response)
        setMeals(response.data.meals)
      } catch (err) {
        console.log(err)
        setError("Unable to fetch user")
      }
    }

    fetchUser()

  }, [user.username]);

  useEffect(() => {
    console.log("Updated meals:", meals);

    const filterMeals = (meals:Meal[]) => {
      const dateFilteredMeals = meals.filter((meals) => {
        const mealDateConvert = new Date(meals.date)
        const formattedDate = mealDateConvert.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        })
        return formattedDate === currentDate
      })
      console.log(dateFilteredMeals)
      return dateFilteredMeals
    }

    const calculate = (meals:Meal[]) => {
      let totalCal = 0;
      let totalPro = 0;
      let totalCar = 0;
      let totalFats = 0;

      for (let i = 0; i < meals.length; i++){
        totalCal += meals[i].calories
        totalPro += meals[i].protein
        totalCar += meals[i].carbs
        totalFats += meals[i].fats
      }

      
      setTotalCalorie(totalCal)
      setTotalProtein(totalPro)
      setTotalCarbs(totalCar)
      setTotalFat(totalFats)
    }
    
    setFilteredMeals(filterMeals(meals))
    calculate(filteredMeals)
  }, [meals, currentDate]);

  return (
    <div
      className="bg-gradient-to-bl from-gray-900 to-blue-800 overflow-hidden w-screen h-screen flex-col"
      style={{
        height: "100vh",
        color: "white",
      }}
    >
      <Navbar />

      {/* Grid Layout Dividing Left and Right Sections */}
      <div
        className="grid grid-cols-2 gap-4"
        style={{ height: "100%", width: "100%" }}
      >
        {/* Left Side */}
        <div
          className="flex flex-col items-center justify-center ml-12"
          style={{
            width: "80%",
            padding: "50px",
            marginTop: "4rem",
          }}
        >
          <div
            className="border border-gray-400 bg-[#f9f9f9] rounded-lg p-10 mb-10 shadow-2xl"
            style={{ width: "100%" }}
          >
            {/* Current Date */}
            <h1 className="text-black font-bold text-4xl">Today's Log</h1>
            <h1 className="text-gray-500 text-xl mb-6">{currentDate}</h1>

            {/* Total Calorie Div */}
            <div className="border border-gray-200 bg-white rounded-lg mb-8 p-8 shadow-md text-center">
              <h1 className="text-6xl text-black font-semibold">{totalCalorie}</h1>
              <p className="text-gray-600 text-xl mt-2">Total Calories</p>
            </div>

            {/* Total Macros Div */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col bg-white items-center border border-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-xl text-black font-medium">Protein</h2>
                <p className="text-black font-semibold text-lg">{totalProtein}g</p>
              </div>
              <div className="flex flex-col bg-white items-center border border-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-xl text-black font-medium">Carbs</h2>
                <p className="text-black font-semibold text-lg">{totalCarbs}g</p>
              </div>
              <div className="flex flex-col bg-white items-center border border-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-xl text-black font-medium">Fat</h2>
                <p className="text-black font-semibold text-lg">{totalFat}g</p>
              </div>
            </div>
          </div>

          <Popup />
        </div>

        {/* Right Side */}
        <div
          className="flex flex-col items-start justify-start bg-white rounded-xl shadow-lg p-8"
          style={{
            width: "85%",
            height: "85%",
            padding: "40px",
            marginTop: "5rem",
          }}
        >
          <h1 className="text-black text-3xl font-bold mb-6">Meals Logged</h1>

          {/* Meals Logged Content (Placeholder for Actual Meals) */}
          <div className="space-y-4 w-full"> 
            {filteredMeals.map((meal, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold text-black">{meal.meal}</h2>
                <div className="flex flex-row space-x-4">
                  <div className="">
                    <p className="text-black">Calories: {meal.calories}</p>
                    <p className="text-black">Protein: {meal.protein}g</p>
                  </div>
                  <div className="">
                    <p className="text-black">Carbs: {meal.carbs}g</p>
                    <p className="text-black">Fats: {meal.fats}g</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CalorieLog)
