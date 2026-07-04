import { useEffect, useState } from "react";
import CMSLayout from "../components/cms/CMSLayout";
import { getHomeLetter, saveHomeLetter } from "../services/homeLetterService";

export default function AdminHomeLetter() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [signature, setSignature] = useState("");

  const [titleTe, setTitleTe] = useState("");
  const [bodyTe, setBodyTe] = useState("");
  const [signatureTe, setSignatureTe] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getHomeLetter().then((letter) => {
      setTitle(letter.title);
      setBody(letter.body);
      setSignature(letter.signature);

      setTitleTe(letter.titleTe);
      setBodyTe(letter.bodyTe);
      setSignatureTe(letter.signatureTe);
    });
  }, []);

  async function handleSave() {
    if (!title || !body || !signature) {
      alert("Please complete the English letter fields.");
      return;
    }

    if (!titleTe || !bodyTe || !signatureTe) {
      alert("Please complete the Telugu letter fields.");
      return;
    }

    try {
      setSaving(true);

      await saveHomeLetter({
        title,
        body,
        signature,
        titleTe,
        bodyTe,
        signatureTe,
      });

      alert("Home letter saved ❤️");
    } catch (error) {
      console.error(error);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <CMSLayout title="📝 Home Letter">
      <div className="glass-card admin-form-card">
        <div className="admin-form">
          <h2>English Letter</h2>

          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Letter Body</label>
          <textarea
            rows={9}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <label>Signature</label>
          <input
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />

          <hr style={{ margin: "34px 0", opacity: 0.2 }} />

          <h2>Telugu Letter</h2>

          <label>Telugu Title</label>
          <input value={titleTe} onChange={(e) => setTitleTe(e.target.value)} />

          <label>Telugu Letter Body</label>
          <textarea
            rows={9}
            value={bodyTe}
            onChange={(e) => setBodyTe(e.target.value)}
          />

          <label>Telugu Signature</label>
          <input
            value={signatureTe}
            onChange={(e) => setSignatureTe(e.target.value)}
          />

          <button className="primary-btn" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Letter ❤️"}
          </button>
        </div>
      </div>
    </CMSLayout>
  );
}