const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Create schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Mongoose middleware that is executed right before any document save
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = {
  User: User,
};
