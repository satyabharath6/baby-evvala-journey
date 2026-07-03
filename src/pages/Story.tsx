import { motion } from "framer-motion";
import TimelineCard from "../components/TimelineCard";

export default function Story() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        maxWidth: "850px",
        margin: "150px auto 80px",
        padding: "20px",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "56px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        ❤️ Our Story
      </h1>

      <p
        style={{
          color: "#e5e7eb",
          textAlign: "center",
          fontSize: "21px",
          marginBottom: "60px",
        }}
      >
        Two hearts, one journey, and a tiny miracle on the way.
      </p>

      <TimelineCard
        emoji="💍"
        title="Our Wedding Day"
        date="March 6, 2025"
        description="The day our forever began, surrounded by love, family, blessings, and beautiful memories."
      />

      <TimelineCard
        emoji="🤰"
        title="A Tiny Miracle"
        description="A new life entered our world and changed everything with one beautiful heartbeat."
      />

      <TimelineCard
        emoji="✈️"
        title="Honey Arrived in America"
        description="Together in the USA, we started a new chapter as parents-to-be."
      />

      <TimelineCard
        emoji="👶"
        title="Waiting for Baby Evvala"
        description="Every kick, every heartbeat, and every small moment reminds us that our family is growing."
      />
    </motion.main>
  );
}