import { useEffect, useState } from "react";
import { subscribeToGallery } from "../services/galleryService";
import type { GalleryPhoto } from "../types/gallery";

export function useGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToGallery(setPhotos);
    return () => unsubscribe();
  }, []);

  return { photos };
}