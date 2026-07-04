import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGallery } from "../../hooks/useGallery";
import { useLanguage } from "../../i18n/LanguageContext";
import "./LatestGallery.css";

export default function LatestGallery() {
  const { photos } = useGallery();
  const { t, language } = useLanguage();

  const latestPhotos = photos.slice(0, 3);

  if (latestPhotos.length === 0) return null;

  return (
    <motion.section
      className="latest-gallery"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="latest-gallery-header">
        <p>{t.home.latestGalleryLabel}</p>
        <h2>{t.home.latestGalleryTitle}</h2>
      </div>

      <div className="latest-gallery-grid">
        {latestPhotos.map((photo) => {
          const caption =
            language === "te" ? photo.captionTe || photo.caption : photo.caption;

          return (
            <article key={photo.id} className="latest-gallery-card">
              <img
                src={photo.imageUrl}
                alt={caption || t.home.latestGalleryFallbackAlt}
              />
              <h3>{caption || t.home.latestGalleryFallbackTitle}</h3>
            </article>
          );
        })}
      </div>

      <Link to="/gallery" className="hero-v2-button">
        {t.home.latestGalleryButton}
      </Link>
    </motion.section>
  );
}