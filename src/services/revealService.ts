import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { RevealSettings } from "../types/reveal";

export type PublicRevealSettings = {
  enabled: boolean;
  revealDate: string;
  resultPublished: boolean;
  gender?: "boy" | "girl" | "";
  updatedAt?: unknown;
};

const adminRevealRef = doc(db, "settings", "reveal");
const publicRevealRef = doc(db, "settings", "revealPublic");

/**
 * Admin/private reveal settings.
 * This can include gender.
 */
export function subscribeToRevealSettings(
  callback: (settings: RevealSettings | null) => void
) {
  return onSnapshot(adminRevealRef, (snap) => {
    if (!snap.exists()) {
      callback(null);
      return;
    }

    callback(snap.data() as RevealSettings);
  });
}

/**
 * Public reveal settings.
 * This should NOT include gender until resultPublished is true.
 */
export function subscribeToPublicRevealSettings(
  callback: (settings: PublicRevealSettings | null) => void
) {
  return onSnapshot(publicRevealRef, (snap) => {
    if (!snap.exists()) {
      callback(null);
      return;
    }

    const data = snap.data() as PublicRevealSettings;

    callback({
      enabled: Boolean(data.enabled),
      revealDate: data.revealDate,
      resultPublished: Boolean(data.resultPublished),
      gender: data.resultPublished ? data.gender : "",
      updatedAt: data.updatedAt,
    });
  });
}

/**
 * Save admin reveal settings and update the public countdown info.
 * Important: gender is saved only in the private admin doc.
 */
export async function saveRevealSettings(settings: RevealSettings) {
  await setDoc(
    adminRevealRef,
    {
      ...settings,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  await setDoc(
    publicRevealRef,
    {
      enabled: settings.enabled,
      revealDate: settings.revealDate,
      resultPublished: false,
      gender: "",
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Publish the final result publicly.
 * This is the moment gender becomes visible to public users.
 */
export async function publishRevealResult() {
  const snap = await getDoc(adminRevealRef);

  if (!snap.exists()) {
    throw new Error("Admin reveal settings do not exist.");
  }

  const settings = snap.data() as RevealSettings;

  if (!settings.gender) {
    throw new Error("Reveal gender is not set.");
  }

  await setDoc(
    publicRevealRef,
    {
      enabled: settings.enabled,
      revealDate: settings.revealDate,
      resultPublished: true,
      gender: settings.gender,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Hide the result again.
 * Useful for testing or resetting before the real reveal.
 */
export async function unpublishRevealResult() {
  const snap = await getDoc(adminRevealRef);

  const settings = snap.exists()
    ? (snap.data() as RevealSettings)
    : {
        enabled: false,
        revealDate: "",
      };

  await setDoc(
    publicRevealRef,
    {
      enabled: Boolean(settings.enabled),
      revealDate: settings.revealDate || "",
      resultPublished: false,
      gender: "",
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}