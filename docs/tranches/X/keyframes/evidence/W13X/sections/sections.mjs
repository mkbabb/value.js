// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.sections · served predicates (READ-ONLY falsifier)
// Gates: da  (addendum (c)) — the gutter between each scene's stage and the controls pane is the
//            page ground (shaped as fourier e2e/f-w14v-detached.spec.ts `da`): a shell band there
//            is what `layout="detached"` would cure;
//        db  (addendum (c)) — the lone-row matrix Reset sits in its section's glass header
//            (`#actions`, on the label's row), resets without toggling the layer, and no Reset / no
//            empty ribbon card stays in the body (shaped as f-w14v-detached.spec.ts `db`);
//        L3-15 — the Keyframes and Timeline ribbons are ONE row (no orphaned verb);
//        L1-8  — one scene stage header component per stage (`[data-scene-stage-header]`), one
//            status-badge class string in the source of the scenes;
//        L3-17 — a pointer-opened dialog (Clear all, Keyboard shortcuts) paints no focus ring.
// Usage: BASE=http://localhost:5330 RUN=before-r1 node sections.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = new URL(".", import.meta.url).pathname;
const RUN = process.env.RUN || "run";
const FR = `${OUT}frames/${RUN}/`;
fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5330";
const ONLY = (process.env.ONLY || "da,db,ribbon,header,dialog").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const res = { run: RUN, base: BASE, da: [], db: [], ribbon: [], header: [], dialog: [] };
// COHESION §0ei (owner law 2026-10-06): the real Chrome binary in new-headless mode, never a visible window.
const b = await chromium.launch({ channel: "chrome", headless: true });

