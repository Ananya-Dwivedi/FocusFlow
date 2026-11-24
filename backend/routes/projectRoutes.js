import express from "express";

import {
  getProjects,
  addProject,
  editProject,
  removeProject,
} from "../controllers/projectController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getProjects);
router.post("/", authenticateToken, addProject);
router.patch("/:id", authenticateToken, editProject);
router.delete("/:id", authenticateToken, removeProject);

export default router;
