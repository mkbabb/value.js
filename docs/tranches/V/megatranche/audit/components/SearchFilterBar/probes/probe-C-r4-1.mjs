// CHALLENGE-C r4 · probe 1 — SearchFilterBar.vue behavioural truth
// NO fixture, NO route interception. Bare dev server at :9000.
// Engine: chromium (behaviour), 1440x900.
import { chromium } from "playwright";
import fs from "node:fs";

const OUT = new URL("../evidence-r4/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const log = { engine: "chromium", viewport: "1440x900", steps: {} };
const consoleErrors = [];
const pageErrors = [];
const netPalettes = [];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text().slice(0, 300));
});
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));
page.on("response", async (r) => {
    if (r.url().includes("/palettes") || r.url().includes("/colors")) {
        netPalettes.push({ url: r.url().slice(0, 140), status: r.status() });
    }
});

await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const trigger = page.locator('button[aria-label="Filters"]');
log.steps.triggerCount = await trigger.count();

// ---------- STEP 1: first open. What is in the colour field? ----------
await trigger.first().click();
await page.waitForTimeout(500);

const readPanel = async () => await page.evaluate(() => {
    const dialogs = [...document.querySelectorAll('[role="dialog"]')];
    const panel = dialogs.find((d) => d.textContent.includes("Find by Color")) ?? dialogs[0];
    if (!panel) return { present: false, dialogCount: dialogs.length };
    const input = panel.querySelector('input[type="text"]');
    const btns = [...panel.querySelectorAll("button")].map((b) => ({
        text: (b.textContent || "").trim().slice(0, 30),
        aria: b.getAttribute("aria-label"),
        role: b.getAttribute("role"),
        type: b.type,
        checked: b.getAttribute("aria-checked"),
        state: b.getAttribute("data-state"),
        w: +b.getBoundingClientRect().width.toFixed(1),
        h: +b.getBoundingClientRect().height.toFixed(1),
    }));
    const radiogroups = [...panel.querySelectorAll('[role="radiogroup"]')].map((g) => ({
        name: g.getAttribute("aria-label") ?? g.getAttribute("aria-labelledby") ?? null,
    }));
    const cs = getComputedStyle(panel);
    const r = panel.getBoundingClientRect();
    return {
        present: true,
        dialogCount: dialogs.length,
        inputValue: input ? input.value : null,
        inputPlaceholder: input ? input.placeholder : null,
        inputAria: input ? input.getAttribute("aria-label") : null,
        inputW: input ? +input.getBoundingClientRect().width.toFixed(1) : null,
        inputH: input ? +input.getBoundingClientRect().height.toFixed(1) : null,
        buttons: btns,
        radiogroups,
        panelRect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1), top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1) },
        panelPadding: cs.padding,
        panelMaxHeight: cs.maxHeight,
        panelOverflowY: cs.overflowY,
        hasTagSection: panel.textContent.includes("Tags"),
        badge: (() => {
            const t = document.querySelector('button[aria-label="Filters"] span');
            return t ? t.textContent.trim() : null;
        })(),
        triggerAria: document.querySelector('button[aria-label="Filters"]')?.getAttribute("aria-label") ?? null,
    };
});

log.steps.freshOpen = await readPanel();

// ---------- STEP 2: label-row activation. Click the WORD "Most Popular" ----------
const labelClick = await page.evaluate(() => {
    const dialogs = [...document.querySelectorAll('[role="dialog"]')];
    const panel = dialogs.find((d) => d.textContent.includes("Find by Color"));
    const spans = [...panel.querySelectorAll("span")];
    const target = spans.find((s) => s.textContent.trim() === "Most Popular");
    if (!target) return { found: false };
    const r = target.getBoundingClientRect();
    return { found: true, x: r.left + r.width / 2, y: r.top + r.height / 2, text: target.textContent.trim() };
});
log.steps.labelTarget = labelClick;
const radiosBefore = await page.evaluate(() => [...document.querySelectorAll('[role="radio"]')].map((r) => r.getAttribute("aria-checked")));
if (labelClick.found) await page.mouse.click(labelClick.x, labelClick.y);
await page.waitForTimeout(400);
const radiosAfter = await page.evaluate(() => [...document.querySelectorAll('[role="radio"]')].map((r) => r.getAttribute("aria-checked")));
log.steps.labelActivation = { radiosBefore, radiosAfter, changed: JSON.stringify(radiosBefore) !== JSON.stringify(radiosAfter) };
log.steps.panelStillOpenAfterLabelClick = (await readPanel()).present;

