const express = require("express");
const cors = require("cors");
const {
  addNewReserva,
  readReservas,
  updateExpiredReservas,
} = require("./controllers/reservaController");
const {
  addNewUser,
  loginUser,
  getUser,
} = require("./controllers/userController");
const { createToken, validateToken } = require("./utils.js");

const app = express();
const port = 3000;

// Accept cors with this config
// We only need this because of cookies creation / read
const corsOptions = {
  origin: "http://localhost:5173",
  // origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// Other requests would be easily allowed by cors without config, but
// not cookies!
app.use(cors(corsOptions));
app.use(express.json());

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

app.get("/reservas", async (req, res) => {
  try {
    const reservas = await readReservas();
    res.status(200).json({ reservas });
  } catch (error) {
    console.log("Handled into post /dashboard: " + error);

    res.status(404).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);

    // Create token
    let token = createToken(user._id);
    res.cookie("jwt", token);
    res.status(200).send("successfully logged in");
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
    let token = createToken(user._id);
    res.cookie("jwt", token);
    res.send(token);
  } catch (error) {
    console.log("Handled into post /signup: " + error);
    res.status(404).send(error.message);
  }
});

app.post("/dashboard", async (req, res) => {
  // This route grabs the current user and send data, with the admin
  // property which will dictate the view
  let token = req.body.token;
  //TODO:
  // await cleanReservas();

  // Here we receive valid reservas already filtered
  try {
    const reservas = await readReservas();
    let userId = validateToken(token);
    let user = await getUser(userId);
    res.status(200).json({ user, reservas });
  } catch (error) {
    console.log("Handled into post /dashboard: " + error);

    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log("Server running!");
});
