import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../api/api";
import styles from "./TaskDetail.module.css";

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setError("");
        setLoading(true);
        const data = await apiFetch(`/api/tasks/${id}`);
        setTask(data);
      } catch (err) {
        setError(err.message || "Failed to load task");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <main className={styles.container}>
      <p>
        <Link to="/dashboard">← Back to dashboard</Link>
      </p>

      {error && <p>{error}</p>}

      {task && (
        <section className={styles.card}>
          <h1>{task.title}</h1>
          {task.description && <p>{task.description}</p>}

          <div className={styles.meta}>
            <p>Status: {task.completed ? "Completed" : "Open"}</p>
            {task.createdAt && <p>Created: {new Date(task.createdAt).toLocaleString()}</p>}
          </div>
        </section>
      )}
    </main>
  );
}

export default TaskDetail;
