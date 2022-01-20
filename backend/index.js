import express from "express";
import http from "http";
import moment from "moment";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import userRoute from "./Routes/userRoute.js";
import messageModels from "./Models/messageModel.js";
import chatroomRoute from "./Routes/chatroomRoute.js";
import DBOperation from "./Database/dbOperation.js";

dotenv.config();

const db = new DBOperation("chat_messages");
const db_ = new DBOperation("users");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const PORT = 8080;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1/chat/user", userRoute);
app.use("/api/v1/chatroom", chatroomRoute);
app.get("/", (req, res) => {
  res.status(200).send("Now it's running on port 8080");
});
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    socket.user_id = payload.id;
    console.log(socket.user_id);
    next();
  } catch (error) {
    console.log(error.message);
  }
});
io.on("connection", (socket) => {
  console.log("What is a socket:", socket.user_id);
  console.log("Socket is active to be connected!!!");
  // socket.emit("chat", {name: "Patrick Ishimwe", message: "hello world"});
  socket.on("chatroom", async (payload) => {
    console.log(payload);
    const user_info = await db_.selectByColumn("user_id", socket.user_id);
    console.log(user_info.rows)
    if (!user_info.rows[0]) {
      console.log("No use in Database!!!");
    }
    const message = {
      sender_id: socket.user_id,
      message: payload.message,
    };
    const messageSchema = new messageModels(message);
    messageSchema.createdat = moment().format();
    console.log(messageSchema);
    const saveMessage = await db.insertData(messageSchema);
    console.log(saveMessage);
    if (!saveMessage.rows[0]) {
      console.log("Error on saving Message");
    }
    delete messageSchema.sender_id;
    messageSchema.username = user_info.rows[0].username;
    console.log(messageSchema);
    console.log("What is playload: ", message);
    io.emit("chat", messageSchema);
  });
});
server.listen(PORT, () => {
  console.log(`Connection Started on localhost port ${PORT}`);
});
export { app as default };
