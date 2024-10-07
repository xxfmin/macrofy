import mongoose from 'mongoose'
import { CalorieLog } from './CalorieModel'; 
const Schema = mongoose.Schema

// Create an interface for users
export interface User extends mongoose.Document {
    username: string, 
    password: string, 
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
    picture: {
        type: String,
        required: false
    },
    weightGoal: {
        type: Number,
        required: false
    },
    startingWeight: {
        type: Number,
        required: false
    },
})

const User = mongoose.model<User>('User', userSchematic);
export default User;
