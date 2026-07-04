import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import type { Blessing } from "../types/blessing";

export function subscribeToBlessings(
  callback: (blessings: Blessing[]) => void
) {
  const q = query(
    collection(db, "blessings"),
    orderBy("submittedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const blessings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Blessing, "id">),
    }));

    callback(blessings);
  });
}