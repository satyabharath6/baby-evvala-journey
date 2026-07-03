import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AdminReveal() {
  const [gender, setGender] = useState("girl");
  const [revealDate, setRevealDate] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    async function loadRevealSettings() {
      const ref = doc(db, "settings", "reveal");
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        const data = snapshot.data();
        setGender(data.gender || "girl");
        setRevealDate(data.revealDate || "");
        setEnabled(data.enabled || false);
      }
    }

    loadRevealSettings();
  }, []);

  async function saveSettings() {
    if (!revealDate) {
      alert("Please select a reveal date and time.");
      return;
    }

    await setDoc(doc(db, "settings", "reveal"), {
      gender,
      revealDate,
      enabled,
    });

    alert("Reveal settings saved ❤️");
  }

  return (
    <main style={{ maxWidth: 900, margin: "120px auto", padding: 20, color: "white" }}>
      <h1 style={{ fontSize: "3rem" }}>🎉 Reveal Manager</h1>

      <div
        style={{
          background: "rgba(255,255,255,.08)",
          padding: 30,
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,.15)",
        }}
      >
        <label>Baby Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="girl">Girl 💖</option>
          <option value="boy">Boy 💙</option>
        </select>

        <label>Reveal Date & Time</label>
        <input
          type="datetime-local"
          value={revealDate}
          onChange={(e) => setRevealDate(e.target.value)}
        />

        <label style={{ marginTop: 20 }}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          {" "}Enable Reveal
        </label>

        <button className="submit-btn" onClick={saveSettings}>
          Save Reveal Settings ❤️
        </button>
      </div>
    </main>
  );
}