// CHALLENGE-C r3 — part 3: the BLOCKER reproduced two ways (independent of r2),
// plus the unbounded-ingress probe (the editor writes the Direction control's
// domain with no clamp).
// Run: node docs/.../evidence/r3-probe3.mjs [webkit|chromium]
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
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
const pageErrors = [];
const consoleAll = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 160)));
page.on("console", (m) => consoleAll.push(`${m.type()}:${m.text().slice(0, 120)}`));

async function boot() {
    pageErrors.length = 0;
    consoleAll.length = 0;
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
    await page.reload({ waitUntil: "load" });
    await page.waitForSelector(EDITOR, { timeout: 20000 });
    await sleep(2000);
}
const text = async (sel) =>
    (await page.locator(sel).count()) ? (await page.locator(sel).first().innerText()).slice(0, 200) : null;
const editorText = () => page.evaluate((s) => document.querySelector(s)?.textContent ?? null, EDITOR);
async function setEditorText(s) {
    await page.locator(EDITOR).last().click();
    await page.keyboard.press(`${MOD}+a`);
    await page.keyboard.insertText(s);
}
const state = async () => ({
    editorGone: (await page.locator(EDITOR).count()) === 0,
    boundary: (await page.locator('[role="alert"]').count()) > 0,
    boundaryText: (await page.locator('[role="alert"]').count())
        ? (await page.locator('[role="alert"]').first().innerText()).replace(/\n+/g, " | ")
        : null,
    activeElement: await page.evaluate(() => {
        const a = document.activeElement;
        return a ? `${a.tagName}${a.getAttribute("role") ? `[role=${a.getAttribute("role")}]` : ""}` : null;
    }),
    ariaLive: await page.evaluate(() => document.querySelector('[role="alert"]')?.getAttribute("aria-live") ?? null),
});

// ── H1 · r2's gesture, re-run independently: caret after `145`, 13 Backspaces ──
await boot();
const box = await page.evaluate((s) => {
    // rect of the literal "145" inside the highlighted editor
    const el = document.querySelector(s);
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
        const i = n.textContent.indexOf("145");
        if (i >= 0) {
            const r = document.createRange();
            r.setStart(n, i + 3);
            r.setEnd(n, i + 3);
            const rect = r.getBoundingClientRect();
            return { x: rect.x, y: rect.y + rect.height / 2 };
        }
    }
    return null;
}, EDITOR);
await page.mouse.click(box.x, box.y);
for (let i = 0; i < 13; i++) await page.keyboard.press("Backspace");
const atRest = await editorText();
await sleep(1500);
log({ tag: "H1-thirteen-backspaces", textAtRest: atRest, ...(await state()), pageErrors: [...pageErrors], consoleAll: [...consoleAll] });
await page.screenshot({ path: `${DIR}/r3-H1-crash.png` });

// ── H2 · the ONE-keypress variant: select the three channels, press Backspace ──
await boot();
const sel = await page.evaluate((s) => {
    const el = document.querySelector(s);
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
        const a = n.textContent.indexOf("0.75");
        const b = n.textContent.indexOf("145");
        if (a >= 0 && b > a) {
            const r1 = document.createRange();
            r1.setStart(n, a);
            r1.setEnd(n, a);
            const r2 = document.createRange();
            r2.setStart(n, b + 3);
            r2.setEnd(n, b + 3);
            const A = r1.getBoundingClientRect();
            const B = r2.getBoundingClientRect();
            return { ax: A.x, ay: A.y + A.height / 2, bx: B.x, by: B.y + B.height / 2 };
        }
    }
    return null;
}, EDITOR);
await page.mouse.move(sel.ax, sel.ay);
await page.mouse.down();
await page.mouse.move(sel.bx, sel.by, { steps: 8 });
await page.mouse.up();
await page.keyboard.press("Backspace");
const atRest2 = await editorText();
await sleep(1500);
log({ tag: "H2-drag-select-one-backspace", textAtRest: atRest2, ...(await state()), pageErrors: [...pageErrors] });
await page.screenshot({ path: `${DIR}/r3-H2-one-keypress-crash.png` });

// what the user gets back
const retry = page.locator('button:has-text("Try again")');
if (await retry.count()) {
    await retry.first().click();
    await sleep(1200);
    log({ tag: "H3-after-try-again", editorText: await editorText(), verdict: await text(VERDICT) });
}

// ── I · unbounded ingress into the Direction control (0–360 slider) ──
await boot();
for (const src of [
    "linear-gradient(1e10turn, red, blue)",
    "linear-gradient(-720deg, red, blue)",
    "linear-gradient(1e308deg, red, blue)",
]) {
    await boot();
    await setEditorText(src);
    await sleep(1400);
    const m = await page.evaluate(() => {
        const readout = [...document.querySelectorAll("span.tabular-nums")].find((n) => /°/.test(n.textContent ?? ""));
        const slider = document.querySelector('[role="slider"][aria-label="Gradient direction"]');
        return {
            readout: readout ? readout.textContent.trim().slice(0, 40) : null,
            ariaValueNow: slider?.getAttribute("aria-valuenow") ?? null,
            ariaValueMax: slider?.getAttribute("aria-valuemax") ?? null,
            thumbLeft: slider ? getComputedStyle(slider.parentElement ?? slider).left : null,
            docScrollW: document.documentElement.scrollWidth,
            docClientW: document.documentElement.clientWidth,
        };
    });
    log({ tag: "I-unbounded-direction", src, verdict: await text(VERDICT), ...m, pageErrors: [...pageErrors] });
}
await page.screenshot({ path: `${DIR}/r3-I-unbounded-direction.png` });

await browser.close();
