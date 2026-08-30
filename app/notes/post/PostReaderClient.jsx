"use client";

import { useEffect, useMemo, useState } from "react";
import { EditorialNext, editorialImages } from "../../editorial-page";
import { PAGES_BASE, RAW_BASE } from "../../site-data";

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderListBlock(block) {
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  const isOrdered = lines.every((line) => /^\d+\.\s+/.test(line));
  const isUnordered = lines.every((line) => /^[-*]\s+/.test(line));
  if (!isOrdered && !isUnordered) return null;

  const tag = isOrdered ? "ol" : "ul";
  const itemPattern = isOrdered ? /^\d+\.\s+/ : /^[-*]\s+/;
  const items = lines
    .map((line) => line.replace(itemPattern, "").trim())
    .filter(Boolean)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  return `<${tag}>${items}</${tag}>`;
}

function renderQuoteBlock(block) {
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0 || !lines.every((line) => /^>\s?/.test(line))) return null;
  const quote = lines.map((line) => escapeHtml(line.replace(/^>\s?/, ""))).join("<br />");
  return `<blockquote>${quote}</blockquote>`;
}

function renderCodeBlock(block) {
  if (!block.startsWith("```")) return null;
  const lines = block.split("\n");
  const language = (lines.shift() || "").replace(/^```/, "").trim();
  if (lines.at(-1)?.trim() === "```") lines.pop();
  const label = language ? `<span class="reader-code-label">${escapeHtml(language)}</span>` : "";
  return `<pre>${label}<code>${escapeHtml(lines.join("\n"))}</code></pre>`;
}

function markdownToHtml(markdown) {
  return markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("### ")) return `<h3>${escapeHtml(block.slice(4))}</h3>`;
      if (block.startsWith("## ")) return `<h2>${escapeHtml(block.slice(3))}</h2>`;
      if (block.startsWith("# ")) return `<h2>${escapeHtml(block.slice(2))}</h2>`;
      return renderCodeBlock(block)
        || renderQuoteBlock(block)
        || renderListBlock(block)
        || `<p>${escapeHtml(block).replaceAll("\n", "<br />")}</p>`;
    })
    .join("");
}

async function fetchTextWithFallback(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok) return response.text();
    } catch {}
  }
  throw new Error("This public note could not be loaded right now.");
}

async function fetchJsonWithFallback(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok) return response.json();
    } catch {}
  }
  throw new Error("This public note profile could not be loaded right now.");
}

export default function PostReaderClient({
  backHref = "/Angels-Website/notes/",
  backLabel = "Back to Studio Notes",
  contextLabel = "Studio Notes"
}) {
  const [state, setState] = useState({ status: "loading", slug: "", profile: null, markdown: "", error: null });

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("slug");
    if (!slug) {
      setState({ status: "missing", slug: "", profile: null, markdown: "", error: "Choose a note from the public notes shelf to open it here." });
      return;
    }

    let active = true;
    const localPreview = window.location.hostname === "localhost";
    const profileUrls = localPreview
      ? [`${RAW_BASE}/posts/${slug}/profile.json`, `${PAGES_BASE}/posts/${slug}/profile.json`]
      : [`${PAGES_BASE}/posts/${slug}/profile.json`, `${RAW_BASE}/posts/${slug}/profile.json`];
    const contentUrls = localPreview
      ? [`${RAW_BASE}/posts/${slug}/content.md`, `${PAGES_BASE}/posts/${slug}/content.md`]
      : [`${PAGES_BASE}/posts/${slug}/content.md`, `${RAW_BASE}/posts/${slug}/content.md`];

    Promise.all([
      fetchJsonWithFallback(profileUrls),
      fetchTextWithFallback(contentUrls)
    ])
      .then(([profile, markdown]) => {
        if (profile.status && profile.status !== "published") throw new Error("This note is not public yet.");
        if (active) setState({ status: "ready", slug, profile, markdown, error: null });
      })
      .catch((error) => {
        if (active) setState({ status: "error", slug, profile: null, markdown: "", error: error.message });
      });

    return () => { active = false; };
  }, []);

  const html = useMemo(() => markdownToHtml(state.markdown), [state.markdown]);
  const title = state.profile?.title || (state.status === "loading" ? "Opening the note..." : "The note shelf is quiet");
  const intro = state.profile?.subtitle || state.profile?.excerpt || "A public note from the Soft Strange Studio reading table.";

  return (
    <main id="top" className="editorial-page editorial-reader-page">
      <section className="editorial-hero" aria-labelledby="reader-title">
        <div className="editorial-hero__copy">
          <p className="paper-label">{contextLabel}</p>
          <h1 id="reader-title">{title}</h1>
          <p>{intro}</p>
          <a className="paper-button" href={backHref}>← {backLabel}</a>
        </div>
        <figure className="editorial-photo editorial-photo--hero">
          <span className="paper-tape" aria-hidden="true" />
          <img src={editorialImages.notes} alt="An illustrated open studio journal beside a warm mug" />
        </figure>
      </section>

      <div className="editorial-page__stack">
        <section className="reader-paper" aria-live="polite">
          {state.status === "loading" && <div className="editorial-state"><span className="paper-label">Gathering</span><p>Placing the public note on the reading table...</p></div>}
          {state.status === "missing" && <div className="editorial-state"><span className="paper-label">Choose a note</span><p>{state.error}</p></div>}
          {state.status === "error" && <div className="editorial-state editorial-state--error"><span className="paper-label">Shelf paused</span><p>{state.error}</p></div>}
          {state.status === "ready" && (
            <article>
              <div className="reader-paper__meta">
                <span>{state.profile.series || state.profile.category || "Public note"}</span>
                <span>{state.profile.date || "Published note"}</span>
              </div>
              <div className="reader-paper__body" dangerouslySetInnerHTML={{ __html: html }} />
            </article>
          )}
        </section>

        <EditorialNext
          title="When you finish reading"
          links={[
            { eyebrow: "Return", title: "Studio Notes", description: "Choose another note from the shelf.", href: backHref },
            { eyebrow: "Continue", title: "Selected work", description: "Move from the writing table into the public archive.", href: "/Angels-Website/portfolio/" }
          ]}
        />
      </div>
    </main>
  );
}
