"use client";

import { useEffect, useState } from "react";
import {
  EditorialCard,
  EditorialNext,
  EditorialPage,
  EditorialSection,
  editorialImages
} from "../editorial-page";
import { INDEX_URLS } from "../site-data";

async function fetchPostsIndex() {
  const urls = window.location.hostname === "localhost" ? [...INDEX_URLS].reverse() : INDEX_URLS;

  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok) return response.json();
    } catch {}
  }

  throw new Error("The public notes shelf could not be reached right now.");
}

function sortPublishedPosts(posts) {
  return posts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
}

export default function NotesPageClient({ routeBase = "/Angels-Website/notes", routeLabel = "Studio Notes" }) {
  const [state, setState] = useState({ status: "loading", posts: [], error: null });

  useEffect(() => {
    let active = true;

    fetchPostsIndex()
      .then((data) => {
        if (!active) return;
        const posts = Array.isArray(data.posts) ? sortPublishedPosts(data.posts) : [];
        setState({ status: "ready", posts, error: null });
      })
      .catch((error) => {
        if (active) setState({ status: "error", posts: [], error: error.message });
      });

    return () => { active = false; };
  }, []);

  return (
    <EditorialPage
      eyebrow={routeLabel}
      title="Honest notes from the studio table."
      intro="Essays, updates, reflections, and small observations gathered into one calm reading room. Published notes appear newest first."
      image={editorialImages.notes}
      imageAlt="An open illustrated studio journal with botanical studies, a fountain pen, and a warm mug"
    >
      <EditorialSection
        eyebrow="Writing shelf"
        title="Read the latest notes"
        intro="Choose a piece and it will open inside the same studio shell, with a clear path back when you are finished."
      >
        {state.status === "loading" && (
          <div className="editorial-state" role="status">
            <span className="paper-label">Gathering</span>
            <p>Bringing the published notes to the table...</p>
          </div>
        )}

        {state.status === "error" && (
          <div className="editorial-state editorial-state--error" role="alert">
            <span className="paper-label">Shelf paused</span>
            <p>{state.error}</p>
            <small>The room is still here. Please try again in a little while.</small>
          </div>
        )}

        {state.status === "ready" && state.posts.length === 0 && (
          <div className="editorial-state">
            <span className="paper-label">Quiet shelf</span>
            <p>No published notes are available yet.</p>
          </div>
        )}

        {state.status === "ready" && state.posts.length > 0 && (
          <div className="editorial-card-list">
            {state.posts.map((post, index) => (
              <EditorialCard
                key={post.slug}
                eyebrow={index === 0 ? "Latest note" : post.category || "Public note"}
                title={post.title}
                description={post.excerpt}
                image={editorialImages.notes}
                imageAlt="A watercolor studio journal representing this published note"
                status={post.date}
                details={(post.tags || []).slice(0, 3)}
                href={`${routeBase}/post/?slug=${post.slug}`}
              />
            ))}
          </div>
        )}
      </EditorialSection>

      <EditorialNext
        title="Continue from the reading table"
        links={[
          { eyebrow: "Look", title: "Selected work", description: "Projects and experiments from the studio.", href: "/Angels-Website/portfolio/" },
          { eyebrow: "Return", title: "Studio home", description: "Go back to the full room map.", href: "/Angels-Website/" }
        ]}
      />
    </EditorialPage>
  );
}
