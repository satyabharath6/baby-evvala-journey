import { Link } from "react-router-dom";
import { useAdminStats } from "../hooks/useAdminStats";

export default function Admin() {
  const stats = useAdminStats();

  return (
    <main className="page admin-v2">
      <div className="prediction-header">
        <h1>👑 Baby Evvala CMS</h1>
        <p>Manage Baby ఇవ్వల Journey from one place.</p>
      </div>

      <div className="admin-stats-grid">
        <StatCard label="Journey Memories" value={stats.journey} emoji="📖" />
        <StatCard label="Gallery Photos" value={stats.gallery} emoji="📸" />
        <StatCard label="Videos" value={stats.videos} emoji="🎥" />
        <StatCard label="Blessings" value={stats.blessings} emoji="💌" />
        <StatCard label="Predictions" value={stats.predictions} emoji="🔮" />
      </div>

      <h2 className="admin-section-title">Quick Actions</h2>

      <div className="admin-grid">
        <AdminCard emoji="📝" title="Home Letter" description="Edit the welcome letter" link="/admin/home-letter" />
        <AdminCard emoji="📖" title="Journey" description="Add memories, photos, and videos" link="/admin/timeline" />
        <AdminCard emoji="📸" title="Gallery" description="Upload and manage photos" link="/admin/gallery" />
        <AdminCard emoji="🎉" title="Reveal" description="Manage reveal date and gender" link="/admin/reveal" />
        <AdminCard emoji="🔮" title="Predictions" description="View family predictions" link="/admin/predictions" />
        <AdminCard emoji="❤️" title="Blessings" description="View family blessings" link="/admin/blessings" />
      </div>
    </main>
  );
}

function StatCard({ emoji, label, value }: { emoji: string; label: string; value: number }) {
  return (
    <div className="admin-stat-card">
      <div>{emoji}</div>
      <h2>{value}</h2>
      <p>{label}</p>
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
  link: string;
}) {
  return (
    <Link to={link}>
      <div className="admin-card">
        <div className="admin-icon">{emoji}</div>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="primary-btn">Open</button>
      </div>
    </Link>
  );
}