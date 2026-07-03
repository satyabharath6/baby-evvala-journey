import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminGallery from "./pages/AdminGallery";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Prediction from "./pages/Prediction";
import Reveal from "./pages/Reveal";
import Blessings from "./pages/Blessings";
import Gallery from "./pages/Gallery";
import AdminPredictions from "./pages/AdminPredictions";
import Stars from "./components/Stars";
import AdminBlessings from "./pages/AdminBlessings";
import AdminTimeline from "./pages/AdminTimeline";
export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top,#3b1d5c,#10172e,#050816)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Stars />
        <Navbar />

        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route
  path="/admin/predictions"
  element={<AdminPredictions />}
/>
          <Route path="/" element={<Home />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/timeline" element={<AdminTimeline />} />
          <Route path="/admin/blessings" element={<AdminBlessings />} />
          <Route path="/story" element={<Story />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/blessings" element={<Blessings />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reveal" element={<Reveal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
