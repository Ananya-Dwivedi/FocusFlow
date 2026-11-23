import { useState } from "react";

function CalendarPage({ tasks = [] }) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  function changeMonth(amount) {
    setCurrentDate(new Date(year, month + amount, 1));
    setSelectedDate(null);
  }

  function getTasksForDay(day) {
    if (!day) return [];
    const dateKey = [
      year,
      String(month + 1).padStart(2, "0"),
      String(day).padStart(2, "0"),
    ].join("-");

    return tasks.filter((task) => task.dueDate === dateKey);
  }

  const selectedTasks = selectedDate ? getTasksForDay(selectedDate) : [];

  return (
    <section className="calendar-page">
      <header className="calendar-header">
        <div>
          <h1>Calendar</h1>
          <p>Keep track of your upcoming deadlines.</p>
        </div>

        <div className="calendar-navigation">
          <button type="button" onClick={() => changeMonth(-1)}>
            &larr;
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentDate(new Date());
              setSelectedDate(null);
            }}
          >
            Today
          </button>
          <button type="button" onClick={() => changeMonth(1)}>
            &rarr;
          </button>
        </div>
      </header>

      <h2 className="calendar-month">
        {currentDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </h2>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div className="calendar-weekday" key={day}>
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const dayTasks = getTasksForDay(day);
          const isSelected = selectedDate === day;
          const today = new Date();
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <button
              type="button"
              key={`${year}-${month}-${index}`}
              className={[
                "calendar-day",
                !day ? "calendar-day-empty" : "",
                isSelected ? "selected" : "",
                isToday ? "today" : "",
              ].join(" ")}
              disabled={!day}
              onClick={() => setSelectedDate(day)}
            >
              {day && (
                <>
                  <span className="calendar-day-number">{day}</span>
                  <span className="calendar-day-tasks">
                    {dayTasks.slice(0, 2).map((task) => (
                      <span
                        className="calendar-task-label"
                        key={task.id}
                        title={task.title}
                      >
                        {task.title}
                      </span>
                    ))}
                    {dayTasks.length > 2 && (
                      <span className="calendar-more">
                        +{dayTasks.length - 2} more
                      </span>
                    )}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {selectedDate !== null && (
        <section className="calendar-selected-tasks">
          <h2>
            Tasks for{" "}
            {new Date(year, month, selectedDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h2>

          {selectedTasks.length > 0 ? (
            selectedTasks.map((task) => (
              <article className="calendar-task-item" key={task.id}>
                <strong>{task.title}</strong>
                <span>
                  {task.completed
                    ? "Completed"
                    : task.priority || "No priority"}
                </span>
              </article>
            ))
          ) : (
            <p>No tasks due on this date.</p>
          )}
        </section>
      )}
    </section>
  );
}

export default CalendarPage;
