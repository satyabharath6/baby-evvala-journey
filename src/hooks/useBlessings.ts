import { useEffect, useState } from "react";
import { subscribeToBlessings } from "../services/blessingService";
import type { Blessing } from "../types/blessing";

export function useBlessings() {
  const [blessings, setBlessings] = useState<Blessing[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToBlessings(setBlessings);
    return () => unsubscribe();
  }, []);

  return { blessings };
}