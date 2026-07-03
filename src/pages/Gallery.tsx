import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

type GalleryPhoto = {
  id: string;
  imageUrl: string;
  caption: string;
};

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<GalleryPhoto, "id">),
      }));

      setPhotos(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="page gallery-v2">
      <div className="prediction-header">
        <h1>📸 Gallery</h1>
        <p>Every picture tells part of Baby Evvala&apos;s story.</p>
      </div>

      <div className="gallery-grid-v2">
        {photos.map((photo) => (
          <motion.article
            key={photo.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedPhoto(photo)}
            className="gallery-card-v2"
          >
            <img src={photo.imageUrl} alt={photo.caption} />

            <div>
              <h3>{photo.caption || "Baby Evvala Memory"}</h3>
              <p>Tap to view full photo</p>
            </div>
          </motion.article>
        ))}
      </div>

      {selectedPhoto && (
        <div className="gallery-lightbox" onClick={() => setSelectedPhoto(null)}>
          <button className="gallery-close" onClick={() => setSelectedPhoto(null)}>
            ✕
          </button>

          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto.imageUrl} alt={selectedPhoto.caption} />
            <h2>{selectedPhoto.caption}</h2>
          </div>
        </div>
      )}
    </main>
  );
}