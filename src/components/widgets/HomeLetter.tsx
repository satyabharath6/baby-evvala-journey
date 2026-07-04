import { useHomeLetter } from "../../hooks/useHomeLetter";
import { useLanguage } from "../../i18n/LanguageContext";
import "./HomeLetter.css";

export default function HomeLetter() {
  const { letter, loading } = useHomeLetter();
  const { language } = useLanguage();

  if (loading) return null;
  if (!letter) return null;

  const title = language === "te" ? letter.titleTe || letter.title : letter.title;
  const body = language === "te" ? letter.bodyTe || letter.body : letter.body;
  const signature =
    language === "te" ? letter.signatureTe || letter.signature : letter.signature;

  return (
    <section className="section-shell home-letter-section">
      <div className="elevated-card home-letter-card">
        <p className="section-kicker">
          {language === "te" ? "మా బేబీకి" : "For Our Baby"}
        </p>

        <h2 className="section-heading">{title}</h2>

        <p className="home-letter-body">{body}</p>

        <p className="home-letter-signature">{signature}</p>
      </div>
    </section>
  );
}