import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

type RevealSettings = {
  gender: "boy" | "girl";
  revealDate: string;
  enabled: boolean;
};

export default function Reveal() {
  const [settings, setSettings] = useState<RevealSettings | null>(null);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    async function loadReveal() {
      const snap = await getDoc(doc(db, "settings", "reveal"));

      if (snap.exists()) {
        setSettings(snap.data() as RevealSettings);
      }
    }

    loadReveal();

    const resize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function fireCelebration(gender: "boy" | "girl") {
    if (hasCelebrated) return;

    setHasCelebrated(true);

    const colors =
      gender === "boy"
        ? ["#4dabf7", "#74c0fc", "#ffffff"]
        : ["#ff4da6", "#ff85c1", "#ffffff"];

    const duration = 6000;
    const end = Date.now() + duration;

    const interval = window.setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 90,
        spread: 100,
        startVelocity: 55,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.45,
        },
        colors,
      });
    }, 320);
  }

  if (!settings) {
    return (
      <main className="page reveal-page">
        <div className="reveal-card">
          <div className="reveal-icon">✨</div>
          <h1>Loading...</h1>
          <p>Preparing Baby Evvala&apos;s special moment.</p>
        </div>
      </main>
    );
  }

  if (!settings.enabled) {
    return (
      <main className="page reveal-page">
        <div className="reveal-card">
          <div className="reveal-icon">🎁</div>
          <p className="reveal-eyebrow">Baby Evvala</p>
          <h1>Reveal Coming Soon</h1>
          <p>Our little miracle&apos;s special moment is almost here ❤️</p>
        </div>
      </main>
    );
  }

  const revealTime = new Date(settings.revealDate).getTime();

  return (
    <Countdown
      date={revealTime}
      renderer={({ completed, days, hours, minutes, seconds }) => {
        if (!completed) {
          return (
            <main className="page reveal-page">
              <div className="reveal-card">
                <div className="reveal-icon">🎉</div>

                <p className="reveal-eyebrow">Baby Evvala</p>

                <h1>Gender Reveal</h1>

                <p>
                  The countdown has begun. Soon, our family will know the little
                  heart growing with love.
                </p>

                <div className="countdown-grid">
                  <TimeCard value={days} label="Days" />
                  <TimeCard value={hours} label="Hours" />
                  <TimeCard value={minutes} label="Minutes" />
                  <TimeCard value={seconds} label="Seconds" />
                </div>
              </div>
            </main>
          );
        }

        fireCelebration(settings.gender);

        const isBoy = settings.gender === "boy";

        return (
          <>
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle
              numberOfPieces={420}
            />

            <main className="page reveal-page">
              <div
                className={
                  isBoy
                    ? "reveal-card final-reveal boy-reveal"
                    : "reveal-card final-reveal girl-reveal"
                }
              >
                <div className="final-heart">{isBoy ? "💙" : "💖"}</div>

                <p className="reveal-eyebrow">The wait is over</p>

                <h1>{isBoy ? "It’s a Boy!" : "It’s a Girl!"}</h1>

                <p className="final-subtitle">Welcome, Baby Evvala ❤️</p>

                <p className="reveal-thanks">
                  Thank you for being part of this beautiful journey and
                  celebrating this precious moment with us.
                </p>
              </div>
            </main>
          </>
        );
      }}
    />
  );
}

function TimeCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="time-card">
      <div>{String(value).padStart(2, "0")}</div>
      <span>{label}</span>
    </div>
  );
}