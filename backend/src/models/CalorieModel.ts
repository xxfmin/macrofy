import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface CalorieLog extends mongoose.Document {
    food: string;
    weight: string;
    calories: string;
}

export const calorieSchematic = new Schema ({
    food: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    calories: {
        type: String,
        required: true,
    },
})

const CalorieLog = mongoose.model<CalorieLog>('CalorieLog', calorieSchematic);
export default CalorieLog;