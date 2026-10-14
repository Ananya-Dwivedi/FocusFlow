
import { useState,useEffect } from "react";

function TaskForm({ onAddTask, editingTask,onUpdateTask , onCancelEdit}) {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [titleError, setTitleError] = useState("");


  function resetForm() {
    setTitle("");
    setCategory("");
    setPriority("");
    setDueDate("");
    setTitleError("");
}


  useEffect(() => {
  if (editingTask) {
    setTitle(editingTask.title);
    setCategory(editingTask.category);
    setPriority(editingTask.priority);
    setDueDate(editingTask.dueDate);
  } else {
    resetForm();
  }
}, [editingTask]);


  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError("Task title cannot be empty.");
      return;
    }


  if (editingTask) {
    const updatedTask = {
      ...editingTask,
      title: trimmedTitle,
      category: category,
      priority: priority,
      dueDate: dueDate
    };

    onUpdateTask(updatedTask);
    return;
  }

    const newTask = {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        completed: false,
        priority: priority,
        category: category,
        createdAt: new Date().toISOString(),
        dueDate: dueDate

        
  
    };

    onAddTask(newTask);
    resetForm();

  }

  return (
    <section className="task-form-section">
      <h2 className="form-title">
        {editingTask ? "Edit Task" : "Add Task"}
      </h2>

      <form className="task-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Task title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What do you need to do?"
          />
          {titleError && (
          <p className="form-error" role="alert">
            {titleError}
          </p>
        )}
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="e.g. React"
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>

        </div>

        <button className="primary-button" type="submit">
          {editingTask ? "Save Changes" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
             className="cancel-button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}

      </form>
    </section>
  );
}

export default TaskForm;

