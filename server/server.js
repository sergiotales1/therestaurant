const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { addNewReserva } = require("./models/reservaDb");
const { addNewUser, loginUser } = require("./models/userDb");
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
    res.json({ user: user._id });
  } catch (error) {
    console.log("This is the error: " + error);
    res.status(404).send(error.message);
  }
});

app.post("/signup", async (req, res) => {
  //NOTE: Now we have validation to stop logging the user without
  //having the right email / pw and we don't allow 2 accounts with
  //same email
  let data = req.body;

  try {
    // we put await to make the whole operation waits for this one
    // first, without this, the error was happening and the client were
    // not receving this info
    await addNewUser(data);

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
  } catch (error) {
    console.log("Handled into post /signup: " + error);
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log("Server running!");
});
