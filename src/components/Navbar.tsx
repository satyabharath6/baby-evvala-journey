import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        maxWidth: "1100px",
        padding: "15px 28px",
        borderRadius: "999px",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.15)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        👶 Baby Evvala
      </Link>

      <div
        style={{
          display: "flex",
          gap: "22px",
        }}
      >
        <Link to="/story" style={linkStyle}>
          Story
        </Link>

        <Link to="/prediction" style={linkStyle}>
          Prediction
        </Link>

        <Link to="/blessings" style={linkStyle}>
          Blessings
        </Link>

        <Link to="/gallery" style={linkStyle}>
          Gallery
        </Link>

        <Link to="/reveal" style={linkStyle}>
          Reveal
        </Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: 500,
};
