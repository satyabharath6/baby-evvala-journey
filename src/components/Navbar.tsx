import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home, Heart, Sparkles, Images, PartyPopper } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Story", path: "/story", icon: <Heart size={20} /> },
    { name: "Prediction", path: "/prediction", icon: <Sparkles size={20} /> },
    { name: "Blessings", path: "/blessings", icon: <Heart size={20} /> },
    { name: "Gallery", path: "/gallery", icon: <Images size={20} /> },
    { name: "Reveal", path: "/reveal", icon: <PartyPopper size={20} /> },
  ];

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          👶 Baby Evvala
        </Link>

        <div className="desktop-links">
          {links.slice(1).map((item) => (
            <Link key={item.path} to={item.path} className="nav-link">
              {item.name}
            </Link>
          ))}
        </div>

        <button className="menu-btn" onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

      {open && (
        <>
          <div className="drawer-overlay" onClick={() => setOpen(false)} />

          <aside className="drawer">
            <div className="drawer-top">
              <div>
                <h2>👶 Baby Evvala</h2>
                <p>Every heartbeat begins with hope.</p>
              </div>

              <button className="close-btn" onClick={() => setOpen(false)}>
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
            </div>

            <div className="drawer-footer">
              Made with ❤️ for Baby Evvala
            </div>
          </aside>
        </>
      )}
    </>
  );
}