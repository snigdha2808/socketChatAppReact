import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/UserRoute.js";

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());

const port=process.env.PORT || 5001;

try{
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err)
    })
} catch (error) {
    console.log(error)
}

app.use("/api/user", userRoutes);

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})