const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, phoneNumber, password } = req.body;

  const userExists = await User.findOne({ phoneNumber });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    phoneNumber,
    password,
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400).json({message: "User registration failed"});
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  const user = await User.findOne({ phoneNumber });

  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      message: "User logged in successfully",
      data: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        token: generateToken(user._id),
      },
    });
  } else {
    //error json response message
    res.status(401).json({ message: "Invalid credentials" });
  }
});

//Logout user (this will clear the session) but we can also create a "token" field in the database and save the 
//users token in it and when ever the user is logged out it will be cleared

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "User logged out" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
