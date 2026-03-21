function  Task({ title, completed }) {
    return (
        <li>
            <span>{title}</span>
            {completed && <span> ✅</span>}
        </li>
    );
}

export default Task;