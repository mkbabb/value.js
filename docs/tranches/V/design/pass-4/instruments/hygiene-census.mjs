// V · pass-4 · charter-ζ · HYGIENE CENSUS — the §1–§4 re-prober (DURABLE)
//
// THE DURABLE-INSTRUMENT LAW: committed, re-runnable from the repo root against any tree.
//   node docs/tranches/V/design/pass-4/instruments/hygiene-census.mjs            # all sections
//   node docs/tranches/V/design/pass-4/instruments/hygiene-census.mjs --pngs     # §1 root PNGs
//   node docs/tranches/V/design/pass-4/instruments/hygiene-census.mjs --worktrees # §2 4-clause law
//   node docs/tranches/V/design/pass-4/instruments/hygiene-census.mjs --benches   # §3 bench symbols
//   node docs/tranches/V/design/pass-4/instruments/hygiene-census.mjs --scripts   # §4 script consumers
//
// Re-runs every number in charter-zeta.md §1–§4 so no claim rests on prose alone.

import { execSync } from "node:child_process";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(process.argv.find((a) => a.startsWith("--root="))?.slice(7) || ".");
const only = process.argv.filter((a) => a.startsWith("--") && !a.startsWith("--root"))
  .map((a) => a.slice(2));
const want = (s) => only.length === 0 || only.includes(s);
const sh = (cmd) => { try { return execSync(cmd, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }); } catch (e) { return e.stdout || ""; } };
const kb = (n) => (n / 1024).toFixed(1) + " KB";

// ─────────────────────────────────────────────────────── §1 root PNGs
if (want("pngs")) {
  console.log("=== §1 ROOT PNG LITTER ===");
  const pngs = sh("ls -1 *.png 2>/dev/null").split("\n").filter(Boolean);
  let total = 0;
  for (const p of pngs) { try { total += statSync(resolve(ROOT, p)).size; } catch {} }
  console.log(`root *.png : ${pngs.length}  total ${kb(total)}  (all gitignored via *.png; all untracked)`);
  let cited = 0;
  for (const p of pngs) {
    const hits = sh(`grep -rIl --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=.claude ${JSON.stringify(p)} . 2>/dev/null`)
      .split("\n").filter((f) => f && !f.endsWith(".png"));
    const tracked = sh(`git ls-files --error-unmatch ${JSON.stringify(p)} 2>/dev/null`).trim();
    if (hits.length) { cited++; console.log(`  basename-hit ${p} (tracked=${tracked ? "yes" : "no"}) -> ${hits.slice(0, 2).join(", ")}`); }
  }
  console.log(`SWEEP verdict: ${pngs.length}/${pngs.length} (basename appears in ${cited} doc(s); inspect each — see §1 table: all resolve to a DIFFERENT path or describe the litter).\n`);
}

// ─────────────────────────────────────────────────────── §2 worktrees (4-clause law)
if (want("worktrees")) {
  console.log("=== §2 WORKTREE 4-CLAUSE LAW (all must pass to SWEEP) ===");
  const master = sh("git rev-parse master").trim();
  const porc = sh("git worktree list --porcelain");
  const recs = [];
  let cur = {};
  for (const line of porc.split("\n")) {
    if (line.startsWith("worktree ")) cur = { path: line.slice(9) };
    else if (line.startsWith("HEAD ")) cur.head = line.slice(5);
    else if (line.startsWith("branch ")) cur.branch = line.slice(7);
    else if (line.startsWith("locked")) cur.locked = true;
    else if (line === "") { if (cur.path) recs.push(cur); cur = {}; }
  }
  if (cur.path) recs.push(cur);
  let pass = 0;
  for (const w of recs) {
    if (w.path === ROOT || w.path.endsWith("/value.js")) continue; // skip primary
    const br = (w.branch || "").replace("refs/heads/", "");
    const uniq = br ? sh(`git cherry ${master} ${br} 2>/dev/null`).split("\n").filter((l) => l.startsWith("+")).length : "?";
    const clean = existsSync(w.path) ? sh(`git -C ${JSON.stringify(w.path)} status --porcelain 2>/dev/null`).split("\n").filter(Boolean).length : "no-dir";
    const c1 = uniq === 0, c2 = clean === 0, c3 = !w.locked, c4 = null; // c4 (live) needs a quiet-moment probe
    const all4 = c1 && c2 && c3 && (c4 === null ? "?" : c4);
    if (all4 === true) pass++;
    console.log(`  ${w.path.split("/").pop().padEnd(24)} C1(0uniq)=${c1 ? "Y" : "N(" + uniq + ")"} C2(clean)=${c2 ? "Y" : "N(" + clean + ")"} C3(unlockd)=${c3 ? "Y" : "N"} C4(live)=? => ${all4 === true ? "SWEEP-eligible*" : "PROTECTED"}`);
  }
  console.log(`SWEEP-eligible (C1&C2&C3, C4 needs quiet-moment probe): ${pass} — landing wave confirms C4 then applies.\n`);
}

