import { useLanguage } from "../i18n/LanguageContext";
import "./LanguageToggle.css";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <button
      className="language-toggle"
      onClick={() => setLanguage(language === "en" ? "te" : "en")}
      aria-label={t.common.switchLanguage}
      type="button"
    >
      {language === "en" ? "తెలుగు" : "English"}
    </button>
  );
}