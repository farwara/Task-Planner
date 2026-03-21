import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";
import styles from "./AddTask.module.css";

export default function AddTask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await apiFetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          completed: false,
        }),
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to add task");
    }
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Add task</h1>

      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Buy groceries"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional details..."
          />
        </div>

        <button className={styles.button} type="submit">
          Save task
        </button>
      </form>
    </main>
  );
}
