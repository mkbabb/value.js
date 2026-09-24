// SERVED MODEL: claude-opus-5-5
// KF.W13V.s — G-W13V-s2: on every scene, each ENABLED dock item opens the ONE
// shared controls pane on its surface (the pressed item = the store's
// selectedControl, the pane open). Usage: node items.mjs <baseUrl> [vps]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [base = "http://localhost:5173/", vps = "1440x900,390x844"] = process.argv.slice(2);
const SCENES = ["cube", "amiga", "square", "easing", "spring", "sequence"];
const b = await chromium.launch({ headless: false });
let fails = 0;
for (const vp of vps.split(",")) {
    const [w, h] = vp.split("x").map(Number);
    for (const scene of SCENES) {
        const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
        await p.goto(base.replace(/#.*$/, "") + `#/${scene}`, { waitUntil: "networkidle" });
        await p.waitForTimeout(2200);
        const dock = p.locator("[data-dock-tether=top]");
        const labels = await dock.locator("[data-dock-surface-item]").evaluateAll((els) => els.map((e) => [e.getAttribute("aria-label"), e.getAttribute("aria-disabled") === "true", e.getAttribute("data-surface")]));
        const res = [];
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
            const ok = st.pressed && st.paneOpen && st.content;
            if (!ok) fails++;
            res.push(`${label}:${ok ? "OPEN" : "FAIL" + JSON.stringify(st)}`);
        }
        console.log(`${vp} ${scene.padEnd(8)} ${res.join(" | ")}`);
        await p.context().close();
    }
}
await b.close();
console.log(`fails=${fails}`);
process.exit(fails ? 1 : 0);
