import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroV2() {
  return (
    <section className="hero-v2 page">
      <motion.div
        className="hero-v2-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <p className="hero-eyebrow">✨ Baby Evvala Journey ✨</p>

        <h1 className="hero-v2-title">
          Every heartbeat
          <br />
          begins with hope.
        </h1>

        <p className="hero-v2-telugu">
          ఒక కొత్త హృదయం...
          <br />
          మన కుటుంబంలోకి
        </p>

        <p className="hero-v2-subtitle">
          A little miracle, a growing family, and a story filled with love.
        </p>

        <Link to="/story" className="hero-v2-button">
          Begin Journey ❤️
        </Link>
      </motion.div>

      <motion.div
        className="hero-orb"
        animate={{ y: [0, -16, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🌙
      </motion.div>
    </section>
  );
}