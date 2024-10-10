import express from "express";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;

// Auth Routes
app.use("/API/auth" , authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
    connectToMongoDB();
});