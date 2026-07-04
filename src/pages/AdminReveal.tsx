import { useEffect, useState } from "react";
import CMSLayout from "../components/cms/CMSLayout";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AdminReveal() {
  const [gender, setGender] = useState<"girl" | "boy">("girl");
  const [revealDate, setRevealDate] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadRevealSettings() {
      const ref = doc(db, "settings", "reveal");
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        const data = snapshot.data();

        setGender(data.gender === "boy" ? "boy" : "girl");
        setRevealDate(data.revealDate || "");
        setEnabled(Boolean(data.enabled));
      }
    }

    loadRevealSettings();
  }, []);

  async function saveSettings() {
    if (!revealDate) {
      alert("Please select a reveal date and time.");
      return;
    }

    try {
      setSaving(true);

      await setDoc(
        doc(db, "settings", "reveal"),
        {
          gender,
          revealDate,
          enabled,
        },
        { merge: true }
      );

      alert("Reveal settings saved ❤️");
    } catch (error) {
      console.error(error);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <CMSLayout title="🎉 Reveal">
      <p style={{ color: "#ccc", marginBottom: 30 }}>
        Control the reveal experience, countdown timing, and final celebration.
      </p>

      <div className="glass-card admin-form-card">
        <div className="admin-form">
          <label>Baby Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "girl" | "boy")}
          >
            <option value="girl">Girl 💖</option>
            <option value="boy">Boy 💙</option>
          </select>

          <label>Reveal Date & Time</label>
          <input
            type="datetime-local"
            value={revealDate}
            onChange={(e) => setRevealDate(e.target.value)}
          />

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 14,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              style={{ width: 18, height: 18 }}
            />
            Enable Reveal
          </label>

          <div
            style={{
              marginTop: 24,
              padding: 18,
              borderRadius: 16,
              background: enabled
                ? "rgba(34, 197, 94, 0.12)"
                : "rgba(255, 255, 255, 0.06)",
              border: enabled
                ? "1px solid rgba(34, 197, 94, 0.35)"
                : "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <strong style={{ color: enabled ? "#86efac" : "#f7d774" }}>
              Current Status:
            </strong>{" "}
            {enabled ? "Reveal is active" : "Reveal is disabled"}
            <br />
            <span style={{ color: "#ccc" }}>
              Final reveal: {gender === "girl" ? "Girl 💖" : "Boy 💙"}
            </span>
          </div>

          <button className="primary-btn" onClick={saveSettings} disabled={saving}>
            {saving ? "Saving..." : "Save Reveal Settings ❤️"}
          </button>
        </div>
      </div>
    </CMSLayout>
  );
}