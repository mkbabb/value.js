// SERVED MODEL: claude-fable-5-1 — F.W1 unit f (successor seat, 2026-09-18). THE ONE DECLARED CAPTURE FAMILY (§5.2).
// One bounded Playwright session against the fourier DEV server at the post-cut tree (538db90), covering:
//   G10 (five disclosure surfaces: close COMPLETES and ANIMATES) · G12 (the morph runs; phase returns to "idle")
//   G18 (a REAL pointer drag; anim.scrubbing === true mid-drag) · FR-CP-5 (the configurator chevron rotates, never snaps)
//   ESC-3 (six SelectTrigger callsites / five files: the edge is present) · the cross-edge-9 checkpoint readings + shots.
// The killed predecessor seat's capture SCRIPT died with the host restart (only its JSON + JPGs survived), so this
// file is the instrument of record: every figure in F-W1-LOG.md is read from THIS script's output, double-run.
// READ-ONLY against the product: it clicks, hovers, drags and reads computed style. It writes two files, both
// inside docs/tranches/X/fourier/evidence/w1/shots/.
//
// usage: node capture-family.mjs <runTag> [baseURL]        (cwd-independent; playwright is resolved from fourier web/)
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const FOURIER = "/Users/mkbabb/Programming/fourier-analysis";
const require = createRequire(`${FOURIER}/web/package.json`);
const { chromium } = require("@playwright/test");

const RUN = process.argv[2] ?? "run1";
const BASE = process.argv[3] ?? "http://localhost:3000";
const OUT = path.join(path.dirname(new URL(import.meta.url).pathname), "shots");
const IMAGE = `${FOURIER}/assets/animals/golden-retriever.webp`;

const rec = { servedModel: "claude-fable-5-1", run: RUN, base: BASE, started: new Date().toISOString(), steps: {}, stepErrors: {}, console: [], pageErrors: [] };
const shot = async (page, name, opts = {}) => { const f = path.join(OUT, `${RUN}-${name}.jpg`); await page.screenshot({ path: f, type: "jpeg", quality: 60, ...opts }); rec.steps[`shot:${name}`] = path.basename(f); };
// A step that throws is RECORDED as a step error (a harness fact), never swallowed into a green.
const step = async (name, fn) => { currentStep = name; try { rec.steps[name] = await fn(); } catch (e) { rec.stepErrors[name] = String(e?.message ?? e).slice(0, 400); } };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
const page = await ctx.newPage();
page.on("console", (m) => { if (m.type() === "error") rec.console.push(m.text().slice(0, 300)); });
let currentStep = "boot";
page.on("pageerror", (e) => rec.pageErrors.push({ step: currentStep, msg: String(e.message).slice(0, 300) }));

// ── in-page helpers ─────────────────────────────────────────────────────────────────────────────────────────────
await page.addInitScript(() => {
    // Disclosure sampler: armed BEFORE the real click; samples the controlled region every frame for `ms`.
    window.__armDisclosure = (trigger, ms = 1400) => new Promise((resolve) => {
        const id = trigger.getAttribute("aria-controls");
        const el0 = id && document.getElementById(id);
        const h0 = el0 ? el0.getBoundingClientRect().height : null;
        const samples = []; const t0 = performance.now(); let flipAt = null;
        const tick = () => {
            const ms1 = performance.now() - t0;
            const el = id && document.getElementById(id);
            const expanded = trigger.getAttribute("aria-expanded");
            if (flipAt === null && expanded === "false") flipAt = ms1;
            if (el) { const cs = getComputedStyle(el); samples.push({ ms: +ms1.toFixed(1), h: +el.getBoundingClientRect().height.toFixed(2), state: el.dataset.state, anim: cs.animationName, hidden: el.hidden, disp: cs.display }); }
            else samples.push({ ms: +ms1.toFixed(1), present: false });
            if (ms1 < ms) requestAnimationFrame(tick); else resolve({ h0, flipAt, samples });
        };
        requestAnimationFrame(tick);
    });
    window.__pinia = () => document.querySelector("#app").__vue_app__.config.globalProperties.$pinia;
    window.__store = (id) => window.__pinia()._s.get(id);
});

