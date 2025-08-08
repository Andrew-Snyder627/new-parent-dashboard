import React from "react";
import styles from "../../styles/CardShell.module.css";

const CardShell = ({ title, children, footer }) => {
  return (
    <div className={styles.card}>
      {title && <h3 className={styles.header}>{title}</h3>}
      <div>{children}</div>
      {footer && <div style={{ marginTop: 8 }}>{footer}</div>}
    </div>
  );
};

export default CardShell;
