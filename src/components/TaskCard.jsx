function TaskCard({ task, onToggleTask, onDeleteTask ,onEditTask}) {
  return (
        <div className="task-card">

      <div className="task-content">

        <div className="task-header">
          <h2 className="task-title">{task.title}</h2>

          <span className={`priority-badge priority-${task.priority}`}>
            {task.priority}
          </span>
        </div>

        <p className="task-category">
          {task.category}
        </p>

        <p className="task-date">
          Due: {task.dueDate}
        </p>

        <p className={`task-status ${task.completed ? "completed" : "incomplete"}`}>
          {task.completed ? "Completed" : "Incomplete"}
        </p>

      </div>

      <div className="task-actions">

        <button
          className="complete-button"
          onClick={() => onToggleTask(task.id)}
        >
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>

        <button
          className="edit-button"
          onClick={() => onEditTask(task)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDeleteTask(task.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;