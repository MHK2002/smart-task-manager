import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  function addTask() {
    if (text.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  return (
    <div className={`container ${dark ? "dark" : ""}`}>
      <div className="top-bar">
        <h1>Smart Task Manager</h1>
        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="input-row">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <span onClick={() => toggleTask(task.id)}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
