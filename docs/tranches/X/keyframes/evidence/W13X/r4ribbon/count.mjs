// SERVED MODEL: claude-opus-5-5
// KF.W13X.r4ribbon — served count of PlaybackRibbon mounts (the scrub rail's
// aria-label is the ribbon's own) per scene and per pane surface tab, plus the
// two retired DOM ids. Read-only. Usage: node count.mjs <base>
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base] = process.argv;
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const read = () => p.evaluate(() => ({
    ribbons: document.querySelectorAll('[aria-label="Scrub animation timeline"]').length,
    inBar: document.querySelectorAll('.ribbon-bar [aria-label="Scrub animation timeline"]').length,
    ids: ["controls-ribbon-target", "timeline-expanded-target"].filter((i) => document.getElementById(i)).join(",") || "none",
}));
let worst = 0;
for (const scene of ["cube", "easing", "spring", "square", "amiga", "sequence"]) {
    await p.goto(base + "#/" + scene, { waitUntil: "networkidle" });
    await p.waitForTimeout(2500);
    const r0 = await read(); worst = Math.max(worst, r0.ribbons);
    console.log(`${scene.padEnd(9)} [initial] ribbons=${r0.ribbons} inBar=${r0.inBar} ids=${r0.ids}`);
    const tabs = p.locator('.controls-pane [role="tab"]');
    const n = await tabs.count();
    for (let i = 0; i < n; i++) {
        const t = tabs.nth(i);
        const name = ((await t.getAttribute("aria-label")) || (await t.innerText())).trim().replace(/\s+/g, " ").slice(0, 20);
        if (!(await t.isVisible())) continue;
        await t.click({ timeout: 5000 }).catch(() => {});
        await p.waitForTimeout(600);
        const r = await read(); worst = Math.max(worst, r.ribbons);
        console.log(`${scene.padEnd(9)} [${name}] ribbons=${r.ribbons} inBar=${r.inBar} ids=${r.ids}`);
    }
}
console.log(`MAX ribbons on any surface = ${worst}`);
await b.close();
