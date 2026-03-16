import Script from "next/script";
import { Inter, Inter_Tight, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

export const metadata = {
  title: { default: "Global Climat — Actualité du changement climatique et réchauffement climatique", template: "%s | Global Climat" },
  description:
    "Actualités du changement climatique et du réchauffement climatique. Articles, analyses et données scientifiques issues de Nature, Science, NOAA et NASA. Depuis 2013.",
  metadataBase: new URL("https://global-climat.com"),
  keywords: ["changement climatique", "réchauffement climatique", "actualité climat", "climat", "nouvelles climat", "science du climat", "GIEC", "température mondiale"],
  openGraph: { siteName: "Global Climat", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image" },
};

const themeInitializer = `
(() => {
  const className = "dark";
  const storageKey = "gc-theme";
  if (typeof window === "undefined") return;
  try {
    const stored = window.localStorage.getItem(storageKey);
    let shouldUseDark = true;
    if (stored === "light") {
      shouldUseDark = false;
    } else if (stored === "dark") {
      shouldUseDark = true;
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      shouldUseDark = prefersDark || true;
    }
    if (shouldUseDark) {
      document.documentElement.classList.add(className);
    } else {
      document.documentElement.classList.remove(className);
    }
  } catch (_error) {
    // Ignore errors during hydration
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <Script id="theme-initializer" strategy="beforeInteractive">
          {themeInitializer}
        </Script>
      </head>
      <body className={`${inter.variable} ${interTight.variable} ${display.variable} antialiased`}>
        <div className="relative min-h-screen bg-background transition-colors">
          <div className="theme-glow" aria-hidden />
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
