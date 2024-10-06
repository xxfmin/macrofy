import express, { Request, Response } from 'express';
import User from '../models/UserModel';  // Adjust the path to your model
import bcrypt from 'bcryptjs'


const router = express.Router();

router.post('/signup', async (req, res) => {
    const {
        body: {
            username,
            password,
        }
    } = req;

    if (!username || !password) {
        res.status(400).send("All fields must be filled")
    }

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(400).send("User already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            password: hashedPassword
        })

        await newUser.save()

        res.status(201).send("Successfully registered user")
    } catch (error) {
        console.log("Error during signup: ", error)
        res.status(500).send("Internal server error")
    }


});

export default router;
