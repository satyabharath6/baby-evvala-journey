import { useEffect, useState } from "react";
import { getHomeLetter, saveHomeLetter } from "../services/homeLetterService";

export default function AdminHomeLetter() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [signature, setSignature] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getHomeLetter().then((letter) => {
      setTitle(letter.title);
      setBody(letter.body);
      setSignature(letter.signature);
    });
  }, []);

  async function handleSave() {
    if (!title || !body || !signature) {
      alert("Please complete all fields.");
      return;
    }

    try {
      setSaving(true);
      await saveHomeLetter({ title, body, signature });
      alert("Home letter saved ❤️");
    } catch (error) {
      console.error(error);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="page admin-v2">
      <div className="prediction-header">
        <h1>📝 Home Letter Editor</h1>
        <p>Edit the welcome letter shown on the homepage.</p>
      </div>

      <div className="glass-card" style={{ padding: 30 }}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Letter Body</label>
        <textarea
          rows={12}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <label>Signature</label>
        <input
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />

        <button className="primary-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Letter ❤️"}
        </button>
      </div>
    </main>
  );
}