import { useState } from "react";
import { addRevealGuest } from "../../services/revealGuestService";
import { useRevealGuests } from "../../hooks/useRevealGuests";
import { useLanguage } from "../../i18n/LanguageContext";
import RevealHeartReactions from "./RevealHeartReactions";
import "./RevealWaitingRoom.css";

export default function RevealWaitingRoom() {
  const guests = useRevealGuests();
  const { language } = useLanguage();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [joined, setJoined] = useState(
    localStorage.getItem("baby-evvala-reveal-joined") === "true"
  );
  const [submitting, setSubmitting] = useState(false);

  const copy = {
    en: {
      title: "Family Waiting Room",
      text: "Let everyone know you are here for Baby ఇవ్వల Reveal.",
      name: "Your Name",
      city: "Village / City",
      button: "I’m here ❤️",
      joined: "You are in the waiting room ❤️",
      waiting: "family members are waiting with love",
      empty: "Be the first to join the waiting room.",
    },
    te: {
      title: "కుటుంబ వెయిటింగ్ రూమ్",
      text: "బేబీ ఇవ్వల రివీల్ కోసం మీరు వచ్చారని అందరికీ తెలియజేయండి.",
      name: "మీ పేరు",
      city: "గ్రామం / నగరం",
      button: "నేను వచ్చాను ❤️",
      joined: "మీరు వెయిటింగ్ రూమ్‌లో ఉన్నారు ❤️",
      waiting: "మంది కుటుంబ సభ్యులు ప్రేమతో ఎదురుచూస్తున్నారు",
      empty: "వెయిటింగ్ రూమ్‌లో మొదట మీరు చేరండి.",
    },
  }[language];

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (!name.trim() || !city.trim()) {
      alert(
        language === "te"
          ? "దయచేసి పేరు మరియు ఊరు రాయండి."
          : "Please enter name and city."
      );
      return;
    }

    try {
      setSubmitting(true);

      await addRevealGuest({
        name,
        city,
      });

      localStorage.setItem("baby-evvala-reveal-joined", "true");
      setJoined(true);
      setName("");
      setCity("");
    } catch (error) {
      console.error(error);
      alert(language === "te" ? "ఏదో తప్పు జరిగింది." : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="reveal-waiting-room">
      <div className="waiting-room-header">
        <h2>{copy.title}</h2>
        <p>{copy.text}</p>
      </div>

      {!joined ? (
        <form className="waiting-room-form" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={copy.name}
            maxLength={80}
          />

          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder={copy.city}
            maxLength={80}
          />

          <button type="submit" disabled={submitting}>
            {submitting ? "..." : copy.button}
          </button>
        </form>
      ) : (
        <div className="waiting-room-joined">{copy.joined}</div>
      )}

      <div className="waiting-room-count">
        <strong>{guests.length}</strong>
        <span>{copy.waiting}</span>
      </div>

      <div className="waiting-room-list">
        {guests.length === 0 ? (
          <p className="waiting-room-empty">{copy.empty}</p>
        ) : (
          guests.slice(0, 12).map((guest) => (
            <div key={guest.id} className="waiting-room-person">
              <span>❤️</span>
              <div>
                <strong>{guest.name}</strong>
                <p>{guest.city}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <RevealHeartReactions />
    </section>
  );
}