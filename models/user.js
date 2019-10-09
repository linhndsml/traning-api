const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 6
  },
  baseToken: String
});

const User = mongoose.model("User", userSchema);
module.exports = User;
