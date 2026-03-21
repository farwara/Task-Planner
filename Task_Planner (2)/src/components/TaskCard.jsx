import { Link } from "react-router-dom";
import { useState } from "react";
import { apiFetch } from "../api/api";
import ErrorMessage from "./common/ErrorMessage";
import styles from "./TaskCard.module.css";

function TaskCard({ task, reload, setError }) {
  const [localError, setLocalError] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function toggleComplete(e) {
    e.stopPropagation();
    if (isCompleting || isDeleting) return;

    try {
      setLocalError("");
      if (setError) setError("");
      setIsCompleting(true);

      await apiFetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !task.completed }),
      });

      await reload();
    } catch (err) {
      const msg = err?.message || "Failed to update task.";
      setLocalError(msg);
      if (setError) setError(msg);
    } finally {
      setIsCompleting(false);
    }
  }

  async function deleteTask(e) {
    e.stopPropagation();
    if (isCompleting || isDeleting) return;

    try {
      setLocalError("");
      if (setError) setError("");
      setIsDeleting(true);

      await apiFetch(`/api/tasks/${task.id}`, { method: "DELETE" });

      await reload();
    } catch (err) {
      const msg = err?.message || "Failed to delete task.";
      setLocalError(msg);
      if (setError) setError(msg);
    } finally {
      setIsDeleting(false);
    }
  }

  const isBusy = isCompleting || isDeleting;

  return (
      <article className={styles.card} aria-busy={isBusy}>
        <Link className={styles.titleLink} to={`/tasks/${task.id}`}>
          <h3>{task.title}</h3>
        </Link>

        {task.description && <p>{task.description}</p>}

        <ErrorMessage message={localError} />

        <div className={styles.actions}>
          <button
              type="button"
              className={styles.primaryButton}
              onClick={toggleComplete}
              disabled={isBusy}
          >
            {isCompleting ? "Saving..." : task.completed ? "Undo" : "Complete"}
          </button>

          <button
              type="button"
              className={styles.dangerButton}
              onClick={deleteTask}
              disabled={isBusy}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </article>
  );
}

export default TaskCard;