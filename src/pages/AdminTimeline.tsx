import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

type TimelineEvent = {
  id: string;
  emoji: string;
  title: string;
  date: string;
  description: string;
};

export default function AdminTimeline() {
  const [emoji, setEmoji] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  async function loadEvents() {
    const q = query(collection(db, "timeline"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<TimelineEvent, "id">),
    }));

    setEvents(data);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function saveEvent() {
    if (!emoji || !title || !date || !description) {
      alert("Please complete all fields.");
      return;
    }

    await addDoc(collection(db, "timeline"), {
      emoji,
      title,
      date,
      description,
      createdAt: serverTimestamp(),
    });

    setEmoji("");
    setTitle("");
    setDate("");
    setDescription("");

    loadEvents();
  }

  async function removeEvent(id: string) {
    if (!window.confirm("Delete this event?")) return;

    await deleteDoc(doc(db, "timeline", id));
    loadEvents();
  }

  return (
    <main
      style={{
        maxWidth: 1000,
        margin: "120px auto",
        padding: 20,
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: 30 }}>
        🍼 Timeline Manager
      </h1>

      <div
        style={{
          background: "rgba(255,255,255,.08)",
          padding: 30,
          borderRadius: 24,
          marginBottom: 40,
          border: "1px solid rgba(255,255,255,.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <label>Emoji</label>
          <input
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="❤️ 🩺 👣 🎀"
          />

          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="First Heartbeat"
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Description</label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Baby's heartbeat made us emotional..."
          />

          <button className="submit-btn" onClick={saveEvent}>
            Save Event ❤️
          </button>
        </div>
      </div>

      <h2 style={{ marginBottom: 20 }}>Journey Events</h2>

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            background: "rgba(255,255,255,.08)",
            borderRadius: 20,
            padding: 25,
            marginBottom: 20,
            border: "1px solid rgba(255,255,255,.15)",
          }}
        >
          <h2>
            {event.emoji} {event.title}
          </h2>

          <p style={{ color: "#ccc" }}>{event.date}</p>

          <p style={{ lineHeight: 1.7 }}>{event.description}</p>

          <button
            onClick={() => removeEvent(event.id)}
            style={{
              background: "#ff4d6d",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: 10,
              cursor: "pointer",
              marginTop: 10,
            }}
          >
            🗑 Delete
          </button>
        </div>
      ))}
    </main>
  );
}