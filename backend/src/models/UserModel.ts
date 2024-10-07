import mongoose from 'mongoose'
import {calorieSchematic, CalorieLog} from "./CalorieModel"

const Schema = mongoose.Schema

// Create an interface for users
export interface User extends mongoose.Document {
    username: string, 
    password: string, 
    meals: CalorieLog[],
}

export const userSchematic = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    meals: {
        type: [calorieSchematic],
        required: true,
        default: [],
    }
})

const User = mongoose.model<User>('User', userSchematic);
export default User;
