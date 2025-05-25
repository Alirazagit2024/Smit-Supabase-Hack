import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

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
    isVisible && (
      <button
        onClick={scrollToTop}
        className="cursor-pointer fixed bottom-7 left-6 z-50 p-4 rounded-full 
bg-white/10 backdrop-blur-md 
  border border-white/30 
text-xl shadow-lg text-white
hover:bg-white/20
transition-colors duration-1000 ease-in-out"
        aria-label="Scroll to Top"
      >
        <FaArrowUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
