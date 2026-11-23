import { useEffect, useState } from "react";

function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [titleError, setTitleError] = useState("");

  function resetForm() {
    setTitle("");
    setCategory("");
    setPriority("medium");
    setDueDate("");
    setTitleError("");
  }

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setCategory(editingTask.category || "");
      setPriority(editingTask.priority || "medium");
      setDueDate(editingTask.dueDate || "");
      setTitleError("");
    } else {
      resetForm();
    }
  }, [editingTask]);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError("Task title cannot be empty.");
      return;
    }

    setTitleError("");

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title: trimmedTitle,
        category,
        priority,
        dueDate,
      });
      return;
    }

    const saved = await onAddTask({
      title: trimmedTitle,
      category,
      priority,
      dueDate,
    });

    if (saved !== false) resetForm();
  }

  return (
    <section className="task-form-section">
      <h2 className="form-title">{editingTask ? "Edit Task" : "Add Task"}</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task-title">Task title</label>
          <input
            id="task-title"
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
            <label htmlFor="task-category">Category</label>
            <input
              id="task-category"
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="e.g. React"
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="task-due-date">Due date</label>
            <input
              id="task-due-date"
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
