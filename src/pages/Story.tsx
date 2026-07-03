import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TimelineCard from "../components/TimelineCard";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

type TimelineEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
};

export default function Story() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    const q = query(collection(db, "timeline"), orderBy("createdAt", "desc"));

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
        maxWidth: "850px",
        margin: "150px auto 80px",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "white", fontSize: "56px", textAlign: "center" }}>
        ❤️ Our Story
      </h1>

      <p style={{ color: "#e5e7eb", textAlign: "center", fontSize: "21px", marginBottom: "60px" }}>
        Two hearts, one journey, and a tiny miracle on the way.
      </p>

      {events.length === 0 ? (
        <p style={{ color: "white", textAlign: "center" }}>
          No timeline events added yet.
        </p>
      ) : (
        events.map((event) => (
          <TimelineCard
            key={event.id}
            emoji="✨"
            title={event.title}
            date={event.date}
            description={event.description}
          />
        ))
      )}
    </motion.main>
  );
}