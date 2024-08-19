const mongoose = require("mongoose");
const { User } = require("./user");

async function addNewUser(userData) {
  try {
    // Create / connect to collection users
    await mongoose.connect("mongodb://127.0.0.1:27017/users");
    console.log("Successfully connected into users db");

    // Create new user (create new document)
    const newUser = new User(userData);

    // Save new user
    await newUser.save();

    // Query all users
    const users = await User.find();
    console.log(users);

    //NOTE: To clean db:
    await User.deleteMany({});
  } catch (error) {
    console.log("An error occurred:" + error);
  }
}

module.exports = { addNewUser };
