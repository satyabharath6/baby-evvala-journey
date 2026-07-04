import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import type { RevealSettings } from "../types/reveal";

export function subscribeToRevealSettings(
  callback: (settings: RevealSettings | null) => void
) {
  return onSnapshot(doc(db, "settings", "reveal"), (snap) => {
    if (!snap.exists()) {
      callback(null);
      return;
    }

    callback(snap.data() as RevealSettings);
  });
}