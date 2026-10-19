// SERVED MODEL: claude-opus-5-5 — KF.W13X.a3 diagnosis (READ-ONLY): enumerate the A3 oracle's
// matches on #/sequence at 390x844+hasTouch over a gh-pages dist. Usage: node diag.mjs <kf-tree>
import path from "node:path";
const KF = process.argv[2];
const { navToScene, withPage } = await import(path.join(KF, "scripts/lib/demo-driver.mjs"));
const ctx = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 };
const r = await withPage({ distDir: path.join(KF, "dist/gh-pages"), context: ctx, label: "a3-diag" }, async (page, { url }) => {
    await page.goto(`${url}/#/sequence`, { waitUntil: "load" });
    await navToScene(page, "sequence", null, { timeout: 12000 });
    await page.waitForTimeout(900);
    return page.evaluate(() => {
        const vw = window.innerWidth;
        return [...document.querySelectorAll("[class*=rail], .controls-pane-wrapper")].map((e) => {
            const b = e.getBoundingClientRect();
            const trip = !(b.width >= vw - 8) && b.width > 200 && b.height > 300;
            const cs = getComputedStyle(e);
            const chain = []; let p = e.parentElement; let i = 0;
            while (p && i < 6) { const pb = p.getBoundingClientRect(); chain.push(`${p.tagName.toLowerCase()}.${String(p.className).slice(0, 60)} ${Math.round(pb.width)}x${Math.round(pb.height)} disp=${getComputedStyle(p).display}`); p = p.parentElement; i++; }
            return { trip, tag: e.tagName.toLowerCase(), cls: String(e.className).slice(0, 120), rect: [b.x, b.y, b.width, b.height].map(Math.round), flex: cs.flex, display: cs.display, minH: cs.minHeight, chain: trip ? chain : undefined };
        });
    });
});
console.log(JSON.stringify(r, null, 1));
