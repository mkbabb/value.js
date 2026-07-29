// Live read-only probe of GradientCodeEditor at http://localhost:9000/#/gradient.
// Run: node docs/.../evidence/live-probe.mjs
import { chromium } from "playwright";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

const pageErrors = [];
const consoleErrors = [];
page.on("pageerror", (e) => pageErrors.push(`${e.name}: ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });

const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';

async function boot() {
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
    await page.reload({ waitUntil: "load" });
    await page.waitForSelector(EDITOR, { timeout: 20000 });
    await sleep(2500);
    pageErrors.length = 0;
    consoleErrors.length = 0;
}

const noise = (t) => /VITE_API_URL|Failed to load resource|\b(429|503|504)\b|WebGL/i.test(t);

async function state(tag) {
    const editorCount = await page.locator(EDITOR).count();
    const verdictCount = await page.getByTestId("gradient-parse-verdict").count();
    return {
        tag,
        editorPresent: editorCount,
        editorText: editorCount ? (await page.locator(EDITOR).last().textContent())?.trim().slice(0, 140) : null,
        editorClass: editorCount ? (/border-destructive/.test(await page.locator(EDITOR).last().getAttribute("class") ?? "") ? "border-destructive" : "border-border/40") : null,
        verdict: verdictCount ? (await page.getByTestId("gradient-parse-verdict").last().textContent())?.trim() : null,
        errorBoundaryVisible: await page.locator(".vj-error-boundary").count(),
        errorBoundaryText: (await page.locator(".vj-error-boundary").allTextContents()).join(" / ").slice(0, 200),
        stopHandles: await page.locator("[data-stop-id]").count(),
        easingHeading: await page.locator("h3", { hasText: "Easing" }).count(),
        pageErrors: pageErrors.filter((t) => !noise(t)),
        consoleErrors: consoleErrors.filter((t) => !noise(t)),
    };
}

async function typeCss(css) {
    const editor = page.locator(EDITOR).last();
    await editor.scrollIntoViewIfNeeded();
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type(css, { delay: 4 });
}

const out = [];

// ── R1: MT-F001 through the code editor ──────────────────────────────────
await boot();
out.push(await state("R1-before"));
await typeCss("linear-gradient(90deg, oklch(), blue)");
await sleep(1800);
out.push(await state("R1-after: typed linear-gradient(90deg, oklch(), blue), 1.8s past last keystroke"));
await page.screenshot({ path: `${DIR}/R1-oklch-empty-crash.png`, fullPage: false });

// R1b: does hash-navigating away and back recover the workbench?
await page.evaluate(() => { window.location.hash = "#/mix"; });
await sleep(1200);
await page.evaluate(() => { window.location.hash = "#/gradient"; });
await sleep(1500);
out.push(await state("R1b: left to #/mix and came back to #/gradient after the crash"));

// ── R1c: the same via a mid-typing prefix a real user produces ───────────
await boot();
await typeCss("linear-gradient(90deg, red, rgb()");   // note: no trailing ) yet
await sleep(1000);
out.push(await state("R1c-partial: 'rgb()' with the gradient paren still unclosed"));
await page.keyboard.type(")", { delay: 4 });
await sleep(1500);
out.push(await state("R1c-closed: user closes the gradient paren"));

// ── R2: blur before the 500 ms debounce fires ────────────────────────────
await boot();
await typeCss("linear-gradient(90deg, notacolor, blue)");
await page.locator("h3", { hasText: "CSS" }).last().click({ force: true }); // blur at once
await sleep(1800);
out.push(await state("R2: garbage typed then blurred INSIDE the 500ms debounce window"));
await page.screenshot({ path: `${DIR}/R2-blur-eats-wip.png` });

// control: same input, no blur
await boot();
await typeCss("linear-gradient(90deg, notacolor, blue)");
await sleep(1800);
out.push(await state("R2-control: same garbage, NO blur"));

// ── R3: newline handling ────────────────────────────────────────────────
await boot();
{
    const editor = page.locator(EDITOR).last();
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type("linear-gradient(90deg, red", { delay: 4 });
    await page.keyboard.press("Enter");
    await page.keyboard.type("50%, blue)", { delay: 4 });
    await sleep(1800);
    const dom = await page.locator(EDITOR).last().evaluate((el) => ({
        innerHTMLTail: el.innerHTML.slice(-160),
        textContent: el.textContent,
        innerText: el.innerText,
    }));
    out.push({ ...(await state("R3: Enter pressed mid-declaration")), dom });
}

// ── R4: a11y census on the editor node (error state) ────────────────────
const a11y = await page.locator(EDITOR).last().evaluate((el) => {
    const v = document.querySelector('[data-testid="gradient-parse-verdict"]');
    const cs = getComputedStyle(el);
    return {
        tag: el.tagName, role: el.getAttribute("role"),
        ariaMultiline: el.getAttribute("aria-multiline"),
        ariaInvalid: el.getAttribute("aria-invalid"),
        ariaDescribedby: el.getAttribute("aria-describedby"),
        ariaErrormessage: el.getAttribute("aria-errormessage"),
        contenteditable: el.getAttribute("contenteditable"),
        verdictInDom: !!v, verdictId: v?.id ?? null, verdictRole: v?.getAttribute("role") ?? null,
        verdictAriaLive: v?.getAttribute("aria-live") ?? null,
        borderRadius: cs.borderRadius, fontSize: cs.fontSize,
    };
});
out.push({ tag: "R4 a11y census (page still in the R3 error state)", a11y });

// ── R5: editor DOM churn during a stop drag (editor is blurred) ─────────
await boot();
{
    const handle = page.locator("[data-stop-id]").first();
    await handle.scrollIntoViewIfNeeded();
    const hb = await handle.boundingBox();
    const barBox = await page.getByTestId("gradient-stop-bar").last().boundingBox();
    await page.locator(EDITOR).last().evaluate((el) => {
        window.__mut = 0;
        window.__mo = new MutationObserver((recs) => { window.__mut += recs.length; });
        window.__mo.observe(el, { childList: true, subtree: true, characterData: true });
    });
    await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2);
    await page.mouse.down();
    const t0 = Date.now();
    for (let i = 1; i <= 40; i++) await page.mouse.move(barBox.x + (barBox.width * i) / 45, hb.y + hb.height / 2);
    await page.mouse.up();
    const dragMs = Date.now() - t0;
    const mut = await page.evaluate(() => { window.__mo.disconnect(); return window.__mut; });
    out.push({ tag: "R5 editor DOM mutation records during a 40-step stop drag", dragMs, mutationRecords: mut });
}

// ── R6: unmount with a pending debounce (switch view within 500 ms) ─────
await boot();
{
    const editor = page.locator(EDITOR).last();
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type("linear-gradient(90deg, oklch(), blue)", { delay: 2 });
    // leave the view IMMEDIATELY — inside the 500 ms debounce window
    await page.evaluate(() => { window.location.hash = "#/mix"; });
    await sleep(1800);
    out.push({
        tag: "R6: navigated away inside the 500ms debounce window",
        url: page.url(),
        errorBoundaryVisible: await page.locator(".vj-error-boundary").count(),
        errorBoundaryText: (await page.locator(".vj-error-boundary").allTextContents()).join(" / ").slice(0, 200),
        pageErrors: pageErrors.filter((t) => !noise(t)),
        consoleErrors: consoleErrors.filter((t) => !noise(t)),
    });
    await page.screenshot({ path: `${DIR}/R6-unmount-pending-debounce.png` });
}

console.log(JSON.stringify(out, null, 1));
await browser.close();
