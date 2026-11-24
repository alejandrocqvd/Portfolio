# `src/app/about`: the Timeline page

The About page tells the story of where I've worked and studied. Everything lives in one file, `Timeline.jsx`, with
`page.jsx` just rendering it.

```
Timeline
├── intro heading and blurb
├── PhotoStrip      four photos, one featured
├── YearTrack       the chart: one lane per role on a shared year axis
├── RolePanel       details of the selected role
└── resume link
```

## The data

All roles are in the `timelineItems` array at the top of `Timeline.jsx`. Each entry has:

| Field         | What it's for                                                  |
| ------------- | -------------------------------------------------------------- |
| `company`     | Panel heading                                                  |
| `short`       | The short label on the left of the lane                        |
| `role`        | Job title, shown under the heading                             |
| `period`      | `"Sep 2021 - Now"` style text. Containing "Now" means current |
| `description` | Bullet points in the panel                                     |

**To add a role,** add an entry to `timelineItems`. The chart, axis, ordering and durations all update on their own.

## How the chart is built

`useLanes()` turns the text periods into positions:

```
"May 2023 - Aug 2023"  →  months (year × 12 + month)  →  % along the axis
```

- Dates are counted in whole months. A period is inclusive, so a bar runs to the end of its last month.
- A current role ("Now") runs to the end of this month. This keeps the server and browser renders identical for the
  whole month (no hydration mismatch).
- The axis runs from January of the earliest year to January of next year. Lanes are sorted oldest first.

## The chart is a set of tabs

Each lane is an ARIA tab and the panel below is its tab panel, so the chart works for keyboards and screen readers:

- The whole row is clickable, not just the bar, so short roles are easy to hit.
- Selection happens on press, not release, so it feels instant.
- Arrow keys move between lanes and Home/End jump to the ends.

Visual cues for the selected lane: a solid bar, a bright label and a blinking ▶ marker to its left. Current roles use
the accent colour. Bars are rounded, except the right end of a bar that touches the "Now" line.

## PhotoStrip

An accordion of four photos: the featured one takes most of the width and the others shrink to slivers. Hovering a
sliver with a mouse (or tapping it on touch) makes it the featured one, and the widths animate over 400 ms.

## Motion

- Bars grow in one after another once the intro has finished (`.year-bar` in `globals.css`, timed off `--intro`).
- The panel content fades up when the selection changes (`.role-in`).
- The marker blinks like a terminal cursor (`.lane-marker`).

All three are switched off under reduced motion.
