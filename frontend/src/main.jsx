import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ShopContextProvider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </ShopContextProvider>
    </HelmetProvider>
  </StrictMode>,
);

// Signal to vite-plugin-prerender that the app has mounted and is ready
// to be snapshotted. This event is only relevant during the prerender build.
document.dispatchEvent(new Event('render-event'));

