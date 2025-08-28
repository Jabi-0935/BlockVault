require("dotenv").config({ quiet: true });
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "";

const generate_jwt = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

const verify_token = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generate_jwt, verify_token };
