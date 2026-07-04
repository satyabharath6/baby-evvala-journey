import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";
import { useRevealSettings } from "../hooks/useRevealSettings";
import { useLanguage } from "../i18n/LanguageContext";
import "./RevealCinematic.css";

type Stage = "countdown" | "suspense" | "waiting" | "celebration";

const SUSPENSE_DURATION_MS = 10000;

export default function Reveal() {
  const { settings } = useRevealSettings();
  const { t } = useLanguage();

  const [stage, setStage] = useState<Stage>("countdown");
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!settings?.enabled) {
      setStage("countdown");
      setHasCelebrated(false);
      return;
    }

    const revealTime = new Date(settings.revealDate).getTime();

    if (Date.now() < revealTime) {
      setStage("countdown");
      setHasCelebrated(false);
      return;
    }

    if (settings.resultPublished && settings.gender) {
      setStage("suspense");
      setHasCelebrated(false);
      return;
    }

    setStage("waiting");
    setHasCelebrated(false);
  }, [
    settings?.enabled,
    settings?.revealDate,
    settings?.resultPublished,
    settings?.gender,
  ]);

  useEffect(() => {
    if (stage !== "suspense") return;

    const timer = window.setTimeout(() => {
      setStage("celebration");
    }, SUSPENSE_DURATION_MS);

    return () => clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "celebration" || !settings?.gender || hasCelebrated) return;

    setHasCelebrated(true);

    const colors =
      settings.gender === "boy"
        ? ["#4dabf7", "#74c0fc", "#ffffff"]
        : ["#ff4da6", "#ff85c1", "#ffffff"];

    const end = Date.now() + 9000;

    const interval = window.setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 95,
        spread: 120,
        startVelocity: 60,
        origin: { x: Math.random(), y: Math.random() * 0.55 },
        colors,
      });
    }, 260);

    return () => clearInterval(interval);
  }, [stage, settings?.gender, hasCelebrated]);

  if (!settings) {
    return (
      <RevealShell
        icon="✨"
        title="Loading..."
        text="Preparing Baby ఇవ్వల's special moment."
      />
    );
  }

  if (!settings.enabled) {
    return (
      <RevealShell
        icon="🎁"
        eyebrow={t.brand.babyNameTelugu}
        title={t.reveal.comingSoon}
        text={t.reveal.comingSoonText}
      />
    );
  }

  const revealTime = new Date(settings.revealDate).getTime();

  if (stage === "waiting") {
    return (
      <RevealShell
        icon="❤️"
        eyebrow={t.brand.babyNameTelugu}
        title="The moment is almost ready"
        text="Please stay on this page. The final reveal will begin as soon as the family publishes the result."
      />
    );
  }

  if (stage === "suspense") {
    return <RevealSuspense />;
  }

  if (stage === "celebration" && settings.gender) {
    const isBoy = settings.gender === "boy";

    return (
      <>
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle
          numberOfPieces={520}
        />

        <main
          className={
            isBoy ? "reveal-final boy-final" : "reveal-final girl-final"
          }
        >
          <div className="reveal-stars" />
          <div className="reveal-final-moon" />
          <div className="reveal-heartbeat" />

          <section className="final-reveal-open">
            <p className="reveal-eyebrow">{t.reveal.waitOver}</p>

            <div className="final-heart">{isBoy ? "💙" : "💖"}</div>

            <h1>{isBoy ? t.reveal.boy : t.reveal.girl}</h1>

            <h2>{t.reveal.welcome}</h2>

            <p>{t.reveal.thankYou}</p>
          </section>
        </main>
      </>
    );
  }

  return (
    <Countdown
      date={revealTime}
      onComplete={() => {
        if (settings.resultPublished && settings.gender) {
          setStage("suspense");
        } else {
          setStage("waiting");
        }
      }}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          if (settings.resultPublished && settings.gender) {
            return <RevealSuspense />;
          }

          return (
            <RevealShell
              icon="❤️"
              eyebrow={t.brand.babyNameTelugu}
              title="The moment is almost ready"
              text="Please stay on this page. The final reveal will begin as soon as the family publishes the result."
            />
          );
        }

        return (
          <main className="reveal-cinematic-page">
            <div className="reveal-stars" />
            <div className="reveal-moon" />

            <section className="reveal-cinematic-card">
              <p className="reveal-eyebrow">{t.reveal.countdownEyebrow}</p>
              <h1>{t.reveal.countdownTitle}</h1>
              <p>{t.reveal.countdownText}</p>

              <div className="cinematic-countdown-grid">
                <TimeCard value={days} label={t.reveal.days} />
                <TimeCard value={hours} label={t.reveal.hours} />
                <TimeCard value={minutes} label={t.reveal.minutes} />
                <TimeCard value={seconds} label={t.reveal.seconds} />
              </div>
            </section>
          </main>
        );
      }}
    />
  );
}

function RevealSuspense() {
  const { t } = useLanguage();

  return (
    <main className="reveal-suspense">
      <div className="reveal-stars" />
      <div className="reveal-final-moon" />
      <div className="suspense-heart">❤️</div>

      <div className="suspense-text">
        <p>{t.reveal.suspense1}</p>
        <p>{t.reveal.suspense2}</p>
        <p>{t.reveal.suspense3}</p>
        <h1>{t.reveal.suspenseFinal}</h1>
      </div>
    </main>
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