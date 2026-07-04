import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../../firebase";

export default function CMSSidebar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const displayName = user?.displayName || getNameFromEmail(user?.email || "");
  const email = user?.email || "Admin";
  const avatar = getAvatar(displayName, email);

  async function handleLogout() {
    await signOut(auth);
    navigate("/admin/login");
  }

  return (
    <aside className="cms-sidebar">
      <div className="cms-brand">
        <div className="cms-logo">👶</div>
        <div>
          <h2>Baby ఇవ్వల CMS</h2>
          <p>Project Starlight</p>
        </div>
      </div>

      <nav className="cms-nav">
        <NavLink to="/admin">🏠 Dashboard</NavLink>

        <p className="cms-nav-label">Pregnancy</p>
        <NavLink to="/admin/home-letter">📝 Home Letter</NavLink>
        <NavLink to="/admin/timeline">📖 Journey</NavLink>
        <NavLink to="/admin/gallery">📸 Gallery</NavLink>

        <p className="cms-nav-label">Family</p>
        <NavLink to="/admin/blessings">❤️ Blessings</NavLink>
        <NavLink to="/admin/predictions">🔮 Predictions</NavLink>

        <p className="cms-nav-label">Reveal</p>
        <NavLink to="/admin/reveal">🎉 Reveal</NavLink>
      </nav>

      <div className="cms-sidebar-footer">
        <Link to="/" className="cms-view-site">
          🌍 View Website
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="cms-view-site"
          style={{
            width: "100%",
            border: "none",
            cursor: "pointer",
            marginTop: 10,
          }}
        >
          🚪 Sign Out
        </button>

        <div className="cms-user">
          <div className="cms-user-avatar">{avatar}</div>
          <div>
            <strong>{displayName || "Admin"}</strong>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function getNameFromEmail(email: string) {
  if (!email) return "Admin";

  const namePart = email.split("@")[0];

  return namePart
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getAvatar(displayName: string, email: string) {
  const source = displayName || email || "A";
  return source.charAt(0).toUpperCase();
}