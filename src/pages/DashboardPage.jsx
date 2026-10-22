
import Header from "../components/Header.jsx";
import Statistics from "../components/Stats.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import FilterBar from "../components/FilterBar.jsx";
import SortBar from "../components/SortBar.jsx";

function DashboardPage({
  tasks,
  theme,
  setTheme,
  editingTask,
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  sortOption,
  setSortOption,
  sortedTasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onUpdateTask,
  onCancelEdit
}) {
  return (
    <>
      <Header />


      <Statistics tasks={tasks} />

      <TaskForm
        onAddTask={onAddTask}
        editingTask={editingTask}
        onUpdateTask={onUpdateTask}
        onCancelEdit={onCancelEdit}
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
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
      />
    </>
  );
}

export default DashboardPage;






// import Header from "../components/Header.jsx";
// import Statistics from "../components/Stats.jsx";
// import TaskForm from "../components/TaskForm.jsx";
// import TaskList from "../components/TaskList.jsx";
// import SearchBar from "../components/SearchBar.jsx";
// import FilterBar from "../components/FilterBar.jsx";
// import SortBar from "../components/SortBar.jsx";
// import ThemeToggle from "../components/ThemeToggle.jsx";

// function DashboardPage({
//   tasks,
//   theme,
//   setTheme,
//   editingTask,
//   searchTerm,
//   setSearchTerm,
//   filter,
//   setFilter,
//   sortOption,
//   setSortOption,
//   sortedTasks,
//   onAddTask,
//   onToggleTask,
//   onDeleteTask,
//   onEditTask,
//   onUpdateTask,
//   onCancelEdit
// }) {
//   return (
//     <>
//       <Header />

//       <ThemeToggle theme={theme} setTheme={setTheme} />

//       <Statistics tasks={tasks} />

//       <TaskForm
//         onAddTask={onAddTask}
//         editingTask={editingTask}
//         onUpdateTask={onUpdateTask}
//         onCancelEdit={onCancelEdit}
//       />

//       <SearchBar
//         searchTerm={searchTerm}
//         onSearch={setSearchTerm}
//       />

//       <FilterBar
//         filter={filter}
//         onFilter={setFilter}
//       />

//       <SortBar
//         sortOption={sortOption}
//         onSort={setSortOption}
//       />

//       <TaskList
//         tasks={sortedTasks}
//         totalTasks={tasks.length}
//         onToggleTask={onToggleTask}
//         onDeleteTask={onDeleteTask}
//         onEditTask={onEditTask}
//       />
//     </>
//   );
// }

// export default DashboardPage;
