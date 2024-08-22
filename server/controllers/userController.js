const mongoose = require("mongoose");
const { User } = require("../models/user");

async function addNewUser(userData) {
  try {
    // Create / connect to collection users
    await connectToDb();

    // Create new user (create new document)
    //
    const newUser = new User(userData);

    // Save new user
    await newUser.save();

    // Query all users
    const users = await User.find();
    console.log(users);

    //NOTE: To clean db:
    // await User.deleteMany({ email: "john@gmail.com" });
    // Close connection
    await disconnectFromDb();
    return newUser;
  } catch (error) {
    await disconnectFromDb();
    if (error.code === 11000) {
      // Checks if we already have this email, if so we throw one
      // error that will be handled into /signup post route
      throw new Error("Esse email já existe no nosso restaurante!");
    }
    console.log("An error occurred:" + error);
  }
}

async function loginUser(email, password) {
  try {
    await connectToDb();
    const user = await User.login(email, password);
    // Close connection
    await disconnectFromDb();
    return user;
  } catch (error) {
    // Test the two possible unmatch errors from login
    if (error.message == "incorrect email") {
      throw new Error("Esse email não está cadastrado em nosso sistema!");
    }
    if (error.message == "incorrect password") {
      throw new Error("Senha incorreta, tente novamente!");
    }

    // If another error appear then we just throw it again
    throw new Error(error.message);
  }
}

async function getUser(id) {
  await connectToDb();
  let user = await User.findOne({ _id: id });
  await disconnectFromDb();
  return user;
}

async function connectToDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/users");
  console.log("Successfully connected into users db");
}
async function disconnectFromDb() {
  mongoose.connection.close();
  console.log("Disconnecting from db...");
}

module.exports = { addNewUser, loginUser, getUser };
