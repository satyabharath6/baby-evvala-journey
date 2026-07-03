import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

type TimelineEvent = {
  id: string;
  emoji: string;
  title: string;
  date: string;
  description: string;
};

export default function Story() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    const q = query(collection(db, "timeline"), orderBy("date", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<TimelineEvent, "id">),
      }));

      setEvents(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        maxWidth: 900,
        margin: "120px auto 80px",
        padding: 20,
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "3.5rem", textAlign: "center" }}>
        ❤️ Our Story
      </h1>

      <p
        style={{
          color: "#ddd",
          textAlign: "center",
          marginBottom: 50,
          fontSize: "1.2rem",
        }}
      >
        Every milestone becomes part of Baby Evvala's journey.
      </p>

      {events.length === 0 ? (
        <p style={{ textAlign: "center", color: "#ccc" }}>
          No story events added yet.
        </p>
      ) : (
        events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.02 }}
            style={{
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 24,
              padding: 30,
              marginBottom: 25,
              boxShadow: "0 10px 30px rgba(0,0,0,.25)",
            }}
          >
            <h2>
              {event.emoji} {event.title}
            </h2>

            <p style={{ color: "#ccc" }}>{event.date}</p>

            <p style={{ lineHeight: 1.8 }}>{event.description}</p>
          </motion.div>
        ))
      )}
    </motion.main>
  );
}