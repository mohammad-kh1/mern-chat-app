import express from "express";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// Middlewares
app.use(express.json()) // Parse JSON request bodies

app.use("/API/auth" , authRoutes); // Auth Routes


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
    connectToMongoDB();
});