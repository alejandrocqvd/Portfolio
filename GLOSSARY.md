# Glossary

- **Project**: one piece of work shown on `/projects`: title, subtitle, thumbnail, links, media, description, tech stack.
- **Catalogue**: `src/app/projects/catalogue.js`, the single place every project is described. Views read from it; they never restate project facts.
- **Featured project**: the project in the hero section at the top of `/projects`. It has an extra `blurb`.
- **Card**: a bento-grid tile that opens a project's popup. It holds only layout (`id`, `side`, `fade`); its text and image come from the project.
- **Tech stack**: the ordered row of skills on a project. Shade and rounding come from position, not data.
- **Skill**: a technology with a logo, defined once in the catalogue's `skills` table and referenced by name.
