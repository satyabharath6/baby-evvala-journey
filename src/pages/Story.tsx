import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import type { MediaType } from "../services/uploadService";
import { useLanguage } from "../i18n/LanguageContext";

type TimelineEvent = {
  id: string;
  emoji: string;
  title: string;
  titleTe?: string;
  date: string;
  location?: string;
  locationTe?: string;
  description: string;
  descriptionTe?: string;
  whyItMattered?: string;
  whyItMatteredTe?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
};

export default function Story() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const { t, language } = useLanguage();

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
        <p>{t.story.eyebrow}</p>
        <h1>{t.story.title}</h1>
        <h2>{t.story.subtitle}</h2>
      </section>

      {events.length === 0 ? (
        <section className="glass-card" style={{ padding: 32, textAlign: "center" }}>
          <h2>{t.story.emptyTitle}</h2>
          <p style={{ color: "#ddd", lineHeight: 1.7 }}>{t.story.emptyText}</p>
        </section>
      ) : (
        <section className="journey-timeline">
          <div className="timeline-line" />

          {events.map((event, index) => {
            const title =
              language === "te" ? event.titleTe || event.title : event.title;

            const location =
              language === "te"
                ? event.locationTe || event.location
                : event.location;

            const description =
              language === "te"
                ? event.descriptionTe || event.description
                : event.description;

            const whyItMattered =
              language === "te"
                ? event.whyItMatteredTe || event.whyItMattered
                : event.whyItMattered;

            return (
              <motion.article
                key={event.id}
                className={
                  index % 2 === 0 ? "journey-card left" : "journey-card right"
                }
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="journey-dot">{event.emoji}</div>

                <div className="journey-content">
                  {event.mediaUrl && event.mediaType === "image" && (
                    <img
                      className="journey-media"
                      src={event.mediaUrl}
                      alt={title}
                    />
                  )}

                  {event.mediaUrl && event.mediaType === "video" && (
                    <video className="journey-media" src={event.mediaUrl} controls />
                  )}

                  <span>{event.date}</span>

                  {location && (
                    <p className="journey-location">📍 {location}</p>
                  )}

                  <h2>{title}</h2>
                  <p>{description}</p>

                  {whyItMattered && (
                    <div className="why-mattered">
                      <strong>{t.story.whyMattered}</strong>
                      <p>{whyItMattered}</p>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </section>
      )}
    </main>
  );
}