"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Roboto } from "next/font/google";
import Navbar from "../components/Navbar/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700"],
});

interface Macros {
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

interface ResponseData {
  ingredients: string[];
  quantities: string[];
  macros: {
    [ingredient: string]: Macros;
  };
  total_macros: Macros;
}

export default function ImageRecognition() {
  const [loadBindings, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ResponseData | null>(null);

  const formik = useFormik({
    initialValues: {
      image_url: "",
    },
    validationSchema: Yup.object({
      image_url: Yup.string()
        .url("Invalid URL")
        .required("Image URL is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      setResponse(null);
      try {
        const res: Response = await fetch("/image-recognition/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_url: values.image_url }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch the response");
        }

        const data: ResponseData = await res.json();
        setResponse(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      className="bg-gradient-to-bl from-gray-900 to-blue-800 min-h-screen flex flex-col"
      style={{}}
    >
      <head>
        <title>macrofy</title>
      </head>
      <Navbar />

      {/* Main Content Split into Two Columns */}
      <div className="flex flex-row w-full flex-grow pt-16">
        {/* Left Side: URL and Image */}
        <div className="w-1/2 p-8">
          <div className="border p-4 rounded-lg bg-white">
            <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
              <div className="w-full">
                <label
                  htmlFor="image_url"
                  className="block text-gray-700 text-sm font-bold"
                >
                  Image URL
                </label>
                <input
                  id="image_url"
                  type="text"
                  placeholder="Enter image URL here"
                  {...formik.getFieldProps("image_url")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.image_url && formik.errors.image_url ? (
                  <div style={{ color: "red" }}>{formik.errors.image_url}</div>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={loadBindings}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                {loadBindings ? "Submitting..." : "Submit"}
              </button>
            </form>

            {/* Image Preview */}
            {formik.values.image_url && (
              <div className="mt-4 flex items-center justify-center">
                <img
                  src={formik.values.image_url}
                  alt="Uploaded Preview"
                  className="max-w-full h-auto"
                  style={{
                    maxHeight: "60vh", // Ensuring image height does not overflow
                  }}
                />
              </div>
            )}

            {/* Conditionally render the Add to log button */}
            {response && (
              <div className="flex justify-center mt-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Add to log
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Ingredients, Macros, and Total Macros */}
        <div className="w-1/2 p-8 space-y-8 overflow-y-auto">
          {/* Ingredients Section */}
          <div className="border p-4 rounded-lg bg-white">
            <h2 className="font-bold text-gray-800 text-xl">Ingredients</h2>
            <p>
              {response && response.ingredients
                ? response.ingredients.join(", ")
                : "No ingredients available"}
            </p>
          </div>

          {/* Macros Section */}
          <div className="border p-4 rounded-lg bg-white">
            <h2 className="font-bold text-gray-800 text-xl">Macros</h2>
            <div className="grid grid-cols-2 gap-4">
              {response && response.macros ? (
                Object.entries(response.macros).map(([ingredient, macros]) => (
                  <div
                    key={ingredient}
                    className="p-4 border rounded-lg shadow-md bg-gray-50"
                  >
                    <h3 className="text-gray-700 font-bold">{ingredient}</h3>
                    <p>Protein: {macros.protein}g</p>
                    <p>Fat: {macros.fat}g</p>
                    <p>Carbs: {macros.carbs}g</p>
                    <p>Calories: {macros.calories}</p>
                  </div>
                ))
              ) : (
                <p>No macros available</p>
              )}
            </div>
          </div>

          {/* Total Macros Section */}
          <div className="border p-4 rounded-lg bg-white">
            <h2 className="font-bold text-gray-800 text-xl">Total Macros</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-2 border rounded-lg text-center">
                <p className="font-bold">Protein</p>
                <p>
                  {response && response.total_macros
                    ? `${response.total_macros.protein}g`
                    : "N/A"}
                </p>
              </div>
              <div className="p-2 border rounded-lg text-center">
                <p className="font-bold">Fat</p>
                <p>
                  {response && response.total_macros
                    ? `${response.total_macros.fat}g`
                    : "N/A"}
                </p>
              </div>
              <div className="p-2 border rounded-lg text-center">
                <p className="font-bold">Carbs</p>
                <p>
                  {response && response.total_macros
                    ? `${response.total_macros.carbs}g`
                    : "N/A"}
                </p>
              </div>
              <div className="p-2 border rounded-lg text-center">
                <p className="font-bold">Calories</p>
                <p>
                  {response && response.total_macros
                    ? `${response.total_macros.calories}`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