async function measureClose(trigger) {
    // ensure OPEN first
    if ((await trigger.getAttribute("aria-expanded")) !== "true") { await trigger.click(); await page.waitForTimeout(700); }
    const handle = await trigger.elementHandle();
    const armed = page.evaluate((t) => window.__armDisclosure(t), handle);
    await page.waitForTimeout(60);
    await trigger.click();                                   // the REAL click
    const { h0, flipAt, samples } = await armed;
    const post = samples.filter((s) => flipAt !== null && s.ms >= flipAt);
    const inter = [...new Set(post.filter((s) => s.present !== false && s.h > 0.5 && s.h < h0 - 0.5).map((s) => Math.round(s.h)))];
    const done = post.find((s) => s.present === false || s.hidden || s.disp === "none" || s.h === 0);
    const last = samples[samples.length - 1];
    const out = {
        h0, framesAfterFlip: post.length,
        closeCompletedMsAfterFlip: done ? +(done.ms - flipAt).toFixed(1) : null,
        completes: !!done && (last.present === false || last.hidden || last.disp === "none" || last.h === 0),
        distinctIntermediateHeights: inter.length, sampleIntermediate: inter.slice(0, 8),
        animNamesSeen: [...new Set(post.map((s) => s.anim).filter((a) => a && a !== "none"))],
        last,
    };
    out.animates = out.distinctIntermediateHeights >= 3 && out.animNamesSeen.length > 0;
    await trigger.click(); await page.waitForTimeout(500);   // restore OPEN, and prove the surface re-opens
    out.reopenedAriaExpanded = await trigger.getAttribute("aria-expanded");
    return out;
}

const readTriggers = (scope) => page.evaluate((sel) => [...document.querySelectorAll(sel)].map((el) => {
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    return { ariaLabel: el.getAttribute("aria-label"), text: el.textContent.trim().slice(0, 24), hasEdgeClass: el.classList.contains("glass-control-edge"), hasCapsuleHover: el.classList.contains("glass-capsule-hover"), boxShadow: cs.boxShadow.slice(0, 140), border: cs.border, borderRadius: cs.borderRadius, size: [Math.round(r.width), Math.round(r.height)], visible: r.width > 0 && r.height > 0, variantAttr: el.getAttribute("variant"), dataVariant: el.dataset.variant ?? null };
}), scope);

// ═══ A. /equation — three CollapsibleSection surfaces + the cartoon/disclosure checkpoint readings ═══════════════
await page.goto(`${BASE}/equation`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
for (const title of ["Function", "Controls", "Coefficients"]) {
    await step(`G10:equation/${title}`, () => measureClose(page.locator("button.collapsible-trigger").filter({ hasText: title }).first()));
}
await step("edge9:cartoon", () => page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const cards = [...document.querySelectorAll(".cartoon-surface, .cartoon-card")];
    const c = cards[0]; const cs = c && getComputedStyle(c);
    const body = document.querySelector(".disclosure-content"); const bs = body && getComputedStyle(body);
    return { shadowCartoonToken: root.getPropertyValue("--shadow-cartoon").trim().slice(0, 60), cartoonCount: cards.length, firstCardBoxShadowHead: cs?.boxShadow.slice(0, 90), firstCardTransition: cs?.transitionProperty.slice(0, 80),
        disclosureBody: bs ? { count: document.querySelectorAll(".disclosure-content").length, color: bs.color, fontSize: bs.fontSize, lineHeight: bs.lineHeight, padding: bs.padding, role: body.getAttribute("role"), ariaLabelledby: !!body.getAttribute("aria-labelledby") } : null };
}));
await step("edge9:cartoon-hover", async () => {
    const card = page.locator(".cartoon-surface, .cartoon-card").first();
    const read = () => card.evaluate((el) => { const cs = getComputedStyle(el); return { transform: cs.transform, translate: cs.translate, boxShadowHead: cs.boxShadow.slice(0, 60) }; });
    const rest = await read(); await card.hover(); await page.waitForTimeout(450); const hover = await read();
    await page.mouse.move(2, 2);
    return { rest, hover, hoverLiftPresent: JSON.stringify(rest) !== JSON.stringify(hover) };
});
await shot(page, "02-equation");

