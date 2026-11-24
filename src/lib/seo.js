import { elsewhere } from "@/lib/site";

export const siteUrl = "https://acardona.ca";
export const siteName = "Alejandro Cardona";
export const siteDescription =
  "Alejandro Cardona, software engineer and Computer Science student at the University of Calgary.";

// The share card rendered by src/app/opengraph-image.jsx.
const shareImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "Alejandro Cardona, software engineer" };

// Metadata for one page. Next merges `openGraph` shallowly (a page's object replaces the layout's, file-based image
// included), so every page builds the whole object here, share image and all.
export function pageMetadata({ path, title, description = siteDescription }) {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      locale: "en_CA",
      url: path,
      title: title ? `${siteName} | ${title}` : siteName,
      description,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", images: [shareImage] },
  };
}

// schema.org Person, so search engines connect the site to its owner and profiles.
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  jobTitle: "Software Engineer",
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Calgary" },
  sameAs: elsewhere.filter((l) => l.href.startsWith("https://")).map((l) => l.href),
};
