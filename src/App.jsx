import { useState } from "react";
import Todo from "/components/Todo";
import FilterButton from "/components/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App({ tasks = [] }) {
  const [taskItems, setTaskItems] = useState(tasks);
  const [filter, setFilter] = useState("All");
  const [newTask, setNewTask] = useState("");
  const completedCount = taskItems.filter((task) => task.completed).length;
  const taskList = taskItems
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(event) {
    event.preventDefault();
    const name = newTask.trim();
    if (!name) return;
    setTaskItems((current) => [
      ...current,
      {
        id: `topic-${Date.now()}`,
        name,
        subject: "Graduation exam",
        completed: false,
      },
    ]);
    setNewTask("");
  }

  function toggleTaskCompleted(id) {
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
    setTaskItems((current) =>
      current.map((task) => (task.id === id ? { ...task, name } : task)),
    );
  }

  return (
    <main className="todoapp">
      <h1>What needs to be done?</h1>
      <form className="add-form" onSubmit={addTask}>
        <label htmlFor="new-todo-input" className="visually-hidden">
          New topic name
        </label>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="New graduation topic"
          autoComplete="off"
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
      <div
        className="filters btn-group stack-exception"
        aria-label="Filter topics"
      >
        {filterList}
      </div>
      <h2 id="list-heading">
        {taskItems.length - completedCount} tasks remaining
      </h2>
      <ul role="list" className="todo-list" aria-labelledby="list-heading">
        {taskList.length ? (
          taskList
        ) : (
          <li className="empty-state">No topics here.</li>
        )}
      </ul>
      <p className="note">Progress is still progress.</p>
    </main>
  );
}

export default App;
