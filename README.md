# CodeQuest: The World of Code

A browser game that teaches you to code in **real Python** — no installs required.
Explore a world map, uncover regions, talk to NPCs, grow a branching skill tree,
and defeat region bosses by writing and running actual Python code (powered by
[Pyodide](https://pyodide.org/), Python compiled to WebAssembly).

This is the **Version 1 slice**: *The Verdant Vale* (Python foundations — variables,
data types, strings, numbers, and I/O) is fully playable end-to-end. The other five
regions (Logic Labyrinth, Looping Wilds, Architect's Spire, Data Dunes, AI Citadel)
are visible on the world map as locked lands, showing where the game is headed.

## Play it

Just open [`index.html`](index.html) in a browser — it's a static site with zero
build step. Or serve it locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

It also deploys straight to **GitHub Pages**: Settings → Pages → Deploy from branch →
`main` → `/ (root)`.

## How it works

- **World map** — six regions, one unlocked to start. Defeating a region's boss
  unlocks the next region.
- **Regions** — the Verdant Vale has four locations (Village Square, Potion Hut,
  Merchant's Stall, Forest's Edge) each with an NPC and a set of quests.
- **Quests** — every quest is a real Python coding challenge. You write a function,
  hit **Run Code**, and your code executes live in the browser via Pyodide against
  a set of test cases.
- **Skill tree** — two playable branches (*Apprentice of Code*, *Potioncraft*) with
  three skills each. Skills unlock in order and are **mastered** by passing a
  quest's tests. Two more branches (*Decision Magic*, *Inventory*) are shown
  locked, previewing skills that awaken in later regions.
- **Hints** — every challenge has three progressive hints, from a nudge to the full
  solution. Retries are unlimited — the goal is learning, not punishment.
- **Boss fight** — the Mimic Merchant at Forest's Edge combines everything learned
  in the Vale into one final two-function challenge. Beating it unlocks the Logic
  Labyrinth on the world map.
- **Save progress** — all progress (mastered skills, completed quests, revealed
  hints, and your in-progress code) is saved to `localStorage`, so you can close
  the tab and pick up where you left off.

## Project structure

```
index.html        # screens: map, region, location, challenge, skill tree
css/style.css      # all styling (dark fantasy/terminal theme)
js/
├── data.js         # regions, locations, skills, quests, challenges & tests
├── save.js          # localStorage persistence
├── pyrunner.js       # loads Pyodide and runs player code against tests
└── engine.js          # screen routing & game logic
```

Adding a new quest is just adding an entry to `QUESTS` in `js/data.js` — starter
code, story text, three hints, and a list of `{ call, expected, desc }` test cases.
No extra wiring needed.

## Roadmap

See the in-game world map for the full vision: five more regions (Logic Labyrinth,
Looping Wilds, Architect's Spire, Data Dunes, AI Citadel), each with its own skill
tree branches, locations, and a signature boss that tests that region's concepts —
building up from conditionals and loops to functions, file/data handling, and
finally applied AI programming.
