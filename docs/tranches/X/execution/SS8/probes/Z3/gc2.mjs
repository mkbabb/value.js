// SS-8 · Z3 · GenerateControls refinement cells (wrap by line-box overlap, the scrubber's painted
// geometry, copy-all feedback, dead-selector premise, regenerate motion, the dock/plate verb pair).
import { cell, go, runCells, png } from "./lib.mjs";

const PLATE = "[data-generate-plate]";

/** Lines of a flex row = clusters of children whose vertical extents do not overlap. */
const LINES = () => {
    const plate = document.querySelector("[data-generate-plate]");
    const rows = [...plate.children].filter((d) => d.tagName === "DIV");
    return rows.map((row) => {
        const kids = [...row.children].map((c) => { const r = c.getBoundingClientRect(); return { tag: c.tagName, cls: c.className.toString().slice(0, 40), name: (c.getAttribute("aria-label") || c.textContent).trim().slice(0, 24), x: Math.round(r.x), top: Math.round(r.top * 10) / 10, bottom: Math.round(r.bottom * 10) / 10, w: Math.round(r.width) }; });
        const sorted = [...kids].sort((a, b) => a.top - b.top);
        let lines = 0, lastBottom = -1e9;
        for (const k of sorted) { if (k.top >= lastBottom - 0.5) { lines++; lastBottom = k.bottom; } else lastBottom = Math.max(lastBottom, k.bottom); }
        const rr = row.getBoundingClientRect();
        return { cls: row.className.toString().slice(0, 40), w: Math.round(rr.width), lines, overflowX: row.scrollWidth - row.clientWidth, kids };
    });
};

const SCRUB = () => {
    const s = document.querySelector('main [role=slider][aria-label="Number of colors"]') || [...document.querySelectorAll("main [role=slider]")].find((e) => +e.getAttribute("aria-valuemax") === 12);
    let root = s; for (let k = 0; k < 6 && root; k++) { root = root.parentElement; if (root.getBoundingClientRect().width > 100) break; }
    const rect = (e) => { const r = e.getBoundingClientRect(); return [+r.x.toFixed(1), +r.y.toFixed(1), +r.width.toFixed(1), +r.height.toFixed(1)]; };
    const painted = [root, ...root.querySelectorAll("*")].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; }).map((e) => { const cs = getComputedStyle(e); return { tag: e.tagName, cls: e.className.toString().slice(0, 60), rect: rect(e), bg: cs.backgroundColor, img: cs.backgroundImage.slice(0, 80) }; }).slice(0, 10);
    const lab = [...document.querySelectorAll("main label")].find((l) => /^Colors$/.test(l.textContent.trim()));
    return { roleSliderRect: rect(s), name: s.getAttribute("aria-label"), labelledby: s.getAttribute("aria-labelledby"), visibleLabel: lab ? { text: lab.textContent.trim(), for: lab.getAttribute("for") } : null, root: rect(root), painted };
};

