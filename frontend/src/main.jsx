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
    <ShopContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </ShopContextProvider>
  </StrictMode>,
);
