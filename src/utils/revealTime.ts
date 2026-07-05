export function toDateTimeLocalValue(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(date.getTime() - offsetMs);

  return localDate.toISOString().slice(0, 16);
}

export function toStoredRevealDate(value: string) {
  return new Date(value).toISOString();
}

export function formatRevealDate(value?: string, language: "en" | "te" = "en") {
  if (!value) return language === "te" ? "త్వరలో ప్రకటిస్తాము" : "Coming soon";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return language === "te" ? "త్వరలో ప్రకటిస్తాము" : "Coming soon";
  }

  return new Intl.DateTimeFormat(language === "te" ? "te-IN" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function getGoogleCalendarUrl({
  title,
  details,
  location,
  startDate,
}: {
  title: string;
  details: string;
  location: string;
  startDate: string;
}) {
  const start = new Date(startDate);
  const end = new Date(start.getTime() + 30 * 60 * 1000);

  const formatForGoogle = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details,
    location,
    dates: `${formatForGoogle(start)}/${formatForGoogle(end)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}