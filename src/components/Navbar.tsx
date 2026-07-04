import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Heart,
  Sparkles,
  Images,
  PartyPopper,
  LockKeyhole,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();

  const links = [
    { name: t.nav.home, path: "/", icon: <Home size={20} /> },
    { name: t.nav.story, path: "/story", icon: <Heart size={20} /> },
    { name: t.nav.prediction, path: "/prediction", icon: <Sparkles size={20} /> },
    { name: t.nav.blessings, path: "/blessings", icon: <Heart size={20} /> },
    { name: t.nav.gallery, path: "/gallery", icon: <Images size={20} /> },
    { name: t.nav.reveal, path: "/reveal", icon: <PartyPopper size={20} /> },
  ];

  const drawerTagline =
    language === "te"
      ? "ప్రతి గుండె చప్పుడు ఆశతో మొదలవుతుంది."
      : "Every heartbeat begins with hope.";

  const drawerFooter =
    language === "te"
      ? "బేబీ ఇవ్వల కోసం ప్రేమతో తయారు చేయబడింది ❤️"
      : "Made with ❤️ for Baby Evvala";

  const signInLabel = language === "te" ? "సైన్ ఇన్" : "Sign In";
  const adminSignInLabel = language === "te" ? "అడ్మిన్ సైన్ ఇన్" : "Admin Sign In";

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          👶 {t.brand.babyName}
        </Link>

        <div className="desktop-links">
          {links.slice(1).map((item) => (
            <Link key={item.path} to={item.path} className="nav-link">
              {item.name}
            </Link>
          ))}

          <Link to="/admin" className="nav-link">
            {signInLabel}
          </Link>
        </div>

        <button
          className="menu-btn"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          type="button"
        >
          <Menu size={28} />
        </button>
      </nav>

      {open && (
        <>
          <div className="drawer-overlay" onClick={() => setOpen(false)} />

          <aside className="drawer">
            <div className="drawer-top">
              <div>
                <h2>👶 {t.brand.babyName}</h2>
                <p>{drawerTagline}</p>
              </div>

              <button
                className="close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                type="button"
              >
                <X size={26} />
              </button>
            </div>

            <div className="drawer-links">
              {links.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={
                    location.pathname === item.path
                      ? "drawer-link active-drawer-link"
                      : "drawer-link"
                  }
                  onClick={() => setOpen(false)}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </Link>
              ))}

              <Link
                to="/admin"
                className={
                  location.pathname.startsWith("/admin")
                    ? "drawer-link active-drawer-link"
                    : "drawer-link"
                }
                onClick={() => setOpen(false)}
              >
                <span>
                  <LockKeyhole size={20} />
                </span>
                {adminSignInLabel}
              </Link>
            </div>

            <div className="drawer-footer">{drawerFooter}</div>
          </aside>
        </>
      )}
    </>
  );
}