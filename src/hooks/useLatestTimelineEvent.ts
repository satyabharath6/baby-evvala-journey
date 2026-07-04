import { useEffect, useState } from "react";
import { subscribeToLatestTimelineEvent } from "../services/timelineService";
import type { TimelineEvent } from "../types/timeline";

export function useLatestTimelineEvent() {
  const [event, setEvent] = useState<TimelineEvent | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToLatestTimelineEvent(setEvent);
    return () => unsubscribe();
  }, []);

  return { event };
}