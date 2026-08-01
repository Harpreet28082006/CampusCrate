const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const jwtToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    console.log("JWT Token:", jwtToken);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    console.log("Decoded User:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
};