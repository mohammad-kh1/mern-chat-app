import express from "express";

// Auth Controllers
import { loginUser, registerUser, logoutUser } from "../controllers/auth.controller.js";

const Router = express.Router();

Router.get("/login" , loginUser);
Router.post("/register" , registerUser);
Router.get("/logout" , logoutUser);

export default Router;