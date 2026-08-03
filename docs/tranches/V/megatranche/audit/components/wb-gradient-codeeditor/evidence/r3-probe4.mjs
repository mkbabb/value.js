// CHALLENGE-C r3 — part 4: H2 (the ONE-keypress crash) + I (unbounded ingress).
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
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 160)));

async function boot() {
    pageErrors.length = 0;
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

// ── H2 · select the channel run with the mouse, press Backspace ONCE ──
await boot();
const sel = await page.evaluate((s) => {
    const el = document.querySelector(s);
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    const pt = (node, off) => {
        const r = document.createRange();
        r.setStart(node, off);
        r.setEnd(node, off);
        const b = r.getBoundingClientRect();
        return { x: b.x, y: b.y + b.height / 2 };
    };
    // start = just before the FIRST "0.75"; end = just after the FIRST "145"
    let start = null;
    let end = null;
    for (const node of nodes) {
        const t = node.textContent;
        if (!start) {
            const i = t.indexOf("0.75");
            if (i >= 0) start = pt(node, i);
        }
        if (start && !end) {
            const j = t.indexOf("145");
            if (j >= 0) end = pt(node, j + 3);
        }
    }
    return start && end ? { ax: start.x, ay: start.y, bx: end.x, by: end.y, nodes: nodes.map((x) => x.textContent) } : null;
}, EDITOR);
log({ tag: "H2-0-selection-geometry", found: !!sel, textNodes: sel?.nodes?.slice(0, 12) });
await page.mouse.move(sel.ax, sel.ay);
await page.mouse.down();
await page.mouse.move(sel.bx, sel.by, { steps: 10 });
await page.mouse.up();
const selectedText = await page.evaluate(() => String(document.getSelection()));
await page.keyboard.press("Backspace");
const atRest = await editorText();
await sleep(1500);
log({
    tag: "H2-drag-select-one-backspace",
    selectedText,
    textAtRest: atRest,
    editorGone: (await page.locator(EDITOR).count()) === 0,
    boundaryText: (await page.locator('[role="alert"]').count())
        ? (await page.locator('[role="alert"]').first().innerText()).replace(/\n+/g, " | ")
        : null,
    pageErrors: [...pageErrors],
});
await page.screenshot({ path: `${DIR}/r3-H2-one-keypress-crash.png` });

// ── I · unbounded ingress into the Direction control (0–360 slider) ──
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
        const slider = document.querySelector('[role="slider"]');
        return {
            readout: readout ? readout.textContent.trim().slice(0, 44) : null,
            ariaValueNow: slider?.getAttribute("aria-valuenow") ?? null,
            ariaValueMax: slider?.getAttribute("aria-valuemax") ?? null,
            docScrollW: document.documentElement.scrollWidth,
            docClientW: document.documentElement.clientWidth,
        };
    });
    log({ tag: "I-unbounded-direction", src, verdict: await text(VERDICT), editorText: await editorText(), ...m, pageErrors: [...pageErrors] });
    await page.screenshot({ path: `${DIR}/r3-I-${src.slice(16, 24).replace(/\W/g, "")}.png` });
}

await browser.close();
