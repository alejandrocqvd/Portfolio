# `src/app/projects`: the Projects page

```
projects/
├── catalogue.js      all project data: the featured project, the projects, the grid layout, the skill logos
├── page.jsx          the page: featured hero + bento grid, and which project's dialog is open
├── ProjectPopup.jsx  ProjectDialog: the details dialog (media, links, description, tech stack)
└── SkillBox.jsx      one tile in a project's tech-stack row
```

The words used here (Project, Catalogue, Card, Tech stack, Skill) are defined in [`GLOSSARY.md`](../../../GLOSSARY.md).

## Data lives in `catalogue.js`

The page has no hardcoded project text; it all comes from the catalogue.

- **`featuredProject`**: the big project at the top. Like any project, plus a short `blurb` for the hero.
- **`projects`**: a map from an id (`"nullus"`, `"dinodb"`…) to a project. Each project has a `title`, `subtitle`,
  `thumbnail` (card image), `links`, `images` (video files play as videos), `header`, `description` and `techStack`.
- **`projectCards`**: only the *layout* of the bento grid. Each card is `{ id, side }`; the text and image come from
  `projects[id]`.
- **`skills`** and **`stack()`**: `techStack: stack("React", "Tailwind")` looks each name up in the `skills` table to
  find its logo. An unknown name throws, so a typo breaks the build instead of shipping a broken image.

### Adding a project

1. Put its media in `public/work/`.
2. Add an entry to `projects` in `catalogue.js`, using `stack(...)` for the tech stack. If a skill is new, add its
   logo to `public/skills/` and a line to `skills`.
3. Add a card to `projectCards` where you want it in the grid.

It shows up in the command menu (⌘K) automatically.

## The page

```
FeaturedProject   (video poster, blurb, buttons)
BentoRow top      [ large card ][ small ]
                  [            ][ small ]
BentoRow bottom   [ small ][ large card ]
                  [ small ][            ]
```

- `side` lets a card bleed to the screen edge on mobile: that edge loses its border and rounding.
- Clicking a card opens `ProjectDialog`. The open project is kept in the URL as `/projects?p=<id>` (`featured` for
  the featured one), so the command menu can deep-link straight into a project.

## The dialog

`ProjectDialog` is one native `<dialog>` that rearranges itself for mobile and desktop. On desktop the media and tech
stack sit on the left and the text on the right. Thumbnails switch the main media. Opening and closing use the shared
helpers in `src/lib/dialog.js`, which animate the close and return focus to the card.

`SkillBox` tiles show the logo, and the name on hover. Their tint and rounding come from their position in the row,
so a row of any length looks right.
