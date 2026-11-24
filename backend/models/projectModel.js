import pool from "../config/db.js";

// Get all projects belonging to a user
export const getProjectsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT *
         FROM projects
         WHERE user_id = $1
         ORDER BY created_at DESC`,
    [userId],
  );

  return result.rows;
};

export const createProject = async (userId, projectData) => {
  const { name, description } = projectData;

  const result = await pool.query(
    `INSERT INTO projects (user_id, name, description)
         VALUES ($1, $2, $3)
         RETURNING *`,
    [userId, name, description ?? null],
  );

  return result.rows[0];
};

// Update a project
export const updateProject = async (projectId, userId, projectData) => {
  const { name, description } = projectData;

  const result = await pool.query(
    `UPDATE projects
         SET name = $1,
             description = $2
         WHERE id = $3 AND user_id = $4
         RETURNING *`,
    [name, description ?? null, projectId, userId],
  );

  return result.rows[0];
};

// Delete a project
export const deleteProject = async (projectId, userId) => {
  const result = await pool.query(
    `DELETE FROM projects
         WHERE id = $1 AND user_id = $2
         RETURNING *`,
    [projectId, userId],
  );

  return result.rows[0];
};
