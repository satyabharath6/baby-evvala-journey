import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import type { RevealGuest } from "../types/revealGuest";

const revealGuestsRef = collection(db, "revealGuests");

export function subscribeToRevealGuests(
  callback: (guests: RevealGuest[]) => void
) {
  const q = query(revealGuestsRef, orderBy("createdAt", "desc"), limit(80));

  return onSnapshot(q, (snapshot) => {
    const guests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<RevealGuest, "id">),
    }));

    callback(guests);
  });
}

export async function addRevealGuest({
  name,
  city,
}: {
  name: string;
  city: string;
}) {
  await addDoc(revealGuestsRef, {
    name: name.trim(),
    city: city.trim(),
    createdAt: serverTimestamp(),
  });
}