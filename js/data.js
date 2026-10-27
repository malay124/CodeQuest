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
    bossQuestId: "boss.mimic-merchant",
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
    bossQuestId: "boss.gatekeeper",
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
    bossQuestId: "boss.hydra",
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
    bossQuestId: "boss.golem",
  },
  {
    id: "data-dunes",
    name: "The Data Dunes",
    subtitle: "Data Handling · Levels 20–25",
    blurb: "Files, structured data, JSON, error handling, and classes.",
    color: "#d68c45",
    unlocked: false,
    requires: "architects-spire",
    mapPos: { x: 80, y: 58 },
    bossQuestId: "boss.archivist",
  },
  {
    id: "ai-citadel",
    name: "The AI Citadel",
    subtitle: "Data Science & Machine Learning · Level 25+",
    blurb: "NumPy, statistics, and building & evaluating ML models from scratch.",
    color: "#c061d6",
    unlocked: false,
    requires: "data-dunes",
    mapPos: { x: 90, y: 32 },
    bossQuestId: "boss.oracle",
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

  // --- Logic Labyrinth: Branching Paths ---
  { id: "skill.ifelse", branch: "branching", name: "Choose a Path", desc: "if / elif / else", requires: [], quest: "q.logic.ifelse" },
  { id: "skill.comparisons", branch: "branching", name: "Measure the Gap", desc: "Comparison operators", requires: ["skill.ifelse"], quest: "q.logic.comparisons" },
  { id: "skill.nested", branch: "branching", name: "Guarded Door", desc: "Nested conditionals", requires: ["skill.comparisons"], quest: "q.logic.nested" },
  // --- Logic Labyrinth: Boolean Magic ---
  { id: "skill.and", branch: "boolmagic", name: "Bind Two Truths", desc: "The `and` operator", requires: [], quest: "q.logic.and" },
  { id: "skill.or_not", branch: "boolmagic", name: "Either Will Do", desc: "The `or` and `not` operators", requires: ["skill.and"], quest: "q.logic.or_not" },

  // --- Looping Wilds: Loopcraft ---
  { id: "skill.for_loop", branch: "loopcraft", name: "Count the Logs", desc: "for loops", requires: [], quest: "q.loop.for_sum" },
  { id: "skill.while_loop", branch: "loopcraft", name: "Watch the Gate", desc: "while loops", requires: ["skill.for_loop"], quest: "q.loop.while_count" },
  // --- Looping Wilds: Collector's Eye ---
  { id: "skill.list_basics", branch: "collector", name: "Sort the Supplies", desc: "Lists: append & iterate", requires: [], quest: "q.loop.list_basics" },
  { id: "skill.dict_basics", branch: "collector", name: "Tally the Beasts", desc: "Dictionaries", requires: ["skill.list_basics"], quest: "q.loop.dict_basics" },
  { id: "skill.listcomp", branch: "collector", name: "Swift Gathering", desc: "List comprehensions", requires: ["skill.dict_basics"], quest: "q.loop.listcomp" },

  // --- Architect's Spire: Spellcraft ---
  { id: "skill.function_basics", branch: "spellcraft", name: "Forge a Tool", desc: "Functions, params, defaults", requires: [], quest: "q.arch.function_basics" },
  { id: "skill.multiple_returns", branch: "spellcraft", name: "Twin Blades", desc: "Returning multiple values", requires: ["skill.function_basics"], quest: "q.arch.multiple_returns" },
  { id: "skill.args_kwargs", branch: "spellcraft", name: "Gather the Party", desc: "*args", requires: ["skill.multiple_returns"], quest: "q.arch.args_kwargs" },
  // --- Architect's Spire: Blueprint ---
  { id: "skill.recursion", branch: "blueprint", name: "Echoing Halls", desc: "Recursive functions", requires: [], quest: "q.arch.recursion" },
  { id: "skill.debugging", branch: "blueprint", name: "Fix the Golem", desc: "Reading errors & debugging", requires: ["skill.recursion"], quest: "q.arch.debugging" },

  // --- Data Dunes: Archives ---
  { id: "skill.tryexcept", branch: "archives", name: "Guard Against Chaos", desc: "try / except", requires: [], quest: "q.data.tryexcept" },
  { id: "skill.keyerror", branch: "archives", name: "Read the Scroll", desc: "Safe dict access", requires: ["skill.tryexcept"], quest: "q.data.keyerror" },
  { id: "skill.json", branch: "archives", name: "Decode the Archive", desc: "JSON parsing", requires: ["skill.keyerror"], quest: "q.data.json" },
  // --- Data Dunes: Constructs ---
  { id: "skill.class_basics", branch: "constructs", name: "Build a Construct", desc: "Classes & objects", requires: [], quest: "q.data.class_basics" },
  { id: "skill.listofdicts", branch: "constructs", name: "Cross-Reference", desc: "Searching structured records", requires: ["skill.class_basics"], quest: "q.data.listofdicts" },

  // --- AI Citadel: Numeric Arrays ---
  { id: "skill.numpy_array", branch: "arrays", name: "Summon the Array", desc: "NumPy arrays", requires: [], quest: "q.ai.numpy_array" },
  { id: "skill.numpy_stats", branch: "arrays", name: "Measure the Cosmos", desc: "Mean & standard deviation", requires: ["skill.numpy_array"], quest: "q.ai.numpy_stats" },
  { id: "skill.vectorized_ops", branch: "arrays", name: "Align the Stars", desc: "Feature scaling", requires: ["skill.numpy_stats"], quest: "q.ai.vectorized_ops" },
  // --- AI Citadel: Model Building ---
  { id: "skill.gradient_step", branch: "modeling", name: "Train the Oracle", desc: "Gradient descent, by hand", requires: [], quest: "q.ai.gradient_step" },
  { id: "skill.accuracy", branch: "modeling", name: "Judge the Prophecy", desc: "Evaluation metrics", requires: ["skill.gradient_step"], quest: "q.ai.accuracy" },
];

const BRANCHES = [
  { id: "apprentice", region: "verdant-vale", name: "Apprentice of Code", desc: "Variables and data types" },
  { id: "potioncraft", region: "verdant-vale", name: "Potioncraft", desc: "Numbers and strings" },
  { id: "decision", region: "verdant-vale", name: "Decision Magic", desc: "Conditions (unlocks later)" },
  { id: "inventory", region: "verdant-vale", name: "Inventory", desc: "Lists and data (unlocks later)" },

  { id: "branching", region: "logic-labyrinth", name: "Branching Paths", desc: "if / elif / else" },
  { id: "boolmagic", region: "logic-labyrinth", name: "Boolean Magic", desc: "and, or, not, comparisons" },

  { id: "loopcraft", region: "looping-wilds", name: "Loopcraft", desc: "for and while loops" },
  { id: "collector", region: "looping-wilds", name: "Collector's Eye", desc: "Lists, dicts, comprehensions" },

  { id: "spellcraft", region: "architects-spire", name: "Spellcraft", desc: "Functions, params, defaults" },
  { id: "blueprint", region: "architects-spire", name: "Blueprint", desc: "Recursion & debugging" },

  { id: "archives", region: "data-dunes", name: "Archives", desc: "Errors, JSON, structured data" },
  { id: "constructs", region: "data-dunes", name: "Constructs", desc: "Classes & objects" },

  { id: "arrays", region: "ai-citadel", name: "Numeric Arrays", desc: "NumPy & statistics" },
  { id: "modeling", region: "ai-citadel", name: "Model Building", desc: "ML from scratch" },
];

/* ---------- Locations ---------- */

