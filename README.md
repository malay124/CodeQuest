# CodeQuest: The World of Code

A browser game that teaches you to code in **real Python** — no installs required.
Explore a world map, uncover regions, talk to NPCs, grow a branching skill tree,
and defeat region bosses by writing and running actual Python code (powered by
[Pyodide](https://pyodide.org/), Python compiled to WebAssembly).

**All six regions are fully playable**, taking you from your very first variable
to writing and training your own linear regression model with real NumPy — a
complete beginner-to-data-scientist curriculum, playable start to finish.

## Play it

Just open [`index.html`](index.html) in a browser — it's a static site with zero
build step. Or serve it locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

It also deploys straight to **GitHub Pages**: Settings → Pages → Deploy from branch →
`main` → `/ (root)`.

On launch you'll see a title screen with **New Game**, **Continue Saved Game**, and
**Exit App** — progress is saved automatically as you play.

## The curriculum

| Region | Topics | Boss |
|---|---|---|
| 🌿 The Verdant Vale | Variables, data types, strings, f-strings | The Mimic Merchant |
| 🧩 The Logic Labyrinth | if/elif/else, comparisons, `and`/`or`/`not`, nested conditionals | The Gatekeeper |
| 🌲 The Looping Wilds | for/while loops, lists, dicts, list comprehensions | The Infinite Hydra |
| 🗼 The Architect's Spire | Functions, default args, `*args`, multiple returns, recursion, debugging | The Broken Golem |
| 🏜️ The Data Dunes | try/except, JSON, classes & objects, structured data | The Archivist |
| 🔮 The AI Citadel | Real NumPy, statistics, feature scaling, gradient descent & evaluation metrics built from scratch | The Oracle |

There's also a bonus quest — **The Scrying Pool** in the Verdant Vale — a sneak
peek of data science/ML concepts (mean, a linear model, classification) playable
from the very start, no prerequisites needed.

## How it works

- **World map** — six regions, one unlocked to start. Defeating a region's boss
  unlocks the next region, all the way to the final boss, The Oracle.
- **Locations & NPCs** — 20 locations across the six regions, each with its own
  NPC and a themed set of quests.
- **Quests** — 39 real Python coding challenges. You write a function, hit
  **Run Code**, and your code executes live in the browser via Pyodide against a
  set of test cases. The AI Citadel's quests load real `numpy` on demand.
- **Skill tree** — every region has its own skill tree (two branches each, plus
  two locked preview branches in the Verdant Vale teasing what's ahead). Skills
  unlock in order and are **mastered** by passing a quest's tests.
- **Hints** — every challenge has progressive hints, from a nudge to the full
  solution. Retries are unlimited — the goal is learning, not punishment.
- **Boss fights** — each region ends with a boss that synthesizes everything
  learned in that region into one multi-function challenge.
- **Save progress** — all progress (mastered skills, completed quests, revealed
  hints, and your in-progress code per quest) is saved to `localStorage` under a
  single save slot, loaded from the title screen's **Continue Saved Game**.

## Project structure

```
index.html        # screens: title, map, region, location, challenge, skill tree
css/style.css      # all styling (dark fantasy/terminal theme)
js/
├── data.js         # regions, locations, skills, branches, quests, challenges & tests
├── save.js          # localStorage persistence
├── pyrunner.js       # loads Pyodide (+ packages like numpy) and runs player code
└── engine.js          # title flow, screen routing, multi-region game logic
```

Adding a new quest is just adding an entry to `QUESTS` in `js/data.js` — starter
code, story text, hints, and a list of `{ call, expected, desc }` test cases —
plus referencing it from a location and (optionally) a skill. No engine changes
needed; the title screen, world map, skill tree, and boss-unlock chain are all
driven generically from this data.
