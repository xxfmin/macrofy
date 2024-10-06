import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface CalorieLog extends mongoose.Document {
    food: string;
    weight: number;
    calories: number;
}

export const calorieSchematic = new Schema ({
    food: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
})

const CalorieLog = mongoose.model<CalorieLog>('CalorieLog', calorieSchematic);
export default CalorieLog;