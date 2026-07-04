import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLatestTimelineEvent } from "../../hooks/useLatestTimelineEvent";
import { useLanguage } from "../../i18n/LanguageContext";
import "./LatestJourney.css";

export default function LatestJourney() {
  const { event } = useLatestTimelineEvent();
  const { t, language } = useLanguage();

  if (!event) return null;

  const title = language === "te" ? event.titleTe || event.title : event.title;
  const description =
    language === "te"
      ? event.descriptionTe || event.description
      : event.description;

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
        <p className="latest-label">{t.home.latestJourneyLabel}</p>
        <h2>{title}</h2>
        <p className="latest-date">{event.date}</p>
        <p className="latest-description">{description}</p>

        <Link to="/story" className="hero-v2-button">
          {t.home.latestJourneyButton}
        </Link>
      </div>
    </motion.section>
  );
}