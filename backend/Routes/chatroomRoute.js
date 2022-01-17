import express from "express";
import chatroomController from "../Controller/chatroomController.js";
import { auth } from "../Middlewares/auth.js";
const router = express();

router.get("/chats", [auth], chatroomController.getChats);

export { router as default };
