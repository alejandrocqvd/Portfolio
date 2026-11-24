import { pageMetadata } from "@/lib/seo";

// Pass-through layout: the projects page is a client component, so its metadata is exported from here.
export const metadata = pageMetadata({
  path: "/projects",
  title: "Projects",
  description: "What I make.",
});

export default function ProjectsLayout({ children }) {
  return children;
}
