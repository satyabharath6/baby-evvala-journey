import { useEffect, useState } from "react";
import CMSLayout from "../components/cms/CMSLayout";
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
  updateDoc,
} from "firebase/firestore";
import {
  uploadMedia,
  deleteMedia,
  type MediaType,
} from "../services/uploadService";

type TimelineEvent = {
  id: string;
  emoji: string;
  title: string;
  titleTe?: string;
  date: string;
  location?: string;
  locationTe?: string;
  description: string;
  descriptionTe?: string;
  whyItMattered?: string;
  whyItMatteredTe?: string;
  mediaUrl?: string;
  mediaType?: MediaType | "";
  storagePath?: string;
};

export default function AdminTimeline() {
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);

  const [emoji, setEmoji] = useState("");
  const [title, setTitle] = useState("");
  const [titleTe, setTitleTe] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [locationTe, setLocationTe] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionTe, setDescriptionTe] = useState("");
  const [whyItMattered, setWhyItMattered] = useState("");
  const [whyItMatteredTe, setWhyItMatteredTe] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  async function loadEvents() {
    const q = query(collection(db, "timeline"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    setEvents(
      snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<TimelineEvent, "id">),
      }))
    );
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function resetForm() {
    setEditingEvent(null);
    setEmoji("");
    setTitle("");
    setTitleTe("");
    setDate("");
    setLocation("");
    setLocationTe("");
    setDescription("");
    setDescriptionTe("");
    setWhyItMattered("");
    setWhyItMatteredTe("");
    setFile(null);
  }

  function startEdit(event: TimelineEvent) {
    setEditingEvent(event);

    setEmoji(event.emoji || "");
    setTitle(event.title || "");
    setTitleTe(event.titleTe || "");
    setDate(event.date || "");
    setLocation(event.location || "");
    setLocationTe(event.locationTe || "");
    setDescription(event.description || "");
    setDescriptionTe(event.descriptionTe || "");
    setWhyItMattered(event.whyItMattered || "");
    setWhyItMatteredTe(event.whyItMatteredTe || "");
    setFile(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveEvent() {
    const hasAnyContent =
      title.trim() ||
      titleTe.trim() ||
      description.trim() ||
      descriptionTe.trim() ||
      whyItMattered.trim() ||
      whyItMatteredTe.trim() ||
      file ||
      editingEvent?.mediaUrl;

    if (!hasAnyContent) {
      alert("Please add at least a title, story, note, or media.");
      return;
    }

    try {
      setSaving(true);

      const baseData = {
        emoji: emoji.trim() || "✨",
        title: title.trim() || titleTe.trim() || "Untitled Memory",
        titleTe: titleTe.trim(),
        date: date || new Date().toISOString().slice(0, 10),
        location: location.trim(),
        locationTe: locationTe.trim(),
        description: description.trim() || descriptionTe.trim() || "",
        descriptionTe: descriptionTe.trim(),
        whyItMattered: whyItMattered.trim(),
        whyItMatteredTe: whyItMatteredTe.trim(),
      };

      if (editingEvent) {
        let mediaUpdate = {};

        if (file) {
          const mediaData = await uploadMedia(file, "timeline");

          mediaUpdate = {
            mediaUrl: mediaData.url,
            mediaType: mediaData.mediaType,
            storagePath: mediaData.storagePath,
          };
        }

        await updateDoc(doc(db, "timeline", editingEvent.id), {
          ...baseData,
          ...mediaUpdate,
          updatedAt: serverTimestamp(),
        });

        if (file && editingEvent.storagePath) {
          try {
            await deleteMedia(editingEvent.storagePath);
          } catch (error) {
            console.warn("Old media delete failed:", error);
          }
        }

        alert("Journey memory updated ❤️");
      } else {
        const mediaData = file ? await uploadMedia(file, "timeline") : null;

        await addDoc(collection(db, "timeline"), {
          ...baseData,
          mediaUrl: mediaData?.url || "",
          mediaType: mediaData?.mediaType || "",
          storagePath: mediaData?.storagePath || "",
          createdAt: serverTimestamp(),
        });

        alert("Journey memory saved ❤️");
      }

      resetForm();
      await loadEvents();
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

      if (editingEvent?.id === event.id) {
        resetForm();
      }

      alert("Memory deleted.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  }

  return (
    <CMSLayout title="📖 Journey">
      <p style={{ color: "#ccc", marginBottom: 30 }}>
        Create and edit bilingual journey memories for Baby ఇవ్వల.
      </p>

      <div className="glass-card admin-form-card" style={{ marginBottom: 40 }}>
        <div className="admin-form">
          {editingEvent && (
            <div
              style={{
                padding: 16,
                borderRadius: 16,
                background: "rgba(247, 215, 116, 0.12)",
                border: "1px solid rgba(247, 215, 116, 0.25)",
                marginBottom: 24,
              }}
            >
              <strong style={{ color: "#f7d774" }}>Editing memory:</strong>{" "}
              {editingEvent.title}
            </div>
          )}

          <label>Emoji</label>
          <input
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="Optional — default ✨"
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>{editingEvent ? "Replace Photo or Video" : "Photo or Video"}</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {editingEvent?.mediaUrl && !file && (
            <p style={{ color: "#ccc", marginTop: -8 }}>
              Current media will stay unless you choose a new file.
            </p>
          )}

          <hr style={{ margin: "34px 0", opacity: 0.2 }} />

          <h2>English Memory</h2>

          <label>English Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Optional"
          />

          <label>English Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Optional"
          />

          <label>English Story</label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
          />

          <label>Why This Moment Mattered</label>
          <textarea
            rows={4}
            value={whyItMattered}
            onChange={(e) => setWhyItMattered(e.target.value)}
            placeholder="Optional"
          />

          <hr style={{ margin: "34px 0", opacity: 0.2 }} />

          <h2>Telugu Memory</h2>

          <label>Telugu Title</label>
          <input
            value={titleTe}
            onChange={(e) => setTitleTe(e.target.value)}
            placeholder="ఐచ్చికం"
          />

          <label>Telugu Location</label>
          <input
            value={locationTe}
            onChange={(e) => setLocationTe(e.target.value)}
            placeholder="ఐచ్చికం"
          />

          <label>Telugu Story</label>
          <textarea
            rows={5}
            value={descriptionTe}
            onChange={(e) => setDescriptionTe(e.target.value)}
            placeholder="ఐచ్చికం"
          />

          <label>ఈ క్షణం ఎందుకు ప్రత్యేకం?</label>
          <textarea
            rows={4}
            value={whyItMatteredTe}
            onChange={(e) => setWhyItMatteredTe(e.target.value)}
            placeholder="ఐచ్చికం"
          />

          <button className="primary-btn" onClick={saveEvent} disabled={saving}>
            {saving
              ? "Saving..."
              : editingEvent
                ? "Update Memory ❤️"
                : "Save Memory ❤️"}
          </button>

          {editingEvent && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                marginTop: 12,
                padding: "12px 18px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,.2)",
                background: "rgba(255,255,255,.08)",
                color: "white",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <h2>Saved Journey Memories</h2>

      {events.map((event) => (
        <div
          key={event.id}
          className="glass-card"
          style={{ padding: 25, marginBottom: 20 }}
        >
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

          {event.description && <p style={{ lineHeight: 1.7 }}>{event.description}</p>}

          {event.whyItMattered && (
            <p style={{ lineHeight: 1.7, color: "#ffd6f3" }}>
              <strong>Why it mattered:</strong> {event.whyItMattered}
            </p>
          )}

          {(event.titleTe || event.descriptionTe || event.whyItMatteredTe) && (
            <div
              style={{
                marginTop: 22,
                padding: 18,
                borderRadius: 16,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
              }}
            >
              <p style={{ color: "#f7d774", fontWeight: 800 }}>
                Telugu Version
              </p>

              {event.titleTe && <h3>{event.titleTe}</h3>}

              {event.locationTe && (
                <p style={{ color: "#ccc" }}>📍 {event.locationTe}</p>
              )}

              {event.descriptionTe && (
                <p style={{ lineHeight: 1.8 }}>{event.descriptionTe}</p>
              )}

              {event.whyItMatteredTe && (
                <p style={{ lineHeight: 1.8, color: "#ffd6f3" }}>
                  <strong>ఈ క్షణం ఎందుకు ప్రత్యేకం:</strong>{" "}
                  {event.whyItMatteredTe}
                </p>
              )}
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 18,
            }}
          >
            <button
              onClick={() => startEdit(event)}
              style={{
                background: "#f7d774",
                color: "#111827",
                border: "none",
                padding: "10px 20px",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => removeEvent(event)}
              style={{
                background: "#ff4d6d",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </CMSLayout>
  );
}