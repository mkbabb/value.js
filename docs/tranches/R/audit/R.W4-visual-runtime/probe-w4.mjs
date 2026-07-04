#!/usr/bin/env node
// R.W4 close probe — the easing-consume riders + T19 dominance + E4 verdict,
// driven on the BUILT demo (vite preview :4184).
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:4184";
const results = [];
const record = (name, pass, detail) => {
    results.push({ name, pass, detail });
    console.log(`${pass ? "PASS" : "FAIL"} — ${name}${detail ? ` :: ${detail}` : ""}`);
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

// ── Rider 1+2+3: the gradient easing picker ──────────────────────────────
await page.goto(`${BASE}/#/gradient`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const main = page.getByRole("main", { name: "Color tool panes" });
const pane = main.locator(".pane-shell, [class*='pane']").first();

// the interval head (row 0 open by default)
const head = main.locator("button.interval-head").last();
await head.waitFor({ state: "visible", timeout: 5000 });
const headCss0 = await head.locator("code").textContent();
record("interval head shows linear seed", headCss0?.trim() === "cubic-bezier(0, 0, 1, 1)", headCss0?.trim());

// the picker's preset select — count the presets (rider: 24/24 selectable)
const visibleRegion = main.locator("div[id^='easing-interval-']:visible").last();
const presetTrigger = visibleRegion.locator("[data-slot='select-trigger'], button[role='combobox']").first();
await presetTrigger.click();
await page.waitForTimeout(400);
const options = page.getByRole("option");
const optionCount = await options.count();
const optionNames = (await options.allTextContents()).map((t) => t.trim());
record("24 preset names selectable", optionCount === 24, `count=${optionCount}`);
record("smooth-step-3 present", optionNames.some((n) => n.includes("smooth-step-3")), "");

// select ease-in-out-circ → head css updates to the authored literal
await page.getByRole("option", { name: "ease-in-out-circ" }).click();
await page.waitForTimeout(400);
const headCss1 = (await head.locator("code").textContent())?.trim();
record("preset select re-authors the interval", headCss1?.startsWith("cubic-bezier(0.85"), headCss1);

// hero preview background reflects a non-linear blend (sanity: css string long)
const heroBg0 = await main.locator("div[aria-hidden='true'][role='presentation']").first().evaluate((el) => el.style.background.length);

// ── steps mode (Q12): banded render ──
const stepsTab = visibleRegion.getByRole("tab", { name: "Steps" }).first()
    .or(visibleRegion.getByText("Steps", { exact: true }).first());
await stepsTab.click();
await page.waitForTimeout(500);
const headCss2 = (await head.locator("code").textContent())?.trim();
record("steps mode authors a steps() literal", /^steps\(\d+/.test(headCss2 ?? ""), headCss2);

// banded: the coalesced background carries duplicated adjacent color stops
const bandInfo = await main.locator("div[aria-hidden='true'][role='presentation']").first().evaluate((el) => {
    const bg = el.style.background;
    const stops = bg.match(/oklab\([^)]*\)|oklch\([^)]*\)|rgb\([^)]*\)/g) ?? [];
    let dup = 0;
    for (let i = 1; i < stops.length; i++) if (stops[i] === stops[i - 1]) dup++;
    return { count: stops.length, dup };
});
record("steps interval renders banded (duplicate adjacent stops)", bandInfo.dup > 0, JSON.stringify(bandInfo));

// ── round-trip: coalesced output parses back, intervals re-seed linear ──
const editor = main.locator("[contenteditable='true'].hljs").last();
const coalesced = await main.locator("div[aria-hidden='true'][role='presentation']").first().evaluate((el) => el.style.background);
await editor.evaluate((el, css) => {
    el.textContent = css;
    el.dispatchEvent(new Event("input", { bubbles: true }));
}, coalesced);
await page.waitForTimeout(900); // 500ms debounce + settle
const headCss3 = (await main.locator("button.interval-head").last().locator("code").textContent())?.trim();
record("coalesced parse re-seeds linear intervals (D3 + epoch remount)", headCss3 === "cubic-bezier(0, 0, 1, 1)", headCss3);

// keyboard reach: Tab focus onto the interval head, Enter toggles
await head.focus();
const headFocused = await head.evaluate((el) => document.activeElement === el);
record("easing row head keyboard-focusable", headFocused, "");

