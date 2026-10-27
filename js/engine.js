/* ============================================================
   CodeQuest Engine
   Title screen, screen routing, skill-tree logic, quest/challenge flow.
   Supports any number of regions, driven entirely by data.js.
   ============================================================ */

let SAVE = loadSave();
let currentQuestId = null;
let currentLocationId = null;
let currentRegionId = null;

/* ---------- Derived game state helpers ---------- */

function regionById(id) {
  return REGIONS.find((r) => r.id === id);
}
function locationById(id) {
  return LOCATIONS.find((l) => l.id === id);
}
function skillById(id) {
  return SKILLS.find((s) => s.id === id);
}
function branchById(id) {
  return BRANCHES.find((b) => b.id === id);
}

/** Which region a quest belongs to, derived from its location. */
function questRegion(quest) {
  const loc = locationById(quest.location);
  return loc ? loc.region : null;
}

function isSkillMastered(id) {
  return SAVE.masteredSkills.includes(id);
}

function isSkillAvailable(id) {
  if (isSkillMastered(id)) return false;
  const skill = skillById(id);
  if (!skill) return false;
  if (skill.regionLocked) return false; // these never become available — real version lives in another region
  return skill.requires.every((req) => isSkillMastered(req));
}

function skillState(id) {
  if (isSkillMastered(id)) return "mastered";
  const skill = skillById(id);
  if (skill.regionLocked) return "locked";
  return isSkillAvailable(id) ? "available" : "locked";
}

function isQuestCompleted(id) {
  return SAVE.completedQuests.includes(id);
}

function isQuestAvailable(id) {
  if (isQuestCompleted(id)) return false;
  const quest = QUESTS[id];
  if (!quest) return false;
  if (quest.isBoss) {
    // A region's boss is available once every non-boss quest in THAT region is complete.
    const region = questRegion(quest);
    return Object.values(QUESTS)
      .filter((q) => !q.isBoss && questRegion(q) === region)
      .every((q) => isQuestCompleted(q.id));
  }
  if (!quest.skill) return true; // side quests (market, bonus) have no prerequisite skill
  const skill = skillById(quest.skill);
  return skill.requires.every((req) => isSkillMastered(req));
}

function isRegionUnlocked(id) {
  return SAVE.unlockedRegions.includes(id);
}

function totalSkillCount() {
  return SKILLS.filter((s) => !s.regionLocked).length;
}
function totalQuestCount() {
  return Object.keys(QUESTS).length;
}

function persist() {
  writeSave(SAVE);
  updateTopbarStats();
}

function hasAnyProgress(save) {
  return (
    (save.masteredSkills && save.masteredSkills.length > 0) ||
    (save.completedQuests && save.completedQuests.length > 0)
  );
}

/* ---------- Screen routing ---------- */

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateTopbarStats() {
  document.getElementById("stat-skills").textContent =
    `Skills: ${SAVE.masteredSkills.length}/${totalSkillCount()}`;
  document.getElementById("stat-quests").textContent =
    `Quests: ${SAVE.completedQuests.length}/${totalQuestCount()}`;
}

/* ---------- Title Screen ---------- */

function openTitleScreen() {
  document.getElementById("topbar").classList.add("hidden");
  const existing = loadSave();
  const hasSave = hasAnyProgress(existing);
  const continueBtn = document.getElementById("btn-continue");
  continueBtn.disabled = !hasSave;
  document.getElementById("title-save-info").textContent = hasSave
    ? `Saved game found: ${existing.masteredSkills.length} skills mastered, ${existing.completedQuests.length} quests complete.`
    : "No saved game yet — start a New Game to begin.";
  showScreen("screen-title");
}

