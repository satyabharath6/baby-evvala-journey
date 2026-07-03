import { motion } from "framer-motion";

type Props = {
  emoji: string;
  title: string;
  date?: string;
  description: string;
};

export default function TimelineCard({
  emoji,
  title,
  date,
  description,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 24,
        padding: 30,
        marginBottom: 35,
        color: "white",
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
      }}
    >
      <div style={{ fontSize: 34, marginBottom: 10 }}>
        {emoji}
      </div>

      <h2 style={{ margin: 0 }}>{title}</h2>

      {date && (
        <p
          style={{
            color: "#d9c7ff",
            marginTop: 8,
            marginBottom: 20,
          }}
        >
          {date}
        </p>
      )}

      <p
        style={{
          lineHeight: 1.8,
          color: "#f2f2f2",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}
