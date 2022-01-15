import DBOperation from "../Database/dbOperation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const db = new DBOperation("users");
class UserController {
  static async createUser(req, res) {
    const { userInfo } = req.body;
    try {
      const userExist = await db.selectByColumn("username", userInfo.username);
      if (userExist.rows[0]) {
        res.status(409).json({
          status: 409,
          message: `User with this ${userInfo.username} is already exist!!`,
        });
      }
      const saveUser = await db.insertData(userInfo);
      if (!saveUser.rows[0]) {
        res.status(500).json({
          status: 500,
          message: "Internal server error!!",
        });
      }
      const token = jwt.sign(
        { user_id: saveUser.rows[0].user_id, iat: "10d" },
        process.env.SECRET_KEY
      );
      res.status(201).json({
        status: 201,
        message: `User created successful with ${saveUser.rows[0].username} as username!!`,
        token,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  static async signIn(req, res) {
    const { userCredential } = req.body;
    try {
      const userExist = await db.selectByColumn(
        "username",
        userCredential.username
      );
      if (!userExist.rows[0]) {
        res.status(404).json({
          status: 404,
          message: `User with this ${userCredential.username} doesn't exist!!!`,
        });
      }
      const passwordMatch = bcrypt.compareSync(
        userCredential.password,
        userExist.rows[0].password
      );
      if (!passwordMatch) {
        res.status(401).json({
          status: 401,
          message: "Username and password doesn't match!!!!",
        });
      }
      const token = jwt.sign(
        { user_id: saveUser.rows[0].user_id, iat: "10d" },
        process.env.SECRET_KEY
      );
      res.status(200).json({
        status: 200,
        message: "You logged in successful!!!!",
        token,
      });
    } catch (error) {
      console.log(error.message);
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
