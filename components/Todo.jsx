function Todo({ id, name, subject, completed, onToggle, onDelete, onEdit }) {
  return (
    <li className={`todo ${completed ? "is-complete" : ""}`}>
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <label className="todo-label" htmlFor={id}>
          <span className="subject">{subject}</span>
          <span className="todo-name">{name}</span>
        </label>
      </div>
      <div className="todo-actions">
        <button
          type="button"
          className="action-button"
          onClick={() => onEdit(id, name)}
          aria-label={`Szerkesztés: ${name}`}
        >
          Szerkesztés
        </button>
        <button
          type="button"
          className="action-button delete-button"
          onClick={() => onDelete(id)}
          aria-label={`Törlés: ${name}`}
        >
          Törlés
        </button>
      </div>
    </li>
  );
}

export default Todo;
