import TaskCard from "./TaskCard.jsx";

function TaskList({ tasks,totalTasks, onToggleTask, onDeleteTask ,onEditTask}) {


  if (tasks.length === 0) {
     if (totalTasks === 0) {
        return (
          <div className="empty-state">
            <div className="empty-state-icon" aria-hidden="true">📝</div>
            <h3>Your workspace is clear!</h3>
            <p>Add your first task and start making progress.</p>
          </div>
        );
      }

    
 return (
    <div className="empty-state">
      <h3>No matching tasks found</h3>
      <p>Try changing your search or filter.</p>
    </div>
  );
}

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