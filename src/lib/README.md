# `src/lib`: shared data and helpers

Small, UI-free modules used by components across the site.

| File           | Runs on        | What it provides                                                     |
| -------------- | -------------- | -------------------------------------------------------------------- |
| `site.js`      | both           | `email`, `routes`, `elsewhere`: the site's pages and external links  |
| `display.js`   | browser        | `useTheme()` and `toggleTheme()`                                     |
| `dialog.js`    | browser        | `openDialog()` and `closeDialog()` for native `<dialog>` elements    |
| `now.js`       | server         | The footer's "right now" data: location, weather, game, song        |
| `signature.js` | server (build) | The signature path drawn in the footer                               |
| `seo.js`       | server         | `pageMetadata()` for titles, descriptions, canonicals and link previews; the Person JSON-LD |

## `site.js`: one list of pages and links

The navbar, footer, command menu and contact page all read from here. To add a page to the navigation or a new
profile link, change it once in this file.

## `display.js`: the theme

The theme is a `data-theme` attribute on `<html>`, set before first paint by the inline script in
`src/app/layout.jsx`.

- **`useTheme()`** reads it in React. It returns `null` on the server and during hydration, so the server and browser
  markup always match.
- **`toggleTheme(origin)`** is the only way the theme should change. It saves the choice and plays the reveal: a
  feathered circle grows from the toggle button using a view transition. The CSS half of the effect is in
  `globals.css`. Under reduced motion it switches instantly.

## `dialog.js`: dialogs that animate out

Browsers can't animate a `<dialog>` closing everywhere yet, so `closeDialog` marks the dialog `data-closing`, waits
for its CSS transition to finish, and only then closes it. `openDialog` remembers which element had focus and
`closeDialog` puts focus back there (Safari doesn't do this by itself). Used by the command menu and the project
dialog.

## `now.js`: "right now" data

Each getter runs on the server, so API keys never reach the browser, and returns `null` on any failure, missing key or
slow response. The footer then shows its placeholder.

| Getter            | Source                         | Needs                                                               |
| ----------------- | ------------------------------ | ------------------------------------------------------------------- |
| `getLocation()`   | fixed text                     | none                                                                |
| `getWeather()`    | Open-Meteo                     | none                                                                |
| `getRecentGame()` | Steam Web API                  | `STEAM_API_KEY`, `STEAM_ID`                                         |
| `getRecentSong()` | Spotify (recently played)      | `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` |

See `.env.example` for setup. The Spotify refresh token is created once with `scripts/spotify-token.mjs`. Pages
revalidate every 5 minutes, so these APIs are called a few times an hour, not on every visit.

## `seo.js`: search and link previews

Every page calls `pageMetadata({ path, title, description })`, which returns the page's title, description, canonical
URL and Open Graph / Twitter tags in one go. Next replaces a parent's `openGraph` object instead of merging it, so the
helper always builds the whole thing, share image included. `personJsonLd` describes me as a schema.org Person
(LinkedIn and GitHub come from `site.js`) and is rendered in the root layout.

## `signature.js`

Reads `public/misc/signature.svg` when the server builds the page and exports its path and viewBox, so the footer can
draw the signature inline in the current text colour.
