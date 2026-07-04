import { useEffect, useState } from "react";
import {
  subscribeToPublicRevealSettings,
  type PublicRevealSettings,
} from "../services/revealService";

export function useRevealSettings() {
  const [settings, setSettings] = useState<PublicRevealSettings | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPublicRevealSettings(setSettings);
    return () => unsubscribe();
  }, []);

  return { settings };
}