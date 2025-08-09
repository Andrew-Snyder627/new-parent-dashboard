import React, { useState, useEffect } from "react";
import styles from "../styles/Page.module.css";
import defaultMilestones from "../data/milestones.json";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BUCKETS = {
  "0-3 months": new Set(["First smile"]),
  "4-6 months": new Set(["Rolls over", "Sits up", "Sleeps through the night"]),
  "7-9 months": new Set(["Crawling", "Pulls to stand", "Feeds self"]),
  "10-12 months": new Set(["First steps", "Waves goodbye", "First word"]),
};

function MilestoneTracker({ preview = false }) {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("milestoneChecklist");
    return saved ? JSON.parse(saved) : {};
  });
  const [customMilestones, setCustomMilestones] = useState(() => {
    const saved = localStorage.getItem("customMilestones");
    return saved ? JSON.parse(saved) : [];
  });
  const [newMilestone, setNewMilestone] = useState("");

  useEffect(() => {
    localStorage.setItem("milestoneChecklist", JSON.stringify(completed));
  }, [completed]);
  useEffect(() => {
    localStorage.setItem("customMilestones", JSON.stringify(customMilestones));
  }, [customMilestones]);

  const toggleMilestone = (m) =>
    setCompleted((prev) => ({ ...prev, [m]: !prev[m] }));

  const handleAddMilestone = (e) => {
    e.preventDefault();
    const trimmed = newMilestone.trim();
    if (
      trimmed &&
      ![...defaultMilestones, ...customMilestones].includes(trimmed)
    ) {
      setCustomMilestones([trimmed, ...customMilestones]);
      setNewMilestone("");
    }
  };

  const all = [...defaultMilestones, ...customMilestones];

  if (preview) {
    const recent = all.slice(0, 4);
    return recent.length === 0 ? (
      <Typography sx={{ m: 0 }}>No milestones yet.</Typography>
    ) : (
      <Stack>
        {recent.map((m) => (
          <FormControlLabel
            key={m}
            control={<Checkbox checked={!!completed[m]} readOnly />}
            label={m}
          />
        ))}
      </Stack>
    );
  }

  // group by buckets
  const grouped = Object.entries(BUCKETS).reduce((acc, [label, set]) => {
    acc[label] = all.filter((m) => set.has(m));
    return acc;
  }, {});
  const matched = new Set(Object.values(grouped).flat());
  const other = all.filter((m) => !matched.has(m));

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.header}>
        Milestone Tracker
      </Typography>

      <form onSubmit={handleAddMilestone} style={{ marginBottom: 16 }}>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            label="Add a new milestone"
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </form>

      {Object.entries(grouped).map(
        ([label, items]) =>
          items.length > 0 && (
            <Accordion key={label} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>{label}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack>
                  {items.map((m) => (
                    <FormControlLabel
                      key={m}
                      control={
                        <Checkbox
                          checked={!!completed[m]}
                          onChange={() => toggleMilestone(m)}
                        />
                      }
                      label={m}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )
      )}

      {other.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>Other</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              {other.map((m) => (
                <FormControlLabel
                  key={m}
                  control={
                    <Checkbox
                      checked={!!completed[m]}
                      onChange={() => toggleMilestone(m)}
                    />
                  }
                  label={m}
                />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}

export default MilestoneTracker;