// ═══ B. G12 — run the morph BY EXECUTION, twice (→dark, →light). idle is reached only after play() resolves ×3 ═══
for (const n of [1, 2]) {
    await step(`G12:run${n}`, async () => {
        const btn = page.locator("button.sun-moon-toggle").first();
        const before = await btn.evaluate((el) => { const m = el.__vueParentComponent.setupState.morph; return { phase: m.phase.value, dark: document.documentElement.classList.contains("dark") }; });
        const errsBefore = rec.pageErrors.length;
        const sampler = btn.evaluate((el) => new Promise((resolve) => {
            const m = el.__vueParentComponent.setupState.morph; const phases = []; const t0 = performance.now(); let leftIdle = false;
            const tick = () => { const p = m.phase.value; const ms = performance.now() - t0; if (phases[phases.length - 1]?.p !== p) phases.push({ p, ms: +ms.toFixed(0) }); if (p !== "idle") leftIdle = true;
                if ((leftIdle && p === "idle") || ms > 9000) resolve({ phases, finalPhase: p, finalProgress: m.morphProgress.value, elapsedMs: +ms.toFixed(0), timedOut: ms > 9000 }); else requestAnimationFrame(tick); };
            requestAnimationFrame(tick);
        }));
        await page.waitForTimeout(50);
        await btn.click();                                   // the REAL click → handleToggle → morph.morphTo → play() ×3
        const r = await sampler;
        const after = await page.evaluate(() => document.documentElement.classList.contains("dark"));
        return { before, ...r, darkAfter: after, newPageErrors: rec.pageErrors.slice(errsBefore), pass: r.finalPhase === "idle" && !r.timedOut && r.phases.map((x) => x.p).join(">") === "idle>settle-out>morph>settle-in>idle" && r.finalProgress === 1 };
    });
    await page.waitForTimeout(300);
}

