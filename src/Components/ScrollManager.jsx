import { useEffect } from "react";

const ScrollManager = ({ children }) => {
  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      document.body.style.pointerEvents = "none";

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        document.body.style.pointerEvents = "auto";
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return children;
};

export default ScrollManager;
