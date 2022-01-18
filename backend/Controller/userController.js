import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import DBOperation from "../Database/dbOperation.js";
import Helper from "../Helper/user.helper.js";
import userModel from "../Models/userModel.js";

const db = new DBOperation("users");
class UserController {
  static async createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const userInfo = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const userExist = await db.selectByColumn("username", userInfo.username);
      if (userExist.rows[0]) {
        return res.status(409).json({
          status: 409,
          message: `User with this ${userInfo.username} is already exist!!`,
        });
      }
      const userSchame = new userModel(userInfo);
      const saveUser = await db.insertData(userSchame);
      if (!saveUser.rows[0]) {
        return res.status(500).json({
          status: 500,
          message: "Internal server error!!",
        });
      }
      const token = await Helper.generateToken(saveUser.rows[0].user_id);
      res.status(201).json({
        status: 201,
        message: `User created successful with ${saveUser.rows[0].username} as username!!`,
        token,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        msg: "Server Error!!",
      });
    }
  }
  static async signIn(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const userCredential = {
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const userExist = await db.selectByColumn(
        "username",
        userCredential.username
      );
      if (!userExist.rows[0]) {
        return res.status(404).json({
          status: 404,
          message: `User with this ${userCredential.username} doesn't exist!!!`,
        });
      }
      const passwordMatch = bcrypt.compareSync(
        userCredential.password,
        userExist.rows[0].password
      );
      if (!passwordMatch) {
        return res.status(401).json({
          status: 401,
          message: "Username and password doesn't match!!!!",
        });
      }
      const token = await Helper.generateToken(userExist.rows[0].user_id);
      res.status(200).json({
        status: 200,
        message: "You logged in successful!!!!",
        token,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        msg: "Server Error!!",
      });
    }
  }
  static async updatePassword(req, res) {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }
}

export { UserController as default };