// ═══ C. workspace — upload → /w/<slug> ══════════════════════════════════════════════════════════════════════════
await page.goto(`${BASE}/visualize`, { waitUntil: "networkidle" });
await page.getByTestId("image-file-input").setInputFiles(IMAGE);
await page.waitForURL(/\/w\//, { timeout: 20000 });
await page.locator("canvas").first().waitFor({ state: "visible", timeout: 60000 });
await page.waitForTimeout(2500);
rec.steps["workspace:url"] = page.url();

// FR-CP-5 — the ConfiguratorLayer chevron (producer-owned; `transition-disclosure` over the `rotate` longhand)
await step("FR-CP-5:chevron", async () => {
    const trig = page.locator("button.configurator-layer-trigger").filter({ hasText: "Contour" }).first();
    const sample = async () => { const h = await trig.elementHandle(); const p = page.evaluate((t) => new Promise((resolve) => { const svg = t.querySelector("svg"); const out = []; const t0 = performance.now(); let flip = null; const sig = () => `${t.getAttribute("data-state")}|${t.getAttribute("aria-expanded")}`; const st0 = sig();
        const tick = () => { const ms = performance.now() - t0; if (flip === null && sig() !== st0) flip = ms; if (flip !== null) out.push({ ms: +(ms - flip).toFixed(0), rotate: getComputedStyle(svg).rotate }); if (ms < 6000 && (flip === null || ms - flip < 1000)) requestAnimationFrame(tick); else resolve({ triggerStateBefore: st0, triggerStateAfter: sig(), flipAtMs: flip === null ? null : +flip.toFixed(0), chevronClass: svg.getAttribute("class"), transitionProperty: getComputedStyle(svg).transitionProperty, transitionDuration: getComputedStyle(svg).transitionDuration, samples: out }); }; requestAnimationFrame(tick); }), h);
        await page.waitForTimeout(60); await trig.click(); return p; };
    const open = await sample(); await page.waitForTimeout(200);
    const dist = (s) => [...new Set(s.samples.map((x) => x.rotate))];
    const o = dist(open);
    return { triggerStateBefore: open.triggerStateBefore, triggerStateAfter: open.triggerStateAfter, flipAtMs: open.flipAtMs, chevronClass: open.chevronClass, transitionProperty: open.transitionProperty, transitionDuration: open.transitionDuration, openDistinctRotateValues: o.length, openSeries: open.samples.filter((_, i) => i % 6 === 0).slice(0, 12), rotatesNotSnaps: o.length >= 4 };
});
// G10 #4 — ContourSettings "Advanced" (the twin) inside the now-open Contour layer
await step("G10:workspace/ContourSettings.advanced", () => measureClose(page.locator("button.advanced-trigger:visible").first()));
await step("ESC-3:workspace(ContourSettings+SpeedSelect)", () => readTriggers("button[role=combobox]"));
await step("edge9:FR-CP-13", () => page.evaluate(() => { const p = document.querySelector(".viz-panel-left"); if (!p) return null; const kids = [...p.children].filter((k) => k.getBoundingClientRect().height > 0); const gaps = []; for (let i = 1; i < kids.length; i++) gaps.push(+(kids[i].getBoundingClientRect().top - kids[i - 1].getBoundingClientRect().bottom).toFixed(1)); return { gap: getComputedStyle(p).gap, rowGap: getComputedStyle(p).rowGap, childCount: kids.length, interChildGapsPx: gaps, firstChildClass: kids[0]?.className.slice(0, 80), firstChildRadius: kids[0] && getComputedStyle(kids[0]).borderRadius }; }));
await shot(page, "06-viz-panel-left", { clip: { x: 0, y: 60, width: 520, height: 840 } });

// G18 — a REAL pointer drag on the timeline; the store is observed through pinia's own $onAction (no product byte touched)
await step("G18:drag", async () => {
    const dock = page.locator(".animation-dock").first(); await dock.hover(); await page.waitForTimeout(900);
    const slider = page.locator(".timeline-slider").first(); const box = await slider.boundingBox();
    await page.evaluate(() => { const s = window.__store("animation"); window.__calls = []; window.__unsub = s.$onAction(({ name, after }) => { const at = +performance.now().toFixed(1); after(() => window.__calls.push({ name, at, scrubbingAfter: s.scrubbing })); }); });
    const read = () => page.evaluate(() => { const s = window.__store("animation"); return { scrubbing: s.scrubbing, t: +s.t.toFixed(3), playing: s.playing }; });
    const stBefore = await read();
    const y = box.y + box.height / 2; const x0 = box.x + box.width * 0.15;
    await page.mouse.move(x0, y); await page.mouse.down();
    const mid = [];
    for (let i = 1; i <= 8; i++) { await page.mouse.move(x0 + (box.width * 0.05) * i, y, { steps: 3 }); await page.waitForTimeout(40); mid.push(await read()); }
    await page.mouse.up(); await page.waitForTimeout(250);
    const after = await read(); const calls = await page.evaluate(() => { window.__unsub(); return window.__calls; });
    const names = calls.map((c) => c.name);
    return { trackBox: box, stBefore, midSeries: mid, after, callOrderHead: calls.slice(0, 4), callNames: [...new Set(names)], totalCalls: calls.length,
        startScrubFired: names.includes("startScrub"), endScrubFired: names.includes("endScrub"), scrubbingTrueMidDrag: mid.length > 0 && mid.every((m) => m.scrubbing === true), scrubbingFalseAfter: after.scrubbing === false,
        startScrubPrecedesFirstScrubbingSeek: names.indexOf("startScrub") > -1 && names.indexOf("startScrub") <= 1 };
});
await shot(page, "04-animation-dock-expanded", { clip: { x: 0, y: 640, width: 1440, height: 260 } });
await step("edge9:tooltip", async () => {
    await page.locator(".animation-dock").first().hover(); await page.waitForTimeout(500);
    await page.locator(".animation-dock .play-btn:visible").first().hover(); await page.waitForTimeout(900);
    return page.evaluate(() => { const tip = document.querySelector("[role=tooltip]")?.closest(".glass-floating, [data-side]") ?? document.querySelector(".z-tooltip"); if (!tip) return null; const cs = getComputedStyle(tip); return { classes: tip.className.slice(0, 90), text: tip.textContent.trim().slice(0, 40), fontSize: cs.fontSize, padding: cs.padding, borderRadius: cs.borderRadius, size: [Math.round(tip.getBoundingClientRect().width), Math.round(tip.getBoundingClientRect().height)] }; });
});
await shot(page, "05-tooltip", { clip: { x: 0, y: 600, width: 700, height: 300 } });
await step("edge9:badge-metric", () => page.evaluate(() => [...document.querySelectorAll(".badge-atom, [class*=metric]")].slice(0, 4).map((el) => { const cs = getComputedStyle(el); return { tag: el.tagName, cls: el.className.toString().slice(0, 70), boxShadowHead: cs.boxShadow.slice(0, 80), outline: cs.outlineStyle, color: cs.color }; })));
await page.mouse.move(2, 2);

// G10 #5 — ContourPreview "Preview" lives in the EDITOR panel: enter edit mode through the dock's own control
await step("workspace:editMode", async () => {
    const anchor = page.locator(".controls-dock-anchor").first();
    const dock = anchor.locator(".glass-dock, [class*=dock]").first();
    await dock.hover(); await page.waitForTimeout(900);
    const pencil = page.locator("button:has(svg.lucide-pencil)").first();
    const pencilVisible = await pencil.isVisible().catch(() => false);
    if (!pencilVisible) return { pencilVisible, dockHtmlHead: await anchor.evaluate((el) => el.innerHTML.slice(0, 400)) };
    await pencil.click(); await page.waitForTimeout(1500);
    await page.mouse.move(2, 2); await page.waitForTimeout(400);
    return { pencilVisible, previewTriggerVisible: await page.locator("button.collapsible-trigger").filter({ hasText: "Preview" }).first().isVisible() };
});
await step("G10:workspace/ContourPreview.Preview", () => measureClose(page.locator("button.collapsible-trigger").filter({ hasText: "Preview" }).first()));
await shot(page, "03-editor-panel", { clip: { x: 0, y: 60, width: 520, height: 840 } });
await shot(page, "07-workspace-full");

// ═══ D. /gallery — the filter drawer's two pickers, then the admin Users list's picker ═══════════════════════════
await page.goto(`${BASE}/gallery`, { waitUntil: "networkidle" }); await page.waitForTimeout(800);
await step("gallery:cards", () => page.evaluate(() => { const c = document.querySelectorAll(".gallery-card, [class*=gallery-card]"); return { cardCount: c.length, firstCardBoxShadowHead: c[0] ? getComputedStyle(c[0]).boxShadow.slice(0, 90) : null }; }));
await step("ESC-3:gallery-drawer(GallerySearchBar×2)", async () => {
    const toggle = page.locator("button[aria-label*=ilter], button:has(svg.lucide-sliders-horizontal), button:has(svg.lucide-filter)").first();
    await toggle.click(); await page.waitForTimeout(700);
    return readTriggers("button[role=combobox]");
});
await shot(page, "09-gallery-filter-drawer");
await step("ESC-3:gallery-admin(AdminUserList)", async () => {
    await page.evaluate(() => window.__store("gallery").activateAdmin("dev")); await page.waitForTimeout(900);
    const adminMode = await page.evaluate(() => window.__store("gallery").adminMode);
    await page.locator("button[role=tab]").filter({ hasText: "Users" }).first().click(); await page.waitForTimeout(1500);
    const triggers = await readTriggers("button[role=combobox]");
    const admin = await page.evaluate(() => [...document.querySelectorAll("[class*=admin] , .tabular-nums")].slice(0, 3).map((el) => ({ cls: el.className.toString().slice(0, 60), fontSize: getComputedStyle(el).fontSize, fontVariantNumeric: getComputedStyle(el).fontVariantNumeric })));
    return { adminMode, triggers, adminLabelReadings: admin };
});
await shot(page, "10-gallery-admin-users");

// ═══ E. /morph — MorphPhaseConfig's picker (one callsite, rendered per phase) ═══════════════════════════════════
await page.goto(`${BASE}/morph`, { waitUntil: "networkidle" }); await page.waitForTimeout(1000);
await step("ESC-3:morph(MorphPhaseConfig)", () => readTriggers("button[role=combobox]"));
await shot(page, "11-morph");

rec.finished = new Date().toISOString();
fs.writeFileSync(path.join(OUT, `${RUN}-capture.json`), JSON.stringify(rec, null, 1));
await browser.close();

// ── the verdict lines, printed from the settled record ─────────────────────────────────────────────────────────
const s = rec.steps; const g10 = Object.keys(s).filter((k) => k.startsWith("G10:"));
console.log(`RUN ${RUN}`);
for (const k of g10) console.log(`  ${k}: completes=${s[k].completes} animates=${s[k].animates} h0=${s[k].h0} closeMs=${s[k].closeCompletedMsAfterFlip} inter=${s[k].distinctIntermediateHeights} anim=${s[k].animNamesSeen}`);
for (const n of [1, 2]) console.log(`  G12:run${n}: pass=${s[`G12:run${n}`]?.pass} phases=${s[`G12:run${n}`]?.phases?.map((p) => p.p).join(">")} ms=${s[`G12:run${n}`]?.elapsedMs} pageErrors=${s[`G12:run${n}`]?.newPageErrors?.length}`);
const d = s["G18:drag"]; console.log(`  G18: startScrub=${d?.startScrubFired} scrubbingMid=${d?.scrubbingTrueMidDrag} falseAfter=${d?.scrubbingFalseAfter} endScrub=${d?.endScrubFired} calls=${d?.totalCalls}`);
const c = s["FR-CP-5:chevron"]; console.log(`  FR-CP-5: rotatesNotSnaps=${c?.rotatesNotSnaps} distinct=${c?.openDistinctRotateValues} transitionProperty=${c?.transitionProperty}`);
for (const k of Object.keys(s).filter((k) => k.startsWith("ESC-3:"))) { const t = Array.isArray(s[k]) ? s[k] : s[k].triggers; console.log(`  ${k}: triggers=${t.length} edge=${t.filter((x) => x.hasEdgeClass).length} visible=${t.filter((x) => x.visible).length}`); }
console.log(`  console.error lines=${rec.console.length} pageErrors=${rec.pageErrors.length} stepErrors=${JSON.stringify(rec.stepErrors)}`);
