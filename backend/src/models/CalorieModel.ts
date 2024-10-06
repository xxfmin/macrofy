import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface CalorieLog extends mongoose.Document {
    meal: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
}

export const calorieSchematic = new Schema ({
    meal: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    carbs: {
        type: Number,
        required: true,
    },
    fats: {
        type: Number,
        required: true,
    },
})

const CalorieLog = mongoose.model<CalorieLog>('CalorieLog', calorieSchematic);
export default CalorieLog;