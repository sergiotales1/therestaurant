const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};

const validateToken = (token) => {
  let id = jwt.verify(token, "secret").id;
  return id;
};

async function connectToDb() {
  await mongoose.connect(process.env.DB_CONNECTION_URL);
  console.log("Successfully connected into users db");
}
async function disconnectFromDb() {
  mongoose.connection.close();
  console.log("Disconnecting from db...");
}

module.exports = {
  createToken,
  validateToken,
  connectToDb,
  disconnectFromDb,
};
