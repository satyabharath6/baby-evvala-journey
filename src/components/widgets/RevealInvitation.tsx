import { useState } from "react";
import { useRevealSettings } from "../../hooks/useRevealSettings";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  formatRevealDate,
  getGoogleCalendarUrl,
} from "../../utils/revealTime";
import "./RevealInvitation.css";

export default function RevealInvitation() {
  const { settings } = useRevealSettings();
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const revealUrl = "https://baby-evvala-journey.web.app/reveal";
  const revealDateText = formatRevealDate(settings?.revealDate, language);

  const copy = {
    en: {
      eyebrow: "🎉 FAMILY REVEAL INVITATION",
      title: "Join us for Baby ఇవ్వల Reveal",
      text:
        "Our family will come together for one beautiful moment. Open the reveal page at the time below and celebrate with us.",
      dateLabel: "Reveal Time",
      copyLink: "Copy Link",
      copied: "Copied!",
      whatsapp: "Share on WhatsApp",
      calendar: "Add to Calendar",
      note: "Tip: open the reveal page a few minutes early.",
      whatsappText: `Join us for Baby ఇవ్వల Reveal ❤️\n\nTime: ${revealDateText}\n\nOpen here: ${revealUrl}`,
      calendarTitle: "Baby Evvala Reveal",
      calendarDetails:
        "Join Baby ఇవ్వల Reveal and celebrate this special family moment.",
    },
    te: {
      eyebrow: "🎉 కుటుంబ రివీల్ ఆహ్వానం",
      title: "బేబీ ఇవ్వల రివీల్‌కు రండి",
      text:
        "మన కుటుంబం అంతా కలిసి ఒక అందమైన క్షణాన్ని పంచుకోబోతున్నాం. క్రింద ఉన్న సమయంలో రివీల్ పేజీని ఓపెన్ చేసి మాతో కలిసి జరుపుకోండి.",
      dateLabel: "రివీల్ సమయం",
      copyLink: "లింక్ కాపీ చేయండి",
      copied: "కాపీ అయింది!",
      whatsapp: "WhatsApp లో షేర్ చేయండి",
      calendar: "క్యాలెండర్‌లో జోడించండి",
      note: "సూచన: రివీల్ సమయానికి కొన్ని నిమిషాల ముందే పేజీని ఓపెన్ చేయండి.",
      whatsappText: `బేబీ ఇవ్వల రివీల్‌కు రండి ❤️\n\nసమయం: ${revealDateText}\n\nఇక్కడ ఓపెన్ చేయండి: ${revealUrl}`,
      calendarTitle: "బేబీ ఇవ్వల రివీల్",
      calendarDetails:
        "బేబీ ఇవ్వల రివీల్‌లో పాల్గొని ఈ ప్రత్యేకమైన కుటుంబ క్షణాన్ని జరుపుకోండి.",
    },
  }[language];

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    copy.whatsappText
  )}`;

  const calendarUrl =
    settings?.revealDate
      ? getGoogleCalendarUrl({
          title: copy.calendarTitle,
          details: `${copy.calendarDetails}\n\n${revealUrl}`,
          location: revealUrl,
          startDate: settings.revealDate,
        })
      : "";

  async function handleCopyLink() {
    await navigator.clipboard.writeText(revealUrl);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1800);
  }

  return (
    <section className="reveal-invitation page">
      <div className="reveal-invitation-card">
        <p className="reveal-invitation-eyebrow">{copy.eyebrow}</p>

        <h2>{copy.title}</h2>

        <p className="reveal-invitation-text">{copy.text}</p>

        <div className="reveal-time-box">
          <span>{copy.dateLabel}</span>
          <strong>{revealDateText}</strong>
        </div>

        <div className="reveal-share-actions">
          <button type="button" onClick={handleCopyLink}>
            🔗 {copied ? copy.copied : copy.copyLink}
          </button>

          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            💬 {copy.whatsapp}
          </a>

          {calendarUrl && (
            <a href={calendarUrl} target="_blank" rel="noreferrer">
              📅 {copy.calendar}
            </a>
          )}
        </div>

        <p className="reveal-invitation-note">{copy.note}</p>
      </div>
    </section>
  );
}