import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const navigationItems = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "▦" },
  { id: "projects", label: "Projects", path: "/projects", icon: "▤" },
  { id: "kanban", label: "Kanban Board", path: "/kanban", icon: "▥" },
  { id: "calendar", label: "Calendar", path: "/calendar", icon: "▦" },
  { id: "timer", label: "Focus Timer", path: "/timer", icon: "◷" },
  { id: "ai", label: "AI Assistant", path: "/assistant", icon: "✧" },
];

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

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
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {user?.name && <p>{user.name}</p>}
        <button type="button" className="sidebar-link" onClick={handleLogout}>
          <span aria-hidden="true">↪</span>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
