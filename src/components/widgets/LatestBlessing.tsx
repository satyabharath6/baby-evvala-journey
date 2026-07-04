import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRandomBlessing } from "../../hooks/useRandomBlessing";
import { useLanguage } from "../../i18n/LanguageContext";
import "./LatestBlessing.css";

export default function LatestBlessing() {
  const { randomBlessing, totalBlessings } = useRandomBlessing();
  const { t } = useLanguage();

  if (!randomBlessing) return null;

  return (
    <motion.section
      className="latest-blessing"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <p className="latest-blessing-label">{t.home.latestBlessingLabel}</p>

      <h2>{t.home.latestBlessingTitle}</h2>

      <blockquote>“{randomBlessing.message}”</blockquote>

      <p className="latest-blessing-author">
        — {randomBlessing.name}
        {randomBlessing.city ? `, ${randomBlessing.city}` : ""}
      </p>

      <p className="latest-blessing-count">
        {t.home.latestBlessingCountStart} {totalBlessings}{" "}
        {t.home.latestBlessingCountEnd}
      </p>

      <Link to="/blessings" className="hero-v2-button">
        {t.home.latestBlessingButton}
      </Link>
    </motion.section>
  );
}