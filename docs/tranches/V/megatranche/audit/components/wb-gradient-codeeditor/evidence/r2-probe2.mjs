// CHALLENGE-C r2 — targeted follow-ups (keyboard reachability, newline fusion,
// composite WIP loss, the MT-F001 boundary text, rich paste).
// Run: node .../evidence/r2-probe2.mjs [webkit|chromium]
import { webkit, chromium } from "playwright";

const ENGINE = process.argv[2] ?? "webkit";
const launcher = ENGINE === "chromium" ? chromium : webkit;
const MOD = ENGINE === "webkit" ? "Meta" : "Control";
const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence";
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const VERDICT = '[data-testid="gradient-parse-verdict"]';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (o) => console.log(JSON.stringify({ engine: ENGINE, ...o }));

const browser = await launcher.launch();
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    permissions: ENGINE === "chromium" ? ["clipboard-read", "clipboard-write"] : [],
});
const page = await ctx.newPage();
async function boot() {
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
    await page.reload({ waitUntil: "load" });
    await page.waitForSelector(EDITOR, { timeout: 20000 });
    await sleep(2000);
}
const text = async (sel) =>
    (await page.locator(sel).count()) ? (await page.locator(sel).first().innerText()).slice(0, 120) : null;

// ── J · keyboard reachability + editable-surface attributes ──
await boot();
log({
    tag: "J1-editable-surface",
    ...(await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        return {
            tabIndexProp: el.tabIndex,
            hasTabindexAttr: el.hasAttribute("tabindex"),
            autocapitalize: el.autocapitalize ?? null,
            autocorrectAttr: el.getAttribute("autocorrect"),
            inputMode: el.inputMode || null,
            contentEditableValue: el.getAttribute("contenteditable"),
            enterKeyHint: el.enterKeyHint || null,
        };
    }, EDITOR)),
});
// Tab from the Copy-CSS control that precedes the editor.
await page.locator('[title="Copy CSS"], button:has-text("Copy")').first().focus().catch(() => {});
const seq = [];
for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    seq.push(
        await page.evaluate(() => {
            const a = document.activeElement;
            return `${a.tagName}${a.getAttribute("aria-label") ? `[${a.getAttribute("aria-label")}]` : ""}${a.isContentEditable ? "(CE)" : ""}`;
        }),
    );
}
log({ tag: "J2-tab-sequence-from-copy", seq });

// ── K · a newline inside a stop fuses the tokens ──
await boot();
await page.locator(EDITOR).first().click();
await page.keyboard.press(`${MOD}+a`);
await page.keyboard.type("linear-gradient(90deg, red", { delay: 3 });
await page.keyboard.press("Enter");
await page.keyboard.type("0%, blue 100%)", { delay: 3 });
await sleep(900);
log({
    tag: "K-newline-inside-stop",
    seenByUser: await text(EDITOR),
    textContentFedToParser: await page.evaluate((s) => document.querySelector(s).textContent, EDITOR),
    verdict: await text(VERDICT),
});
await page.screenshot({ path: `${DIR}/r2-K-newline-fusion.png` });

// ── L · composite: reject + blur inside the debounce window = WIP destroyed ──
await boot();
await page.locator(EDITOR).first().click();
await page.keyboard.press(`${MOD}+a`);
await page.keyboard.type("linear-gradient(90deg, red, notacolor)", { delay: 3 });
const lTyped = await text(EDITOR);
await page.locator("h3", { hasText: "Interpolation" }).first().click(); // blur < 500 ms
await sleep(1400);
log({
    tag: "L-blur-then-reject",
    typed: lTyped,
    nowOnScreen: await text(EDITOR),
    verdict: await text(VERDICT),
    userTextSurvives: (await text(EDITOR)) === lTyped,
});
await page.screenshot({ path: `${DIR}/r2-L-wip-destroyed.png` });

// ── M · MT-F001: the full boundary text, the Try-again path, the state loss ──
await boot();
// Author a distinct workspace first so the loss is legible.
await page.locator(EDITOR).first().click();
await page.keyboard.press(`${MOD}+a`);
await page.keyboard.type("linear-gradient(45deg, red 0%, lime 40%, blue 100%)", { delay: 3 });
await sleep(900);
const mAuthored = await text(EDITOR);
await page.keyboard.press(`${MOD}+a`);
await page.keyboard.type("linear-gradient(45deg, oklch(), blue)", { delay: 3 });
await sleep(1500);
const boundaryText = (await page.locator("body").innerText()).slice(0, 400).replace(/\n+/g, " | ");
log({ tag: "M1-boundary", authoredBefore: mAuthored, boundaryText, editorGone: (await page.locator(EDITOR).count()) === 0 });
await page.screenshot({ path: `${DIR}/r2-M-boundary.png` });
const retry = page.locator('button:has-text("Try again"), button:has-text("Retry")');
if (await retry.count()) {
    await retry.first().click();
    await sleep(1200);
    log({
        tag: "M2-after-try-again",
        editorBack: (await page.locator(EDITOR).count()) > 0,
        editorText: await text(EDITOR),
        bodyHead: (await page.locator("body").innerText()).slice(0, 150).replace(/\n+/g, " | "),
    });
    await page.screenshot({ path: `${DIR}/r2-M2-after-retry.png` });
}

// ── N · rich paste (chromium only: real clipboard with text/html) ──
if (ENGINE === "chromium") {
    await boot();
    await page.evaluate(async () => {
        const html = '<b style="color:red">linear-gradient(90deg, red, blue)</b><i>!!</i>';
        await navigator.clipboard.write([
            new ClipboardItem({
                "text/html": new Blob([html], { type: "text/html" }),
                "text/plain": new Blob(["linear-gradient(90deg, red, blue)"], { type: "text/plain" }),
            }),
        ]);
    });
    await page.locator(EDITOR).first().click();
    await page.keyboard.press("Control+a");
    await page.keyboard.press("Control+v");
    await sleep(300);
    log({
        tag: "N-rich-paste",
        innerHTML: await page.evaluate((s) => document.querySelector(s).innerHTML.slice(0, 260), EDITOR),
    });
    await sleep(900);
    log({ tag: "N2-after-parse", editorHTML: await page.evaluate((s) => document.querySelector(s).innerHTML.slice(0, 200), EDITOR), verdict: await text(VERDICT) });
}

await browser.close();
