import { NavLink, Link } from "react-router-dom";

export default function CMSSidebar() {
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

        <div className="cms-user">
          <div className="cms-user-avatar">S</div>
          <div>
            <strong>Satya</strong>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}