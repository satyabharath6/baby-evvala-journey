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
      <h2 style={{ color: "white", textAlign: "center", marginTop: 120 }}>
        Loading...
      </h2>
    );
  }

  if (!settings.enabled) {
    return (
      <h2 style={{ color: "white", textAlign: "center", marginTop: 120 }}>
        Reveal Coming Soon ❤️
      </h2>
    );
  }

  const revealTime = new Date(settings.revealDate).getTime();

  return (
    <Countdown
      date={revealTime}
      renderer={({ completed, days, hours, minutes, seconds }) => {
        if (!completed) {
          return (
            <main style={{ color: "white", textAlign: "center", marginTop: 120 }}>
              <h1 style={{ fontSize: "4.5rem" }}>🎉 Gender Reveal</h1>

              <p style={{ fontSize: "1.5rem", color: "#ddd" }}>
                Countdown to Baby Evvala&apos;s Big Reveal
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 30,
                  marginTop: 60,
                  flexWrap: "wrap",
                }}
              >
                <TimeCard value={days} label="Days" />
                <TimeCard value={hours} label="Hours" />
                <TimeCard value={minutes} label="Minutes" />
                <TimeCard value={seconds} label="Seconds" />
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

            <main style={{ color: "white", textAlign: "center", marginTop: 120 }}>
              <div style={{ fontSize: "7rem", animation: "pulse 1.5s infinite" }}>
                {settings.gender === "boy" ? "💙" : "💖"}
              </div>

              <h1
                style={{
                  fontSize: "5.5rem",
                  animation: "pulse 1.5s infinite",
                  textShadow: "0 0 25px rgba(255,255,255,.8)",
                }}
              >
                {settings.gender === "boy" ? "IT'S A BOY!" : "IT'S A GIRL!"}
              </h1>

              <h2 style={{ marginTop: 30, fontSize: "2rem" }}>
                Welcome Baby Evvala ❤️
              </h2>
            </main>
          </>
        );
      }}
    />
  );
}

function TimeCard({ value, label }: { value: number; label: string }) {
  return (
    <div
      style={{
        width: 150,
        padding: 25,
        borderRadius: 25,
        background: "rgba(255,255,255,.08)",
        border: "1px solid rgba(255,255,255,.15)",
      }}
    >
      <div style={{ fontSize: "3rem", fontWeight: "bold" }}>{value}</div>
      <div style={{ marginTop: 10, color: "#ccc", fontSize: "1.2rem" }}>
        {label}
      </div>
    </div>
  );
}