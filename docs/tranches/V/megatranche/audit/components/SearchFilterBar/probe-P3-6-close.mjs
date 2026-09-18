// CHALLENGE-D pass-3 · probe 6 — CLOSE CONTRACT + GROUP NAMES + TRIGGER NAME.
import { webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const OUT = resolve(HERE, "evidence-p3");
mkdirSync(OUT, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9000";

const browser = await webkit.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await context.newPage();
await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
await page.waitForTimeout(2800);
await page.click('button[aria-label="Filters"]');
await page.waitForTimeout(800);

const structure = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"][data-state="open"]');
    const groups = [...dlg.querySelectorAll('[role="radiogroup"]')];
    return {
        radiogroups: groups.map((g) => ({
            ariaLabel: g.getAttribute("aria-label"), ariaLabelledby: g.getAttribute("aria-labelledby"),
            items: g.querySelectorAll('[role="radio"]').length,
            itemNames: [...g.querySelectorAll('[role="radio"]')].map((i) => i.getAttribute("aria-label") || i.textContent.trim() || "(none)"),
        })),
        groupsWithRoleGroup: dlg.querySelectorAll('[role="group"]').length,
        headings: dlg.querySelectorAll("h1,h2,h3,h4,h5,h6").length,
        liveRegions: dlg.querySelectorAll("[aria-live],[role=status],[role=alert]").length,
        sectionLabelTags: [...dlg.querySelectorAll(".section-label")].map((l) => `${l.tagName.toLowerCase()}#${l.id || "-"}`),
        dialogAriaModal: dlg.getAttribute("aria-modal"),
        // trigger name: does the count reach AT?
        triggerAria: (() => {
            const t = document.querySelector('button[aria-label="Filters"]');
            return { ariaLabel: t.getAttribute("aria-label"), innerText: t.textContent.trim(), iconAriaHidden: t.querySelector("svg")?.getAttribute("aria-hidden") ?? null };
        })(),
    };
});

// select Featured so a badge exists, then close and check focus restore
await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"][data-state="open"]');
    [...dlg.querySelectorAll("label")].find((l) => l.textContent.trim() === "Featured")?.click();
});
await page.waitForTimeout(300);
const nameWithBadge = await page.evaluate(() => {
    const t = document.querySelector('button[aria-label="Filters"]');
    return { ariaLabel: t.getAttribute("aria-label"), textContent: t.textContent.trim() };
});
await page.keyboard.press("Escape");
await page.waitForTimeout(800);
const afterEscape = await page.evaluate(() => {
    const t = document.querySelector('button[aria-label="Filters"]');
    return {
        popoverOpen: !!document.querySelector('[role="dialog"][data-state="open"]'),
        focusIsTrigger: document.activeElement === t,
        focusTag: document.activeElement?.tagName.toLowerCase() ?? null,
        focusName: (document.activeElement?.getAttribute?.("aria-label") || document.activeElement?.textContent?.trim() || "").slice(0, 40),
        triggerAriaExpanded: t.getAttribute("aria-expanded"),
    };
});

// click-outside close: does it restore focus?
await page.click('button[aria-label="Filters"]');
await page.waitForTimeout(700);
await page.mouse.click(120, 120);
await page.waitForTimeout(700);
const afterOutside = await page.evaluate(() => {
    const t = document.querySelector('button[aria-label="Filters"]');
    return { popoverOpen: !!document.querySelector('[role="dialog"][data-state="open"]'), focusIsTrigger: document.activeElement === t, focusTag: document.activeElement?.tagName.toLowerCase() ?? null };
});

const res = { structure, nameWithBadge, afterEscape, afterOutside };
writeFileSync(resolve(OUT, "P3-6-close.json"), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
await context.close(); await browser.close();
