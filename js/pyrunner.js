/* ============================================================
   Python Challenge Runner
   Runs the player's real Python code in the browser via Pyodide
   and checks it against each quest's test cases. Supports quests
   that rely on real scientific-computing packages (e.g. numpy),
   loaded on demand via quest.pyPackages.
   ============================================================ */

let _pyodideInstance = null;
let _pyodideLoading = null;
const _loadedPackages = new Set();

/** Lazily load Pyodide once, and reuse the same instance after that. */
function getPyodide(onStatus) {
  if (_pyodideInstance) return Promise.resolve(_pyodideInstance);
  if (_pyodideLoading) return _pyodideLoading;

  onStatus && onStatus("Summoning the Python spirits (loading runtime)...");
  _pyodideLoading = loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
  }).then((pyodide) => {
    _pyodideInstance = pyodide;
    return pyodide;
  });
  return _pyodideLoading;
}

async function ensurePackages(pyodide, packages, onStatus) {
  const missing = (packages || []).filter((p) => !_loadedPackages.has(p));
  if (missing.length === 0) return;
  onStatus && onStatus(`Loading ${missing.join(", ")} (first time only)...`);
  await pyodide.loadPackage(missing);
  missing.forEach((p) => _loadedPackages.add(p));
}

/**
 * Run the player's code against a quest's test cases.
 * @param {string} userCode - the full Python source the player wrote.
 * @param {object} quest - the quest object (uses .tests and optional .pyPackages)
 * @param {function} onStatus - optional progress callback
 * @returns {Promise<{ passed: boolean, results: Array }>}
 */
async function runChallenge(userCode, quest, onStatus) {
  const pyodide = await getPyodide(onStatus);
  if (quest.pyPackages && quest.pyPackages.length) {
    await ensurePackages(pyodide, quest.pyPackages, onStatus);
  }

  const results = [];

  for (const test of quest.tests) {
    const harness = `
import json as __cq_json

def __cq_default(o):
    # Make numpy/pandas return values JSON-serializable without the
    # player needing to think about it.
    if hasattr(o, "tolist"):
        return o.tolist()
    if hasattr(o, "item"):
        return o.item()
    if hasattr(o, "to_dict"):
        return o.to_dict()
    raise TypeError(f"Object of type {type(o)} is not JSON serializable")

def __cq_run():
    try:
        __cq_value = (${test.call})
        return __cq_json.dumps({"ok": True, "value": __cq_value}, default=__cq_default)
    except Exception as __cq_e:
        return __cq_json.dumps({"ok": False, "error": f"{type(__cq_e).__name__}: {__cq_e}"})

__cq_run()
`;
    const fullCode = `${userCode}\n${harness}`;

    let outcome;
    try {
      // Fresh globals per test so earlier tests can't leak state into later ones.
      const globals = pyodide.globals.get("dict")();
      const resultStr = await pyodide.runPythonAsync(fullCode, { globals });
      globals.destroy();
      outcome = JSON.parse(resultStr);
    } catch (err) {
      // Syntax errors, non-JSON-safe values (e.g. NaN), or other failures.
      outcome = { ok: false, error: formatPyError(err) };
    }

    if (!outcome.ok) {
      results.push({ desc: test.desc, pass: false, error: outcome.error });
      continue;
    }

    const pass = valuesEqual(outcome.value, test.expected);
    results.push({
      desc: test.desc,
      pass,
      got: outcome.value,
      expected: test.expected,
    });
  }

  const passed = results.length > 0 && results.every((r) => r.pass);
  return { passed, results };
}

/** Deep equality with a float tolerance, so numpy/float-math results
 *  aren't rejected over last-digit rounding differences. */
function valuesEqual(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) < 1e-6;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => valuesEqual(v, b[i]));
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((k) => Object.prototype.hasOwnProperty.call(b, k) && valuesEqual(a[k], b[k]));
  }
  return a === b;
}

function formatPyError(err) {
  const msg = (err && err.message) || String(err);
  // Trim Pyodide's verbose traceback down to the last meaningful line.
  const lines = msg.trim().split("\n");
  return lines[lines.length - 1] || msg;
}
