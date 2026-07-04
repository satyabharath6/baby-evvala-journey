import { useEffect, useState } from "react";
import CMSLayout from "../components/cms/CMSLayout";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

interface Prediction {
  id: string;
  gender: string;
  name: string;
  relationship: string;
  city: string;
  birthDate: string;
  babyName: string;
  message: string;
}

export default function AdminPredictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [search, setSearch] = useState("");

  async function loadPredictions() {
    const q = query(collection(db, "predictions"), orderBy("submittedAt", "desc"));
    const snapshot = await getDocs(q);

    setPredictions(
      snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Prediction, "id">),
      }))
    );
  }

  async function removePrediction(id: string) {
    if (!window.confirm("Delete this prediction?")) return;

    try {
      await deleteDoc(doc(db, "predictions", id));
      await loadPredictions();
      alert("Prediction deleted.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  }

  useEffect(() => {
    loadPredictions();
  }, []);

  const filtered = predictions.filter((p) =>
    `${p.name} ${p.city} ${p.gender} ${p.babyName} ${p.relationship}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const boyCount = predictions.filter((p) => p.gender === "Boy").length;
  const girlCount = predictions.filter((p) => p.gender === "Girl").length;

  return (
    <CMSLayout title="🔮 Predictions">
      <p style={{ color: "#ccc", marginBottom: 30 }}>
        View and manage all Baby ఇవ్వల gender predictions, baby name ideas, and
        family messages.
      </p>

      <div className="admin-stats-grid" style={{ marginBottom: 30 }}>
        <StatCard title="Total Predictions" value={predictions.length} emoji="👶" />
        <StatCard title="Boy Guesses" value={boyCount} emoji="👦" />
        <StatCard title="Girl Guesses" value={girlCount} emoji="👧" />
      </div>

      <div className="glass-card admin-form-card" style={{ marginBottom: 34 }}>
        <div className="admin-form">
          <label>Search Predictions</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, city, gender, relationship, or baby name..."
          />
        </div>
      </div>

      <h2>Submitted Predictions</h2>

      {filtered.length === 0 ? (
        <div className="glass-card" style={{ padding: 28, textAlign: "center" }}>
          <h3>No predictions found</h3>
          <p style={{ color: "#ccc" }}>
            Try changing your search or wait for family members to participate.
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
          {filtered.map((p) => (
            <div
              key={p.id}
              className="glass-card"
              style={{
                padding: 28,
                boxShadow: "0 10px 30px rgba(0,0,0,.25)",
              }}
            >
              <h2 style={{ marginTop: 0 }}>
                {p.gender === "Girl" ? "👧 Girl" : "👦 Boy"}
              </h2>

              <h3>{p.name || "Unknown"}</h3>

              <p style={{ color: "#ccc" }}>📍 {p.city || "No city"}</p>
              <p style={{ color: "#ccc" }}>
                👤 {p.relationship || "No relationship"}
              </p>

              <hr style={{ borderColor: "rgba(255,255,255,.15)" }} />

              <p>
                <strong>Baby Name:</strong>{" "}
                {p.babyName || "No suggestion"}
              </p>

              <p>
                <strong>Birth Date:</strong>{" "}
                {p.birthDate || "Not guessed"}
              </p>

              <p style={{ lineHeight: 1.7 }}>
                💌 {p.message || "No message"}
              </p>

              <button
                onClick={() => removePrediction(p.id)}
                style={{
                  marginTop: 20,
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