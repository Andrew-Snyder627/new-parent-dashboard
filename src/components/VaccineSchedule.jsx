import React, { useState, useEffect } from "react";
import vaccineData from "../data/vaccines.json";

function VaccineSchedule() {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("vaccineChecklist");
    return saved ? JSON.parse(saved) : {};
  });

  // Save checkmarks to localStorage
  useEffect(() => {
    localStorage.setItem("vaccineChecklist", JSON.stringify(checked));
  }, [checked]);

  const handleChange = (age, vaccine) => {
    setChecked((prev) => ({
      ...prev,
      [`${age}-${vaccine}`]: !prev[`${age}-${vaccine}`],
    }));
  };

  return (
    <div>
      <h2>Vaccination Checklist</h2>
      {vaccineData.map((entry) => (
        <div key={entry.age} style={{ marginBottom: "1rem" }}>
          <h4>{entry.age}</h4>
          <ul>
            {entry.vaccines.map((vaccine) => {
              const key = `${entry.age}-${vaccine}`;
              return (
                <li key={key}>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!checked[key]} // Coerces value to true/false for checkbox (prevents uncontrolled warnings)
                      onChange={() => handleChange(entry.age, vaccine)}
                    />
                    {` ${vaccine}`}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default VaccineSchedule;
