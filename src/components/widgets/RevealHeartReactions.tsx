import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./RevealHeartReactions.css";

type FloatingHeart = {
  id: number;
  left: number;
  emoji: string;
};

export default function RevealHeartReactions() {
  const { language } = useLanguage();
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [count, setCount] = useState(0);

  const copy =
    language === "te"
      ? {
          label: "ప్రేమ పంపండి",
          button: "❤️ హార్ట్ పంపండి",
        }
      : {
          label: "Send love to Baby ఇవ్వల",
          button: "❤️ Send Heart",
        };

  function sendHeart() {
    const emojis = ["❤️", "💖", "💕", "💗", "💝"];
    const id = Date.now();

    const newHeart = {
      id,
      left: Math.floor(Math.random() * 70) + 15,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };

    setHearts((current) => [...current, newHeart]);
    setCount((current) => current + 1);

    window.setTimeout(() => {
      setHearts((current) => current.filter((heart) => heart.id !== id));
    }, 2600);
  }

  return (
    <div className="reveal-heart-reactions">
      <div className="floating-heart-layer">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart"
            style={{ left: `${heart.left}%` }}
          >
            {heart.emoji}
          </span>
        ))}
      </div>

      <p>{copy.label}</p>

      <button type="button" onClick={sendHeart}>
        {copy.button}
      </button>

      <span className="heart-count">{count}</span>
    </div>
  );
}