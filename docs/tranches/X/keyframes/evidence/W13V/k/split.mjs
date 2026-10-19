// SERVED MODEL: claude-opus-5-5
// X.KF.W13V.k — the open/cured split of the 228 KFA rows. Reads the register's row headers and
// assigns each row ONE disposition from the dated authorities (§0cb split, KF.W13R .v, §0bn/§0ci for
// KFA-14, the .u routing) and this seat's cures. Emits markdown rows + a tally.
import fs from "node:fs";
const REG = new URL("../../../audit/KF-ANIMATION-AUDIT.md", import.meta.url);
const text = fs.readFileSync(REG, "utf8");
const rows = [];
const re = /^### (KFA-(\d+)) · (\w+) · (.+)$/gm;
let m;
while ((m = re.exec(text))) {
  const after = text.slice(m.index, m.index + 600);
  const surf = (/\*\*Surface:\*\* ([^\n·]+)/.exec(after)?.[1] ?? "").replace(/`/g, "").trim();
  rows.push({ id: m[1], n: +m[2], sev: m[3], title: m[4], surf });
}
const CURED = JSON.parse(process.argv[2] ?? "{}"); // { "1": "sha · evidence", ... }
const LIVE13 = [7, 8, 13, 23, 50, 53, 74, 110, 115, 132, 133, 163, 168];
const HEAD12 = [11, 27, 37, 51, 52, 78, 109, 111, 202, 221, 222, 188];
const REFRAMED3 = [112, 164, 189];
const U5 = [61, 95, 134, 136, 228];
const disp = (n) => {
  if (CURED[n]) return ["CURED (this seat)", CURED[n]];
  if (n === 14) return ["honest-RED `VALUEJS-LEGACY-RGBA`", "value.js X-W12 `.l` — grammar fix in value.js 4.1.0 (acb7dca7/7e60d700), UNPUBLISHED (npm 4.0.0); publish at X-W11 (§0ci R-1) → kf bumps then"];
  if (LIVE13.includes(n)) return ["honest-RED relay-only (O-60, §0cb producer-live)", "glass BL"];
  if (HEAD12.includes(n)) return ["honest-RED until the landing repin (§0cb R-5; cured at glass HEAD)", "glass BL → landing-repin wave"];
  if (REFRAMED3.includes(n)) return ["honest-RED relay (§0cb reframed; KF.W13R .v re-read: still-live on kf 10.0.1)", "glass BL"];
  if (U5.includes(n)) return ["routed (§0cb consumer half)", "KF.W13V `.u`"];
  return ["OPEN — honest-RED, not cured this seat", "KF.W13V `.k` successor (consumer; cause in keyframes.js)"];
};
const out = rows.map((r) => { const [d, o] = disp(r.n); return { ...r, d, o }; });
const tally = {};
for (const r of out) tally[r.d.split(" (")[0].split(" `")[0]] = (tally[r.d.split(" (")[0].split(" `")[0]] || 0) + 1;
if (process.argv[3] === "md") for (const r of out) console.log(`| ${r.id} | ${r.sev} | ${r.surf.slice(0, 40)} | ${r.d} | ${r.o} |`);
else console.log(JSON.stringify({ rows: out.length, unique: new Set(out.map((r) => r.id)).size, tally }));
