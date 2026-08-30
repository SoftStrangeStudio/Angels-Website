import PostReaderClient from "../../notes/post/PostReaderClient";

export const metadata = {
  title: "Blog Post · Soft Strange Studio",
  description: "Legacy Blog post route for the Soft Strange Studio reader."
};

export default function BlogPostPage() {
  return <PostReaderClient backHref="/Angels-Website/blog/" backLabel="Back to Blog archive" contextLabel="Blog archive" />;
}
