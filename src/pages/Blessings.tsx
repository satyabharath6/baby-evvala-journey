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

interface Blessing {
  id?: string;
  name: string;
  city: string;
  message: string;
}

export default function Blessings() {
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
      alert("Please complete all fields.");
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
        <h1>❤️ Blessings</h1>
        <p>Leave a blessing for Baby Evvala</p>
      </div>

      <div className="glass-card blessing-form">
        <label>Your Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <label>Village / City</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Village or City"
        />

        <label>Your Blessing</label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your blessing..."
        />

        <button className="primary-btn" onClick={handleSubmit}>
          Submit Blessing ❤️
        </button>
      </div>

      {submitted && (
        <div className="success-box">
          <h2>🎉 Thank You!</h2>
          <p>Your blessing has been saved ❤️</p>
          <button className="primary-btn" onClick={() => setSubmitted(false)}>
            Close
          </button>
        </div>
      )}

      <section className="blessings-wall">
        <h2>💖 Family Blessings</h2>

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
      </section>
    </main>
  );
}