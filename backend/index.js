import express from "express";
const app = express();
const PORT = 8080;

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Now it's running on port 8080");
});
app.listen(PORT, () => {
  console.log(`Connection Started on localhost port ${PORT}`);
});

export { app as default };