import ErrorMessage from "./ErrorMessage";
import styles from "./FormField.module.css";

function FormField({
                       label,
                       id,
                       type = "text",
                       value,
                       onChange,
                       placeholder,
                       error,
                       required = false,
                       disabled = false,
                   }) {
    return (
        <div className={styles.field}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>

            <input
                className={styles.input}
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
            />

            <ErrorMessage message={error} />
        </div>
    );
}

export default FormField;