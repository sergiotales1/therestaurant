const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { addNewReserva } = require("./controllers/reservaController");
const { addNewUser, loginUser } = require("./controllers/userController");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// Accept cors with this config
// We only need this because of cookies creation / read
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

// Other requests would be easily allowed by cors without config, but
// not cookies!
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    // Create token
    const maxAge = 3 * 24 * 60 * 60; // 3 days
    const createToken = (id) => {
      return jwt.sign({ id }, "secret", {
        expiresIn: maxAge,
      });
    };

    let token = createToken(user._id);
    res.cookie("jwt", token);
    res.send("successfully logged in");
  } catch (error) {
    console.log("This is the error: " + error);
    res.status(404).send(error.message);
  }
});

app.post("/signup", async (req, res) => {
  let data = req.body;

  try {
    const user = await addNewUser(data);

    // Create token
    const maxAge = 3 * 24 * 60 * 60; // 3 days
    const createToken = (id) => {
      return jwt.sign({ id }, "secret", {
        expiresIn: maxAge,
      });
    };

    let token = createToken(user._id);
    res.cookie("jwt", token);
    res.send(token);
  } catch (error) {
    console.log("Handled into post /signup: " + error);
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log("Server running!");
});
