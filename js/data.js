/* ============================================================
   CodeQuest: The World of Code — Game Content Data
   Version 1 scope: The Verdant Vale is fully playable.
   The other five regions are visible on the map but locked,
   to show the full vision of the game.
   ============================================================ */

const REGIONS = [
  {
    id: "verdant-vale",
    name: "The Verdant Vale",
    subtitle: "Python Foundations · Levels 1–5",
    blurb: "Variables, data types, strings, numbers, and basic input/output.",
    color: "#4caf7d",
    unlocked: true,
    mapPos: { x: 15, y: 62 },
  },
  {
    id: "logic-labyrinth",
    name: "The Logic Labyrinth",
    subtitle: "Decisions & Logic · Levels 5–10",
    blurb: "Boolean logic, comparisons, if/else, and nested conditions.",
    color: "#7c6fe0",
    unlocked: false,
    requires: "verdant-vale",
    mapPos: { x: 32, y: 40 },
  },
  {
    id: "looping-wilds",
    name: "The Looping Wilds",
    subtitle: "Repetition & Collections · Levels 10–15",
    blurb: "for loops, while loops, lists, and dictionaries.",
    color: "#3fa7d6",
    unlocked: false,
    requires: "logic-labyrinth",
    mapPos: { x: 50, y: 58 },
  },
  {
    id: "architects-spire",
    name: "The Architect's Spire",
    subtitle: "Functions & Design · Levels 15–20",
    blurb: "Functions, parameters, return values, modules, and debugging.",
    color: "#e0a23f",
    unlocked: false,
    requires: "looping-wilds",
    mapPos: { x: 66, y: 36 },
  },
  {
    id: "data-dunes",
    name: "The Data Dunes",
    subtitle: "Data Handling · Levels 20–25",
    blurb: "Files, structured data, JSON, error handling, and APIs.",
    color: "#d68c45",
    unlocked: false,
    requires: "architects-spire",
    mapPos: { x: 80, y: 58 },
  },
  {
    id: "ai-citadel",
    name: "The AI Citadel",
    subtitle: "Applied Programming & AI · Level 25+",
    blurb: "External libraries, APIs, introductory ML, and AI agents.",
    color: "#c061d6",
    unlocked: false,
    requires: "data-dunes",
    mapPos: { x: 90, y: 32 },
  },
];

/* ---------- Skill Tree (Verdant Vale) ---------- */
/* States are derived at runtime: locked / available / mastered.
   A skill becomes AVAILABLE once its prerequisites are mastered.
   A skill becomes MASTERED once its linked quest challenge is passed. */

const SKILLS = [
  // --- Apprentice of Code branch ---
  {
    id: "skill.variables",
    branch: "apprentice",
    name: "Name a Value",
    desc: "Learn to store values in variables.",
    requires: [],
    quest: "q.village.variables",
  },
  {
    id: "skill.types",
    branch: "apprentice",
    name: "Shape of Data",
    desc: "Tell strings, integers, floats, and booleans apart.",
    requires: ["skill.variables"],
    quest: "q.village.types",
  },
  {
    id: "skill.io",
    branch: "apprentice",
    name: "Speak & Listen",
    desc: "Use print() and input() to talk with the world.",
    requires: ["skill.types"],
    quest: "q.village.io",
  },

  // --- Potioncraft branch (numbers & strings) ---
  {
    id: "skill.arithmetic",
    branch: "potioncraft",
    name: "Measure the Brew",
    desc: "Combine numbers with +, -, *, /, // and %.",
    requires: [],
    quest: "q.potion.arithmetic",
  },
  {
    id: "skill.strings",
    branch: "potioncraft",
    name: "Bind Words Together",
    desc: "Concatenate and format strings.",
    requires: ["skill.arithmetic"],
    quest: "q.potion.strings",
  },
  {
    id: "skill.fstrings",
    branch: "potioncraft",
    name: "Whisper of Formatting",
    desc: "Use f-strings to weave variables into text.",
    requires: ["skill.strings"],
    quest: "q.potion.fstrings",
  },

  // --- Decision Magic branch: a locked preview of the next region ---
  {
    id: "skill.decision.preview",
    branch: "decision",
    name: "First Glimpse of Logic",
    desc: "A sealed door. This skill awakens in the Logic Labyrinth.",
    requires: ["skill.io", "skill.fstrings"],
    quest: null,
    regionLocked: "logic-labyrinth",
  },

  // --- Inventory branch: another locked preview ---
  {
    id: "skill.inventory.preview",
    branch: "inventory",
    name: "Echoes of Collections",
    desc: "A sealed door. This skill awakens in the Looping Wilds.",
    requires: ["skill.io", "skill.fstrings"],
    quest: null,
    regionLocked: "looping-wilds",
  },
];

