import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/globals.css";
import "./styles/animations.css";
import "./styles/components.css";
import "./responsive.css";
import "./index.css";
import "./styles/admin-forms.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);