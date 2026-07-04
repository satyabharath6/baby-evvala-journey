import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePredictionStats } from "../../hooks/usePredictionStats";
import "./PredictionStats.css";

export default function PredictionStats() {
  const {
    total,
    boys,
    girls,
    boyPercent,
    girlPercent,
  } = usePredictionStats();

  return (
    <motion.section
      className="prediction-widget"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <p className="prediction-label">
        🔮 FAMILY PREDICTIONS
      </p>

      <h2>What Does Our Family Think?</h2>

      <div className="prediction-score">

        <div className="prediction-side">
          <div className="prediction-emoji">👦</div>
          <h1>{boyPercent}%</h1>
          <p>{boys} Predictions</p>
        </div>

        <div className="prediction-heart">
          ❤️
        </div>

        <div className="prediction-side">
          <div className="prediction-emoji">👧</div>
          <h1>{girlPercent}%</h1>
          <p>{girls} Predictions</p>
        </div>

      </div>

      <p className="prediction-total">
        {total} family members have already participated.
      </p>

      <Link
        to="/prediction"
        className="hero-v2-button"
      >
        Make Your Prediction ❤️
      </Link>
    </motion.section>
  );
}