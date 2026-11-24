
import { useEffect, useState } from "react";

const timerModes = {
  focus: {
    label: "Focus Session",
    duration: 25 * 60,
  },
  short: {
    label: "Short Break",
    duration: 5 * 60,
  },
  long: {
    label: "Long Break",
    duration: 15 * 60,
  },
};

function TimerPage() {
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(
    timerModes.focus.duration
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalSeconds = timerModes[mode].duration;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const progress =
    ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  // Run the countdown while the timer is active.
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((current) =>
        Math.max(current - 1, 0)
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Stop the timer when it reaches zero.
  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsComplete(true);
    }
  }, [secondsLeft, isRunning]);

  function handleModeChange(newMode) {
    setMode(newMode);
    setSecondsLeft(timerModes[newMode].duration);
    setIsRunning(false);
    setIsComplete(false);
  }

  function handleStartPause() {
    if (secondsLeft === 0) return;
    setIsRunning((current) => !current);
  }

  function handleReset() {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
    setIsComplete(false);
  }

  return (
    <section className="timer-page">
      <header className="timer-header">
        <h1>Focus Timer</h1>
        <p>Stay focused, work smarter, and take breaks.</p>
      </header>

      <div className="timer-card">

        <div className="timer-modes">
          <button
            type="button"
            className={mode === "focus" ? "active" : ""}
            onClick={() => handleModeChange("focus")}
          >
            Focus
          </button>

          <button
            type="button"
            className={mode === "short" ? "active" : ""}
            onClick={() => handleModeChange("short")}
          >
            Short Break
          </button>

          <button
            type="button"
            className={mode === "long" ? "active" : ""}
            onClick={() => handleModeChange("long")}
          >
            Long Break
          </button>
        </div>

        <div
          className="timer-circle"
          style={{
            background: `conic-gradient(
              var(--primary-color, #6366f1) ${progress}%,
              var(--border-color, #e5e7eb) ${progress}%
            )`,
          }}
        >
          <div className="timer-circle-inner">
            <p className="timer-mode-label">
              {timerModes[mode].label}
            </p>

            <h2 className="timer-display" aria-live="off">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </h2>

            <p className="timer-status" aria-live="polite">
              {isComplete
                ? "Session completed!"
                : isRunning
                ? "Stay focused..."
                : "Ready when you are"}
            </p>
          </div>
        </div>

        <div className="timer-controls">
          <button
            type="button"
            className="timer-start-button"
            onClick={handleStartPause}
            disabled={secondsLeft === 0}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            type="button"
            className="timer-reset-button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <p className="timer-tip">
          {mode === "focus"
            ? "One task at a time. Give it your full attention."
            : "Step away, relax, and recharge."}
        </p>

      </div>
    </section>
  );
}

export default TimerPage;
