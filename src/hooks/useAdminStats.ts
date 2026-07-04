import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

type LatestJourney = {
  title?: string;
  emoji?: string;
  date?: string;
};

type LatestGallery = {
  caption?: string;
  imageUrl?: string;
};

type LatestBlessing = {
  name?: string;
  city?: string;
  message?: string;
};

type LatestPrediction = {
  name?: string;
  gender?: string;
  babyName?: string;
};

type RevealSummary = {
  enabled?: boolean;
  gender?: "boy" | "girl";
  revealDate?: string;
};

export function useAdminStats() {
  const [stats, setStats] = useState({
    journey: 0,
    gallery: 0,
    blessings: 0,
    predictions: 0,
    videos: 0,

    latestJourney: null as LatestJourney | null,
    latestGallery: null as LatestGallery | null,
    latestBlessing: null as LatestBlessing | null,
    latestPrediction: null as LatestPrediction | null,
    reveal: null as RevealSummary | null,
  });

  useEffect(() => {
    async function loadStats() {
      const [
        timelineSnap,
        gallerySnap,
        blessingsSnap,
        predictionsSnap,
        latestJourneySnap,
        latestGallerySnap,
        latestBlessingSnap,
        latestPredictionSnap,
        revealSnap,
      ] = await Promise.all([
        getDocs(collection(db, "timeline")),
        getDocs(collection(db, "gallery")),
        getDocs(collection(db, "blessings")),
        getDocs(collection(db, "predictions")),

        getDocs(query(collection(db, "timeline"), orderBy("date", "desc"), limit(1))),
        getDocs(query(collection(db, "gallery"), orderBy("createdAt", "desc"), limit(1))),
        getDocs(query(collection(db, "blessings"), orderBy("submittedAt", "desc"), limit(1))),
        getDocs(query(collection(db, "predictions"), orderBy("submittedAt", "desc"), limit(1))),

        getDoc(doc(db, "settings", "reveal")),
      ]);

      const videos = timelineSnap.docs.filter(
        (docItem) => docItem.data().mediaType === "video"
      ).length;

      const latestJourney =
        latestJourneySnap.docs[0]?.data() as LatestJourney | undefined;

      const latestGallery =
        latestGallerySnap.docs[0]?.data() as LatestGallery | undefined;

      const latestBlessing =
        latestBlessingSnap.docs[0]?.data() as LatestBlessing | undefined;

      const latestPrediction =
        latestPredictionSnap.docs[0]?.data() as LatestPrediction | undefined;

      const reveal = revealSnap.exists()
        ? (revealSnap.data() as RevealSummary)
        : null;

      setStats({
        journey: timelineSnap.size,
        gallery: gallerySnap.size,
        blessings: blessingsSnap.size,
        predictions: predictionsSnap.size,
        videos,

        latestJourney: latestJourney || null,
        latestGallery: latestGallery || null,
        latestBlessing: latestBlessing || null,
        latestPrediction: latestPrediction || null,
        reveal,
      });
    }

    loadStats();
  }, []);

  return stats;
}