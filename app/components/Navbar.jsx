"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-sm">
      <div className="flex h-20 items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-xl font-medium tracking-tighter">
            GLOBAL <span className="text-cyan-600 dark:text-cyan-600">CLIMAT</span>
          </Link>
          <div className="hidden gap-8 text-[11px] font-medium uppercase tracking-[0.2em] lg:flex text-gray-600 dark:text-neutral-400">
            <Link href="/#articles" className="hover:opacity-70 transition-opacity">Articles</Link>
            <Link href="/a-propos" className="hover:opacity-70 transition-opacity">À Propos</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="mailto:globalclimat@proton.me"
            className="hidden text-[11px] font-medium uppercase tracking-[0.2em] lg:block text-gray-600 dark:text-neutral-400 hover:opacity-70 transition-opacity"
          >
            Contact
          </a>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-1 text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-sm px-6 pb-6 pt-4 space-y-4">
          <Link href="/#articles" onClick={() => setOpen(false)} className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-neutral-400 hover:opacity-70 transition-opacity">
            Articles
          </Link>
          <Link href="/a-propos" onClick={() => setOpen(false)} className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-neutral-400 hover:opacity-70 transition-opacity">
            À Propos
          </Link>
          <a
            href="mailto:globalclimat@proton.me"
            className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-neutral-400 hover:opacity-70 transition-opacity"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
