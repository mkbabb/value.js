// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.l — the regex probe behind the escape-run cure (bbnf-lang `unrollEscapeRuns`): on the keyframes.js sheet
// (G-large), every quote position is matched with the string-literal regex as grammars spell it (S/D: a star over
// `\\[\s\S]|[^q\\]`) and unrolled (SU/DU), and with a code-unit loop; `*_fail` is the one unclosed `'` 178 KB from
// the end. One fresh page per engine; ms per pass (mean of 20).
//   node bench/paired/yarr.mjs   → bench/records/2026-09-24-x-p-w7-yarr.json
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const { webkit, firefox, chromium } = await import(new URL("../../node_modules/playwright/index.mjs", import.meta.url).href);
const sheet = readFileSync(new URL("./sheets/keyframes-js-index.css", import.meta.url), "utf8");
const probe = (sheet) => {
  const S = new RegExp(`'(?:\\\\[\\s\\S]|[^'\\\\])*'`, "y"), SU = new RegExp(`'[^'\\\\]*(?:\\\\[\\s\\S][^'\\\\]*)*'`, "y");
  const D = new RegExp(`"(?:\\\\[\\s\\S]|[^"\\\\])*"`, "y"), DU = new RegExp(`"[^"\\\\]*(?:\\\\[\\s\\S][^"\\\\]*)*"`, "y");
  const T = new Uint8Array(128).fill(1); T[39] = 0; T[92] = 0; const TD = new Uint8Array(128).fill(1); TD[34] = 0; TD[92] = 0;
  const loop = (s, p, q, tb) => { let i = p + 1; for (;;) { const c = s.charCodeAt(i); if (c < 128) { if (tb[c] === 1) { i++; continue; } if (c === 92) { if (i + 1 >= s.length) return -1; i += 2; continue; } return c === q ? i + 1 : -1; } if (c === c) { i++; continue; } return -1; } };
  const sq = [], dq = []; for (let i = 0; i < sheet.length; i++) { const c = sheet.charCodeAt(i); if (c === 39) sq.push(i); if (c === 34) dq.push(i); }
  const fails = sq.filter((p) => { S.lastIndex = p; return !S.test(sheet); });
  const t = (f, reps = 20) => { const t0 = performance.now(); let n = 0; for (let k = 0; k < reps; k++) n += f(); return [+((performance.now() - t0) / reps).toFixed(3), n / reps]; };
  const run = (R, P) => () => { let n = 0; for (const p of P) { R.lastIndex = p; n += R.test(sheet) ? R.lastIndex : -1; } return n; };
  const lp = (P, q, tb) => () => { let n = 0; for (const p of P) n += loop(sheet, p, q, tb); return n; };
  return { fails: fails.length, failPos: fails[0], S_fail: t(run(S, fails)), SU_fail: t(run(SU, fails)), loop_fail: t(lp(fails, 39, T)),
    S_all: t(run(S, sq)), SU_all: t(run(SU, sq)), loop_sq: t(lp(sq, 39, T)), D_all: t(run(D, dq)), DU_all: t(run(DU, dq)), loop_dq: t(lp(dq, 34, TD)) };
};
const record = { tag: "yarr", instrument: "bench/paired/yarr.mjs (X.P.W7.l)", uptimeStart: execSync("uptime", { encoding: "utf8" }).trim(), versions: {}, results: {} };
for (const [name, L] of Object.entries({ chromium, webkit, firefox })) {
  const b = await L.launch(); const p = await b.newPage();
  record.versions[name] = b.version();
  record.results[name] = await p.evaluate(`(${probe})(${JSON.stringify(sheet)})`);
  console.log(name, JSON.stringify(record.results[name]));
  await b.close();
}
record.uptimeEnd = execSync("uptime", { encoding: "utf8" }).trim();
writeFileSync(new URL("../records/2026-09-24-x-p-w7-yarr.json", import.meta.url), JSON.stringify(record, null, 1));
