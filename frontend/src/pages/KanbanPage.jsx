


const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

function KanbanPage({ tasks, onUpdateTaskStatus }) {
  return (
    <section className="kanban-page">
      <header className="kanban-header">
        <div>
          <h1>Kanban Board</h1>
          <p>Track your tasks as they move forward.</p>
        </div>
      </header>

      <div className="kanban-columns">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.id
          );

          return (
            <section className="kanban-column" key={column.id}>
              <header className="kanban-column-header">
                <h2>{column.title}</h2>
                <span>{columnTasks.length}</span>
              </header>

              <div className="kanban-task-list">
                {columnTasks.map((task) => (
                  <article className="kanban-task" key={task.id}>
                    <h3>{task.title}</h3>

                    <p>
                      Priority: {task.priority || "Not set"}
                    </p>

                    <div className="kanban-task-actions">
                      {columns
                        .filter((item) => item.id !== column.id)
                        .map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              onUpdateTaskStatus(task.id, item.id)
                            }
                          >
                            Move to {item.title}
                          </button>
                        ))}
                    </div>
                  </article>
                ))}

                {columnTasks.length === 0 && (
                  <p className="kanban-empty">
                    No tasks in this column.
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

export default KanbanPage;
