import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import CMSLayout from "../components/cms/CMSLayout";
import { useAdminStats } from "../hooks/useAdminStats";
import { auth } from "../firebase";

export default function Admin() {
  const stats = useAdminStats();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const displayName = user?.displayName || getNameFromEmail(user?.email || "");

  return (
    <CMSLayout title="📊 Dashboard">
      <section className="dashboard-hero">
        <h2>Welcome back, {displayName || "Admin"} 👋</h2>
        <p>Here is the current status of Baby ఇవ్వల Journey.</p>
      </section>

      <div className="admin-stats-grid">
        <StatCard label="Journey Memories" value={stats.journey} emoji="📖" />
        <StatCard label="Gallery Photos" value={stats.gallery} emoji="📸" />
        <StatCard label="Videos" value={stats.videos} emoji="🎥" />
        <StatCard label="Blessings" value={stats.blessings} emoji="💌" />
        <StatCard label="Predictions" value={stats.predictions} emoji="🔮" />
      </div>

      <h2 className="admin-section-title">Recent Activity</h2>

      <div className="admin-grid">
        <ActivityCard
          emoji="📖"
          title="Latest Journey Memory"
          main={stats.latestJourney?.title || "No journey memory yet"}
          detail={stats.latestJourney?.date || "Add the first milestone"}
          link="/admin/timeline"
        />

        <ActivityCard
          emoji="📸"
          title="Latest Gallery Photo"
          main={stats.latestGallery?.caption || "No gallery photo yet"}
          detail="Manage gallery memories"
          link="/admin/gallery"
        />

        <ActivityCard
          emoji="💌"
          title="Latest Blessing"
          main={stats.latestBlessing?.name || "No blessing yet"}
          detail={stats.latestBlessing?.message || "Family blessings will appear here"}
          link="/admin/blessings"
        />

        <ActivityCard
          emoji="🔮"
          title="Latest Prediction"
          main={
            stats.latestPrediction?.name
              ? `${stats.latestPrediction.name} guessed ${stats.latestPrediction.gender || "—"}`
              : "No prediction yet"
          }
          detail={
            stats.latestPrediction?.babyName
              ? `Name idea: ${stats.latestPrediction.babyName}`
              : "Family guesses will appear here"
          }
          link="/admin/predictions"
        />

        <ActivityCard
          emoji="🎉"
          title="Reveal Status"
          main={stats.reveal?.enabled ? "Reveal is active" : "Reveal is disabled"}
          detail={
            stats.reveal?.revealDate
              ? `${stats.reveal.gender === "boy" ? "Boy 💙" : "Girl 💖"} • ${stats.reveal.revealDate}`
              : "No reveal date set"
          }
          link="/admin/reveal"
        />
      </div>

      <h2 className="admin-section-title">Quick Actions</h2>

      <div className="admin-grid">
        <AdminCard
          emoji="📝"
          title="Edit Letter"
          description="Update homepage welcome letter"
          link="/admin/home-letter"
        />
        <AdminCard
          emoji="➕"
          title="Add Memory"
          description="Add journey photos or videos"
          link="/admin/timeline"
        />
        <AdminCard
          emoji="📸"
          title="Upload Photo"
          description="Manage gallery memories"
          link="/admin/gallery"
        />
        <AdminCard
          emoji="🎉"
          title="Reveal Settings"
          description="Control reveal date and gender"
          link="/admin/reveal"
        />
        <AdminCard
          emoji="🔮"
          title="Predictions"
          description="View family guesses"
          link="/admin/predictions"
        />
        <AdminCard
          emoji="❤️"
          title="Blessings"
          description="Read family blessings"
          link="/admin/blessings"
        />
      </div>
    </CMSLayout>
  );
}

function StatCard({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: number;
}) {
  return (
    <div className="admin-stat-card">
      <div>{emoji}</div>
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );
}

function ActivityCard({
  emoji,
  title,
  main,
  detail,
  link,
}: {
  emoji: string;
  title: string;
  main: string;
  detail: string;
  link: string;
}) {
  return (
    <Link to={link}>
      <div className="admin-card">
        <div className="admin-icon">{emoji}</div>
        <p style={{ color: "#f7d774", fontWeight: 800, marginBottom: 8 }}>
          {title}
        </p>
        <h2>{main}</h2>
        <p>{detail}</p>
        <button className="primary-btn">Open</button>
      </div>
    </Link>
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

function getNameFromEmail(email: string) {
  if (!email) return "";

  const namePart = email.split("@")[0];

  return namePart
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}