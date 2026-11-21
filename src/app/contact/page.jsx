import { ArrowUpRight } from "lucide-react";
import CatRun from "@/app/contact/CatRun";
import CopyButton from "@/app/contact/CopyButton";
import { elsewhere } from "@/lib/site";

// The label already names the site, so profiles show just the handle; the email may wrap after the @.
function Value({ link }) {
  if (link.href.startsWith("mailto:")) {
    const [user, domain] = link.value.split("@");
    return (
      <>
        {user}@<wbr />
        {domain}
      </>
    );
  }
  return link.value.split("/").pop();
}

// ==============================================================================================================
// One panel split by hairlines (gap-px over an ink/10 backing), matching the game card below. Each cell is a
// stretched link: label on top, value underlined on hover like other links on the site.
function DirectLinks() {
  return (
    <ul
      aria-label="Other ways to reach me"
      className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-media border border-ink/10 bg-ink/10 md:grid-cols-[1.3fr_1fr_1fr_1fr]"
    >
      {elsewhere.map((link) => {
        const email = link.href.startsWith("mailto:");
        return (
          <li key={link.label} className="group relative flex min-w-0 flex-col justify-between gap-8 bg-surface p-5 md:p-6">
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm text-muted">{link.label}</span>
              {email ? (
                <CopyButton value={link.value} label="Copy email address" confirmation="Email address copied" />
              ) : (
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="shrink-0 text-muted transition-[transform,color] duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                />
              )}
            </div>

            <a
              href={link.href}
              aria-label={`${link.label}: ${link.value}`}
              {...(!email && { target: "_blank", rel: "noopener noreferrer" })}
              className="text-[0.95rem] leading-snug text-ink after:absolute after:inset-0 after:transition-colors after:duration-150 after:ease-out hover:after:bg-ink/[0.03] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-accent"
            >
              <span className="link [overflow-wrap:anywhere] group-hover:bg-[length:100%_1px]">
                <Value link={link} />
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

// ==============================================================================================================
export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 pt-36 md:pt-44 xl:px-0">
      <h1 className="text-3xl font-[420] tracking-[-0.02em] md:text-4xl">Get in touch</h1>
      <p className="mt-5 max-w-xl leading-relaxed text-muted">
        Feel free to reach out if you want to chat about anything. I&apos;m always open to new opportunities and
        conversations :D
      </p>

      <DirectLinks />

      <CatRun />
    </section>
  );
}
