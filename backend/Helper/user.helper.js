import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class Helper {
  static async generateToken(userId) {
    try {
      const Token = jwt.sign(
        {
          id: userId,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );
      return Token;
    } catch (error) {
      console.error(error.message);
    }
  }
}

export { Helper as default };
