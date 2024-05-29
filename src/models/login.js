const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true }
});

module.exports = mongoose.model("Login", loginSchema);
