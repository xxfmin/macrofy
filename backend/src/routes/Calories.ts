import express, { Request, Response } from "express";
import CalorieLog from "../models/CalorieModel";
import User from "../models/UserModel";

const router = express.Router();

router.post("/submitmeal", async (req: Request, res: Response) => {
  const {
    body: { username, meal, protein, calories, carbs, fats },
  } = req;

  if (!meal || !protein || !calories || !carbs || !fats) {
    res.status(400).send("All fields must be filled");
    return;
  }

  try {
    // check if user exists (felipe)
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const date = new Date().toISOString()

    const newCalorieLog = new CalorieLog({
      meal,
      protein,
      calories,
      carbs,
      fats,
      date
    });

    // add log to user's meal array (felipe)
    user.meals.push(newCalorieLog);
    // save the updated user (felipe)
    await user.save();

    res.status(201).send("Successfully created Meal Entry");
    return;
  } catch (error) {
    console.error("Error creating calorie log: ", error);
    res.status(500).send("Internal Server Error.");
    return;
  }
});

export default router;
