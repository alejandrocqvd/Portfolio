import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import CatRun from "@/app/contact/CatRun";
import { elsewhere } from "@/lib/site";

const icons = { Email: Mail, LinkedIn: Linkedin, GitHub: Github, Resume: FileText };

// ==============================================================================================================
function DirectLinks() {
  return (
    <ul aria-label="Other ways to reach me" className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {elsewhere.map((link) => {
        const Icon = icons[link.label];
        const external = !link.href.startsWith("mailto:");
        return (
          <li key={link.label} className="min-w-0">
            <a
              href={link.href}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex h-full flex-col gap-6 rounded-control border border-ink/10 p-5 transition-colors duration-150 ease-out hover:bg-ink/[0.04]"
            >
              <span className="flex items-center justify-between">
                <Icon size={16} className="text-muted" aria-hidden />
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="text-muted transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-sm">{link.label}</span>
                <span className="block truncate text-sm text-muted">{link.value}</span>
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
