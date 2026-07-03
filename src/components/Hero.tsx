import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="page"
      style={{
        textAlign: "center",
        position: "relative",
        zIndex: 2,
        paddingBottom: "80px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "clamp(1rem,2vw,1.4rem)",
          marginBottom: 20,
          color: "#ffd6f3",
          letterSpacing: 1,
        }}
      >
        ✨ Baby Evvala ✨
      </motion.div>

      <motion.h1
        animate={{ scale: [1, 1.02, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="hero-title"
        style={{
          color: "white",
          maxWidth: 900,
          margin: "0 auto 24px",
        }}
      >
        Every heartbeat
        <br />
        begins with hope.
      </motion.h1>

      <h2
        style={{
          color: "#ffd6f3",
          fontSize: "clamp(1.4rem,4vw,2.4rem)",
          margin: 0,
        }}
      >
        ఒక కొత్త హృదయం...
      </h2>

      <h2
        style={{
          color: "#ffd6f3",
          fontSize: "clamp(1.4rem,4vw,2.4rem)",
          marginTop: 8,
        }}
      >
        మన కుటుంబంలోకి
      </h2>

      <p
        className="hero-text"
        style={{
          color: "#e5e7eb",
          marginTop: 30,
          maxWidth: 650,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Join us as we welcome our little miracle.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        animate={{
          boxShadow: [
            "0 0 18px rgba(255,95,162,.4)",
            "0 0 40px rgba(168,85,247,.8)",
            "0 0 18px rgba(255,95,162,.4)",
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
        className="primary-btn"
        style={{
          maxWidth: 320,
          marginTop: 40,
        }}
      >
        Begin Journey ❤️
      </motion.button>
    </section>
  );
}