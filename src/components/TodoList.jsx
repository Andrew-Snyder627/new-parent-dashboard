import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/Page.module.css";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
    if (!top.length)
      return <Typography sx={{ m: 0 }}>No tasks yet.</Typography>;
    return (
      <List dense sx={{ py: 0 }}>
        {top.map((t) => (
          <ListItem key={t.id} disableGutters>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Checkbox
                edge="start"
                checked={t.done}
                tabIndex={-1}
                disableRipple
                readOnly
              />
            </ListItemIcon>
            <ListItemText
              primary={t.text}
              primaryTypographyProps={{
                sx: { textDecoration: t.done ? "line-through" : "none" },
              }}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  // full page
  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.header}>
        Parenting To-Do List
      </Typography>

      <form onSubmit={handleAddTask} style={{ marginBottom: 16 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            size="small"
            label="Add new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </form>

      <Paper variant="outlined">
        <List>
          {tasks.map((t) => (
            <ListItem
              key={t.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTask(t.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Checkbox
                  edge="start"
                  checked={t.done}
                  onChange={() => toggleTask(t.id)}
                />
              </ListItemIcon>
              <ListItemText
                primary={t.text}
                primaryTypographyProps={{
                  sx: { textDecoration: t.done ? "line-through" : "none" },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default React.memo(TodoList);
