import { useState } from "react";
import { motion } from "framer-motion";
import { useGallery } from "../hooks/useGallery";
import { useLanguage } from "../i18n/LanguageContext";
import type { GalleryPhoto } from "../types/gallery";

export default function Gallery() {
  const { photos } = useGallery();
  const { t, language } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  function getCaption(photo: GalleryPhoto) {
    return language === "te"
      ? photo.captionTe || photo.caption
      : photo.caption;
  }

  return (
    <main className="page gallery-v2">
      <div className="prediction-header">
        <h1>{t.gallery.title}</h1>
        <p>{t.gallery.subtitle}</p>
      </div>

      {photos.length === 0 ? (
        <div className="glass-card" style={{ padding: 32, textAlign: "center" }}>
          <h2>{t.gallery.emptyTitle}</h2>
          <p style={{ color: "#ddd", lineHeight: 1.7 }}>{t.gallery.emptyText}</p>
        </div>
      ) : (
        <div className="gallery-grid-v2">
          {photos.map((photo) => {
            const caption = getCaption(photo);

            return (
              <motion.article
                key={photo.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedPhoto(photo)}
                className="gallery-card-v2"
              >
                <img
                  src={photo.imageUrl}
                  alt={caption || t.gallery.fallbackTitle}
                />

                <div>
                  <h3>{caption || t.gallery.fallbackTitle}</h3>
                  <p>{t.gallery.tapToView}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {selectedPhoto && (
        <div className="gallery-lightbox" onClick={() => setSelectedPhoto(null)}>
          <button
            className="gallery-close"
            onClick={() => setSelectedPhoto(null)}
            aria-label={t.gallery.close}
            type="button"
          >
            ✕
          </button>

          <div
            className="gallery-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.imageUrl}
              alt={getCaption(selectedPhoto) || t.gallery.fallbackTitle}
            />
            <h2>{getCaption(selectedPhoto) || t.gallery.fallbackTitle}</h2>
          </div>
        </div>
      )}
    </main>
  );
}