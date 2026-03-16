"use client";

import { startTransition, useCallback, useEffect, useState } from "react";

import { MoonStar, SunMedium } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "gc-theme";

function applyTheme(theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function getPreferredTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({ className }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    const fallback = stored === "dark" || stored === "light" ? stored : getPreferredTheme();
    const prefers = document.documentElement.classList.contains("dark") ? "dark" : fallback;

    applyTheme(prefers);
    startTransition(() => {
      setTheme(prefers);
      setMounted(true);
    });

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
      const next = event.matches ? "dark" : "light";
      applyTheme(next);
      startTransition(() => {
        setTheme(next);
      });
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    startTransition(() => {
      setTheme(next);
    });
    applyTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
      className={cn(
        buttonVariants({ variant: "secondary", size: "icon" }),
        "button-glow-accent h-11 w-11 rounded-full border border-border/70 bg-background shadow-md transition-all duration-300 hover:border-(--accent-color) hover:text-(--accent-color) focus-visible:ring-2",
        "dark:bg-card dark:text-foreground",
        className
      )}
      onClick={toggleTheme}
    >
      {theme === "dark" ? <SunMedium className="icon-hover-rotate h-5 w-5" /> : <MoonStar className="icon-hover-rotate h-5 w-5" />}
    </button>
  );
}
