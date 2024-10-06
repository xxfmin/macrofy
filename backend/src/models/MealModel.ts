import mongoose, { Document, Schema } from "mongoose";
import { User } from "./UserModel"; // Importing User model

interface Macros {
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

export interface Meal extends Document {
  user: mongoose.Schema.Types.ObjectId; // Reference to User model's ObjectId
  imageUrl: string;
  ingredients: string[];
  macros: Record<string, Macros>;
  total_macros: Macros;
  timestamp: Date;
}

// Define the meal schema
const MealSchema: Schema = new mongoose.Schema<Meal>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference the User collection
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  macros: {
    type: Map,
    of: {
      protein: Number,
      fat: Number,
      carbs: Number,
      calories: Number,
    },
    required: true,
  },
  total_macros: {
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    carbs: { type: Number, required: true },
    calories: { type: Number, required: true },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Meal = mongoose.model<Meal>("Meal", MealSchema);
export default Meal;
