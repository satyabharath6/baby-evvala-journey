import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function AdminLogin() {
  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
  };

  return (
    <main
      style={{
        maxWidth: 600,
        margin: "150px auto",
        padding: 30,
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>🔒 Admin Login</h1>
      <p style={{ color: "#ccc", marginBottom: 30 }}>
        Sign in to manage Baby Evvala Journey.
      </p>

      <button className="submit-btn" onClick={login}>
        Continue with Google
      </button>
    </main>
  );
}