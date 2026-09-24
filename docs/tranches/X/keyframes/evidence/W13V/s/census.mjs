// SERVED MODEL: claude-opus-5-5
// KF.W13V.s — the per-scene regions + inline-editor census on the SERVED page.
// Usage: node census.mjs <baseUrl> [headed=1] [out.json]
// Reads, per scene × viewport: the top dock's items (accessible names), the
// stage (.scene-host) inline editors, and the shared pane's surface on each item.
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");

const base = process.argv[2] ?? "http://localhost:5173/";
const headed = (process.argv[3] ?? "1") === "1";
const out = process.argv[4];
const SCENES = ["home", "cube", "amiga", "square", "easing", "spring", "sequence"];
const VIEWPORTS = [
    { w: 1440, h: 900 },
    { w: 390, h: 844 },
    { w: 360, h: 740 },
];
const EDITOR_SEL = [
    "input", "textarea", "select", "[contenteditable=true]", "[contenteditable='']",
    "[role=slider]", "[role=combobox]", "[role=spinbutton]", "[role=textbox]",
    ".monaco-editor", ".cm-editor",
].join(",");

const browser = await chromium.launch({ headless: !headed });
const rows = [];
for (const vp of VIEWPORTS) {
    for (const scene of SCENES) {
        const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
        const url = base.replace(/#.*$/, "") + (scene === "home" ? "#/" : `#/${scene}`);
        await page.goto(url, { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        // expand the dock (hover it) so its items are in the a11y tree
        const dock = page.locator("[data-dock-tether=top]");
        await dock.hover({ force: true }).catch(() => {});
        await page.waitForTimeout(900);
        const r = await page.evaluate((EDITOR_SEL) => {
            const vis = (el) => {
                const b = el.getBoundingClientRect();
                const cs = getComputedStyle(el);
                return b.width > 0 && b.height > 0 && cs.visibility !== "hidden" && cs.display !== "none";
            };
            const name = (el) =>
                el.getAttribute("aria-label") || el.textContent.trim().replace(/\s+/g, " ").slice(0, 40);
            const tether = document.querySelector("[data-dock-tether=top]");
            const dockItems = tether
                ? [...tether.querySelectorAll("button,[role=button],[role=combobox]")]
                      .filter(vis)
                      .map((b) => ({ name: name(b), disabled: b.disabled || b.getAttribute("aria-disabled") === "true" }))
                : [];
            // one row = every expanded-layer control shares one top (±4 px) and
            // the layer does not scroll (the producer's over-cap recipe)
            const layer = tether?.querySelector(".dock-layer");
            const tops = layer ? [...layer.children].filter(vis).map((c) => c.getBoundingClientRect()) : [];
            const mids = tops.map((r) => r.top + r.height / 2);
            const dockRows = mids.length && Math.max(...mids) - Math.min(...mids) <= 4 && layer.scrollWidth <= layer.clientWidth + 1 ? 1 : mids.length ? 2 : 0;
            const host = document.querySelector(".scene-host");
            const editors = host
                ? [...host.querySelectorAll(EDITOR_SEL)].filter(vis).map((e) => ({
                      tag: e.tagName.toLowerCase(),
                      role: e.getAttribute("role"),
                      label: e.getAttribute("aria-label") ?? "",
                  }))
                : [];
            const kfText = host ? /@keyframes\s*\(editable\)/i.test(host.textContent) : false;
            return { dockItems, dockRows, stageEditors: editors, stageKeyframesBlock: kfText };
        }, EDITOR_SEL);
        rows.push({ viewport: `${vp.w}x${vp.h}`, scene, ...r });
        await page.close();
    }
}
await browser.close();
const json = JSON.stringify(rows, null, 1);
if (out) fs.writeFileSync(out, json);
for (const r of rows) {
    console.log(
        `${r.viewport} ${r.scene.padEnd(8)} dock[${r.dockRows}row]=${r.dockItems.map((d) => d.name + (d.disabled ? "(off)" : "")).join(" | ")} :: stageEditors=${r.stageEditors.length}${r.stageEditors.length ? " " + r.stageEditors.map((e) => e.tag + (e.role ? "/" + e.role : "") + (e.label ? ":" + e.label : "")).join(",") : ""} kfBlock=${r.stageKeyframesBlock}`,
    );
}
