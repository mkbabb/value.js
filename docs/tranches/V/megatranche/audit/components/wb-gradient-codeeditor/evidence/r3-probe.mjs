// CHALLENGE-C r3 — NEW hypotheses only (the r2 findings are not re-run here
// except T·R1, which the brief demands be reproduced live).
// Run: node docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/r3-probe.mjs [webkit|chromium]
import { webkit, chromium } from "playwright";

const ENGINE = process.argv[2] ?? "webkit";
const launcher = ENGINE === "chromium" ? chromium : webkit;
const MOD = ENGINE === "webkit" ? "Meta" : "Control";
const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence";
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const VERDICT = '[data-testid="gradient-parse-verdict"]';
const TILE = '[data-testid="gradient-render-tile"]';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (o) => console.log(JSON.stringify({ engine: ENGINE, ...o }));

const browser = await launcher.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 160)));

async function boot() {
    pageErrors.length = 0;
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
    await page.reload({ waitUntil: "load" });
    await page.waitForSelector(EDITOR, { timeout: 20000 });
    await sleep(2000);
}
const text = async (sel) =>
    (await page.locator(sel).count())
        ? (await page.locator(sel).first().innerText()).slice(0, 200)
        : null;
const tileCss = () =>
    page.evaluate(
        (s) => document.querySelector(s)?.style.getPropertyValue("--tile-render") ?? null,
        TILE,
    );
const directionReadout = () =>
    page.evaluate(() => {
        const el = [...document.querySelectorAll("span.tabular-nums")].find((n) =>
            /°/.test(n.textContent ?? ""),
        );
        return el ? el.textContent.trim() : null;
    });
// The Easing accordion head name + the readout-rail literal for interval 0.
const easingState = () =>
    page.evaluate(() => {
        const head = document.querySelector(".interval-head");
        const rail = document.querySelector(".readout-rail code");
        return {
            headName: head ? head.textContent.replace(/\s+/g, " ").trim() : null,
            railLiteral: rail ? rail.textContent.trim() : null,
        };
    });
async function setEditorText(s) {
    await page.locator(EDITOR).first().click();
    await page.keyboard.press(`${MOD}+a`);
    await page.keyboard.insertText(s);
}

// ─────────────────────────────────────────────────────────────────────────────
// A · baseline: what the CSS section SHOWS vs what its Copy control COPIES
// ─────────────────────────────────────────────────────────────────────────────
await boot();
const shown = await page.evaluate((s) => document.querySelector(s).textContent, EDITOR);
const copied = await tileCss();
log({
    tag: "A-shown-vs-copied",
    shown,
    shownLen: shown.length,
    copiedLen: copied.length,
    copiedHead: copied.slice(0, 120),
    identical: shown === copied,
    copiedStopCount: copied.split(",").length - 1,
});

// ─────────────────────────────────────────────────────────────────────────────
// B · a NO-OP keystroke in the editor destroys authored easing
// ─────────────────────────────────────────────────────────────────────────────
await boot();
// Open interval 0 and pick a non-linear curve from the specimen strip.
await page.locator(".interval-head").first().click();
await sleep(500);
const tiles = page.locator('[id^="easing-interval-"] button');
const tileCount = await tiles.count();
// Click the 4th specimen tile (a named non-linear preset) if present.
for (let i = 0; i < tileCount; i++) {
    const label = (await tiles.nth(i).getAttribute("aria-label")) ?? "";
    if (/ease-in-out|easeInOut|ease-out/i.test(label)) {
        await tiles.nth(i).click();
        break;
    }
}
await sleep(600);
const beforeEasing = await easingState();
log({ tag: "B0-easing-authored", ...beforeEasing, specimenButtons: tileCount });

// B1 — a trailing SPACE (text differs by one char that CSS ignores)
await page.locator(EDITOR).first().click();
await page.keyboard.press(`${MOD}+ArrowDown`).catch(() => {});
await page.keyboard.press("End");
await page.keyboard.type(" ");
await sleep(1200);
const afterSpace = await easingState();
log({
    tag: "B1-after-trailing-space",
    ...afterSpace,
    easingSurvived:
        afterSpace.railLiteral === beforeEasing.railLiteral &&
        afterSpace.headName === beforeEasing.headName,
    verdict: await text(VERDICT),
});
await page.screenshot({ path: `${DIR}/r3-B-easing-wiped.png` });

