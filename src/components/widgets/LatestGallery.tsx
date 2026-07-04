import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGallery } from "../../hooks/useGallery";
import "./LatestGallery.css";

export default function LatestGallery() {
  const { photos } = useGallery();
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
        <p>📸 LATEST MEMORIES</p>
        <h2>Beautiful moments we treasure</h2>
      </div>

      <div className="latest-gallery-grid">
        {latestPhotos.map((photo) => (
          <article key={photo.id} className="latest-gallery-card">
            <img src={photo.imageUrl} alt={photo.caption || "Baby Evvala memory"} />
            <h3>{photo.caption || "Baby Evvala Memory"}</h3>
          </article>
        ))}
      </div>

      <Link to="/gallery" className="hero-v2-button">
        View Full Gallery ❤️
      </Link>
    </motion.section>
  );
}