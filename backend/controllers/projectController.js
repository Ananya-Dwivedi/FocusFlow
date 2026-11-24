import {
  getProjectsByUser,
  createProject,
  updateProject,
  deleteProject,
} from "../models/projectModel.js";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await getProjectsByUser(userId);

    return res.status(200).json({
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Create a new project
export const addProject = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, description } = req.body;

    // Validate project name
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const newProject = await createProject(userId, {
      name: name.trim(),
      description,
    });

    return res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Create project error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Edit a project
export const editProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const updatedProject = await updateProject(projectId, userId, {
      name: name.trim(),
      description,
    });

    if (!updatedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Update project error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Delete a project
export const removeProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    const deletedProject = await deleteProject(projectId, userId);

    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    console.error("Delete project error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
