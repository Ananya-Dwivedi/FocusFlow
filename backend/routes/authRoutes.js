import express from "express";

import { authenticateToken } from "../middlewares/authMiddleware.js";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "You are authenticated!",
    user: req.user,
  });
});

export default router;
