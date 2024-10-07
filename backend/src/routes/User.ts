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

        // saves user to database
        await newUser.save();
        res.status(201).json({ message: "Successfully registered user" });
        return
    } catch (error) {
        console.log("Error during signup: ", error);
        res.status(500).json({ message: "Internal server error" });
        return
    }
});

router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body
    
    if (!username || !password) {
        res.status(400).json({ message: "All fields must be filled" });
        return
    }

    try {
        const user = await User.findOne({ username })

        if (!user) {
            res.status(400).json({ message: "Invalid username"})
            return
        } 
        else {
            const passMatch = await bcrypt.compare(password, user.password)
            if (!passMatch) {
                res.status(400).json({ message: "Invalid password"})
                return
            }
            else{
                res.status(200).json({ message: "Successfully logged in", UserProfile: user})
                return
            }
        }

    } catch (error) {
        console.log("Error during login: ", error)
        res.status(500).json({ message: "Internal server error"})
        return
    }
})

router.get("/get-user/:username", async(req : Request, res: Response) => {

    try {
        const username = req.params.username
        const user = await User.findOne({ username })

        if (!user){
            res.status(404).json({message: "User not found"})
            return
        }

        res.status(200).json({
            "username": user.username,
            "meals": user.meals
        })
        return
    } catch(error) {
        res.status(500).json({error: error})
    }
})

// Export the router
export default router;
