import React, { useMemo, useState } from "react";
import styles from "../styles/Page.module.css";
import quotes from "../data/parenting_quotes.json";
import {
  Button,
  TextField,
  Stack,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

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
    <div className={styles.container}>
      <Typography variant="h4" className={styles.header}>
        Quotes
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          label="Search quotes or author"
          size="small"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setCount(PAGE);
          }}
          sx={{ maxWidth: 420 }}
        />
      </Stack>

      <Paper variant="outlined">
        <Stack divider={<Divider />} sx={{ p: 2 }}>
          {visible.map((q, i) => (
            <div key={`${q.quote}-${i}`}>
              <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                “{q.quote}”
              </Typography>
              <Typography variant="caption" color="text.secondary">
                — {q.author}
              </Typography>
            </div>
          ))}
        </Stack>
      </Paper>

      {count < filtered.length && (
        <Stack alignItems="center" sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => setCount((c) => c + PAGE)}>
            Show more
          </Button>
        </Stack>
      )}
    </div>
  );
}
