const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: { type: String, required: true, minglength: 5 },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

module.exports = User;
