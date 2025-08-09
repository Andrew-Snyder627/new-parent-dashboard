import React, { useMemo, useState } from "react";
import quotes from "../data/parenting_quotes.json";
import { Button, TextField } from "@mui/material";

const PAGE = 20;

export default function Quotes() {
  const [count, setCount] = useState(PAGE);
  const [term, setTerm] = useState("");

  const filtered = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return quotes;
    return quotes.filter(
      ({ quote, author }) =>
        quote.toLowerCase().includes(q) || author.toLowerCase().includes(q)
    );
  }, [term]);

  const visible = filtered.slice(0, count);

  return (
    <div>
      <h2>Quotes</h2>
      <TextField
        label="Search quotes or author"
        size="small"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
          setCount(PAGE);
        }}
        style={{ marginBottom: 12, maxWidth: 400 }}
      />
      <ul>
        {visible.map((q, i) => (
          <li key={`${q.quote}-${i}`} style={{ marginBottom: 10 }}>
            <em>“{q.quote}”</em>
            <br />
            <small>— {q.author}</small>
          </li>
        ))}
      </ul>
      {count < filtered.length && (
        <Button variant="contained" onClick={() => setCount((c) => c + PAGE)}>
          Show more
        </Button>
      )}
    </div>
  );
}
