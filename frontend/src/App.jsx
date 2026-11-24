import { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import KanbanPage from "./pages/KanbanPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import TimerPage from "./pages/TimerPage.jsx";
import AssistantPage from "./pages/AssistantPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import Sidebar from "./components/Sidebar.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import taskReducer from "./taskReducer.js";
import "./App.css";

const API_URL = "http://localhost:5000/api";

// Convert PostgreSQL snake_case task fields to the frontend's camelCase format.
function normalizeTask(task) {
  return {
    ...task,
    completed: task.status === "done",
    createdAt: task.created_at ?? task.createdAt,
    dueDate: task.due_date ?? task.dueDate ?? "",
    projectId: task.project_id ?? task.projectId ?? null,
  };
}

function AppLayout({ theme, setTheme }) {
  return (
    <div className="app">
      <Sidebar />
      <main className="app-main">
        <div className="global-theme-toggle">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const { token } = useAuth();
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [dashboardStats, setDashboardStats] = useState(null);

  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  // Load the logged-in user's tasks and dashboard statistics.
  useEffect(() => {
    if (!token) {
      dispatch({ type: "SET_TASKS", payload: [] });
      setDashboardStats(null);
      return;
    }

    async function loadDashboardData() {
      try {
        const tasksResponse = await fetch(`${API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tasksData = await tasksResponse.json();

        if (!tasksResponse.ok) {
          throw new Error(tasksData.message || "Failed to fetch tasks");
        }

        dispatch({
          type: "SET_TASKS",
          payload: (tasksData.tasks || []).map(normalizeTask),
        });
      } catch (error) {
        console.error("Error loading tasks:", error);
      }

      try {
        const statsResponse = await fetch(`${API_URL}/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const statsData = await statsResponse.json();

        if (!statsResponse.ok) {
          throw new Error(
            statsData.message || "Failed to fetch dashboard stats",
          );
        }

        setDashboardStats(statsData.stats || null);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    }

    loadDashboardData();
  }, [token]);

  // Keep the selected theme across refreshes.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const filteredTasks = tasks.filter((task) => {
    const searchMatches = (task.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const filterMatches =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "incomplete" && !task.completed) ||
      (filter === "high" && task.priority === "high") ||
      (filter === "medium" && task.priority === "medium") ||
      (filter === "low" && task.priority === "low");

    return searchMatches && filterMatches;
  });

  const sortedTasks = [...filteredTasks];

  if (sortOption !== "none") {
    sortedTasks.sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortOption === "oldest") {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortOption === "dueDate") {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortOption === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return (
          (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
        );
      }
      return 0;
    });
  }

  async function handleAddTask(newTask) {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTask.title,
          category: newTask.category,
          priority: newTask.priority || "medium",
          status: "todo",
          dueDate: newTask.dueDate || null,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add task");

      dispatch({ type: "ADD_TASK", payload: normalizeTask(data.task) });
      await refreshDashboardStats();
      return true;
    } catch (error) {
      console.error("Error adding task:", error);
      alert(error.message);
      return false;
    }
  }

  async function handleToggleTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    await handleUpdateTaskStatus(taskId, task.completed ? "todo" : "done");
  }

  async function handleDeleteTask(taskId) {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete task");

      dispatch({ type: "DELETE_TASK", payload: taskId });
      await refreshDashboardStats();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert(error.message);
    }
  }

  function handleEditTask(task) {
    setEditingTask(task);
  }

  async function handleUpdateTask(updatedTask) {
    try {
      const response = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: updatedTask.title,
          category: updatedTask.category,
          priority: updatedTask.priority,
          status: updatedTask.status || "todo",
          dueDate: updatedTask.dueDate || null,
          projectId: updatedTask.projectId ?? null,
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update task");

      dispatch({ type: "UPDATE_TASK", payload: normalizeTask(data.task) });
      setEditingTask(null);
      await refreshDashboardStats();
    } catch (error) {
      console.error("Error updating task:", error);
      alert(error.message);
    }
  }

  async function handleUpdateTaskStatus(taskId, status) {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update task status");
      }

      dispatch({
        type: "UPDATE_TASK_STATUS",
        payload: { id: taskId, status: data.task.status },
      });
      await refreshDashboardStats();
    } catch (error) {
      console.error("Error updating task status:", error);
      alert(error.message);
    }
  }

  async function refreshDashboardStats() {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to refresh stats");
      setDashboardStats(data.stats || null);
    } catch (error) {
      console.error("Error refreshing dashboard stats:", error);
    }
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout theme={theme} setTheme={setTheme} />}>
            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  tasks={tasks}
                  dashboardStats={dashboardStats}
                  theme={theme}
                  setTheme={setTheme}
                  editingTask={editingTask}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filter={filter}
                  setFilter={setFilter}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  sortedTasks={sortedTasks}
                  onAddTask={handleAddTask}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                  onUpdateTask={handleUpdateTask}
                  onCancelEdit={handleCancelEdit}
                />
              }
            />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/kanban"
              element={
                <KanbanPage
                  tasks={tasks}
                  onUpdateTaskStatus={handleUpdateTaskStatus}
                />
              }
            />
            <Route path="/calendar" element={<CalendarPage tasks={tasks} />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
