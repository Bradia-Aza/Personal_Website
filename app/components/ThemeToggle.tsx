"use client";

import { useSyncExternalStore } from "react";

// Manual light/dark switch for Night Reading (see globals.css). The initial
// theme is set on <html> by the inline script in layout.tsx before first
// paint; the DOM attribute is the single source of truth, and this component
// just mirrors it. useSyncExternalStore renders the server's "light" during
// hydration and then re-syncs, so the client never disagrees with the server
// HTML — a mismatch there makes React re-render the root and drop the
// data-theme attribute, which left the button out of step with the page.
type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "light");

  function toggle() {
    // Read the DOM, not React state, so a click always flips what's on screen.
    const next = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for the session.
    }
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
