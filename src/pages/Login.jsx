import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormField from "../components/common/FormField";
import Button from "../components/common/Button";
import ErrorMessage from "../components/common/ErrorMessage";
import styles from "./AuthForm.module.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate("/dashboard");
    } catch  {
      setError("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
      <main className={styles.container}>
        <section className={styles.card}>
          <h1 className={styles.title}>Login</h1>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit}>
            <FormField
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
            />

            <FormField
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className={styles.hint}>
            No account? <Link to="/register">Register</Link>
          </p>
        </section>
      </main>
  );
}

export default Login;