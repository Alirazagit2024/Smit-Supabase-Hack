import { FaSun, FaMoon } from "react-icons/fa";
import React from "react";
import { useDarkMode } from "../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="cursor-pointer text-xl transition mr-4"
    >
      {darkMode ? (
        <FaSun className="text-[#FDFDFD]" />
      ) : (
        <FaMoon className="text-[#FDFDFD]" />
      )}
    </button>
  );
}

export default ThemeToggle;
