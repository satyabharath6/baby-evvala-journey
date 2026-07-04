import { useState } from "react";
import "../App.css";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useLanguage } from "../i18n/LanguageContext";

export default function Prediction() {
  const { t } = useLanguage();

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
      alert(t.prediction.requiredAlert);
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
      alert(t.prediction.errorAlert);
    }
  };

  return (
    <main className="page prediction-v2">
      <div className="prediction-header">
        <h1>{t.prediction.title}</h1>
        <p>{t.prediction.subtitle}</p>
      </div>

      <div className="prediction-card glass-card">
        <h2>{t.prediction.cardTitle}</h2>

        <label>{t.prediction.genderLabel}</label>
        <div className="gender-buttons-v2">
          <button
            type="button"
            className={gender === "Boy" ? "gender-choice selected" : "gender-choice"}
            onClick={() => setGender("Boy")}
          >
            <span>👦</span>
            {t.prediction.boy}
          </button>

          <button
            type="button"
            className={gender === "Girl" ? "gender-choice selected" : "gender-choice"}
            onClick={() => setGender("Girl")}
          >
            <span>👧</span>
            {t.prediction.girl}
          </button>
        </div>

        <div className="form-grid">
          <div>
            <label>{t.prediction.nameLabel}</label>
            <input
              type="text"
              placeholder={t.prediction.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>{t.prediction.relationshipLabel}</label>
            <input
              type="text"
              placeholder={t.prediction.relationshipPlaceholder}
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            />
          </div>

          <div>
            <label>{t.prediction.cityLabel}</label>
            <input
              type="text"
              placeholder={t.prediction.cityPlaceholder}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label>{t.prediction.birthDateLabel}</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>

        <label>{t.prediction.babyNameLabel}</label>
        <input
          type="text"
          placeholder={t.prediction.babyNamePlaceholder}
          value={babyName}
          onChange={(e) => setBabyName(e.target.value)}
        />

        <label>{t.prediction.messageLabel}</label>
        <textarea
          rows={4}
          placeholder={t.prediction.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="button" className="primary-btn" onClick={handleSubmit}>
          {t.prediction.submitButton}
        </button>
      </div>

      {submitted && (
        <div className="success-box">
          <h2>{t.prediction.thankYouTitle}</h2>
          <p>{t.prediction.thankYouText}</p>
          <button
            type="button"
            className="primary-btn"
            onClick={() => setSubmitted(false)}
          >
            {t.prediction.closeButton}
          </button>
        </div>
      )}
    </main>
  );
}