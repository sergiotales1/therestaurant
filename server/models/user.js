const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Create schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  bdayMonth: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Mongoose middleware that is executed right before any document save
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to login user
// NOTE: Check it again later!
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }

    throw new Error("incorrect password");
  }
  throw new Error("incorrect email");
};

// Create model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = {
  User: User,
};
