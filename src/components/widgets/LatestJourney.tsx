import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLatestTimelineEvent } from "../../hooks/useLatestTimelineEvent";
import "./LatestJourney.css";
export default function LatestJourney() {
  const { event } = useLatestTimelineEvent();

  if (!event) return null;

  return (
    <motion.section
      className="latest-journey glass-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="latest-journey-icon">{event.emoji}</div>

      <div>
        <p className="latest-label">LATEST MILESTONE</p>
        <h2>{event.title}</h2>
        <p className="latest-date">{event.date}</p>
        <p className="latest-description">{event.description}</p>

        <Link to="/story" className="hero-v2-button">
          View Full Journey ❤️
        </Link>
      </div>
    </motion.section>
  );
}