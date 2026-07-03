import { motion } from "framer-motion";

export default function Blessings() {
  const blessings = [
    {
      name: "Grandma 👵",
      message:
        "May you always be healthy, kind, and surrounded by love.",
    },
    {
      name: "Grandpa 👴",
      message:
        "Dream big, work hard, and always stay humble.",
    },
    {
      name: "Friend ❤️",
      message:
        "We can't wait to meet you. The world is already brighter because of you.",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "3rem",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        💌 Blessings
      </h1>

      <p
        style={{
          color: "#d7d7d7",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Every blessing becomes a memory that lasts forever.
      </p>

      {blessings.map((b, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "25px",
            marginBottom: "20px",
            backdropFilter: "blur(10px)",
            color: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>
            {b.name}
          </h2>

          <p style={{ color: "#dddddd", lineHeight: 1.7 }}>
            {b.message}
          </p>
        </motion.div>
      ))}
    </motion.main>
  );
}