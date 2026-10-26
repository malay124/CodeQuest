/* ============================================================
   Save / Progress persistence (localStorage)
   ============================================================ */

const SAVE_KEY = "codequest_save_v1";

function defaultSave() {
  return {
    masteredSkills: [],       // skill ids the player has mastered
    completedQuests: [],      // quest ids the player has solved
    unlockedRegions: ["verdant-vale"],
    currentRegion: "verdant-vale",
    code: {},                 // per-quest saved code drafts, keyed by quest id
    hintsRevealed: {},        // per-quest count of hints revealed
    createdAt: Date.now(),
  };
}

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw);
    // merge with defaults so new fields are safe to add later
    return Object.assign(defaultSave(), parsed);
  } catch (e) {
    console.warn("Save data unreadable, starting fresh.", e);
    return defaultSave();
  }
}

function writeSave(save) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch (e) {
    console.warn("Could not write save data.", e);
  }
}

function resetSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {
    /* ignore */
  }
}
