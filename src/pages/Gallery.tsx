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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: 20,
      }}
    >
      <h1 style={{ color: "white", textAlign: "center", fontSize: "3rem" }}>
        📸 Gallery
      </h1>

      <p style={{ color: "#ddd", textAlign: "center", marginBottom: 40 }}>
        Every picture tells part of Baby Evvala's story.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 25,
        }}
      >
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedPhoto(photo)}
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,.3)",
              border: "1px solid rgba(255,255,255,.15)",
              cursor: "pointer",
            }}
          >
            <img
              src={photo.imageUrl}
              alt={photo.caption}
              style={{
                width: "100%",
                height: 260,
                objectFit: "cover",
                display: "block",
              }}
            />

            <div style={{ padding: 18, color: "white" }}>
              <h3>{photo.caption || "Baby Evvala Memory"}</h3>
              <p style={{ color: "#ccc" }}>Click to view full photo</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.85)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: "absolute",
              top: 30,
              right: 30,
              fontSize: "2rem",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            ✕
          </button>

          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw" }}>
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                borderRadius: 20,
                objectFit: "contain",
              }}
            />

            <h2 style={{ color: "white", textAlign: "center" }}>
              {selectedPhoto.caption}
            </h2>
          </div>
        </div>
      )}
    </motion.main>
  );
}