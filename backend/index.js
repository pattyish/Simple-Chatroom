import express from "express";
import bodyParser from "body-parser";
import userRoute from "./Routes/userRoute.js";
const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1/chat/user", userRoute);
app.get("/", (req, res) => {
  res.status(200).send("Now it's running on port 8080");
});
app.listen(PORT, () => {
  console.log(`Connection Started on localhost port ${PORT}`);
});

export { app as default };
