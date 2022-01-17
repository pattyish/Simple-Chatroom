import express from "express";
import chatroomController from "../Controller/chatroomController.js";
import { auth } from "../Middlewares/auth.js";
const router = express();

router.get("/chats", [auth], chatroomController.getChats);
// router.post("/sign_in", UserController.signIn);

export { router as default };
