import express from "express";
import UserController from "../Controller/userController.js";
const router = express();

router.post("/sign_up", UserController.createUser);
router.post("/sign_in", UserController.signIn);

export { router as default };
