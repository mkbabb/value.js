// SERVED MODEL: claude-opus-5-5
// KF.W13V Repair 1 · C1-5 — the oracle's own path (subject-animates `realSceneHalf`), traced per rAF:
// goto #/cube on the built dist/gh-pages, localStorage.clear, navToScene(cube, Controls), wait for the
// autoplay's Pause face, then the driver's own pressPlayToggle({intent:"pause"}) (a synthetic down+up in
// one task). Per rAF for 1.5 s: ribbon aria-valuenow, transport face, `.cube` transform.
import path from "node:path";
const KF = "/Users/mkbabb/Programming/keyframes.js";
process.env.KF_PLAYWRIGHT_DIR ||= "/Users/mkbabb/Programming/value.js";
const { resolveChromium, serveDist, navToScene } = await import(path.join(KF, "scripts/lib/demo-driver.mjs"));
const runs = +(process.argv[2] || 8);
const dist = process.argv[3] || path.join(KF, "dist/gh-pages");
const chromium = resolveChromium();
const b = await chromium.launch();
const srv = dist.startsWith("http") ? { url: dist.replace(/\/$/, "") } : await serveDist(dist);
let fails = 0;
for (let r = 0; r < runs; r++) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(`${srv.url}/#/cube`, { waitUntil: "load" });
    await p.evaluate(() => localStorage.clear());
    await navToScene(p, "cube", "Controls");
    // the oracle's own wait: the Play face first (8 s cap), then the autoplay's Pause face
    await p.waitForSelector('button[aria-label="Pause animation"]', { timeout: 8000 });
    await p.waitForTimeout((r % 4) * 40);
    const got = await p.evaluate(() => new Promise((res) => {
        const rows = []; const tp = performance.now();
        const el = document.querySelector('button[aria-label="Pause animation"]');
        const o = { bubbles: true, cancelable: true, button: 0, pointerType: "mouse", isPrimary: true, pointerId: 1 };
        // the isolation: the readout AT the DOM mutation that flips the transport face to "Play"
        // (the instant the oracle's waitForFunction can first see the rest), before any later frame.
        const mo = new MutationObserver(() => {
            if (!document.querySelector('button[aria-label="Play animation"]')) return;
            const s = document.querySelector('[role="slider"]');
            window.__atFlip = [+(performance.now() - tp).toFixed(1), s ? +(+s.getAttribute("aria-valuenow")).toFixed(1) : null];
            mo.disconnect();
        });
        mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["aria-label", "aria-valuenow"] });
        el.dispatchEvent(new PointerEvent("pointerdown", o)); el.dispatchEvent(new PointerEvent("pointerup", o));
        const step = () => {
            const s = document.querySelector('[role="slider"]');
            const lab = document.querySelector('button[aria-label="Play animation"]') ? "Play" : "Pause";
            const cube = document.querySelector(".cube");
            rows.push([+(performance.now() - tp).toFixed(1), s ? +(+s.getAttribute("aria-valuenow")).toFixed(1) : null, lab, cube ? getComputedStyle(cube).transform.slice(0, 32) : null]);
            if (performance.now() - tp < 1500) requestAnimationFrame(step); else res({ rows, atFlip: window.__atFlip });
        };
        step();
    }));
    const { rows, atFlip } = got;
    const fp = rows.findIndex((x) => x[2] === "Play");
    const restV = fp >= 0 ? rows[fp][1] : null;
    const moved = rows.slice(fp).filter((x) => x[1] !== restV);
    const staleAtFlip = atFlip && atFlip[1] !== rows.at(-1)[1];
    if (moved.length || staleAtFlip) fails++;
    console.log(JSON.stringify({ run: r + 1, atFaceFlip: atFlip, staleAtFlip, flipAtMs: fp >= 0 ? rows[fp][0] : null, readoutAtFlip: restV, movesAfterFlip: moved.slice(0, 3), final: rows.at(-1)[1], cubeTransformsAfterFlip: new Set(rows.slice(fp).map((x) => x[3])).size, firstRows: rows.slice(0, 2) }));
    await p.close();
}
console.log(`SUMMARY runs=${runs} readoutStaleOrMovedAfterFaceFlip=${fails}`);
await srv.close?.(); await b.close();
