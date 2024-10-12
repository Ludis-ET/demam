const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true }, // Use String for phone numbers
  password: { type: String, required: true },
  tokens: { type: [String], default: [] }, // Store tokens for admin sessions
});

// Hash password before saving the admin
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Define a method to generate a new token (optional)
AdminSchema.methods.addToken = function (token) {
  this.tokens.push(token);
  return this.save();
};

module.exports = mongoose.model("Admin", AdminSchema);
