import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, type User } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function AdminLogin() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function login() {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    } finally {
      setLoading(false);
    }
  }

  if (user === undefined) {
    return (
      <main className="page" style={{ color: "white", textAlign: "center" }}>
        <p>Loading...</p>
      </main>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <main
      className="page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 120,
        paddingBottom: 80,
      }}
    >
      <section
        className="glass-card"
        style={{
          width: "min(100%, 620px)",
          padding: 42,
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: 10 }}>👶</div>

        <p
          style={{
            color: "#f7d774",
            fontWeight: 800,
            letterSpacing: 1.5,
            marginBottom: 12,
          }}
        >
          PROJECT STARLIGHT
        </p>

        <h1
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            margin: "0 0 14px",
          }}
        >
          Baby ఇవ్వల CMS
        </h1>

        <p
          style={{
            color: "#ddd",
            lineHeight: 1.8,
            maxWidth: 460,
            margin: "0 auto 30px",
          }}
        >
          Sign in with your approved Google account to manage the journey,
          gallery, blessings, predictions, and reveal experience.
        </p>

        <button
          className="primary-btn"
          onClick={login}
          disabled={loading}
          type="button"
          style={{ width: "100%", maxWidth: 360 }}
        >
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        <p
          style={{
            color: "#aaa",
            fontSize: ".9rem",
            lineHeight: 1.7,
            marginTop: 22,
          }}
        >
          Access is limited to approved family admins only.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            marginTop: 20,
            color: "#ffd6f3",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          ← Back to Website
        </Link>
      </section>
    </main>
  );
}