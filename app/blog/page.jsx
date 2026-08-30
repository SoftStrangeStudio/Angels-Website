import NotesPageClient from "../notes/NotesPageClient";

export const metadata = {
  title: "Blog · Soft Strange Studio",
  description: "The legacy Blog path for Soft Strange Studio's public notes."
};

export default function BlogPage() {
  return <NotesPageClient routeBase="/Angels-Website/blog" routeLabel="Blog archive" />;
}
