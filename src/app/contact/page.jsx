import { ArrowUpRight, Mail } from "lucide-react";
import CatRun from "@/app/contact/CatRun";
import CopyButton from "@/app/contact/CopyButton";
import { email, elsewhere } from "@/lib/site";

// Same buttons as the Projects hero.
const button =
  "inline-flex h-10 items-center justify-center gap-2 rounded-control px-4 text-sm transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]";

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
// Hairline rows: label, value underlined on hover like other links on the site, arrow. Each row is a stretched link.
function DirectLinks() {
  return (
    <ul aria-label="Other ways to reach me" className="divide-y divide-ink/10 border-y border-ink/10">
      {elsewhere.map((link) => {
        const external = !link.href.startsWith("mailto:");
        return (
          <li key={link.label} className="group relative grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-3 py-4 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:gap-4">
            <span className="text-sm text-muted">{link.label}</span>

            <a
              href={link.href}
              aria-label={`${link.label}: ${link.value}`}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="min-w-0 text-[0.95rem] leading-snug text-ink after:absolute after:-inset-x-3 after:inset-y-0 after:rounded-control after:transition-colors after:duration-150 after:ease-out hover:after:bg-ink/[0.03] active:after:bg-ink/[0.06] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-accent"
            >
              <span className="link [overflow-wrap:anywhere] group-hover:bg-[length:100%_1px]">
                <Value link={link} />
              </span>
            </a>

            <ArrowUpRight
              size={16}
              aria-hidden
              className="shrink-0 text-muted transition-[transform,color] duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            />
          </li>
        );
      })}
    </ul>
  );
}

// ==============================================================================================================
export default function ContactPage() {
  return (
    <section className="mx-auto min-h-[min(100svh,950px)] w-full max-w-4xl px-6 pt-36 md:pt-44 xl:px-0">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-3xl font-[420] tracking-[-0.02em] md:text-4xl">Get in touch</h1>
          <p className="mt-5 max-w-md leading-relaxed text-ink">
            Feel free to reach out if you want to chat about anything. I&apos;m always open to new opportunities and
            conversations :D
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${email}`} className={`${button} bg-ink text-paper hover:bg-ink/85`}>
              <Mail size={16} aria-hidden />
              Email me
            </a>
            <CopyButton
              value={email}
              label="Copy email address"
              confirmation="Email address copied"
              className={`${button} border border-ink/15 hover:bg-ink/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
            >
              Copy email
            </CopyButton>
          </div>
        </div>

        <DirectLinks />
      </div>

      <CatRun />
    </section>
  );
}
