import { useEffect, useState } from "react";
import { subscribeToRevealSettings } from "../services/revealService";
import type { RevealSettings } from "../types/reveal";

export function useRevealSettings() {
  const [settings, setSettings] = useState<RevealSettings | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToRevealSettings(setSettings);
    return () => unsubscribe();
  }, []);

  return { settings };
}