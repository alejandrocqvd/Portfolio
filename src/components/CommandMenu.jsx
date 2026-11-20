"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { Search } from "lucide-react";
import { email, elsewhere, routes } from "@/lib/site";
import { featuredProject, projects } from "@/app/projects/catalogue";
import { toggleMono, toggleTheme } from "@/lib/display";

// ==============================================================================================================
function buildItems() {
  const pages = routes.map((r) => ({ group: "Pages", label: r.label, href: r.href }));

  const work = [
    { id: "featured", ...featuredProject },
    ...Object.entries(projects).map(([id, p]) => ({ id, ...p })),
  ].map((p) => ({
    group: "Projects",
    label: p.title,
    hint: p.subtitle,
    href: `/projects?p=${p.id}`,
  }));

  const actions = [
    { label: "Toggle light / dark theme", keywords: "theme dark light mode", run: () => toggleTheme() },
    { label: "Toggle monospace", keywords: "mono font typeface", run: toggleMono },
    { label: "Copy email address", hint: email, keywords: "contact mail", copy: email },
    ...elsewhere
      .filter((l) => !l.href.startsWith("mailto:"))
      .map((l) => ({ label: `Open ${l.label}`, hint: l.value, external: l.href })),
  ].map((a) => ({ group: "Actions", ...a }));

  return [...pages, ...work, ...actions];
}

function matches(item, query) {
  const haystack = `${item.label} ${item.hint ?? ""} ${item.keywords ?? ""} ${item.group}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

// ==============================================================================================================
function Trigger({ onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open command menu"
      aria-keyshortcuts="Control+K Meta+K"
      className="flex h-8 items-center gap-2 rounded-control px-2 text-muted transition-colors duration-150 ease-out hover:text-ink active:scale-[0.97]"
    >
      <Search size={16} aria-hidden />
      <kbd className="hidden font-sans text-xs md:inline">
        <span className="only-mac">⌘K</span>
        <span className="only-other-os">Ctrl K</span>
      </kbd>
    </button>
  );
}

// ==============================================================================================================
export default function CommandMenu() {
  const dialog = useRef(null);
  const list = useRef(null);
  const router = useTransitionRouter();
  const id = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const items = useMemo(buildItems, []);
  const results = useMemo(() => items.filter((item) => matches(item, query)), [items, query]);

  const open = () => {
    setQuery("");
    setActive(0);
    setCopied(false);
    dialog.current.showModal();
  };
  const close = () => dialog.current.close();

  useEffect(() => {
    const onKey = (event) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (dialog.current.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function run(item) {
    if (item.copy) {
      navigator.clipboard?.writeText(item.copy);
      setCopied(true);
      setTimeout(close, 900);
      return;
    }
    close();
    if (item.href) router.push(item.href);
    else if (item.external) window.open(item.external, "_blank", "noopener");
    else item.run();
  }

  function onKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      run(results[active]);
    }
  }

  return (
    <>
      <Trigger onOpen={open} />

      <dialog
        ref={dialog}
        aria-label="Command menu"
        onClick={(event) => event.target === dialog.current && close()}
        className="palette mx-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-overlay border border-ink/10 bg-surface p-0 text-ink shadow-2xl shadow-black/40"
      >
        <div className="flex items-center gap-3 border-b border-ink/10 px-4">
          <Search size={16} className="shrink-0 text-muted" aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search pages, projects and actions"
            role="combobox"
            aria-expanded="true"
            aria-controls={`${id}-list`}
            aria-activedescendant={results[active] ? `${id}-${active}` : undefined}
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted focus-visible:outline-none"
          />
        </div>

        <ul ref={list} id={`${id}-list`} role="listbox" aria-label="Results" className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted">No matches. Try a project name or “theme”.</li>
          )}

          {results.map((item, index) => (
            <li key={`${item.group}-${item.label}`} role="presentation">
              {(index === 0 || results[index - 1].group !== item.group) && (
                <p className="px-3 pb-1 pt-3 text-xs text-muted first:pt-1">{item.group}</p>
              )}
              <div
                id={`${id}-${index}`}
                data-index={index}
                role="option"
                aria-selected={index === active}
                onClick={() => run(item)}
                onMouseMove={() => setActive(index)}
                className="flex cursor-pointer items-baseline justify-between gap-4 rounded-control px-3 py-2 text-sm aria-selected:bg-ink/[0.07]"
              >
                <span>{item.copy && copied ? "Copied to clipboard" : item.label}</span>
                {item.hint && <span className="truncate text-xs text-muted">{item.hint}</span>}
              </div>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
