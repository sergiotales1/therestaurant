const mongoose = require("mongoose");
const { User } = require("./user");

async function addNewUser(userData) {
  try {
    // Create / connect to collection users
    await connectToDb();

    // Create new user (create new document)
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
  } catch (error) {
    await disconnectFromDb();
    if (error.code === 11000) {
      console.log("ERRORRRRR");
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
    // Catch errors from db
    throw new Error(error.message);
  }
}

async function connectToDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/users");
  console.log("Successfully connected into users db");
}
async function disconnectFromDb() {
  mongoose.connection.close();
  console.log("Disconnecting from db...");
}

module.exports = { addNewUser, loginUser };
