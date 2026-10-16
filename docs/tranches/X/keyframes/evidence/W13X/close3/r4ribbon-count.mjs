// SERVED MODEL: claude-opus-5-5 — close3 copy of r4ribbon/probe.mjs with the timeline fold-cycle limb disabled: X-DS cefab10d (KF-C6-01) deleted the expanded timeline cell, so that limb's menu item no longer exists; every other line is the unit's.
// SERVED MODEL: claude-opus-5-5
// KF.W13X.r4ribbon served reading (COHESION §0fa item 2; ESC-r4transport-1:
// A2-KE-L1-23 step 2 + A2-KE-L1-24 mount-once). RESUME-2 sitting of
// 2026-10-15 (this file replaces the 10-13 sitting's probe.mjs, which this
// seat overwrote unread; its readings stand in before-1.log / after-1.log /
// after-timeline-1.log).
// Per scene, per surface the dock offers (picked by the dock's own surface
// items, as a user picks them): how many PlaybackRibbon instances are in the
// document, how many sit in RibbonBar, and whether either retired DOM
// id exists. Then, where the scene offers Timeline, the timeline is unfolded
// and folded through its own menu and the expanded cell is read for it.
// Read-only: no style is written. Headless real Chrome (§0ei);
// the browser is closed in a finally.
// Usage: node probe.mjs <base>
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base] = process.argv;
const b = await chromium.launch({ channel: "chrome", headless: true });
let red = 0;
const errors = [];
try {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    p.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
    const read = () =>
        p.evaluate(() => ({
            // one `.scrub-rail` per PlaybackRibbon instance (the scrub label sits on
            // two nodes of one ribbon, the slider and its thumb: diag2.mjs)
            ribbons: document.querySelectorAll(".scrub-rail").length,
            inBar: document.querySelectorAll(".ribbon-bar .scrub-rail").length,
            panel: document.querySelector("[data-surface-panel][data-state=active]")?.getAttribute("aria-label") ?? "-",
            ids: ["controls-ribbon-target", "timeline-expanded-target"].filter((i) => document.getElementById(i)).join(",") || "none",
            cell: document.querySelector(".timeline-expanded-cell")?.childElementCount ?? -1,
        }));
    for (const scene of ["cube", "square", "easing", "spring", "sequence", "amiga"]) {
        await p.goto(base + "#/" + scene, { waitUntil: "networkidle" });
        await p.waitForTimeout(2500);
        const r0 = await read();
        const bad0 = r0.ribbons > 1 || r0.ids !== "none";
        red += bad0;
        console.log(`${bad0 ? "RED  " : "GREEN"} ${scene.padEnd(8)} [rest] ribbons=${r0.ribbons} inBar=${r0.inBar} ids=${r0.ids} panel=${r0.panel}`);
        // the surfaces the dock offers this scene, picked the way a user picks
        // them (the dock's surface items; an item already showing is not
        // pressed, since pressing it closes the pane)
        const offered = await p.$$eval("[data-dock-surface-item]:not([disabled])", (els) => els.map((e) => e.dataset.surface));
        for (const s of [...offered, offered[0]].filter(Boolean)) {
            await p.evaluate((s) => {
                const el = document.querySelector(`[data-dock-surface-item][data-surface="${s}"]`);
                if (el && !el.hasAttribute("data-selected")) el.click();
            }, s);
            await p.waitForTimeout(900);
            const r = await read();
            const bad = r.ribbons > 1 || r.ribbons !== r.inBar || r.ids !== "none";
            red += bad;
            console.log(`${bad ? "RED  " : "GREEN"} ${scene.padEnd(8)} [${s}] ribbons=${r.ribbons} inBar=${r.inBar} ids=${r.ids} panel=${r.panel}`);
        }
        // (sequence draws no channel pane: its timeline is the scene's own lanes)
        if (false && offered.includes("timeline")) {
            // unfold through the timeline's own menu, then read the cell
            await p.evaluate(() => document.querySelector('[data-dock-surface-item][data-surface="timeline"]:not([data-selected])')?.click());
            await p.waitForTimeout(1200);
            const fold = async (label) => {
                await p.locator('button[aria-label="More timeline actions"]').first().click({ timeout: 5000 });
                await p.getByRole("menuitem", { name: label }).click({ timeout: 5000 });
                await p.waitForTimeout(1500);
            };
            const inCell = () => p.evaluate(() => !!document.querySelector(".timeline-expanded-cell button[aria-label='More timeline actions']"));
            const d = await read();
            const dockedInCell = await inCell();
            await fold(/Unfold timeline/);
            const u = await read();
            const unfoldedInCell = await inCell();
            await fold(/Fold timeline into the pane/);
            const f = await read();
            const refoldedInCell = await inCell();
            const badU = dockedInCell || !unfoldedInCell || refoldedInCell || u.ids !== "none" || u.ribbons > 1;
            red += badU;
            console.log(`${badU ? "RED  " : "GREEN"} ${scene.padEnd(8)} [timeline fold cycle] docked: cell=${d.cell} timelineInCell=${dockedInCell} · unfolded: cell=${u.cell} timelineInCell=${unfoldedInCell} · refolded: cell=${f.cell} timelineInCell=${refoldedInCell} · ids=${u.ids}`);
        }
    }
} finally {
    await b.close();
}
console.log(`pageerrors=${errors.length} ${errors.slice(0, 3).join(" | ")}`);
console.log(`red=${red}`);
process.exit(red ? 1 : 0);