function startNewGame() {
  const existing = loadSave();
  if (hasAnyProgress(existing)) {
    showModal(`
      <h2>Start a new game?</h2>
      <p>You have a saved game in progress (${existing.masteredSkills.length} skills, ${existing.completedQuests.length} quests). Starting a new game will erase it. This cannot be undone.</p>
      <div class="modal-close-row">
        <button class="btn-ghost" data-action="close-modal">Cancel</button>
        <button class="btn-ghost danger" id="confirm-new-game">Erase and start fresh</button>
      </div>
    `);
    document.getElementById("confirm-new-game").addEventListener("click", () => {
      resetSave();
      SAVE = defaultSave();
      hideModal();
      enterWorld();
    });
  } else {
    resetSave();
    SAVE = defaultSave();
    enterWorld();
  }
}

function continueGame() {
  SAVE = loadSave();
  enterWorld();
}

function enterWorld() {
  document.getElementById("topbar").classList.remove("hidden");
  updateTopbarStats();
  renderMap();
  showScreen("screen-map");
}

function openExitScreen() {
  persist();
  showScreen("screen-exit");
  // Works only for windows opened by script; browsers block closing a
  // user-opened tab, so we also show a friendly fallback message.
  setTimeout(() => {
    try {
      window.close();
    } catch (e) {
      /* ignored — fallback screen is already showing */
    }
  }, 50);
}

/* ---------- World Map ---------- */

function renderMap() {
  const canvas = document.getElementById("map-canvas");
  canvas.innerHTML = "";
  REGIONS.forEach((region) => {
    const unlocked = isRegionUnlocked(region.id);
    const node = document.createElement("div");
    node.className = "region-node" + (unlocked ? "" : " locked");
    node.style.left = region.mapPos.x + "%";
    node.style.top = region.mapPos.y + "%";
    node.innerHTML = `
      <div class="node-dot" style="background:${region.color}"></div>
      <div class="node-name">${region.name}</div>
      <div class="node-sub">${region.subtitle}</div>
      ${unlocked ? "" : `<div class="node-lock">🔒 Requires: ${regionLabel(region.requires)}</div>`}
    `;
    node.addEventListener("click", () => {
      if (!unlocked) return;
      openRegion(region.id);
    });
    canvas.appendChild(node);
  });
}

function regionLabel(id) {
  const r = regionById(id);
  return r ? r.name : id;
}

/* ---------- Region Screen ---------- */

function openRegion(regionId) {
  currentRegionId = regionId;
  const region = regionById(regionId);
  document.getElementById("region-title").textContent = region.name;
  document.getElementById("region-sub").textContent = region.blurb;
  renderLocationList();
  showScreen("screen-region");
}

function renderLocationList() {
  const list = document.getElementById("location-list");
  list.innerHTML = "";
  LOCATIONS.filter((loc) => loc.region === currentRegionId).forEach((loc) => {
    const quests = loc.quests;
    const isBossLoc = !!loc.isBoss;
    const bossQuestId = quests[0];
    const bossReady = isBossLoc && isQuestAvailable(bossQuestId);
    const bossDone = isBossLoc && isQuestCompleted(bossQuestId);

    const card = document.createElement("div");
    card.className = "location-card" + (isBossLoc ? " boss" : "");
    let progressLabel;
    if (isBossLoc) {
      progressLabel = bossDone ? "Defeated ✓" : bossReady ? "Challenge available!" : "Locked — finish other quests first";
    } else {
      const done = quests.filter((qid) => isQuestCompleted(qid)).length;
      progressLabel = `${done}/${quests.length} quests complete`;
    }
    card.innerHTML = `
      <div class="loc-art">${loc.npcArt}</div>
      <div class="loc-name">${loc.name}</div>
      <div class="loc-npc">${loc.npc}</div>
      <div class="loc-progress">${progressLabel}</div>
    `;
    card.addEventListener("click", () => openLocation(loc.id));
    list.appendChild(card);
  });
}

/* ---------- Location Screen ---------- */

function openLocation(locId) {
  currentLocationId = locId;
  const loc = locationById(locId);
  document.getElementById("loc-npc-art").textContent = loc.npcArt;
  document.getElementById("loc-npc-name").textContent = loc.npc + " — " + loc.name;
  document.getElementById("loc-intro").textContent = loc.intro;
  renderQuestList(loc);
  showScreen("screen-location");
}

