import express, { Request, Response } from "express";
import mongoose from "mongoose";
import userRoutes from './routes/User'; 
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));


const PORT = 4000;


app.post('/api/login', async (req, res) => {
    const { username, password} = req.body;

    const users = users.find(u => u.username === username);
    if (!users) {
        return res.status(401).json({ error: "Invalid username or password"});
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json({ error: "Invalid username or password"});
    }

    res.status(200).json({ message: "Login successful", user: { username: user.username}})
});


console.log("Connecting to database");
mongoose.connect("mongodb+srv://felipemin03:2huXUS1CYtXXbsA0@macroai.jqjtu.mongodb.net/?retryWrites=true&w=majority&appName=macroai").then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
});

app.use("/api/users", userRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});