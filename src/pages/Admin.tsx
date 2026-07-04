import { Link } from "react-router-dom";
import CMSLayout from "../components/cms/CMSLayout";
import { useAdminStats } from "../hooks/useAdminStats";

export default function Admin() {
  const stats = useAdminStats();

  return (
    <CMSLayout title="📊 Dashboard">
      <section className="dashboard-hero">
        <h2>Welcome back, Satya 👋</h2>
        <p>Here is the current status of Baby ఇవ్వల Journey.</p>
      </section>

      <div className="admin-stats-grid">
        <StatCard label="Journey Memories" value={stats.journey} emoji="📖" />
        <StatCard label="Gallery Photos" value={stats.gallery} emoji="📸" />
        <StatCard label="Videos" value={stats.videos} emoji="🎥" />
        <StatCard label="Blessings" value={stats.blessings} emoji="💌" />
        <StatCard label="Predictions" value={stats.predictions} emoji="🔮" />
      </div>

      <h2 className="admin-section-title">Quick Actions</h2>

      <div className="admin-grid">
        <AdminCard emoji="📝" title="Edit Letter" description="Update homepage welcome letter" link="/admin/home-letter" />
        <AdminCard emoji="➕" title="Add Memory" description="Add journey photos or videos" link="/admin/timeline" />
        <AdminCard emoji="📸" title="Upload Photo" description="Manage gallery memories" link="/admin/gallery" />
        <AdminCard emoji="🎉" title="Reveal Settings" description="Control reveal date and gender" link="/admin/reveal" />
        <AdminCard emoji="🔮" title="Predictions" description="View family guesses" link="/admin/predictions" />
        <AdminCard emoji="❤️" title="Blessings" description="Read family blessings" link="/admin/blessings" />
      </div>
    </CMSLayout>
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