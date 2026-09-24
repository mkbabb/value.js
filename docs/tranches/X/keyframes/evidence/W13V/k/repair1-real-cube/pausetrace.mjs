// SERVED MODEL: claude-opus-5-5
// KF.W13V Repair 1 · C1-5 (KFA-17 / C6-3 `[real-cube]` rest=false) — isolate the late playhead move
// AFTER a Pause of the cube's autoplay. Per rAF for 1.5 s after the Pause gesture: the ribbon's
// aria-valuenow, the transport label, and the `.cube` computed transform. Prints the first frame at
// which the readout moves while the transport reads "Play animation" (the rest the oracle asserts).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const url = process.argv[2] || "http://localhost:5173/";
const runs = +(process.argv[3] || 6);
const b = await chromium.launch({ headless: false });
for (let r = 0; r < runs; r++) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(`${url}#/cube`, { waitUntil: "load" });
    await p.evaluate(() => localStorage.clear());
    await p.waitForSelector('button[aria-label="Pause animation"]', { timeout: 10000 });
    await p.waitForTimeout(300 + r * 137);
    const pt = await p.evaluate(() => { const e = [...document.querySelectorAll('button[aria-label="Pause animation"]')].find((x) => { const b = x.getBoundingClientRect(); return b.width && x.contains(document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2)); }); const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; });
    await p.mouse.move(pt.x, pt.y);
    await p.evaluate(() => { window.__trace = new Promise((res) => {
        const rows = []; const t0 = performance.now();
        window.addEventListener("pointerup", () => {
            const tp = performance.now();
            const step = () => {
                const s = document.querySelector('[role="slider"]');
                const lab = document.querySelector('button[aria-label="Play animation"]') ? "Play" : "Pause";
                const cube = document.querySelector(".cube");
                rows.push([+(performance.now() - tp).toFixed(1), s ? +(+s.getAttribute("aria-valuenow")).toFixed(1) : null, lab, cube ? getComputedStyle(cube).transform.slice(0, 40) : null]);
                if (performance.now() - tp < 1500) requestAnimationFrame(step); else res(rows);
            };
            step();
        }, { once: true, capture: true });
    }); });
    await p.mouse.down(); await p.mouse.up();
    const rows = await p.evaluate(() => window.__trace);
    const firstPlay = rows.findIndex((x) => x[2] === "Play");
    const restV = firstPlay >= 0 ? rows[firstPlay][1] : null;
    const moved = rows.slice(firstPlay).filter((x) => x[1] !== restV);
    const cubeMoved = new Set(rows.slice(firstPlay).map((x) => x[3])).size;
    console.log(JSON.stringify({ run: r + 1, frames: rows.length, labelFlipAtMs: firstPlay >= 0 ? rows[firstPlay][0] : null, readoutAtFlip: restV, readoutMovesAfterFlip: moved.slice(0, 3), finalReadout: rows.at(-1)[1], cubeTransformsAfterFlip: cubeMoved }));
    await p.close();
}
await b.close();
