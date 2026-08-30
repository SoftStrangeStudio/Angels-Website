export const editorialImages = {
  notes: "/Angels-Website/images/editorial/notes-journal.jpg",
  art: "/Angels-Website/images/editorial/art-sketchbook.jpg",
  shop: "/Angels-Website/images/editorial/shop-goods.jpg",
  about: "/Angels-Website/images/editorial/about-studio.jpg"
};

export function EditorialPage({ eyebrow, title, intro, image, imageAlt, children }) {
  return (
    <main id="top" className="editorial-page">
      <section className="editorial-hero" aria-labelledby="editorial-page-title">
        <div className="editorial-hero__copy">
          <p className="paper-label">{eyebrow}</p>
          <h1 id="editorial-page-title">{title}</h1>
          <p>{intro}</p>
        </div>
        <figure className="editorial-photo editorial-photo--hero">
          <span className="paper-tape" aria-hidden="true" />
          <img src={image} alt={imageAlt} />
        </figure>
      </section>
      <div className="editorial-page__stack">{children}</div>
    </main>
  );
}

export function EditorialSection({ eyebrow, title, intro, children, id }) {
  const headingId = id || `section-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section className="editorial-section" aria-labelledby={headingId}>
      <header className="editorial-section__header">
        <p className="paper-label">{eyebrow}</p>
        <h2 id={headingId}>{title}</h2>
        {intro && <p>{intro}</p>}
      </header>
      {children}
    </section>
  );
}

export function EditorialCard({ eyebrow, title, description, image, imageAlt, status, details = [], href }) {
  const content = (
    <>
      {image && (
        <figure className="editorial-photo editorial-card__photo">
          <span className="paper-tape" aria-hidden="true" />
          <img src={image} alt={imageAlt || ""} />
        </figure>
      )}
      <div className="editorial-card__copy">
        <div className="editorial-card__meta">
          <span>{eyebrow}</span>
          {status && <strong>{status}</strong>}
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        {details.length > 0 && (
          <ul>
            {details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        )}
        {href && <span className="editorial-card__action">Open this room →</span>}
      </div>
    </>
  );

  return href ? (
    <a className="editorial-card editorial-card--link" href={href}>{content}</a>
  ) : (
    <article className="editorial-card">{content}</article>
  );
}

export function EditorialNotes({ items }) {
  return (
    <div className="editorial-notes">
      {items.map((item) => (
        <article className="editorial-note" key={item.title}>
          <span className="editorial-note__pin" aria-hidden="true" />
          <p className="paper-label">{item.eyebrow}</p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}

export function EditorialNext({ title = "Keep exploring", links }) {
  return (
    <section className="editorial-next" aria-labelledby="editorial-next-title">
      <div>
        <p className="paper-label">Next rooms</p>
        <h2 id="editorial-next-title">{title}</h2>
      </div>
      <nav aria-label="Suggested next rooms">
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            <span>{link.eyebrow}</span>
            <strong>{link.title}</strong>
            <small>{link.description}</small>
          </a>
        ))}
      </nav>
    </section>
  );
}