const BRANCHES = [
  { id: "apprentice", name: "Apprentice of Code", desc: "Variables and data types" },
  { id: "potioncraft", name: "Potioncraft", desc: "Numbers and strings" },
  { id: "decision", name: "Decision Magic", desc: "Conditions (unlocks later)" },
  { id: "inventory", name: "Inventory", desc: "Lists and data (unlocks later)" },
];

/* ---------- Locations in the Verdant Vale ---------- */

const LOCATIONS = [
  {
    id: "loc.village",
    name: "Village Square",
    npc: "Elder Py",
    npcArt: "🧙",
    intro:
      "Welcome, traveler. This village runs on old magic that looks a lot like... code. " +
      "If you want to help us, you'll need to learn how it speaks.",
    quests: ["q.village.variables", "q.village.types", "q.village.io"],
  },
  {
    id: "loc.potionhut",
    name: "Potion Hut",
    npc: "Brewmaster Tansy",
    npcArt: "🧪",
    intro:
      "Every potion is just numbers and words mixed in the right order. " +
      "Prove you can measure and blend them, and I'll teach you the old recipes.",
    quests: ["q.potion.arithmetic", "q.potion.strings", "q.potion.fstrings"],
  },
  {
    id: "loc.market",
    name: "Merchant's Stall",
    npc: "Tomlin the Trader",
    npcArt: "🛒",
    intro:
      "Business is business. Help me get my numbers straight and I'll owe you a favor " +
      "— and the road out of the Vale will open.",
    quests: ["q.market.inventory"],
  },
  {
    id: "loc.scryingpool",
    name: "The Scrying Pool",
    npc: "The Wandering Oracle",
    npcArt: "🔮",
    intro:
      "Far off the usual paths, a pool of starlight ripples at your feet. A voice rises from within it: " +
      "\"I am an echo of the Oracle who guards the AI Citadel, many regions from here. Before you journey on, " +
      "let me show you a glimpse of what awaits — the craft of data science and machine learning.\"\n\n" +
      "✨ Bonus quest — a sneak peek of the AI Citadel, playable right now.",
    quests: ["q.oracle.datascience"],
  },
  {
    id: "loc.forestedge",
    name: "Forest's Edge",
    npc: "The Mimic Merchant",
    npcArt: "👹",
    intro:
      "A shimmering figure blocks the path out of the Vale, wearing the Trader's face. " +
      "Something about it is... copied. Wrong. This is the boss of the Verdant Vale.",
    quests: ["boss.mimic-merchant"],
    isBoss: true,
  },
];

/* ============================================================
   Quests / Coding Challenges
   Each challenge gives the player a function to complete.
   We run their code with Python (via Pyodide) and check the
   function's behavior against test cases.
   ============================================================ */

