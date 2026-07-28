// CHALLENGE-C probe C1 — MixSourceSelector chip row: remove-button geometry,
// accessible name, pointer-reachability while invisible, and TransitionGroup
// key churn on removal. Read-only: drives the LIVE dev server at :9000.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL("./probe-C1.json", import.meta.url).pathname;
const out = {};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message));

await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(3500);

const main = page.getByRole("main");
const addSlot = page.getByRole("button", { name: "Add current color to the mix" });
out.addSlotVisible = await addSlot.isVisible().catch(() => false);

// --- add three chips -------------------------------------------------------
for (let i = 0; i < 3; i++) {
    await addSlot.click();
    await page.waitForTimeout(120);
}
out.chipCount = await page.locator("[data-mix-source]").count();

// --- C1a: remove-button geometry + accessible name -------------------------
out.removeButtons = await page.$$eval("[data-mix-source] > button", (els) =>
    els.map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
            w: Math.round(r.width * 100) / 100,
            h: Math.round(r.height * 100) / 100,
            opacity: cs.opacity,
            pointerEvents: cs.pointerEvents,
            visibility: cs.visibility,
            type: el.getAttribute("type"),
            ariaLabel: el.getAttribute("aria-label"),
            title: el.getAttribute("title"),
            textContent: el.textContent.trim(),
            innerHTML: el.innerHTML.replace(/\s+/g, " ").slice(0, 160),
            svgAriaHidden: el.querySelector("svg")?.getAttribute("aria-hidden") ?? null,
            svgRole: el.querySelector("svg")?.getAttribute("role") ?? null,
            disabled: el.disabled,
        };
    }),
);

// accessible name via the a11y snapshot (Chromium AX tree)
const ax = await page.accessibility.snapshot({ interestingOnly: false });
function walk(node, acc = []) {
    if (!node) return acc;
    if (node.role === "button") acc.push({ role: node.role, name: node.name ?? "" });
    (node.children || []).forEach((c) => walk(c, acc));
    return acc;
}
const axButtons = walk(ax);
out.axNamelessButtons = axButtons.filter((b) => !b.name || b.name.trim() === "").length;
out.axButtonNames = axButtons.map((b) => b.name);

// --- C1b: hit-test the invisible remove button (touch reachability) --------
out.hitTestAtRemoveButton = await page.evaluate(() => {
    const btn = document.querySelector("[data-mix-source] > button");
    if (!btn) return null;
    const r = btn.getBoundingClientRect();
    const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return {
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: r.width, h: r.height },
        hitTag: el?.tagName,
        hitIsTheButton: el === btn || btn.contains(el),
        computedOpacity: getComputedStyle(btn).opacity,
    };
});

// --- C1c: TransitionGroup key churn on removing the FIRST chip -------------
// Tag every chip's DOM node identity; remove chip 0 WITHOUT hover (programmatic
// click, exactly what a keyboard user does), then see which nodes survived.
await page.evaluate(() => {
    document.querySelectorAll("[data-mix-source]").forEach((el, i) => {
        el.setAttribute("data-probe-id", "chip-" + i);
    });
});
const before = await page.$$eval("[data-mix-source]", (els) =>
    els.map((e) => ({ probeId: e.getAttribute("data-probe-id"), color: e.getAttribute("data-mix-color") })),
);
await page.evaluate(() => {
    document.querySelector("[data-mix-source] > button").click();
});
await page.waitForTimeout(400);
const after = await page.$$eval("[data-mix-source]", (els) =>
    els.map((e) => ({ probeId: e.getAttribute("data-probe-id"), color: e.getAttribute("data-mix-color") })),
);
out.keyChurn = {
    before,
    after,
    // A node that kept its data-probe-id is the SAME DOM node (patched in place).
    // A node with probeId === null was destroyed + re-created => key changed.
    survivingNodes: after.filter((a) => a.probeId !== null).length,
    recreatedNodes: after.filter((a) => a.probeId === null).length,
};

// --- C1d: MAX_COLORS enforcement -------------------------------------------
// Refill to the cap via the add slot; confirm the slot disables at 12.
await page.evaluate(() => {});
const addBtn = page.getByRole("button", { name: "Add current color to the mix" });
for (let i = 0; i < 20; i++) {
    const disabled = await addBtn.isDisabled();
    if (disabled) break;
    await addBtn.click();
    await page.waitForTimeout(60);
}
out.capViaAddSlot = {
    chipCount: await page.locator("[data-mix-source]").count(),
    addSlotDisabled: await addBtn.isDisabled(),
};

out.consoleErrors = consoleErrors;
writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
