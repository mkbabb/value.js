/**
 * CHALLENGE-C · GenerateControls implementation probe (r3, 2026-07-27).
 * READ-ONLY against the live dev server (http://localhost:9000). No repo file
 * is modified; the only page mutation is a DISCLOSED probe-time neutralisation
 * of the stuck `.vj-enter-enter-from` pane transform (see §A), without which
 * every rect is measured through a rotate(-2deg) translateX(-563px) matrix.
 *
 *   node docs/tranches/V/megatranche/audit/components/wb-generate-controls/probe-C-impl-r3.mjs
 */
import { chromium } from "@playwright/test";

const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9000";
const out = (k, v) => console.log(`\n### ${k}\n` + JSON.stringify(v, null, 1));

const browser = await chromium.launch({
    channel: "chromium",
    headless: true,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
const consoleWarns = [];
const pageErrors = [];
page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text().slice(0, 180));
    if (m.type() === "warning") consoleWarns.push(m.text().slice(0, 180));
});
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 180)));

await page.goto(`${ORIGIN}/#/generate`, { waitUntil: "load", timeout: 60000 });
await page.waitForSelector("[data-generate-plate]", { timeout: 30000 });
await page.waitForTimeout(4000);

// ── A · the stuck pane-enter transition (measured, then neutralised) ─────
out("A-pane-enter-state", await page.evaluate(() => {
    const w = document.querySelector("[data-generate-plate]").closest("[class*='vj-enter']")
        ?? document.querySelector("[data-generate-plate]").parentElement.parentElement;
    const cs = getComputedStyle(w);
    return { classes: w.className, transform: cs.transform, opacity: cs.opacity,
        rectX: Math.round(w.getBoundingClientRect().x) };
}));
await page.evaluate(() => {
    for (const el of document.querySelectorAll("[class*='vj-enter-enter-from']")) {
        el.style.transform = "none";
        el.style.opacity = "1";
    }
});
await page.waitForTimeout(400);
out("A2-after-neutralise", await page.evaluate(() => {
    const b = document.querySelector("[data-generate-plate]").getBoundingClientRect();
    return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), vw: innerWidth };
}));

// ── 1 · the swatch verb: is it wired at all? ─────────────────────────────
out("1-swatches", await page.evaluate(() => {
    const els = [...document.querySelectorAll(".generate-swatch")];
    return els.slice(0, 2).map((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        return {
            tagName: el.tagName, tagAttr: el.getAttribute("tag"),
            ariaHidden: el.getAttribute("aria-hidden"), ariaLabel: el.getAttribute("aria-label"),
            tabIndex: el.tabIndex, pointerEvents: cs.pointerEvents, cursor: cs.cursor,
            layoutBox: { w: el.offsetWidth, h: el.offsetHeight },
            elementAtCenter: hit ? `${hit.tagName}.${String(hit.className).slice(0, 60)}` : null,
            computedBackgroundColor: cs.backgroundColor,
            inlineBackgroundColor: el.style.backgroundColor,
        };
    });
}));

// ── 2 · does clicking a swatch write the clipboard? ──────────────────────
await page.evaluate(() => {
    window.__writes = [];
    const nav = navigator.clipboard;
    if (nav) {
        const orig = nav.writeText.bind(nav);
        nav.writeText = (t) => { window.__writes.push(["writeText", t.slice(0, 70)]); return orig(t).catch(() => {}); };
    }
});
// dispatch a real click straight at the element — bypassing Playwright
// actionability so we test the LISTENER, not the hit-testing.
out("2-swatch-synthetic-click", await page.evaluate(() => {
    const el = document.querySelector(".generate-swatch");
    el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    return { dispatched: true };
}));
await page.waitForTimeout(400);
out("2b-writes-after-swatch-click", await page.evaluate(() => window.__writes));
const pwClick = await page.locator(".generate-swatch").first().click({ timeout: 4000 })
    .then(() => "clicked").catch((e) => String(e).split("\n")[0]);
out("2c-playwright-actionability", { result: pwClick, writes: await page.evaluate(() => window.__writes) });

