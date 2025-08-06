import React, { useState, useEffect } from "react";

function DiaperLog() {
  // Ran into LocalStorage not saving beyond refresh, lazy load resolved the issue.
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("babyLog");
    return saved ? JSON.parse(saved) : [];
  });
  const [type, setType] = useState("diaper");
  const [subtype, setSubtype] = useState("");
  const [note, setNote] = useState("");

  // Save to localStorage
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

  return (
    <div>
      <h2>Diaper & Feeding Log</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="diaper">Diaper</option>
            <option value="feeding">Feeding</option>
          </select>
        </label>

        <label>
          {type === "diaper" ? "Wet/Dry" : "Bottle/Breast"}:
          <input
            type="text"
            value={subtype}
            onChange={(e) => setSubtype(e.target.value)}
            placeholder={
              type === "diaper" ? "wet / dry / both" : "bottle / breast / oz"
            }
          />
        </label>

        <label>
          Notes:
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="optional note"
          />
        </label>

        <button type="submit">Log Entry</button>
      </form>

      <ul>
        {entries.map((entry) => (
          <li key={entry.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{formatTime(entry.timestamp)}</strong> — {entry.type} (
            {entry.subtype}){entry.note && <em> — {entry.note}</em>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiaperLog;
