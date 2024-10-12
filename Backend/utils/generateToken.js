const jwt = require("jsonwebtoken");

//This function generates JWT tokens for the user(there is a separate token generation function for admin in admin contoller)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;

