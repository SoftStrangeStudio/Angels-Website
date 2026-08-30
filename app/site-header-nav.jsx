"use client";

import { usePathname } from "next/navigation";
import { siteNavPages } from "./site-data";

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

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="folder-panel" aria-label="Studio pages">
      {siteNavPages.map((page) => {
        const active = isActiveRoute(pathname, page.href);

        return (
          <details
            key={page.href}
            className={active ? "folder-panel__item folder-panel__item--active" : "folder-panel__item"}
            open={active}
          >
            <summary
              className="folder-panel__tab"
              aria-current={active ? "page" : undefined}
            >
              <span>{page.title}</span>
            </summary>
            <div className="folder-panel__foldout">
              <p className="folder-panel__eyebrow">{page.eyebrow}</p>
              <strong>{page.title}</strong>
              <p>{page.description}</p>
              <a href={page.href}>Open {page.title}</a>
            </div>
          </details>
        );
      })}
    </nav>
  );
}
