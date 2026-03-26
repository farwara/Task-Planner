import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/api";
import TaskCard from "../components/TaskCard";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  async function loadTasks(signal) {
    try {
      setError("");
      setLoading(true);

      const data = await apiFetch("/api/tasks", { signal });
      setTasks(data ?? []);
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(err?.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadTasks(controller.signal);

    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.title = "Task Planner | Dashboard";
  }, []);

  useEffect(() => {
    setError("");
  }, [searchTerm]);

  const filteredTasks = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return tasks;

    return tasks.filter((t) => {
      const title = (t.title || "").toLowerCase();
      const desc = (t.description || "").toLowerCase();
      return title.includes(q) || desc.includes(q);
    });
  }, [tasks, searchTerm]);

  if (loading) {
    return (
        <main className={styles.container}>
          <Loader text="Loading tasks..." />
        </main>
    );
  }

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

        <section className={styles.grid}>
          {filteredTasks.map((task) => (
              <TaskCard
                  key={task.id}
                  task={task}
                  reload={() => loadTasks()}
                  setError={setError}
              />
          ))}
        </section>
      </main>
  );
}

export default Dashboard;