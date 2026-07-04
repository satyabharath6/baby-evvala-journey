import { useMemo } from "react";
import { useBlessings } from "./useBlessings";

export function useRandomBlessing() {
  const { blessings } = useBlessings();

  const randomBlessing = useMemo(() => {
    if (blessings.length === 0) return null;

    const index = Math.floor(Math.random() * blessings.length);
    return blessings[index];
  }, [blessings]);

  return {
    randomBlessing,
    totalBlessings: blessings.length,
  };
}