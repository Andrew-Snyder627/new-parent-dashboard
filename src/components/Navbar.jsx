import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <ul
        style={{ listStyle: "none", display: "flex", gap: "1rem", padding: 0 }}
      >
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/vaccines">Vaccines</Link>
        </li>
        <li>
          <Link to="/log">Log</Link>
        </li>
        <li>
          <Link to="/milestones">Milestones</Link>
        </li>
        <li>
          <Link to="/todos">To-Do</Link>
        </li>
        <li>
          <Link to="/quotes">Quotes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
