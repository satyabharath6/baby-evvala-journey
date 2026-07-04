import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StarsBackground from "./StarsBackground";
import FloatingOrbs from "./FloatingOrbs";
import GlowingMoon from "./GlowingMoon";

export default function HeroV2() {
  return (
    <>
      <section className="hero-v2 page">
        <FloatingOrbs />
        <GlowingMoon />
        <StarsBackground />
        <div className="shooting-star" />

        <motion.div
          className="hero-v2-content glass-hero"
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
      </section>

      <section className="landing-intro page">
        <p className="hero-eyebrow">A Family Celebration</p>

        <h2>
          One tiny heartbeat.
          <br />
          So many hearts waiting with love.
        </h2>

        <p>
          Explore our journey, memories, blessings, and the special reveal
          moment we are excited to share with everyone.
        </p>
      </section>

      <section className="landing-preview page">
        <motion.div
          className="preview-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="preview-icon">❤️</div>
          <h2>Our Journey</h2>
          <p>Follow every milestone from our wedding to Baby Evvala&apos;s arrival.</p>
          <Link to="/story" className="hero-v2-button preview-btn">
            Explore Story
          </Link>
        </motion.div>

        <motion.div
          className="preview-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          viewport={{ once: true }}
        >
          <div className="preview-icon">📸</div>
          <h2>Gallery</h2>
          <p>Beautiful memories captured throughout this incredible journey.</p>
          <Link to="/gallery" className="hero-v2-button preview-btn">
            View Gallery
          </Link>
        </motion.div>

        <motion.div
          className="preview-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="preview-icon">💌</div>
          <h2>Blessings</h2>
          <p>Read heartfelt blessings from family and friends around the world.</p>
          <Link to="/blessings" className="hero-v2-button preview-btn">
            Read Blessings
          </Link>
        </motion.div>
      </section>
    </>
  );
}