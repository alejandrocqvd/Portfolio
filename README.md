# Portfolio

My personal portfolio, live at [acardona.ca](https://acardona.ca). Built with Next.js 15 (App Router), React 18 and
Tailwind CSS 3, in plain JavaScript.

## About

I'm a Computer Science student at the University of Calgary with interests in software engineering, game development,
and virtual reality. Alongside my studies, I interned for 16 months at Pason Systems and co-founded Nullus, a
student-led software development startup.

This site showcases my projects, experience and technical skills.

## Running it

Requires Node 24 and npm.

```bash
npm install
npm run dev     # dev server at http://localhost:3000
npm run build   # production build (also writes sitemap.xml and robots.txt to public/)
npm run start   # serve the production build
npm run lint
```

The footer's "right now" strip can show my recent Steam game and Spotify song. Copy `.env.example` to `.env.local`
and fill in the keys to enable them; without keys the site works and shows placeholders.

## How it's organised

| Folder                                             | What's inside                                                  |
| -------------------------------------------------- | -------------------------------------------------------------- |
| [`src/app`](src/app/README.md)                     | The layout, home page, and site-wide styling notes             |
| [`src/app/about`](src/app/about/README.md)         | The Timeline page: the year chart of roles and the photo strip |
| [`src/app/contact`](src/app/contact/README.md)     | The Contact page and the CatRun mini game                      |
| [`src/app/projects`](src/app/projects/README.md)   | The project catalogue, the bento grid and the project dialog   |
| [`src/components`](src/components/README.md)       | Navbar, footer, command menu, logo intro, background lattice   |
| [`src/lib`](src/lib/README.md)                     | Shared data (pages, links), theme, dialogs, footer data        |
| `public/`                                          | Photos, project media, skill logos, fonts, resume              |
| `scripts/`                                         | One-off tools (getting the Spotify refresh token)              |

Each folder's README explains how that part works and how to make common changes, like adding a project or a role.
Project terms are defined in [`GLOSSARY.md`](GLOSSARY.md).

## Deploying

The site deploys on Vercel. Set the same environment variables there as in `.env.local`.
