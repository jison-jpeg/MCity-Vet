import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
// import path from 'path';
dotenv.config();


const app = express();

app.use(express.json());
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');5
}).catch(error => {
    console.log(error);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use("/backend/user", userRoutes);
app.use("/backend/auth", authRoutes);


app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});