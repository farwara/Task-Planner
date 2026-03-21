import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <div className={styles.error} role="alert" aria-live="assertive">
            {message}
        </div>
    );
}

export default ErrorMessage;
