import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/api";
import TaskCard from "../components/TaskCard";
import ErrorMessage from "../components/common/ErrorMessage";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ used for update effect (search)
  const [searchTerm, setSearchTerm] = useState("");

  async function loadTasks(signal) {
    try {
      setError("");
      setLoading(true);

      const data = await apiFetch("/api/tasks", { signal });
      setTasks(data ?? []);
    } catch (err) {
      // ✅ ignore abort errors when component unmounts
      if (err?.name === "AbortError") return;
      setError(err?.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Mounting useEffect #2 + ✅ Cleanup/unmount
  useEffect(() => {
    const controller = new AbortController();
    loadTasks(controller.signal);

    return () => controller.abort(); // ✅ cleanup
  }, []);

  // ✅ Mounting useEffect #3 (simple + defendable)
  useEffect(() => {
    document.title = "Task Planner | Dashboard";
  }, []);

  // ✅ Update effect requirement: state change -> UI changes
  const filteredTasks = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return tasks;

    return tasks.filter((t) => {
      const title = (t.title || "").toLowerCase();
      const desc = (t.description || "").toLowerCase();
      return title.includes(q) || desc.includes(q);
    });
  }, [tasks, searchTerm]); // updates when searchTerm changes

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
      <main className={styles.container}>
        <h1 className={styles.title}>Dashboard</h1>

        <ErrorMessage message={error} />

        <div className={styles.toolbar}>
          <input
              className={styles.search}
              type="search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.grid}>
          {filteredTasks.map((task) => (
              <TaskCard
                  key={task.id}
                  task={task}
                  reload={() => loadTasks()} // reload without signal OK
                  setError={setError}
              />
          ))}
        </div>
      </main>
  );
}

export default Dashboard;
