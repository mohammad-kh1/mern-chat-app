import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.js';
import { getUsersForSidebar } from '../controllers/user.controller.js';

const Router = express.Router();

Router.get("/" , protectedRoute , getUsersForSidebar);

export default Router;