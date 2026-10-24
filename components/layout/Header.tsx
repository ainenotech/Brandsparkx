"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { FocusEvent, PointerEvent } from "react";
import { Icon } from "@/components/Icon";
import { nav, site } from "@/content/site";

const CTA_HREF = "/contact";
const primaryLinks = nav.filter((item) => item.href !== CTA_HREF);
const ctaLink = nav.find((item) => item.href === CTA_HREF);

type Box = { x: number; w: number };

/**
 * Moves a nav marker (hover pill or active dot) onto a box. It glides when it is already
 * showing and snaps into place when it first appears, so it never sweeps in from the left edge.
 */
function moveMarker(marker: HTMLElement, box: Box | null, animate: boolean) {
  if (!box) {
    delete marker.dataset.on;
    return;
  }
  const glide = animate && marker.dataset.on !== undefined;
  if (!glide) delete marker.dataset.glide;
  marker.style.setProperty("--x", `${box.x}px`);
  marker.style.setProperty("--w", `${box.w}px`);
  if (!glide) {
    void marker.offsetWidth; // commit the snapped position before turning the glide back on
    marker.dataset.glide = "";
  }
  marker.dataset.on = "";
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const linksRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef<HTMLSpanElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu whenever the route changes.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  // Scroll only switches on the compact "scrolled" look; the header stays pinned throughout.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 10);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // The active dot sits centred under the current page's link and glides across on navigation.
  const syncActiveDot = useCallback((animate: boolean) => {
    const links = linksRef.current;
    const dot = activeRef.current;
    if (!links || !dot) return;
    const link = links.querySelector<HTMLElement>('a[aria-current="page"]');
    moveMarker(dot, link ? { x: link.offsetLeft + link.offsetWidth / 2, w: 0 } : null, animate);
  }, []);

  useLayoutEffect(() => {
    syncActiveDot(true);
  }, [pathname, syncActiveDot]);

  // Re-measure without animating when the nav reflows (resize, web fonts swapping in).
  useEffect(() => {
    const links = linksRef.current;
    if (!links || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => syncActiveDot(false));
    observer.observe(links);
    document.fonts?.ready.then(() => syncActiveDot(false));
    return () => observer.disconnect();
  }, [syncActiveDot]);

  const showPill = (e: PointerEvent<HTMLAnchorElement> | FocusEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    if (pillRef.current) {
      moveMarker(pillRef.current, { x: link.offsetLeft, w: link.offsetWidth }, true);
    }
  };
  const hidePill = () => {
    if (pillRef.current) delete pillRef.current.dataset.on;
  };

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
    const onPointer = (e: globalThis.PointerEvent) => {
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

  return (
    <>
      <header className={scrolled ? "hdr scrolled" : "hdr"}>
        <div className="wrap">
          <Link href="/" className="logo" aria-label="BrandSparkX home">
            <Image
              src="/brand/brand-logo.webp"
              alt="BrandSparkX"
              width={201}
              height={28}
              loading="eager"
              fetchPriority="high"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          <nav className="nav" aria-label="Primary">
            <div
              ref={linksRef}
              className="nav-links"
              onPointerLeave={hidePill}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hidePill();
              }}
            >
              <span ref={activeRef} className="nav-active" aria-hidden="true" />
              <span ref={pillRef} className="nav-pill" aria-hidden="true" />
              {primaryLinks.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive(item.href) ? "active" : undefined}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  style={{ ["--i" as string]: i }}
                  onPointerEnter={showPill}
                  onFocus={showPill}
                >
                  <span className="nav-label">
                    <span className="nav-roll" data-text={item.label}>
                      {item.label}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
            {ctaLink && (
              <Link
                href={ctaLink.href}
                className={isActive(ctaLink.href) ? "hdr-cta active" : "hdr-cta"}
                aria-current={isActive(ctaLink.href) ? "page" : undefined}
                style={{ ["--i" as string]: primaryLinks.length }}
              >
                <span className="hdr-cta-label">{ctaLink.label}</span>
                <span className="hdr-cta-icon">
                  <Icon name="i-arrow" />
                  <Icon name="i-arrow" />
                </span>
              </Link>
            )}
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
      <div className="mnav" id="mnav" ref={menuRef}>
        <nav aria-label="Mobile">
          {primaryLinks.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
              style={{ ["--i" as string]: i }}
            >
              <span className="mnav-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mnav-label">{item.label}</span>
              <Icon name="i-arrow" className="mnav-arrow" />
            </Link>
          ))}
          {ctaLink && (
            <Link
              href={ctaLink.href}
              className={isActive(ctaLink.href) ? "nav-cta active" : "nav-cta"}
              aria-current={isActive(ctaLink.href) ? "page" : undefined}
              style={{ ["--i" as string]: primaryLinks.length }}
            >
              {ctaLink.label}
              <Icon name="i-arrow" />
            </Link>
          )}
        </nav>
        <div className="mnav-foot" style={{ ["--i" as string]: primaryLinks.length + 1 }}>
          <a href={`mailto:${site.email}`}>
            <Icon name="i-mail" />
            {site.email}
          </a>
          <a href={site.phoneHref}>
            <Icon name="i-phone" />
            {site.phone}
          </a>
        </div>
      </div>
    </>
  );
}
