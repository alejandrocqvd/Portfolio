# `src/components`: pieces shared by every page

These are mounted once by `src/app/layout.jsx` (or by the navbar and footer) and appear on every page.

| File                   | What it does                                                                |
| ---------------------- | --------------------------------------------------------------------------- |
| `Navbar.jsx`           | Logo, page links, and (on desktop) the command menu and theme toggle        |
| `Footer.jsx`           | Signature, the "right now" strip, page and external links                   |
| `CommandMenu.jsx`      | The ⌘K / Ctrl+K palette: jump to pages and projects, run actions            |
| `DisplayToggle.jsx`    | The light/dark button                                                        |
| `Clock.jsx`            | Calgary's local time in the footer                                          |
| `Loader.jsx`           | The logo intro that plays on every full page load                           |
| `Background.jsx`       | Starts and talks to the background lattice                                  |
| `lattice.worker.js`    | Draws the lattice with WebGL, off the main thread                           |
| `TransitionClicks.jsx` | Lets clicks go through during a page transition                             |

## The intro (`Loader.jsx`)

On a full page load (including a refresh) the logo plays a short sequence: three laps of its 8 blades lighting in turn
like a loading ring. Lap 1 has no A, in lap 2 the A fades in, in lap 3 each blade stays lit as the whole logo glows.
It holds, then glides into the navbar as the page fades in.
Client-side navigation keeps the layout, so the intro doesn't replay.

- It's **CSS only**: the component just renders the logo's paths, and the timing is in `globals.css`.
- **Tune it** with the `--intro-step` (seconds per blade; a lap is 8 steps), `--intro-hold` and `--intro-fade`
  numbers (seconds). The total length, `--intro`, is calculated from them, and anything that should wait for the intro
  reads `--intro`.
- When it's done, `data-intro="skip"` is set on `<html>` (by the home hero, or by the navbar on the first
  navigation) so nothing waits again.
- The intro logo lands exactly on the navbar logo, so `.intro-logo`'s `--slot` must match the navbar's width and
  padding.

## The background lattice

`Background.jsx` creates a canvas and hands it to a Web Worker (`lattice.worker.js`) as an `OffscreenCanvas`, so all
WebGL drawing happens off the main thread and never makes the page janky.

```
Background.jsx  ──messages──▶  lattice.worker.js
  size, theme, visibility        draws a tilted sheet of dots
  { ripple: [x, y] } on click    rings that push dots outward
  { cursor: [x, y] } on move     dots drift away from the mouse
```

- It starts once the page is idle, pauses when off-screen or in a background tab, and stays still under reduced
  motion.
- Clicks only ripple on **bare background**: clicks on text, buttons, images or filled/bordered boxes are ignored
  (`onContent`).
- Tuning lives at the top of the worker: `RIPPLE`, `CURSOR` and `LIGHT_DOT_SCALE`.
- Light mode is the same drawing inverted by CSS, so switching themes needs no redraw.
- Without `OffscreenCanvas` or a real GPU, it falls back to a CSS dot pattern.

## The footer's "right now" strip

`Footer` is a server component. It fetches the location, Calgary weather, my most recent Steam game and Spotify song
through `src/lib/now.js`. Each value can be missing (no key, API down), in which case the footer shows a placeholder.

## The command menu

`CommandMenu` builds its list from `routes` and `elsewhere` (`src/lib/site.js`) and the project catalogue, so adding a
page or project adds it here automatically. It's rendered twice (navbar on desktop, footer on mobile), and only the
visible one answers the shortcut.

## Clicking during page transitions

While a view transition runs, the browser shows a screenshot over the page and swallows clicks. `TransitionClicks`
catches a click on that screenshot, skips the transition and clicks the real link underneath, so links never have to
wait for an animation.
