#!/usr/bin/env node
// X-DS · value · pass 6 (critic VC6) — the re-shoots and measures this pass owes, every page
// through ./harness.mjs's body-voice gate (VC6-02: no cure probe ships without it).
//   katex  : VC5-03's display-math rows on Home at 390 (re-shot under the real face).
//   tools  : VC5-02's picker tooltips at 1440, both schemes; line count and desc width re-taken.
//   poles  : VC6-04 — the P6-B1 owner pair, picker at 1440 dark: Pole A (today: stone at 50%)
//            and Pole B (the original's lighter ink offset, ~gray-700 as a tone of the
//            foreground), set at the ONE --shadow-color knob only, injected in the probe.
//            Evidence for the owner's ruling; nothing ships.
//   code   : VC6-05 — the gradient CSS plate in dark: the code paper's computed colour + crop.
// usage: node probe-vc6.mjs [--base http://localhost:9000] [--only katex,tools,poles,code]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, rendersJakarta } from "./harness.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9000");
const ONLY = opt("only", "katex,tools,poles,code").split(",");
const OUT = import.meta.dirname;
const jsonPath = path.join(OUT, "probe-vc6.json");
let out = {};
try { out = JSON.parse(fs.readFileSync(jsonPath, "utf8")); } catch {}
out.base = BASE;
const tick = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
    if (ONLY.includes("katex")) {
        out.katex = {};
        for (const theme of ["light", "dark"]) {
            const page = await newPage(browser, 390, theme);
            await bootRoute(page, BASE + "/#/");
            const rows = await page.evaluate(async () => {
                const els = [...document.querySelectorAll(".markdown-body > div.inline-block")].filter((el) => el.querySelector(":scope > .katex-display"));
                const res = [];
                for (const el of els) {
                    el.scrollIntoView({ block: "center" });
                    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                    const over = el.scrollWidth > el.clientWidth + 1;
                    const rest = getComputedStyle(el).getPropertyValue("--katex-row-edge").trim();
                    let end = rest;
                    if (over) {
                        el.scrollLeft = el.scrollWidth;
                        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                        end = getComputedStyle(el).getPropertyValue("--katex-row-edge").trim();
                        el.scrollLeft = 0;
                        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                    }
                    res.push({ text: (el.textContent || "").replace(/\s+/g, " ").slice(0, 48), scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, overflows: over, edgeAtRest: rest, edgeAtEnd: end });
                }
                const i = els.findIndex((el) => el.scrollWidth > el.clientWidth + 1);
                if (i >= 0) { els[i].setAttribute("data-vc6-probe", ""); els[i].scrollIntoView({ block: "center" }); }
                return res;
            });
            out.katex[theme] = { voice: await rendersJakarta(page), rows: rows.length, overflowing: rows.filter((r) => r.overflows).length, detail: rows };
            const row = page.locator("[data-vc6-probe]");
            if (await row.count()) {
                await page.waitForTimeout(400);
                const box = await row.boundingBox();
                await page.screenshot({ path: path.join(OUT, `katex-row-390-${theme}.png`), clip: { x: 0, y: Math.max(0, box.y - 120), width: 390, height: Math.min(844, box.height + 240) } });
            }
            await page.context().close();
        }
    }
    if (ONLY.includes("tools")) {
        out.tooltips = {};
        for (const theme of ["light", "dark"]) {
            const page = await newPage(browser, 1440, theme);
            await bootRoute(page, BASE + "/#/");
            const collapsed = page.locator(".glass-dock.collapsed");
            if (await collapsed.count()) { await collapsed.click(); await page.waitForTimeout(1500); }
            await page.getByRole("button", { name: "Toggle action bar" }).click({ timeout: 60_000 });
            await page.waitForFunction(() => !document.querySelector(".glass-dock[data-morphing]"), null, { timeout: 30_000 });
            await page.waitForTimeout(800);
            out.tooltips[theme] = { voice: await rendersJakarta(page) };
            for (const [name, token, desc] of [["Reset color", "color.reset", "Reset to the default color."], ["Copy color", "color.copy", "Copy the current color."], ["Random color", "color.random", "Pick a random color."]]) {
                try {
                    await page.locator(`[data-scene-action="${token}"]`).first().hover({ timeout: 10_000 });
                    const tip = page.getByText(desc, { exact: true }).first();
                    await tip.waitFor({ state: "visible", timeout: 10_000 });
                    await page.waitForTimeout(400);
                    out.tooltips[theme][name] = await tip.evaluate((p) => {
                        const lh = parseFloat(getComputedStyle(p).lineHeight) || 1;
                        const b = p.getBoundingClientRect();
                        const s = document.createElement("span");
                        s.textContent = p.textContent; s.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font:${getComputedStyle(p).font}`;
                        document.body.appendChild(s); const textW = s.getBoundingClientRect().width; s.remove();
                        return { text: (p.textContent || "").trim(), lines: Math.round(b.height / lh), descBoxW: Math.round(b.width), textW: Math.round(textW), fontFamily: getComputedStyle(p).fontFamily.slice(0, 60) };
                    });
                    if (name === "Copy color") await page.screenshot({ path: path.join(OUT, `tools-1440-${theme}.png`) });
                } catch (e) {
                    out.tooltips[theme][name] = { error: String(e).slice(0, 160) };
                }
                await page.mouse.move(5, 890);
                await page.waitForTimeout(500);
            }
            await page.context().close();
        }
    }
    if (ONLY.includes("poles")) {
        out.poles = {};
        const POLES = {
            A: null, // today, unchanged: .dark --shadow-color = stone, cast at 50% (foundation.css)
            // Pole B: the original (684c818f) dark offset — `dark:shadow-gray-700`, an OPAQUE lighter
            // ink. Here a tone of the foreground (34% fg over the ground ≈ gray-700's L), cast
            // unblended at the same 8px / 10px hover geometry; only the two knob tokens move.
            B: "color-mix(in oklab, var(--foreground) 34%, var(--background))",
        };
        for (const [pole, ink] of Object.entries(POLES)) {
            const page = await newPage(browser, 1440, "dark");
            await bootRoute(page, BASE + "/#/");
            if (ink) await page.addStyleTag({ content: `.dark { --shadow-color: ${ink}; --shadow-cartoon: 8px 8px 0px 0px var(--shadow-color); --shadow-cartoon-hover: 10px 10px 0px 0px var(--shadow-color); }` });
            await tick(page); await page.waitForTimeout(600);
            out.poles[pole] = await page.evaluate(() => {
                const cs = getComputedStyle(document.documentElement);
                const card = document.querySelector(".pane-wrapper .card");
                return { shadowColor: cs.getPropertyValue("--shadow-color").trim(), shadowCartoon: cs.getPropertyValue("--shadow-cartoon").trim(), cardBoxShadow: card ? getComputedStyle(card).boxShadow.slice(0, 160) : null };
            });
            await page.screenshot({ path: path.join(OUT, `poles-${pole}-picker-1440-dark.png`) });
            await page.context().close();
        }
    }
    if (ONLY.includes("code")) {
        out.code = {};
        for (const theme of ["dark", "light"]) {
            const page = await newPage(browser, 1440, theme);
            await bootRoute(page, BASE + "/#/gradient");
            const ed = page.locator("main .code-editor").first();
            await ed.scrollIntoViewIfNeeded({ timeout: 30_000 });
            await page.waitForTimeout(600);
            out.code[theme] = await ed.evaluate((el) => {
                const g = getComputedStyle(el);
                const cv = document.createElement("canvas"); cv.width = cv.height = 1;
                const c = cv.getContext("2d", { willReadFrequently: true });
                const rgb = (v) => { c.clearRect(0, 0, 1, 1); c.fillStyle = "#000"; c.fillStyle = v; c.fillRect(0, 0, 1, 1); return [...c.getImageData(0, 0, 1, 1).data].slice(0, 3); };
                const lum = ([r, gg, b]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(b); };
                const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); };
                const ground = rgb(g.backgroundColor);
                const inks = {};
                for (const k of ["--code-ink", "--code-comment", "--code-keyword", "--code-entity", "--code-string", "--code-number"]) inks[k] = cr(rgb(g.getPropertyValue(k).trim()), ground);
                return { ground: g.backgroundColor, groundToken: getComputedStyle(document.documentElement).getPropertyValue("--code-ground").trim(), accent: getComputedStyle(document.documentElement).getPropertyValue("--accent-live").trim(), inks };
            });
            const box = await ed.boundingBox();
            if (theme === "dark" && box) await page.screenshot({ path: path.join(OUT, "code-plate-1440-dark.png"), clip: { x: Math.max(0, box.x - 40), y: Math.max(0, box.y - 60), width: Math.min(1440, box.width + 80), height: Math.min(900, box.height + 120) } });
            await page.context().close();
        }
    }
} finally {
    await browser.close();
}
fs.writeFileSync(jsonPath, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1).slice(0, 4000));
