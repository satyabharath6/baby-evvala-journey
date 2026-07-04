import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";
import { useRevealSettings } from "../hooks/useRevealSettings";
import "./RevealCinematic.css";

export default function Reveal() {
  const { settings } = useRevealSettings();
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

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

    const end = Date.now() + 7000;

    const interval = window.setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 90,
        spread: 110,
        startVelocity: 58,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.45,
        },
        colors,
      });
    }, 300);
  }

  if (!settings) {
    return <RevealShell icon="✨" title="Loading..." text="Preparing Baby ఇవ్వల's special moment." />;
  }

  if (!settings.enabled) {
    return (
      <RevealShell
        icon="🎁"
        eyebrow="Baby ఇవ్వల"
        title="Reveal Coming Soon"
        text="Our little miracle's special moment is almost here ❤️"
      />
    );
  }

  const revealTime = new Date(settings.revealDate).getTime();

  return (
    <Countdown
      date={revealTime}
      renderer={({ completed, days, hours, minutes, seconds }) => {
        if (!completed) {
          return (
            <main className="reveal-cinematic-page">
              <div className="reveal-stars" />
              <div className="reveal-moon" />

              <section className="reveal-cinematic-card">
                <p className="reveal-eyebrow">🎉 Baby ఇవ్వల Reveal</p>
                <h1>The big moment is almost here</h1>
                <p>
                  Soon, our family will share one beautiful moment together.
                </p>

                <div className="cinematic-countdown-grid">
                  <TimeCard value={days} label="Days" />
                  <TimeCard value={hours} label="Hours" />
                  <TimeCard value={minutes} label="Minutes" />
                  <TimeCard value={seconds} label="Seconds" />
                </div>
              </section>
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
              numberOfPieces={450}
            />

            <main className={isBoy ? "reveal-final boy-final" : "reveal-final girl-final"}>
              <div className="reveal-stars" />
              <div className="reveal-heartbeat" />

              <section className="final-reveal-card">
                <p className="reveal-eyebrow">The wait is over</p>
                <div className="final-heart">{isBoy ? "💙" : "💖"}</div>
                <h1>{isBoy ? "It’s a Boy!" : "It’s a Girl!"}</h1>
                <h2>Welcome, Baby ఇవ్వల ❤️</h2>
                <p>
                  Thank you for being part of this beautiful journey and
                  celebrating this precious moment with us.
                </p>
              </section>
            </main>
          </>
        );
      }}
    />
  );
}

function RevealShell({
  icon,
  eyebrow,
  title,
  text,
}: {
  icon: string;
  eyebrow?: string;
  title: string;
  text: string;
}) {
  return (
    <main className="reveal-cinematic-page">
      <div className="reveal-stars" />
      <div className="reveal-moon" />

      <section className="reveal-cinematic-card">
        <div className="reveal-icon">{icon}</div>
        {eyebrow && <p className="reveal-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p>{text}</p>
      </section>
    </main>
  );
}

function TimeCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="cinematic-time-card">
      <h2>{String(value).padStart(2, "0")}</h2>
      <span>{label}</span>
    </div>
  );
}