async function page(w, h, theme) {
  const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: touch, hasTouch: touch, colorScheme: theme, reducedMotion: process.env.REDUCED || "reduce" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  return ctx.newPage();
}
async function go(p, scene) {
  // A fresh context per cell: storage starts empty, so no clear/reload is needed.
  await p.goto(`${BASE}/#/${scene}`);
  await sleep(5000);
}
async function pickAnimation(p, name) {
  // The transport dock idles to its summary layer (the full layer is visibility:hidden +
  // inert), so the pointer first enters the summary layer to expand it.
  const at = await p.evaluate(() => {
    const t = [...document.querySelectorAll('[aria-label="Select animation"]')].find((e) => e.getBoundingClientRect().width > 0);
    const full = t?.closest(".dock-layer"); if (!full) return null;
    const l = [...full.parentElement.children].find((e) => e !== full && getComputedStyle(e).visibility === "visible") || full.parentElement;
    const r = l.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  if (at) { await p.mouse.move(at.x, at.y); await sleep(1200); }
  await p.locator('[aria-label="Select animation"]:visible').first().click({ timeout: 5000 }); await sleep(700);
  await p.getByRole("option", { name: new RegExp("^" + name) }).first().click({ timeout: 5000 }); await sleep(1200);
}
async function surface(p, label) {
  await p.evaluate((t) => ([...document.querySelectorAll(`[data-dock-surface-item][aria-label="${t}"]`)].find((e) => e.getBoundingClientRect().width > 0) || [...document.querySelectorAll("button")].filter((e) => e.getBoundingClientRect().width > 0).find((e) => (e.getAttribute("aria-label") || e.textContent).trim() === t))?.click(), label);
  await sleep(1500);
}
// Median colour of each CSS-px region of the viewport.
async function medians(p, boxes) {
  const png = (await p.screenshot()).toString("base64");
  return p.evaluate(async ({ png, boxes }) => {
    const img = new Image(); img.src = `data:image/png;base64,${png}`; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const ctx = c.getContext("2d", { willReadFrequently: true }); ctx.drawImage(img, 0, 0);
    const s = img.width / innerWidth;
    return boxes.map(({ x, y, w, h }) => { const d = ctx.getImageData(Math.round(x * s), Math.round(y * s), Math.max(1, Math.round(w * s)), Math.max(1, Math.round(h * s))).data;
      return [0, 1, 2].map((k) => { const v = []; for (let i = k; i < d.length; i += 4) v.push(d[i]); v.sort((a, q) => a - q); return v[v.length >> 1]; }); });
  }, { png, boxes });
}

// ── da — the stage/pane gutter is the page ground (no shell band to detach) ──
if (ONLY.includes("da")) for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [1024, 768]]) for (const scene of ["spring", "sequence", "easing", "cube"]) {
  const p = await page(w, h, theme);
  const row = { cfg: `${scene}-${w}x${h}-${theme}` };
  try {
    await go(p, scene);
    const g = await p.evaluate(() => {
      const vis = [...document.querySelectorAll(".card")].map((e) => [e, e.getBoundingClientRect()]).filter(([, r]) => r.width > 150 && r.height > 60);
      const left = vis.filter(([, r]) => r.left < innerWidth / 2 && r.right < innerWidth * 0.6);
      if (!left.length) return null;
      const pane = { l: Math.min(...left.map(([, r]) => r.left)), r: Math.max(...left.map(([, r]) => r.right)), t: Math.min(...left.map(([, r]) => r.top)), b: Math.max(...left.map(([, r]) => r.bottom)) };
      const st = vis.filter(([, r]) => r.left > pane.r - 0.5).sort((a, q) => q[1].width * q[1].height - a[1].width * a[1].height)[0];
      const stage = st ? { l: st[1].left, t: st[1].top, b: st[1].bottom, cls: String(st[0].className).split(" ").slice(0, 4).join(".") } : null;
      return { pane, stage, vh: innerHeight };
    });
    if (!g) throw new Error("no pane");
    const stageL = g.stage ? g.stage.l : g.pane.r + 72;
    const gap = stageL - g.pane.r;
    const top = Math.max(g.pane.t, g.stage ? g.stage.t : g.pane.t) + 30;
    const bot = Math.min(g.pane.b, g.stage ? g.stage.b : g.pane.b) - 30;
    const [gutter, ground] = await medians(p, [{ x: g.pane.r + 3, y: top, w: Math.max(1, gap - 6), h: Math.max(1, bot - top) }, { x: 1, y: 80, w: Math.max(1, g.pane.l - 6), h: g.vh - 160 }]);
    const delta = gutter.map((v, i) => v - ground[i]);
    const spread = Math.max(...delta) - Math.min(...delta);
    const chroma = (c) => Math.max(...c) - Math.min(...c);
    Object.assign(row, { stage: g.stage?.cls ?? "(no stage surface: the scene draws on the page ground)", gap: +gap.toFixed(1), gutter, ground, delta, spread, chroma: [chroma(gutter), chroma(ground)] });
    row.band = gap >= 4 && spread <= 4 && chroma(gutter) <= chroma(ground) + 3 ? "NONE" : "BAND";
    if (w === 1440 || scene === "spring") await p.screenshot({ path: `${FR}da-${row.cfg}.png` });
  } catch (e) { row.error = String(e).slice(0, 200); }
  res.da.push(row); console.log("da", JSON.stringify(row));
  await p.context().close();
}