function renderQuestList(loc) {
  const list = document.getElementById("quest-list");
  list.innerHTML = "";
  loc.quests.forEach((qid) => {
    const quest = QUESTS[qid];
    const done = isQuestCompleted(qid);
    const available = isQuestAvailable(qid);
    const row = document.createElement("div");
    row.className = "quest-row" + (done ? " done" : "") + (quest.isBoss ? " boss" : "");
    let status;
    if (done) status = quest.isBoss ? "Defeated ✓" : "Mastered ✓";
    else if (available) status = quest.isBoss ? "Ready to fight!" : "Available";
    else status = "Locked";
    row.innerHTML = `
      <div>
        <div class="quest-name">${quest.isBoss ? "⚔️ " : ""}${quest.title}</div>
      </div>
      <div class="quest-status">${status}</div>
    `;
    if (available || done) {
      row.addEventListener("click", () => openChallenge(qid));
    } else {
      row.style.opacity = "0.55";
      row.style.cursor = "not-allowed";
    }
    list.appendChild(row);
  });
}

/* ---------- Challenge Screen ---------- */

function openChallenge(questId) {
  currentQuestId = questId;
  const quest = QUESTS[questId];

  document.getElementById("challenge-title").textContent =
    (quest.isBoss ? "⚔️ " : "") + quest.title;
  document.getElementById("challenge-story").textContent = quest.story;

  const savedCode = SAVE.code[questId];
  document.getElementById("code-editor").value = savedCode || quest.starter;

  document.getElementById("hint-max").textContent = quest.hints.length;
  document.getElementById("hint-count").textContent = SAVE.hintsRevealed[questId] || 0;
  renderHintBox(questId);

  document.getElementById("results-box").innerHTML = "";
  document.getElementById("run-status").textContent = "";

  showScreen("screen-challenge");
}

