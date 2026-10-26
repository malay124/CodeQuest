/* ============================================================
   Python Challenge Runner
   Runs the player's real Python code in the browser via Pyodide
   and checks it against each quest's test cases.
   ============================================================ */

let _pyodideInstance = null;
let _pyodideLoading = null;

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

/**
 * Run the player's code against a quest's test cases.
 * @param {string} userCode - the full Python source the player wrote.
 * @param {Array} tests - [{ call, expected, desc }]
 * @param {function} onStatus - optional progress callback
 * @returns {Promise<{ passed: boolean, results: Array }>}
 */
async function runChallenge(userCode, tests, onStatus) {
  const pyodide = await getPyodide(onStatus);
  const results = [];

  for (const test of tests) {
    const harness = `
import json as __cq_json

def __cq_run():
    try:
        __cq_value = (${test.call})
        return __cq_json.dumps({"ok": True, "value": __cq_value})
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
      // Syntax errors or other failures surfaced directly by Pyodide.
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

function valuesEqual(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) < 1e-9;
  }
  return JSON.stringify(a) === JSON.stringify(b);
}

function formatPyError(err) {
  const msg = (err && err.message) || String(err);
  // Trim Pyodide's verbose traceback down to the last meaningful line.
  const lines = msg.trim().split("\n");
  return lines[lines.length - 1] || msg;
}
