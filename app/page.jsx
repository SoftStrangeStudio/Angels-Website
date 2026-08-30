import PaperScrollExperience from "./PaperScrollExperience";

const homeCards = [
  {
    href: "/Angels-Website/notes/",
    title: "Studio Notes",
    description: "essays, updates, grief, chronic illness, and free patterns.",
    image: "/Angels-Website/images/editorial/notes-journal.jpg",
    imageAlt: "An illustrated open studio journal with botanical studies and a warm mug"
  },
  {
    href: "/Angels-Website/portfolio/",
    title: "Art",
    description: "cozy creatures, ocean studies, garden magic, and experiments.",
    image: "/Angels-Website/images/editorial/art-sketchbook.jpg",
    imageAlt: "An illustrated sketchbook filled with a coastal watercolor and botanical drawings"
  },
  {
    href: "/Angels-Website/store/",
    title: "Shop",
    description: "stickers, wearable things, paper goods, and free little things.",
    image: "/Angels-Website/images/editorial/shop-goods.jpg",
    imageAlt: "Illustrated botanical studio goods including a tote, mug, notebook, and paper tags"
  },
  {
    href: "/Angels-Website/about/",
    title: "About",
    description: "the person, grief, joy, and feelings behind the studio.",
    image: "/Angels-Website/images/editorial/about-studio.jpg",
    imageAlt: "An illustrated ivy-covered doorway opening into a small sunlit art studio"
  }
];

export default function HomePage() {
  return (
    <PaperScrollExperience>
      <main id="top" className="reference-home-page">
        <section className="reference-home-sheet" aria-label="Soft Strange Studio home">
          <p className="reference-home-sheet__eyebrow">Gemini</p>
          <div className="reference-home-sheet__body">
            <div className="reference-home-sheet__intro">
              <h2>
                Welcome to Soft Strange Studio - a cozy place for strange art, honest
                notes, and small comforts.
              </h2>
              <p>
                Here you&apos;ll find artwork, studio experiments, reflections on grief
                and chronic illness, and soft little things made for people who feel a lot.
              </p>
            </div>

            <span className="reference-home-sheet__ornament reference-home-sheet__ornament--left">
              made slowly
            </span>
            <span className="reference-home-sheet__ornament reference-home-sheet__ornament--right">
              breathe
            </span>
            <span className="reference-home-sheet__ornament reference-home-sheet__ornament--bottom-left">
              soft
            </span>
            <span className="reference-home-sheet__ornament reference-home-sheet__ornament--bottom-right">
              cozy harbor
            </span>

            <div className="reference-card-grid" aria-label="Studio sections">
              {homeCards.map((card, index) => (
                <a
                  className={index % 2 === 0 ? "reference-card" : "reference-card reference-card--tilt"}
                  href={card.href}
                  key={card.title}
                >
                  <span className="reference-card__tape" aria-hidden="true" />
                  <div className="reference-card__art">
                    <img src={card.image} alt={card.imageAlt} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </a>
              ))}
            </div>

            <p className="reference-home-sheet__copyright" id="contact">
              © 2026 Soft Strange Studio. All rights reserved.
            </p>
          </div>
        </section>
      </main>
    </PaperScrollExperience>
  );
}
