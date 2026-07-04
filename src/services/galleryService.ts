import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import type { GalleryPhoto } from "../types/gallery";

export function subscribeToGallery(
  callback: (photos: GalleryPhoto[]) => void
) {
  const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const photos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<GalleryPhoto, "id">),
    }));

    callback(photos);
  });
}