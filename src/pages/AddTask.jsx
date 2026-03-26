import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";
import FormField from "../components/common/FormField";
import Button from "../components/common/Button";
import ErrorMessage from "../components/common/ErrorMessage";
import styles from "./AddTask.module.css";

export default function AddTask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
      <main className={styles.container}>
        <h1 className={styles.title}>Add task</h1>

        <ErrorMessage message={error} />

        <form className={styles.card} onSubmit={handleSubmit}>
          <FormField
              label="Title"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Buy groceries"
              required
              disabled={isSubmitting}
          />

          <div className={styles.field}>
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                className={styles.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional details..."
                disabled={isSubmitting}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save task"}
          </Button>
        </form>
      </main>
  );
}