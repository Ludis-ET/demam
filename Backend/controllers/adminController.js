const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, phoneNumber, password } = req.body;

  const adminExists = await Admin.findOne({ phoneNumber });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin with this phone number already exists.");
  }

  const admin = await Admin.create({
    name,
    phoneNumber,
    password,
  });

  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  if (admin) {
    res.status(201).json({
      success: true,
      message: "Admin registered successfully.",
      token,
      data: {
        _id: admin._id,
        name: admin.name,
        phoneNumber: admin.phoneNumber,
      },
    });
  } else {
    res.status(400);
    throw new Error(
      "Failed to register admin. Please check the provided data."
    );
  }
});

// @desc    Authenticate admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  const admin = await Admin.findOne({ phoneNumber });

  if (admin && (await admin.matchPassword(password))) {
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Save the token in the admin's tokens array
    admin.tokens.push(token);
    await admin.save();

    res.json({
      success: true,
      message: "Admin logged in successfully",
      token,
      data: {
        _id: admin._id,
        name: admin.name,
        phoneNumber: admin.phoneNumber,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid phoneNumber or password");
  }
});
// @desc    Get list of users
// @route   GET /api/admin/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Remove User
// @route DELETE /api/admin/users
// @access  Private/Admin

const removeUser = asyncHandler(async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Invalid id" });

  const user = await User.findByIdAndDelete(_id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ message: "User deleted successfully" });
});

// @desc    Logout admin
// @route   POST /api/admin/logout
// @access  Private/Admin
const logoutAdmin = asyncHandler(async (req, res) => {
  try {
    // Check if req.admin and req.token are defined
    if (!req.admin || !req.token) {
      return res
        .status(400)
        .json({ success: false, message: "Admin or token not found." });
    }

    // Filter out the token from the admin's tokens array
    req.admin.tokens = req.admin.tokens.filter((token) => token !== req.token); //remove the token from the admin's tokens array

    // Save the updated admin document
    await req.admin.save();

    res.json({ success: true, message: "Admin logged out successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get logged-in admin details
// @route   GET /api/admin/me
// @access  Private/Admin
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select("-password");

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  res.json({
    success: true,
    data: {
      _id: admin._id,
      name: admin.name,
      phoneNumber: admin.phoneNumber,
    },
  });
});

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find(); // Fetch all admins from the database
    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admins",
      error: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getUsers,
  removeUser,
  logoutAdmin,
  getAdminProfile,
  getAllAdmins,
};
