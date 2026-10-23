"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the mobile menu whenever the route changes.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The original CSS drives the mobile menu from a class on <body>.
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href: string) =>
    [
      isActive(href) ? "active" : "",
      href === "/contact" ? "nav-cta" : "",
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const renderNavigationLinks = () =>
    nav.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className={linkClass(item.href)}
        aria-current={isActive(item.href) ? "page" : undefined}
      >
        {item.label}
      </Link>
    ));

  return (
    <>
      <header className={scrolled ? "hdr scrolled" : "hdr"}>
        <div
          className="wrap"
          style={{
            backdropFilter: "saturate(1.45) blur(18px)",
            WebkitBackdropFilter: "saturate(1.45) blur(18px)",
          }}
        >
          <Link href="/" className="logo" aria-label="BrandSparkX home">
            <Image src="/brand/brand-logo.webp" alt="BrandSparkX" width={201} height={28} priority style={{ width: 'auto', height: 'auto' }} />
          </Link>
          <nav className="nav" aria-label="Primary">
            {renderNavigationLinks()}
          </nav>
          <button
            type="button"
            className="burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mnav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
          </button>
        </div>
      </header>
      <nav className="mnav" id="mnav" aria-label="Mobile">
        {renderNavigationLinks()}
      </nav>
    </>
  );
}