const QUESTS = {
  "q.village.variables": {
    id: "q.village.variables",
    title: "Name a Value",
    skill: "skill.variables",
    location: "loc.village",
    story:
      "Elder Py hands you a cracked lantern. \"This lantern runs on a variable called `brightness`. " +
      "Write a function that creates a variable `brightness` set to 10, then returns it.\"",
    starter:
`def light_lantern():
    # 1. Create a variable called brightness and set it to 10
    # 2. Return brightness

    pass
`,
    hints: [
      "A variable is created with `name = value`. Try `brightness = 10`.",
      "Don't forget to `return brightness` at the end of the function.",
      "Full solution:\n\ndef light_lantern():\n    brightness = 10\n    return brightness",
    ],
    tests: [
      { call: "light_lantern()", expected: 10, desc: "light_lantern() should return 10" },
    ],
  },

  "q.village.types": {
    id: "q.village.types",
    title: "Shape of Data",
    skill: "skill.types",
    location: "loc.village",
    story:
      "\"Not everything in this village is a number,\" says Elder Py. \"Write a function `identify(value)` " +
      "that returns the *name* of the value's type as a string: `'int'`, `'float'`, `'str'`, or `'bool'`.\"",
    starter:
`def identify(value):
    # Return the type of 'value' as a string: 'int', 'float', 'str', or 'bool'
    # Hint: type(value).__name__ gives you exactly that.

    pass
`,
    hints: [
      "Python's built-in `type()` function tells you an object's type: `type(5)` is `int`.",
      "`type(value).__name__` turns that type into a readable string like `'int'`.",
      "Full solution:\n\ndef identify(value):\n    return type(value).__name__",
    ],
    tests: [
      { call: "identify(5)", expected: "int", desc: "identify(5) should return 'int'" },
      { call: "identify(5.5)", expected: "float", desc: "identify(5.5) should return 'float'" },
      { call: "identify('hi')", expected: "str", desc: "identify('hi') should return 'str'" },
      { call: "identify(True)", expected: "bool", desc: "identify(True) should return 'bool'" },
    ],
  },

  "q.village.io": {
    id: "q.village.io",
    title: "Speak & Listen",
    skill: "skill.io",
    location: "loc.village",
    story:
      "\"A proper villager greets visitors by name,\" says Elder Py. \"Write a function `greet(name)` that " +
      "returns the string `'Hello, <name>! Welcome to the Verdant Vale.'`\"",
    starter:
`def greet(name):
    # Return: "Hello, <name>! Welcome to the Verdant Vale."

    pass
`,
    hints: [
      "You can build the string with + or with an f-string: f\"Hello, {name}! ...\"",
      "Match the punctuation exactly: a comma after Hello, an exclamation mark after the name.",
      "Full solution:\n\ndef greet(name):\n    return f\"Hello, {name}! Welcome to the Verdant Vale.\"",
    ],
    tests: [
      {
        call: "greet('Ada')",
        expected: "Hello, Ada! Welcome to the Verdant Vale.",
        desc: "greet('Ada') should greet Ada correctly",
      },
      {
        call: "greet('Rin')",
        expected: "Hello, Rin! Welcome to the Verdant Vale.",
        desc: "greet('Rin') should greet Rin correctly",
      },
    ],
  },

  "q.potion.arithmetic": {
    id: "q.potion.arithmetic",
    title: "Measure the Brew",
    skill: "skill.arithmetic",
    location: "loc.potionhut",
    story:
      "\"A potion needs exactly the right measure,\" says Tansy. \"Write `brew_strength(base, catalyst)` " +
      "that returns `base * 2 + catalyst`.\"",
    starter:
`def brew_strength(base, catalyst):
    # Return base * 2 + catalyst

    pass
`,
    hints: [
      "Multiplication is `*`, addition is `+`. Python follows the normal order of operations.",
      "Try: `return base * 2 + catalyst`",
      "Full solution:\n\ndef brew_strength(base, catalyst):\n    return base * 2 + catalyst",
    ],
    tests: [
      { call: "brew_strength(3, 1)", expected: 7, desc: "brew_strength(3, 1) should be 7" },
      { call: "brew_strength(5, 0)", expected: 10, desc: "brew_strength(5, 0) should be 10" },
      { call: "brew_strength(0, 4)", expected: 4, desc: "brew_strength(0, 4) should be 4" },
    ],
  },

  "q.potion.strings": {
    id: "q.potion.strings",
    title: "Bind Words Together",
    skill: "skill.strings",
    location: "loc.potionhut",
    story:
      "\"A label needs a name and an ingredient,\" says Tansy. \"Write `label(name, ingredient)` that returns " +
      "`name + \"'s Potion of \" + ingredient` — using the + operator to join strings.\"",
    starter:
`def label(name, ingredient):
    # Return name + "'s Potion of " + ingredient

    pass
`,
    hints: [
      "String concatenation uses +, just like numbers, but joins text instead of adding it.",
      "Watch the exact text: \"'s Potion of \" has a leading apostrophe-s and spaces on both sides.",
      "Full solution:\n\ndef label(name, ingredient):\n    return name + \"'s Potion of \" + ingredient",
    ],
    tests: [
      {
        call: "label('Tansy', 'Courage')",
        expected: "Tansy's Potion of Courage",
        desc: "label('Tansy', 'Courage') should be \"Tansy's Potion of Courage\"",
      },
      {
        call: "label('Rin', 'Fire')",
        expected: "Rin's Potion of Fire",
        desc: "label('Rin', 'Fire') should be \"Rin's Potion of Fire\"",
      },
    ],
  },

  "q.potion.fstrings": {
    id: "q.potion.fstrings",
    title: "Whisper of Formatting",
    skill: "skill.fstrings",
    location: "loc.potionhut",
    story:
      "\"The old recipes use a cleaner magic,\" says Tansy. \"Write `describe(name, strength)` that returns " +
      "`f\"{name} brews at strength {strength}.\"` using an f-string.\"",
    starter:
`def describe(name, strength):
    # Return an f-string: "{name} brews at strength {strength}."

    pass
`,
    hints: [
      "An f-string starts with `f\"...\"` and lets you drop variables inside `{}`.",
      "Try: `return f\"{name} brews at strength {strength}.\"`",
      "Full solution:\n\ndef describe(name, strength):\n    return f\"{name} brews at strength {strength}.\"",
    ],
    tests: [
      {
        call: "describe('Ember', 7)",
        expected: "Ember brews at strength 7.",
        desc: "describe('Ember', 7) should describe strength 7",
      },
      {
        call: "describe('Frost', 3)",
        expected: "Frost brews at strength 3.",
        desc: "describe('Frost', 3) should describe strength 3",
      },
    ],
  },

  "q.market.inventory": {
    id: "q.market.inventory",
    title: "Balance the Ledger",
    skill: null,
    location: "loc.market",
    story:
      "\"Three carts of apples at a price each — what's my total?\" asks Tomlin. \"Write " +
      "`total_cost(quantity, price)` that returns the total as a float.\"",
    starter:
`def total_cost(quantity, price):
    # Return quantity * price

    pass
`,
    hints: [
      "Multiply the two numbers together.",
      "Try: `return quantity * price`",
      "Full solution:\n\ndef total_cost(quantity, price):\n    return quantity * price",
    ],
    tests: [
      { call: "total_cost(3, 2.5)", expected: 7.5, desc: "total_cost(3, 2.5) should be 7.5" },
      { call: "total_cost(10, 1.2)", expected: 12.0, desc: "total_cost(10, 1.2) should be 12.0" },
    ],
  },

  "q.oracle.datascience": {
    id: "q.oracle.datascience",
    title: "Teach the Oracle to See",
    skill: null,
    location: "loc.scryingpool",
    story:
      "The pool shows you three visions of the AI Citadel's craft — the heart of data science and machine learning.\n\n" +
      "1. Every model starts by understanding its data. Write `mean(values)` that returns the average of a list of numbers.\n\n" +
      "2. Every model makes predictions from patterns. Write `predict(x, weight, bias)` that returns " +
      "`weight * x + bias` — the simplest possible machine learning model: a straight line.\n\n" +
      "3. Every model turns a number into a decision. Write `classify(prediction, threshold)` that returns " +
      "`'yes'` if `prediction >= threshold`, otherwise `'no'`.",
    starter:
`def mean(values):
    # Return the average of the list 'values'
    # (data science starts with understanding your data)

    pass


def predict(x, weight, bias):
    # Return weight * x + bias
    # (a simple linear model — the same shape as y = mx + b)

    pass


def classify(prediction, threshold):
    # Return 'yes' if prediction >= threshold, otherwise 'no'
    # (turning a model's output into a decision)

    pass
`,
    hints: [
      "mean(values) = sum(values) / len(values). Python's built-in sum() and len() do the heavy lifting.",
      "predict is one line: weight * x + bias — just like y = mx + b from math class.",
      "classify needs a conditional: return 'yes' if prediction >= threshold else 'no'.",
      "Full solution:\n\ndef mean(values):\n    return sum(values) / len(values)\n\n\ndef predict(x, weight, bias):\n    return weight * x + bias\n\n\ndef classify(prediction, threshold):\n    return 'yes' if prediction >= threshold else 'no'",
    ],
    tests: [
      { call: "mean([2, 4, 6])", expected: 4, desc: "mean([2, 4, 6]) should be 4" },
      { call: "mean([1, 2, 3, 4])", expected: 2.5, desc: "mean([1, 2, 3, 4]) should be 2.5" },
      { call: "predict(3, 2, 1)", expected: 7, desc: "predict(3, 2, 1) should be 7 (2*3 + 1)" },
      { call: "predict(0, 5, 10)", expected: 10, desc: "predict(0, 5, 10) should be 10" },
      { call: "classify(0.8, 0.5)", expected: "yes", desc: "classify(0.8, 0.5) should be 'yes'" },
      { call: "classify(0.2, 0.5)", expected: "no", desc: "classify(0.2, 0.5) should be 'no'" },
    ],
  },

  "boss.mimic-merchant": {
    id: "boss.mimic-merchant",
    title: "Boss: The Mimic Merchant",
    skill: null,
    location: "loc.forestedge",
    isBoss: true,
    story:
      "The Mimic Merchant grins with too many teeth. \"I can copy ANYTHING... but I get the details wrong. " +
      "Fix my spell before it unravels!\"\n\n" +
      "Write `cast_ward(name, charges)` that returns the exact string:\n" +
      "`f\"{name}'s ward holds for {charges} charges.\"`\n\n" +
      "Then write `recharge(charges, amount)` that returns `charges + amount` as the new charge count.\n\n" +
      "Both functions must work for the ward to hold — this challenge checks everything you've learned " +
      "in the Verdant Vale: variables, types, strings, f-strings, and arithmetic.",
    starter:
`def cast_ward(name, charges):
    # Return f"{name}'s ward holds for {charges} charges."

    pass


def recharge(charges, amount):
    # Return charges + amount

    pass
`,
    hints: [
      "This is two functions in one challenge — make sure both are filled in.",
      "cast_ward is an f-string, just like in Potioncraft. recharge is simple addition.",
      "Full solution:\n\ndef cast_ward(name, charges):\n    return f\"{name}'s ward holds for {charges} charges.\"\n\n\ndef recharge(charges, amount):\n    return charges + amount",
    ],
    tests: [
      {
        call: "cast_ward('Ada', 3)",
        expected: "Ada's ward holds for 3 charges.",
        desc: "cast_ward('Ada', 3) should describe the ward",
      },
      {
        call: "recharge(3, 2)",
        expected: 5,
        desc: "recharge(3, 2) should be 5",
      },
      {
        call: "recharge(10, 0)",
        expected: 10,
        desc: "recharge(10, 0) should be 10",
      },
    ],
  },
};