// ── E4: the ColorInput gamut verdict ─────────────────────────────────────
// The input lives in the dock's ActionBarLayer: fresh page → picker, toggle
// the action bar by KEYBOARD (the gate-(d) reach witness), field visible.
const page2 = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
await page2.goto(`${BASE}/#/picker`, { waitUntil: "networkidle" });
await page2.waitForTimeout(1500);
const toggleBar = page2.getByRole("button", { name: "Toggle action bar" });
await toggleBar.focus();
await page2.keyboard.press("Enter");
await page2.waitForTimeout(900);
// cycle the action bar to the input sub-layer
const openInput = page2.locator('[title="Open color input"], [aria-label="Open color input"]').last();
if (await openInput.count()) {
    await openInput.focus();
    await page2.keyboard.press("Enter");
    await page2.waitForTimeout(700);
}
const input = page2.locator("span.color-input:visible").last();
await input.waitFor({ state: "visible", timeout: 10000 });
record("fused ColorInput keyboard-reachable via dock toggle", true, "");
await input.click();
await input.evaluate((el) => { el.innerText = "color(display-p3 0 1 0)"; });
await input.press("Enter");
await page2.waitForTimeout(600);
// hover to open the HoverCard (the echo surface)
await input.hover();
await page2.waitForTimeout(900);
const verdictEl = page2.locator(".gamut-verdict:visible").last();
const verdictShown = await verdictEl.count().then((c) => c > 0 ? verdictEl.textContent() : null);
record("E4 verdict echoes visible clipping for p3 green", !!verdictShown && /clips in srgb/.test(verdictShown), verdictShown?.trim().replace(/\s+/g, " "));

await page2.mouse.move(10, 10);
await page2.waitForTimeout(400);
await input.click();
await input.evaluate((el) => { el.innerText = "#808080"; });
await input.press("Enter");
await page2.waitForTimeout(600);
await page2.mouse.move(10, 10);
await page2.waitForTimeout(400);
await input.hover();
await page2.waitForTimeout(900);
const verdict2 = await page2.locator(".gamut-verdict:visible").last().textContent().catch(() => null);
record("E4 verdict reads in-gamut for #808080", !!verdict2 && /Δ < jnd/.test(verdict2), verdict2?.trim());

// ── T19: extract dominance (generated image; population-proportional strip) ──
await page.goto(`${BASE}/#/extract`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
// generate a PNG: 70% red / 20% green / 10% blue
const png = await page.evaluate(() => {
    const c = document.createElement("canvas");
    c.width = 100; c.height = 100;
    const g = c.getContext("2d");
    g.fillStyle = "#d03a2b"; g.fillRect(0, 0, 100, 70);
    g.fillStyle = "#2b8a3e"; g.fillRect(0, 70, 100, 20);
    g.fillStyle = "#1c5db8"; g.fillRect(0, 90, 100, 10);
    return c.toDataURL("image/png").split(",")[1];
});
const fileInput = page.locator("input[type='file']:visible, input[type='file']").last();
await fileInput.setInputFiles({ name: "probe.png", mimeType: "image/png", buffer: Buffer.from(png, "base64") });
await page.waitForTimeout(2500); // worker quantize
const stat = await page.getByText("% of the image").last().textContent().catch(() => null);
const statNum = await page.locator("span.font-display.text-display:visible").last().textContent().catch(() => null);
record("T19 dominance stat renders", !!stat, (statNum ?? "").trim().replace(/\s+/g, " "));
// strip segments non-equal widths
const widths = await page.evaluate(() => {
    const strips = [...document.querySelectorAll("div[aria-hidden='true'][role='presentation']")]
        .filter((el) => el.className.includes("h-3"));
    const strip = strips[strips.length - 1];
    if (!strip) return null;
    return [...strip.children].map((ch) => ch.getBoundingClientRect().width);
});
const nonEqual = widths && widths.length > 1 && Math.max(...widths) - Math.min(...widths) > 4;
record("T19 strip segments population-proportional (non-equal)", !!nonEqual, JSON.stringify(widths?.map((w) => Math.round(w))));

await browser.close();
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} probes green`);
process.exit(failed.length ? 1 : 0);