const LOCATIONS = [
  // ===== The Verdant Vale =====
  {
    id: "loc.village",
    region: "verdant-vale",
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
    region: "verdant-vale",
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
    region: "verdant-vale",
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
    region: "verdant-vale",
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
    region: "verdant-vale",
    name: "Forest's Edge",
    npc: "The Mimic Merchant",
    npcArt: "👹",
    intro:
      "A shimmering figure blocks the path out of the Vale, wearing the Trader's face. " +
      "Something about it is... copied. Wrong. This is the boss of the Verdant Vale.",
    quests: ["boss.mimic-merchant"],
    isBoss: true,
  },

  // ===== The Logic Labyrinth =====
  {
    id: "loc.crossroads",
    region: "logic-labyrinth",
    name: "Crossroads Chamber",
    npc: "Keeper of Paths",
    npcArt: "🧭",
    intro:
      "Every hallway here forks. \"Choose wrong and you'll walk in circles forever,\" the Keeper warns. " +
      "\"Learn to make the Labyrinth choose for you.\"",
    quests: ["q.logic.ifelse", "q.logic.comparisons", "q.logic.nested"],
  },
  {
    id: "loc.mirrorhall",
    region: "logic-labyrinth",
    name: "Hall of Mirrors",
    npc: "Echo the Twin",
    npcArt: "🪞",
    intro:
      "Two reflections speak at once — one true, one false. \"Only those who master `and`, `or`, and `not` " +
      "can tell us apart,\" they say together.",
    quests: ["q.logic.and", "q.logic.or_not"],
  },
  {
    id: "loc.vault",
    region: "logic-labyrinth",
    name: "The Gatekeeper's Vault",
    npc: "The Gatekeeper",
    npcArt: "🗝️",
    intro:
      "A towering guardian made of locks and levers blocks the exit. This is the boss of the Logic Labyrinth.",
    quests: ["boss.gatekeeper"],
    isBoss: true,
  },

  // ===== The Looping Wilds =====
  {
    id: "loc.lumbercamp",
    region: "looping-wilds",
    name: "Lumber Camp",
    npc: "Foreman Birch",
    npcArt: "🪓",
    intro:
      "\"We cut logs the same way, over and over,\" says Birch. \"That's what loops are for — doing one " +
      "thing many times without writing it out by hand.\"",
    quests: ["q.loop.for_sum", "q.loop.while_count"],
  },
  {
    id: "loc.beastpens",
    region: "looping-wilds",
    name: "Beast Pens",
    npc: "Warden Sable",
    npcArt: "🐾",
    intro:
      "\"Every beast here needs tracking — by list, and by count,\" Sable says, gesturing at pens full of " +
      "creatures. \"Lists and dictionaries are how we keep order.\"",
    quests: ["q.loop.list_basics", "q.loop.dict_basics", "q.loop.listcomp"],
  },
  {
    id: "loc.hydraslair",
    region: "looping-wilds",
    name: "Hydra's Lair",
    npc: "The Infinite Hydra",
    npcArt: "🐉",
    intro:
      "Heads regrow as fast as they're counted. This is the boss of the Looping Wilds.",
    quests: ["boss.hydra"],
    isBoss: true,
  },

  // ===== The Architect's Spire =====
  {
    id: "loc.workshop",
    region: "architects-spire",
    name: "The Workshop",
    npc: "Mechanist Vee",
    npcArt: "🛠️",
    intro:
      "\"A good tool is reusable,\" Vee says, turning a half-built gadget over in their hands. " +
      "\"That's what a function is — a tool you build once and use forever.\"",
    quests: ["q.arch.function_basics", "q.arch.multiple_returns", "q.arch.args_kwargs"],
  },
  {
    id: "loc.library",
    region: "architects-spire",
    name: "Library of Modules",
    npc: "Archivist Lune",
    npcArt: "📚",
    intro:
      "\"Some problems call themselves,\" Lune says, pointing at a staircase that spirals into itself. " +
      "\"And some problems just need fixing. Both are skills.\"",
    quests: ["q.arch.recursion", "q.arch.debugging"],
  },
  {
    id: "loc.golemyard",
    region: "architects-spire",
    name: "The Golem Yard",
    npc: "The Broken Golem",
    npcArt: "🗿",
    intro:
      "A half-built construct of gears and glyphs groans to life — built wrong, on purpose, to test you. " +
      "This is the boss of the Architect's Spire.",
    quests: ["boss.golem"],
    isBoss: true,
  },

  // ===== The Data Dunes =====
  {
    id: "loc.archivevault",
    region: "data-dunes",
    name: "Archive Vault",
    npc: "Curator Nessa",
    npcArt: "🏺",
    intro:
      "\"Data breaks. Files go missing. Keys don't exist,\" Nessa says grimly. \"A good archivist expects " +
      "chaos — and handles it gracefully instead of crashing.\"",
    quests: ["q.data.tryexcept", "q.data.keyerror"],
  },
  {
    id: "loc.recordshall",
    region: "data-dunes",
    name: "Records Hall",
    npc: "Scribe Oren",
    npcArt: "📜",
    intro:
      "Shelves of scrolls, each one structured data waiting to be read — and some that deserve their own " +
      "shape entirely. \"JSON for messages between places. Classes for things with both data and behavior.\"",
    quests: ["q.data.json", "q.data.class_basics", "q.data.listofdicts"],
  },
  {
    id: "loc.archivistchamber",
    region: "data-dunes",
    name: "The Archivist's Chamber",
    npc: "The Archivist",
    npcArt: "👁️",
    intro:
      "A being made entirely of scattered, half-corrupted records. This is the boss of the Data Dunes.",
    quests: ["boss.archivist"],
    isBoss: true,
  },

  // ===== The AI Citadel =====
  {
    id: "loc.observatory",
    region: "ai-citadel",
    name: "The Observatory",
    npc: "Astra the Cartographer",
    npcArt: "🔭",
    intro:
      "\"Real data science tools start here,\" Astra says, gesturing at an array of glowing numbers. " +
      "\"NumPy lets you work on whole collections of numbers at once — the way professionals actually do it.\"",
    quests: ["q.ai.numpy_array", "q.ai.numpy_stats", "q.ai.vectorized_ops"],
  },
  {
    id: "loc.forgeofmodels",
    region: "ai-citadel",
    name: "The Forge of Models",
    npc: "Weaver of Patterns",
    npcArt: "🕸️",
    intro:
      "\"Any fool can call a library function,\" the Weaver says. \"But if you understand the update rule " +
      "behind it — gradient descent — you understand how machines actually learn.\"",
    quests: ["q.ai.gradient_step", "q.ai.accuracy"],
  },
  {
    id: "loc.oraclesanctum",
    region: "ai-citadel",
    name: "The Oracle's Sanctum",
    npc: "The Oracle",
    npcArt: "👁️‍🗨️",
    intro:
      "The true Oracle — not an echo this time. This is the final boss of The World of Code.",
    quests: ["boss.oracle"],
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
    lesson: {
      title: "Variables",
      body: "A variable is a named box that holds a value. In Python you create one simply by writing `name = value` — no special keyword needed. Once assigned, you can use the variable anywhere by its name, and reassign it later to change what it holds.",
      example: "# Create a variable and use it\nhealth = 100\nprint(health)        # 100\n\nhealth = 80           # reassign it\nprint(health)        # 80",
      points: ["= assigns a value to a name","A variable can hold numbers, text, or anything else","You can change what a variable holds at any time"],
    },
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
    lesson: {
      title: "Data Types",
      body: "Every value in Python has a type — `int` for whole numbers, `float` for decimals, `str` for text, and `bool` for True/False. The built-in `type()` function tells you a value's type, and `type(x).__name__` turns that into a readable string.",
      example: "print(type(5))           # <class 'int'>\nprint(type(5.0))          # <class 'float'>\nprint(type(\"hi\"))          # <class 'str'>\nprint(type(True))           # <class 'bool'>\nprint(type(5).__name__)      # 'int'",
      points: ["int, float, str, bool are the basic types","type(x) inspects a value's type",".__name__ turns a type into a plain string"],
    },
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
    lesson: {
      title: "Print & f-strings",
      body: "`print()` displays text on the screen. An f-string (a string starting with `f`) lets you weave variable values directly into text using `{}` — the main way a Python program talks to the people using it.",
      example: "name = \"Ada\"\nprint(f\"Hello, {name}!\")   # Hello, Ada!",
      points: ["print(x) outputs x to the screen","f\"...{var}...\" embeds a variable's value","Anything inside {} is evaluated as Python"],
    },
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
    lesson: {
      title: "Arithmetic Operators",
      body: "Python supports the usual math operators: `+ - * /` for addition, subtraction, multiplication and division, plus `//` for floor (whole-number) division and `%` for the remainder. They follow the normal order of operations, and parentheses can override it.",
      example: "print(3 + 2 * 4)   # 11  (multiplication happens first)\nprint(7 // 2)        # 3   (floor division)\nprint(7 % 2)           # 1   (remainder)",
      points: ["Normal math order applies: * / before + -","// gives a whole number, % gives the remainder","Parentheses () control the order explicitly"],
    },
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
    lesson: {
      title: "String Concatenation",
      body: "Strings can be joined together with the `+` operator, just like numbers are added — this is called concatenation. Python won't silently convert a number to text for you though: mixing `str + int` raises an error.",
      example: "greeting = \"Hello, \" + \"world\" + \"!\"\nprint(greeting)   # Hello, world!",
      points: ["+ joins strings end-to-end","Spaces and punctuation must be included explicitly","str + int raises a TypeError — convert first with str(x)"],
    },
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
    lesson: {
      title: "f-strings in Depth",
      body: "f-strings are the modern, preferred way to build strings that include variables. Put any variable — or even a whole expression — inside `{}` and Python converts it to text automatically, no `+` needed.",
      example: "name = \"Rin\"\nlevel = 5\nprint(f\"{name} is level {level}.\")   # Rin is level 5.\nprint(f\"Double: {level * 2}\")          # Double: 10",
      points: ["{} can hold a variable or any expression","No manual type conversion needed","Cleaner than chaining + for every piece"],
    },
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
    lesson: {
      title: "Mixing Numbers",
      body: "Multiplying two numbers in Python works the same whether they're whole numbers (`int`) or decimals (`float`) — the result automatically becomes a `float` if either input is a float.",
      example: "print(3 * 2.5)   # 7.5\nprint(3 * 2)        # 6",
      points: ["int * float → float automatically","No casting needed for basic math","The result's type depends on its inputs"],
    },
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
    lesson: {
      title: "A First Taste of Data Science",
      body: "Data science starts with simple math on collections of numbers. The average (mean) is the sum divided by the count. A simple predictive model can be as plain as a straight line: `output = weight × input + bias`. Turning a numeric prediction into a decision just means comparing it to a threshold.",
      example: "values = [2, 4, 6]\naverage = sum(values) / len(values)\nprint(average)   # 4.0",
      points: ["mean = sum(values) / len(values)","A linear model is just weight * x + bias","A threshold turns a number into a yes/no decision"],
    },
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
    lesson: {
      title: "Review: The Verdant Vale",
      body: "This boss tests everything from the Verdant Vale: variables, data types, f-strings, string concatenation, and arithmetic. If a function stumps you, it's worth revisiting the quest where you first learned that skill.",
      example: "name = \"Ada\"\ncharges = 3\nprint(f\"{name}'s ward holds for {charges} charges.\")\nprint(type(charges).__name__)   # 'int'\nprint(\"Fire\" + \"Ice\")              # FireIce",
      points: ["f-strings for building sentences", "type(x).__name__ for identifying data", "+ for both numbers and strings — context decides which"],
    },
    title: "Boss: The Mimic Merchant",
    skill: null,
    location: "loc.forestedge",
    isBoss: true,
    story:
      "The Mimic Merchant grins with too many teeth. \"I can copy ANYTHING... but I get the details wrong. " +
      "Fix my spells before they unravel!\" Five spells need repair — together they test everything you've " +
      "learned in the Verdant Vale.\n\n" +
      "1. `identify_essence(value)` — return the type name of `value` as a string (`'int'`, `'float'`, `'str'`, or `'bool'`).\n\n" +
      "2. `cast_ward(name, charges)` — return `f\"{name}'s ward holds for {charges} charges.\"`\n\n" +
      "3. `combine_runes(a, b)` — return `a + b`, joining two rune strings together.\n\n" +
      "4. `recharge(charges, amount)` — return `charges + amount` as the new charge count.\n\n" +
      "5. `empower(brightness)` — create a variable `empowered` set to `brightness * 2`, then return it.",
    starter:
`def identify_essence(value):
    # Return the type of 'value' as a string: 'int', 'float', 'str', or 'bool'

    pass


def cast_ward(name, charges):
    # Return f"{name}'s ward holds for {charges} charges."

    pass


def combine_runes(a, b):
    # Return a + b (string concatenation)

    pass


def recharge(charges, amount):
    # Return charges + amount

    pass


def empower(brightness):
    # Create a variable 'empowered' set to brightness * 2, then return it

    pass
`,
    hints: [
      "This is five functions in one challenge — make sure all five are filled in before running.",
      "identify_essence uses type(value).__name__. combine_runes just needs + between two strings.",
      "empower needs a real variable: `empowered = brightness * 2` then `return empowered` — not just `return brightness * 2`.",
      "Full solution:\n\ndef identify_essence(value):\n    return type(value).__name__\n\n\ndef cast_ward(name, charges):\n    return f\"{name}'s ward holds for {charges} charges.\"\n\n\ndef combine_runes(a, b):\n    return a + b\n\n\ndef recharge(charges, amount):\n    return charges + amount\n\n\ndef empower(brightness):\n    empowered = brightness * 2\n    return empowered",
    ],
    tests: [
      { call: "identify_essence(5)", expected: "int", desc: "identify_essence(5) should be 'int'" },
      { call: "identify_essence('hi')", expected: "str", desc: "identify_essence('hi') should be 'str'" },
      {
        call: "cast_ward('Ada', 3)",
        expected: "Ada's ward holds for 3 charges.",
        desc: "cast_ward('Ada', 3) should describe the ward",
      },
      { call: "combine_runes('Fire', 'Ice')", expected: "FireIce", desc: "combine_runes('Fire', 'Ice') should be 'FireIce'" },
      { call: "recharge(3, 2)", expected: 5, desc: "recharge(3, 2) should be 5" },
      { call: "recharge(10, 0)", expected: 10, desc: "recharge(10, 0) should be 10" },
      { call: "empower(10)", expected: 20, desc: "empower(10) should be 20" },
    ],
  },

  /* ============================================================
     The Logic Labyrinth — Decisions & Logic
     ============================================================ */

  "q.logic.ifelse": {
    id: "q.logic.ifelse",
    lesson: {
      title: "if / elif / else",
      body: "`if` / `elif` / `else` lets your program choose between different paths based on a condition. Python checks each condition top to bottom and runs the FIRST branch whose condition is True; if none match, it falls through to `else`.",
      example: "age = 15\nif age < 13:\n    print(\"child\")\nelif age < 20:\n    print(\"teen\")     # this one runs\nelse:\n    print(\"adult\")",
      points: ["Conditions are checked in order, top to bottom","Only the first True branch runs","else catches everything else"],
    },
    title: "Choose a Path",
    skill: "skill.ifelse",
    location: "loc.crossroads",
    story:
      "\"Every hallway forks three ways,\" says the Keeper. \"Write `path(age)` that returns `'child'` if " +
      "`age` is under 13, `'teen'` if under 20, and `'adult'` otherwise — using if / elif / else.\"",
    starter:
`def path(age):
    # Return 'child' if age < 13, 'teen' if age < 20, else 'adult'

    pass
`,
    hints: [
      "Chain conditions with if / elif / else — they're checked top to bottom, in order.",
      "`if age < 13: return 'child'` then `elif age < 20: return 'teen'` then `else: return 'adult'`.",
      "Full solution:\n\ndef path(age):\n    if age < 13:\n        return 'child'\n    elif age < 20:\n        return 'teen'\n    else:\n        return 'adult'",
    ],
    tests: [
      { call: "path(5)", expected: "child", desc: "path(5) should be 'child'" },
      { call: "path(15)", expected: "teen", desc: "path(15) should be 'teen'" },
      { call: "path(30)", expected: "adult", desc: "path(30) should be 'adult'" },
      { call: "path(12)", expected: "child", desc: "path(12) should be 'child' (boundary)" },
      { call: "path(13)", expected: "teen", desc: "path(13) should be 'teen' (boundary)" },
    ],
  },

  "q.logic.comparisons": {
    id: "q.logic.comparisons",
    lesson: {
      title: "Comparison Operators",
      body: "Comparison operators compare two values and produce a boolean (`True`/`False`): `>` greater than, `<` less than, `==` equal, `!=` not equal, `>=` and `<=` for greater/less-or-equal. Note `==` compares values — `=` assigns one.",
      example: "print(5 > 3)    # True\nprint(5 == 5)     # True\nprint(5 != 3)       # True",
      points: ["== compares, = assigns — easy to mix up!","Comparisons always produce True or False",">= and <= include the equal case"],
    },
    title: "Measure the Gap",
    skill: "skill.comparisons",
    location: "loc.crossroads",
    story:
      "\"Two torches, two flames,\" says the Keeper. \"Write `compare(a, b)` that returns `'greater'` if " +
      "`a > b`, `'less'` if `a < b`, or `'equal'` if they match.\"",
    starter:
`def compare(a, b):
    # Return 'greater', 'less', or 'equal'

    pass
`,
    hints: [
      "Python's comparison operators are >, <, ==, >=, <=, and !=.",
      "Use if/elif/else with a > b, then a < b, then the else case is equal.",
      "Full solution:\n\ndef compare(a, b):\n    if a > b:\n        return 'greater'\n    elif a < b:\n        return 'less'\n    else:\n        return 'equal'",
    ],
    tests: [
      { call: "compare(5, 3)", expected: "greater", desc: "compare(5, 3) should be 'greater'" },
      { call: "compare(1, 9)", expected: "less", desc: "compare(1, 9) should be 'less'" },
      { call: "compare(4, 4)", expected: "equal", desc: "compare(4, 4) should be 'equal'" },
    ],
  },

  "q.logic.nested": {
    id: "q.logic.nested",
    lesson: {
      title: "Nested & Chained Conditionals",
      body: "Conditions can be nested or chained with `elif` to check multiple things in sequence. The first True branch wins — later checks only run if the earlier ones were False.",
      example: "has_key = False\nis_friend = True\nif has_key:\n    print(\"enter\")\nelif is_friend:\n    print(\"welcome\")    # this one runs\nelse:\n    print(\"denied\")",
      points: ["elif chains let you check several conditions in order","Priority matters: put the most important check first","Only one branch ever runs"],
    },
    title: "Guarded Door",
    skill: "skill.nested",
    location: "loc.crossroads",
    story:
      "\"This door checks twice,\" the Keeper warns. \"Write `door_response(has_key, is_friend)`: return " +
      "`'enter'` if `has_key` is True. Otherwise, if `is_friend` is True, return `'welcome'`. Otherwise, " +
      "return `'denied'`. Use a nested or chained conditional.\"",
    starter:
`def door_response(has_key, is_friend):
    # 'enter' if has_key
    # else 'welcome' if is_friend
    # else 'denied'

    pass
`,
    hints: [
      "Check has_key first. If it's False, you need a second check inside the else branch (or an elif).",
      "`if has_key: return 'enter'` then `elif is_friend: return 'welcome'` then `else: return 'denied'`.",
      "Full solution:\n\ndef door_response(has_key, is_friend):\n    if has_key:\n        return 'enter'\n    elif is_friend:\n        return 'welcome'\n    else:\n        return 'denied'",
    ],
    tests: [
      { call: "door_response(True, False)", expected: "enter", desc: "has_key=True should enter" },
      { call: "door_response(False, True)", expected: "welcome", desc: "friend without key should be welcomed" },
      { call: "door_response(False, False)", expected: "denied", desc: "neither key nor friend should be denied" },
      { call: "door_response(True, True)", expected: "enter", desc: "key takes priority over friendship" },
    ],
  },

  "q.logic.and": {
    id: "q.logic.and",
    lesson: {
      title: "The `and` Operator",
      body: "`and` combines two boolean conditions: the result is `True` only when BOTH sides are `True`. It's how you require multiple things to be true at once.",
      example: "print(True and True)    # True\nprint(True and False)     # False",
      points: ["Both sides must be True for the result to be True","Common for combining requirements, like has_key and has_password"],
    },
    title: "Bind Two Truths",
    skill: "skill.and",
    location: "loc.mirrorhall",
    story:
      "\"Both reflections must agree,\" the twins say. \"Write `can_enter(has_key, has_password)` that returns " +
      "`True` only when BOTH arguments are `True`, using the `and` operator.\"",
    starter:
`def can_enter(has_key, has_password):
    # Return True only if both are True

    pass
`,
    hints: [
      "`and` returns True only when both sides are True.",
      "Try: `return has_key and has_password`",
      "Full solution:\n\ndef can_enter(has_key, has_password):\n    return has_key and has_password",
    ],
    tests: [
      { call: "can_enter(True, True)", expected: true, desc: "both True should allow entry" },
      { call: "can_enter(True, False)", expected: false, desc: "missing password should deny entry" },
      { call: "can_enter(False, False)", expected: false, desc: "neither should deny entry" },
    ],
  },

  "q.logic.or_not": {
    id: "q.logic.or_not",
    lesson: {
      title: "The `or` and `not` Operators",
      body: "`or` is `True` when AT LEAST ONE side is `True`. `not` flips a boolean to its opposite — `not True` is `False`, `not False` is `True`.",
      example: "print(True or False)   # True\nprint(not True)           # False",
      points: ["or needs only one side to be True","not inverts a single boolean","and/or/not combine to express any logic"],
    },
    title: "Either Will Do",
    skill: "skill.or_not",
    location: "loc.mirrorhall",
    story:
      "\"Now show us the other two truths,\" the twins say. \"Write `is_valid(a, b)` that returns `True` if " +
      "EITHER argument is `True`, using `or`. Then write `negate(flag)` that returns the opposite of `flag`, " +
      "using `not`.\"",
    starter:
`def is_valid(a, b):
    # Return True if a OR b is True

    pass


def negate(flag):
    # Return the opposite of flag

    pass
`,
    hints: [
      "`or` returns True when at least one side is True.",
      "`not` flips a boolean: `not True` is `False`.",
      "Full solution:\n\ndef is_valid(a, b):\n    return a or b\n\n\ndef negate(flag):\n    return not flag",
    ],
    tests: [
      { call: "is_valid(True, False)", expected: true, desc: "is_valid(True, False) should be True" },
      { call: "is_valid(False, False)", expected: false, desc: "is_valid(False, False) should be False" },
      { call: "negate(True)", expected: false, desc: "negate(True) should be False" },
      { call: "negate(False)", expected: true, desc: "negate(False) should be True" },
    ],
  },

  "boss.gatekeeper": {
    id: "boss.gatekeeper",
    lesson: {
      title: "Review: The Logic Labyrinth",
      body: "This boss tests everything from the Logic Labyrinth: nested conditionals, comparisons, `and`, `or`, and `not`. Check the most important condition first (like a ban), combine requirements with `and`, accept alternatives with `or`, and flip a flag with `not`.",
      example: "is_banned = False\nage, has_pass = 25, True\nif is_banned:\n    print(\"turned away\")\nelif age >= 18 and has_pass:\n    print(\"admitted\")       # this one runs\nelse:\n    print(\"needs escort\")",
      points: ["Order conditions by priority", "and requires both, or requires either", "not flips a boolean to its opposite"],
    },
    title: "Boss: The Gatekeeper",
    skill: null,
    location: "loc.vault",
    isBoss: true,
    story:
      "The Gatekeeper's locks whir and click. \"Prove you've mastered logic, or stay lost forever.\" Three " +
      "trials await — together they test everything from the Logic Labyrinth.\n\n" +
      "1. `classify_traveler(age, has_pass, is_banned)`:\n" +
      "   - If `is_banned` is True, return `'turned away'` no matter what.\n" +
      "   - Otherwise, if `age >= 18` AND `has_pass` is True, return `'admitted'`.\n" +
      "   - Otherwise, return `'needs escort'`.\n\n" +
      "2. `gate_decision(has_token, has_vouch)` — return `True` if EITHER `has_token` OR `has_vouch` is True.\n\n" +
      "3. `reverse_seal(flag)` — return the opposite of `flag`.",
    starter:
`def classify_traveler(age, has_pass, is_banned):
    # 'turned away' if is_banned
    # elif age >= 18 and has_pass: 'admitted'
    # else: 'needs escort'

    pass


def gate_decision(has_token, has_vouch):
    # Return True if has_token OR has_vouch is True

    pass


def reverse_seal(flag):
    # Return the opposite of flag

    pass
`,
    hints: [
      "Check is_banned FIRST in classify_traveler — it overrides everything else.",
      "gate_decision uses `or`. reverse_seal uses `not`.",
      "Full solution:\n\ndef classify_traveler(age, has_pass, is_banned):\n    if is_banned:\n        return 'turned away'\n    elif age >= 18 and has_pass:\n        return 'admitted'\n    else:\n        return 'needs escort'\n\n\ndef gate_decision(has_token, has_vouch):\n    return has_token or has_vouch\n\n\ndef reverse_seal(flag):\n    return not flag",
    ],
    tests: [
      { call: "classify_traveler(25, True, False)", expected: "admitted", desc: "adult with pass, not banned" },
      { call: "classify_traveler(25, False, False)", expected: "needs escort", desc: "adult without pass" },
      { call: "classify_traveler(15, True, False)", expected: "needs escort", desc: "minor with pass" },
      { call: "classify_traveler(25, True, True)", expected: "turned away", desc: "banned overrides everything" },
      { call: "gate_decision(True, False)", expected: true, desc: "gate_decision(True, False) should be True" },
      { call: "gate_decision(False, False)", expected: false, desc: "gate_decision(False, False) should be False" },
      { call: "reverse_seal(True)", expected: false, desc: "reverse_seal(True) should be False" },
      { call: "reverse_seal(False)", expected: true, desc: "reverse_seal(False) should be True" },
    ],
  },

  /* ============================================================
     The Looping Wilds — Repetition & Collections
     ============================================================ */

  "q.loop.for_sum": {
    id: "q.loop.for_sum",
    lesson: {
      title: "for Loops",
      body: "A `for` loop repeats a block of code once for every item in a sequence (like a list). `for item in a_list:` runs the indented body with `item` set to each value in turn — perfect for totals, counting, and processing collections.",
      example: "total = 0\nfor n in [1, 2, 3]:\n    total += n\nprint(total)   # 6",
      points: ["for item in sequence: runs once per item","+= adds to a running total each time","The loop body must be indented"],
    },
    title: "Count the Logs",
    skill: "skill.for_loop",
    location: "loc.lumbercamp",
    story:
      "\"Add up every log in the pile, one at a time,\" says Birch. \"Write `sum_list(numbers)` that totals " +
      "a list using a `for` loop and a running total — don't just call `sum()`.\"",
    starter:
`def sum_list(numbers):
    total = 0
    # Loop over 'numbers' and add each one to 'total'

    return total
`,
    hints: [
      "A for loop looks like: `for n in numbers:` — it runs the body once per item.",
      "Inside the loop, add each item to total: `total = total + n` (or `total += n`).",
      "Full solution:\n\ndef sum_list(numbers):\n    total = 0\n    for n in numbers:\n        total += n\n    return total",
    ],
    tests: [
      { call: "sum_list([1, 2, 3])", expected: 6, desc: "sum_list([1, 2, 3]) should be 6" },
      { call: "sum_list([10, 20])", expected: 30, desc: "sum_list([10, 20]) should be 30" },
      { call: "sum_list([])", expected: 0, desc: "sum_list([]) should be 0" },
    ],
  },

  "q.loop.while_count": {
    id: "q.loop.while_count",
    lesson: {
      title: "while Loops",
      body: "A `while` loop repeats as long as its condition stays `True`. Unlike a `for` loop (which runs once per item in a known collection), you control exactly when a `while` loop stops — just remember to change something inside the loop, or it will run forever.",
      example: "n = 3\nresult = []\nwhile n > 0:\n    result.append(n)\n    n -= 1\nprint(result)   # [3, 2, 1]",
      points: ["while condition: repeats until the condition is False","Something inside the loop must eventually make the condition False","Good for 'repeat until' situations, not just 'for each item'"],
    },
    title: "Watch the Gate",
    skill: "skill.while_loop",
    location: "loc.lumbercamp",
    story:
      "\"Count down from the top of the pile until nothing's left,\" says Birch. \"Write `countdown(n)` " +
      "that returns a list `[n, n-1, ..., 1]` built using a `while` loop.\"",
    starter:
`def countdown(n):
    result = []
    # Use a while loop to append n, n-1, ..., down to 1

    return result
`,
    hints: [
      "A while loop keeps running as long as its condition is True: `while n > 0:`",
      "Inside the loop: append n to result, then subtract 1 from n (`n -= 1`).",
      "Full solution:\n\ndef countdown(n):\n    result = []\n    while n > 0:\n        result.append(n)\n        n -= 1\n    return result",
    ],
    tests: [
      { call: "countdown(3)", expected: [3, 2, 1], desc: "countdown(3) should be [3, 2, 1]" },
      { call: "countdown(1)", expected: [1], desc: "countdown(1) should be [1]" },
      { call: "countdown(5)", expected: [5, 4, 3, 2, 1], desc: "countdown(5) should be [5, 4, 3, 2, 1]" },
    ],
  },

  "q.loop.list_basics": {
    id: "q.loop.list_basics",
    lesson: {
      title: "Lists & append()",
      body: "A list is an ordered, changeable collection, written with square brackets `[]`. `.append(item)` adds a new item to the end of an existing list.",
      example: "items = [\"rope\"]\nitems.append(\"torch\")\nprint(items)   # ['rope', 'torch']",
      points: ["[] creates a list",".append(x) adds x to the end","Lists keep their order"],
    },
    title: "Sort the Supplies",
    skill: "skill.list_basics",
    location: "loc.beastpens",
    story:
      "\"New supplies arrive — add them to the shelf,\" says Sable. \"Write `add_item(inventory, item)` " +
      "that appends `item` to the `inventory` list and returns the updated list.\"",
    starter:
`def add_item(inventory, item):
    # Append item to inventory, then return inventory

    pass
`,
    hints: [
      "Lists have an `.append()` method that adds one item to the end.",
      "Call `inventory.append(item)`, then return `inventory`.",
      "Full solution:\n\ndef add_item(inventory, item):\n    inventory.append(item)\n    return inventory",
    ],
    tests: [
      { call: "add_item(['rope'], 'torch')", expected: ["rope", "torch"], desc: "should append 'torch'" },
      { call: "add_item([], 'map')", expected: ["map"], desc: "should append to an empty list" },
    ],
  },

  "q.loop.dict_basics": {
    id: "q.loop.dict_basics",
    lesson: {
      title: "Dictionaries",
      body: "A dictionary stores key→value pairs, written with curly braces: `{key: value}`. `.get(key, default)` safely reads a value, returning `default` if the key isn't present — ideal for tallying counts without crashing on a brand-new key.",
      example: "counts = {}\nfor word in [\"cat\", \"dog\", \"cat\"]:\n    counts[word] = counts.get(word, 0) + 1\nprint(counts)   # {'cat': 2, 'dog': 1}",
      points: ["{} with key: value pairs creates a dict",".get(key, default) never crashes on a missing key","A great pattern for counting/tallying"],
    },
    title: "Tally the Beasts",
    skill: "skill.dict_basics",
    location: "loc.beastpens",
    story:
      "\"How many of each creature do we have?\" Sable asks. \"Write `count_creatures(creature_list)` that " +
      "returns a dictionary mapping each creature name to how many times it appears in the list.\"",
    starter:
`def count_creatures(creature_list):
    counts = {}
    # For each creature, increase its count in the 'counts' dict

    return counts
`,
    hints: [
      "Loop over creature_list. For each creature, check if it's already a key in counts.",
      "`counts[creature] = counts.get(creature, 0) + 1` handles both the new and existing case in one line.",
      "Full solution:\n\ndef count_creatures(creature_list):\n    counts = {}\n    for creature in creature_list:\n        counts[creature] = counts.get(creature, 0) + 1\n    return counts",
    ],
    tests: [
      {
        call: "count_creatures(['wolf', 'bat', 'wolf'])",
        expected: { wolf: 2, bat: 1 },
        desc: "should tally 2 wolves and 1 bat",
      },
      {
        call: "count_creatures(['owl'])",
        expected: { owl: 1 },
        desc: "should tally 1 owl",
      },
    ],
  },

  "q.loop.listcomp": {
    id: "q.loop.listcomp",
    lesson: {
      title: "List Comprehensions",
      body: "A list comprehension builds a new list in a single, readable line: `[expression for item in iterable]`. It's equivalent to a `for` loop that appends to a list, but more concise — experienced Python programmers use this constantly.",
      example: "nums = [1, 2, 3]\ndoubled = [n * 2 for n in nums]\nprint(doubled)   # [2, 4, 6]",
      points: ["[expr for item in iterable] builds a list in one line","Same idea as a for-loop + append, just shorter","Very common in real Python code"],
    },
    title: "Swift Gathering",
    skill: "skill.listcomp",
    location: "loc.beastpens",
    story:
      "\"A real forager doesn't loop line by line — they gather in one sweep,\" says Sable. \"Write " +
      "`doubles(numbers)` that returns a new list with every number doubled, using a list comprehension: " +
      "`[expression for item in iterable]`.\"",
    starter:
`def doubles(numbers):
    # Return a new list with every number doubled, using a list comprehension

    pass
`,
    hints: [
      "A list comprehension has the shape `[n * 2 for n in numbers]` — it builds a list in one line.",
      "Try: `return [n * 2 for n in numbers]`",
      "Full solution:\n\ndef doubles(numbers):\n    return [n * 2 for n in numbers]",
    ],
    tests: [
      { call: "doubles([1, 2, 3])", expected: [2, 4, 6], desc: "doubles([1, 2, 3]) should be [2, 4, 6]" },
      { call: "doubles([0, 5])", expected: [0, 10], desc: "doubles([0, 5]) should be [0, 10]" },
    ],
  },

  "boss.hydra": {
    id: "boss.hydra",
    lesson: {
      title: "Review: The Looping Wilds",
      body: "This boss tests everything from the Looping Wilds: for loops, while loops, lists, dictionaries, and list comprehensions. To find the dictionary entry with the highest value, loop over `.items()` and keep track of the best one seen so far.",
      example: "counts = {\"fire\": 3, \"ice\": 1}\nbest_key, best_value = None, -1\nfor key, value in counts.items():\n    if value > best_value:\n        best_key, best_value = key, value\nprint(best_key)   # fire",
      points: [".items() gives you (key, value) pairs to loop over", "A while loop keeps going until its condition is False", "A list comprehension builds a list in one line"],
    },
    title: "Boss: The Infinite Hydra",
    skill: null,
    location: "loc.hydraslair",
    isBoss: true,
    story:
      "Heads snarl from every direction. \"Count us, hold us back, and strike true — if you can!\" the Hydra " +
      "roars. Four trials test everything from the Looping Wilds.\n\n" +
      "1. `tally(creatures)` — reuse your dict-tallying skill (a `for` loop) to count each head type in the list.\n\n" +
      "2. `strongest(counts)` — loop over a dict of counts and return the key with the HIGHEST value (don't " +
      "just call `max()` — loop it by hand).\n\n" +
      "3. `collect_heads(n)` — use a `while` loop to build and return the list `[n, n-1, ..., 1]`.\n\n" +
      "4. `scaled_damage(damage_list)` — use a list comprehension to return a new list with every value doubled.",
    starter:
`def tally(creatures):
    counts = {}
    # Count each creature, like you did at the Beast Pens

    return counts


def strongest(counts):
    # Loop over counts and return the key with the highest value

    best_key = None
    best_value = -1
    # your loop here

    return best_key


def collect_heads(n):
    # Use a while loop to build [n, n-1, ..., 1]

    result = []

    return result


def scaled_damage(damage_list):
    # Return a new list with every value doubled, using a list comprehension

    pass
`,
    hints: [
      "tally() is the same pattern as count_creatures from the Beast Pens.",
      "collect_heads is the same pattern as countdown() from Lumber Camp: `while n > 0:` then append and decrement.",
      "scaled_damage is a one-liner: `[d * 2 for d in damage_list]`.",
      "Full solution:\n\ndef tally(creatures):\n    counts = {}\n    for c in creatures:\n        counts[c] = counts.get(c, 0) + 1\n    return counts\n\n\ndef strongest(counts):\n    best_key = None\n    best_value = -1\n    for key, value in counts.items():\n        if value > best_value:\n            best_key = key\n            best_value = value\n    return best_key\n\n\ndef collect_heads(n):\n    result = []\n    while n > 0:\n        result.append(n)\n        n -= 1\n    return result\n\n\ndef scaled_damage(damage_list):\n    return [d * 2 for d in damage_list]",
    ],
    tests: [
      {
        call: "tally(['fire', 'ice', 'fire', 'fire'])",
        expected: { fire: 3, ice: 1 },
        desc: "tally should count 3 fire heads and 1 ice head",
      },
      {
        call: "strongest({'fire': 3, 'ice': 1})",
        expected: "fire",
        desc: "strongest should identify 'fire' as the most common",
      },
      {
        call: "strongest({'a': 1, 'b': 5, 'c': 2})",
        expected: "b",
        desc: "strongest should identify 'b' as the highest count",
      },
      { call: "collect_heads(3)", expected: [3, 2, 1], desc: "collect_heads(3) should be [3, 2, 1]" },
      { call: "scaled_damage([1, 2, 3])", expected: [2, 4, 6], desc: "scaled_damage([1, 2, 3]) should be [2, 4, 6]" },
    ],
  },

  /* ============================================================
     The Architect's Spire — Functions & Software Design
     ============================================================ */

  "q.arch.function_basics": {
    id: "q.arch.function_basics",
    lesson: {
      title: "Functions & Default Parameters",
      body: "A function is a reusable block of code defined with `def name(parameters):`. Parameters can have default values (`param=value`), which are used automatically when the caller doesn't supply that argument.",
      example: "def greet(name, excited=False):\n    mark = \"!\" if excited else \".\"\n    return f\"Hi {name}{mark}\"\n\nprint(greet(\"Ada\"))          # Hi Ada.\nprint(greet(\"Ada\", True))      # Hi Ada!",
      points: ["def name(params): defines a function","param=value gives a default, used if the caller omits it","return sends a value back to the caller"],
    },
    title: "Forge a Tool",
    skill: "skill.function_basics",
    location: "loc.workshop",
    story:
      "\"A tool should work even when you forget to specify everything,\" Vee says. \"Write `craft(name, " +
      "power=1)` that returns `f\"{name} (power {power})\"` — `power` should default to `1` when not given.\"",
    starter:
`def craft(name, power=1):
    # Return f"{name} (power {power})"

    pass
`,
    hints: [
      "A default parameter is written `power=1` in the function signature — callers can omit it.",
      "The body is just an f-string, like earlier regions: `f\"{name} (power {power})\"`",
      "Full solution:\n\ndef craft(name, power=1):\n    return f\"{name} (power {power})\"",
    ],
    tests: [
      { call: "craft('Blade')", expected: "Blade (power 1)", desc: "craft('Blade') should use the default power" },
      { call: "craft('Hammer', 5)", expected: "Hammer (power 5)", desc: "craft('Hammer', 5) should override power" },
    ],
  },

  "q.arch.multiple_returns": {
    id: "q.arch.multiple_returns",
    lesson: {
      title: "Returning Multiple Values",
      body: "A function can return more than one value at once by separating them with commas — Python packs them into a tuple automatically. The caller can 'unpack' them straight back into separate variables using the same comma syntax.",
      example: "def split(full):\n    first, last = full.split(\" \")\n    return first, last\n\nf, l = split(\"Ada Lovelace\")\nprint(f, l)   # Ada Lovelace",
      points: ["return a, b packs two values into a tuple","x, y = some_tuple unpacks it back into two variables",".split(' ') breaks a string apart at each space"],
    },
    title: "Twin Blades",
    skill: "skill.multiple_returns",
    location: "loc.workshop",
    story:
      "\"One function, two results,\" Vee says. \"Write `split_name(full_name)` that splits a `'First Last'` " +
      "string on the space and returns BOTH parts as a tuple: `(first, last)`.\"",
    starter:
`def split_name(full_name):
    # Split full_name on the space and return (first, last)

    pass
`,
    hints: [
      "String `.split(' ')` breaks a string into a list of pieces at each space.",
      "`first, last = full_name.split(' ')` then `return first, last` (a comma in return makes a tuple).",
      "Full solution:\n\ndef split_name(full_name):\n    first, last = full_name.split(' ')\n    return first, last",
    ],
    tests: [
      { call: "split_name('Ada Lovelace')", expected: ["Ada", "Lovelace"], desc: "should split into first and last" },
      { call: "split_name('Grace Hopper')", expected: ["Grace", "Hopper"], desc: "should split correctly" },
    ],
  },

  "q.arch.args_kwargs": {
    id: "q.arch.args_kwargs",
    lesson: {
      title: "*args — Variable Arguments",
      body: "`*args` in a function signature collects any number of positional arguments into a tuple, so the function can accept a variable amount of input. Inside the function, that collected value behaves just like any tuple — you can sum it, loop over it, and so on.",
      example: "def total(*numbers):\n    return sum(numbers)\n\nprint(total(1, 2, 3))   # 6\nprint(total(5))            # 5",
      points: ["*name collects extra positional args into a tuple","Works with any number of arguments, including zero","sum() works on that tuple just like a list"],
    },
    title: "Gather the Party",
    skill: "skill.args_kwargs",
    location: "loc.workshop",
    story:
      "\"Sometimes you don't know how many will show up,\" Vee says. \"Write `total_power(*members)` that " +
      "accepts any number of arguments and returns their sum, using `*args`.\"",
    starter:
`def total_power(*members):
    # Sum every value in 'members' (it's a tuple of however many args were passed)

    pass
`,
    hints: [
      "`*members` collects all positional arguments into a tuple, however many there are.",
      "You can sum a tuple the same way you'd sum a list: `return sum(members)`.",
      "Full solution:\n\ndef total_power(*members):\n    return sum(members)",
    ],
    tests: [
      { call: "total_power(1, 2, 3)", expected: 6, desc: "total_power(1, 2, 3) should be 6" },
      { call: "total_power(5)", expected: 5, desc: "total_power(5) should be 5" },
      { call: "total_power(1, 2, 3, 4, 5)", expected: 15, desc: "total_power(1, 2, 3, 4, 5) should be 15" },
    ],
  },

  "q.arch.recursion": {
    id: "q.arch.recursion",
    lesson: {
      title: "Recursion",
      body: "A recursive function calls itself to solve a smaller version of the same problem, until it reaches a 'base case' that stops the recursion. Every recursive function needs that base case, or it will call itself forever.",
      example: "def factorial(n):\n    if n == 0:\n        return 1                      # base case\n    return n * factorial(n - 1)        # recursive case\n\nprint(factorial(4))   # 24",
      points: ["Every recursive function needs a base case to stop","The recursive case calls the function on a smaller input","Each call waits for the smaller call to finish first"],
    },
    title: "Echoing Halls",
    skill: "skill.recursion",
    location: "loc.library",
    story:
      "\"This staircase calls itself,\" Lune says. \"Write `factorial(n)` that computes `n!` " +
      "(`n * (n-1) * ... * 1`) using RECURSION — the function calling itself with a smaller `n`, down to a " +
      "base case of `factorial(0) == 1`.\"",
    starter:
`def factorial(n):
    # Base case: factorial(0) is 1
    # Recursive case: n * factorial(n - 1)

    pass
`,
    hints: [
      "Every recursive function needs a base case that stops the recursion: `if n == 0: return 1`.",
      "The recursive case calls the function again on a smaller input: `return n * factorial(n - 1)`.",
      "Full solution:\n\ndef factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)",
    ],
    tests: [
      { call: "factorial(0)", expected: 1, desc: "factorial(0) should be 1" },
      { call: "factorial(1)", expected: 1, desc: "factorial(1) should be 1" },
      { call: "factorial(4)", expected: 24, desc: "factorial(4) should be 24" },
      { call: "factorial(5)", expected: 120, desc: "factorial(5) should be 120" },
    ],
  },

  "q.arch.debugging": {
    id: "q.arch.debugging",
    lesson: {
      title: "Reading & Fixing Bugs",
      body: "Debugging means reading code carefully and tracing through it step by step with real values, rather than guessing. A classic bug is overwriting a running total instead of accumulating into it — always ask: 'what does this variable hold right before the bug shows up?'",
      example: "# Buggy: overwrites instead of accumulating\ntotal = 0\nfor n in [1, 2, 3]:\n    total = n          # bug! should be +=\nprint(total)   # 3, not 6\n\n# Fixed:\ntotal = 0\nfor n in [1, 2, 3]:\n    total += n          # accumulates\nprint(total)   # 6",
      points: ["Trace through code with real example values","= replaces a value, += accumulates onto it","Compare the buggy line to a working example you've seen before"],
    },
    title: "Fix the Golem",
    skill: "skill.debugging",
    location: "loc.library",
    story:
      "\"This construct has a bug baked in,\" Lune says, handing you a half-working spell. \"Find it and " +
      "fix it. `average(numbers)` is SUPPOSED to return the mean of a list — but it doesn't. Fix the bug " +
      "without rewriting it from scratch.\"",
    starter:
`def average(numbers):
    total = 0
    for n in numbers:
        total = n  # bug: this overwrites total instead of accumulating it
    return total / len(numbers)
`,
    hints: [
      "Run it mentally on [1, 2, 3]: what does `total` end up as right before the loop ends?",
      "The loop should ACCUMULATE into total, not replace it. Compare to sum_list from the Looping Wilds.",
      "Full solution:\n\ndef average(numbers):\n    total = 0\n    for n in numbers:\n        total += n\n    return total / len(numbers)",
    ],
    tests: [
      { call: "average([1, 2, 3])", expected: 2, desc: "average([1, 2, 3]) should be 2" },
      { call: "average([2, 4, 6, 8])", expected: 5, desc: "average([2, 4, 6, 8]) should be 5" },
      { call: "average([10])", expected: 10, desc: "average([10]) should be 10" },
    ],
  },

  "boss.golem": {
    id: "boss.golem",
    lesson: {
      title: "Review: The Architect's Spire",
      body: "This boss tests everything from the Architect's Spire: default parameters, returning multiple values, `*args`, recursion, and debugging. Build each piece with a familiar function shape, and read the buggy starter carefully before fixing it.",
      example: "def build_part(name, strength=10):\n    return f\"{name}: {strength}\"\n\ndef total_strength(*parts):\n    return sum(parts)\n\nprint(build_part(\"Arm\"))          # Arm: 10\nprint(total_strength(10, 25, 5))    # 40",
      points: ["Default parameters make arguments optional", "*args handles any number of inputs", "A recursive function needs a base case to stop"],
    },
    title: "Boss: The Broken Golem",
    skill: null,
    location: "loc.golemyard",
    isBoss: true,
    story:
      "The Golem lurches upright, half its glyphs missing. \"REBUILD... ME...\" it groans. Five parts need " +
      "repair — together they are the full toolkit of the Spire.\n\n" +
      "1. `build_part(name, strength=10)` — return `f\"{name}: {strength}\"` using a default parameter.\n\n" +
      "2. `split_label(label)` — split a `'Type Name'` string on the space and return both halves as a " +
      "tuple: `(type, name)`.\n\n" +
      "3. `total_strength(*parts)` — accept any number of strength values and return their sum, using `*args`.\n\n" +
      "4. `activate_sequence(n)` — compute `n!` (`n * (n-1) * ... * 1`) using RECURSION, with a base case of " +
      "`activate_sequence(0) == 1`.\n\n" +
      "5. `repair_golem(parts)` — this one is already written, but it's BUGGY: it's supposed to sum a list " +
      "of part strengths, but doesn't. Find the bug and fix it.",
    starter:
`def build_part(name, strength=10):
    # Return f"{name}: {strength}"

    pass


def split_label(label):
    # Split "Type Name" on the space and return (type, name)

    pass


def total_strength(*parts):
    # Sum every value in 'parts'

    pass


def activate_sequence(n):
    # Base case: activate_sequence(0) is 1
    # Recursive case: n * activate_sequence(n - 1)

    pass


def repair_golem(parts):
    total = 0
    for p in parts:
        total = p  # bug: this overwrites total instead of accumulating it
    return total
`,
    hints: [
      "build_part is the same shape as craft() from the Workshop. split_label is the same shape as split_name().",
      "activate_sequence is the same shape as factorial() from the Library of Modules.",
      "For repair_golem, compare it to average() from Fix the Golem (the quest) — the fix is the same: = should be +=.",
      "Full solution:\n\ndef build_part(name, strength=10):\n    return f\"{name}: {strength}\"\n\n\ndef split_label(label):\n    kind, name = label.split(' ')\n    return kind, name\n\n\ndef total_strength(*parts):\n    return sum(parts)\n\n\ndef activate_sequence(n):\n    if n == 0:\n        return 1\n    return n * activate_sequence(n - 1)\n\n\ndef repair_golem(parts):\n    total = 0\n    for p in parts:\n        total += p\n    return total",
    ],
    tests: [
      { call: "build_part('Arm')", expected: "Arm: 10", desc: "build_part('Arm') should use default strength" },
      { call: "build_part('Leg', 25)", expected: "Leg: 25", desc: "build_part('Leg', 25) should override strength" },
      { call: "split_label('Arm Alpha')", expected: ["Arm", "Alpha"], desc: "split_label('Arm Alpha') should be ('Arm', 'Alpha')" },
      { call: "total_strength(10, 25, 5)", expected: 40, desc: "total_strength(10, 25, 5) should be 40" },
      { call: "activate_sequence(4)", expected: 24, desc: "activate_sequence(4) should be 24" },
      { call: "activate_sequence(0)", expected: 1, desc: "activate_sequence(0) should be 1" },
      { call: "repair_golem([10, 20, 30])", expected: 60, desc: "repair_golem([10, 20, 30]) should be 60" },
    ],
  },

  /* ============================================================
     The Data Dunes — Data Handling
     ============================================================ */

  "q.data.tryexcept": {
    id: "q.data.tryexcept",
    lesson: {
      title: "try / except",
      body: "`try` / `except` lets your program handle errors gracefully instead of crashing. Python runs the `try` block; if a specific exception (like `ZeroDivisionError`) occurs, it jumps to the matching `except` block instead of stopping the program.",
      example: "try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    result = \"undefined\"\nprint(result)   # undefined",
      points: ["try: wraps code that might fail","except ErrorType: catches that specific error","The program keeps running instead of crashing"],
    },
    title: "Guard Against Chaos",
    skill: "skill.tryexcept",
    location: "loc.archivevault",
    story:
      "\"Dividing by zero shouldn't destroy the whole archive,\" Nessa says. \"Write `safe_divide(a, b)` " +
      "that returns `a / b`, but catches a `ZeroDivisionError` and returns the string `'undefined'` instead " +
      "of crashing.\"",
    starter:
`def safe_divide(a, b):
    # Return a / b, but return 'undefined' instead of crashing when b is 0

    pass
`,
    hints: [
      "Wrap the risky code in `try:` / `except ZeroDivisionError:`.",
      "`try: return a / b` then `except ZeroDivisionError: return 'undefined'`.",
      "Full solution:\n\ndef safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'undefined'",
    ],
    tests: [
      { call: "safe_divide(10, 2)", expected: 5, desc: "safe_divide(10, 2) should be 5" },
      { call: "safe_divide(7, 0)", expected: "undefined", desc: "safe_divide(7, 0) should be 'undefined'" },
    ],
  },

  "q.data.keyerror": {
    id: "q.data.keyerror",
    lesson: {
      title: "Safe Dictionary Access",
      body: "Accessing a missing dictionary key with `record[key]` raises a `KeyError` and crashes your program. `.get(key, default)` is the safe alternative — it returns `default` instead of crashing when the key isn't there.",
      example: "record = {\"name\": \"Ada\"}\nprint(record.get(\"name\", \"missing\"))   # Ada\nprint(record.get(\"age\", \"missing\"))     # missing",
      points: ["record[key] crashes if the key is missing",".get(key, default) never crashes","Great for data that might have gaps"],
    },
    title: "Read the Scroll",
    skill: "skill.keyerror",
    location: "loc.archivevault",
    story:
      "\"Not every scroll has every field,\" Nessa warns. \"Write `get_field(record, key)` that returns " +
      "`record[key]` if it exists, or the string `'missing'` if the key isn't in the dictionary — without " +
      "crashing.\"",
    starter:
`def get_field(record, key):
    # Return record[key] if present, else 'missing'

    pass
`,
    hints: [
      "Dictionaries have a `.get(key, default)` method that never raises an error.",
      "Try: `return record.get(key, 'missing')`",
      "Full solution:\n\ndef get_field(record, key):\n    return record.get(key, 'missing')",
    ],
    tests: [
      { call: "get_field({'name': 'Ada'}, 'name')", expected: "Ada", desc: "should return existing field" },
      { call: "get_field({'name': 'Ada'}, 'age')", expected: "missing", desc: "should return 'missing' for absent key" },
    ],
  },

  "q.data.json": {
    id: "q.data.json",
    lesson: {
      title: "JSON Parsing",
      body: "JSON is a text format for structured data, used everywhere data moves between programs (APIs, config files, saved files, and more). Python's `json` module converts between JSON text and Python objects: `json.loads(text)` parses JSON into a dict, and `json.dumps(obj)` does the reverse.",
      example: "import json\ntext = '{\"title\": \"Map\", \"pages\": 3}'\ndata = json.loads(text)\nprint(data[\"title\"])   # Map",
      points: ["json.loads(text) turns JSON text into a Python dict","json.dumps(obj) turns a Python object back into JSON text","Once parsed, it's just a normal dict"],
    },
    title: "Decode the Archive",
    skill: "skill.json",
    location: "loc.recordshall",
    story:
      "\"Messages between kingdoms travel as JSON,\" Oren says, holding up a glowing scroll of text. \"Write " +
      "`parse_title(json_string)` that uses Python's `json` module to parse a JSON string like " +
      "`'{\"title\": \"...\", \"pages\": 10}'` and return just the `'title'` field.\"",
    starter:
`import json

def parse_title(json_string):
    # Use json.loads(json_string) to get a dict, then return its 'title' field

    pass
`,
    hints: [
      "`json.loads(text)` turns a JSON string into a Python dict (the opposite of json.dumps).",
      "Parse it, then index into the result: `data = json.loads(json_string)` then `return data['title']`.",
      "Full solution:\n\nimport json\n\ndef parse_title(json_string):\n    data = json.loads(json_string)\n    return data['title']",
    ],
    tests: [
      {
        call: 'parse_title(\'{"title": "The Lost Codex", "pages": 10}\')',
        expected: "The Lost Codex",
        desc: "should extract the title field from JSON",
      },
      {
        call: 'parse_title(\'{"title": "Map of the Dunes", "pages": 3}\')',
        expected: "Map of the Dunes",
        desc: "should extract a different title correctly",
      },
    ],
  },

  "q.data.class_basics": {
    id: "q.data.class_basics",
    lesson: {
      title: "Classes & Objects",
      body: "A class is a blueprint for creating objects that bundle data and behavior together. `__init__(self, ...)` runs automatically when you create a new object and sets up its starting attributes (stored as `self.attribute`). Other methods can then read and use those attributes.",
      example: "class Scroll:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n\n    def summary(self):\n        return f\"{self.title} ({self.pages} pages)\"\n\ns = Scroll(\"Map\", 3)\nprint(s.summary())   # Map (3 pages)",
      points: ["__init__ runs when an object is created","self.x stores data on that specific object","Methods are just functions defined inside the class"],
    },
    title: "Build a Construct",
    skill: "skill.class_basics",
    location: "loc.recordshall",
    story:
      "\"Some records need both data AND behavior — that's what a class is for,\" Oren says. \"Define a " +
      "class `Scroll` with an `__init__(self, title, pages)` that stores both as attributes, and a method " +
      "`summary(self)` that returns `f\"{title} ({pages} pages)\"`.\"",
    starter:
`class Scroll:
    def __init__(self, title, pages):
        # Store title and pages as self.title and self.pages

        pass

    def summary(self):
        # Return f"{self.title} ({self.pages} pages)"

        pass
`,
    hints: [
      "Inside __init__, save the arguments onto the object: `self.title = title` and `self.pages = pages`.",
      "summary() reads those back: `return f\"{self.title} ({self.pages} pages)\"`",
      "Full solution:\n\nclass Scroll:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n\n    def summary(self):\n        return f\"{self.title} ({self.pages} pages)\"",
    ],
    tests: [
      {
        call: "Scroll('Ancient Map', 7).summary()",
        expected: "Ancient Map (7 pages)",
        desc: "Scroll('Ancient Map', 7).summary() should describe the scroll",
      },
      {
        call: "Scroll('Spellbook', 42).summary()",
        expected: "Spellbook (42 pages)",
        desc: "Scroll('Spellbook', 42).summary() should describe a different scroll",
      },
    ],
  },

  "q.data.listofdicts": {
    id: "q.data.listofdicts",
    lesson: {
      title: "Searching Structured Data",
      body: "Real-world data is often a list of dictionaries — think of it as a table of records. To find one, loop through the list and check each record's field; return as soon as you find a match, or `None` if you reach the end without one.",
      example: "records = [{\"name\": \"Ada\"}, {\"name\": \"Rin\"}]\nfor r in records:\n    if r[\"name\"] == \"Rin\":\n        print(r)   # {'name': 'Rin'}\n        break",
      points: ["A list of dicts is like a table of rows","Loop and check a field to search it","Return None (implicitly, after the loop) when nothing matches"],
    },
    title: "Cross-Reference the Records",
    skill: "skill.listofdicts",
    location: "loc.recordshall",
    story:
      "\"Our records are a list of entries — find the one we need,\" Oren says. \"Write " +
      "`find_by_name(records, name)` that searches a list of dicts (each with a `'name'` key) and returns " +
      "the FIRST matching record, or `None` if nothing matches.\"",
    starter:
`def find_by_name(records, name):
    # Loop over records and return the first one whose 'name' matches
    # Return None if nothing matches

    pass
`,
    hints: [
      "Loop over the list: `for record in records:`",
      "Check each record's name field: `if record['name'] == name: return record`. If the loop finishes, return None.",
      "Full solution:\n\ndef find_by_name(records, name):\n    for record in records:\n        if record['name'] == name:\n            return record\n    return None",
    ],
    tests: [
      {
        call: "find_by_name([{'name': 'Ada', 'age': 30}, {'name': 'Rin', 'age': 22}], 'Rin')",
        expected: { name: "Rin", age: 22 },
        desc: "should find the record named 'Rin'",
      },
      {
        call: "find_by_name([{'name': 'Ada', 'age': 30}], 'Nobody')",
        expected: null,
        desc: "should return None when nothing matches",
      },
    ],
  },

  "boss.archivist": {
    id: "boss.archivist",
    lesson: {
      title: "Review: The Data Dunes",
      body: "This boss tests everything from the Data Dunes: error handling, JSON parsing, safe dictionary access, classes, and searching structured data. Wrap risky parsing in `try`/`except`, and use `.get(key, default)` so a missing field never crashes the whole operation.",
      example: "import json\ntry:\n    data = json.loads(\"not valid json{{{\")\nexcept Exception:\n    data = {\"error\": \"corrupted\"}\nprint(data)   # {'error': 'corrupted'}",
      points: ["Catching a bare Exception covers any parse failure", ".get() with a default keeps missing fields from crashing you", "A class bundles data (self.x) with behavior (methods)"],
    },
    title: "Boss: The Archivist",
    skill: null,
    location: "loc.archivistchamber",
    isBoss: true,
    story:
      "Scattered scrolls swirl into a towering shape. \"SOME... OF ME... IS CORRUPTED,\" it intones. Four " +
      "trials test everything from the Data Dunes.\n\n" +
      "1. `safe_parse(json_string)` — try `json.loads(json_string)` and return the resulting dict, but if " +
      "it raises any exception (malformed JSON), catch it and return `{'error': 'corrupted'}` instead of crashing.\n\n" +
      "2. `safe_field(record, key)` — return `record[key]` if present, or the string `'unknown'` if the key " +
      "is missing, using `.get()`.\n\n" +
      "3. Define a class `Artifact` with `__init__(self, title, power)` storing both, and a method " +
      "`describe(self)` that returns `f\"{title} (power {power})\"`.\n\n" +
      "4. `find_record(records, name)` — search a list of dicts (each with a `'name'` key) and return the " +
      "FIRST matching record, or `None` if nothing matches.",
    starter:
`import json

def safe_parse(json_string):
    # Try json.loads(json_string); on any exception return {'error': 'corrupted'}

    pass


def safe_field(record, key):
    # Return record[key] if present, else 'unknown'

    pass


class Artifact:
    def __init__(self, title, power):
        # Store title and power

        pass

    def describe(self):
        # Return f"{self.title} (power {self.power})"

        pass


def find_record(records, name):
    # Loop over records and return the first one whose 'name' matches
    # Return None if nothing matches

    pass
`,
    hints: [
      "safe_parse needs a try/except around json.loads — catch a bare `Exception` to cover any parse error.",
      "safe_field is the same pattern as get_field() from the Archive Vault: `record.get(key, 'unknown')`.",
      "Artifact is the same shape as the Scroll class from Records Hall. find_record is the same pattern as find_by_name().",
      "Full solution:\n\nimport json\n\ndef safe_parse(json_string):\n    try:\n        return json.loads(json_string)\n    except Exception:\n        return {'error': 'corrupted'}\n\n\ndef safe_field(record, key):\n    return record.get(key, 'unknown')\n\n\nclass Artifact:\n    def __init__(self, title, power):\n        self.title = title\n        self.power = power\n\n    def describe(self):\n        return f\"{self.title} (power {self.power})\"\n\n\ndef find_record(records, name):\n    for record in records:\n        if record['name'] == name:\n            return record\n    return None",
    ],
    tests: [
      {
        call: 'safe_parse(\'{"title": "Good Scroll"}\')',
        expected: { title: "Good Scroll" },
        desc: "should parse valid JSON normally",
      },
      {
        call: "safe_parse('not valid json{{{')",
        expected: { error: "corrupted" },
        desc: "should catch a parse error and return the corrupted marker",
      },
      { call: "safe_field({'name': 'Ada'}, 'name')", expected: "Ada", desc: "safe_field should return the existing field" },
      { call: "safe_field({'name': 'Ada'}, 'age')", expected: "unknown", desc: "safe_field should return 'unknown' for a missing key" },
      { call: "Artifact('Orb', 50).describe()", expected: "Orb (power 50)", desc: "Artifact('Orb', 50).describe() should describe the artifact" },
      {
        call: "find_record([{'name': 'Ada'}, {'name': 'Rin'}], 'Rin')",
        expected: { name: "Rin" },
        desc: "find_record should find the record named 'Rin'",
      },
    ],
  },

  /* ============================================================
     The AI Citadel — Data Science & Machine Learning
     Real NumPy (via Pyodide), plus ML mechanics built by hand.
     ============================================================ */

  "q.ai.numpy_array": {
    id: "q.ai.numpy_array",
    lesson: {
      title: "NumPy Arrays",
      body: "NumPy is the foundational library for numerical computing in Python — almost every data science and machine learning tool is built on it. A NumPy array (created with `np.array()`) lets you apply math to an entire collection of numbers at once, much faster than a plain Python loop.",
      example: "import numpy as np\narr = np.array([1, 2, 3])\nprint(arr.sum())             # 6\nprint(float(arr.sum()))        # 6.0",
      points: ["np.array(list) creates a NumPy array","Arrays support whole-collection math operations","Convert results with float()/int()/.tolist() for plain Python values"],
    },
    title: "Summon the Array",
    skill: "skill.numpy_array",
    location: "loc.observatory",
    pyPackages: ["numpy"],
    story:
      "\"Professionals don't loop over numbers one at a time — they operate on whole arrays at once,\" Astra " +
      "says. \"Write `array_sum(values)` using NumPy: convert `values` to a `numpy` array with `np.array()`, " +
      "then return its `.sum()` as a plain float.\"",
    starter:
`import numpy as np

def array_sum(values):
    # Convert values to a numpy array, then return its sum as a float
    arr = np.array(values)

    pass
`,
    hints: [
      "Call `.sum()` on the array to add up every element: `arr.sum()`.",
      "Wrap the result in `float(...)` so it returns a plain Python number, not a numpy type.",
      "Full solution:\n\nimport numpy as np\n\ndef array_sum(values):\n    arr = np.array(values)\n    return float(arr.sum())",
    ],
    tests: [
      { call: "array_sum([1, 2, 3])", expected: 6, desc: "array_sum([1, 2, 3]) should be 6" },
      { call: "array_sum([2.5, 2.5, 5])", expected: 10, desc: "array_sum([2.5, 2.5, 5]) should be 10" },
    ],
  },

  "q.ai.numpy_stats": {
    id: "q.ai.numpy_stats",
    lesson: {
      title: "Mean & Standard Deviation",
      body: "Before modeling data, data scientists describe it. `np.mean()` computes the average, and `np.std()` computes the standard deviation — a measure of how spread out the values are. Together they're the starting point of almost every data analysis.",
      example: "import numpy as np\ndata = np.array([2, 4, 4, 4, 5, 5, 7, 9])\nprint(np.mean(data))   # 5.0\nprint(np.std(data))      # 2.0",
      points: ["np.mean() is the average of all values","np.std() measures how spread out the values are","A std of 0 means every value is identical"],
    },
    title: "Measure the Cosmos",
    skill: "skill.numpy_stats",
    location: "loc.observatory",
    pyPackages: ["numpy"],
    story:
      "\"Before you model data, you describe it,\" Astra says. \"Write `stats(values)` that returns a tuple " +
      "`(mean, std)` — the mean and standard deviation — using `np.mean()` and `np.std()`.\"",
    starter:
`import numpy as np

def stats(values):
    arr = np.array(values)
    # Return (mean, std) as a tuple of plain floats

    pass
`,
    hints: [
      "`np.mean(arr)` and `np.std(arr)` compute the mean and standard deviation.",
      "Convert each to `float(...)` and return them as a tuple: `return float(np.mean(arr)), float(np.std(arr))`",
      "Full solution:\n\nimport numpy as np\n\ndef stats(values):\n    arr = np.array(values)\n    return float(np.mean(arr)), float(np.std(arr))",
    ],
    tests: [
      { call: "stats([2, 4, 4, 4, 5, 5, 7, 9])", expected: [5, 2], desc: "stats(...) should return mean=5, std=2" },
      { call: "stats([10, 10, 10])", expected: [10, 0], desc: "stats of identical values should be mean=10, std=0" },
    ],
  },

  "q.ai.vectorized_ops": {
    id: "q.ai.vectorized_ops",
    lesson: {
      title: "Vectorization & Feature Scaling",
      body: "NumPy lets you apply an operation to an entire array at once ('vectorization') instead of looping — `(arr - mean) / std` runs on every element simultaneously. This specific operation is called standardization, and it's one of the first things done to data before training a model.",
      example: "import numpy as np\narr = np.array([3, 5])\nmean, std = np.mean(arr), np.std(arr)\nprint(((arr - mean) / std).tolist())   # [-1.0, 1.0]",
      points: ["Arithmetic on an array applies to every element at once","Standardizing puts different features on the same scale",".tolist() converts a NumPy array back to a plain Python list"],
    },
    title: "Align the Stars",
    skill: "skill.vectorized_ops",
    location: "loc.observatory",
    pyPackages: ["numpy"],
    story:
      "\"Before training any model, features need to be on the same scale,\" Astra says. \"Write " +
      "`normalize(values)` that subtracts the mean and divides by the standard deviation for every value " +
      "— this is called standardization, and it's one of the first things a real data scientist does to a " +
      "dataset. Return the result as a plain Python list.\"",
    starter:
`import numpy as np

def normalize(values):
    arr = np.array(values)
    mean = np.mean(arr)
    std = np.std(arr)
    # Return (arr - mean) / std as a plain Python list

    pass
`,
    hints: [
      "NumPy applies `(arr - mean) / std` to every element at once — no loop needed. This is 'vectorization'.",
      "Convert the final numpy array back to a plain list with `.tolist()`.",
      "Full solution:\n\nimport numpy as np\n\ndef normalize(values):\n    arr = np.array(values)\n    mean = np.mean(arr)\n    std = np.std(arr)\n    return ((arr - mean) / std).tolist()",
    ],
    tests: [
      { call: "normalize([1, 2, 3])", expected: [-1.2247448713915892, 0, 1.2247448713915892], desc: "normalize([1, 2, 3]) should center and scale the values" },
      { call: "normalize([3, 5])", expected: [-1, 1], desc: "normalize([3, 5]) should center and scale to [-1, 1]" },
    ],
  },

  "q.ai.gradient_step": {
    id: "q.ai.gradient_step",
    lesson: {
      title: "Gradient Descent",
      body: "Gradient descent is how most machine learning models learn: given a prediction's error, nudge the model's parameters (weight and bias) a little in the direction that reduces that error. Repeating this update many times, across many examples, is literally what 'training a model' means under the hood.",
      example: "def gradient_step(x, y, weight, bias, lr):\n    prediction = weight * x + bias\n    error = prediction - y\n    new_weight = weight - lr * 2 * error * x\n    new_bias = bias - lr * 2 * error\n    return new_weight, new_bias\n\nprint(gradient_step(2, 5, 1, 0, 0.1))   # (2.2, 0.6)",
      points: ["error = prediction - actual","The update nudges weight/bias opposite the error's direction","lr (learning rate) controls how big each nudge is"],
    },
    title: "Train the Oracle",
    skill: "skill.gradient_step",
    location: "loc.forgeofmodels",
    story:
      "\"Any model you'll ever use — no matter how fancy — learns the same way at its core,\" the Weaver " +
      "says. \"Implement ONE step of gradient descent for a line `y = weight * x + bias`, trained to " +
      "minimize squared error on a single example `(x, y)`.\n\n" +
      "Write `gradient_step(x, y, weight, bias, lr)`:\n" +
      "1. `prediction = weight * x + bias`\n" +
      "2. `error = prediction - y`\n" +
      "3. `new_weight = weight - lr * 2 * error * x`\n" +
      "4. `new_bias = bias - lr * 2 * error`\n" +
      "5. Return `(new_weight, new_bias)`\n\n" +
      "This exact update rule — the derivative of squared error — is what powers linear regression, and is " +
      "the ancestor of how every neural network learns.\"",
    starter:
`def gradient_step(x, y, weight, bias, lr):
    prediction = weight * x + bias
    error = prediction - y
    new_weight = weight - lr * 2 * error * x
    new_bias = bias - lr * 2 * error
    return new_weight, new_bias
`,
    hints: [
      "The starter code already implements the formula exactly as described — read it closely before changing anything.",
      "If your result doesn't match, double-check you didn't reorder the subtraction (weight - lr * ... , not lr * ... - weight).",
      "Full solution (the starter code is already correct):\n\ndef gradient_step(x, y, weight, bias, lr):\n    prediction = weight * x + bias\n    error = prediction - y\n    new_weight = weight - lr * 2 * error * x\n    new_bias = bias - lr * 2 * error\n    return new_weight, new_bias",
    ],
    tests: [
      { call: "gradient_step(2, 5, 1, 0, 0.1)", expected: [2.2, 0.6], desc: "gradient_step(2, 5, 1, 0, 0.1) should nudge weight/bias toward the data" },
      { call: "gradient_step(1, 1, 1, 0, 0.5)", expected: [1, 0], desc: "a perfect prediction should produce zero error, so no change" },
    ],
  },

  "q.ai.accuracy": {
    id: "q.ai.accuracy",
    lesson: {
      title: "Evaluation Metrics: Accuracy",
      body: "A trained model is only useful if you can measure how good it is. Accuracy — the fraction of predictions that exactly match the real answer — is the simplest and most common evaluation metric for classification.",
      example: "preds =  [1, 0, 1, 1]\nactual = [1, 0, 0, 1]\ncorrect = sum(1 for p, a in zip(preds, actual) if p == a)\nprint(correct / len(preds))   # 0.75",
      points: ["accuracy = correct predictions / total predictions","zip() pairs up two lists element by element","A generator expression like sum(1 for ... if ...) counts matches"],
    },
    title: "Judge the Prophecy",
    skill: "skill.accuracy",
    location: "loc.forgeofmodels",
    story:
      "\"A model that isn't measured is just a guess,\" the Weaver says. \"Write `accuracy(predictions, " +
      "actuals)` that returns the fraction of predictions that exactly match the actual values — the single " +
      "most common classification metric in professional machine learning.\"",
    starter:
`def accuracy(predictions, actuals):
    # Return the fraction of predictions that match actuals (a float between 0 and 1)

    pass
`,
    hints: [
      "Count how many positions match, then divide by the total count.",
      "`correct = sum(1 for p, a in zip(predictions, actuals) if p == a)` then `return correct / len(predictions)`",
      "Full solution:\n\ndef accuracy(predictions, actuals):\n    correct = sum(1 for p, a in zip(predictions, actuals) if p == a)\n    return correct / len(predictions)",
    ],
    tests: [
      { call: "accuracy([1, 0, 1, 1], [1, 0, 0, 1])", expected: 0.75, desc: "3 of 4 match, so accuracy should be 0.75" },
      { call: "accuracy(['yes', 'no'], ['yes', 'no'])", expected: 1, desc: "all match, so accuracy should be 1" },
      { call: "accuracy(['yes', 'yes'], ['no', 'no'])", expected: 0, desc: "none match, so accuracy should be 0" },
    ],
  },

  "boss.oracle": {
    id: "boss.oracle",
    pyPackages: ["numpy"],
    lesson: {
      title: "Review: A Full Data Science & ML Pipeline",
      body: "This final boss walks the entire pipeline a real data scientist follows: describe your data with NumPy, scale it, train a model with gradient descent, make predictions, and evaluate how good those predictions are. Every piece is something you've already built — this just strings them together.",
      example: "# One epoch = one pass through ALL the data\nfor x, y in zip(xs, ys):\n    weight, bias = gradient_step(x, y, weight, bias, lr)\n# Repeat for many epochs to let it converge",
      points: ["Describe → scale → train → predict → evaluate is the real ML workflow", "An epoch is one full pass over the training data", "Accuracy is correct predictions divided by total predictions"],
    },
    title: "Boss: The Oracle",
    skill: null,
    location: "loc.oraclesanctum",
    isBoss: true,
    story:
      "The Oracle's many eyes open at once. \"SHOW ME YOU UNDERSTAND, NOT JUST THAT YOU CAN COPY.\" Five " +
      "trials form the complete pipeline — everything from the AI Citadel.\n\n" +
      "1. `describe_data(values)` — using NumPy, return `(mean, std)` as a tuple of plain floats.\n\n" +
      "2. `normalize_data(values)` — using NumPy, standardize the values (subtract the mean, divide by the " +
      "std) and return the result as a plain Python list.\n\n" +
      "3. `train(xs, ys, weight, bias, lr, epochs)` — starting from `weight` and `bias`, call the " +
      "gradient-descent update ONCE PER (x, y) PAIR, for `epochs` full passes over the data. Update rule: " +
      "`prediction = weight * x + bias`, `error = prediction - y`, `weight = weight - lr * 2 * error * x`, " +
      "`bias = bias - lr * 2 * error`. Return the final `(weight, bias)`.\n\n" +
      "4. `predict_all(xs, weight, bias)` — return a list of `weight * x + bias` for every `x` in `xs`, " +
      "using your trained model to make predictions.\n\n" +
      "5. `evaluate(predictions, actuals)` — return the fraction of predictions that exactly match the " +
      "actual values.",
    starter:
`import numpy as np

def describe_data(values):
    # Return (mean, std) as a tuple of plain floats, using NumPy

    pass


def normalize_data(values):
    # Standardize values with NumPy: (arr - mean) / std, returned as a list

    pass


def train(xs, ys, weight, bias, lr, epochs):
    for epoch in range(epochs):
        for x, y in zip(xs, ys):
            prediction = weight * x + bias
            error = prediction - y
            weight = weight - lr * 2 * error * x
            bias = bias - lr * 2 * error
    return weight, bias


def predict_all(xs, weight, bias):
    # Return [weight * x + bias for x in xs]

    pass


def evaluate(predictions, actuals):
    # Return the fraction of predictions that match actuals

    pass
`,
    hints: [
      "describe_data and normalize_data are the same shape as the Observatory quests — just named for the final pipeline.",
      "train() is already fully implemented in the starter code — it's the same update rule from Train the Oracle, just looped.",
      "predict_all is a one-line list comprehension. evaluate is the same pattern as accuracy() from the Forge of Models.",
      "Full solution:\n\nimport numpy as np\n\ndef describe_data(values):\n    arr = np.array(values)\n    return float(np.mean(arr)), float(np.std(arr))\n\n\ndef normalize_data(values):\n    arr = np.array(values)\n    mean, std = np.mean(arr), np.std(arr)\n    return ((arr - mean) / std).tolist()\n\n\ndef train(xs, ys, weight, bias, lr, epochs):\n    for epoch in range(epochs):\n        for x, y in zip(xs, ys):\n            prediction = weight * x + bias\n            error = prediction - y\n            weight = weight - lr * 2 * error * x\n            bias = bias - lr * 2 * error\n    return weight, bias\n\n\ndef predict_all(xs, weight, bias):\n    return [weight * x + bias for x in xs]\n\n\ndef evaluate(predictions, actuals):\n    correct = sum(1 for p, a in zip(predictions, actuals) if p == a)\n    return correct / len(predictions)",
    ],
    tests: [
      { call: "describe_data([2, 4, 4, 4, 5, 5, 7, 9])", expected: [5, 2], desc: "describe_data(...) should return mean=5, std=2" },
      { call: "normalize_data([3, 5])", expected: [-1, 1], desc: "normalize_data([3, 5]) should center and scale to [-1, 1]" },
      {
        call: "[round(v, 4) for v in train([1, 2, 3], [2, 4, 6], 0, 0, 0.1, 100)]",
        expected: [2, 0],
        desc: "training on y = 2x should converge close to weight=2, bias=0",
      },
      {
        call: "predict_all([1, 2], 2, 1)",
        expected: [3, 5],
        desc: "predict_all([1, 2], 2, 1) should return [3, 5]",
      },
      { call: "evaluate([1, 0, 1, 1], [1, 0, 0, 1])", expected: 0.75, desc: "evaluate([1,0,1,1], [1,0,0,1]) should be 0.75" },
    ],
  },
};
