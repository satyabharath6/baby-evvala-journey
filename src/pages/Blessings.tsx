import { useEffect, useState } from "react";
import "../App.css";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useLanguage } from "../i18n/LanguageContext";

interface Blessing {
  id?: string;
  name: string;
  city: string;
  message: string;
}

export default function Blessings() {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [blessings, setBlessings] = useState<Blessing[]>([]);

  async function loadBlessings() {
    const q = query(collection(db, "blessings"), orderBy("submittedAt", "desc"));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Blessing[];

    setBlessings(data);
  }

  useEffect(() => {
    loadBlessings();
  }, []);

  async function handleSubmit() {
    if (!name || !city || !message) {
      alert(t.blessings.requiredAlert);
      return;
    }

    await addDoc(collection(db, "blessings"), {
      name,
      city,
      message,
      submittedAt: serverTimestamp(),
    });

    setSubmitted(true);
    setName("");
    setCity("");
    setMessage("");
    loadBlessings();
  }

  return (
    <main className="page blessings-v2">
      <div className="prediction-header">
        <h1>{t.blessings.title}</h1>
        <p>{t.blessings.subtitle}</p>
      </div>

      <div className="glass-card blessing-form">
        <label>{t.blessings.nameLabel}</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.blessings.namePlaceholder}
        />

        <label>{t.blessings.cityLabel}</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t.blessings.cityPlaceholder}
        />

        <label>{t.blessings.messageLabel}</label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.blessings.messagePlaceholder}
        />

        <button className="primary-btn" onClick={handleSubmit}>
          {t.blessings.submitButton}
        </button>
      </div>

      {submitted && (
        <div className="success-box">
          <h2>{t.blessings.thankYouTitle}</h2>
          <p>{t.blessings.thankYouText}</p>
          <button className="primary-btn" onClick={() => setSubmitted(false)}>
            {t.blessings.closeButton}
          </button>
        </div>
      )}

      <section className="blessings-wall">
        <h2>{t.blessings.wallTitle}</h2>

        {blessings.length === 0 ? (
          <div className="glass-card" style={{ padding: 32, textAlign: "center" }}>
            <h3>{t.blessings.emptyTitle}</h3>
            <p style={{ color: "#ddd", lineHeight: 1.7 }}>
              {t.blessings.emptyText}
            </p>
          </div>
        ) : (
          <div className="blessing-grid">
            {blessings.map((b) => (
              <article key={b.id} className="blessing-card">
                <div className="blessing-avatar">💌</div>
                <h3>{b.name}</h3>
                <p className="blessing-city">📍 {b.city}</p>
                <p className="blessing-message">{b.message}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}