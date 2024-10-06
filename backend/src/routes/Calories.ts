import express, {Request, Response} from 'express';
import CalorieLog from '../models/CalorieModel';

const router = express.Router();

router.post('/calculator', async(req, res) => {
    const {
        body: {
            food,
            weight,
            calories,
        }
    } = req;

    if (!food || !weight || !calories) {
        res.status(400).send("All fields must be filled")
    }

    try {
        const newCalorieLog = new CalorieLog({
            food,
            weight,
            calories,
        })
        await newCalorieLog.save();
        res.status(201).send("Successfully created Calorie Log")

    } catch (error) {
        console.error("Error creating calorie log: ", error)
        res.status(500).send("Internal Server Error.")
    }

})

export default router;