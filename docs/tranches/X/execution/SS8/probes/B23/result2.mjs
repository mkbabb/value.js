// SERVED MODEL: claude-opus-5-5 · SS-8 B23 — wb-mix-resultdisplay re-take cells (2026-10-20).
// usage: node result2.mjs <cell...>  cells: tone2 copy teleport2
// tone2: the first `tone` take sampled a plate scrolled UNDER the sticky commit footer (plate y=503 > visible
// scroller bottom ~487 at 1440x900) — this one scrolls the plate into view first.
// copy: C r6 R6-5 (stale "Copied!" over a changed payload) re-taken through the real Mix verb.
// teleport2: MR-35 with each consumer isolated + diagnostics.
import { launch, open, readyMix, addCurrent, mixButton, mixAndSettle, selectPalettes, pal, hues, save, samplePng, contrast, EVID } from "./lib.mjs";
import { resolve } from "node:path";
import { writeFileSync } from "node:fs";

const want = new Set(process.argv.slice(2));
const b = await launch();
const cell = async (name, fn) => {
    if (!want.has(name)) return;
    let out; try { out = await fn(); } catch (e) { out = { error: String(e).slice(0, 400) }; }
    save(`result2-${name}.json`, out);
    console.log(name, JSON.stringify(out).slice(0, 1400));
};
const P12 = [pal("a12", "Alpha Twelve", hues(12, 0.7, 0.15, 0)), pal("b12", "Beta Twelve", hues(12, 0.55, 0.12, 15))];
const noise = (e) => e.filter((x) => !/CORS|ERR_FAILED/.test(x));

