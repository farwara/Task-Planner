import styles from "./Button.module.css";

function Button({ children, variant = "primary", ...props }) {
    const className =
        variant === "danger"
            ? styles.danger
            : variant === "secondary"
                ? styles.secondary
                : styles.primary;

    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
}

export default Button;