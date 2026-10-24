"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

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

  // The original CSS drives the mobile menu (and the scroll lock) from a class on <body>.
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return;
    const burger = burgerRef.current;
    const menu = menuRef.current;
    menu?.querySelector("a")?.focus({ preventScroll: true });
    const close = () => setMenuOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    // A tap outside both the menu and the burger closes it.
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!menu?.contains(target) && !burger?.contains(target)) close();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      // Hand focus back to the burger if it was inside the closing menu.
      if (menu?.contains(document.activeElement)) burger?.focus({ preventScroll: true });
    };
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
            <Image src="/brand/brand-logo.webp" alt="BrandSparkX" width={201} height={28} loading="eager" fetchPriority="high" style={{ width: 'auto', height: 'auto' }} />
          </Link>
          <nav className="nav" aria-label="Primary">
            {renderNavigationLinks()}
          </nav>
          <button
            ref={burgerRef}
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
      <nav className="mnav" id="mnav" aria-label="Mobile" ref={menuRef}>
        {renderNavigationLinks()}
      </nav>
    </>
  );
}
