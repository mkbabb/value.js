// CHALLENGE-C r2 — probe 4: what the editor's successful parse does to the
// REST of the pane (stop identity / selection), and the per-tick DOM churn.
// Run: node .../evidence/r2-probe4.mjs [webkit|chromium]
import { webkit, chromium } from "playwright";

const ENGINE = process.argv[2] ?? "webkit";
const launcher = ENGINE === "chromium" ? chromium : webkit;
const MOD = ENGINE === "webkit" ? "Meta" : "Control";
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (o) => console.log(JSON.stringify({ engine: ENGINE, ...o }));

const browser = await launcher.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.reload({ waitUntil: "load" });
await page.waitForSelector(EDITOR, { timeout: 20000 });
await sleep(2000);

const ids = () =>
    page.$$eval("[data-stop-id]", (els) => els.map((e) => e.getAttribute("data-stop-id")));
const chip = () => page.getByRole("button", { name: "Remove selected stop" });

// Seed 3 stops through the editor so a middle stop is selectable.
await page.locator(EDITOR).first().click();
await page.keyboard.press(`${MOD}+a`);
await page.keyboard.type("linear-gradient(90deg, red 0%, lime 50%, blue 100%)", { delay: 3 });
await sleep(1200);
const before = await ids();
await page.locator("[data-stop-id]").nth(1).click();
await sleep(300);
log({ tag: "S1-selected-middle", ids: before, removeChipVisible: await chip().isVisible().catch(() => false) });

// Now re-parse from the editor — same colours, different positions.
await page.locator(EDITOR).first().click();
await page.keyboard.press(`${MOD}+a`);
await page.keyboard.type("linear-gradient(90deg, red 0%, lime 60%, blue 100%)", { delay: 3 });
await sleep(1400);
const after = await ids();
log({
    tag: "S2-after-reparse",
    ids: after,
    identitiesPreserved: before.some((b) => after.includes(b)),
    removeChipVisible: await chip().isVisible().catch(() => false),
    plateLabel: await page
        .getByRole("img", { name: /Perceived-space plate/ })
        .last()
        .getAttribute("aria-label")
        .catch(() => null),
});

// Per-tick DOM churn: how many innerHTML replacements does one slider sweep cost?
await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    window.__churn = 0;
    new MutationObserver((recs) => { window.__churn += recs.length; }).observe(el, {
        childList: true, subtree: true, characterData: true,
    });
}, EDITOR);
const slider = page.locator('[aria-label="Gradient direction"]').first();
await slider.click();
for (let i = 0; i < 40; i++) await page.keyboard.press("ArrowRight");
await sleep(600);
log({
    tag: "S3-editor-dom-churn-per-40-step-sweep",
    mutationRecords: await page.evaluate(() => window.__churn),
    editorText: (await page.locator(EDITOR).first().innerText()).slice(0, 60),
});

await browser.close();