// B2 — re-author, then press Enter at the end: textContent is UNCHANGED
await boot();
await page.locator(".interval-head").first().click();
await sleep(500);
const tiles2 = page.locator('[id^="easing-interval-"] button');
for (let i = 0, n = await tiles2.count(); i < n; i++) {
    const label = (await tiles2.nth(i).getAttribute("aria-label")) ?? "";
    if (/ease-in-out|easeInOut|ease-out/i.test(label)) {
        await tiles2.nth(i).click();
        break;
    }
}
await sleep(600);
const before2 = await easingState();
const textBefore = await page.evaluate((s) => document.querySelector(s).textContent, EDITOR);
await page.locator(EDITOR).first().click();
await page.keyboard.press("End");
await page.keyboard.press("Enter");
await sleep(1200);
const textAfter = await page.evaluate((s) => document.querySelector(s).textContent, EDITOR);
const after2 = await easingState();
log({
    tag: "B2-enter-at-end",
    textContentUnchanged: textBefore === textAfter,
    before: before2,
    after: after2,
    easingSurvived: after2.railLiteral === before2.railLiteral,
});

// ─────────────────────────────────────────────────────────────────────────────
// C · the app's own Copy output pasted back is not idempotent
// ─────────────────────────────────────────────────────────────────────────────
await boot();
const handleCount = () => page.locator("[data-stop-id]").count();
const before3 = await handleCount();
const coalesced = await tileCss();
await setEditorText(coalesced);
await sleep(1400);
log({
    tag: "C-paste-back-own-copy",
    handlesBefore: before3,
    handlesAfter: await handleCount(),
    verdict: await text(VERDICT),
    editorLen: (await page.evaluate((s) => document.querySelector(s).textContent, EDITOR)).length,
});
await page.screenshot({ path: `${DIR}/r3-C-copy-not-idempotent.png` });

// ─────────────────────────────────────────────────────────────────────────────
// D · CSS Color Level 4 `in <space>` — the syntax this very pane's Space
//     selector means — is rejected with a token-level lie
// ─────────────────────────────────────────────────────────────────────────────
await boot();
for (const src of [
    "linear-gradient(in oklch, red, blue)",
    "linear-gradient(90deg in oklch, red, blue)",
    "linear-gradient(in oklch longer hue, red, blue)",
]) {
    await setEditorText(src);
    await sleep(1200);
    log({ tag: "D-l4-interpolation-syntax", src, verdict: await text(VERDICT) });
}

// ─────────────────────────────────────────────────────────────────────────────
// E · a finite-domain break: an out-of-range angle poisons the model so the
//     component's OWN serialization no longer parses
// ─────────────────────────────────────────────────────────────────────────────
await boot();
await setEditorText("linear-gradient(1e400deg, red, blue)");
await sleep(1300);
log({
    tag: "E1-huge-angle-accepted",
    verdict: await text(VERDICT),
    direction: await directionReadout(),
    tile: (await tileCss())?.slice(0, 80),
});
// blur → the editor settles to the canonical serialization of the poisoned model
await page.locator("h3", { hasText: "Interpolation" }).first().click();
await sleep(600);
const poisoned = await page.evaluate((s) => document.querySelector(s).textContent, EDITOR);
log({ tag: "E2-canonical-after-blur", editorText: poisoned });
// now touch the text again: the app's own output is unparseable
await page.locator(EDITOR).first().click();
await page.keyboard.press("End");
await page.keyboard.type(" ");
await sleep(1300);
log({
    tag: "E3-own-output-rejects",
    verdict: await text(VERDICT),
    direction: await directionReadout(),
    pageErrors: [...pageErrors],
});
await page.screenshot({ path: `${DIR}/r3-E-infinity-poison.png` });

// ─────────────────────────────────────────────────────────────────────────────
// F · a radial edit silently resets the direction the user set
// ─────────────────────────────────────────────────────────────────────────────
await boot();
const dirBefore = await directionReadout();
await setEditorText("radial-gradient(red 0%, blue 100%)");
await sleep(1300);
log({
    tag: "F-radial-drops-direction",
    directionBefore: dirBefore,
    directionAfter: await directionReadout(),
    verdict: await text(VERDICT),
});

// ─────────────────────────────────────────────────────────────────────────────
// G · MT-F001 live, the exact mid-typing gesture, unfiltered console
// ─────────────────────────────────────────────────────────────────────────────
await boot();
const consoleAll = [];
page.on("console", (m) => consoleAll.push(`${m.type()}:${m.text().slice(0, 120)}`));
await page.locator(EDITOR).first().click();
await page.keyboard.press(`${MOD}+a`);
// The user types a fresh gradient and pauses one beat after `oklch(` — the
// debounce fires on the incomplete function.
await page.keyboard.type("linear-gradient(90deg, oklch(", { delay: 25 });
await sleep(700);
await page.keyboard.type("0.7 0.1 145), blue)", { delay: 25 });
await sleep(900);
const bodyNow = (await page.locator("body").innerText()).slice(0, 260).replace(/\n+/g, " | ");
log({
    tag: "G-mid-typing-crash",
    editorGone: (await page.locator(EDITOR).count()) === 0,
    bodyNow,
    consoleAll,
    pageErrors: [...pageErrors],
});
await page.screenshot({ path: `${DIR}/r3-G-mid-typing-crash.png` });

await browser.close();
