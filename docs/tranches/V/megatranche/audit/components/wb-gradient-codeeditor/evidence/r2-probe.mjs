// CHALLENGE-C r2 — independent live probe of GradientCodeEditor.
// Read-only: it types into the live dev server and reads the DOM. No writes to src/.
// Run:  node docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/r2-probe.mjs [webkit|chromium]
import { webkit, chromium } from "playwright";

const ENGINE = process.argv[2] ?? "webkit";
const launcher = ENGINE === "chromium" ? chromium : webkit;
const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence";
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const VERDICT = '[data-testid="gradient-parse-verdict"]';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (o) => console.log(JSON.stringify(o));

const browser = await launcher.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

const pageErrors = [];
const consoleErrors = [];
page.on("pageerror", (e) => pageErrors.push(`${e.name}: ${e.message.split("\n")[0]}`));
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 160)); });

const noise = (t) => /VITE_API_URL|Failed to load resource|\b(404|429|503|504)\b|WebGL|favicon/i.test(t);

async function boot() {
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
    await page.reload({ waitUntil: "load" });
    await page.waitForSelector(EDITOR, { timeout: 20000 });
    await sleep(2000);
    pageErrors.length = 0;
    consoleErrors.length = 0;
}

async function snap(tag) {
    const editor = page.locator(EDITOR);
    const present = await editor.count();
    return {
        tag,
        editorPresent: present,
        editorText: present ? (await editor.first().innerText()).slice(0, 120) : null,
        verdict: (await page.locator(VERDICT).count())
            ? (await page.locator(VERDICT).first().innerText()).slice(0, 160)
            : null,
        stopHandles: await page.locator('[data-testid="gradient-render-tile"]').count(),
        bodyHead: (await page.locator("body").innerText()).slice(0, 90).replace(/\n+/g, " | "),
        pageErrors: pageErrors.filter((t) => !noise(t)).slice(0, 3),
        consoleErrors: consoleErrors.filter((t) => !noise(t)).slice(0, 3),
    };
}

async function setEditorText(text) {
    // Select-all inside the contenteditable, then type — exactly what a user does.
    await page.locator(EDITOR).first().click();
    await page.keyboard.press(ENGINE === "webkit" ? "Meta+a" : "Control+a");
    await page.keyboard.type(text, { delay: 4 });
}

// ── A · chrome measurement: hand-rolled field vs the glass `field-control` ──
await boot();
log(await snap("A0-baseline"));
log({
    tag: "A1-computed-chrome",
    ...(await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        const cs = getComputedStyle(el);
        const root = getComputedStyle(document.documentElement);
        const tok = (n) => root.getPropertyValue(n).trim() || null;
        return {
            borderRadius: cs.borderRadius,
            borderWidth: cs.borderTopWidth,
            borderColor: cs.borderTopColor,
            background: cs.backgroundColor,
            minHeight: cs.minHeight,
            maxHeight: cs.maxHeight,
            fontFamily: cs.fontFamily.slice(0, 40),
            fontSize: cs.fontSize,
            backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
            tokens: {
                "--radius-field": tok("--radius-field"),
                "--radius-lg": tok("--radius-lg"),
                "--input-on-glass": tok("--input-on-glass"),
                "--focus-ring-shadow": (tok("--focus-ring-shadow") || "").slice(0, 60),
                "--invalid-ring": (tok("--invalid-ring") || "").slice(0, 60),
            },
            fieldControlInPage: document.querySelectorAll(".field-control").length,
        };
    }, EDITOR)),
});

// ── B · accessibility surface ──
log({
    tag: "B-a11y-attrs",
    ...(await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        const rect = el.getBoundingClientRect();
        return {
            attrs: Object.fromEntries([...el.attributes].map((a) => [a.name, a.value.slice(0, 40)])),
            tabIndex: el.tabIndex,
            rect: { w: Math.round(rect.width), h: Math.round(rect.height) },
            hasAriaDescribedby: el.hasAttribute("aria-describedby"),
            hasAriaErrormessage: el.hasAttribute("aria-errormessage"),
            hasAriaMultiline: el.hasAttribute("aria-multiline"),
            liveRegionsAtIdle: document.querySelectorAll('[role="status"],[aria-live]').length,
        };
    }, EDITOR)),
});

// ── C · MT-F001 live: the empty-argument colour function ──
await setEditorText("linear-gradient(90deg, oklch(), blue)");
await sleep(1800);
log(await snap("C-mtf001-oklch-empty"));
await page.screenshot({ path: `${DIR}/r2-C-mtf001.png` });

