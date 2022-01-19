import express from "express";
import http from "http";
import moment from "moment";
import cors from "cors";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import userRoute from "./Routes/userRoute.js";
import messageModels from "./Models/messageModel.js";
import chatroomRoute from "./Routes/chatroomRoute.js";
import DBOperation from "./Database/dbOperation.js";

const db = new DBOperation("chat_messages");
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
io.on("connection", (socket) => {
  console.log("What is a socket:", socket.id);
  console.log("Socket is active to be connected!!!");
  // socket.emit("chat", {name: "Patrick Ishimwe", message: "hello world"});
  socket.on("chatroom", async (payload) => {
    console.log(payload)
    const message = {
      sender_id: payload.user_id,
      message: payload.message,
    };
    const messageSchema = new messageModels(message);
    messageSchema.createdat = moment().format();
    console.log(messageSchema)
    const saveMessage = await db.insertData(messageSchema);
    console.log(saveMessage)
    if (!saveMessage.rows[0]) {
      console.log("Error on saving Message");
    }
    console.log("What is playload: ", message);
    io.emit("chat", message);
  });
});
server.listen(PORT, () => {
  console.log(`Connection Started on localhost port ${PORT}`);
});
export { app as default };
