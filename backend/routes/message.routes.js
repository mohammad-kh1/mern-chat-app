import express from 'express';

import { sendMessage , getMessages } from '../controllers/message.controller.js';
import protectedRoute from '../middlewares/protectedRoute.js';

const Router = express.Router();

Router.post("/send/:id" , protectedRoute ,  sendMessage );
Router.get("/:id" , protectedRoute ,  getMessages);

export default Router;