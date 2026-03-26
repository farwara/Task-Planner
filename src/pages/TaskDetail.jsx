import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../api/api";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import styles from "./TaskDetail.module.css";

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setError("");
        setLoading(true);
        const data = await apiFetch(`/api/tasks/${id}`, {
          signal: controller.signal,
        });
        setTask(data);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError(err.message || "Failed to load task");
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
        <main className={styles.container}>
          <Loader text="Loading task..." />
        </main>
    );
  }

  return (
      <main className={styles.container}>
        <p>
          <Link to="/dashboard">← Back to dashboard</Link>
        </p>

        <ErrorMessage message={error} />

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