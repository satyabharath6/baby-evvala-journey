import { useEffect, useState } from "react";
import { getHomeLetter } from "../services/homeLetterService";
import type { HomeLetter } from "../types/homeLetter";

export function useHomeLetter() {
  const [letter, setLetter] = useState<HomeLetter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomeLetter()
      .then(setLetter)
      .finally(() => setLoading(false));
  }, []);

  return { letter, loading };
}