import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "150px 20px 80px",
        position: "relative",
        zIndex: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: "22px", marginBottom: "20px" }}
      >
        ✨ Baby Evvala ✨
      </motion.div>

      <motion.h1
        animate={{ scale: [1, 1.025, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          fontSize: "64px",
          color: "white",
          marginBottom: "28px",
          lineHeight: 1.1,
        }}
      >
        Every heartbeat begins with hope.
      </motion.h1>

      <h2 style={{ color: "#ffd6f3", fontSize: "38px" }}>
        ఒక కొత్త హృదయం...
      </h2>

      <h2 style={{ color: "#ffd6f3", fontSize: "38px" }}>
        మన కుటుంబంలోకి
      </h2>

      <p style={{ color: "#e5e7eb", fontSize: "23px", marginTop: "34px" }}>
        Join us as we welcome our little miracle.
      </p>

      <motion.button
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.96 }}
        animate={{
          boxShadow: [
            "0 0 18px rgba(255,95,162,0.45)",
            "0 0 38px rgba(168,85,247,0.75)",
            "0 0 18px rgba(255,95,162,0.45)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          marginTop: "42px",
          background: "linear-gradient(135deg,#ff5fa2,#9d4edd)",
          color: "white",
          border: "none",
          borderRadius: "999px",
          padding: "18px 44px",
          fontSize: "20px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Begin Journey ❤️
      </motion.button>
    </section>
  );
}
