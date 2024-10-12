const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

/*These middleware functions are typically used to protect routes that require user or admin authentication.
For example, you might use the protectUser middleware for routes that require the user to be logged in,
and the protectAdmin middleware for routes that require the user to be an admin.  */

const protectUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
      return;
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }
};

const protectAdmin = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Admin Role Required" });
      }

      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      req.token = token; // Set the token in req
      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(401).json({ message: "Not authorized, Invalid token" });
  }
};
module.exports = { protectUser, protectAdmin };