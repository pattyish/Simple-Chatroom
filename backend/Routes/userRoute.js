import express from "express";
import UserController from "../Controller/userController.js";
import { auth } from "../Middlewares/auth.js";
const router = express();

router.post("/sign_up", UserController.createUser);
router.post("/sign_in", UserController.signIn);
router.get("/", auth, UserController.getUserProfile);
export { router as default };
