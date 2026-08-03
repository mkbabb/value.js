/**
 * CHALLENGE-C live probe — GradientCodeEditor.vue against the LIVE dev server
 * (http://localhost:9000). READ-ONLY: it drives the shipped UI, edits nothing.
 *
 * Run: node docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/probe/live-probe.mjs
 */
import { chromium } from "playwright";

const URL = "http://localhost:9000/#/gradient";
const log = (...a) => console.log(...a);

const browser = await chromium.launch({
    channel: "chromium",
    args: [
        "--use-gl=angle",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
    ],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

const consoleErrors = [];
const pageErrors = [];
page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => pageErrors.push(`${e.name}: ${e.message}`));

await page.goto(URL, { waitUntil: "load" });
await page.waitForTimeout(4000);

const main = page.getByRole("main", { name: "Color tool panes" });
const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
const verdict = main.getByTestId("gradient-parse-verdict").last();
await editor.scrollIntoViewIfNeeded();

const seeded = await editor.textContent();
log(`\n=== SEED ===\neditor text: ${JSON.stringify(seeded)}`);

async function state(tag) {
    const n = await verdict.count();
    log(
        `[${tag}] verdict=${n ? JSON.stringify((await verdict.textContent()).trim()) : "(none)"}` +
            ` | editor=${JSON.stringify((await editor.textContent()).trim())}` +
            ` | border=${(await editor.getAttribute("class")).includes("border-destructive") ? "DESTRUCTIVE" : "normal"}`,
    );
}

async function typeAll(css) {
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type(css, { delay: 3 });
}

// ── PROBE A · MT-F001: an empty color function mid-edit ──
log("\n=== PROBE A · MT-F001 (empty color function) ===");
consoleErrors.length = 0;
pageErrors.length = 0;
await typeAll("linear-gradient(90deg, oklch() 0%, blue 100%)");
await page.waitForTimeout(1500);
await state("A after 1.5s (still focused)");
log(`  consoleErrors: ${JSON.stringify(consoleErrors)}`);
log(`  pageErrors:    ${JSON.stringify(pageErrors)}`);
const railA = await main
    .getByTestId("gradient-stop-bar")
    .last()
    .evaluate((el) => getComputedStyle(el).backgroundImage.slice(0, 80));
log(`  rail still: ${railA}`);
await page.screenshot({
    path: "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/probe/A-mtf001.png",
    clip: await editor.evaluate((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.x - 8, y: r.y - 8, width: r.width + 16, height: r.height + 60 };
    }),
});

// ── PROBE B · the blur race: blur INSIDE the 500 ms debounce window ──
log("\n=== PROBE B · blur inside the debounce window ===");
consoleErrors.length = 0;
// reset to a clean, applied state first
await typeAll("linear-gradient(45deg, red, blue)");
await page.waitForTimeout(1200);
await main.getByRole("heading", { name: "Gradient" }).last().click();
await page.waitForTimeout(600);
await state("B baseline (clean, blurred)");
// now type garbage and blur ~150 ms later — well inside the 500 ms debounce
await editor.click();
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.type("linear-gradient(90deg, notacolor, ???)", { delay: 1 });
await page.waitForTimeout(120);
await main.getByRole("heading", { name: "Gradient" }).last().click(); // BLUR
await state("B immediately after blur");
await page.waitForTimeout(1200);
await state("B after the debounce fired");
log(`  consoleErrors: ${JSON.stringify(consoleErrors)}`);

// ── PROBE C · stale verdict after the model changes by another route ──
log("\n=== PROBE C · stale verdict survives an unrelated model change ===");
const slider = main.getByRole("slider", { name: "Gradient direction" }).last();
await slider.focus();
for (let i = 0; i < 5; i++) await page.keyboard.press("ArrowRight");
await page.waitForTimeout(800);
await state("C after moving the direction slider");

// ── PROBE D · newline handling in the contenteditable ──
log("\n=== PROBE D · Enter key / newline round-trip ===");
await editor.click();
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.type("linear-gradient(90deg,", { delay: 1 });
await page.keyboard.press("Enter");
await page.keyboard.type("red, blue)", { delay: 1 });
const dom = await editor.evaluate((el) => ({
    textContent: el.textContent,
    innerText: el.innerText,
    innerHTML: el.innerHTML,
}));
log(`  textContent (what onInput reads): ${JSON.stringify(dom.textContent)}`);
log(`  innerText:                        ${JSON.stringify(dom.innerText)}`);
log(`  innerHTML:                        ${JSON.stringify(dom.innerHTML)}`);
await page.waitForTimeout(1200);
await state("D after the debounce fired");

// ── PROBE E · a11y shape of the editor + the verdict live region ──
log("\n=== PROBE E · a11y attributes ===");
const a11y = await editor.evaluate((el) => ({
    role: el.getAttribute("role"),
    ariaLabel: el.getAttribute("aria-label"),
    ariaMultiline: el.getAttribute("aria-multiline"),
    ariaInvalid: el.getAttribute("aria-invalid"),
    ariaDescribedby: el.getAttribute("aria-describedby"),
    ariaErrormessage: el.getAttribute("aria-errormessage"),
    contentEditable: el.getAttribute("contenteditable"),
    tabIndex: el.tabIndex,
}));
log(`  editor: ${JSON.stringify(a11y)}`);
const liveRegionPresentWhenClean = await page.evaluate(() => {
    const p = document.querySelector('[data-testid="gradient-parse-verdict"]');
    return p ? "present" : "ABSENT from the DOM";
});
log(`  verdict live region while clean: ${liveRegionPresentWhenClean}`);

// ── PROBE F · MT-F037 readout-rail geometry vs the glass input token ──
log("\n=== PROBE F · easing readout rail (MT-F037) ===");
const rail = main.locator(".readout-rail").first();
if (await rail.count()) {
    const geom = await rail.evaluate((el) => {
        const cs = getComputedStyle(el);
        const btn = el.querySelector(".rail-btn");
        const bcs = btn ? getComputedStyle(btn) : null;
        const br = btn ? btn.getBoundingClientRect() : null;
        const root = getComputedStyle(document.documentElement);
        return {
            railRadius: cs.borderRadius,
            railBorder: cs.borderTopWidth + " " + cs.borderTopStyle,
            railBackground: cs.backgroundColor,
            railHeight: el.getBoundingClientRect().height,
            btnRadius: bcs?.borderRadius,
            btnBox: br ? `${Math.round(br.width)}x${Math.round(br.height)}` : null,
            tokenRadiusInput: root.getPropertyValue("--radius-input").trim(),
            tokenRadius: root.getPropertyValue("--radius").trim(),
        };
    });
    log(`  ${JSON.stringify(geom, null, 2)}`);
} else {
    log("  .readout-rail not found (easing row closed?)");
}

// ── PROBE G · what a real glass Input looks like on this page, for contrast ──
const inputGeom = await page.evaluate(() => {
    const el = document.querySelector("input");
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { radius: cs.borderRadius, cls: el.className, h: el.getBoundingClientRect().height };
});
log(`  a real page input for contrast: ${JSON.stringify(inputGeom)}`);

log(`\n=== TOTALS === consoleErrors=${consoleErrors.length} pageErrors=${pageErrors.length}`);
await browser.close();
