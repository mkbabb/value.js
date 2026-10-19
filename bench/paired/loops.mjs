// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.l — the class-run probe behind the Firefox residual: the emitted single-class-run loop (charCodeAt + a
// Uint8Array membership table; `loop`), its variants, and the same run as one sticky regex (`rx`), over every run
// start of the keyframes.js sheet (G-large), latin1 copy beside. One fresh page per engine; ms per pass (mean of 20).
//   node bench/paired/loops.mjs   → bench/records/2026-09-24-x-p-w7-loops.json
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const { webkit, firefox, chromium } = await import(new URL("../../node_modules/playwright/index.mjs", import.meta.url).href);
const sheet = readFileSync(new URL("./sheets/keyframes-js-index.css", import.meta.url), "utf8");
const probe = (sheet) => {
  const T = new Uint8Array(128); for (let c = 0; c < 128; c++) T[c] = "{}\"'".includes(String.fromCharCode(c)) ? 0 : 1;
  const TA = Array.from(T);
  const C = /[^{}"']/y, RUN = /[^{}"']+/y;
  const loop = (s, p) => { let q = p; for (; q < s.length; q++) { const c = s.charCodeAt(q); if (c < 128) { if (T[c] === 0) break; } else { C.lastIndex = q; if (!C.test(s)) break; } } return q; };
  const loopA = (s, p) => { let q = p; for (; q < s.length; q++) { const c = s.charCodeAt(q); if (c < 128) { if (TA[c] === 0) break; } else { C.lastIndex = q; if (!C.test(s)) break; } } return q; };
  const loopN = (s, p) => { let q = p; const n = s.length; for (; q < n; q++) { const c = s.charCodeAt(q); if (c < 128) { if (T[c] === 0) break; } else { C.lastIndex = q; if (!C.test(s)) break; } } return q; };
  const loopS = (s, p) => { let q = p; for (; q < s.length; q++) { const c = s.charCodeAt(q); if (c === 123 || c === 125 || c === 34 || c === 39) break; } return q; };
  const rx = (s, p) => { RUN.lastIndex = p; return RUN.test(s) ? RUN.lastIndex : p; };
  const flat = sheet.split("").join(""); const lat = sheet.replace(/[^\x00-\x7f]/g, "?");
  const starts = []; for (let i = 0; i < sheet.length; ) { starts.push(i); const e = loop(sheet, i); i = e === i ? i + 1 : e; }
  const t = (f, reps = 20) => { f(); const t0 = performance.now(); let n = 0; for (let k = 0; k < reps; k++) n += f(); return +((performance.now() - t0) / reps).toFixed(3); };
  const over = (fn, s) => () => { let n = 0; for (const p of starts) n += fn(s, p); return n; };
  return { loop: t(over(loop, sheet)), loopA: t(over(loopA, sheet)), loopN: t(over(loopN, sheet)), loopS: t(over(loopS, sheet)), rx: t(over(rx, sheet)),
    loopLatin1: t(over(loop, lat)), rxLatin1: t(over(rx, lat)) };
};
const record = { tag: "loops", instrument: "bench/paired/loops.mjs (X.P.W7.l)", uptimeStart: execSync("uptime", { encoding: "utf8" }).trim(), versions: {}, results: {} };
for (const [name, L] of Object.entries({ chromium, webkit, firefox })) {
  const b = await L.launch(); const p = await b.newPage();
  record.versions[name] = b.version();
  record.results[name] = await p.evaluate(`(${probe})(${JSON.stringify(sheet)})`);
  console.log(name, JSON.stringify(record.results[name]));
  await b.close();
}
record.uptimeEnd = execSync("uptime", { encoding: "utf8" }).trim();
writeFileSync(new URL("../records/2026-09-24-x-p-w7-loops.json", import.meta.url), JSON.stringify(record, null, 1));
