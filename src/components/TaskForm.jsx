
import { useState,useEffect } from "react";

function TaskForm({ onAddTask, editingTask,onUpdateTask }) {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");


  useEffect(() => {
  if (editingTask) {
    setTitle(editingTask.title);
    setCategory(editingTask.category);
    setPriority(editingTask.priority);
    setDueDate(editingTask.dueDate);
  }
}, [editingTask]);


  function handleSubmit(event) {
    event.preventDefault();


  if (editingTask) {
    const updatedTask = {
      ...editingTask,
      title: title,
      category: category,
      priority: priority,
      dueDate: dueDate
    };

    onUpdateTask(updatedTask);
    return;
  }

    const newTask = {
        id: crypto.randomUUID(),
        title: title,
        completed: false,
        priority: priority,
        category: category,
        createdAt: new Date().toISOString(),
        dueDate: dueDate

        
  
    };

    onAddTask(newTask);
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

      </form>
    </section>
  );
}

export default TaskForm;

