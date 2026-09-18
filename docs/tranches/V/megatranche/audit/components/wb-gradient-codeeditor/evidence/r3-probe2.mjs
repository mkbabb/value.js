// CHALLENGE-C r3 — part 2: B (easing destroyed by a no-op edit), C, D, E, F, G.
// Run: node docs/.../evidence/r3-probe2.mjs [webkit|chromium]
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
    page.evaluate((s) => document.querySelector(s)?.style.getPropertyValue("--tile-render") ?? null, TILE);
const directionReadout = () =>
    page.evaluate(() => {
        const el = [...document.querySelectorAll("span.tabular-nums")].find((n) => /°/.test(n.textContent ?? ""));
        return el ? el.textContent.trim() : null;
    });
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
// The accordion's interval 0 is OPEN at mount (`openInterval = ref(0)`), so the
// specimen strip is already reachable — clicking the head would CLOSE it.
async function authorEasing() {
    const tile = page.locator('[data-specimen="ease-out"]').last();
    await tile.scrollIntoViewIfNeeded();
    await tile.click({ timeout: 8000 });
    await sleep(800);
}

// ── B · a NO-OP keystroke in the editor destroys authored easing ──
await boot();
await authorEasing();
const before1 = await easingState();
log({ tag: "B0-easing-authored", ...before1 });

await page.locator(EDITOR).first().scrollIntoViewIfNeeded();
await page.locator(EDITOR).first().click();
await page.keyboard.press("End");
await page.keyboard.type(" ");
await sleep(1300);
const after1 = await easingState();
log({
    tag: "B1-after-one-trailing-space",
    ...after1,
    easingSurvived: after1.railLiteral === before1.railLiteral,
    verdict: await text(VERDICT),
});
await page.screenshot({ path: `${DIR}/r3-B-easing-wiped.png`, fullPage: false });

// B2 — Enter at the end: `textContent` is byte-identical, easing still dies
await boot();
await authorEasing();
const before2 = await easingState();
const textBefore = await page.evaluate((s) => document.querySelector(s).textContent, EDITOR);
await page.locator(EDITOR).first().scrollIntoViewIfNeeded();
await page.locator(EDITOR).first().click();
await page.keyboard.press("End");
await page.keyboard.press("Enter");
await sleep(1300);
const textAfter = await page.evaluate((s) => document.querySelector(s).textContent, EDITOR);
const after2 = await easingState();
log({
    tag: "B2-enter-at-end-textContent-identical",
    textContentUnchanged: textBefore === textAfter,
    before: before2,
    after: after2,
    easingSurvived: after2.railLiteral === before2.railLiteral,
});

// ── C · the app's own Copy output pasted back is not idempotent ──
await boot();
const handleCount = () => page.locator("[data-stop-id]").count();
const handlesBefore = await handleCount();
const coalesced = await tileCss();
await setEditorText(coalesced);
await sleep(1500);
log({
    tag: "C-paste-back-own-copy",
    handlesBefore,
    handlesAfter: await handleCount(),
    verdict: await text(VERDICT),
    editorLen: (await page.evaluate((s) => document.querySelector(s).textContent, EDITOR)).length,
});
await page.screenshot({ path: `${DIR}/r3-C-copy-not-idempotent.png` });

// ── D · CSS Color L4 `in <space>` is rejected with a token-level lie ──
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

// ── E · an out-of-range angle poisons the model: its own output stops parsing ──
await boot();
await setEditorText("linear-gradient(1e400deg, red, blue)");
await sleep(1400);
log({
    tag: "E1-huge-angle-accepted",
    verdict: await text(VERDICT),
    direction: await directionReadout(),
    tile: (await tileCss())?.slice(0, 90),
});
await page.locator("h3", { hasText: "Interpolation" }).first().click();
await sleep(700);
log({
    tag: "E2-canonical-after-blur",
    editorText: await page.evaluate((s) => document.querySelector(s).textContent, EDITOR),
});
await page.locator(EDITOR).first().click();
await page.keyboard.press("End");
await page.keyboard.type(" ");
await sleep(1400);
log({
    tag: "E3-own-output-rejects",
    verdict: await text(VERDICT),
    direction: await directionReadout(),
    pageErrors: [...pageErrors],
});
await page.screenshot({ path: `${DIR}/r3-E-infinity-poison.png` });

// ── F · a radial edit silently resets the direction the user set ──
await boot();
const dirBefore = await directionReadout();
await setEditorText("radial-gradient(red 0%, blue 100%)");
await sleep(1400);
log({
    tag: "F-radial-drops-direction",
    directionBefore: dirBefore,
    directionAfter: await directionReadout(),
    verdict: await text(VERDICT),
});

// ── G · MT-F001 live, the exact mid-typing gesture, unfiltered console ──
await boot();
const consoleAll = [];
page.on("console", (m) => consoleAll.push(`${m.type()}:${m.text().slice(0, 120)}`));
await page.locator(EDITOR).first().click();
await page.keyboard.press(`${MOD}+a`);
await page.keyboard.type("linear-gradient(90deg, oklch(", { delay: 25 });
await sleep(700);
await page.keyboard.type("0.7 0.1 145), blue)", { delay: 25 });
await sleep(900);
log({
    tag: "G-mid-typing-crash",
    editorGone: (await page.locator(EDITOR).count()) === 0,
    bodyNow: (await page.locator("body").innerText()).slice(0, 260).replace(/\n+/g, " | "),
    consoleAll,
    pageErrors: [...pageErrors],
});
await page.screenshot({ path: `${DIR}/r3-G-mid-typing-crash.png` });

await browser.close();
