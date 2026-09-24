// SERVED MODEL: claude-opus-5-5
// KFA-181 summary over the audit capture's samples.json / capture.json: the live window's X wall
// extrema (|px| local maxima) and Y floor minima (py local minima); for each wall hit, the offset of the
// nearest floor minimum (ms). Drift = the trend of that offset across successive wall hits.
// Plus the child clocks while playing: (X.t mod Ydur) − Y.t.
import fs from "node:fs";
const dir = process.argv[2];
const S = JSON.parse(fs.readFileSync(dir + "/samples.json", "utf8"));
const C = JSON.parse(fs.readFileSync(dir + "/capture.json", "utf8"));
const live = []; for (const s of S) { if (!Array.isArray(s) || typeof s[0] !== "number") { if (s[0] === "PAUSE") break; continue; } if (s[4] || s[5]) live.push(s); }
const ext = (k, cmp) => { const out = []; for (let i = 2; i < live.length - 2; i++) { const v = live[i][k]; if (v == null) continue; if (cmp(v, live[i - 1][k]) && cmp(v, live[i + 1][k]) && cmp(v, live[i - 2][k]) && cmp(v, live[i + 2][k])) out.push(live[i][0]); } return out; };
const walls = ext(1, (a, b) => Math.abs(a) > Math.abs(b));
const floors = ext(2, (a, b) => a < b);
const offs = walls.map((w) => { let best = null; for (const f of floors) if (best === null || Math.abs(f - w) < Math.abs(best - w)) best = f; return best === null ? null : +(best - w).toFixed(0); });
const kids = Object.fromEntries((C.childTimesWhilePlaying || []).map((c) => [c.n, c]));
const X = kids["Bouncing X"], Y = kids["Bouncing Y"];
console.log(JSON.stringify({ liveSamples: live.length, wallHits: walls.length, floorOffsetsMs: offs, childPhaseErrMs: X && Y ? +(((X.t % Y.dur) - Y.t)).toFixed(1) : null, X: X && +X.t.toFixed(1), Y: Y && +Y.t.toFixed(1) }));
