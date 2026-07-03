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
      if (snap.exists()) setSettings(snap.data() as RevealSettings);
    }

    loadReveal();

    const resize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function fireCelebration() {
    if (hasCelebrated) return;

    setHasCelebrated(true);

    const colors =
      settings?.gender === "boy"
        ? ["#4dabf7", "#74c0fc", "#ffffff"]
        : ["#ff4da6", "#ff85c1", "#ffffff"];

    const duration = 5000;
    const end = Date.now() + duration;

    const interval = window.setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 80,
        spread: 90,
        startVelocity: 55,
        origin: { x: Math.random(), y: Math.random() * 0.45 },
        colors,
      });
    }, 350);
  }

  if (!settings) {
    return (
      <main className="page reveal-page">
        <h2>Loading...</h2>
      </main>
    );
  }

  if (!settings.enabled) {
    return (
      <main className="page reveal-page">
        <div className="reveal-card">
          <div className="reveal-icon">🎁</div>
          <h1>Reveal Coming Soon</h1>
          <p>Baby Evvala&apos;s special moment is almost here ❤️</p>
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

                <h1>Gender Reveal</h1>

                <p>Countdown to Baby Evvala&apos;s big reveal</p>

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

        fireCelebration();

        return (
          <>
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle
              numberOfPieces={400}
            />

            <main className="page reveal-page">
              <div
                className={
                  settings.gender === "boy"
                    ? "reveal-card final-reveal boy-reveal"
                    : "reveal-card final-reveal girl-reveal"
                }
              >
                <div className="final-heart">
                  {settings.gender === "boy" ? "💙" : "💖"}
                </div>

                <h1>
                  {settings.gender === "boy"
                    ? "IT'S A BOY!"
                    : "IT'S A GIRL!"}
                </h1>

                <p>Welcome Baby Evvala ❤️</p>

                <p className="reveal-thanks">
                  Thank you for celebrating this beautiful journey with us.
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
      <div>{value}</div>
      <span>{label}</span>
    </div>
  );
}