import { useEffect, useMemo, useState } from "react";
import { subscribeToPredictions } from "../services/predictionService";
import type { Prediction } from "../types/prediction";

export function usePredictionStats() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToPredictions(setPredictions);
    return () => unsubscribe();
  }, []);

  const stats = useMemo(() => {
    const total = predictions.length;

    const boys = predictions.filter(
      (p) => p.gender === "Boy"
    ).length;

    const girls = predictions.filter(
      (p) => p.gender === "Girl"
    ).length;

    return {
      total,
      boys,
      girls,
      boyPercent: total ? Math.round((boys / total) * 100) : 0,
      girlPercent: total ? Math.round((girls / total) * 100) : 0,
    };
  }, [predictions]);

  return stats;
}