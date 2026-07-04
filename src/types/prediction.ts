export type Prediction = {
  id: string;
  gender: "Boy" | "Girl";
  name: string;
  relationship: string;
  city: string;
  birthDate?: string;
  babyName?: string;
  message?: string;
  submittedAt?: unknown;
};