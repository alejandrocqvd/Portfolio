import Timeline from "@/app/about/Timeline";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about",
  title: "About",
  description: "Who I am.",
});

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Timeline />
    </div>
  );
}
