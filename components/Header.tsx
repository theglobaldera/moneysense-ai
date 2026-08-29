"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircleHeart } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "@/lib/navLinks";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-forest-100 bg-cream-50/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(link.href)
                  ? "bg-forest-100 text-forest-700"
                  : "text-charcoal-700 hover:bg-forest-50 hover:text-forest-700"
              }`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/ask" className="btn-primary">
            <MessageCircleHeart size={18} />
            Ask MoneySense
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal-900 hover:bg-forest-50 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-forest-100 bg-cream-50 px-4 pb-4 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium ${
                    isActive(link.href)
                      ? "bg-forest-100 text-forest-700"
                      : "text-charcoal-700 hover:bg-forest-50"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-charcoal-700 hover:bg-forest-50"
              >
                About / Safety
              </Link>
            </li>
          </ul>
          <Link href="/ask" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
            <MessageCircleHeart size={18} />
            Ask MoneySense
          </Link>
        </nav>
      )}
    </header>
  );
}
