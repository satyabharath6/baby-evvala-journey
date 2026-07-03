import { useEffect, useState } from "react";
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
    await deleteDoc(doc(db, "predictions", id));
    loadPredictions();
  }

  useEffect(() => {
    loadPredictions();
  }, []);

  const filtered = predictions.filter((p) =>
    `${p.name} ${p.city} ${p.gender} ${p.babyName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const boyCount = predictions.filter((p) => p.gender === "Boy").length;
  const girlCount = predictions.filter((p) => p.gender === "Girl").length;

  return (
    <main style={{ maxWidth: 1200, margin: "110px auto 60px", padding: 20, color: "white" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: 10 }}>🔮 Prediction Manager</h1>
      <p style={{ color: "#ccc", marginBottom: 30 }}>
        View and manage all Baby Evvala predictions.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20, marginBottom: 30 }}>
        <StatCard title="Total" value={predictions.length} emoji="👶" />
        <StatCard title="Boy" value={boyCount} emoji="👦" />
        <StatCard title="Girl" value={girlCount} emoji="👧" />
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, city, gender, baby name..."
        style={{
          width: "100%",
          padding: 18,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,.2)",
          background: "rgba(255,255,255,.1)",
          color: "white",
          fontSize: "1rem",
          marginBottom: 30,
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 25 }}>
        {filtered.map((p) => (
          <div
            key={p.id}
            style={{
              background: "rgba(255,255,255,.09)",
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 10px 30px rgba(0,0,0,.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>
              {p.gender === "Girl" ? "👧 Girl" : "👦 Boy"}
            </h2>

            <h3>{p.name || "Unknown"}</h3>
            <p style={{ color: "#ccc" }}>📍 {p.city || "No city"}</p>
            <p style={{ color: "#ccc" }}>👤 {p.relationship || "No relationship"}</p>

            <hr style={{ borderColor: "rgba(255,255,255,.15)" }} />

            <p><strong>Baby Name:</strong> {p.babyName || "No suggestion"}</p>
            <p><strong>Birth Date:</strong> {p.birthDate || "Not guessed"}</p>
            <p style={{ lineHeight: 1.7 }}>💌 {p.message || "No message"}</p>

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
    </main>
  );
}

function StatCard({ title, value, emoji }: { title: string; value: number; emoji: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.09)",
        borderRadius: 20,
        padding: 25,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "2.2rem" }}>{emoji}</div>
      <h2>{value}</h2>
      <p style={{ color: "#ccc" }}>{title}</p>
    </div>
  );
}