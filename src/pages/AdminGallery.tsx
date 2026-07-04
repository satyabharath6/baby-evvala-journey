import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import CMSLayout from "../components/cms/CMSLayout";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
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
  captionTe?: string;
  storagePath?: string;
};

export default function AdminGallery() {
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [captionTe, setCaptionTe] = useState("");
  const [saving, setSaving] = useState(false);
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

  function resetForm() {
    setEditingPhoto(null);
    setFile(null);
    setCaption("");
    setCaptionTe("");
  }

  function startEdit(photo: GalleryPhoto) {
    setEditingPhoto(photo);
    setCaption(photo.caption || "");
    setCaptionTe(photo.captionTe || "");
    setFile(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function savePhoto() {
    if (!editingPhoto && !file) {
      alert("Please choose a photo.");
      return;
    }

    try {
      setSaving(true);

      if (editingPhoto) {
        let photoUpdate = {};

        if (file) {
          const safeName = file.name.replace(/\s+/g, "-");
          const storagePath = `gallery/${Date.now()}-${safeName}`;
          const fileRef = ref(storage, storagePath);

          await uploadBytes(fileRef, file);
          const imageUrl = await getDownloadURL(fileRef);

          photoUpdate = {
            imageUrl,
            storagePath,
          };
        }

        await updateDoc(doc(db, "gallery", editingPhoto.id), {
          caption,
          captionTe,
          ...photoUpdate,
          updatedAt: serverTimestamp(),
        });

        if (file && editingPhoto.storagePath) {
          try {
            await deleteObject(ref(storage, editingPhoto.storagePath));
          } catch (error) {
            console.warn("Old photo delete failed:", error);
          }
        }

        alert("Photo updated successfully ❤️");
      } else {
        const safeName = file!.name.replace(/\s+/g, "-");
        const storagePath = `gallery/${Date.now()}-${safeName}`;
        const fileRef = ref(storage, storagePath);

        await uploadBytes(fileRef, file!);
        const imageUrl = await getDownloadURL(fileRef);

        await addDoc(collection(db, "gallery"), {
          imageUrl,
          caption,
          captionTe,
          storagePath,
          createdAt: serverTimestamp(),
        });

        alert("Photo uploaded successfully ❤️");
      }

      resetForm();
      await loadPhotos();
    } catch (error) {
      console.error(error);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function deletePhoto(photo: GalleryPhoto) {
    if (!window.confirm("Delete this photo?")) return;

    try {
      if (photo.storagePath) {
        await deleteObject(ref(storage, photo.storagePath));
      }

      await deleteDoc(doc(db, "gallery", photo.id));
      await loadPhotos();

      if (editingPhoto?.id === photo.id) {
        resetForm();
      }

      alert("Photo deleted.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  }

  return (
    <CMSLayout title="📸 Gallery">
      <p style={{ color: "#ccc", marginBottom: 30 }}>
        Upload and edit bilingual Baby ఇవ్వల gallery photos.
      </p>

      <div className="glass-card admin-form-card" style={{ marginBottom: 40 }}>
        <div className="admin-form">
          {editingPhoto && (
            <div
              style={{
                padding: 16,
                borderRadius: 16,
                background: "rgba(247, 215, 116, 0.12)",
                border: "1px solid rgba(247, 215, 116, 0.25)",
                marginBottom: 24,
              }}
            >
              <strong style={{ color: "#f7d774" }}>Editing photo:</strong>{" "}
              {editingPhoto.caption || "Baby Evvala Memory"}
            </div>
          )}

          <label>{editingPhoto ? "Replace Photo" : "Choose Photo"}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {editingPhoto && !file && (
            <p style={{ color: "#ccc", marginTop: -8 }}>
              Current photo will stay unless you choose a new file.
            </p>
          )}

          <label>English Caption</label>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="20 week ultrasound, family photo, etc."
          />

          <label>Telugu Caption</label>
          <input
            value={captionTe}
            onChange={(e) => setCaptionTe(e.target.value)}
            placeholder="20 వారాల అల్ట్రాసౌండ్, కుటుంబ ఫోటో, మొదలైనవి"
          />

          <button className="primary-btn" onClick={savePhoto} disabled={saving}>
            {saving
              ? "Saving..."
              : editingPhoto
                ? "Update Photo ❤️"
                : "Upload Photo ❤️"}
          </button>

          {editingPhoto && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                marginTop: 12,
                padding: "12px 18px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,.2)",
                background: "rgba(255,255,255,.08)",
                color: "white",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
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
          <div key={photo.id} className="glass-card" style={{ overflow: "hidden" }}>
            <img
              src={photo.imageUrl}
              alt={photo.caption || "Baby Evvala Memory"}
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
              }}
            />

            <div style={{ padding: 18 }}>
              <h3>{photo.caption || "Baby Evvala Memory"}</h3>

              {photo.captionTe && (
                <p style={{ color: "#ffd6f3", lineHeight: 1.7 }}>
                  {photo.captionTe}
                </p>
              )}

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={() => startEdit(photo)}
                  style={{
                    flex: 1,
                    padding: 12,
                    borderRadius: 12,
                    border: "none",
                    background: "#f7d774",
                    color: "#111827",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => deletePhoto(photo)}
                  style={{
                    flex: 1,
                    padding: 12,
                    borderRadius: 12,
                    border: "none",
                    background: "#ff4d6d",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CMSLayout>
  );
}