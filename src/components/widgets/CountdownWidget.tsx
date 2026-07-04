import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRevealSettings } from "../../hooks/useRevealSettings";
import "./CountdownWidget.css";

export default function CountdownWidget() {
  const { settings } = useRevealSettings();

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
      <p className="countdown-label">🎉 THE BIG MOMENT</p>

      <h2>Our Reveal Is Almost Here</h2>

      <Countdown
        date={revealTime}
        renderer={({ completed, days, hours, minutes, seconds }) => {
          if (completed) {
            return <h3 className="countdown-complete">The reveal is ready ❤️</h3>;
          }

          return (
            <div className="countdown-widget-grid">
              <TimeBox value={days} label="Days" />
              <TimeBox value={hours} label="Hours" />
              <TimeBox value={minutes} label="Minutes" />
              <TimeBox value={seconds} label="Seconds" />
            </div>
          );
        }}
      />

      <Link to="/reveal" className="hero-v2-button">
        Open Reveal Page ❤️
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