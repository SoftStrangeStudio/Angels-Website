import {
  EditorialCard,
  EditorialNext,
  EditorialNotes,
  EditorialPage,
  EditorialSection,
  editorialImages
} from "../editorial-page";
import { studioPhotos } from "../studio-photos";
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
      <EditorialSection eyebrow="Made by hand" title="Small crochet projects" intro="Soft creatures and pieces taking shape, stitch by stitch.">
        <div className="editorial-card-list">
          <EditorialCard eyebrow="Crochet" title="Pink octopus" description="A little pink companion and a future project direction." image={studioPhotos.octopus} imageAlt="A small pink crochet octopus held beside a window" details={["Pattern credit: @blackcatstitchez"]} />
          <EditorialCard eyebrow="Work in progress" title="Sunburst granny-square bag" description="Purple, green and yellow squares becoming a bag." image={studioPhotos.bag} imageAlt="Colorful crochet squares being assembled into a bag" href="/Angels-Website/notes/#making-the-bag" />
        </div>
        <p className="studio-photo-credit">Granny-square pattern: <a href="https://www.katiegetscreative.com/2024/08/how-to-make-a-sunburst-granny-square.html">Katie Gets Creative</a>.</p>
      </EditorialSection>
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
