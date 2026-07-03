import { motion } from "framer-motion";

const orbs = [
  {
    size: 420,
    left: "-120px",
    top: "12%",
    color: "rgba(255,95,162,.18)",
    duration: 18,
  },
  {
    size: 340,
    right: "-80px",
    top: "55%",
    color: "rgba(155,77,255,.18)",
    duration: 22,
  },
  {
    size: 260,
    left: "38%",
    bottom: "-120px",
    color: "rgba(255,255,255,.06)",
    duration: 15,
  },
];

export default function FloatingOrbs() {
  return (
    <>
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(80px)",
            pointerEvents: "none",
            ...orb,
          }}
          animate={{
            y: [-25, 25, -25],
            x: [-15, 15, -15],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}