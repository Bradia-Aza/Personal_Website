"use client";

import { useState } from "react";

// Manual light/dark switch for Night Reading (see globals.css). The initial
// theme itself is set synchronously by the inline script in layout.tsx to
// avoid a flash; this component reads that same DOM state synchronously via
// the useState initializer (not an effect) so the button's own label doesn't
// briefly show the wrong state on a dark-themed load, before React re-runs
// this initializer during hydration.
function readInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(readInitialTheme);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        color: "var(--ink)",
        background: "transparent",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--button-padding)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-label)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
