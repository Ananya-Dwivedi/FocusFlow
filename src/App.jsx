
import { useState, useEffect } from "react";

import Header from "./components/Header.jsx";
import Statistics from "./components/Stats.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import SearchBar from "./components/SearchBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import SortBar from "./components/SortBar.jsx";

import "./App.css";

function App() {
  const task = {
    id: crypto.randomUUID(),
    title: "Complete React useEffect revision",
    completed: false,
    priority: "high",
    category: "React",
    createdAt: new Date().toISOString(),
    dueDate: "2026-10-12"
  };

  // LOAD: Get saved tasks when the app starts
  const [tasks, setTasks] = useState(() => {
    
    const savedTasks = localStorage.getItem("tasks");
    
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    
    return [task];
  });
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  

  const filteredTasks = tasks.filter((task) => {
  const searchMatches = task.title
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
  

const sortedTasks = [...filteredTasks].sort((a, b) => {
  if (sortOption === "newest") {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }

  if (sortOption === "oldest") {
    return new Date(a.createdAt) - new Date(b.createdAt);
  }

  if (sortOption === "dueDate") {
    return new Date(a.dueDate) - new Date(b.dueDate);
  }

  if (sortOption === "priority") {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3
    };

    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }

  return 0;
});

  
  
  // SAVE: Whenever tasks changes, save them to localStorage
  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  }, [tasks]);


  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleToggleTask(taskId) {
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        completed: !task.completed
      };
    }

    return task;
  });

  setTasks(updatedTasks);
}


function handleDeleteTask(taskId) {
  const updatedTasks = tasks.filter((task) => {
    return task.id !== taskId;
  });

  setTasks(updatedTasks);
}

function handleEditTask(task) {
  setEditingTask(task);
}

function handleUpdateTask(updatedTask) {
  const updatedTasks = tasks.map((task) => {
    if (task.id === updatedTask.id) {
      return updatedTask;
    }

    return task;
  });

  setTasks(updatedTasks);
  setEditingTask(null);
}



  return (
    <div className="app">
      <Header />
      <Statistics tasks={tasks} />
      <TaskForm onAddTask={handleAddTask}  
                editingTask={editingTask}
                onUpdateTask={handleUpdateTask}
                />

      <SearchBar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />

       <FilterBar
          filter={filter}
          onFilter={setFilter}
        />

        <SortBar
          sortOption={sortOption}
          onSort={setSortOption}
        />

      <TaskList
      tasks={sortedTasks}
      onToggleTask={handleToggleTask}
      onDeleteTask={handleDeleteTask}
      onEditTask={handleEditTask}
    />
    </div>
  );
}

export default App;

