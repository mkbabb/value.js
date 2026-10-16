// SERVED MODEL: claude-opus-5-5 — KF.W13X.a3o (COHESION §0fm.2): synthetic hollow rail-track falsifier.
// Reads the A3 selector FROM the oracle's own bytes (live-session-mobile.mjs), so the
// falsifier exercises exactly what the oracle ships; reuses the oracle's withPage/navToScene
// and MOBILE geometry (390×844, hasTouch). On #/sequence: baseline → inject a hollow column
// carrying the rail's own class at ghost geometry (w>200, h>300, < vw−8) → expect
// ghostCol=true → remove → expect ghostCol=false. Exit 0 iff the oracle trips and clears.
// Usage: KF_ROOT=<kf tree> KF_PLAYWRIGHT_DIR=<dir with playwright> node falsifier-a3o.mjs
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const KF = process.env.KF_ROOT ?? "/Users/mkbabb/Programming/keyframes.js";
const ORACLE = path.join(KF, "scripts/observe/demo/live-session-mobile.mjs");
const src = fs.readFileSync(ORACLE, "utf8");
const a3 = src.slice(src.indexOf("── A3 — ghost-rail-absent"));
const m = a3.match(/const ghostCol = \[\.\.\.document\.querySelectorAll\("([^"]+)"\)\]/);
if (!m) throw new Error("A3 selector not found in oracle bytes");
const SEL = m[1];
const { withPage, navToScene } = await import(pathToFileURL(path.join(KF, "scripts/lib/demo-driver.mjs")).href);

const MOBILE_CONTEXT = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 };
const DIST = path.join(KF, "dist/gh-pages");

const read = (page) =>
    page.evaluate((sel) => {
        const vw = window.innerWidth;
        const ghostCol = [...document.querySelectorAll(sel)].some((e) => {
            const b = e.getBoundingClientRect();
            const isFullWidthSheet = b.width >= vw - 8;
            return !isFullWidthSheet && b.width > 200 && b.height > 300;
        });
        return { ghostCol, vw, n: document.querySelectorAll(sel).length };
    }, SEL);

const r = await withPage({ distDir: DIST, context: MOBILE_CONTEXT, label: "a3o falsifier" }, async (page, { url }) => {
    await page.goto(`${url}/#/sequence`, { waitUntil: "load" });
    await navToScene(page, "sequence", null, { timeout: 12000 });
    await page.waitForTimeout(900);
    const before = await read(page);
    // the rail's OWN emitted class (ControlsPaneWrapper.vue:252), hollow, at ghost geometry
    await page.evaluate(() => {
        const g = document.createElement("div");
        g.className = "controls-pane-wrapper";
        g.id = "a3o-synthetic-ghost";
        g.style.cssText = "position:fixed;left:0;top:80px;width:300px;height:500px;";
        document.body.appendChild(g);
    });
    const injected = await read(page);
    await page.evaluate(() => document.getElementById("a3o-synthetic-ghost")?.remove());
    const removed = await read(page);
    return { before, injected, removed };
});
const v = r.value ?? r;
const pass = !r.skipped && v.before.ghostCol === false && v.injected.ghostCol === true && v.removed.ghostCol === false;
console.log(JSON.stringify({ selector: SEL, ...v, verdict: pass ? "FALSIFIER-TRIPS-AND-CLEARS" : "FALSIFIER-FAILED" }));
process.exit(pass ? 0 : 1);
