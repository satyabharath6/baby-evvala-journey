import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import type { MediaType } from "../services/uploadService";

type TimelineEvent = {
  id: string;
  emoji: string;
  title: string;
  date: string;
  location?: string;
  description: string;
  whyItMattered?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
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
    <main className="page journey-page">
      <section className="journey-hero">
        <p>✨ Baby ఇవ్వల Journey ✨</p>
        <h1>❤️ Our Journey</h1>
        <h2>Every heartbeat has a story.</h2>
      </section>

      <section className="journey-timeline">
        <div className="timeline-line" />

        {events.map((event, index) => (
          <motion.article
            key={event.id}
            className={index % 2 === 0 ? "journey-card left" : "journey-card right"}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="journey-dot">{event.emoji}</div>

            <div className="journey-content">
              {event.mediaUrl && event.mediaType === "image" && (
                <img className="journey-media" src={event.mediaUrl} alt={event.title} />
              )}

              {event.mediaUrl && event.mediaType === "video" && (
                <video className="journey-media" src={event.mediaUrl} controls />
              )}

              <span>{event.date}</span>

              {event.location && <p className="journey-location">📍 {event.location}</p>}

              <h2>{event.title}</h2>
              <p>{event.description}</p>

              {event.whyItMattered && (
                <div className="why-mattered">
                  <strong>Why this moment mattered</strong>
                  <p>{event.whyItMattered}</p>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}