import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Token required.",
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("Decoded JWT:", decoded);
    // 3. Store decoded user information
    req.user = decoded;

    // 4. Allow request to continue
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
