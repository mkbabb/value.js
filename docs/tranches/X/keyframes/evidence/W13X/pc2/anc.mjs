// SERVED MODEL: claude-opus-5-5
// KF.W13X.pc2 — the box chain from the heatmap field up to the rail's scroll
// port at one size, to sub-pixel precision (read-only). Which box sets the
// section's inline size, and how far is the field's right edge from each clip?
// Usage: node anc.mjs <base> <w> <h>
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, w, h] = process.argv;
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto(base + "#/spring", { waitUntil: "networkidle" });
await p.waitForSelector(".spring-heatmap-section", { timeout: 60000 });
await p.waitForTimeout(2500);
const field = p.locator(".spring-heatmap[role=application]");
if (!(await field.count()) || !(await field.first().isVisible())) {
    await p.locator(".spring-heatmap-section [data-figure-title]").click();
    await field.first().waitFor({ state: "visible", timeout: 10000 });
    await p.waitForTimeout(1500);
}
console.log(await p.evaluate(() => {
    const f = document.querySelector(".spring-heatmap[role=application]");
    const n = (v) => v.toFixed(2);
    const fr = f.getBoundingClientRect();
    const o = [`field ${n(fr.left)}..${n(fr.right)}`];
    for (let a = f.parentElement; a && !a.classList.contains("controls-pane"); a = a.parentElement) {
        const cs = getComputedStyle(a), r = a.getBoundingClientRect();
        o.push(`${(a.className + "").slice(0, 58).padEnd(58)} ${n(r.left)}..${n(r.right)} w=${n(r.width)} disp=${cs.display} ov=${cs.overflowX} padL=${cs.paddingLeft} padR=${cs.paddingRight} sw=${a.scrollWidth} cw=${a.clientWidth} gtc=${cs.display.includes("grid") ? cs.gridTemplateColumns : "-"} minW=${cs.minWidth}`);
    }
    return o.join("\n");
}));
await b.close();
