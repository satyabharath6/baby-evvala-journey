import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { LanguageProvider } from "./i18n/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import { auth } from "./firebase";
import AdminReveal from "./pages/AdminReveal";
import Navbar from "./components/Navbar";
import Stars from "./components/Stars";

import Home from "./pages/Home";
import Story from "./pages/Story";
import Prediction from "./pages/Prediction";
import Blessings from "./pages/Blessings";
import Gallery from "./pages/Gallery";
import Reveal from "./pages/Reveal";

import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminGallery from "./pages/AdminGallery";
import AdminPredictions from "./pages/AdminPredictions";
import AdminBlessings from "./pages/AdminBlessings";
import AdminTimeline from "./pages/AdminTimeline";
import AdminHomeLetter from "./pages/AdminHomeLetter";
const allowedEmails = [
  "satyabharath6@gmail.com",
  "honeysrievvala@gmail.com",
  "satyaevvala2023@u.northwestern.edu",
];

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return (
      <p style={{ color: "white", marginTop: 150, textAlign: "center" }}>
        Loading...
      </p>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!allowedEmails.includes(user.email || "")) {
    return (
      <main style={{ color: "white", textAlign: "center", marginTop: 150 }}>
        <h1>⛔ Access Denied</h1>
        <p>You are not authorized to access this admin dashboard.</p>
      </main>
    );
  }

  return <>{children}</>;
}
function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top,#3b1d5c,#10172e,#050816)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {!isAdminRoute && <Stars />}
      {!isAdminRoute && <Navbar />}
{!isAdminRoute && <LanguageToggle />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/blessings" element={<Blessings />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reveal" element={<Reveal />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<ProtectedAdmin><Admin /></ProtectedAdmin>} />
        <Route path="/admin/home-letter" element={<ProtectedAdmin><AdminHomeLetter /></ProtectedAdmin>} />
        <Route path="/admin/reveal" element={<ProtectedAdmin><AdminReveal /></ProtectedAdmin>} />
        <Route path="/admin/predictions" element={<ProtectedAdmin><AdminPredictions /></ProtectedAdmin>} />
        <Route path="/admin/gallery" element={<ProtectedAdmin><AdminGallery /></ProtectedAdmin>} />
        <Route path="/admin/timeline" element={<ProtectedAdmin><AdminTimeline /></ProtectedAdmin>} />
        <Route path="/admin/blessings" element={<ProtectedAdmin><AdminBlessings /></ProtectedAdmin>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </LanguageProvider>
  );
}