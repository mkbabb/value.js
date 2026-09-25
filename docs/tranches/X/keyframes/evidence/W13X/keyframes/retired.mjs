// SERVED MODEL: claude-opus-5-5
// X.KF.W13X.keyframes (KFA-15, k2) — copied from W13V/k/kfa-15 unchanged but for the base URL argument (argv[3]) and the playwright require.
// KF.W13V Repair 1 · C1-6 (G-W13V-k2, KFA-15) — is the audit's surface (KeyframesEditor's edit-feedback
// sweep, `.progress-bar` + the per-stop `pre[contenteditable]` cards) mounted ANYWHERE on the served page?
// Adapted from W13V/s/items.mjs: every scene + home, every ENABLED dock item opened, and at each state the
// count of `.progress-bar` and `pre[contenteditable]` nodes. Usage: node retired.mjs <baseUrl> [vps]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [base = "http://localhost:5173/", vps = "1440x900,390x844"] = process.argv.slice(2);
const SCENES = ["home", "cube", "amiga", "square", "easing", "spring", "sequence"];
const count = (p) => p.evaluate(() => document.querySelectorAll(".progress-bar").length + document.querySelectorAll("pre[contenteditable]").length);
let surfaces = 0;
const b = await chromium.launch({ headless: false });
let fails = 0;
for (const vp of vps.split(",")) {
    const [w, h] = vp.split("x").map(Number);
    for (const scene of SCENES) {
        const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
        await p.goto(base.replace(/#.*$/, "") + (scene === "home" ? "" : `#/${scene}`), { waitUntil: "networkidle" });
        await p.waitForTimeout(2200);
        const dock = p.locator("[data-dock-tether=top]");
        const labels = await dock.locator("[data-dock-surface-item]").evaluateAll((els) => els.map((e) => [e.getAttribute("aria-label"), e.getAttribute("aria-disabled") === "true", e.getAttribute("data-surface")]));
        const res = [`load:${await count(p)}`]; surfaces += await count(p);
        for (const [label, disabled, surface] of labels) {
            if (disabled) { res.push(`${label}:off`); continue; }
            await dock.hover({ force: true }); await p.waitForTimeout(1300); // let the expand morph settle (a press mid-morph lands on the moving layer)
            const item = dock.locator(`[data-dock-surface-item][aria-label="${label}"]`);
            if ((await item.getAttribute("aria-pressed")) !== "true") await item.click();
            await p.waitForTimeout(900);
            const st = await p.evaluate((surface) => {
                const pressed = document.querySelector(`[data-dock-surface-item][data-surface="${surface}"]`)?.getAttribute("aria-pressed") === "true";
                const rail = document.querySelector(".controls-pane--open");
                const sheet = document.querySelector('[data-slot="sheet-content"]');
                const paneOpen = innerWidth >= 1024 ? !!rail : !!sheet;
                // the pane's surface panel has painted content (a non-empty box)
                const pane = innerWidth >= 1024 ? rail : sheet;
                const content = pane ? [...pane.querySelectorAll("*")].some((e) => e.getBoundingClientRect().height > 40 && e.textContent.trim().length > 0) : false;
                return { pressed, paneOpen, content };
            }, surface);
            const n = await count(p); surfaces += n;
            if (!(st.pressed && st.paneOpen)) fails++;
            res.push(`${label}:${st.pressed && st.paneOpen ? "open" : "NOT-OPENED"} surfaces=${n}`);
        }
        console.log(`${vp} ${scene.padEnd(8)} ${res.join(" | ")}`);
        await p.context().close();
    }
}
await b.close();
console.log(`KFA-15 surface nodes (.progress-bar + pre[contenteditable]) across every state: ${surfaces} · items not opened: ${fails}`);
