// SERVED MODEL: claude-opus-5-5
// KF.W13V.s2 — the Sequence scene's Timeline dock item + the shared Timeline
// pane's Sequence mode, read on the SERVED page (headed Chromium).
// Usage: node pane.mjs <baseUrl> <WxH> <label> [frameDir] [falsify=0|1]
// Prints ONE JSON line: the Timeline item's state, the pane (lanes, scrub,
// playhead), the stage's inline editors, and — with falsify=1 — the re-time
// falsifier (drag lane 2's handle in the pane → the stage row's at-placement
// moves; the pane's Reset → it returns).
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");

const base = process.argv[2] ?? "http://localhost:5173/";
const [w, h] = (process.argv[3] ?? "1440x900").split("x").map(Number);
const label = process.argv[4] ?? "run";
const frameDir = process.argv[5];
const falsify = process.argv[6] === "1";

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: w, height: h } });
await page.goto(base.replace(/#.*$/, "") + "#/sequence", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
if (frameDir) await page.screenshot({ path: `${frameDir}/${label}-sequence-${w}x${h}-landing.png` });

const dock = page.locator("[data-dock-tether=top]");
await dock.hover({ force: true }).catch(() => {});
await page.waitForTimeout(700);
const item = page.locator("[data-dock-surface-item][data-surface=timeline]");
const itemState = {
    present: (await item.count()) > 0,
    disabled: (await item.count()) ? await item.first().isDisabled() : null,
};
// The item toggles the pane: press it only when the pane is not already on it.
const paneShowing = () =>
    page.evaluate(() => {
        const s = document.querySelector("[aria-label='Scrub the sequence master clock']");
        if (!s || document.querySelector(".scene-host")?.contains(s)) return false;
        const b = s.getBoundingClientRect();
        return b.width > 0 && b.height > 0;
    });
itemState.showingBeforeClick = await paneShowing();
if (itemState.present && !itemState.disabled && !itemState.showingBeforeClick) {
    await item.first().click();
    await page.waitForTimeout(1200);
}
const read = () =>
    page.evaluate(() => {
        const vis = (el) => {
            const b = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            return b.width > 0 && b.height > 0 && cs.visibility !== "hidden" && cs.display !== "none";
        };
        const host = document.querySelector(".scene-host");
        const stageEditors = host
            ? [...host.querySelectorAll("input,textarea,select,[role=slider],[role=combobox],[role=spinbutton],[role=textbox]")].filter(vis).length
            : -1;
        const lanes = [...document.querySelectorAll("[role=slider][aria-label^='Re-time row']")].filter(
            (e) => vis(e) && !host?.contains(e),
        );
        const scrub = document.querySelector("[aria-label='Scrub the sequence master clock']");
        const rows = host ? [...host.querySelectorAll(".seq-row")] : [];
        const row2 = rows[1];
        const ball2 = row2?.querySelector(".seq-ball");
        const pane = scrub?.closest(".controls-pane, [role=dialog]");
        return {
            stageEditors,
            paneLanes: lanes.length,
            paneScrub: !!scrub && vis(scrub) && !host?.contains(scrub),
            playhead: !!document.querySelector("[data-sequence-playhead]"),
            paneHost: pane ? (pane.getAttribute("role") === "dialog" ? "sheet" : "rail") : null,
            itemPressed: document.querySelector("[data-dock-surface-item][data-surface=timeline]")?.getAttribute("aria-pressed"),
            stageRow2: row2
                ? {
                      label: row2.querySelector(".seq-row-at")?.textContent?.trim(),
                      rowStart: getComputedStyle(row2).getPropertyValue("--row-start").trim(),
                      ballX: Math.round(ball2.getBoundingClientRect().left),
                  }
                : null,
            lane2Now: lanes[1]?.getAttribute("aria-valuenow") ?? null,
        };
    });
const pane = await read();
if (frameDir) await page.screenshot({ path: `${frameDir}/${label}-sequence-${w}x${h}-timeline.png` });

let falsifier = null;
if (falsify && pane.paneLanes >= 2) {
    const handle = page.locator("[role=slider][aria-label='Re-time row 2 start offset']").first();
    await handle.scrollIntoViewIfNeeded();
    const hb = await handle.boundingBox();
    const cx = hb.x + hb.width / 2;
    const cy = hb.y + hb.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) {
        await page.mouse.move(cx + i * 15, cy);
        await page.waitForTimeout(30);
    }
    await page.mouse.up();
    await page.waitForTimeout(500);
    const dragged = await read();
    if (frameDir) await page.screenshot({ path: `${frameDir}/${label}-sequence-${w}x${h}-retimed.png` });
    await page.locator("[aria-label='Reset the sequence items to the default stagger']").first().click();
    await page.waitForTimeout(500);
    const reverted = await read();
    falsifier = {
        before: pane.stageRow2,
        dragged: dragged.stageRow2,
        lane2: [pane.lane2Now, dragged.lane2Now, reverted.lane2Now],
        reverted: reverted.stageRow2,
        moved: dragged.stageRow2.label !== pane.stageRow2.label && dragged.stageRow2.ballX !== pane.stageRow2.ballX,
        returned:
            reverted.stageRow2.label === pane.stageRow2.label &&
            reverted.stageRow2.rowStart === pane.stageRow2.rowStart,
    };
}
await browser.close();
const out = { label, viewport: `${w}x${h}`, item: itemState, ...pane, falsifier };
console.log(JSON.stringify(out));
if (frameDir) fs.appendFileSync(`${frameDir}/pane-${label}.jsonl`, JSON.stringify(out) + "\n");
