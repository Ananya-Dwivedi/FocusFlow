import TaskCard from "./TaskCard.jsx";

function TaskList({ tasks, onToggleTask, onDeleteTask ,onEditTask}) {

  return (
    <section>
      <h1>Tasks</h1>

      {tasks.map((task) => (
        <TaskCard
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
    />
      ))}
      
    </section>
  );
}

export default TaskList;