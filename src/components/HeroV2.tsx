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
          <p className="hero-eyebrow">
            ✨ Baby Evvala Journey ✨
          </p>

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
            A little miracle,
            a growing family,
            and a story filled with love.
          </p>

          <Link
            to="/story"
            className="hero-v2-button"
          >
            Begin Journey ❤️
          </Link>
        </motion.div>

      </section>

      {/* ---------- Journey Preview ---------- */}

      <section className="landing-preview page">

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          className="preview-card"
        >
          <div className="preview-icon">❤️</div>

          <h2>Our Journey</h2>

          <p>
            Follow every milestone from our wedding
            to Baby Evvala's arrival.
          </p>

          <Link to="/story" className="hero-v2-button">
            Explore Story
          </Link>

        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          transition={{ delay: .15 }}
          viewport={{ once: true }}
          className="preview-card"
        >
          <div className="preview-icon">📸</div>

          <h2>Gallery</h2>

          <p>
            Beautiful memories captured throughout
            this incredible journey.
          </p>

          <Link to="/gallery" className="hero-v2-button">
            View Gallery
          </Link>

        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          transition={{ delay: .3 }}
          viewport={{ once: true }}
          className="preview-card"
        >
          <div className="preview-icon">💌</div>

          <h2>Blessings</h2>

          <p>
            Read heartfelt blessings from family
            and friends around the world.
          </p>

          <Link to="/blessings" className="hero-v2-button">
            Read Blessings
          </Link>

        </motion.div>

      </section>
    </>
  );
}