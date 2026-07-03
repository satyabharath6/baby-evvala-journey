import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GlowingMoon() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 40, damping: 20 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    mouseX.set((e.clientX - window.innerWidth / 2) * 0.02);
    mouseY.set((e.clientY - window.innerHeight / 2) * 0.02);
  }

  return (
    <motion.div
      className="glowing-moon"
      style={{ x, y }}
      onMouseMove={handleMove}
      animate={{
        y: [0, -18, 0],
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="moon-surface" />
    </motion.div>
  );
}