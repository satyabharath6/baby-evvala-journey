import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRevealSettings } from "../../hooks/useRevealSettings";
import { useLanguage } from "../../i18n/LanguageContext";
import "./CountdownWidget.css";

export default function CountdownWidget() {
  const { settings } = useRevealSettings();
  const { t } = useLanguage();

  if (!settings || !settings.enabled) return null;

  const revealTime = new Date(settings.revealDate).getTime();

  return (
    <motion.section
      className="countdown-widget"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <p className="countdown-label">{t.home.countdownLabel}</p>

      <h2>{t.home.countdownTitle}</h2>

      <Countdown
        date={revealTime}
        renderer={({ completed, days, hours, minutes, seconds }) => {
          if (completed) {
            return (
              <h3 className="countdown-complete">
                {t.home.countdownComplete}
              </h3>
            );
          }

          return (
            <div className="countdown-widget-grid">
              <TimeBox value={days} label={t.reveal.days} />
              <TimeBox value={hours} label={t.reveal.hours} />
              <TimeBox value={minutes} label={t.reveal.minutes} />
              <TimeBox value={seconds} label={t.reveal.seconds} />
            </div>
          );
        }}
      />

      <Link to="/reveal" className="hero-v2-button">
        {t.home.countdownButton}
      </Link>
    </motion.section>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-box">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}