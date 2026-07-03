import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

type GalleryPhoto = {
  id: string;
  imageUrl: string;
  caption: string;
  storagePath?: string;
};

export default function AdminGallery() {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  async function loadPhotos() {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<GalleryPhoto, "id">),
    }));

    setPhotos(data);
  }

  useEffect(() => {
    loadPhotos();
  }, []);

  const uploadPhoto = async () => {
    if (!file) {
      alert("Please choose a photo.");
      return;
    }

    try {
      setUploading(true);

      const storagePath = `gallery/${Date.now()}-${file.name}`;
      const fileRef = ref(storage, storagePath);

      await uploadBytes(fileRef, file);

      const imageUrl = await getDownloadURL(fileRef);

      await addDoc(collection(db, "gallery"), {
        imageUrl,
        caption,
        storagePath,
        createdAt: serverTimestamp(),
      });

      setFile(null);
      setCaption("");
      await loadPhotos();

      alert("Photo uploaded successfully ❤️");
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (photo: GalleryPhoto) => {
    if (!window.confirm("Delete this photo?")) return;

    try {
      if (photo.storagePath) {
        await deleteObject(ref(storage, photo.storagePath));
      }

      await deleteDoc(doc(db, "gallery", photo.id));
      await loadPhotos();

      alert("Photo deleted.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  return (
    <main
      style={{
        maxWidth: 1000,
        margin: "120px auto",
        padding: 20,
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>📸 Gallery Manager</h1>

      <p style={{ color: "#ccc", marginBottom: 30 }}>
        Upload and manage Baby Evvala gallery photos.
      </p>

      <div
        style={{
          background: "rgba(255,255,255,.08)",
          borderRadius: 24,
          padding: 30,
          border: "1px solid rgba(255,255,255,.15)",
          marginBottom: 40,
        }}
      >
        <label>Choose Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <label style={{ marginTop: 20 }}>Caption</label>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="20 week ultrasound, family photo, etc."
        />

        <button
          className="submit-btn"
          onClick={uploadPhoto}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Photo ❤️"}
        </button>
      </div>

      <h2>Uploaded Photos</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 25,
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              background: "rgba(255,255,255,.08)",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.15)",
            }}
          >
            <img
              src={photo.imageUrl}
              alt={photo.caption}
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
              }}
            />

            <div style={{ padding: 18 }}>
              <h3>{photo.caption || "Baby Evvala Memory"}</h3>

              <button
                onClick={() => deletePhoto(photo)}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 12,
                  border: "none",
                  background: "#ff4d6d",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                🗑 Delete Photo
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}