// ── db — the lone-row matrix Reset rides the section header (glass #actions) ──
const DB_READ = () => {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const resets = [...document.querySelectorAll("button")].filter(vis).filter((b) => /^reset\b/i.test((b.getAttribute("aria-label") || b.textContent).trim()) && !/animation|sequence/i.test(b.getAttribute("aria-label") || ""));
  // The VISIBLE Transform matrix layer (the pane may keep a second, hidden mount).
  const layer = [...document.querySelectorAll('[data-slot="configurator-layer"]')].filter(vis).find((l) => /Transform matrix/.test(l.textContent));
  const trigger = layer?.querySelector('[data-slot="configurator-layer-trigger"]');
  const t = trigger?.getBoundingClientRect();
  const ribbon = document.getElementById("controls-ribbon-target")?.closest(".card");
  return {
    resets: resets.map((b) => { const r = b.getBoundingClientRect(); const cy = (r.top + r.bottom) / 2; const hdr = b.closest('[data-slot="configurator-layer-header"]');
      return { label: (b.getAttribute("aria-label") || b.textContent).trim(), inHeader: !!hdr && !!layer && layer.contains(b) && !!trigger && !trigger.contains(b), onRow: !!t && cy >= t.top && cy <= t.bottom }; }),
    expanded: trigger?.getAttribute("aria-expanded") ?? null,
    ribbonCard: ribbon && vis(ribbon) ? { buttons: [...ribbon.querySelectorAll("button")].filter(vis).length, h: Math.round(ribbon.getBoundingClientRect().height) } : null,
    cell0: document.querySelector(".matrix-cell input")?.value ?? null,
  };
};
if (ONLY.includes("db")) for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await page(w, h, theme);
  const row = { cfg: `cube-${w}x${h}-${theme}` };
  try {
    await go(p, "cube");
    await pickAnimation(p, "Matrix");
    await surface(p, "Matrix Controls");
    const r0 = await p.evaluate(DB_READ);
    await p.screenshot({ path: `${FR}db-${row.cfg}.png` });
    row.r0 = r0;
    // Edit cell 0 through the field's own input event (the pane may sit under the
    // collapsed transport at 390, so no pointer is needed to type).
    await p.evaluate(() => { const i = document.querySelector(".matrix-cell input"); i.value = "2"; i.dispatchEvent(new Event("input", { bubbles: true })); i.dispatchEvent(new Event("change", { bubbles: true })); });
    await sleep(600);
    const edited = await p.evaluate(() => document.querySelector(".matrix-cell input")?.value ?? null);
    const hdrReset = r0.resets.find((r) => r.inHeader);
    const any = r0.resets[0];
    if (any) {
      await p.evaluate((inHeader) => { const vis = (e) => e.getBoundingClientRect().width > 0; const bs = [...document.querySelectorAll("button")].filter(vis).filter((b) => /^reset\b/i.test((b.getAttribute("aria-label") || b.textContent).trim()) && !/animation|sequence/i.test(b.getAttribute("aria-label") || ""));
        (inHeader ? bs.find((b) => b.closest('[data-slot="configurator-layer-header"]')) : bs[0]).click(); }, !!hdrReset);
      await sleep(600);
    }
    const r1 = await p.evaluate(DB_READ);
    Object.assign(row, { resets: r0.resets, ribbonCard: r0.ribbonCard, cellBefore: r0.cell0, cellEdited: edited, cellAfterReset: r1.cell0, expandedBefore: r0.expanded, expandedAfter: r1.expanded });
    const one = r0.resets.length === 1 && r0.resets[0].inHeader && r0.resets[0].onRow;
    row.db = one && !r0.ribbonCard && r1.expanded === "true" && r1.cell0 === r0.cell0 && edited !== r0.cell0 ? "GREEN" : "RED";
  } catch (e) { row.error = String(e).slice(0, 200); row.db = "RED"; }
  res.db.push(row); console.log("db", JSON.stringify(row));
  await p.context().close();
}

// ── L3-15 — the Keyframes and Timeline ribbons read as ONE row ──
if (ONLY.includes("ribbon")) for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await page(w, h, theme);
  try {
    await go(p, "cube");
    for (const s of ["Keyframes", "Timeline"]) {
      const row = { cfg: `cube-${s}-${w}x${h}-${theme}` };
      await surface(p, s);
      Object.assign(row, await p.evaluate(() => {
        const card = document.getElementById("controls-ribbon-target")?.closest(".card");
        const bs = card ? [...card.querySelectorAll("button")].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; }) : [];
        const rows = {}; for (const e of bs) { const r = e.getBoundingClientRect(); const k = Math.round((r.top + r.bottom) / 2 / 16); (rows[k] ||= []).push((e.getAttribute("aria-label") || e.textContent).trim()); }
        const rl = Object.values(rows);
        return { rows: rl, lead: bs[0] ? { name: (bs[0].getAttribute("aria-label") || bs[0].textContent).trim(), pressed: bs[0].getAttribute("aria-pressed") } : null };
      }));
      row.oneRow = row.rows.length === 1 && row.rows[0].length >= 2 ? "GREEN" : "RED";
      await p.screenshot({ path: `${FR}ribbon-${row.cfg}.png` });
      res.ribbon.push(row); console.log("ribbon", JSON.stringify(row));
    }
  } catch (e) { res.ribbon.push({ cfg: `cube-${w}-${theme}`, error: String(e).slice(0, 200) }); }
  await p.context().close();
}

