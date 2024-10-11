import express from "express";

// Auth Controllers
import { loginUser, registerUser, logoutUser } from "../controllers/auth.controller.js";

const Router = express.Router();

Router.post("/login" , loginUser);
Router.post("/register" , registerUser);
Router.post("/logout" , logoutUser);

export default Router;