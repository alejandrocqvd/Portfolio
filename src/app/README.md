# `src/app`: routes, layout and the home page

This folder is the Next.js App Router. Every folder with a `page.jsx` is a page on the site, and `layout.jsx` wraps
all of them.

```
src/app/
├── layout.jsx      the shell around every page
├── page.jsx        /            (home)
├── Greeting.jsx    the rolling "Hello, I'm" above the name
├── PhotoCards.jsx  the stack of three photos beside the bio
├── about/          /about       → see about/README.md
├── contact/        /contact     → see contact/README.md
└── projects/       /projects    → see projects/README.md
```

A component used by only one page lives in that page's folder. Anything shared across pages lives in
`src/components/`, and plain helpers and data live in `src/lib/`.

## The layout (`layout.jsx`)

Every page is rendered inside the same shell:

```
<html data-theme data-os>               set by an inline script before first paint
  <ViewTransitions>                     animated page changes (next-view-transitions)
    <Loader/>                           the logo intro, on full page loads only
    <Background/>                       the dot lattice behind everything
    <Navbar/>
    <div class="page-vt">               ← only this part animates between pages
      <main>{page}</main>
      <Footer/>
    </div>
```

A few decisions worth knowing:

- **Theme before paint.** A tiny inline script reads the saved theme (or the system preference) and puts it on
  `<html>` before anything is drawn, so the page never flashes the wrong colours.
- **Static, refreshed every 5 minutes.** `export const revalidate = 300` makes every page a static page that Next
  rebuilds at most every 5 minutes. That keeps the footer's "now playing" data fresh without calling the APIs on every
  visit.
- **Self-hosted font.** JetBrains Mono is loaded with `next/font/local` from `public/fonts/hello`, exposed as the CSS
  variable `--font-sans`.
- **Search and sharing.** Each page's title, description, canonical URL and link-preview tags come from
  `pageMetadata()` in `src/lib/seo.js`. `opengraph-image.jsx` draws the preview card shown when a link is shared, and
  the root layout adds a schema.org `Person` block so search engines link the site to my profiles. The projects page
  is a client component, so its metadata lives in `projects/layout.jsx`.
- **Links.** Use `Link` from `next-view-transitions` (not `next/link`) for internal links, or the page transition
  won't play.

## The home page

`page.jsx` is the hero: the greeting, the name, a rule that draws in under it, the bio and the photo pile.

- **`Greeting`** rolls "Hello, I'm" through 14 languages, one character at a time. English comes first, then the rest
  in a shuffled order that repeats. It pauses on hover and in background tabs, and stays still under reduced motion.
  Non-Latin characters come from tiny font subsets in `public/fonts/hello/` (the `Hello Script` font face).
- **`PhotoCards`** stacks three square photos. Hovering one lifts it above the others. The trick is that every card is
  drawn twice: once flat in the pile, which never moves, and once as a "copy" above it that does all the animating.
  This avoids a visible jump when the browser re-sharpens an image at the end of a transition. The long comment at
  the top of the file explains why.

To change the photos, edit the `photos` array in `page.jsx` (order: left, middle on top, right).

## Styling (`src/globals.css` and `tailwind.config.js`)

- **Colour tokens.** `paper`, `surface`, `ink`, `muted` and `accent` are CSS variables holding RGB channels, so
  Tailwind opacity works (`bg-ink/10`). Light mode just redefines the variables.
- **Radii.** `rounded-control` (8px), `rounded-media` (10px), `rounded-overlay` (16px).
- **Motion.** One easing (`ease-out`, a strong ease-out curve) and three durations (150 / 250 / 400 ms). Each page has
  one orchestrated moment; everything else answers something the visitor did. Every animation has a reduced-motion
  fallback in the `prefers-reduced-motion` block near the end of `globals.css`.
- **The intro's timing** is controlled by the `--intro-*` numbers in `globals.css` (see `src/components/README.md`).
  Anything that should wait for the intro reads `--intro`.
