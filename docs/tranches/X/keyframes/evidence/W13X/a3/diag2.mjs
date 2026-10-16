// SERVED MODEL: claude-opus-5-5 — KF.W13X.a3 diagnosis 2 (READ-ONLY, in-page only, no bytes):
// on #/sequence at 390x844+hasTouch, measure the three tripping boxes, then strip the `rail-fill`
// marker in the live DOM and re-measure: if no rect moves and the oracle clears, the trip is the
// marker NAME matching `[class*=rail]`, not a layout box. Also report the boxes' content and which
// lg rules apply. Usage: node diag2.mjs <kf-tree>
import path from "node:path";
const KF = process.argv[2];
const { navToScene, withPage } = await import(path.join(KF, "scripts/lib/demo-driver.mjs"));
const ctx = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 };
const r = await withPage({ distDir: path.join(KF, "dist/gh-pages"), context: ctx, label: "a3-diag2" }, async (page, { url }) => {
    await page.goto(`${url}/#/sequence`, { waitUntil: "load" });
    await navToScene(page, "sequence", null, { timeout: 12000 });
    await page.waitForTimeout(900);
    return page.evaluate(async () => {
        const vw = window.innerWidth;
        const oracle = () => [...document.querySelectorAll("[class*=rail], .controls-pane-wrapper")].filter((e) => {
            const b = e.getBoundingClientRect();
            return !(b.width >= vw - 8) && b.width > 200 && b.height > 300;
        });
        const trips = oracle();
        const rect = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map(Math.round).join(","); };
        const before = trips.map((e) => ({ cls: String(e.className), rect: rect(e), lanes: e.querySelectorAll(".progress-rail").length, text: (e.textContent || "").trim().slice(0, 60) }));
        const sheet = document.querySelector(".controls-pane-wrapper");
        const sheetRect = sheet ? rect(sheet) : null;
        trips.forEach((e) => e.classList.remove("rail-fill"));
        await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
        const after = trips.map((e) => ({ cls: String(e.className), rect: rect(e) }));
        return { vw, sheetRect, before, after, oracleAfterStrip: oracle().length };
    });
});
console.log(JSON.stringify(r, null, 1));
