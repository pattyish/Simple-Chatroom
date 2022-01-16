import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Forbidden";
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(404).json({
        status: 404,
        msg: "There no token provided!!",
      });
    }
    const payload = await jwt.verify(token, process.env.SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      msg: "Forbidden ",
    });
  }
};
