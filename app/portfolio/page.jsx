import {
  EditorialCard,
  EditorialNext,
  EditorialNotes,
  EditorialPage,
  EditorialSection,
  editorialImages
} from "../editorial-page";
import { portfolioPieces, portfolioProcess } from "../site-data";

export const metadata = {
  title: "Art & Work · Soft Strange Studio",
  description: "Selected systems, illustrations, experiments, and soft strange worlds."
};

const projectImages = [editorialImages.art, editorialImages.notes, editorialImages.about, editorialImages.shop];

export default function PortfolioPage() {
  const processNotes = portfolioProcess.map((description, index) => ({
    eyebrow: `Step ${index + 1}`,
    title: ["Find the signal", "Frame the work", "Keep it human", "Open the deeper room"][index],
    description
  }));

  return (
    <EditorialPage
      eyebrow="Art & selected work"
      title="Made with intention, curiosity, and a little oddness."
      intro="A growing collection of public projects, visual systems, creature worlds, and studio experiments that are ready to share."
      image={editorialImages.art}
      imageAlt="An open artist sketchbook with a coastal watercolor and botanical studies"
    >
      <EditorialSection
        eyebrow="Selected work"
        title="A small public archive"
        intro="Each piece has a clear public purpose and an honest status. Deeper case studies can grow here as their images and stories become ready."
      >
        <div className="editorial-card-list">
          {portfolioPieces.map((piece, index) => (
            <EditorialCard
              key={piece.title}
              eyebrow={piece.eyebrow}
              title={piece.title}
              description={piece.description}
              image={projectImages[index % projectImages.length]}
              imageAlt="A watercolor studio image representing this project"
              status={piece.status}
              details={piece.details}
            />
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        eyebrow="Studio process"
        title="How work reaches this shelf"
        intro="The archive grows slowly: real signal first, public framing second, deeper detail only when it helps the visitor."
      >
        <EditorialNotes items={processNotes} />
      </EditorialSection>

      <EditorialNext
        title="Follow the work"
        links={[
          { eyebrow: "Read", title: "Studio Notes", description: "Reflections and context behind the work.", href: "/Angels-Website/notes/" },
          { eyebrow: "Preview", title: "Future shop", description: "Small goods and paper pieces being prepared.", href: "/Angels-Website/store/" }
        ]}
      />
    </EditorialPage>
  );
}