function renderHintBox(questId) {
  const quest = QUESTS[questId];
  const revealed = SAVE.hintsRevealed[questId] || 0;
  const box = document.getElementById("hint-box");
  if (revealed === 0) {
    box.classList.add("hidden");
    box.innerHTML = "";
    return;
  }
  box.classList.remove("hidden");
  box.innerHTML = quest.hints
    .slice(0, revealed)
    .map((h, i) => `<div><strong>Hint ${i + 1}:</strong> ${escapeHtml(h)}</div>`)
    .join("<hr style='border-color:var(--border);opacity:0.4;margin:8px 0'>");
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function handleRunCode() {
  const quest = QUESTS[currentQuestId];
  const code = document.getElementById("code-editor").value;
  SAVE.code[currentQuestId] = code;
  persist();

  const statusEl = document.getElementById("run-status");
  const resultsBox = document.getElementById("results-box");
  const runBtn = document.getElementById("btn-run");

  runBtn.disabled = true;
  statusEl.textContent = "Running...";
  resultsBox.innerHTML = "";

  try {
    const { passed, results } = await runChallenge(code, quest, (msg) => {
      statusEl.textContent = msg;
    });

    resultsBox.innerHTML = results
      .map((r) => {
        if (r.pass) {
          return `<div class="result-row pass">✅ ${escapeHtml(r.desc)}</div>`;
        }
        const detail = r.error
          ? `Error: ${escapeHtml(r.error)}`
          : `Got: ${escapeHtml(JSON.stringify(r.got))} — Expected: ${escapeHtml(JSON.stringify(r.expected))}`;
        return `<div class="result-row fail">❌ ${escapeHtml(r.desc)}<div class="result-detail">${detail}</div></div>`;
      })
      .join("");

    if (passed) {
      statusEl.textContent = "All checks passed!";
      completeQuest(currentQuestId);
    } else {
      statusEl.textContent = "Not quite yet — check the results below.";
    }
  } catch (err) {
    statusEl.textContent = "Something went wrong running your code.";
    resultsBox.innerHTML = `<div class="result-row fail">${escapeHtml(String(err))}</div>`;
  } finally {
    runBtn.disabled = false;
  }
}

function completeQuest(questId) {
  const quest = QUESTS[questId];
  const alreadyDone = isQuestCompleted(questId);
  if (!alreadyDone) {
    SAVE.completedQuests.push(questId);
    if (quest.skill && !isSkillMastered(quest.skill)) {
      SAVE.masteredSkills.push(quest.skill);
    }
    persist();
  }

  if (quest.isBoss) {
    handleBossVictory(quest);
  } else if (!alreadyDone) {
    showModal(
      `<div class="victory-emoji">🏆</div>
       <h2>Skill Mastered!</h2>
       <p>You completed <strong>${escapeHtml(quest.title)}</strong>.</p>
       <div class="modal-close-row">
         <button class="btn-primary" data-action="close-modal">Continue</button>
       </div>`
    );
  }
}

function handleBossVictory(quest) {
  const clearedRegionId = questRegion(quest);
  const nextRegion = REGIONS.find((r) => r.requires === clearedRegionId);

  if (nextRegion && !SAVE.unlockedRegions.includes(nextRegion.id)) {
    SAVE.unlockedRegions.push(nextRegion.id);
    persist();
  }

  if (!nextRegion) {
    // Final boss of the whole game.
    showModal(
      `<div class="victory-emoji">👑</div>
       <h2>The Oracle bows before you.</h2>
       <p>You have mastered every region of The World of Code — from your first variable to building and
       evaluating a machine learning model of your own. You are, in every real sense, a Python programmer.</p>
       <div class="modal-close-row">
         <button class="btn-primary" data-action="close-modal-to-map">Return to the Map</button>
       </div>`
    );
    return;
  }

  showModal(
    `<div class="victory-emoji">🎉</div>
     <h2>${escapeHtml(regionLabel(clearedRegionId))} is cleared!</h2>
     <p>The way forward opens.</p>
     <p><strong>${escapeHtml(nextRegion.name)}</strong> has appeared on the World Map.</p>
     <div class="modal-close-row">
       <button class="btn-primary" data-action="close-modal-to-map">Return to the Map</button>
     </div>`
  );
}

function handleRevealHint() {
  const quest = QUESTS[currentQuestId];
  const revealed = SAVE.hintsRevealed[currentQuestId] || 0;
  if (revealed >= quest.hints.length) return;
  SAVE.hintsRevealed[currentQuestId] = revealed + 1;
  persist();
  document.getElementById("hint-count").textContent = SAVE.hintsRevealed[currentQuestId];
  renderHintBox(currentQuestId);
}

/* ---------- Skill Tree Screen ---------- */

function openSkillTree() {
  renderSkillTree();
  showScreen("screen-skilltree");
}

function renderSkillTree() {
  const region = regionById(currentRegionId);
  document.getElementById("skilltree-title").textContent = `${region.name} Skill Tree`;

  const canvas = document.getElementById("skilltree-canvas");
  canvas.innerHTML = "";
  BRANCHES.filter((b) => b.region === currentRegionId).forEach((branch) => {
    const col = document.createElement("div");
    col.className = "branch-col";
    const nodesHtml = SKILLS.filter((s) => s.branch === branch.id)
      .map((skill) => {
        const state = skillState(skill.id);
        const tag = state === "mastered" ? "Mastered" : state === "available" ? "Available" : "Locked";
        return `
          <div class="skill-node ${state}" data-skill="${skill.id}" data-quest="${skill.quest || ""}">
            <div class="skill-name">${state === "mastered" ? "✓ " : state === "locked" && !skill.regionLocked ? "🔒 " : ""}${escapeHtml(skill.name)}</div>
            <div class="skill-desc">${escapeHtml(skill.desc)}</div>
            <div class="skill-tag">${tag}</div>
          </div>
        `;
      })
      .join("");
    col.innerHTML = `<h3>${branch.name}</h3><p class="branch-desc">${branch.desc}</p>${nodesHtml}`;
    canvas.appendChild(col);
  });

  canvas.querySelectorAll(".skill-node.available").forEach((node) => {
    node.addEventListener("click", () => {
      const questId = node.getAttribute("data-quest");
      if (questId) openChallenge(questId);
    });
  });
}

/* ---------- Quest Journal Modal ---------- */

function openJournal() {
  const rows = REGIONS.map((region) => {
    const regionQuests = Object.values(QUESTS).filter((q) => questRegion(q) === region.id);
    if (regionQuests.length === 0) return "";
    const items = regionQuests
      .map((q) => {
        const done = isQuestCompleted(q.id);
        const available = isQuestAvailable(q.id);
        const status = done ? "Complete" : available ? "Available" : "Locked";
        return `<div class="journal-item${done ? " done" : ""}">
          <span>${q.isBoss ? "⚔️ " : ""}${escapeHtml(q.title)}</span>
          <span class="j-status">${status}</span>
        </div>`;
      })
      .join("");
    return `<div class="journal-section"><h4>${escapeHtml(region.name)}</h4>${items}</div>`;
  }).join("");

  showModal(`
    <h2>📖 Quest Journal</h2>
    <div class="journal-section">
      <h4>Overall Progress</h4>
      <p>${SAVE.masteredSkills.length}/${totalSkillCount()} skills mastered &middot; ${SAVE.completedQuests.length}/${totalQuestCount()} quests complete</p>
    </div>
    ${rows}
    <div class="modal-close-row"><button class="btn-primary" data-action="close-modal">Close</button></div>
  `);
}

/* ---------- Modal plumbing ---------- */

function showModal(html) {
  document.getElementById("modal-box").innerHTML = html;
  document.getElementById("modal-overlay").classList.remove("hidden");
}
function hideModal() {
  document.getElementById("modal-overlay").classList.add("hidden");
}

document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target.id === "modal-overlay") hideModal();
});

