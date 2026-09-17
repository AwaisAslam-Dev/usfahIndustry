import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Force scroll to top on path or search param change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  // Handle scroll visibility for floating button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-linear-to-r from-[#D4AF37] to-[#C9A227] text-black shadow-2xl hover:scale-110 transition-all duration-300 border border-[#D4AF37]/50"
        >
          <ArrowUp size={22} className="stroke-[2.5]" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;