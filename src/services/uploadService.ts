import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

export type MediaType = "image" | "video";

export type UploadedMedia = {
  url: string;
  storagePath: string;
  mediaType: MediaType;
};

export async function uploadMedia(
  file: File,
  folder: string
): Promise<UploadedMedia> {
  const mediaType: MediaType = file.type.startsWith("video/")
    ? "video"
    : "image";

  const safeName = file.name.replace(/\s+/g, "-");
  const storagePath = `${folder}/${Date.now()}-${safeName}`;
  const fileRef = ref(storage, storagePath);

  await uploadBytes(fileRef, file);

  const url = await getDownloadURL(fileRef);

  return {
    url,
    storagePath,
    mediaType,
  };
}

export async function deleteMedia(storagePath: string) {
  await deleteObject(ref(storage, storagePath));
}