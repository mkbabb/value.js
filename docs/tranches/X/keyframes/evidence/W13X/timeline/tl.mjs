// SERVED MODEL: claude-opus-5-5 — KF.W13X.timeline · served probe of the Timeline pane rows (read-only).
// BASE=<url> TAG=<before|after> RUN=<n> node tl.mjs  → JSON on stdout, frames under frames/<TAG>-r<RUN>-*.jpg
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5251"; const TAG = process.env.TAG || "before"; const RUN = process.env.RUN || "1";
const ONLY = process.env.CFG; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const FR = (n) => new URL(`frames/${TAG}-r${RUN}-${n}.jpg`, import.meta.url).pathname;
const CSS = `@keyframes probe {
  0% { transform: rotateX(0deg); opacity: 1; }
  50% { transform: rotateX(90deg); opacity: 0.5; }
  100% { transform: rotateX(180deg); opacity: 1; }
}`;
const out = {};
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
const cfgs = [["1440", 1440, 900, "light"], ["1440d", 1440, 900, "dark"], ["390", 390, 844, "light"], ["390d", 390, 844, "dark"], ...(process.env.TABLET ? [["768", 768, 1024, "light"]] : [])].filter((c) => !ONLY || ONLY.split(",").includes(c[0]));
const measure = (p) => p.evaluate(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const R = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)]; };
  const groups = [...document.querySelectorAll('[role=group][aria-label="Keyframe timeline"]')];
  const g = groups.find(vis); if (!g) return { mounted: groups.length, visible: 0 };
  const card = g.closest(".cartoon-surface") || g.parentElement; const track = g.querySelector(".timeline-track");
  const stage = card.querySelector(".timeline-preview-stage"); const subj = stage?.firstElementChild;
  const markers = [...g.querySelectorAll(".keyframe-marker")]; const tr = track.getBoundingClientRect();
  const carets = [...g.querySelectorAll(".timeline-caret-readout")];
  const ph = g.querySelector(".timeline-playhead") || [...track.children].find((c) => c.className.includes("bg-primary") && c.className.includes("w-0.5"));
  const pan = g.querySelector(".timeline-pan-collapse") || g.querySelector(".timeline-pan-row"); const cs = (e, k) => e ? getComputedStyle(e)[k] : null;
  const text = card.innerText;
  return {
    mounted: groups.length, visible: groups.filter(vis).length, card: R(card), track: R(track),
    trackRadius: cs(track, "borderTopLeftRadius"), trackBorder: cs(track, "borderTopColor"),
    stage: R(stage), stageVisible: !!stage && vis(stage), stageRadius: cs(stage, "borderTopLeftRadius"), stageChild: !!subj,
    subj: R(subj), subjTransform: cs(subj, "transform"), subjFits: subj ? (() => { const s = subj.getBoundingClientRect(), t = stage.getBoundingClientRect(); return s.left >= t.left - 1 && s.top >= t.top - 1 && s.right <= t.right + 1 && s.bottom <= t.bottom + 1; })() : null,
    markers: markers.map((m) => { const r = m.getBoundingClientRect(); return { x: Math.round((r.left + r.right) / 2), inL: r.left >= tr.left - 0.5, inR: r.right <= tr.right + 0.5 }; }),
    caretTops: carets.map((c) => Math.round(c.getBoundingClientRect().top)), trackBottom: Math.round(tr.bottom),
    playheadLeft: ph ? (ph.style.transform || getComputedStyle(ph).left) : null, playheadX: ph ? ph.getBoundingClientRect().left : null,
    panRowH: pan ? Math.round(pan.getBoundingClientRect().height) : null,
    monaco: card.querySelectorAll(".monaco-editor, .cm-editor, [data-css-code-editor]").length,
    upperErr: [...card.querySelectorAll(".uppercase")].filter(vis).map((e) => e.textContent.trim().slice(0, 60)),
    emptyText: /No keyframes yet/.test(text), percentMentions: (text.match(/\b\d+%/g) || []).length,
    sh: Math.round(document.scrollingElement.scrollHeight), ih: innerHeight,
  };
});
const surf = async (p, name) => {
  const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first();
  if (await bt.count()) { await bt.click().catch(() => {}); await sleep(700); }
  await p.locator(`[data-dock-tether=top] [data-dock-surface-item][aria-label="${name}"]`).first().click({ force: true }); await sleep(1100);
};
const vbtn = (p, re) => p.getByRole("button", { name: re }).filter({ visible: true }).first();
for (const [id, w, h, theme] of cfgs) {
  const touch = w < 1024; const o = (out[id] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: touch, hasTouch: touch, colorScheme: theme, reducedMotion: "reduce" });
  const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
  try {
    await p.goto(`${BASE}/#/cube`); await sleep(3500); await surf(p, "Timeline");
    o.empty = await measure(p); await p.screenshot({ path: FR(`${id}-1-empty`), type: "jpeg", quality: 70 });
    await vbtn(p, /^Import$/).click(); await sleep(600);
    await p.getByRole("dialog").locator("textarea").fill(CSS); await sleep(200);
    await p.getByRole("dialog").getByRole("button", { name: /^Import/ }).click(); await sleep(1200);
    o.populated = await measure(p); await p.screenshot({ path: FR(`${id}-2-populated`), type: "jpeg", quality: 70 });
    // KFA-55: transport play — does the playhead / preview move?
    const play = p.locator('[aria-label="Play animation"],[aria-label="Pause animation"]').filter({ visible: true }).first();
    o.transportLabel = await play.getAttribute("aria-label").catch(() => null);
    if (o.transportLabel === "Play animation") { await play.click({ force: true }).catch(() => {}); await sleep(300); }
    const samples = []; for (let i = 0; i < 12; i++) { const m = await measure(p); samples.push(`${m.playheadLeft}|${m.subjTransform}`); await sleep(100); }
    o.playDistinct = new Set(samples).size;
    const pause = p.locator('[aria-label="Pause animation"]').filter({ visible: true }).first(); if (await pause.count()) { await pause.click({ force: true }).catch(() => {}); await sleep(300); }
    // KFA-59 / UIA-KF-022 / 183 / 279: hover the middle diamond
    const mk = p.locator(".keyframe-marker").filter({ visible: true });
    o.markerCount = await mk.count();
    if (o.markerCount >= 2) {
      await mk.nth(1).hover({ force: true }); await sleep(1800);
      o.tooltip = await p.evaluate(() => { const t = [...document.querySelectorAll('[role=tooltip],[data-slot=tooltip-content]')].find((e) => e.getBoundingClientRect().width > 0); if (!t) return null; const r = t.getBoundingClientRect(); const tb = [...document.querySelectorAll('[aria-label="Undo"]')].find((e) => e.getBoundingClientRect().width > 0)?.getBoundingClientRect();
        const img = t.querySelector("img"); return { text: t.innerText.slice(0, 200), rect: [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)], coversUndo: tb ? !(r.right < tb.left || r.left > tb.right || r.bottom < tb.top || r.top > tb.bottom) : null, img: !!img, ellipsized: [...t.querySelectorAll("*")].filter((e) => getComputedStyle(e).textOverflow === "ellipsis" && e.scrollWidth > e.clientWidth).length }; });
      await p.screenshot({ path: FR(`${id}-3-hover`), type: "jpeg", quality: 70 });
      await p.mouse.move(2, 2); await sleep(400);
      // select a stop (click the caret readout)
      await p.locator(".timeline-caret-readout").filter({ visible: true }).nth(1).click({ force: true }); await sleep(900);
      o.selected = await measure(p); await p.screenshot({ path: FR(`${id}-4-selected`), type: "jpeg", quality: 70 });
      o.removeGlyph = await p.evaluate(() => { const e = [...document.querySelectorAll('[aria-label="Remove keyframe"]')].find((x) => x.getBoundingClientRect().width > 0); return e ? (e.querySelector("svg")?.getAttribute("class") || "").slice(0, 80) : null; });
    }
    // KFA-58: Controls round trip
    await surf(p, "Controls"); await surf(p, "Timeline"); o.afterRoundTrip = (await measure(p)).markers?.length ?? null;
    // expanded
    const ex = p.locator('[aria-label="Expand timeline"]').filter({ visible: true }).first();
    if (await ex.count()) { await ex.click({ force: true }); await sleep(1500); o.expanded = await measure(p); await p.screenshot({ path: FR(`${id}-5-expanded`), type: "jpeg", quality: 70 });
      // UIA-KF-021: a selected stop inside the expanded cell — is anything clipped?
      const rd = p.locator("#timeline-expanded-target .timeline-caret-readout").first(); if (await rd.count()) { await rd.click({ force: true }); await sleep(800); await p.keyboard.press("Escape"); await sleep(300); }
      o.expandedClip = await p.evaluate(() => { const c = document.getElementById("timeline-expanded-target"); return c ? { children: c.children.length, overflow: c.scrollHeight - c.clientHeight } : null; });
      await p.screenshot({ path: FR(`${id}-5b-expanded-selected`), type: "jpeg", quality: 70 });
      const col = p.locator('[aria-label="Collapse timeline"]').filter({ visible: true }).first(); if (await col.count()) { await col.click({ force: true }); await sleep(1200); } }
    // UIA-KF-182: Clear all
    const clr = p.locator('[aria-label="Clear all keyframes"]').filter({ visible: true }).first();
    if (await clr.count()) { await clr.click({ force: true }); await sleep(700); o.clear = await p.evaluate(() => ({ dialog: !!document.querySelector('[role=alertdialog]'), markers: [...document.querySelectorAll(".keyframe-marker")].filter((e) => e.getBoundingClientRect().width > 0).length }));
      await p.screenshot({ path: FR(`${id}-6-clear`), type: "jpeg", quality: 70 }); }
  } catch (e) { o.error = String(e).slice(0, 300); }
  o.pageErrors = errs; await ctx.close();
}
await b.close();
(await import("node:fs")).writeFileSync(new URL(`${TAG}-r${RUN}.json`, import.meta.url), JSON.stringify(out, null, 1));
const S = (m) => m ? `mnt${m.mounted} fit${m.subjFits} stg${m.stageVisible?1:0} rad${m.trackRadius}/${m.stageRadius} mk${(m.markers||[]).map((x)=>(x.inL&&x.inR)?1:0).join("")} caret${(m.caretTops||[]).map((t)=>t-m.trackBottom).join(",")} ph${m.playheadLeft} pan${m.panRowH} mon${m.monaco} up${(m.upperErr||[]).length} pct${m.percentMentions} sh${m.sh}/${m.ih}` : "-";
for (const [k, o] of Object.entries(out)) console.log(k, "| E:", S(o.empty), "| P:", S(o.populated), "| play", o.transportLabel, o.playDistinct, "| tip", JSON.stringify(o.tooltip && { t: o.tooltip.text.replace(/\s+/g, " ").slice(0, 90), cov: o.tooltip.coversUndo, img: o.tooltip.img, ell: o.tooltip.ellipsized }), "| S:", S(o.selected), "rm", o.removeGlyph, "| rt", o.afterRoundTrip, "| X:", S(o.expanded), "clip", JSON.stringify(o.expandedClip), "| clr", JSON.stringify(o.clear), "| err", o.error || "", o.pageErrors.length);
