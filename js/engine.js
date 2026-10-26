/* ============================================================
   CodeQuest Engine
   Screen routing, skill-tree logic, quest/challenge flow.
   ============================================================ */

let SAVE = loadSave();
let currentQuestId = null;
let currentLocationId = null;
const CURRENT_REGION = "verdant-vale"; // V1 scope: only region fully built

/* ---------- Derived game state helpers ---------- */

function skillById(id) {
  return SKILLS.find((s) => s.id === id);
}

function isSkillMastered(id) {
  return SAVE.masteredSkills.includes(id);
}

function isSkillAvailable(id) {
  if (isSkillMastered(id)) return false;
  const skill = skillById(id);
  if (!skill) return false;
  if (skill.regionLocked) return false; // these never become available in V1
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
    // Boss is available once every non-boss quest in the region is complete.
    return Object.values(QUESTS)
      .filter((q) => !q.isBoss)
      .every((q) => isQuestCompleted(q.id));
  }
  if (!quest.skill) return true; // side quests (e.g. market) have no prerequisite skill
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
      if (region.id === "verdant-vale") {
        openRegion();
      } else {
        showModal(
          `<h2>${region.name}</h2>
           <p>${region.blurb}</p>
           <p style="color:var(--text-dim)">This region is coming in a future update. For now, prove your mastery in the Verdant Vale.</p>
           <div class="modal-close-row"><button class="btn-primary" data-action="close-modal">Close</button></div>`
        );
      }
    });
    canvas.appendChild(node);
  });
}

function regionLabel(id) {
  const r = REGIONS.find((r) => r.id === id);
  return r ? r.name : id;
}

/* ---------- Region Screen ---------- */

function openRegion() {
  const region = REGIONS.find((r) => r.id === CURRENT_REGION);
  document.getElementById("region-title").textContent = region.name;
  document.getElementById("region-sub").textContent = region.blurb;
  renderLocationList();
  showScreen("screen-region");
}

function renderLocationList() {
  const list = document.getElementById("location-list");
  list.innerHTML = "";
  LOCATIONS.forEach((loc) => {
    const quests = loc.quests;
    const done = quests.filter((qid) => isQuestCompleted(qid)).length;
    const isBossLoc = !!loc.isBoss;
    const bossReady = isBossLoc && isQuestAvailable("boss.mimic-merchant");
    const bossDone = isBossLoc && isQuestCompleted("boss.mimic-merchant");

    const card = document.createElement("div");
    card.className = "location-card" + (isBossLoc ? " boss" : "");
    let progressLabel;
    if (isBossLoc) {
      progressLabel = bossDone ? "Defeated ✓" : bossReady ? "Challenge available!" : "Locked — finish other quests first";
    } else {
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
  const loc = LOCATIONS.find((l) => l.id === locId);
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
    const { passed, results } = await runChallenge(code, quest.tests, (msg) => {
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
    handleBossVictory();
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

function handleBossVictory() {
  const nextRegion = REGIONS.find((r) => r.requires === "verdant-vale");
  if (nextRegion && !SAVE.unlockedRegions.includes(nextRegion.id)) {
    SAVE.unlockedRegions.push(nextRegion.id);
    persist();
  }
  showModal(
    `<div class="victory-emoji">🎉</div>
     <h2>The Mimic Merchant is defeated!</h2>
     <p>The illusion unravels, revealing the true path out of the Verdant Vale.</p>
     <p><strong>${nextRegion ? nextRegion.name : "The next region"}</strong> has appeared on the World Map.</p>
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
  const canvas = document.getElementById("skilltree-canvas");
  canvas.innerHTML = "";
  BRANCHES.forEach((branch) => {
    const col = document.createElement("div");
    col.className = "branch-col";
    const nodesHtml = SKILLS.filter((s) => s.branch === branch.id)
      .map((skill) => {
        const state = skillState(skill.id);
        const tag = state === "mastered" ? "Mastered" : state === "available" ? "Available" : "Locked";
        const desc = skill.regionLocked ? skill.desc : skill.desc;
        return `
          <div class="skill-node ${state}" data-skill="${skill.id}" data-quest="${skill.quest || ""}">
            <div class="skill-name">${state === "mastered" ? "✓ " : state === "locked" && !skill.regionLocked ? "🔒 " : ""}${escapeHtml(skill.name)}</div>
            <div class="skill-desc">${escapeHtml(desc)}</div>
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
  const rows = Object.values(QUESTS)
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

  showModal(`
    <h2>📖 Quest Journal — The Verdant Vale</h2>
    <div class="journal-section">
      <h4>Progress</h4>
      <p>${SAVE.masteredSkills.length}/${totalSkillCount()} skills mastered &middot; ${SAVE.completedQuests.length}/${totalQuestCount()} quests complete</p>
    </div>
    <div class="journal-section">
      <h4>Quests</h4>
      ${rows}
    </div>
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

updateTopbarStats();
renderMap();
