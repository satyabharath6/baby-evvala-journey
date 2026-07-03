import { useState } from "react";
import "../App.css";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Prediction() {
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [babyName, setBabyName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name || !gender) {
      alert("Please fill your name and prediction.");
      return;
    }

    try {
      await addDoc(collection(db, "predictions"), {
        gender,
        name,
        relationship,
        city,
        birthDate,
        babyName,
        message,
        submittedAt: new Date(),
      });

      setSubmitted(true);
      setGender("");
      setName("");
      setRelationship("");
      setCity("");
      setBirthDate("");
      setBabyName("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <main className="page prediction-v2">
      <div className="prediction-header">
        <h1>🔮 Baby Prediction</h1>
        <p>What does your heart say?</p>
      </div>

      <div className="prediction-card glass-card">
        <h2>👶 Make Your Prediction</h2>

        <label>Boy or Girl?</label>
        <div className="gender-buttons-v2">
          <button
            type="button"
            className={gender === "Boy" ? "gender-choice selected" : "gender-choice"}
            onClick={() => setGender("Boy")}
          >
            <span>👦</span>
            Boy
          </button>

          <button
            type="button"
            className={gender === "Girl" ? "gender-choice selected" : "gender-choice"}
            onClick={() => setGender("Girl")}
          >
            <span>👧</span>
            Girl
          </button>
        </div>

        <div className="form-grid">
          <div>
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Relationship</label>
            <input
              type="text"
              placeholder="Uncle, Aunt, Friend..."
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            />
          </div>

          <div>
            <label>Village / City</label>
            <input
              type="text"
              placeholder="Village or City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label>Expected Birth Date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>

        <label>Name Suggestion</label>
        <input
          type="text"
          placeholder="Baby Name Suggestion"
          value={babyName}
          onChange={(e) => setBabyName(e.target.value)}
        />

        <label>Message for Baby</label>
        <textarea
          rows={4}
          placeholder="Write your blessing..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="button" className="primary-btn" onClick={handleSubmit}>
          Submit Prediction ❤️
        </button>
      </div>

      {submitted && (
        <div className="success-box">
          <h2>🎉 Thank You!</h2>
          <p>Your prediction has been saved for Baby Evvala ❤️</p>
          <button
            type="button"
            className="primary-btn"
            onClick={() => setSubmitted(false)}
          >
            Close
          </button>
        </div>
      )}
    </main>
  );
}