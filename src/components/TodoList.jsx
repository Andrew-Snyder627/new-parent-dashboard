import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// Shared styles
const cardStyle = {
  border: "1px solid #ccc",
  padding: "1rem",
  borderRadius: "8px",
};

function TodoList({ preview = false }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("parentTodoList");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("parentTodoList", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = newTask.trim();
      if (trimmed) {
        setTasks([{ id: Date.now(), text: trimmed, done: false }, ...tasks]);
        setNewTask("");
      }
    },
    [newTask, tasks]
  );

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // === PREVIEW MODE ===
  if (preview) {
    const topTasks = tasks.slice(0, 3);
    return (
      <div style={cardStyle}>
        <h3>Parenting To-Do List</h3>
        {topTasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul>
            {topTasks.map((task) => (
              <li key={task.id}>
                <input type="checkbox" checked={task.done} readOnly />
                {` ${task.text}`}
              </li>
            ))}
          </ul>
        )}
        <div style={{ marginTop: "0.5rem" }}>
          <Link to="/todos">View Full To-Do List</Link>
        </div>
      </div>
    );
  }

  // === FULL VIEW ===
  return (
    <div>
      <h2>Parenting To-Do List</h2>

      <form onSubmit={handleAddTask} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "0.5rem" }}>
            <label
              style={{ textDecoration: task.done ? "line-through" : "none" }}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              {` ${task.text}`}
            </label>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "0.5rem" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(TodoList);
