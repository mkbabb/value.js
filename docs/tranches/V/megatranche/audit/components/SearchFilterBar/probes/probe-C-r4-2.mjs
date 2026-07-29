// CHALLENGE-C r4 · probe 2 — accessible names, picker writeback, state leak,
// post-search panel geometry, input-domain table.  NO fixture.
import { chromium } from "playwright";
import fs from "node:fs";

const OUT = new URL("../evidence-r4/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
const log = { engine: "chromium", viewport: "1440x900", steps: {} };
const consoleErrors = [], pageErrors = [];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200)); });
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));

await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

const trig = page.locator('button[aria-label="Filters"]').first();
const panel = () => page.locator('[role="dialog"]').filter({ hasText: "Find by Color" }).first();
const field = () => panel().locator('input[type="text"]');

// =============== A. accessible names, from the real a11y tree ===============
await trig.click();
await page.waitForTimeout(450);

log.steps.namesViaCDP = await (async () => {
    const client = await page.context().newCDPSession(page);
    await client.send("DOM.enable");
    await client.send("Accessibility.enable");
    const { root } = await client.send("DOM.getDocument", { depth: -1, pierce: true });
    const { nodeIds } = await client.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: '[role="dialog"] button, [role="dialog"] input, [role="dialog"] [role="radiogroup"]' });
    const out = [];
    for (const nodeId of nodeIds) {
        const { nodes } = await client.send("Accessibility.getPartialAXTree", { nodeId, fetchRelatives: false });
        const n = nodes[nodes.length - 1];
        const { node } = await client.send("DOM.describeNode", { nodeId });
        out.push({
            tag: node.nodeName,
            role: n?.role?.value ?? null,
            name: n?.name?.value ?? "",
            nameFrom: n?.name?.sources?.find((s) => s.value)?.type ?? null,
            ignored: n?.ignored ?? null,
        });
    }
    await client.detach();
    return out;
})();

log.steps.ariaSnapshot = await panel().ariaSnapshot();

// swatch trigger aria wiring
log.steps.swatchAttrs = await page.evaluate(() => {
    const b = document.querySelector('button[aria-label^="Open color picker"]');
    if (!b) return null;
    return { expanded: b.getAttribute("aria-expanded"), haspopup: b.getAttribute("aria-haspopup"), controls: b.getAttribute("aria-controls"), type: b.type };
});
log.steps.filterTriggerAttrs = await page.evaluate(() => {
    const b = document.querySelector('button[aria-label="Filters"]');
    return { expanded: b.getAttribute("aria-expanded"), haspopup: b.getAttribute("aria-haspopup"), type: b.type, w: +b.getBoundingClientRect().width.toFixed(1), h: +b.getBoundingClientRect().height.toFixed(1) };
});

// =============== B. picker writeback clobbers the typed query ===============
await field().fill("rebeccapurple");
await page.waitForTimeout(200);
const beforeDrag = await field().inputValue();

await page.locator('button[aria-label^="Open color picker"]').click();
await page.waitForTimeout(450);

const mini = page.locator('[role="dialog"]').filter({ has: page.locator(".sv-canvas") }).first();
log.steps.miniOpen = { count: await mini.count(), rect: await mini.boundingBox() };
log.steps.panelRectWhileMiniOpen = await panel().boundingBox();