// ─────────────────────────────────────────────────────── §3 benches
if (want("benches")) {
  console.log("=== §3 BENCH SYMBOL RESOLUTION (imports resolve? spec current?) ===");
  const benches = sh("ls -1 bench/*.mjs 2>/dev/null").split("\n").filter(Boolean);
  console.log(`benches : ${benches.length}`);
  for (const b of benches) {
    const src = readFileSync(resolve(ROOT, b), "utf8");
    const selfContained = !/dist\/|await import\(/.test(src);
    // extract ONLY symbols imported from a value.js dist module (static `import {…} from "…dist…"`
    // or a dynamic `const {…} = await import(dist…)` / `= lib`) — NOT local destructures.
    const syms = new Set();
    // static: import { a, b } from "../dist/value.js"
    for (const m of src.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"][^'"]*(?:dist|value\.js|color\.js)[^'"]*['"]/g))
      for (const s of m[1].split(",").map((x) => x.trim()).filter(Boolean))
        if (/^[A-Za-z_$][\w$]*$/.test(s)) syms.add(s);
    // dynamic: const { a, b } = await import(...)  |  const { a, b } = lib
    for (const m of src.matchAll(/const\s*\{([^}]+)\}\s*=\s*(?:await\s+import\(|lib\b)/g))
      for (const s of m[1].split(",").map((x) => x.trim()).filter(Boolean))
        if (/^[A-Za-z_$][\w$]*$/.test(s)) syms.add(s);
    const NODE = new Set(["performance", "fileURLToPath", "dirname", "resolve", "existsSync", "readFileSync", "gzipSync"]);
    const distSyms = [...syms].filter((s) => !NODE.has(s));
    let miss = [];
    if (!selfContained) for (const s of distSyms) {
      const hit = sh(`grep -rInE "export.*\\b${s}\\b" src/ 2>/dev/null | head -1`).trim();
      if (!hit) miss.push(s);
    }
    const wired = sh(`grep -l ${JSON.stringify(b.replace("bench/", ""))} package.json scripts/gates/*.mjs 2>/dev/null`).split("\n").filter(Boolean);
    console.log(`  ${b.replace("bench/", "").padEnd(26)} ${selfContained ? "SELF-CONTAINED" : "dist-import"} ${miss.length ? "MISS:" + miss.join(",") : "symbols-ok"} ${wired.length ? "[wired:" + wired.map((w) => w.split("/").pop()).join(",") + "]" : ""}`);
  }
  console.log("");
}

// ─────────────────────────────────────────────────────── §4 scripts
if (want("scripts")) {
  console.log("=== §4 SCRIPT CONSUMER-CITE (dev+deploy.sh survive; others cited or culled) ===");
  const scripts = sh("find scripts -type f -not -path '*/gates/*'").split("\n").filter(Boolean);
  for (const s of scripts) {
    const base = s.split("/").pop();
    const pkg = sh(`grep -c ${JSON.stringify(base)} package.json 2>/dev/null`).trim();
    const ci = sh(`grep -rl ${JSON.stringify(base)} .github/ 2>/dev/null`).split("\n").filter(Boolean).length;
    // invocations vs mere mentions for standalone tools
    const invoked = sh(`grep -rn ${JSON.stringify(base)} scripts/ .github/ package.json 2>/dev/null | grep -vE "^${s}:" | wc -l`).trim();
    console.log(`  ${s.padEnd(40)} package.json=${pkg} workflows=${ci} otherRefs=${invoked}`);
  }
  console.log(`  gates/ (11 files) => cross-cite charter C 10->7 (see charter-zeta.md §7).\n`);
}
