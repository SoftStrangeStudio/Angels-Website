import {
  EditorialCard,
  EditorialNext,
  EditorialNotes,
  EditorialPage,
  EditorialSection,
  editorialImages
} from "../editorial-page";
import { studioPhotos, StudioPhoto } from "../studio-photos";
import { aboutPathways, aboutPrinciples, aboutSections } from "../site-data";

export const metadata = {
  title: "About · Soft Strange Studio",
  description: "Meet the person, principles, and gentle oddness behind Soft Strange Studio."
};

const pathwayImages = [editorialImages.notes, editorialImages.art, editorialImages.shop];

export default function AboutPage() {
  return (
    <EditorialPage
      eyebrow="About the studio"
      title="A small studio with a big, strange heart."
      intro="Soft Strange Studio is Angel Berger’s public home for thoughtful websites, honest notes, creature work, and small creative things made with care."
      image={studioPhotos.angel}
      imageAlt="Angel having floor time with Gizmo, a black and white dog"
    >
      <EditorialSection eyebrow="Meet the helpers" title="Studio supervisors" intro="Gizmo and Panda keep the studio company.">
        <div className="studio-photo-grid">
          <StudioPhoto src={studioPhotos.gizmo} alt="Gizmo, a black and white dog, watching through a glass door" caption="Gizmo — junior supervisor" />
          <StudioPhoto src={studioPhotos.panda} alt="Panda, a shaggy black and white dog, resting on the floor" caption="Panda — senior supervisor" />
        </div>
      </EditorialSection>
      <EditorialSection
        eyebrow="Studio shape"
        title="What this place holds"
        intro="The studio stays warm and human on the surface, with the technical machinery kept quietly behind the work."
      >
        <div className="editorial-card-list">
          {aboutSections.map((section, index) => (
            <EditorialCard
              key={section.title}
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
              image={index % 2 === 0 ? editorialImages.about : editorialImages.art}
              imageAlt="A watercolor view into the studio's creative world"
            />
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        eyebrow="Working principles"
        title="How the studio tries to work"
        intro="Three simple promises keep the public rooms clear, safe, and recognizably handmade."
      >
        <EditorialNotes items={aboutPrinciples} />
      </EditorialSection>

      <EditorialSection
        eyebrow="Choose a doorway"
        title="Where to go next"
        intro="Pick the room that best matches what you came here to find."
      >
        <div className="editorial-card-list">
          {aboutPathways.map((pathway, index) => (
            <EditorialCard
              key={pathway.href}
              eyebrow={pathway.label}
              title={pathway.label === "Read" ? "Studio Notes" : pathway.label === "Look" ? "Selected work" : "Future shop"}
              description={pathway.description}
              image={pathwayImages[index]}
              imageAlt="A watercolor studio scene associated with this room"
              href={pathway.href}
            />
          ))}
        </div>
      </EditorialSection>

      <EditorialNext
        title="Continue through the studio"
        links={[
          { eyebrow: "Read", title: "Studio Notes", description: "Public notes and reflections.", href: "/Angels-Website/notes/" },
          { eyebrow: "Look", title: "Selected work", description: "Projects, art direction, and experiments.", href: "/Angels-Website/portfolio/" }
        ]}
      />
    </EditorialPage>
  );
}
