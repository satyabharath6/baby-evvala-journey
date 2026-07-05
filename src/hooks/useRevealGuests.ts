import { useEffect, useState } from "react";
import { subscribeToRevealGuests } from "../services/revealGuestService";
import type { RevealGuest } from "../types/revealGuest";

export function useRevealGuests() {
  const [guests, setGuests] = useState<RevealGuest[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToRevealGuests(setGuests);
    return () => unsubscribe();
  }, []);

  return guests;
}