// ── D · the stale verdict: reject, blur, then change the model elsewhere ──
await boot();
await setEditorText("linear-gradient(90deg, red, notacolor)");
await sleep(900);
const dReject = await snap("D1-rejected");
log(dReject);
await page.locator("h3", { hasText: "Interpolation" }).first().click(); // blur the editor
await sleep(400);
log(await snap("D2-after-blur"));
// Now move the model from a DIFFERENT control (direction slider, keyboard).
await page.locator('[aria-label="Gradient direction"] [role="slider"], [aria-label="Gradient direction"]').first().click();
await page.keyboard.press("ArrowRight");
await page.keyboard.press("ArrowRight");
await sleep(500);
log(await snap("D3-model-moved-verdict-should-be-gone"));
log({
    tag: "D4-border-state",
    ...(await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        return {
            classList: [...el.classList].filter((c) => c.includes("border") || c.includes("destructive")),
            ariaInvalid: el.getAttribute("aria-invalid"),
            borderColor: getComputedStyle(el).borderTopColor,
            text: el.textContent.slice(0, 90),
        };
    }, EDITOR)),
});
await page.screenshot({ path: `${DIR}/r2-D-stale-verdict.png` });

// ── E · multi-line authoring: Enter inside the contenteditable ──
await boot();
await page.locator(EDITOR).first().click();
await page.keyboard.press(ENGINE === "webkit" ? "Meta+a" : "Control+a");
await page.keyboard.type("linear-gradient(90deg,", { delay: 4 });
await page.keyboard.press("Enter");
await page.keyboard.type("red 0%,", { delay: 4 });
await page.keyboard.press("Enter");
await page.keyboard.type("blue 100%)", { delay: 4 });
const eDom = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return { innerHTML: el.innerHTML.slice(0, 200), textContent: el.textContent.slice(0, 160), innerText: el.innerText.slice(0, 160) };
}, EDITOR);
log({ tag: "E1-multiline-dom", ...eDom });
await sleep(900);
log(await snap("E2-multiline-verdict"));
await page.screenshot({ path: `${DIR}/r2-E-multiline.png` });

// ── F · blur inside the debounce window ──
await boot();
await page.locator(EDITOR).first().click();
await page.keyboard.press(ENGINE === "webkit" ? "Meta+a" : "Control+a");
await page.keyboard.type("linear-gradient(45deg, red 0%, lime 50%, blue 100%)", { delay: 3 });
const fTyped = await page.locator(EDITOR).first().innerText();
await page.locator("h3", { hasText: "CSS" }).first().click(); // blur ~immediately
await sleep(120);
const fJustAfterBlur = await page.locator(EDITOR).first().innerText();
await sleep(1200);
const fSettled = await page.locator(EDITOR).first().innerText();
log({
    tag: "F-blur-inside-debounce",
    typed: fTyped.slice(0, 90),
    rightAfterBlur: fJustAfterBlur.slice(0, 90),
    settled: fSettled.slice(0, 90),
    wipDestroyed: fJustAfterBlur !== fTyped,
});

// ── G · unmount with a pending debounce: crash lands on ANOTHER route ──
await boot();
await page.locator(EDITOR).first().click();
await page.keyboard.press(ENGINE === "webkit" ? "Meta+a" : "Control+a");
await page.keyboard.type("linear-gradient(90deg, rgb(), blue)", { delay: 2 });
await page.evaluate(() => { window.location.hash = "#/mix"; });
await sleep(1500);
log({
    tag: "G-navigated-away-then-debounce-fires",
    hash: await page.evaluate(() => window.location.hash),
    bodyHead: (await page.locator("body").innerText()).slice(0, 120).replace(/\n+/g, " | "),
    pageErrors: pageErrors.filter((t) => !noise(t)).slice(0, 3),
});
await page.screenshot({ path: `${DIR}/r2-G-cross-route.png` });

// ── H · innerHTML rewrite vs the native undo stack + selection ──
await boot();
await page.locator(EDITOR).first().click();
await page.keyboard.type("XX", { delay: 5 });
const hBefore = await page.locator(EDITOR).first().innerText();
await page.keyboard.press(ENGINE === "webkit" ? "Meta+z" : "Control+z");
await sleep(150);
const hAfterUndo = await page.locator(EDITOR).first().innerText();
log({ tag: "H-undo-while-focused", before: hBefore.slice(0, 60), afterUndo: hAfterUndo.slice(0, 60) });

// ── I · rich paste into the contenteditable ──
await boot();
await page.locator(EDITOR).first().click();
await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    el.focus();
    document.getSelection().selectAllChildren(el);
    const dt = new DataTransfer();
    dt.setData("text/html", '<b style="color:red" onmouseover="window.__pwned=1">linear-gradient(90deg, red, blue)</b><img src=x onerror="window.__pwned=2">');
    dt.setData("text/plain", "linear-gradient(90deg, red, blue)");
    el.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true }));
}, EDITOR);
await sleep(300);
log({
    tag: "I-paste",
    ...(await page.evaluate((sel) => ({
        innerHTML: document.querySelector(sel).innerHTML.slice(0, 220),
        pwned: window.__pwned ?? null,
    }), EDITOR)),
});

await browser.close();
