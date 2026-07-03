import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "50px auto",
        color: "white",
        padding: 20,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
        }}
      >
        👑 Baby Evvala Admin
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#bbb",
          marginBottom: 50,
        }}
      >
        Manage the entire website from one place.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 25,
        }}
      >
        <AdminCard
  emoji="📸"
  title="Gallery"
  description="Upload and manage photos"
  link="/admin/gallery"
/>

        <AdminCard
  emoji="🍼"
  title="Timeline"
  description="Add journey events"
  link="/admin/timeline"
/>

        <AdminCard
          emoji="🔮"
          title="Predictions"
          description="View all predictions"
          link="/admin/predictions"
        />

        <AdminCard
          emoji="❤️"
          title="Blessings"
          description="View all blessings"
          link="/admin/blessings"
        />

        <AdminCard
          emoji="📊"
          title="Statistics"
          description="Prediction analytics"
        />

        <AdminCard
          emoji="⚙️"
          title="Settings"
          description="Website configuration"
        />
      </div>
    </div>
  );
}

function AdminCard({
  emoji,
  title,
  description,
  link,
}: {
  emoji: string;
  title: string;
  description: string;
  link?: string;
}) {
  const button = <button className="submit-btn">Open</button>;

  return (
    <div
      style={{
        background: "rgba(255,255,255,.08)",
        borderRadius: 20,
        padding: 30,
        textAlign: "center",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ fontSize: "3rem" }}>{emoji}</div>

      <h2>{title}</h2>

      <p style={{ color: "#ccc" }}>{description}</p>

      {link ? <Link to={link}>{button}</Link> : button}
    </div>
  );
}