"use client";

import { usePathname } from "next/navigation";
import { siteNavPages } from "./site-data";

const footerPhotoLabels = {
  About: "Studio",
  Notes: "Read",
  Portfolio: "Work",
  Store: "Prep"
};

const footerActiveLabels = {
  About: "Current studio map",
  Notes: "Current writing shelf",
  Portfolio: "Current archive room",
  Store: "Current prepared store path"
};

function normalizePath(path) {
  if (!path) return "/Angels-Website";
  const cleanPath = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  return cleanPath || "/Angels-Website";
}

function isActiveRoute(pathname, href) {
  const currentPath = normalizePath(pathname);
  const targetPath = normalizePath(href);

  if (targetPath === "/Angels-Website") {
    return currentPath === "/Angels-Website";
  }

  if (targetPath === "/Angels-Website/notes") {
    return currentPath.startsWith("/Angels-Website/notes") || currentPath.startsWith("/Angels-Website/blog");
  }

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}

function getFooterInitials(title = "Room") {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

export function FooterNav() {
  const pathname = usePathname();

  return (
    <nav className="studio-footer__trail" aria-label="Footer pages">
      {siteNavPages.map((page) => {
        const active = isActiveRoute(pathname, page.href);

        return (
          <a
            href={page.href}
            key={page.href}
            className={active ? "studio-footer__trail-link studio-footer__trail-link--active" : "studio-footer__trail-link"}
            aria-current={active ? "page" : undefined}
          >
            <span className="studio-footer__trail-photo" aria-hidden="true">
              <span>{footerPhotoLabels[page.title] ?? "Room"}</span>
              <strong>{getFooterInitials(page.title)}</strong>
            </span>
            <span className="studio-footer__trail-copy">
              <span className="studio-footer__trail-title">{page.title}</span>
              {active && <span className="studio-footer__trail-state">{footerActiveLabels[page.title] ?? "Current room"}</span>}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
