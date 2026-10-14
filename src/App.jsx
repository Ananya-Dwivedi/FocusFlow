import { useReducer, useState, useEffect } from "react";

import Header from "./components/Header.jsx";
import Statistics from "./components/Stats.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import SearchBar from "./components/SearchBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import SortBar from "./components/SortBar.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Sidebar from "./components/Sidebar.jsx";


import taskReducer from "./taskReducer.js";
import "./App.css";

// Load saved tasks, or create the initial example task.
function loadTasks() {
    const initialTasks = [
    {
      id: crypto.randomUUID(),
      title: "Complete React useEffect revision",
      completed: false,
      priority: "high",
      category: "React",
      createdAt: new Date().toISOString(),
      dueDate: "2026-10-12"
    }
  ];

  try {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks === null) {
      return initialTasks;
    }

    const parsedTasks = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks)) {
      return initialTasks;
    }

    return parsedTasks;
  } catch (error) {
    console.error("Failed to load saved tasks:", error);
    return initialTasks;
  }
}

function App() {
  // Task state is now managed by useReducer.
  const [tasks, dispatch] = useReducer(
    taskReducer,
    undefined,
    loadTasks
  );

  // These are still ordinary UI states.
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "light";
});

  // Search and filter tasks.
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

  const sortedTasks = [...filteredTasks];

    if (sortOption !== "none") {
      sortedTasks.sort((a, b) => {
        if (sortOption === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }

        if (sortOption === "oldest") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }

        if (sortOption === "dueDate") {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;

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
    }

  // Save tasks whenever the task state changes.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);

  // Task operations now dispatch actions.
  function handleAddTask(newTask) {
    dispatch({
      type: "ADD_TASK",
      payload: newTask
    });
  }

  function handleToggleTask(taskId) {
    dispatch({
      type: "TOGGLE_TASK",
      payload: taskId
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "DELETE_TASK",
      payload: taskId
    });
  }

  function handleEditTask(task) {
    setEditingTask(task);
  }

  function handleUpdateTask(updatedTask) {
    dispatch({
      type: "UPDATE_TASK",
      payload: updatedTask
    });

    setEditingTask(null);
  }

  function handleCancelEdit() {
  setEditingTask(null);
}

  return (
    <div className="app">

        <Sidebar />

      <main className="app-main">

             <Header />

       <ThemeToggle theme={theme} setTheme={setTheme} />

      <Statistics tasks={tasks} />

      <TaskForm
        onAddTask={handleAddTask}
        editingTask={editingTask}
        onUpdateTask={handleUpdateTask}
        onCancelEdit={handleCancelEdit}

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
        totalTasks={tasks.length}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />

      </main>
   
    </div>
  );
}

export default App;
// import { useState, useEffect,useReducer } from "react";

// import Header from "./components/Header.jsx";
// import Statistics from "./components/Stats.jsx";
// import TaskForm from "./components/TaskForm.jsx";
// import TaskList from "./components/TaskList.jsx";
// import SearchBar from "./components/SearchBar.jsx";
// import FilterBar from "./components/FilterBar.jsx";
// import SortBar from "./components/SortBar.jsx";

// import taskReducer from "./taskReducer.js";
// import "./App.css";


// // Lets just load saved tasks, or create the initial example task.
// function loadTasks() {
//   const savedTasks = localStorage.getItem("tasks");

//   if (savedTasks) {
//     return JSON.parse(savedTasks);
//   }

//   return [
//     {
//       id: crypto.randomUUID(),
//       title: "Complete React useEffect revision",
//       completed: false,
//       priority: "high",
//       category: "React",
//       createdAt: new Date().toISOString(),
//       dueDate: "2026-10-12"
//     }
//   ];
// }



// function App() {

//    const [tasks, dispatch] = useReducer(
//     taskReducer,
//     undefined,
//     loadTasks
//   );
 
//   const [editingTask, setEditingTask] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [sortOption, setSortOption] = useState("newest");
  

//   const filteredTasks = tasks.filter((task) => {
//   const searchMatches = task.title
//     .toLowerCase()
//     .includes(searchTerm.toLowerCase());

//   const filterMatches =
//     filter === "all" ||
//     (filter === "completed" && task.completed) ||
//     (filter === "incomplete" && !task.completed) ||
//     (filter === "high" && task.priority === "high") ||
//     (filter === "medium" && task.priority === "medium") ||
//     (filter === "low" && task.priority === "low");

//   return searchMatches && filterMatches;
// });
  

// const sortedTasks = [...filteredTasks].sort((a, b) => {
//   if (sortOption === "newest") {
//     return new Date(b.createdAt) - new Date(a.createdAt);
//   }

//   if (sortOption === "oldest") {
//     return new Date(a.createdAt) - new Date(b.createdAt);
//   }

//   if (sortOption === "dueDate") {
//     return new Date(a.dueDate) - new Date(b.dueDate);
//   }

//   if (sortOption === "priority") {
//     const priorityOrder = {
//       high: 1,
//       medium: 2,
//       low: 3
//     };

//     return priorityOrder[a.priority] - priorityOrder[b.priority];
//   }

//   return 0;
// });

  
  
//   // SAVE: Whenever tasks changes, save them to localStorage
//   useEffect(() => {

//     localStorage.setItem(
//       "tasks",
//       JSON.stringify(tasks)
//     );

//   }, [tasks]);


//   function handleAddTask(newTask) {
//     setTasks([...tasks, newTask]);
//   }

//   function handleToggleTask(taskId) {
//   const updatedTasks = tasks.map((task) => {
//     if (task.id === taskId) {
//       return {
//         ...task,
//         completed: !task.completed
//       };
//     }

//     return task;
//   });

//   setTasks(updatedTasks);
// }


// function handleDeleteTask(taskId) {
//   const updatedTasks = tasks.filter((task) => {
//     return task.id !== taskId;
//   });

//   setTasks(updatedTasks);
// }

// function handleEditTask(task) {
//   setEditingTask(task);
// }

// function handleUpdateTask(updatedTask) {
//   const updatedTasks = tasks.map((task) => {
//     if (task.id === updatedTask.id) {
//       return updatedTask;
//     }

//     return task;
//   });

//   setTasks(updatedTasks);
//   setEditingTask(null);
// }



//   return (
//     <div className="app">
//       <Header />
//       <Statistics tasks={tasks} />
//       <TaskForm onAddTask={handleAddTask}  
//                 editingTask={editingTask}
//                 onUpdateTask={handleUpdateTask}
//                 />

//       <SearchBar
//           searchTerm={searchTerm}
//           onSearch={setSearchTerm}
//         />

//        <FilterBar
//           filter={filter}
//           onFilter={setFilter}
//         />

//         <SortBar
//           sortOption={sortOption}
//           onSort={setSortOption}
//         />

//       <TaskList
//       tasks={sortedTasks}
//       onToggleTask={handleToggleTask}
//       onDeleteTask={handleDeleteTask}
//       onEditTask={handleEditTask}
//     />
//     </div>
//   );
// }

// export default App;