await page.getByRole("button", { name: "Copy all colors" }).click();
await page.waitForTimeout(400);
out("2d-after-copy-all", await page.evaluate(() => window.__writes));

// ── 3 · a11y exposure of the component's own output ──────────────────────
out("3-a11y-plate", await page.evaluate(() => {
    const plate = document.querySelector("[data-generate-plate]");
    const inAT = (el) => !el.closest("[aria-hidden='true']");
    return {
        plateAriaLabel: plate.getAttribute("aria-label"),
        stripAriaHidden: plate.querySelector("[role='presentation']")?.getAttribute("aria-hidden"),
        swatchCount: plate.querySelectorAll(".generate-swatch").length,
        swatchesReachableByAT: [...plate.querySelectorAll(".generate-swatch")].filter(inAT).length,
        liveRegionsInDocument: document.querySelectorAll("[aria-live]").length,
        liveRegionsInPlate: plate.querySelectorAll("[aria-live]").length,
        plateAccessibleText: plate.innerText.replace(/\s+/g, " ").trim(),
        focusablesInPlate: [...plate.querySelectorAll("a,button,input,select,textarea,[tabindex]")]
            .map((e) => `${e.tagName}:${e.getAttribute("aria-label") ?? e.textContent.trim().slice(0, 24)}`),
    };
}));

// ── 4 · the O-20 byte-identity comparison, measured ──────────────────────
out("4-o20-identity", await page.evaluate(() => {
    const sw = [...document.querySelectorAll(".generate-swatch")];
    const computed = sw.map((el) => getComputedStyle(el).backgroundColor);
    const inline = sw.map((el) => el.style.backgroundColor);
    return {
        computed_getComputedStyle: computed.slice(0, 2),
        inline_asGenerated: inline.slice(0, 2),
        byteIdentical: JSON.stringify(computed) === JSON.stringify(inline),
    };
}));

// ── 5 · layout geometry (offset* — immune to the ancestor transform) ─────
async function geom() {
    return page.evaluate(() => {
        const plate = document.querySelector("[data-generate-plate]");
        const box = (el) => el ? { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight } : null;
        const input = plate.querySelector("input[aria-label='Palette name']");
        const regen = [...plate.querySelectorAll("button")].find((b) => b.textContent.includes("Regenerate"));
        const thumb = document.querySelector(".slider-thumb");
        const gradient = [...document.querySelectorAll("div.absolute.inset-0")]
            .find((d) => getComputedStyle(d).backgroundImage.includes("gradient"));
        return {
            vw: innerWidth,
            plateW: plate.offsetWidth,
            nameInput: box(input),
            regenButton: box(regen),
            // offsetTop is layout-space, so a shared line ⇒ identical offsetTop
            chromeRowWrapped: input && regen ? input.offsetTop !== regen.offsetTop : null,
            sliderThumb: box(thumb),
            gradientDiv: box(gradient),
            swatch: box(document.querySelector(".generate-swatch")),
            iconButtons: [...plate.querySelectorAll("button")].filter((b) => !b.textContent.trim())
                .map((b) => ({ label: b.getAttribute("aria-label"), w: b.offsetWidth, h: b.offsetHeight })),
            regenW: regen?.offsetWidth,
        };
    });
}
out("5-geometry@1440", await geom());
for (const w of [1280, 768, 390]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(900);
    out(`5-geometry@${w}`, await geom());
}
await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForTimeout(900);

// ── 6 · slider hit-test across the painted track ─────────────────────────
out("6-slider-hit-test", await page.evaluate(() => {
    const gradient = [...document.querySelectorAll("div.absolute.inset-0")]
        .find((d) => getComputedStyle(d).backgroundImage.includes("gradient"));
    if (!gradient) return "no gradient div";
    const r = gradient.getBoundingClientRect();
    const probes = {};
    for (const [name, fy] of [["y=top+1", 1], ["y=mid", r.height / 2], ["y=bot-1", r.height - 1]]) {
        for (const [nx, fx] of [["x=0.02", 0.02], ["x=0.5", 0.5], ["x=0.98", 0.98]]) {
            const hit = document.elementFromPoint(r.x + r.width * fx, r.y + fy);
            probes[`${name} ${nx}`] = hit ? `${hit.tagName}.${String(hit.className).slice(0, 40)}` : null;
        }
    }
    return { gradientBox: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
        gradientPointerEvents: getComputedStyle(gradient).pointerEvents, probes };
}));

