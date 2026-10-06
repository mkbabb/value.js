// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.scene · the scene swap, served (READ-ONLY measurement; headed Chromium)
// Rows: KFA-24 25 26 75 76 77 79 80 137 184 201. Usage: BASE=http://localhost:5291 RUN=before-r1 node scene.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const RUN = process.env.RUN || "run";
const BASE = process.env.BASE || "http://localhost:5291"; const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const INSTR = fs.readFileSync(`${OUT}instr.js`, "utf8");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = (id, bad, msg) => console.log(`${bad ? "RED  " : "GREEN"} ${id} ${msg}`);
const hold = (p, re, ms = 800) => p.route(re, async (r) => { await sleep(ms); await r.continue().catch(() => {}); });
const b = await chromium.launch({ channel: "chrome", headless: true });
const [w, h, theme] = (process.env.CFG || "1440x900-light").split(/[x-]/).map((v, i) => (i < 2 ? +v : v));
const cfg = `${w}x${h}-${theme}`; const touch = w < 1024;
const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, isMobile: touch, hasTouch: touch });
await ctx.addInitScript(INSTR);
const p = await ctx.newPage();
const window_ = (s, from) => s.filter((f) => f.t >= from);
const sum = (s) => ({ frames: s.length, skeleton: s.filter((f) => f.sk).length, paneGone: s.filter((f) => !f.pane).length, maxDt: Math.max(...s.map((f) => f.dt)), lbFrames: s.filter((f) => f.lb).length });
// ── 1. dock pick cube -> amiga, the amiga chunk held 800 ms (a cold swap) ──
await p.goto(`${BASE}/#/cube`); await sleep(4500);
await hold(p, /AmigaScene\.vue/, 2000);
await p.screenshot({ path: `${FR}pick-before-${cfg}.png` });
await p.locator("[data-dock-tether=top]").first().hover(); await sleep(800); await p.locator(".dock-select-trigger[aria-label=Scene]").first().click(); await sleep(800);
const sP = p.evaluate(() => window.__sample(2600));
await p.getByRole("option", { name: "Amiga" }).click();
await p.waitForFunction(() => window.__vt.calls[0]?.ready, null, { timeout: 4000 }).catch(() => {}); await sleep(90); await p.screenshot({ path: `${FR}pick-vt-mid-${cfg}.png` });
const s1 = await sP; await sleep(600); await p.screenshot({ path: `${FR}pick-after-${cfg}.png` });
const vt1 = await p.evaluate(() => window.__vt.calls.splice(0));
const a1 = sum(s1);
const resolvedAt = s1.find((f) => f.label === "Amiga" && !f.sk)?.t ?? Infinity;
const vtWin = vt1[0] ? s1.filter((f) => f.t - f.dt >= (vt1[0].ready ?? 0) - 1 && f.t <= (vt1[0].finished ?? 0)) : [];
const upd = vt1[0] ? Math.round((vt1[0].ready ?? 0) - vt1[0].t) : null;
R("KFA-25", a1.skeleton > 0, `${cfg} dock pick cube->amiga (chunk held 2000 ms): skeleton frames ${a1.skeleton}/${a1.frames} · VT calls ${vt1.length}`);
const bracketed = s1[0]?.pane && s1.at(-1)?.pane; // the pane is open before AND after (a closed phone sheet is not a pop-in)
R("KFA-75", bracketed ? a1.paneGone > 0 : false, `${cfg} controls pane absent ${a1.paneGone}/${a1.frames} frames across the swap (open before and after: ${!!bracketed})`);
const vtMax = vtWin.length ? Math.max(...vtWin.map((f) => f.dt)) : 0;
const v0 = vt1[0]; const inUpd = (f) => v0 && Math.min(f.t, v0.ready ?? 0) - Math.max(f.t - f.dt, v0.t) >= f.dt - 34; // the held interval covers all but ≤2 frames of it
const visStall = s1.filter((f) => f.dt > 100 && !inUpd(f)).map((f) => f.dt);
R("KFA-76", vt1.length === 0 || vtMax > 50 || visStall.length > 0 || a1.skeleton > 0, `${cfg} max rAF interval wholly inside the visible VT cross-fade ${vtMax} ms (${vtWin.length} frames) · stalls >100 ms on a visible (non-held) frame ${JSON.stringify(visStall)} · update phase (old paint held, mount runs) ${upd} ms · whole window ${a1.maxDt} ms · a stall on a visible blank/skeleton: ${a1.skeleton > 0}`);
R("KFA-26", !vt1[0] || vt1[0].listbox > 0, `${cfg} listbox/menu visible at the VT capture: ${vt1[0]?.listbox ?? "no VT"} · named groups ${JSON.stringify(vt1[0]?.names ?? [])}`);
const lbAfter = window_(s1, resolvedAt).filter((f) => f.lb).length;
R("KFA-201", lbAfter > 0 || (vt1[0]?.listbox ?? 1) > 0, `${cfg} Select rows visible after the new scene painted: ${lbAfter} frames (resolved t=${resolvedAt}) · at capture ${vt1[0]?.listbox ?? "no VT"}`);
const labels = [...new Set(s1.map((f) => f.label))];
const chromeNamed = (vt1[0]?.names ?? []).some((n) => n !== "scene-subject");
R("KFA-77", labels.length > 1 && vt1.length > 0 && !chromeNamed && s1.some((f) => f.vt && f.label !== labels[0]) , `${cfg} dock label sequence ${JSON.stringify(labels)} · chrome in its own VT group: ${chromeNamed} · label changes inside the capture: ${s1.some((f) => f.vt && f.label !== labels[0])}`);
// ── 2. direct hash amiga -> easing, and history.back (KFA-24) ──
await sleep(1200); await hold(p, /EasingScene\.vue/);
const sH = p.evaluate(() => window.__sample(2400));
await p.evaluate(() => { location.hash = "#/easing"; });
const s2 = await sH; const vt2 = await p.evaluate(() => window.__vt.calls.splice(0)); const a2 = sum(s2);
await p.screenshot({ path: `${FR}hash-after-${cfg}.png` });
await sleep(800);
const sB = p.evaluate(() => window.__sample(2000)); await p.goBack(); const s3 = await sB;
const vt3 = await p.evaluate(() => window.__vt.calls.splice(0)); const a3 = sum(s3);
R("KFA-24", vt2.length === 0 || vt3.length === 0 || a2.skeleton > 0, `${cfg} hash amiga->easing: VT calls ${vt2.length}, skeleton ${a2.skeleton}, pane gone ${a2.paneGone} · back easing->amiga: VT calls ${vt3.length}, skeleton ${a3.skeleton}`);
// ── 3. cold hard load #/spring, the chunk held (KFA-79 · 80 · 137 · 184) ──
const p2 = await ctx.newPage(); await hold(p2, /SpringScene\.vue/, 1200);
await p2.goto(`${BASE}/#/spring`, { waitUntil: "commit" });
const s4P = p2.evaluate(() => new Promise((r) => { const go = () => (window.__sample && document.body ? window.__sample(3500).then(r) : setTimeout(go, 5)); go(); }));
await p2.waitForSelector(".scene-skeleton__sheen", { timeout: 5000 }).catch(() => {}); await sleep(200); await p2.screenshot({ path: `${FR}cold-fallback-${cfg}.png` });
const sheen = await p2.evaluate(() => { const e = document.querySelector(".scene-skeleton__sheen"); const pl = document.querySelector(".scene-skeleton__plate"); const r = (x) => { const b = x?.getBoundingClientRect(); return b ? [b.x, b.y, b.width, b.height].map(Math.round) : null; }; return { bg: e ? getComputedStyle(e).backgroundColor : null, plate: r(pl) }; });
const s4 = await s4P; await sleep(800); await p2.screenshot({ path: `${FR}cold-resolved-${cfg}.png` });
const firstSk = s4.find((f) => f.sk);
R("KFA-79", !!firstSk && firstSk.skOp > 0, `${cfg} cold load: the skeleton's first painted frame opacity ${firstSk?.skOp ?? "never shown"} (an un-delayed fallback flashes on a sub-threshold load)`);
const alpha = (c) => { if (!c) return null; if (c === "transparent") return 0; const m = c.match(/\(([^)]+)\)/); if (!m) return null; const sl = m[1].split("/"); if (sl.length > 1) return +sl[1].trim(); const v = m[1].split(/[ ,]+/).filter(Boolean); return v.length > 3 ? +v[3] : 1; };
R("KFA-137", alpha(sheen.bg) === 1, `${cfg} sheen background ${sheen.bg} (alpha ${alpha(sheen.bg)})`);
const skStage = s4.filter((f) => f.sk).map((f) => f.stage).at(-1); const resolved = s4.filter((f) => !f.sk && f.t > (firstSk?.t ?? 0));
const stageAfter = resolved.at(-1)?.stage; const stageWidths = [...new Set(resolved.map((f) => f.stage?.[2]))];
R("KFA-80", !!skStage && !!stageAfter && Math.abs(skStage[2] - stageAfter[2]) > 2, `${cfg} stage box under the skeleton ${JSON.stringify(skStage)} -> settled scene ${JSON.stringify(stageAfter)} · stage widths after resolve ${JSON.stringify(stageWidths)}`);
const paneW = [...new Set(resolved.filter((f) => f.pane).map((f) => f.paneBox?.[2]))];
R("KFA-184", paneW.length > 1, `${cfg} controls pane widths across the resolve ${JSON.stringify(paneW)} (a growing track clips the rail content)`);
fs.writeFileSync(`${FR}samples-${cfg}.json`, JSON.stringify({ s1, vt1, s2, vt2, s3, vt3, s4, sheen }, null, 0));
await b.close();
