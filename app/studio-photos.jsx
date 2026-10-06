import { EditorialSection } from "./editorial-page";

export const studioPhotos = {
  octopus: "/Angels-Website/images/studio/pink-crochet-octopus.jpg",
  bag: "/Angels-Website/images/studio/sunburst-granny-square-bum-bag-progress.jpg",
  birch: "/Angels-Website/images/studio/birch-tree-from-the-deck.jpg",
  angel: "/Angels-Website/images/studio/gizmo-and-angel-floor-time.jpg",
  gizmo: "/Angels-Website/images/studio/gizmo-junior-supervisor.jpg",
  panda: "/Angels-Website/images/studio/panda-senior-supervisor.jpg"
};

export function StudioPhoto({ src, alt, caption }) {
  const landscape = src.includes("porch-sunset");
  return (
    <figure className="studio-photo">
      <img src={src} alt={alt} width={landscape ? 1024 : 768} height={landscape ? 768 : 1024} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function StudioPhotoNotes() {
  return (
    <>
      <EditorialSection id="making-the-bag" eyebrow="On the making table" title="Squares becoming a bag" intro="A sunburst granny-square bag, still in progress.">
        <div className="studio-photo-grid">
          <StudioPhoto src={studioPhotos.bag} alt="Purple, yellow and green crochet squares being assembled into a bag" caption="one square at a time" />
        </div>
        <p className="studio-photo-credit">Granny-square pattern: <a href="https://www.katiegetscreative.com/2024/08/how-to-make-a-sunburst-granny-square.html">Katie Gets Creative</a>.</p>
      </EditorialSection>
      <EditorialSection id="porch-sunsets" eyebrow="A quiet moment" title="Two sunsets from the porch" intro="A little room for the everyday views, too.">
        <div className="studio-photo-grid">
          <StudioPhoto src="/Angels-Website/images/studio/porch-sunset-1.jpg" alt="A pale gold sunset above trees and the porch railing" caption="from the porch" />
          <StudioPhoto src="/Angels-Website/images/studio/porch-sunset-2.jpg" alt="Soft pink sunset clouds above the tree line" caption="another evening sky" />
        </div>
      </EditorialSection>
      <EditorialSection id="chomp" eyebrow="A small photo story" title="Chomp" intro="Three moments with a curious studio helper.">
        <div className="studio-photo-grid studio-photo-grid--story">
          <StudioPhoto src="/Angels-Website/images/studio/chomp-story-1.jpg" alt="A black and white dog sniffing a blue crochet piece held in a hand" caption="1. a closer look" />
          <StudioPhoto src="/Angels-Website/images/studio/chomp-story-2.jpg" alt="The dog looking up at the blue crochet piece" caption="2. very interested" />
          <StudioPhoto src="/Angels-Website/images/studio/chomp-story-3.jpg" alt="The dog taking the blue crochet piece in its mouth" caption="3. chomp" />
        </div>
      </EditorialSection>
    </>
  );
}
