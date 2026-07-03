import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
  "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600",
];

export default function Gallery() {
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
      <h1
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "3rem",
        }}
      >
        📸 Gallery
      </h1>

      <p
        style={{
          color: "#ddd",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Every picture tells part of Baby Evvala's story.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 25,
        }}
      >
        {images.map((img, index) => (
          <motion.img
            whileHover={{
              scale: 1.05,
            }}
            key={index}
            src={img}
            style={{
              width: "100%",
              borderRadius: 20,
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(0,0,0,.3)",
            }}
          />
        ))}
      </div>
    </motion.main>
  );
}