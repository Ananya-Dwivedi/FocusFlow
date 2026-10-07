

function Statistics({tasks}){
   

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const remainingTasks = totalTasks - completedTasks;
   
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
    )


}

export default Statistics