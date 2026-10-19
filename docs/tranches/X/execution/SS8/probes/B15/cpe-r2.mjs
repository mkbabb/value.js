// SERVED MODEL: claude-opus-5-5 · SS-8 B15 · CPE U-3 (painted focus of the hover-panel buttons) + U-4 (>50-colour draft via
// shipped add paths only). Re-run of b15-cpe.mjs cells whose selectors failed at HEAD (panel is a hover card, not role=dialog;
// hue ArrowRight steps are ~0.14deg so i*3 steps did not spread). One browser; one context per cell; closed in finally.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { open, hue, samplePng, contrast } from "../b15-seed.mjs";
const EV = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../evidence/B15-palettes");
const PANEL = '[aria-label^="Actions for"]';
const out = {};
const b = await chromium.launch();
const ONLY = process.env.CELLS ? new Set(process.env.CELLS.split(",")) : null;
const cell = async (name, fn) => { if (ONLY && !ONLY.has(name)) return; try { out[name] = await fn(); } catch (e) { out[name] = { ERROR: String(e).slice(0, 400) }; } };
try {
    for (const theme of ["light", "dark"]) {
        await cell(`U3-${theme}`, async () => {
            const { ctx, p } = await open(b, { theme, current: hue(5, 10) });
            try {
                const sw = p.locator(".swatch-row button[aria-label^='Color swatch']").first(); const r0 = await sw.boundingBox();
                await p.mouse.move(r0.x + r0.width / 2, r0.y + r0.height / 2, { steps: 6 });
                await p.locator(PANEL).first().waitFor({ state: "visible", timeout: 5000 });
                const btn = p.locator(`${PANEL} button[aria-label^='Edit color']`).first();
                const rb = await btn.boundingBox();
                const clip = { x: rb.x - 20, y: rb.y - 20, width: rb.width + 40, height: rb.height + 40 };
                const buf0 = await p.screenshot({ clip });
                await p.keyboard.press("Shift"); await btn.focus(); await p.waitForTimeout(300);
                const g = await btn.evaluate((e, sel) => { const cs = getComputedStyle(e); let rule = 0;
                    const walk = (rs) => { for (const x of rs) { if (x.cssRules) walk(x.cssRules); if (x.selectorText && x.selectorText.includes("ring-ring\\/40")) rule++; } };
                    for (const s of document.styleSheets) { try { walk(s.cssRules); } catch {} }
                    const root = getComputedStyle(document.documentElement);
                    return { focusVisible: e.matches(":focus-visible"), boxShadow: cs.boxShadow, outline: `${cs.outlineStyle} ${cs.outlineWidth}`, twRingColor: cs.getPropertyValue("--tw-ring-color"),
                        colorRingToken: root.getPropertyValue("--color-ring").trim() || "(unset)", ringToken: root.getPropertyValue("--ring").trim() || "(unset)", ringRuleCount: rule,
                        panelBg: getComputedStyle(e.closest(sel)).backgroundColor, wellBg: root.getPropertyValue("--well-bg").trim() }; }, PANEL);
                const buf1 = await p.screenshot({ clip, path: path.join(EV, `cpe-u3-focus-${theme}.png`) });
                // diff every pixel in the clip: painted ring = pixels that change on focus
                const diff = await (async () => { const c = await b.newContext(); try { const pg = await c.newPage();
                    return await pg.evaluate(async ([a, z]) => { const ld = async (u) => { const i = new Image(); i.src = u; await i.decode(); const cv = document.createElement("canvas"); cv.width = i.width; cv.height = i.height; const g = cv.getContext("2d"); g.drawImage(i, 0, 0); return g.getImageData(0, 0, i.width, i.height).data; };
                        const A = await ld(a), Z = await ld(z); const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; const L = (d, i) => 0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]);
                        let n = 0, max = 1; for (let i = 0; i < A.length; i += 4) { if (Math.abs(A[i] - Z[i]) + Math.abs(A[i + 1] - Z[i + 1]) + Math.abs(A[i + 2] - Z[i + 2]) > 6) { n++; const [x, y] = [L(A, i), L(Z, i)].sort((m, k) => k - m); max = Math.max(max, (x + 0.05) / (y + 0.05)); } }
                        return { changedPixels: n, maxRingVsUnfocused: Math.round(max * 100) / 100 }; }, ["data:image/png;base64," + buf0.toString("base64"), "data:image/png;base64," + buf1.toString("base64")]); } finally { await c.close(); } })();
                return { ...g, ...diff };
            } finally { await ctx.close(); }
        });
    }
    await cell("U4-fifty-one", async () => {
        const { ctx, p } = await open(b, { current: null });
        try {
            const H = p.locator("[role=slider][aria-label='H channel']"), L = p.locator("[role=slider][aria-label='L channel']");
            const trace = [];
            for (let i = 0; i < 52; i++) {
                await L.focus(); await L.press("Home"); for (let k = 0; k < 3 + Math.floor(i / 10); k++) await L.press("PageUp");
                await H.focus(); await H.press("Home"); for (let k = 0; k < i % 10; k++) await H.press("PageUp");
                await p.locator(".add-slot-ghost").first().click();
                if (i % 10 === 9 || i >= 49) trace.push([i + 1, await p.locator(".swatch-row button[aria-label^='Color swatch']").count()]);
            }
            await p.waitForTimeout(500);
            const n = await p.locator(".swatch-row button[aria-label^='Color swatch']").count();
            const r = await p.evaluate(() => ({ wellH: Math.round(document.querySelector(".dashed-well").getBoundingClientRect().height), label: document.querySelector("[data-well-label-row]").innerText.replace(/\s+/g, " "),
                stored: JSON.parse(localStorage.getItem("color-picker") ?? "{}").savedColors?.length ?? null, addSlotPresent: !!document.querySelector(".add-slot-ghost"), addSlotDisabled: document.querySelector(".add-slot-ghost")?.disabled ?? null }));
            await p.screenshot({ path: path.join(EV, "cpe-u4-51-colours-1440.png") });
            return { clicks: 52, trace, swatches: n, ...r };
        } finally { await ctx.close(); }
    });
} finally { await b.close(); }
fs.writeFileSync(path.join(EV, process.env.CELLS ? `b15-cpe-r2.${[...ONLY].join("+")}.out.json` : "b15-cpe-r2.out.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
