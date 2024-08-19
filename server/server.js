const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { addNewReserva } = require("./models/reservaDb");
const { addNewUser } = require("./models/userDb");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// NOTE: try to understand this later, i'm done for today
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello from server");
  // res.json({ hello: "hello from server" });
});

app.post("/reservas", (req, res) => {
  let data = req.body;
  let reservaData = { ...data, date: new Date(req.body.date) };
  addNewReserva(reservaData);
  res.json({ payload: req.body });
});

app.post("/login", (req, res) => {
  let data = req.body;
  addNewUser(data);

  res.cookie("test", true);

  // Create token
  //NOTE: NET NIJA code...
  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (password) => {
    return jwt.sign({ password }, "secret", {
      expiresIn: maxAge,
    });
  };

  let token = createToken(data.password);
  //NOTE: NET NINJA code...
  res.cookie("jwt", token);
  res.send(token);
});

app.listen(port, () => {
  console.log("Server running!");
});
