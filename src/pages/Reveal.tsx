import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function Reveal() {
  const [revealed, setRevealed] = useState(false);

  const celebrate = () => {
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });
    confetti({ particleCount: 120, angle: 60, spread: 80, origin: { x: 0 } });
    confetti({ particleCount: 120, angle: 120, spread: 80, origin: { x: 1 } });

    setRevealed(true);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {!revealed ? (
        <>
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ fontSize: "7rem" }}
          >
            🎁
          </motion.div>

          <h1 style={{ fontSize: "3rem" }}>The Big Reveal</h1>

          <p style={{ color: "#ddd", maxWidth: 500, marginBottom: 30 }}>
            One little heartbeat... One unforgettable surprise...
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={celebrate}
            style={{
              padding: "18px 40px",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              fontSize: "1.2rem",
              background: "linear-gradient(90deg,#ff5db1,#8b5cf6)",
              color: "white",
              boxShadow: "0 0 35px rgba(255, 93, 177, 0.6)",
            }}
          >
            Open Gift ❤️
          </motion.button>
        </>
      ) : (
        <>
          {["🎈", "💗", "🎀", "🎈", "💖", "🌸"].map((item, i) => (
            <div
              key={i}
              className="balloon"
              style={{
                left: `${15 + i * 13}%`,
                animationDelay: `${i * 0.6}s`,
              }}
            >
              {item}
            </div>
          ))}

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ fontSize: "7rem" }}>💗</div>

            <h1 style={{ fontSize: "4.5rem", marginTop: 20 }}>
              IT'S A GIRL!
            </h1>

            <p style={{ color: "#ddd", marginTop: 20, fontSize: "1.3rem" }}>
              Thank you for celebrating Baby Evvala's journey with us ❤️
            </p>
          </motion.div>
        </>
      )}
    </motion.main>
  );
}