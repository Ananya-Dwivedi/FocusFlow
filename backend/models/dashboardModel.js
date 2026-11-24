import pool from "../config/db.js";

// Get dashboard statistics for a user
export const getDashboardStats = async (userId) => {
  const result = await pool.query(
    `SELECT
            (SELECT COUNT(*)
             FROM tasks
             WHERE user_id = $1) AS total_tasks,

            (SELECT COUNT(*)
             FROM tasks
             WHERE user_id = $1 AND status = 'done') AS completed_tasks,

            (SELECT COUNT(*)
             FROM tasks
             WHERE user_id = $1 AND status = 'todo') AS pending_tasks,

            (SELECT COUNT(*)
             FROM tasks
             WHERE user_id = $1 AND status = 'in-progress') AS in_progress_tasks,

            (SELECT COUNT(*)
             FROM projects
             WHERE user_id = $1) AS total_projects`,
    [userId],
  );

  return result.rows[0];
};
