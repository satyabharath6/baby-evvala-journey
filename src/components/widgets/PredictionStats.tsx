import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePredictionStats } from "../../hooks/usePredictionStats";
import { useLanguage } from "../../i18n/LanguageContext";
import "./PredictionStats.css";

export default function PredictionStats() {
  const { total, boys, girls, boyPercent, girlPercent } = usePredictionStats();
  const { t, language } = useLanguage();

  const totalText =
    language === "te"
      ? `${t.home.predictionTotalBefore} ${total} ${t.home.predictionTotalAfter}`
      : `${total} ${t.home.predictionTotalAfter}`;

  return (
    <motion.section
      className="prediction-widget"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <p className="prediction-label">{t.home.predictionStatsLabel}</p>

      <h2>{t.home.predictionStatsTitle}</h2>

      <div className="prediction-score">
        <div className="prediction-side">
          <div className="prediction-emoji">👦</div>
          <h1>{boyPercent}%</h1>
          <p>
            {boys} {t.home.predictionCountLabel}
          </p>
        </div>

        <div className="prediction-heart">❤️</div>

        <div className="prediction-side">
          <div className="prediction-emoji">👧</div>
          <h1>{girlPercent}%</h1>
          <p>
            {girls} {t.home.predictionCountLabel}
          </p>
        </div>
      </div>

      <p className="prediction-total">{totalText}</p>

      <Link to="/prediction" className="hero-v2-button">
        {t.home.predictionButton}
      </Link>
    </motion.section>
  );
}