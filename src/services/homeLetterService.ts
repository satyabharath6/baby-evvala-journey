import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { HomeLetter } from "../types/homeLetter";

export const defaultHomeLetter: HomeLetter = {
  title: "A Letter to Our Little Miracle",
  body:
    "From the moment we knew you were coming, our hearts changed forever. Every day, every prayer, every smile, and every dream has started to include you.",
  signature: "With love, Amma & Nanna",

  titleTe: "మా చిన్న అద్భుతానికి ఒక లేఖ",
  bodyTe:
    "నువ్వు మా జీవితంలోకి వస్తున్నావని తెలిసిన క్షణం నుంచి మా హృదయాలు మారిపోయాయి. ప్రతి రోజు, ప్రతి ప్రార్థన, ప్రతి చిరునవ్వు, ప్రతి కలలో ఇప్పుడు నువ్వు ఉన్నావు.",
  signatureTe: "ప్రేమతో, అమ్మ & నాన్న",
};

function normalizeHomeLetter(data: Partial<HomeLetter>): HomeLetter {
  return {
    title: data.title || defaultHomeLetter.title,
    body: data.body || defaultHomeLetter.body,
    signature: data.signature || defaultHomeLetter.signature,

    titleTe: data.titleTe || defaultHomeLetter.titleTe,
    bodyTe: data.bodyTe || defaultHomeLetter.bodyTe,
    signatureTe: data.signatureTe || defaultHomeLetter.signatureTe,

    updatedAt: data.updatedAt,
  };
}

export async function getHomeLetter(): Promise<HomeLetter> {
  const ref = doc(db, "settings", "homeLetter");
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return defaultHomeLetter;
  }

  return normalizeHomeLetter(snapshot.data() as Partial<HomeLetter>);
}

export async function saveHomeLetter(letter: HomeLetter) {
  const ref = doc(db, "settings", "homeLetter");

  await setDoc(
    ref,
    {
      ...letter,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}