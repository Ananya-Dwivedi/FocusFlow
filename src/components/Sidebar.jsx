
import { NavLink } from "react-router-dom";

const navigationItems = [
  { id: "dashboard", label: "Dashboard", path: "/", icon: "▦" },
  { id: "projects", label: "Projects", path: "/projects", icon: "▤" },
  { id: "kanban", label: "Kanban Board", path: "/kanban", icon: "▥" },
  { id: "calendar", label: "Calendar", path: "/calendar", icon: "▦" },
  { id: "timer", label: "Focus Timer", path: "/timer", icon: "◷" },
  { id: "ai", label: "AI Assistant", path: "/assistant", icon: "✧" }
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>FocusFlow</h2>
        <p>Productivity workspace</p>
      </div>

      <nav aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
