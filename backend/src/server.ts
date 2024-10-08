import express, { Request, Response } from "express";
import mongoose from "mongoose";
import userRoutes from './routes/User'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import calorieRoutes from './routes/Calories';


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use('/api/users', userRoutes);
app.use('/api/meals', calorieRoutes);

const PORT = 4000;

console.log("Connecting to database");
mongoose.connect("mongodb+srv://felipemin03:2huXUS1CYtXXbsA0@macroai.jqjtu.mongodb.net/?retryWrites=true&w=majority&appName=macroai").then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});