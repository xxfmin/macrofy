import express, { Request, Response } from "express";
import User from "../models/UserModel";  // Adjust the path to your model
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "All fields must be filled" });
        return
    }

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "Successfully registered user" });
        return
    } catch (error) {
        console.log("Error during signup: ", error);
        res.status(500).json({ message: "Internal server error" });
        return
    }
});

// Export the router
export default router;
