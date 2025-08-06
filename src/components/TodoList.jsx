import React, { useState, useEffect } from "react";

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("parentTodoList");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("parentTodoList", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    const trimmed = newTask.trim();
    if (trimmed) {
      setTasks([{ id: Date.now(), text: trimmed, done: false }, ...tasks]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

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

export default TodoList;
