import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { HomeLetter } from "../types/homeLetter";

export const defaultHomeLetter: HomeLetter = {
  title: "❤️ A Letter to Our Family",
  body:
    "Dear Family and Friends,\n\nThank you for being part of one of the most beautiful chapters of our lives.\n\nAs we wait to welcome Baby ఇవ్వల, our hearts are filled with excitement, gratitude, and hope. We created this little corner on the internet so that no moment would be forgotten.\n\nWhether you're joining us from nearby or from across the world, thank you for walking this journey with us. Your love means more than words can express.\n\nOne day, Baby ఇవ్వల will look back at these memories and know just how deeply they were loved even before they were born.",
  signature: "Honey ❤️ Satya",
};

export async function getHomeLetter() {
  const snap = await getDoc(doc(db, "settings", "homeLetter"));

  if (!snap.exists()) {
    return defaultHomeLetter;
  }

  return snap.data() as HomeLetter;
}

export async function saveHomeLetter(letter: HomeLetter) {
  await setDoc(doc(db, "settings", "homeLetter"), {
    ...letter,
    updatedAt: serverTimestamp(),
  });
}