// ---------- STEP 3: nested popover. Click the swatch. ----------
const swatch = page.locator('button[aria-label^="Open color picker"]');
log.steps.swatchCount = await swatch.count();
if (await swatch.count()) {
    log.steps.swatchAriaBefore = await swatch.first().getAttribute("aria-label");
    await swatch.first().click();
    await page.waitForTimeout(500);
    log.steps.afterSwatchClick = await page.evaluate(() => {
        const dialogs = [...document.querySelectorAll('[role="dialog"]')];
        return {
            dialogCount: dialogs.length,
            outerPresent: dialogs.some((d) => d.textContent.includes("Find by Color")),
            miniPresent: dialogs.some((d) => d.querySelector(".sv-canvas")),
            miniRect: (() => {
                const m = dialogs.find((d) => d.querySelector(".sv-canvas"));
                if (!m) return null;
                const r = m.getBoundingClientRect();
                return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1) };
            })(),
        };
    });

    // drag the hue strip: does the TEXT FIELD get clobbered?
    const inputBefore = await page.evaluate(() => {
        const p = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent.includes("Find by Color"));
        return p?.querySelector('input[type="text"]')?.value ?? null;
    });
    // type a non-hex query FIRST, then move the picker
    const typedQuery = "rebeccapurple";
    await page.evaluate((q) => {
        const p = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent.includes("Find by Color"));
        const i = p?.querySelector('input[type="text"]');
        if (i) {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
            setter.call(i, q);
            i.dispatchEvent(new Event("input", { bubbles: true }));
        }
    }, typedQuery);
    await page.waitForTimeout(250);
    const inputAfterType = await page.evaluate(() => {
        const p = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent.includes("Find by Color"));
        return p?.querySelector('input[type="text"]')?.value ?? null;
    });

    const hueBox = await page.evaluate(() => {
        const m = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.querySelector(".sv-canvas"));
        if (!m) return null;
        const strips = [...m.querySelectorAll("div")].filter((d) => (d.getAttribute("style") || "").includes("linear-gradient(to right, #f00"));
        const s = strips[0];
        if (!s) return null;
        const r = s.getBoundingClientRect();
        return { x: r.left, y: r.top + r.height / 2, w: r.width };
    });
    log.steps.hueBox = hueBox;
    if (hueBox) {
        await page.mouse.move(hueBox.x + hueBox.w * 0.1, hueBox.y);
        await page.mouse.down();
        await page.mouse.move(hueBox.x + hueBox.w * 0.85, hueBox.y, { steps: 12 });
        await page.mouse.up();
        await page.waitForTimeout(300);
    }
    const inputAfterDrag = await page.evaluate(() => {
        const p = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent.includes("Find by Color"));
        return p?.querySelector('input[type="text"]')?.value ?? null;
    });
    const swatchAriaAfterDrag = await page.evaluate(() => document.querySelector('button[aria-label^="Open color picker"]')?.getAttribute("aria-label") ?? null);
    log.steps.textClobber = { inputBefore, typedQuery, inputAfterType, inputAfterDrag, swatchAriaAfterDrag };

    await page.screenshot({ path: OUT + "C-r4-nested-open.png" });

    // Escape closes which layer?
    await page.keyboard.press("Escape");
    await page.waitForTimeout(350);
    log.steps.afterEscape1 = await page.evaluate(() => {
        const dialogs = [...document.querySelectorAll('[role="dialog"]')];
        return { dialogCount: dialogs.length, outer: dialogs.some((d) => d.textContent.includes("Find by Color")), mini: dialogs.some((d) => d.querySelector(".sv-canvas")) };
    });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(350);
    log.steps.afterEscape2 = await page.evaluate(() => {
        const dialogs = [...document.querySelectorAll('[role="dialog"]')];
        return { dialogCount: dialogs.length, outer: dialogs.some((d) => d.textContent.includes("Find by Color")), mini: dialogs.some((d) => d.querySelector(".sv-canvas")) };
    });
    log.steps.focusAfterEscapes = await page.evaluate(() => ({
        active: document.activeElement?.tagName,
        aria: document.activeElement?.getAttribute("aria-label"),
    }));
}

// ---------- STEP 4: reopen and check colorText persistence ----------
await trigger.first().click();
await page.waitForTimeout(450);
log.steps.reopen = await page.evaluate(() => {
    const p = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent.includes("Find by Color"));
    return {
        present: !!p,
        inputValue: p?.querySelector('input[type="text"]')?.value ?? null,
        swatchAria: document.querySelector('button[aria-label^="Open color picker"]')?.getAttribute("aria-label") ?? null,
        badge: document.querySelector('button[aria-label="Filters"] span')?.textContent?.trim() ?? null,
    };
});

// ---------- STEP 5: the actual colour search. Does the wall change? ----------
const cardCount = async () => await page.evaluate(() => document.querySelectorAll('[data-slot="palette-card"], article, .palette-card').length);
log.steps.wallBefore = { cards: await cardCount() };
log.steps.wallDataProbe = await page.evaluate(async () => {
    // read whatever the app fetched: hit the same endpoint the app uses
    try {
        const res = await fetch("/colors/palettes?limit=20");
        const j = await res.json();
        const arr = Array.isArray(j) ? j : (j.data ?? j.palettes ?? []);
        return {
            ok: res.ok,
            status: res.status,
            count: arr.length,
            withOklab: arr.filter((p) => Array.isArray(p.oklabColors) && p.oklabColors.length > 0).length,
            sampleKeys: arr[0] ? Object.keys(arr[0]).slice(0, 30) : null,
        };
    } catch (e) {
        return { ok: false, error: String(e).slice(0, 200) };
    }
});

const searchBtn = page.locator('[role="dialog"] button', { hasText: /^Search$/ });
log.steps.searchBtnCount = await searchBtn.count();
if (await searchBtn.count()) {
    await searchBtn.first().click();
    await page.waitForTimeout(700);
}
log.steps.wallAfter = {
    cards: await cardCount(),
    badge: await page.evaluate(() => document.querySelector('button[aria-label="Filters"] span')?.textContent?.trim() ?? null),
    bodyHasEmptyState: await page.evaluate(() => /no palettes|nothing|empty/i.test(document.body.innerText)),
};
await page.screenshot({ path: OUT + "C-r4-after-search.png", fullPage: false });

log.consoleErrors = consoleErrors;
log.pageErrors = pageErrors;
log.network = netPalettes.slice(0, 12);

fs.writeFileSync(OUT + "probeC-r4-1.json", JSON.stringify(log, null, 2));
console.log(JSON.stringify(log, null, 2));
await browser.close();
