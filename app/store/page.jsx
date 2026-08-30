import {
  EditorialCard,
  EditorialNext,
  EditorialNotes,
  EditorialPage,
  EditorialSection,
  editorialImages
} from "../editorial-page";
import { storePromises, storeSections } from "../site-data";

export const metadata = {
  title: "Shop · Soft Strange Studio",
  description: "A calm preview of the small goods and paper pieces being prepared by Soft Strange Studio."
};

export default function StorePage() {
  return (
    <EditorialPage
      eyebrow="Shop preview"
      title="Small goods, paper things, and gentle companions."
      intro="The shop shelf is still being prepared. This room shows the kinds of pieces coming next without pretending that unfinished listings are ready to buy."
      image={editorialImages.shop}
      imageAlt="Botanical studio goods including a canvas tote, mug, notebook, stickers, and paper tags"
    >
      <EditorialSection
        eyebrow="Preparing slowly"
        title="What may arrive on the shelf"
        intro="Each lane stays clearly marked until it has a real preview, delivery details, and a public buying path."
      >
        <div className="editorial-card-list">
          {storeSections.map((section) => (
            <EditorialCard
              key={section.title}
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
              image={editorialImages.shop}
              imageAlt="A watercolor arrangement of handmade botanical studio goods"
              status={section.eyebrow}
              details={section.details}
            />
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        eyebrow="Store promise"
        title="Honest before available"
        intro="A future shop should feel like another studio room, not a sudden loud storefront."
      >
        <EditorialNotes items={storePromises} />
      </EditorialSection>

      <EditorialNext
        title="See where the pieces come from"
        links={[
          { eyebrow: "Look", title: "Selected work", description: "The visual worlds behind future pieces.", href: "/Angels-Website/portfolio/" },
          { eyebrow: "Meet", title: "About the studio", description: "The person and principles behind the shelf.", href: "/Angels-Website/about/" }
        ]}
      />
    </EditorialPage>
  );
}
