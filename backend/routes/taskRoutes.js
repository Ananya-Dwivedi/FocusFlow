import express from "express";

import {
  getTasks,
  addTask,
  editTask,
  removeTask,
} from "../controllers/taskController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all tasks
router.get("/", authenticateToken, getTasks);

// Create a task
router.post("/", authenticateToken, addTask);

router.patch("/:id", authenticateToken, editTask);
router.delete("/:id", authenticateToken, removeTask);

export default router;
