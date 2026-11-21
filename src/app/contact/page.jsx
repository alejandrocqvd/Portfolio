import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import ContactLetter from "@/app/contact/ContactLetter";
import { elsewhere } from "@/lib/site";

const icons = { Email: Mail, LinkedIn: Linkedin, GitHub: Github, Resume: FileText };

// ==============================================================================================================
function DirectLinks() {
  return (
    <ul aria-label="Other ways to reach me" className="flex flex-col">
      {elsewhere.map((link) => {
        const Icon = icons[link.label];
        const external = !link.href.startsWith("mailto:");
        return (
          <li key={link.label} className="border-t border-ink/10 last:border-b">
            <a
              href={link.href}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex items-center gap-4 px-1 py-4 transition-colors duration-150 ease-out hover:bg-ink/[0.04]"
            >
              <Icon size={16} className="shrink-0 text-muted" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block text-sm">{link.label}</span>
                <span className="block truncate text-sm text-muted">{link.value}</span>
              </span>
              <ArrowUpRight
                size={16}
                aria-hidden
                className="shrink-0 text-muted transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
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

      <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,1fr)_17.5rem]">
        <ContactLetter />
        <DirectLinks />
      </div>
    </section>
  );
}
