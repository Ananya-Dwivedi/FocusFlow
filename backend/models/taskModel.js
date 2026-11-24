import pool from "../config/db.js";

// Get all tasks belonging to a particular user, with optional filters.
export const getTasksByUser = async (userId, filters = {}) => {
  const { search, status, priority, projectId, sortBy, order } = filters;

  let query = `
    SELECT
      tasks.id,
      tasks.user_id,
      tasks.project_id,
      tasks.title,
      tasks.category,
      tasks.priority,
      tasks.status,
      tasks.due_date,
      tasks.created_at,
      tasks.updated_at,
      projects.name AS project_name
    FROM tasks
    LEFT JOIN projects ON tasks.project_id = projects.id
    WHERE tasks.user_id = $1
  `;

  const values = [userId];

  if (search) {
    values.push(`%${search}%`);
    query += ` AND tasks.title ILIKE $${values.length}`;
  }

  if (status) {
    values.push(status);
    query += ` AND tasks.status = $${values.length}`;
  }

  if (priority) {
    values.push(priority);
    query += ` AND tasks.priority = $${values.length}`;
  }

  if (projectId) {
    values.push(projectId);
    query += ` AND tasks.project_id = $${values.length}`;
  }

  // SQL column names cannot be passed as query parameters, so use an allowlist.
  const allowedSortColumns = {
    created_at: "tasks.created_at",
    due_date: "tasks.due_date",
    title: "tasks.title",
    priority: "tasks.priority",
  };

  const selectedSort = allowedSortColumns[sortBy] || "tasks.created_at";
  const selectedOrder = order?.toLowerCase() === "asc" ? "ASC" : "DESC";

  query += ` ORDER BY ${selectedSort} ${selectedOrder}`;

  const result = await pool.query(query, values);
  return result.rows;
};

export const createTask = async (userId, taskData) => {
  const { projectId, title, category, priority, status, dueDate } = taskData;

  const result = await pool.query(
    `INSERT INTO tasks
      (user_id, project_id, title, category, priority, status, due_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      userId,
      projectId ?? null,
      title,
      category ?? null,
      priority ?? "medium",
      status ?? "todo",
      dueDate || null,
    ],
  );

  return result.rows[0];
};

export const findProjectByUser = async (projectId, userId) => {
  const result = await pool.query(
    `SELECT id FROM projects WHERE id = $1 AND user_id = $2`,
    [projectId, userId],
  );

  return result.rows[0];
};

// PATCH updates only the fields actually supplied by the frontend.
// This is important for status-only updates from the task checkbox and Kanban board.
export const updateTask = async (taskId, userId, taskData) => {
  const fieldMap = {
    title: "title",
    projectId: "project_id",
    category: "category",
    priority: "priority",
    status: "status",
    dueDate: "due_date",
  };

  const values = [];
  const assignments = [];

  for (const [property, column] of Object.entries(fieldMap)) {
    if (Object.prototype.hasOwnProperty.call(taskData, property)) {
      values.push(taskData[property] ?? null);
      assignments.push(`${column} = $${values.length}`);
    }
  }

  if (assignments.length === 0) {
    return null;
  }

  assignments.push("updated_at = CURRENT_TIMESTAMP");
  values.push(taskId, userId);

  const result = await pool.query(
    `UPDATE tasks
     SET ${assignments.join(", ")}
     WHERE id = $${values.length - 1} AND user_id = $${values.length}
     RETURNING *`,
    values,
  );

  return result.rows[0];
};

export const deleteTask = async (taskId, userId) => {
  const result = await pool.query(
    `DELETE FROM tasks
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [taskId, userId],
  );

  return result.rows[0];
};
