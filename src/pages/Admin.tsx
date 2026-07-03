import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <main className="page admin-v2">
      <div className="prediction-header">
        <h1>👑 Baby Evvala Admin</h1>
        <p>Manage every part of the Baby Evvala Journey website.</p>
      </div>

      <div className="admin-grid">

        <AdminCard
          emoji="📸"
          title="Gallery"
          description="Upload and manage photos"
          link="/admin/gallery"
        />

        <AdminCard
          emoji="🎉"
          title="Reveal"
          description="Gender reveal settings"
          link="/admin/reveal"
        />

        <AdminCard
          emoji="🍼"
          title="Timeline"
          description="Journey milestones"
          link="/admin/timeline"
        />

        <AdminCard
          emoji="🔮"
          title="Predictions"
          description="View family predictions"
          link="/admin/predictions"
        />

        <AdminCard
          emoji="❤️"
          title="Blessings"
          description="Family blessing wall"
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
    </main>
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
  const card = (
    <div className="admin-card">
      <div className="admin-icon">{emoji}</div>

      <h2>{title}</h2>

      <p>{description}</p>

      <button className="primary-btn">
        Open
      </button>
    </div>
  );

  return link ? <Link to={link}>{card}</Link> : card;
}