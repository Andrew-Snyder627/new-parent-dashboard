import React, { useState, useEffect, useCallback } from "react";

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
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  if (preview) {
    const top = tasks.slice(0, 3);
    if (!top.length) return <p style={{ margin: 0 }}>No tasks yet.</p>;
    return (
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {top.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} readOnly /> {t.text}
          </li>
        ))}
      </ul>
    );
  }

  // Full page
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
        {tasks.map((t) => (
          <li key={t.id} style={{ marginBottom: "0.5rem" }}>
            <label style={{ textDecoration: t.done ? "line-through" : "none" }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(t.id)}
              />{" "}
              {t.text}
            </label>
            <button
              onClick={() => deleteTask(t.id)}
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
