const express = require("express");
const cors = require("cors");
const { addNewDocument } = require("./models/db");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from server");
  // res.json({ hello: "hello from server" });
});

app.post("/", (req, res) => {
  data = req.body;
  let reservaData = { ...data, date: new Date(req.body.date) };
  addNewDocument(reservaData);
  res.json({ payload: req.body });
});

app.listen(port, () => {
  console.log("Server running!");
});
