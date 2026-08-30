"use client";

import { usePathname } from "next/navigation";

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

  return (
    <header className="reference-header" aria-label="Site header">
      <div className="reference-header__shell">
        <a className="reference-header__brand" href="/Angels-Website/" aria-label="Soft Strange Studio home">
          <span className="reference-header__brand-mark" aria-hidden="true" />
          <span>Soft Strange Studio</span>
        </a>
        <a className="reference-header__title" href="/Angels-Website/">Soft Strange Studio</a>
        <nav className="reference-header__nav" aria-label="Primary">
          {navItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            return (
              <a
                key={item.title}
                href={item.href}
                className={active ? "reference-header__nav-link reference-header__nav-link--active" : "reference-header__nav-link"}
                aria-current={active ? "page" : undefined}
              >
                {item.title}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export function StudioFooter() {
  const pathname = usePathname();
  const current = normalizePath(pathname).replace(/^\/Angels-Website/, "") || "/";
  if (current === "/") return null;

  return (
    <footer className="editorial-footer" id="contact">
      <div>
        <strong>Soft Strange Studio</strong>
        <span>Stories, spaces, and things with soul.</span>
      </div>
      <nav aria-label="Footer navigation">
        {navItems.slice(0, 5).map((item) => <a href={item.href} key={item.title}>{item.title}</a>)}
      </nav>
      <small>© 2026 Soft Strange Studio. All rights reserved.</small>
    </footer>
  );
}
