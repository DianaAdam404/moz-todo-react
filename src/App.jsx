import { useState } from "react";
import Todo from "/components/Todo";

const filters = ["mind", "hátra", "kész"];
const subjects = ["Magyar", "Történelem", "Matematika", "Angol"];

function App({ tasks = [] }) {
  const [taskItems, setTaskItems] = useState(tasks);
  const [filter, setFilter] = useState("mind");
  const [newTask, setNewTask] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const completedCount = taskItems.filter((task) => task.completed).length;
  const progress = taskItems.length
    ? Math.round((completedCount / taskItems.length) * 100)
    : 0;
  const visibleTasks = taskItems.filter((task) => {
    if (filter === "hátra") return !task.completed;
    if (filter === "kész") return task.completed;
    return true;
  });

  function addTask(event) {
    event.preventDefault();
    const name = newTask.trim();
    if (!name) return;
    setTaskItems((current) => [
      ...current,
      { id: `topic-${Date.now()}`, name, subject, completed: false },
    ]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTaskItems((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTaskItems((current) => current.filter((task) => task.id !== id));
  }

  function editTask(id, name) {
    const updatedName = window.prompt("Tétel neve", name)?.trim();
    if (updatedName)
      setTaskItems((current) =>
        current.map((task) =>
          task.id === id ? { ...task, name: updatedName } : task,
        ),
      );
  }

  return (
    <main className="todoapp">
      <header className="app-header">
        <div>
          <p className="kicker">ÉRETTSÉGI 2026</p>
          <h1>Tételkövető</h1>
          <p className="subtitle">
            Tartsd kézben, melyik tételt nézted már át.
          </p>
        </div>
        <div className="progress-summary">
          <strong>{progress}%</strong>
          <span>áttekintve</span>
        </div>
      </header>

      <section
        className="progress-bar"
        aria-label={`A tételek ${progress} százaléka kész`}
      >
        <span style={{ width: `${progress}%` }} />
      </section>

      <form className="add-form" onSubmit={addTask}>
        <label htmlFor="new-todo-input" className="visually-hidden">
          Új tétel neve
        </label>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Új tétel, például: A reformkor"
          autoComplete="off"
        />
        <select
          aria-label="Tantárgy"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        >
          {subjects.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <button type="submit" className="btn btn__primary btn__lg">
          Hozzáadás
        </button>
      </form>
      <div className="list-header">
        <h2 id="list-heading">Tételek</h2>
        <div className="filters" aria-label="Tételek szűrése">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className="filter-button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <ul role="list" className="todo-list" aria-labelledby="list-heading">
        {visibleTasks.length ? (
          visibleTasks.map((task) => (
            <Todo
              key={task.id}
              {...task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))
        ) : (
          <li className="empty-state">Nincs itt tétel.</li>
        )}
      </ul>
      <p className="note">A haladás nem verseny. Egy tétel is haladás.</p>
    </main>
  );
}

export default App;