try {
    await cell("tone2", async () => {
        const r = {};
        for (const theme of ["light", "dark"]) {
            const { ctx, p, errors } = await open(b, { theme, saved: P12 });
            try {
                await readyMix(p);
                await selectPalettes(p, ["Alpha Twelve", "Beta Twelve"]);
                await mixAndSettle(p, 700);
                await p.locator(".mix-plate").evaluate((e) => e.scrollIntoView({ block: "center" }));
                await p.waitForTimeout(500);
                const geo = await p.evaluate(() => {
                    const pl = document.querySelector(".mix-plate"); const pr = pl.getBoundingClientRect();
                    const c = document.querySelector("canvas.z-controls"); if (c) c.style.visibility = "hidden";
                    // topmost element at the sample points (proves the plate, not an overlay, is painted there)
                    const hit = (x, y) => { const e = document.elementFromPoint(x, y); return e ? (e.closest(".mix-plate") ? "plate" : (e.className || e.tagName).toString().slice(0, 40)) : null; };
                    const h3 = pl.querySelector("h3").getBoundingClientRect();
                    const y0 = h3.bottom + 4;
                    return { pr: pr.toJSON(), y0, plateBg: getComputedStyle(pl).backgroundColor, hostBg: getComputedStyle(pl.parentElement).backgroundColor,
                        hitIn: hit(pr.x + 8, y0), hitOut: hit(pr.x - 8, y0) };
                });
                const shot = await p.screenshot();
                writeFileSync(resolve(EVID, `tone2-${theme}-1440.png`), shot);
                const pts = {};
                for (let i = 0; i < 5; i++) { pts[`in${i}`] = { x: geo.pr.x + 8, y: geo.y0 + i * 3 }; pts[`out${i}`] = { x: geo.pr.x - 8, y: geo.y0 + i * 3 }; }
                const S = await samplePng(b, shot, pts);
                const med = (k) => { const a = Object.entries(S).filter(([n]) => n.startsWith(k)).map(([, v]) => v).sort((x, y) => x[0] + x[1] + x[2] - (y[0] + y[1] + y[2])); return a[a.length >> 1]; };
                r[theme] = { ...geo, plate: med("in"), host: med("out"), contrast: contrast(med("in"), med("out")), samples: S, errors: noise(errors) };
            } finally { await ctx.close(); }
        }
        return r;
    });

    await cell("copy", async () => {
        const { ctx, p, errors } = await open(b, { saved: P12, permissions: ["clipboard-read", "clipboard-write"] });
        try {
            await readyMix(p);
            await selectPalettes(p, ["Alpha Twelve", "Beta Twelve"]);
            await mixAndSettle(p, 700);
            const copyBtn = () => p.locator(".mix-plate").getByTitle(/^(Copy color|Copied!)$/);
            const payload = () => p.evaluate(() => [...document.querySelectorAll(".mix-plate .swatch-row > *")].map((e) => e.getAttribute("title")).slice(0, 2).join(" | "));
            const before = await payload();
            await copyBtn().click();
            await p.waitForTimeout(60);
            const afterCopy = { title: await copyBtn().getAttribute("title"), clip: (await p.evaluate(() => navigator.clipboard.readText().catch((e) => "ERR " + e.message))).slice(0, 50) };
            // change the payload immediately through the real verb: switch hue method, then Mix again
            const tChange = Date.now();
            await p.locator("[role=combobox]").filter({ hasText: /Shorter/ }).first().click();
            await p.getByRole("option", { name: /^Longer$/ }).first().click();
            await mixButton(p).click();
            // per-frame: when the settled plate returns, what does the copy control say, over which payload?
            const tl = await p.evaluate(async () => {
                const out = []; const t0 = performance.now();
                await new Promise((res) => { const tick = () => {
                    const pl = document.querySelector(".mix-plate"); const btn = pl && [...pl.querySelectorAll("[title]")].find((e) => /^(Copy color|Copied!)$/.test(e.getAttribute("title")));
                    out.push({ t: Math.round(performance.now() - t0), ghost: !!document.querySelector(".mix-plate--ghost"), title: btn?.getAttribute("title") ?? null,
                        payload: pl ? [...pl.querySelectorAll(".swatch-row > *")].map((e) => e.getAttribute("title")).slice(0, 1).join("") : null });
                    if (performance.now() - t0 < 2500) requestAnimationFrame(tick); else res(); }; requestAnimationFrame(tick); });
                return out;
            });
            const staleFrames = tl.filter((f) => f.title === "Copied!" && f.payload && f.payload !== null);
            return { before, afterCopy, msFromCopyToMixClick: Date.now() - tChange, payloadAfter: await payload(),
                staleCopiedFramesOverNewPayload: staleFrames.length, staleWindow: staleFrames.length ? [staleFrames[0].t, staleFrames.at(-1).t] : null,
                timeline: tl.filter((f, i) => i % 4 === 0 || f.title === "Copied!").slice(0, 60), errors: noise(errors) };
        } finally { await ctx.close(); }
    });

    await cell("teleport2", async () => {
        const sampler = () => {
            window.__lv = []; const t0 = performance.now();
            const before = new Map([...document.querySelectorAll(".swatch-row > *")].map((e) => [e, e.getBoundingClientRect().toJSON()]));
            const tick = () => {
                for (const e of document.querySelectorAll(".swatch-row > .vj-enter-leave-active")) {
                    const b0 = before.get(e); const r = e.getBoundingClientRect();
                    window.__lv.push({ t: Math.round(performance.now() - t0), dx: b0 ? +(r.x - b0.x).toFixed(1) : null, dy: b0 ? +(r.y - b0.y).toFixed(1) : null, pos: getComputedStyle(e).position });
                }
                if (performance.now() - t0 < 900) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };
        const sum = (lv) => ({ frames: lv.length, maxAbsDx: Math.max(0, ...lv.map((f) => Math.abs(f.dx ?? 0))), maxAbsDy: Math.max(0, ...lv.map((f) => Math.abs(f.dy ?? 0))), positions: [...new Set(lv.map((f) => f.pos))], head: lv.slice(0, 5) });
        const r = {};
        try {
            const { ctx, p, errors } = await open(b, {});
            try {
                await readyMix(p);
                await addCurrent(p, 4);
                await p.waitForTimeout(600);
                const rm = p.getByRole("button", { name: /^Remove .* from the mix$/ });
                const n = await rm.count();
                await p.evaluate(sampler);
                await rm.nth(1).click({ force: true });
                await p.waitForTimeout(1000);
                r.mixSourceSelector = { removeButtons: n, ...sum(await p.evaluate(() => window.__lv)), errors: noise(errors) };
            } finally { await ctx.close(); }
        } catch (e) { r.mixSourceSelector = { error: String(e).slice(0, 300) }; }
        try {
            const { ctx, p, errors } = await open(b, { route: "#/palettes", current: hues(5, 0.7, 0.15, 10), inst: false });
            try {
                await p.locator(".current-palette-well").first().waitFor({ timeout: 120000 });
                await p.waitForTimeout(1500);
                const diag = await p.evaluate(() => ({ swatches: document.querySelectorAll(".current-palette-well .swatch-row > *").length,
                    removeButtons: [...document.querySelectorAll("button[aria-label]")].filter((b) => /^Remove color .* from palette$/.test(b.getAttribute("aria-label"))).length }));
                const sw = p.locator(".current-palette-well .swatch-row > *").nth(2);
                await sw.hover(); await p.waitForTimeout(500);
                await sw.click().catch(() => {}); await p.waitForTimeout(400);
                const rm = p.getByRole("button", { name: /^Remove color .* from palette$/ });
                const n2 = await rm.count();
                await p.evaluate(sampler);
                await rm.first().click({ force: true, timeout: 8000 });
                await p.waitForTimeout(1000);
                r.currentPaletteEditor = { ...diag, removeButtonsAfterHover: n2, ...sum(await p.evaluate(() => window.__lv)), errors: noise(errors) };
                await p.screenshot({ path: resolve(EVID, "teleport2-cpe-1440-light.png") });
            } finally { await ctx.close(); }
        } catch (e) { r.currentPaletteEditor = { error: String(e).slice(0, 300) }; }
        return r;
    });
} finally {
    await b.close();
}
