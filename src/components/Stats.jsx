function Statistics({ stats }) {
  const totalTasks = Number(stats?.total_tasks ?? 0);
  const completedTasks = Number(stats?.completed_tasks ?? 0);
  const remainingTasks =
    Number(stats?.pending_tasks ?? 0) + Number(stats?.in_progress_tasks ?? 0);

  return (
    <section className="stats">
      <div className="stat-card">
        <h2>{totalTasks}</h2>
        <p>Total Tasks</p>
      </div>

      <div className="stat-card">
        <h2>{completedTasks}</h2>
        <p>Completed</p>
      </div>

      <div className="stat-card">
        <h2>{remainingTasks}</h2>
        <p>Remaining</p>
      </div>
    </section>
  );
}

export default Statistics;
