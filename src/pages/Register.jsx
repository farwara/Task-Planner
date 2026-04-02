import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormField from "../components/common/FormField";
import Button from "../components/common/Button";
import ErrorMessage from "../components/common/ErrorMessage";
import styles from "./AuthForm.module.css";

function Register() {
  const { register } = useAuth();
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
      await register(email, password);
      navigate("/login");
    } catch  {
      setError( "Registration failed.Please try again");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
      <main className={styles.container}>
        <section className={styles.card}>
          <h1 className={styles.title}>Register</h1>

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
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className={styles.hint}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>
      </main>
  );
}

export default Register;