import {
  getTasksByUser,
  createTask,
  findProjectByUser,
  updateTask,
  deleteTask,
} from "../models/taskModel.js";
import { validate as isValidUUID } from "uuid";

const validStatuses = ["todo", "in-progress", "done"];
const validPriorities = ["low", "medium", "high"];
const validSortFields = ["created_at", "due_date", "title", "priority"];
const validOrders = ["asc", "desc"];

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const search = req.query.search?.trim();
    const { status, priority, projectId, sortBy, order } = req.query;

    if (projectId && !isValidUUID(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority value" });
    }
    if (sortBy && !validSortFields.includes(sortBy)) {
      return res.status(400).json({ message: "Invalid sort field" });
    }
    if (order && !validOrders.includes(order.toLowerCase())) {
      return res.status(400).json({ message: "Invalid sort order" });
    }

    const tasks = await getTasksByUser(userId, {
      search,
      status,
      priority,
      projectId,
      sortBy,
      order,
    });

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error("Get tasks error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, projectId, category, priority, status, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority value" });
    }
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    if (projectId) {
      if (!isValidUUID(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      const project = await findProjectByUser(projectId, userId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
    }

    const task = await createTask(userId, {
      title: title.trim(),
      projectId,
      category,
      priority,
      status,
      dueDate,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const updates = {};
    const allowedFields = [
      "title",
      "projectId",
      "category",
      "priority",
      "status",
      "dueDate",
    ];

    if (!isValidUUID(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid task fields provided" });
    }
    if ("title" in updates) {
      if (typeof updates.title !== "string" || !updates.title.trim()) {
        return res.status(400).json({ message: "Task title cannot be empty" });
      }
      updates.title = updates.title.trim();
    }
    if (updates.priority && !validPriorities.includes(updates.priority)) {
      return res.status(400).json({ message: "Invalid priority value" });
    }
    if (updates.status && !validStatuses.includes(updates.status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    if (updates.projectId) {
      if (!isValidUUID(updates.projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      const project = await findProjectByUser(updates.projectId, userId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
    }

    const updatedTask = await updateTask(taskId, userId, updates);

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update task error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    if (!isValidUUID(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const deletedTask = await deleteTask(taskId, userId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error("Delete task error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