// ── 7 · keyboard operability + domain boundaries of `count` ──────────────
const read = () => page.evaluate(() => ({
    valuenow: document.querySelector(".slider-thumb")?.getAttribute("aria-valuenow"),
    swatches: document.querySelectorAll(".generate-swatch").length,
    stripSegments: document.querySelector("[data-generate-plate] [role='presentation']")?.children.length,
}));
await page.getByRole("slider", { name: "Color count" }).focus();
await page.keyboard.press("ArrowRight"); await page.waitForTimeout(250);
out("7-keyboard-one-step", await read());
for (let i = 0; i < 20; i++) await page.keyboard.press("ArrowLeft");
await page.waitForTimeout(500);
out("7-min-boundary", { ...await read(), gradientImage: await page.evaluate(() => {
    const g = [...document.querySelectorAll("div.absolute.inset-0")]
        .find((d) => d.parentElement?.className.includes("flex-1"));
    const cs = g ? getComputedStyle(g) : null;
    return cs ? { backgroundImage: cs.backgroundImage.slice(0, 120), backgroundColor: cs.backgroundColor } : null;
}) });
for (let i = 0; i < 30; i++) await page.keyboard.press("ArrowRight");
await page.waitForTimeout(600);
out("7-max-boundary", await read());

// ── 8 · preview strips at count 12: truncation vs. truth ────────────────
await page.getByRole("combobox", { name: "Generation preset" }).click({ timeout: 10000 })
    .catch((e) => console.log("preset open threw:", String(e).split("\n")[0]));
await page.waitForTimeout(900);
out("8-preset-menu@count12", await page.evaluate(() => {
    const chips = [...document.querySelectorAll("[data-stops]")];
    return {
        optionRows: document.querySelectorAll("[role='option']").length,
        chips: chips.length,
        stopsStampedPerChip: chips[0]?.getAttribute("data-stops")?.split("|").length ?? null,
        segmentsPaintedPerChip: chips[0]?.children.length ?? null,
        liveSwatches: document.querySelectorAll(".generate-swatch").length,
        chipAriaHidden: chips[0]?.getAttribute("aria-hidden"),
        optionAccessibleText: [...document.querySelectorAll("[role='option']")].slice(0, 2)
            .map((o) => o.innerText.replace(/\s+/g, " ").trim().slice(0, 90)),
    };
}));
await page.keyboard.press("Escape");
await page.waitForTimeout(600);

// ── 9 · regenerate cost ─────────────────────────────────────────────────
await page.evaluate(() => {
    window.__lt = [];
    new PerformanceObserver((l) => window.__lt.push(...l.getEntries().map((e) => Math.round(e.duration))))
        .observe({ entryTypes: ["longtask"] });
});
const regen = page.getByRole("button", { name: "Regenerate" });
const t0 = Date.now();
for (let i = 0; i < 10; i++) { await regen.click(); await page.waitForTimeout(50); }
out("9-regenerate-x10", { wallMs: Date.now() - t0, longTasksMs: await page.evaluate(() => window.__lt) });

// ── 10 · the dock trigger stability (why O-20 cannot reach this pane) ───
out("10-dock-trigger-stability", await page.evaluate(async () => {
    const el = document.querySelector("[aria-label='Select view']");
    if (!el) return "not found";
    const frames = [];
    for (let i = 0; i < 10; i++) {
        await new Promise((r) => requestAnimationFrame(r));
        const b = el.getBoundingClientRect();
        frames.push([+b.x.toFixed(2), +b.y.toFixed(2), +b.width.toFixed(2), +b.height.toFixed(2)]);
    }
    return { firstFrames: frames.slice(0, 4), distinctFrames: new Set(frames.map((f) => f.join(","))).size };
}));

out("11-errors", { consoleErrors: consoleErrors.slice(0, 8), consoleWarns: consoleWarns.slice(0, 8), pageErrors: pageErrors.slice(0, 8) });

await browser.close();
