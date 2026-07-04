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
import { uploadMedia, deleteMedia, type MediaType } from "../services/uploadService";

type TimelineEvent = {
  id: string;
  emoji: string;
  title: string;
  date: string;
  location?: string;
  description: string;
  whyItMattered?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
  storagePath?: string;
};

export default function AdminTimeline() {
  const [emoji, setEmoji] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [whyItMattered, setWhyItMattered] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
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
      alert("Please complete emoji, title, date, and story.");
      return;
    }

    try {
      setSaving(true);

      let mediaData:
        | { url: string; storagePath: string; mediaType: MediaType }
        | null = null;

      if (file) {
        mediaData = await uploadMedia(file, "timeline");
      }

      await addDoc(collection(db, "timeline"), {
        emoji,
        title,
        date,
        location,
        description,
        whyItMattered,
        mediaUrl: mediaData?.url || "",
        mediaType: mediaData?.mediaType || "",
        storagePath: mediaData?.storagePath || "",
        createdAt: serverTimestamp(),
      });

      setEmoji("");
      setTitle("");
      setDate("");
      setLocation("");
      setDescription("");
      setWhyItMattered("");
      setFile(null);

      await loadEvents();

      alert("Journey memory saved ❤️");
    } catch (error) {
      console.error(error);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function removeEvent(event: TimelineEvent) {
    if (!window.confirm("Delete this memory?")) return;

    try {
      if (event.storagePath) {
        await deleteMedia(event.storagePath);
      }

      await deleteDoc(doc(db, "timeline", event.id));
      await loadEvents();

      alert("Memory deleted.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  }

  return (
    <main className="page admin-v2">
      <div className="prediction-header">
        <h1>🍼 Journey Memory Editor</h1>
        <p>Create meaningful memories for Baby ఇవ్వల&apos;s journey.</p>
      </div>

      <div className="glass-card admin-form-card" style={{ marginBottom: 40 }}>
  <div className="admin-form">
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

        <label>Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Atlanta, Georgia"
        />

        <label>Photo or Video</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <label>Story</label>
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell the story of this moment..."
        />

        <label>Why This Moment Mattered</label>
        <textarea
          rows={4}
          value={whyItMattered}
          onChange={(e) => setWhyItMattered(e.target.value)}
          placeholder="Why was this moment special?"
        />

        <button className="primary-btn" onClick={saveEvent} disabled={saving}>
          {saving ? "Saving..." : "Save Memory ❤️"}
        </button>
      </div>
</div>
      <h2>Saved Journey Memories</h2>

      {events.map((event) => (
        <div key={event.id} className="glass-card" style={{ padding: 25, marginBottom: 20 }}>
          {event.mediaUrl && event.mediaType === "image" && (
            <img
              src={event.mediaUrl}
              alt={event.title}
              style={{
                width: "100%",
                maxHeight: 320,
                objectFit: "cover",
                borderRadius: 18,
                marginBottom: 18,
              }}
            />
          )}

          {event.mediaUrl && event.mediaType === "video" && (
            <video
              src={event.mediaUrl}
              controls
              style={{
                width: "100%",
                maxHeight: 360,
                borderRadius: 18,
                marginBottom: 18,
              }}
            />
          )}

          <h2>
            {event.emoji} {event.title}
          </h2>

          <p style={{ color: "#f7d774" }}>{event.date}</p>

          {event.location && <p style={{ color: "#ccc" }}>📍 {event.location}</p>}

          <p style={{ lineHeight: 1.7 }}>{event.description}</p>

          {event.whyItMattered && (
            <p style={{ lineHeight: 1.7, color: "#ffd6f3" }}>
              <strong>Why it mattered:</strong> {event.whyItMattered}
            </p>
          )}

          <button
            onClick={() => removeEvent(event)}
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