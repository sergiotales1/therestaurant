const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
  await mongoose.connect("mongodb://127.0.0.1:27017/restaurantDb");
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
