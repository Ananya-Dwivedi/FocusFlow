
import { useState } from "react";

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "projects", label: "Projects", icon: "▤" },
  { id: "kanban", label: "Kanban Board", icon: "▥" },
  { id: "calendar", label: "Calendar", icon: "▦" },
  { id: "timer", label: "Focus Timer", icon: "◷" },
  { id: "ai", label: "AI Assistant", icon: "✧" }
];

function Sidebar() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>FocusFlow</h2>
        <p>Productivity workspace</p>
      </div>

      <nav aria-label="Main navigation">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-link ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => setActivePage(item.id)}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
