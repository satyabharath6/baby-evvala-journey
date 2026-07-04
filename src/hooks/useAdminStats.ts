import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export function useAdminStats() {
  const [stats, setStats] = useState({
    journey: 0,
    gallery: 0,
    blessings: 0,
    predictions: 0,
    videos: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const [timelineSnap, gallerySnap, blessingsSnap, predictionsSnap] =
        await Promise.all([
          getDocs(collection(db, "timeline")),
          getDocs(collection(db, "gallery")),
          getDocs(collection(db, "blessings")),
          getDocs(collection(db, "predictions")),
        ]);

      const videos = timelineSnap.docs.filter(
        (doc) => doc.data().mediaType === "video"
      ).length;

      setStats({
        journey: timelineSnap.size,
        gallery: gallerySnap.size,
        blessings: blessingsSnap.size,
        predictions: predictionsSnap.size,
        videos,
      });
    }

    loadStats();
  }, []);

  return stats;
}