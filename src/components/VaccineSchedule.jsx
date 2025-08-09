import React, { useState, useEffect } from "react";
import vaccineData from "../data/vaccines.json";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

function VaccineSchedule({ preview = false }) {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("vaccineChecklist");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("vaccineChecklist", JSON.stringify(checked));
  }, [checked]);

  const handleChange = (age, vaccine) => {
    setChecked((prev) => ({
      ...prev,
      [`${age}-${vaccine}`]: !prev[`${age}-${vaccine}`],
    }));
  };

  if (preview) {
    const previewData = vaccineData.slice(0, 2);
    return (
      <div style={{ margin: 0 }}>
        {previewData.map((entry) => (
          <div key={entry.age} style={{ marginBottom: 8 }}>
            <strong>{entry.age}</strong>
            <ul style={{ margin: "4px 0 0 18px" }}>
              {entry.vaccines.map((v) => {
                const key = `${entry.age}-${v}`;
                return (
                  <li key={key}>
                    <input type="checkbox" checked={!!checked[key]} readOnly />{" "}
                    {v}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // FULL PAGE — TABLE
  return (
    <div>
      <h2>Vaccination Checklist</h2>
      <TableContainer component={Paper} elevation={0}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Age</TableCell>
              <TableCell>Vaccine</TableCell>
              <TableCell align="center">Done</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vaccineData.map((group) => {
              const { age, vaccines } = group;
              return vaccines.map((v, idx) => {
                const key = `${age}-${v}`;
                return (
                  <TableRow key={key}>
                    {idx === 0 && (
                      <TableCell
                        rowSpan={vaccines.length}
                        sx={{ fontWeight: 600 }}
                      >
                        {age}
                      </TableCell>
                    )}
                    <TableCell>{v}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={!!checked[key]}
                        onChange={() => handleChange(age, v)}
                      />
                    </TableCell>
                  </TableRow>
                );
              });
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default VaccineSchedule;