const cells = {
    lines: (b) => cell(b, "lines", {}, async (p) => {
        const res = {};
        let loaded = false;
        for (const w of [1440, 1024, 768, 390]) {
            await p.setViewportSize({ width: w, height: 900 });
            if (!loaded) { await go(p, "#/generate", PLATE, 2500); loaded = true; } else await p.waitForTimeout(900);
            res[w] = await p.evaluate(LINES);
        }
        return { res };
    }),
    scrub: (b) => cell(b, "scrub", {}, async (p) => {
        await go(p, "#/generate", PLATE, 2500);
        const r = await p.evaluate(SCRUB);
        const box = await p.evaluate(() => { const r = document.querySelector('[role=slider][aria-label="Number of colors"]').parentElement.parentElement.getBoundingClientRect(); return { x: r.x - 8, y: r.y - 16, width: r.width + 16, height: r.height + 32 }; });
        await p.screenshot({ path: png("gc2-scrub-1440"), clip: box });
        const m = await p.evaluate(() => document.querySelector('[role=slider][aria-label="Number of colors"]').closest("[data-slot],[class*=slider]")?.outerHTML.replace(/<!--.*?-->/gs, "").slice(0, 900));
        return { r, html: m };
    }),
    dockverb: (b) => cell(b, "dockverb", {}, async (p) => {
        await go(p, "#/generate", PLATE, 2500);
        const info = await p.evaluate(() => [...document.querySelectorAll("button")].filter((b) => /regenerate/i.test((b.getAttribute("aria-label") || "") + " " + b.textContent)).map((b) => {
            const cs = getComputedStyle(b), r = b.getBoundingClientRect();
            let hiddenAnc = null; for (let e = b; e; e = e.parentElement) { if (e.getAttribute("aria-hidden") === "true" || e.inert || e.hasAttribute("inert")) { hiddenAnc = e.tagName + "." + e.className.toString().slice(0, 40); break; } }
            let op = 1; for (let e = b; e; e = e.parentElement) op *= +getComputedStyle(e).opacity;
            return { label: b.getAttribute("aria-label"), text: b.textContent.trim().slice(0, 30), inPlate: !!b.closest("[data-generate-plate]"), vis: cs.visibility, effOpacity: +op.toFixed(2), hiddenAnc, disabled: b.disabled, rect: [r.x, r.y, r.width, r.height].map((v) => Math.round(v)) };
        }));
        const snap = await p.evaluate(() => (navigator.userAgent, (window.__a11y = null)));
        const tree = await p.accessibility?.snapshot?.().catch(() => null);
        const names = [];
        const walk = (n) => { if (!n) return; if (n.role === "button" && /regenerate/i.test(n.name || "")) names.push(n.name); (n.children || []).forEach(walk); };
        walk(tree);
        const sw = () => p.evaluate(() => [...document.querySelectorAll(".generate-swatch")].map((e) => e.getAttribute("aria-label")).join("|"));
        const dock = info.find((i) => !i.inPlate);
        let clicked = null;
        if (dock) { const before = await sw(); await p.mouse.click(dock.rect[0] + dock.rect[2] / 2, dock.rect[1] + dock.rect[3] / 2); await p.waitForTimeout(600); clicked = { changed: before !== (await sw()) }; }
        return { info, axButtons: names, clicked };
    }),
    scrub390: (b) => cell(b, "scrub390", { w: 390, h: 844, touch: true, mobile: true }, async (p) => {
        await go(p, "#/generate", PLATE, 2500);
        const r = await p.evaluate(SCRUB);
        const hit = await p.evaluate(() => { const s = document.querySelector('[role=slider][aria-label="Number of colors"]'); const root = s.closest(".glass-slider") || s.parentElement; const b = root.getBoundingClientRect(); const cs = getComputedStyle(root, "::before"); return { root: [b.x, b.y, b.width, b.height].map((v) => +v.toFixed(1)), before: { content: cs.content, h: cs.height, inset: cs.inset } }; });
        // does a tap 14px above / below the track's centre move the value?
        const tr = r.painted.find((x) => /slider-track/.test(x.cls)).rect;
        const val = () => p.evaluate(() => +document.querySelector('[role=slider][aria-label="Number of colors"]').getAttribute("aria-valuenow"));
        const taps = {};
        for (const dy of [0, -14, 14, -20, 20]) { const v0 = await val(); await p.touchscreen.tap(tr[0] + tr[2] * 0.9, tr[1] + tr[3] / 2 + dy); await p.waitForTimeout(400); taps[dy] = [v0, await val()]; await p.touchscreen.tap(tr[0] + tr[2] * 0.2, tr[1] + tr[3] / 2); await p.waitForTimeout(300); }
        return { r, hit, taps };
    }),
    verbs: (b) => cell(b, "verbs", { permissions: ["clipboard-read", "clipboard-write"] }, async (p) => {
        await go(p, "#/generate", PLATE, 2500);
        const dead = await p.evaluate(() => ({ dataColorSurface: document.querySelectorAll("[data-color-surface]").length, generateSwatch: document.querySelectorAll(".generate-swatch").length, genWithWatercolor: [...document.querySelectorAll(".generate-swatch")].filter((e) => e.classList.contains("watercolor-swatch") || e.querySelector(".watercolor-swatch")).length }));
        const all = p.getByRole("button", { name: /Copy all colors/ }).first();
        await all.click(); await p.waitForTimeout(250);
        const allAfter = await p.evaluate(() => { const b = document.querySelector('[data-generate-plate] button[aria-label^="Cop"][aria-label*="all"]'); return { label: b?.getAttribute("aria-label"), text: b?.textContent.trim().slice(0, 30) }; });
        const allLabelsAfter = await p.evaluate(() => [...document.querySelectorAll("[data-generate-plate] button")].map((b) => b.getAttribute("aria-label")).filter((l) => /all|Copied/i.test(l || "")));
        // Two Regenerate verbs: both visible + both re-roll?
        const sw = () => p.evaluate(() => [...document.querySelectorAll(".generate-swatch")].map((e) => e.getAttribute("aria-label")).join("|"));
        const regs = p.getByRole("button", { name: "Regenerate", exact: true });
        const n = await regs.count();
        const out = { n, rolls: [] };
        for (let i = 0; i < n; i++) {
            const before = await sw();
            const vis = await regs.nth(i).isVisible();
            await regs.nth(i).click(); await p.waitForTimeout(500);
            out.rolls.push({ i, vis, inPlate: await regs.nth(i).evaluate((e) => !!e.closest("[data-generate-plate]")), changed: before !== (await sw()) });
        }
        // Motion on regenerate: sample the first swatch face colour at 0/30/80/200/600 ms
        const face = () => p.evaluate(() => { const s = document.querySelector(".generate-swatch"); const f = s.querySelector(".watercolor-swatch") || s; return getComputedStyle(f).backgroundColor + " / " + getComputedStyle(f).color + " / " + (f.getAttribute("style") || "").slice(0, 80); });
        const plateRegen = p.locator("[data-generate-plate]").getByRole("button", { name: "Regenerate", exact: true });
        const f0 = await face();
        await plateRegen.click();
        const samples = [];
        for (const t of [0, 30, 80, 200, 600]) { await p.waitForTimeout(t === 0 ? 0 : t - (samples.at(-1)?.t || 0)); samples.push({ t, f: await face() }); }
        const trans = await p.evaluate(() => { const s = document.querySelector(".generate-swatch"); const f = s.querySelector(".watercolor-swatch") || s; return { swatch: getComputedStyle(s).transitionProperty + " " + getComputedStyle(s).transitionDuration, face: getComputedStyle(f).transitionProperty + " " + getComputedStyle(f).transitionDuration, anims: document.getAnimations().filter((a) => a.effect?.target && a.effect.target.closest?.("[data-generate-plate]")).length }; });
        return { dead, allAfter, allLabelsAfter, regen: out, motion: { f0, samples, trans } };
    }),
};

runCells("gc2", cells);
