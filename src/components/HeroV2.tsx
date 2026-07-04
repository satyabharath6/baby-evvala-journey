import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StarsBackground from "./StarsBackground";
import FloatingOrbs from "./FloatingOrbs";
import GlowingMoon from "./GlowingMoon";
import { useLanguage } from "../i18n/LanguageContext";

export default function HeroV2() {
  const { t } = useLanguage();

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
          <p className="hero-eyebrow">{t.home.heroEyebrow}</p>

          <h1 className="hero-v2-title">
            {t.home.heroTitleLine1}
            <br />
            {t.home.heroTitleLine2}
          </h1>

          <p className="hero-v2-telugu">
            {t.home.heroTeluguLine1}
            <br />
            {t.home.heroTeluguLine2}
          </p>

          <p className="hero-v2-subtitle">{t.home.heroSubtitle}</p>

          <Link to="/story" className="hero-v2-button">
            {t.home.heroButton}
          </Link>
        </motion.div>
      </section>

      <section className="landing-intro page">
        <p className="hero-eyebrow">{t.home.introEyebrow}</p>

        <h2>
          {t.home.introTitleLine1}
          <br />
          {t.home.introTitleLine2}
        </h2>

        <p>{t.home.introText}</p>
      </section>

      <section className="landing-preview page">
        <motion.div
          className="preview-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="preview-icon">❤️</div>
          <h2>{t.home.journeyTitle}</h2>
          <p>{t.home.journeyText}</p>
          <Link to="/story" className="hero-v2-button preview-btn">
            {t.home.journeyButton}
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
          <h2>{t.home.galleryTitle}</h2>
          <p>{t.home.galleryText}</p>
          <Link to="/gallery" className="hero-v2-button preview-btn">
            {t.home.galleryButton}
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
          <h2>{t.home.blessingsTitle}</h2>
          <p>{t.home.blessingsText}</p>
          <Link to="/blessings" className="hero-v2-button preview-btn">
            {t.home.blessingsButton}
          </Link>
        </motion.div>
      </section>
    </>
  );
}