document.addEventListener("click", (e) => {
  const action = e.target.getAttribute && e.target.getAttribute("data-action");
  if (!action) return;
  switch (action) {
    case "close-modal":
      hideModal();
      break;
    case "close-modal-to-map":
      hideModal();
      renderMap();
      showScreen("screen-map");
      break;
    case "to-map":
      renderMap();
      showScreen("screen-map");
      break;
    case "to-region":
      renderLocationList();
      showScreen("screen-region");
      break;
    case "to-location":
      openLocation(currentLocationId);
      break;
  }
});

/* ---------- Static wiring ---------- */

document.getElementById("btn-skilltree").addEventListener("click", openSkillTree);
document.getElementById("btn-journal").addEventListener("click", openJournal);
document.getElementById("btn-run").addEventListener("click", handleRunCode);
document.getElementById("btn-hint").addEventListener("click", handleRevealHint);

document.getElementById("btn-new-game").addEventListener("click", startNewGame);
document.getElementById("btn-continue").addEventListener("click", continueGame);
document.getElementById("btn-exit").addEventListener("click", openExitScreen);
document.getElementById("btn-exit-back").addEventListener("click", openTitleScreen);
document.getElementById("btn-title").addEventListener("click", () => {
  persist();
  openTitleScreen();
});

document.getElementById("btn-reset").addEventListener("click", () => {
  showModal(`
    <h2>Reset progress?</h2>
    <p>This will erase all mastered skills, completed quests, and saved code. This cannot be undone.</p>
    <div class="modal-close-row">
      <button class="btn-ghost" data-action="close-modal">Cancel</button>
      <button class="btn-ghost danger" id="confirm-reset">Erase everything</button>
    </div>
  `);
  document.getElementById("confirm-reset").addEventListener("click", () => {
    resetSave();
    SAVE = defaultSave();
    hideModal();
    renderMap();
    showScreen("screen-map");
    updateTopbarStats();
  });
});

// Tab key inserts spaces instead of moving focus out of the editor.
document.getElementById("code-editor").addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    const el = e.target;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    el.value = el.value.slice(0, start) + "    " + el.value.slice(end);
    el.selectionStart = el.selectionEnd = start + 4;
  }
});

/* ---------- Boot ---------- */

openTitleScreen();
