
function ThemeToggle({ theme, setTheme }) {
  function handleThemeChange() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleThemeChange}
      aria-label={`Switch to ${
        theme === "light" ? "dark" : "light"
      } mode`}
      title={`Switch to ${
        theme === "light" ? "dark" : "light"
      } mode`}
    >
      <span className="theme-icon" aria-hidden="true">
        {theme === "light" ? "☾" : "☀"}
      </span>

      <span>{theme === "light" ? "Dark" : "Light"}</span>
    </button>
  );
}

export default ThemeToggle;