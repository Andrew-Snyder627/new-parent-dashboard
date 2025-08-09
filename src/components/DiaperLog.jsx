import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

function DiaperLog({ preview = false }) {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("babyLog");
    return saved ? JSON.parse(saved) : [];
  });
  const [type, setType] = useState("diaper");
  const [subtype, setSubtype] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    localStorage.setItem("babyLog", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type,
      subtype,
      note,
    };
    setEntries([newEntry, ...entries]);
    setSubtype("");
    setNote("");
  };

  const formatTime = (iso) => new Date(iso).toLocaleString();

  if (preview) {
    const recent = entries.slice(0, 3);
    if (!recent.length) return <p style={{ margin: 0 }}>No entries logged.</p>;
    return (
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {recent.map((e) => (
          <li key={e.id}>
            <strong>{formatTime(e.timestamp)}</strong> — {e.type} ({e.subtype})
            {e.note && <em> — {e.note}</em>}
          </li>
        ))}
      </ul>
    );
  }

  // FULL PAGE — TABLE + FORM
  return (
    <div>
      <h2>Diaper & Feeding Log</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: 16,
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <Select
          size="small"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="diaper">Diaper</MenuItem>
          <MenuItem value="feeding">Feeding</MenuItem>
        </Select>

        <TextField
          size="small"
          label={type === "diaper" ? "Wet/Dry/Both" : "Bottle/Breast/oz"}
          value={subtype}
          onChange={(e) => setSubtype(e.target.value)}
        />

        <TextField
          size="small"
          label="Notes"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <Button type="submit" variant="contained">
          Log Entry
        </Button>
      </form>

      <TableContainer component={Paper} elevation={0}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((e) => (
              <TableRow key={e.id}>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {formatTime(e.timestamp)}
                </TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {e.type}
                </TableCell>
                <TableCell>{e.subtype}</TableCell>
                <TableCell>{e.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DiaperLog;
