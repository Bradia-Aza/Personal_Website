import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

// Root metadata (Phase 4). Each route overrides `title` (filled into this
// template) and `description`; this is only the fallback for routes that
// don't set their own. Copy is grounded in content/identity.md's positioning
// statement, itself sourced from BACKGROUND.md — no invented taglines.
export const metadata: Metadata = {
  title: {
    default: "Bardia Azami",
    template: "%s — Bardia Azami",
  },
  description:
    "Bardia Azami is a Machine Learning Engineer building end-to-end AI solutions — generative-AI agents, predictive models, and production ML pipelines.",
};

// Design system locked in Phase 1.3 ("Quiet Manuscript", see globals.css).
// Georgia and the system sans stack are both system fonts, so no next/font
// wiring is needed — the family choices live entirely in globals.css.
// Header and footer render on every route from here, per REPORT.md's
// site-wide nav/CV-button/contact-footer structure.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