// ── L1-8 — one stage header component per scene stage ──
if (ONLY.includes("header")) for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) for (const [scene, anim] of [["spring", null], ["spring", "Entry"], ["sequence", null], ["easing", null], ["square", null]]) {
  const p = await page(w, h, theme);
  const row = { cfg: `${scene}${anim ? "-" + anim : ""}-${w}x${h}-${theme}` };
  try {
    await go(p, scene);
    if (anim) await pickAnimation(p, anim);
    Object.assign(row, await p.evaluate(() => {
      const hs = [...document.querySelectorAll("[data-scene-stage-header]")];
      const badges = [...document.querySelectorAll(".status-badge")].filter((e) => e.getBoundingClientRect().width > 0);
      return { headers: hs.length, titles: hs.map((x) => x.querySelector("h2, [data-slot=card-title]")?.textContent.trim() ?? null), statusInHeader: badges.filter((x) => x.closest("[data-scene-stage-header]")).length, statusOutside: badges.filter((x) => !x.closest("[data-scene-stage-header]")).length };
    }));
    row.L1_8 = row.headers === 1 && row.statusOutside === 0 ? "GREEN" : "RED";
    await p.screenshot({ path: `${FR}header-${row.cfg}.png` });
  } catch (e) { row.error = String(e).slice(0, 200); row.L1_8 = "RED"; }
  res.header.push(row); console.log("header", JSON.stringify(row));
  await p.context().close();
}

// ── L3-17 — a pointer-opened dialog paints no focus ring ──
if (ONLY.includes("dialog")) for (const theme of ["light", "dark"]) for (const item of ["Keyboard shortcuts", "Clear all"]) {
  const p = await page(1440, 900, theme);
  const row = { cfg: `${item.replace(/ /g, "-")}-1440-${theme}` };
  try {
    await go(p, "cube");
    // The top dock idles to its summary layer; the pointer expands it first.
    const at = await p.evaluate(() => {
      const t = [...document.querySelectorAll('[aria-label="@mbabb menu"]')].find((e) => e.getBoundingClientRect().width > 0);
      const full = t?.closest(".dock-layer"); if (!full || getComputedStyle(full).visibility === "visible") return null;
      const l = [...full.parentElement.children].find((e) => e !== full && getComputedStyle(e).visibility === "visible") || full.parentElement;
      const r = l.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    if (at) { await p.mouse.move(at.x, at.y); await sleep(1200); }
    await p.getByRole("button", { name: "@mbabb menu" }).first().click(); await sleep(700);
    await p.getByRole("menuitem", { name: new RegExp(item) }).first().click(); await sleep(1200);
    Object.assign(row, await p.evaluate(() => {
      const a = document.activeElement; const cs = getComputedStyle(a);
      return { dialog: !!a.closest("[role=dialog], [role=alertdialog]"), focused: `${a.tagName.toLowerCase()}:${(a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 30)}`, focusVisible: a.matches(":focus-visible"), outline: `${cs.outlineStyle} ${cs.outlineWidth}`, boxShadow: cs.boxShadow.slice(0, 80) };
    }));
    row.ring = row.focusVisible && (row.outline.startsWith("none") === false || row.boxShadow !== "none") ? "RING" : "NONE";
    await p.screenshot({ path: `${FR}dialog-${row.cfg}.png` });
  } catch (e) { row.error = String(e).slice(0, 200); }
  res.dialog.push(row); console.log("dialog", JSON.stringify(row));
  await p.context().close();
}

fs.writeFileSync(`${OUT}${RUN}.json`, JSON.stringify(res, null, 1));
await b.close();
