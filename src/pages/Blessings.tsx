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
    const q = query(
      collection(db, "blessings"),
      orderBy("submittedAt", "desc")
    );

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
    <section className="prediction-page">
      <h1 className="page-title">❤️ Blessings</h1>

      <p className="page-subtitle">
        Leave a blessing for Baby Evvala
      </p>

      <div className="prediction-card">

        <label>Your Name</label>

        <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Your name"
        />

        <label>Village / City</label>

        <input
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          placeholder="Village or City"
        />

        <label>Your Blessing</label>

        <textarea
          rows={5}
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Write your blessing..."
        />

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit Blessing ❤️
        </button>

      </div>

      {submitted && (
        <div className="success-box">
          <h2>🎉 Thank You!</h2>

          <p>Your blessing has been saved ❤️</p>

          <button
            onClick={()=>setSubmitted(false)}
          >
            Close
          </button>
        </div>
      )}

      <div
        style={{
          maxWidth:900,
          margin:"60px auto"
        }}
      >

        <h2
          style={{
            color:"white",
            marginBottom:30,
            textAlign:"center"
          }}
        >
          💖 Family Blessings
        </h2>

        {blessings.map((b)=>(
          <div
            key={b.id}
            style={{
              background:"rgba(255,255,255,.08)",
              borderRadius:20,
              padding:25,
              marginBottom:20,
              color:"white"
            }}
          >
            <h3>{b.name}</h3>

            <p style={{opacity:.8}}>
              📍 {b.city}
            </p>

            <p
              style={{
                marginTop:15,
                lineHeight:1.8
              }}
            >
              {b.message}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}