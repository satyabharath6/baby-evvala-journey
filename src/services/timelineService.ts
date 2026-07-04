import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import type { TimelineEvent } from "../types/timeline";

export function subscribeToLatestTimelineEvent(
  callback: (event: TimelineEvent | null) => void
) {
  const q = query(collection(db, "timeline"), orderBy("date", "desc"), limit(1));

  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback(null);
      return;
    }

    const doc = snapshot.docs[0];

    callback({
      id: doc.id,
      ...(doc.data() as Omit<TimelineEvent, "id">),
    });
  });
}