const sv = mini.locator(".sv-canvas").first();
const svBox = await sv.boundingBox();
if (svBox) {
    await page.mouse.move(svBox.x + svBox.width * 0.15, svBox.y + svBox.height * 0.2);
    await page.mouse.down();
    await page.mouse.move(svBox.x + svBox.width * 0.85, svBox.y + svBox.height * 0.8, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(350);
}
const afterDrag = await field().inputValue();
log.steps.clobber = {
    typed: "rebeccapurple",
    beforeDrag,
    afterDrag,
    clobbered: beforeDrag !== afterDrag,
    swatchAria: await page.evaluate(() => document.querySelector('button[aria-label^="Open color picker"]')?.getAttribute("aria-label")),
};
await page.screenshot({ path: OUT + "C-r4-mini-over-panel.png" });

// =============== C. miniPickerOpen state leak across outer close ===========
// One click far outside: which layer dismisses?
await page.mouse.click(60, 60);
await page.waitForTimeout(400);
log.steps.afterOutsideClick1 = await page.evaluate(() => {
    const d = [...document.querySelectorAll('[role="dialog"]')];
    return { count: d.length, outer: d.some((x) => x.textContent.includes("Find by Color")), mini: d.some((x) => x.querySelector(".sv-canvas")) };
});
await page.mouse.click(60, 60);
await page.waitForTimeout(400);
log.steps.afterOutsideClick2 = await page.evaluate(() => {
    const d = [...document.querySelectorAll('[role="dialog"]')];
    return { count: d.length, outer: d.some((x) => x.textContent.includes("Find by Color")), mini: d.some((x) => x.querySelector(".sv-canvas")) };
});
// reopen the filter panel — is the mini picker still open (leaked state)?
await trig.click();
await page.waitForTimeout(500);
log.steps.leakOnReopen = await page.evaluate(() => {
    const d = [...document.querySelectorAll('[role="dialog"]')];
    return { count: d.length, outer: d.some((x) => x.textContent.includes("Find by Color")), miniStillOpen: d.some((x) => x.querySelector(".sv-canvas")) };
});

// =============== D. input domain table ==================================
const cases = [
    "", "   ", "#fff", "#FF0000", "  #ff0000  ", "#ff0000ff", "rebeccapurple",
    "hsl(210 50% 50%)", "oklch(0.7 0.1 30)", "rgb(255 0 0)", "#gggggg", "NaN", "#00000",
];
const ensureOpen = async () => {
    for (let i = 0; i < 4; i++) {
        if (await panel().count()) return true;
        await trig.click({ force: true });
        await page.waitForTimeout(450);
    }
    return (await panel().count()) > 0;
};
const domain = [];
for (const c of cases) {
    await ensureOpen();
    // reset: clear-all if present
    const clearBtn = panel().locator("button", { hasText: "Clear all filters" });
    if (await clearBtn.count()) { await clearBtn.first().click(); await page.waitForTimeout(300); await ensureOpen(); }
    if (!(await field().count())) { domain.push({ input: JSON.stringify(c), skipped: "no field" }); continue; }
    await field().fill(c);
    await page.waitForTimeout(120);
    const before = await page.evaluate(() => document.querySelector('button[aria-label="Filters"] span')?.textContent?.trim() ?? null);
    await field().press("Enter");
    await page.waitForTimeout(350);
    const after = await page.evaluate(() => document.querySelector('button[aria-label="Filters"] span')?.textContent?.trim() ?? null);
    const panelOpen = await panel().count();
    domain.push({ input: JSON.stringify(c), badgeBefore: before, badgeAfter: after, searchFired: before !== after || after === "1", panelOpen, pageErrors: pageErrors.length });
    fs.writeFileSync(OUT + "probeC-r4-2-partial.json", JSON.stringify(log, null, 2));
}
log.steps.inputDomain = domain;

// =============== E. post-search panel geometry (Clear-all row appears) =====
const geo = await page.evaluate(() => {
    const p = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent.includes("Find by Color"));
    if (!p) return null;
    const r = p.getBoundingClientRect();
    const clear = [...p.querySelectorAll("button")].find((b) => /Clear all/.test(b.textContent));
    const cr = clear?.getBoundingClientRect();
    return {
        panel: { top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1), h: +r.height.toFixed(1) },
        viewportH: window.innerHeight,
        clearRow: cr ? { top: +cr.top.toFixed(1), bottom: +cr.bottom.toFixed(1), visible: cr.bottom <= window.innerHeight } : null,
        availableHeightVar: getComputedStyle(p).getPropertyValue("--reka-popper-available-height"),
        wrapperVar: (() => {
            const w = p.closest("[data-reka-popper-content-wrapper]") ?? p.parentElement;
            return w ? getComputedStyle(w).getPropertyValue("--reka-popper-available-height") : null;
        })(),
    };
});
log.steps.postSearchGeometry = geo;
await page.screenshot({ path: OUT + "C-r4-post-search-panel.png" });

// =============== F. tab order / keyboard reach of the Search button =======
await page.evaluate(() => {
    const p = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent.includes("Find by Color"));
    p?.querySelector('input[type="text"]')?.focus();
});
const tabWalk = [];
for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(90);
    tabWalk.push(await page.evaluate(() => {
        const a = document.activeElement;
        return { tag: a?.tagName, role: a?.getAttribute("role"), aria: a?.getAttribute("aria-label"), text: (a?.textContent || "").trim().slice(0, 24) };
    }));
}
log.steps.tabWalk = tabWalk;

log.consoleErrors = consoleErrors;
log.pageErrors = pageErrors;
fs.writeFileSync(OUT + "probeC-r4-2.json", JSON.stringify(log, null, 2));
console.log(JSON.stringify({ names: log.steps.namesViaCDP, snapshot: log.steps.ariaSnapshot, swatch: log.steps.swatchAttrs, trigger: log.steps.filterTriggerAttrs, clobber: log.steps.clobber, leak: { a: log.steps.afterOutsideClick1, b: log.steps.afterOutsideClick2, c: log.steps.leakOnReopen }, domain: log.steps.inputDomain, geo: log.steps.postSearchGeometry, tab: log.steps.tabWalk, pageErrors, consoleErrors: consoleErrors.slice(0, 2) }, null, 2));
await browser.close();
