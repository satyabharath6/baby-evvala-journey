import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Story from "./pages/Story";
import Prediction from "./pages/Prediction";
import Reveal from "./pages/Reveal";
import Blessings from "./pages/Blessings";
import Gallery from "./pages/Gallery";

import Stars from "./components/Stars";

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
          <Route path="/" element={<Home />} />
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
