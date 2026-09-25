// SERVED MODEL: claude-opus-5-5 — KF.W13X.springd · the spring discrete Entry view, served.
// READ-ONLY probe. Usage: BASE=http://localhost:5196 TAG=before RUN=1 [VPS=..] [THEMES=..] [TIMING=1] node springd.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const FR = OUT + "frames/"; fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5196";
const TAG = process.env.TAG || "before"; const RUN = process.env.RUN || "1";
const VPS = (process.env.VPS || "1440x900,360x780,390x844,430x932,844x390,768x1024,1024x768").split(",");
const THEMES = (process.env.THEMES || "light,dark").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rows = [];
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
// In-page reader: named boxes, pairwise overlaps, clip, radii, line counts.
const measure = () => {
  const vis = (e) => { if (!e) return false; const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return s.display !== "none" && s.visibility !== "hidden" && +s.opacity > 0.01 && r.width > 0 && r.height > 0; };
  const R = (e) => { const r = e.getBoundingClientRect(); return { x: +r.left.toFixed(1), y: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), b: +r.bottom.toFixed(1), r: +r.right.toFixed(1) }; };
  const lines = (e) => { const lh = parseFloat(getComputedStyle(e).lineHeight) || parseFloat(getComputedStyle(e).fontSize) * 1.2; return Math.round(e.getBoundingClientRect().height / lh); };
  const card = document.querySelector(".discrete-card");
  const plate = card?.closest(".stage-viewport")?.parentElement?.parentElement; // the stage Card
  if (!card || !plate) return { err: "no discrete view" };
  const title = [...plate.querySelectorAll("h1,h2,h3,[data-slot=card-title]")].find((e) => /starting-style/.test(e.textContent || ""));
  const header = title?.closest("[data-slot=card-header]") || title?.parentElement;
  const toggle = plate.querySelector("button[aria-controls]");
  const q = (sel) => plate.querySelector(sel);
  const find = (re) => [...plate.querySelectorAll("span,p,div,summary,button")].filter((e) => vis(e) && re.test(e.textContent || "")).sort((a, b) => (a.textContent || "").length - (b.textContent || "").length || a.querySelectorAll("*").length - b.querySelectorAll("*").length)[0];
  const boxes = { plate, header, title, card, toggle, artLabel: find(/compileToEntry\(\)/), copy: [...plate.querySelectorAll("button")].find((e) => /copy/i.test(e.getAttribute("aria-label") || e.textContent || "")), artifact: q("code.artifact") || q("[data-artifact]"), status: [...plate.querySelectorAll("[role=status],[role=alert],[data-entry-state]")].filter(vis).sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width)[0], footer: q(".active-preset-line") || q(".entry-caption"), meta: find(/^\s*ζ\s/) };
  const out = { boxes: {}, overlaps: [], vw: innerWidth, vh: innerHeight };
  for (const [k, e] of Object.entries(boxes)) if (vis(e)) out.boxes[k] = R(e);
  const names = ["header", "card", "toggle", "artLabel", "copy", "artifact", "status", "footer"];
  for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) { const a = out.boxes[names[i]], c = out.boxes[names[j]]; if (!a || !c) continue;
    const ix = Math.min(a.r, c.r) - Math.max(a.x, c.x), iy = Math.min(a.b, c.b) - Math.max(a.y, c.y); if (ix > 1 && iy > 1) out.overlaps.push(`${names[i]}x${names[j]} ${ix.toFixed(0)}x${iy.toFixed(0)}`); }
  const P = out.boxes.plate; out.clipped = names.filter((n) => out.boxes[n] && P && (out.boxes[n].b > P.b + 0.5 || out.boxes[n].y < P.y - 0.5 || out.boxes[n].r > P.r + 0.5 || out.boxes[n].x < P.x - 0.5));
  out.titleLines = title ? lines(title) : null; out.metaLines = boxes.meta && vis(boxes.meta) ? lines(boxes.meta) : null;
  out.stageH = +card.parentElement.getBoundingClientRect().height.toFixed(1);
  out.radii = { artifact: boxes.artifact ? getComputedStyle(boxes.artifact).borderTopLeftRadius : null, card: getComputedStyle(card).borderTopLeftRadius, chip: (q(".active-preset-chip") || q("[data-entry-chip]")) ? getComputedStyle(q(".active-preset-chip") || q("[data-entry-chip]")).borderTopLeftRadius : null, chipIsGlass: !!plate.querySelector("[data-slot=chip]") };
  out.toggleSkin = toggle ? toggle.className.includes("btn-playback") : null;
  out.metaStrings = ["emitted by", "response is not expressed", "compileToEntry() artifact", "eased by"].filter((s) => (plate.textContent || "").includes(s));
  out.transition = getComputedStyle(card).transition.slice(0, 200);
  const dock = [...document.querySelectorAll('[aria-label="Select animation"]')].find(vis)?.closest(".glass-dock, [data-dock-tether]");
  out.dockTop = dock ? +dock.getBoundingClientRect().top.toFixed(1) : null;
  out.plateUnderDock = dock && P ? +(P.b - dock.getBoundingClientRect().top).toFixed(1) : null;
  const sheet = [...document.querySelectorAll("[data-slot=sheet-content],[data-slot=drawer-content]")].find(vis);
  out.sheetTop = sheet ? +sheet.getBoundingClientRect().top.toFixed(1) : null;
  out.footerUnderSheet = sheet && out.boxes.footer ? +(out.boxes.footer.b - sheet.getBoundingClientRect().top).toFixed(1) : null;
  out.docSH = document.scrollingElement.scrollHeight;
  const sv = card.parentElement; out.slotMarks = [...sv.children].filter((e) => e !== card && vis(e)).length;
  // Reach: scroll the plate's scroller (if any) to its end, then ask whether the caption clears every
  // bottom occluder (the plate edge, the transport dock, the sheet's peek). Unreachable content = clipped.
  const scroller = [plate, ...plate.querySelectorAll("*")].find((e) => { const s = getComputedStyle(e); return /(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 1 && e.contains(card); });
  if (scroller) out.clipped = names.filter((n) => out.boxes[n] && P && (out.boxes[n].r > P.r + 0.5 || out.boxes[n].x < P.x - 0.5)); // vertical overflow scrolls: judged by reach
  if (scroller) scroller.scrollTop = scroller.scrollHeight;
  const fb = boxes.footer && vis(boxes.footer) ? boxes.footer.getBoundingClientRect().bottom : null;
  const floor = Math.min(P ? P.b : Infinity, dock ? dock.getBoundingClientRect().top : Infinity, sheet ? sheet.getBoundingClientRect().top : Infinity);
  out.reach = { scrolls: !!scroller, footerB: fb === null ? null : +fb.toFixed(1), floor: +floor.toFixed(1), clears: fb !== null && fb <= floor + 0.5 };
  if (scroller) scroller.scrollTop = 0;
  const play = [...document.querySelectorAll("button[aria-label]")].filter(vis).map((e) => e.getAttribute("aria-label")).filter((l) => /^(Play|Pause)/.test(l)); out.transportVerbs = play;
  return out;
};
// rAF sampler over one toggle: opacity, scale (from the matrix), display, per frame.
const sampleToggle = async () => {
  const card = document.querySelector(".discrete-card"); const toggle = card.closest(".stage-viewport").parentElement.querySelector("button[aria-controls]");
  const t0 = performance.now(); const s = [];
  toggle.click();
  await new Promise((res) => { const step = () => { const cs = getComputedStyle(card); const m = new DOMMatrix(cs.transform === "none" ? undefined : cs.transform);
    s.push({ t: Math.round(performance.now() - t0), o: +(+cs.opacity).toFixed(4), sc: +m.a.toFixed(4), d: cs.display }); if (performance.now() - t0 < 5200) requestAnimationFrame(step); else res(); }; requestAnimationFrame(step); });
  const last = s[s.length - 1]; let lastChange = 0; for (let i = 1; i < s.length; i++) if (s[i].o !== s[i - 1].o || s[i].sc !== s[i - 1].sc) lastChange = s[i].t;
  const first = (f) => (s.find(f) || {}).t ?? null;
  return { end: last, lastChange, tOpaque99: first((x) => x.o >= 0.99), tInvisible: first((x) => x.o <= 0.03), tDisplayNone: first((x) => x.d === "none"), minScale: Math.min(...s.map((x) => x.sc)), maxScale: Math.max(...s.map((x) => x.sc)), maxO: Math.max(...s.map((x) => x.o)), n: s.length };
};
for (const theme of THEMES) for (const vpS of VPS) {
  const [w, h] = vpS.split("x").map(Number); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: touch, hasTouch: touch, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  await p.goto(`${BASE}/#/spring`); await p.evaluate((t) => { try { localStorage.clear(); sessionStorage.clear(); localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme); await p.reload(); await sleep(3200);
  const row = { vp: vpS, theme };
  try {
    await p.locator('[aria-label="Select animation"]:visible').first().click({ timeout: 4000 }); await sleep(700);
    await p.getByRole("option", { name: /^Entry/ }).first().click({ timeout: 4000 }); await sleep(1500);
    const tag = `${TAG}-${vpS}-${theme}-r${RUN}`;
    await p.screenshot({ path: `${FR}${tag}-visible.jpg`, type: "jpeg", quality: 70 });
    row.visible = await p.evaluate(measure);
    if (process.env.TIMING && w === 1440) { row.exit = await p.evaluate(sampleToggle); row.dismissed = await p.evaluate(measure); await p.screenshot({ path: `${FR}${tag}-dismissed.jpg`, type: "jpeg", quality: 70 }); row.entry = await p.evaluate(sampleToggle); }
    else { await p.locator(".stage-viewport").locator("xpath=../..").locator("button[aria-controls]").first().click({ timeout: 3000 }); await sleep(1500); row.dismissed = await p.evaluate(measure); await p.screenshot({ path: `${FR}${tag}-dismissed.jpg`, type: "jpeg", quality: 70 }); }
  } catch (e) { row.err = String(e).slice(0, 200); }
  rows.push(row); console.log(JSON.stringify(row).slice(0, 1400));
  await ctx.close();
}
fs.writeFileSync(`${OUT}${TAG}-r${RUN}.json`, JSON.stringify(rows, null, 1)); await b.close();
