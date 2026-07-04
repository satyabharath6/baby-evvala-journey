import { useEffect, useState } from "react";
import CMSLayout from "../components/cms/CMSLayout";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

interface Blessing {
  id: string;
  name: string;
  city: string;
  message: string;
  submittedAt?: unknown;
}

export default function AdminBlessings() {
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [search, setSearch] = useState("");

  async function loadBlessings() {
    const q = query(collection(db, "blessings"), orderBy("submittedAt", "desc"));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...(docItem.data() as Omit<Blessing, "id">),
    }));

    setBlessings(data);
  }

  async function removeBlessing(id: string) {
    if (!window.confirm("Delete this blessing?")) return;

    try {
      await deleteDoc(doc(db, "blessings", id));
      await loadBlessings();
      alert("Blessing deleted.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  }

  useEffect(() => {
    loadBlessings();
  }, []);

  const filtered = blessings.filter((b) =>
    `${b.name} ${b.city} ${b.message}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <CMSLayout title="❤️ Blessings">
      <p style={{ color: "#ccc", marginBottom: 30 }}>
        View and manage blessings submitted by family and friends for Baby ఇవ్వల.
      </p>

      <div className="admin-stats-grid" style={{ marginBottom: 30 }}>
        <StatCard title="Total Blessings" value={blessings.length} emoji="💌" />
        <StatCard title="Showing" value={filtered.length} emoji="🔎" />
      </div>

      <div className="glass-card admin-form-card" style={{ marginBottom: 34 }}>
        <div className="admin-form">
          <label>Search Blessings</label>
          <input
            placeholder="Search by name, city, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <h2>Submitted Blessings</h2>

      {filtered.length === 0 ? (
        <div className="glass-card" style={{ padding: 28, textAlign: "center" }}>
          <h3>No blessings found</h3>
          <p style={{ color: "#ccc" }}>
            Try changing your search or wait for family blessings to arrive.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 25,
          }}
        >
          {filtered.map((b) => (
            <div
              key={b.id}
              className="glass-card"
              style={{
                padding: 28,
                boxShadow: "0 10px 30px rgba(0,0,0,.25)",
              }}
            >
              <div style={{ fontSize: "2.4rem", marginBottom: 10 }}>💌</div>

              <h2 style={{ marginTop: 0 }}>{b.name || "Unknown"}</h2>

              <p style={{ color: "#ccc" }}>📍 {b.city || "No city"}</p>

              <p
                style={{
                  marginTop: 18,
                  marginBottom: 22,
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.8,
                }}
              >
                {b.message || "No message"}
              </p>

              <button
                onClick={() => removeBlessing(b.id)}
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: 14,
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(90deg,#ff4d6d,#ff006e)",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </CMSLayout>
  );
}

function StatCard({
  title,
  value,
  emoji,
}: {
  title: string;
  value: number;
  emoji: string;
}) {
  return (
    <div className="admin-stat-card">
      <div>{emoji}</div>
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  );
}