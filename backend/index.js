import express from "express";
import http from "http";
import moment from "moment";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import userRoute from "./Routes/userRoute.js";
import messageModels from "./Models/messageModel.js";
import chatroomRoute from "./Routes/chatroomRoute.js";
import DbOperation from "./Database/dbOperation.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const PORT = 8080;

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
  socket.on("chatroom", (payload) => {
    const message = {
      sender: payload.name,
      message: payload.message,
    };
    const messageSchema = new messageModels(message);
    messageSchema.createdAt = moment().format();

    console.log(messageSchema);
    console.log(moment().format("LLL"));
    console.log("What is playload: ", payload);
    io.emit("chat", payload);
  });
});
server.listen(PORT, () => {
  console.log(`Connection Started on localhost port ${PORT}`);
});
export { app as default };
