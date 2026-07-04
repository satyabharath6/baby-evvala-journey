import type { MediaType } from "../services/uploadService";

export type TimelineEvent = {
  id: string;

  emoji: string;
  date: string;

  title: string;
  titleTe?: string;

  location?: string;
  locationTe?: string;

  description: string;
  descriptionTe?: string;

  whyItMattered?: string;
  whyItMatteredTe?: string;

  mediaUrl?: string;
  mediaType?: MediaType | "";

  imageUrl?: string;
  storagePath?: string;

  createdAt?: unknown;
};