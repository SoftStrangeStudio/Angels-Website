"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import StudioWordmark from "./studio-wordmark";

const navItems = [
  { title: "Home", href: "/Angels-Website/" },
  { title: "Studio Notes", href: "/Angels-Website/notes/" },
  { title: "Art", href: "/Angels-Website/portfolio/" },
  { title: "Shop", href: "/Angels-Website/store/" },
  { title: "About", href: "/Angels-Website/about/" },
  { title: "Contact", href: "#contact" }
];

function normalizePath(path) {
  if (!path) return "/";
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

function isActiveRoute(pathname, href) {
  if (href.startsWith("#")) return false;

  const current = normalizePath(pathname).replace(/^\/Angels-Website/, "") || "/";
  const target = normalizePath(href).replace(/^\/Angels-Website/, "") || "/";

  if (target === "/notes") {
    return current.startsWith("/notes") || current.startsWith("/blog");
  }

  return target === "/" ? current === "/" : current.startsWith(target);
}

export function SiteHeader() {
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  const closeMobileMenu = () => {
    if (mobileMenuRef.current) mobileMenuRef.current.open = false;
  };
  const navigationLinks = (mobile = false) => navItems.map((item) => {
    const active = isActiveRoute(pathname, item.href);
    const linkClass = mobile ? "reference-header__mobile-link" : "reference-header__nav-link";
    return (
      <a
        key={item.title}
        href={item.href}
        className={active ? `${linkClass} ${linkClass}--active` : linkClass}
        aria-current={active ? "page" : undefined}
        onClick={mobile ? closeMobileMenu : undefined}
      >
        {item.title}
      </a>
    );
  });

  return (
    <header className="reference-header" aria-label="Site header">
      <div className="reference-header__shell">
        <a className="reference-header__title" href="/Angels-Website/" aria-label="Soft Strange Studio home"><StudioWordmark /></a>
        <nav className="reference-header__nav" aria-label="Primary">
          {navigationLinks()}
        </nav>
        <details
          ref={mobileMenuRef}
          className="reference-header__mobile-menu"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeMobileMenu();
              mobileMenuRef.current?.querySelector("summary")?.focus();
            }
          }}
        >
          <summary>Menu</summary>
          <nav aria-label="Mobile primary">{navigationLinks(true)}</nav>
        </details>
      </div>
    </header>
  );
}

export function StudioFooter() {
  const [atBottom, setAtBottom] = useState(false);
  const footerRef = useRef(null);
  const dockRef = useRef(null);

  useEffect(() => {
    const updateVisibility = () => {
      // Reserve exactly the real footer height so the last content stays reachable.
      const height = `${footerRef.current?.offsetHeight || 0}px`;
      if (dockRef.current && dockRef.current.style.height !== height) dockRef.current.style.height = height;
      const remaining = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      setAtBottom(window.scrollY > 0 && remaining <= 2);
    };
    const observer = new ResizeObserver(updateVisibility);
    observer.observe(document.body);
    if (footerRef.current) observer.observe(footerRef.current);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });
    updateVisibility();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div ref={dockRef} className="editorial-footer-dock" id="contact" data-footer-visible={atBottom}>
      <footer ref={footerRef} className="editorial-footer" inert={!atBottom}>
        <div>
          <a className="editorial-footer__brand" href="/Angels-Website/" aria-label="Soft Strange Studio home"><StudioWordmark /></a>
          <span>Stories, spaces, and things with soul.</span>
        </div>
        <nav aria-label="Footer navigation">
          {navItems.slice(0, 5).map((item) => <a href={item.href} key={item.title}>{item.title}</a>)}
        </nav>
        <small>© 2026 Soft Strange Studio. All rights reserved.</small>
      </footer>
    </div>
  );
}
