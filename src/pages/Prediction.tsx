import { useState } from "react";
import "../App.css";
const [submitted, setSubmitted] = useState(false);
export default function Prediction() {
 const [gender, setGender] = useState("");
const [name, setName] = useState("");
const [relationship, setRelationship] = useState("");
const [city, setCity] = useState("");
const [birthDate, setBirthDate] = useState("");
const [babyName, setBabyName] = useState("");
const [message, setMessage] = useState("");

  return (
    <section className="prediction-page">
      <h1 className="page-title">🔮 Baby Prediction</h1>
      <p className="page-subtitle">What does your heart say?</p>

      <div className="prediction-card">
        <h2>👶 Make Your Prediction</h2>

        <label>Boy or Girl?</label>
        <div className="gender-buttons">
          <button
            className={gender === "Boy" ? "selected" : ""}
            onClick={() => setGender("Boy")}
          >
            👦 Boy
          </button>

          <button
            className={gender === "Girl" ? "selected" : ""}
            onClick={() => setGender("Girl")}
          >
            👧 Girl
          </button>
        </div>

        <label>Your Name</label>
        <input
  type="text"
  placeholder="Your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
        <label>Relationship</label>
        <input
  type="text"
  placeholder="Uncle, Aunt, Friend..."
  value={relationship}
  onChange={(e) => setRelationship(e.target.value)}
/>

        <label>Village / City</label>
        <input
  type="text"
  placeholder="Village or City"
  value={city}
  onChange={(e) => setCity(e.target.value)}
/>

        <label>Expected Birth Date</label>
       <input
  type="date"
  value={birthDate}
  onChange={(e) => setBirthDate(e.target.value)}
/>

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
></textarea>

        <button
          className="submit-btn"
          onClick={() => {

const prediction = {
    gender,
    name,
    relationship,
    city,
    birthDate,
    babyName,
    message,
};

console.log(prediction);

setSubmitted(true);
}}
        >
          Submit Prediction ❤️
        </button>
      </div> {submitted && (
  <div className="success-box">
    <h2>🎉 Thank You!</h2>
    <p>Your prediction has been saved for Baby Evvala ❤️</p>
    <button onClick={() => setSubmitted(false)}>Close</button>
  </div>
)}
    </section>
  );
}
