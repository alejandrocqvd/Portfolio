# `src/app/contact`: the Contact page and the cat game

```
contact/
├── page.jsx        the hero: heading, blurb, email buttons, and the "elsewhere" list
├── CopyButton.jsx  copy-to-clipboard button with a short "copied" confirmation
└── CatRun.jsx      a small pixel-art endless runner starring Jiji the cat
```

## The page

The top half mirrors the Projects hero: text and buttons on the left, links on the right.

- **Buttons.** "Email me" opens a mail draft; "Copy email" uses `CopyButton`.
- **Elsewhere list.** The links come from `elsewhere` in `src/lib/site.js`, so the footer and command menu stay in
  sync. Each row is one big link; profiles show just the handle, since the label already names the site.
- **`CopyButton`.** Icon-only by default; pass `className` and `children` to make a labelled button. It also
  announces "copied" to screen readers through a live region.

## CatRun

An endless runner in the spirit of the browser's offline dinosaur game, drawn on a `<canvas>`. Space, ↑ or a tap
jumps; ↓ ducks (and drops faster mid-air).

### How it draws

- The game works in **game pixels**. The canvas has one real pixel per game pixel and CSS scales it up 4× with
  `image-rendering: pixelated`, which gives the crisp pixel-art look for free.
- **Sprites are strings.** Each row is a line of characters, and each character maps to a colour through a palette:

  ```
  ".............#...#",      # = fur, e = eye, . = empty
  ".............#####",
  ".............#e#e#",
  ```

  To redraw Jiji, the roomba or the butterflies, edit the strings in `CAT`, `ROOMBA` and `BUTTERFLY`. Cucumbers are
  drawn in code (`drawCucumber`) so they can scale to two sizes.
- Most colours come from the site's theme tokens (`readColors`), so the game follows light and dark mode. Jiji's fur,
  her eyes, the roomba's light and the cucumbers use fixed colours, defined at the top of the file.

### How it plays

- **`RULES`** at the top of the file holds every tuning number: speeds, gravity, jump height, gaps between obstacles,
  when cucumber groups, the roomba and butterflies start to appear. Change those to rebalance the game.
- Each frame, the loop moves the world, spawns obstacles when the gap is clear, and checks Jiji's hitbox
  (`catBox`) against each obstacle's box. A hit ends the run.
- The score blinks at every 100. The best score is saved in `localStorage` under `catrun-best`.
- Touch devices never get the middle butterfly height, because that one can only be ducked under with a keyboard.

### Jiji's name card

`JijiName` makes "Jiji" in the heading bold and underlined. Hovering or focusing it shows her photo
(`public/about/jiji.png`) in a small card with a pointer underneath. It's pure CSS (`group-hover`), so it needs no
state.
