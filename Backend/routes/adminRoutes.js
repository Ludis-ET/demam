const express = require("express");
const Admin = require("../models/Admin");
const {
  registerAdmin,
  loginAdmin,
  getUsers,
  logoutAdmin,
  getAdminProfile,
  getAllAdmins,
} = require("../controllers/adminController");
const router = express.Router();
const { protectAdmin } = require("../middlewares/authMiddleware");

// Register a new admin
router.post("/register", registerAdmin);

// Admin login
router.post("/login", loginAdmin);

// Admin logout
router.post("/logout", protectAdmin, logoutAdmin);

// Get a list of users
router.get("/users", protectAdmin, getUsers);

// Get the logged-in admin's profile
router.get("/me", protectAdmin, getAdminProfile);

// Get all admins
router.get("/", protectAdmin, getAllAdmins);

// Find admin by ID
router.get("/users/:id", protectAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Delete admin by ID
router.delete("/users/:id", protectAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
