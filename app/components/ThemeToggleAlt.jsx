"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ThemeToggleAlt() {
  const [isDark, setIsDark] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-16 h-full"
      aria-label="Toggle theme"
    >
      <Image
        src="/logomat.png"
        alt="Theme toggle"
        width={40}
        height={40}
        className="object-contain transition-opacity hover:opacity-80"
      />
    </button>
  );
}
