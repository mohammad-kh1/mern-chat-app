import express from "express";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// DB
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// Middlewares
app.use(express.json()) // Parse JSON request bodies
app.use(cookieParser()) // Parse cookies

app.use("/API/auth" , authRoutes); // Auth Routes
app.use("/API/messages" , messageRoutes); // Messages Routes
app.use("/API/users" , userRoutes); // User Routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
    connectToMongoDB();
});