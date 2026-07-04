import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import type { Prediction } from "../types/prediction";

export function subscribeToPredictions(
  callback: (predictions: Prediction[]) => void
) {
  return onSnapshot(collection(db, "predictions"), (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Prediction, "id">),
      }))
    );
  });
}