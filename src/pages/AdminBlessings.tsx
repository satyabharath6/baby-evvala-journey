import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

interface Blessing {
  id: string;
  name: string;
  city: string;
  message: string;
  submittedAt?: any;
}

export default function AdminBlessings() {
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [search, setSearch] = useState("");

  async function loadBlessings() {
    const snapshot = await getDocs(collection(db, "blessings"));

    const data = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...(docItem.data() as Omit<Blessing, "id">),
    }));

    setBlessings(data);
  }

  async function removeBlessing(id: string) {
    if (!window.confirm("Delete this blessing?")) return;

    await deleteDoc(doc(db, "blessings", id));

    loadBlessings();
  }

  useEffect(() => {
    loadBlessings();
  }, []);

  const filtered = blessings.filter((b) =>
    (
      b.name +
      b.city +
      b.message
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: 20,
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "3rem",
        }}
      >
        ❤️ Blessing Manager
      </h1>

      <p style={{ color: "#ddd" }}>
        Total Blessings: {filtered.length}
      </p>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 15,
          borderRadius: 12,
          marginBottom: 25,
          fontSize: 18,
        }}
      />

      {filtered.map((b) => (
        <div
          key={b.id}
          style={{
            background: "#242843",
            padding: 25,
            borderRadius: 20,
            marginBottom: 20,
            color: "white",
          }}
        >
          <h2>{b.name}</h2>

          <p>
            <strong>City:</strong> {b.city}
          </p>

          <p
            style={{
              marginTop: 15,
              marginBottom: 20,
              whiteSpace: "pre-wrap",
            }}
          >
            {b.message}
          </p>

          <button
            onClick={() => removeBlessing(b.id)}
            style={{
              padding: "12px 24px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              background: "#ff4d6d",
              color: "white",
              fontWeight: "bold",
            }}
          >
            🗑 Delete
          </button>
        </div>
      ))}
    </main>
  );
}