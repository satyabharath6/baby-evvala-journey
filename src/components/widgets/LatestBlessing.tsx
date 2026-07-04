import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRandomBlessing } from "../../hooks/useRandomBlessing";
import "./LatestBlessing.css";

export default function LatestBlessing() {
  const { randomBlessing, totalBlessings } = useRandomBlessing();

  if (!randomBlessing) return null;

  return (
    <motion.section
      className="latest-blessing"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <p className="latest-blessing-label">💌 LOVE FROM FAMILY</p>

      <h2>A blessing from the heart</h2>

      <blockquote>“{randomBlessing.message}”</blockquote>

      <p className="latest-blessing-author">
        — {randomBlessing.name}
        {randomBlessing.city ? `, ${randomBlessing.city}` : ""}
      </p>

      <p className="latest-blessing-count">
        Showing one of {totalBlessings} blessings
      </p>

      <Link to="/blessings" className="hero-v2-button">
        Read All Blessings ❤️
      </Link>
    </motion.section>
  );
}