import { motion } from "framer-motion";
import { useHomeLetter } from "../../hooks/useHomeLetter";
import "./HomeLetter.css";

export default function HomeLetter() {
  const { letter } = useHomeLetter();

  if (!letter) return null;

  return (
    <motion.section
      className="home-letter"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="home-letter-card">
        <h2>{letter.title}</h2>

        <div className="home-letter-body">
          {letter.body.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <h3>{letter.signature}</h3>
      </div>
    </motion.section>
  );
}