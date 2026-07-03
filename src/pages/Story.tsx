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
    <main className="page story-v2">
      <div className="prediction-header">
        <h1>❤️ Our Story</h1>
        <p>Every milestone becomes part of Baby Evvala&apos;s journey.</p>
      </div>

      <div className="story-timeline">
        {events.length === 0 ? (
          <p className="empty-text">No story events added yet.</p>
        ) : (
          events.map((event) => (
            <motion.article
              key={event.id}
              whileHover={{ scale: 1.02 }}
              className="story-card"
            >
              <div className="story-emoji">{event.emoji}</div>

              <div>
                <h2>{event.title}</h2>
                <p className="story-date">{event.date}</p>
                <p className="story-description">{event.description}</p>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </main>
  );
}