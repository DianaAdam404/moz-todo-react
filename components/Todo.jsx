import { useState } from "react";

function Todo({ id, name, subject, completed, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = newName.trim();
    if (!trimmedName) return;
    onEdit(id, trimmedName);
    setIsEditing(false);
  }

  const editingTemplate = (
    <form className="todo-edit-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor={`${id}-edit`}>
        New topic name
      </label>
      <input
        id={`${id}-edit`}
        className="todo-text"
        type="text"
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
      <div className="todo-actions">
        <button
          type="button"
          className="action-button"
          onClick={() => {
            setNewName(name);
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
        <button type="submit" className="action-button save-button">
          Save
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <>
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
          onClick={() => {
            setNewName(name);
            setIsEditing(true);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="action-button delete-button"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </>
  );

  return (
    <li className={`todo ${completed ? "is-complete" : ""}`}>
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;
