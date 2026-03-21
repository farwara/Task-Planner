import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./NavBar.module.css";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className={styles.navbar}>
      <nav className={styles.inner}>
        <div className={styles.brand}>Task Planner</div>

        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.linkActive}` : styles.link)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/add-task"
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.linkActive}` : styles.link)}
        >
          Add task
        </NavLink>

        <div className={styles.spacer} />

        <div className={styles.user}>{user?.email}</div>

        <button type="button" className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default NavBar;
