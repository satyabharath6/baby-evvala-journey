import { useEffect, useState } from "react";
import { getHomeLetter } from "../services/homeLetterService";
import type { HomeLetter } from "../types/homeLetter";

export function useHomeLetter() {
  const [letter, setLetter] = useState<HomeLetter | null>(null);

  useEffect(() => {
    getHomeLetter().then(setLetter);
  }, []);

  return { letter };
}