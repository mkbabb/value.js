// PaletteCardMenu — CHALLENGE-C pass 2, probe B
// (1) focus-event trace across menu→Rename (does reka's focus-restore rob the input?)
// (2) Publish under the LIVE `misconfigured` latch: what actually happens
// (3) modal scroll-lock layout shift on menu open
// (4) touch tap on the Export sub-trigger (independent re-verification)
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: [
        { id: "seedsaved1", name: "Probe Saved Palette", slug: "probe-saved", isLocal: true,
          createdAt: NOW, updatedAt: NOW,
          colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }, { css: "#3355ff", position: 2 }] },
        { id: "seedsaved2", name: "Second Probe Palette", slug: "probe-two", isLocal: true,
          createdAt: NOW, updatedAt: NOW,
          colors: [{ css: "#123456", position: 0 }, { css: "#abcdef", position: 1 }] },
    ],
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, hasTouch: true });
await ctx.addInitScript((seed) => {
    localStorage.setItem("color-palettes", JSON.stringify(seed));
    window.__focusLog = [];
    document.addEventListener("focusin", (e) => {
        const t = e.target;
        window.__focusLog.push({
            t: Math.round(performance.now()),
            tag: t.tagName,
            label: t.getAttribute?.("aria-label"),
            ph: t.getAttribute?.("placeholder"),
            cls: (t.className || "").toString().slice(0, 40),
        });
    }, true);
}, SEED);
const page = await ctx.newPage();
const consoleAll = [];
const pageErrors = [];
page.on("console", (m) => consoleAll.push(m.type() + ": " + m.text().slice(0, 200)));
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));

await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const card = page.locator('[role="article"]').first();
const trigger = card.getByRole("button", { name: "Palette menu" });

// ── (3) scroll-lock layout shift ────────────────────────────────────────────
const geomBefore = await page.evaluate(() => {
    const el = document.querySelector('[role="article"]');
    const r = el.getBoundingClientRect();
    return {
        cardLeft: +r.left.toFixed(2), cardWidth: +r.width.toFixed(2),
        scrollY: window.scrollY,
        docScrollW: document.documentElement.scrollWidth,
        innerW: window.innerWidth,
        bodyPadRight: getComputedStyle(document.body).paddingRight,
        bodyOverflow: getComputedStyle(document.body).overflow,
        hasVScroll: document.documentElement.scrollHeight > window.innerHeight,
    };
});
log("geomBeforeOpen", geomBefore);

await trigger.click();
await page.waitForTimeout(400);
const geomAfter = await page.evaluate(() => {
    const el = document.querySelector('[role="article"]');
    const r = el.getBoundingClientRect();
    return {
        cardLeft: +r.left.toFixed(2), cardWidth: +r.width.toFixed(2),
        scrollY: window.scrollY,
        docScrollW: document.documentElement.scrollWidth,
        innerW: window.innerWidth,
        bodyPadRight: getComputedStyle(document.body).paddingRight,
        bodyOverflow: getComputedStyle(document.body).overflow,
    };
});
log("geomAfterOpen", geomAfter);
log("layoutShiftPx", {
    left: +(geomAfter.cardLeft - geomBefore.cardLeft).toFixed(2),
    width: +(geomAfter.cardWidth - geomBefore.cardWidth).toFixed(2),
});

// ── (4) touch tap on the Export sub-trigger ─────────────────────────────────
const sub = page.locator('[role="menuitem"][aria-haspopup="menu"]');
const subBox = await sub.boundingBox();
log("subTriggerBox", subBox);
const subState = async () => sub.evaluate((el) => ({
    ariaExpanded: el.getAttribute("aria-expanded"),
    dataState: el.getAttribute("data-state"),
    subContentInDom: !!document.querySelector('[role="menu"][data-reka-menu-content], [id^="reka-menu-sub-content"]'),
    menuCount: document.querySelectorAll('[role="menu"]').length,
}));
log("subBeforeTouch", await subState());
await page.touchscreen.tap(subBox.x + subBox.width / 2, subBox.y + subBox.height / 2);
await page.waitForTimeout(700);
log("subAfterTouchTap", await subState());
log("subItemsAfterTouch", await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="menuitem"]')).map((e) => e.textContent.replace(/\s+/g, " ").trim())));
// mouse hover for contrast
await sub.hover();
await page.waitForTimeout(700);
log("subAfterMouseHover", await subState());
log("subItemsAfterHover", await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="menuitem"]')).map((e) => e.textContent.replace(/\s+/g, " ").trim())));

await page.keyboard.press("Escape");
await page.waitForTimeout(200);
await page.keyboard.press("Escape");
await page.waitForTimeout(400);

// ── (1) focus trace across Rename ──────────────────────────────────────────
await page.evaluate(() => { window.__focusLog = []; });
await trigger.click();
await page.waitForTimeout(350);
await page.getByRole("menuitem", { name: /^Rename$/ }).click();
// sample activeElement rapidly
const samples = await page.evaluate(async () => {
    const out = [];
    for (let i = 0; i < 40; i++) {
        const a = document.activeElement;
        out.push({
            i, t: Math.round(performance.now()),
            tag: a?.tagName,
            label: a?.getAttribute?.("aria-label"),
            ph: a?.getAttribute?.("placeholder"),
        });
        await new Promise((r) => requestAnimationFrame(r));
    }
    return out;
});
// compress consecutive duplicates
const compressed = [];
for (const s of samples) {
    const last = compressed[compressed.length - 1];
    const key = `${s.tag}|${s.label}|${s.ph}`;
    if (!last || last.key !== key) compressed.push({ key, firstFrame: s.i, tag: s.tag, label: s.label, ph: s.ph });
}
log("activeElementByFrame", compressed);
log("focusLog", await page.evaluate(() => window.__focusLog));
log("finalActiveElement", await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    label: document.activeElement?.getAttribute?.("aria-label"),
    ph: document.activeElement?.getAttribute?.("placeholder"),
})));
log("renameInputAxName", await page.evaluate(() => {
    const inp = document.querySelector('[role="article"] input');
    return inp ? { placeholder: inp.getAttribute("placeholder"), ariaLabel: inp.getAttribute("aria-label"), id: inp.id, labelled: !!inp.labels?.length } : null;
}));

// cancel rename
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

// ── (2) Publish under the misconfigured latch ──────────────────────────────
await page.evaluate(() => { window.__unhandled = []; window.addEventListener("unhandledrejection", (e) => window.__unhandled.push(String(e.reason).slice(0, 200))); });
const before = consoleAll.length;
await trigger.click();
await page.waitForTimeout(350);
const publishItem = page.getByRole("menuitem", { name: /^Publish$/ });
log("publishItemAttrs", await publishItem.evaluate((el) => ({
    ariaDisabled: el.getAttribute("aria-disabled"),
    dataDisabled: el.getAttribute("data-disabled"),
    text: el.textContent.replace(/\s+/g, " ").trim(),
    pe: getComputedStyle(el).pointerEvents,
})));
await publishItem.click();
await page.waitForTimeout(1500);
log("afterPublishConsole", consoleAll.slice(before));
log("afterPublishUnhandled", await page.evaluate(() => window.__unhandled ?? []));
log("afterPublishPageErrors", pageErrors);
log("afterPublishVisibleFeedback", await page.evaluate(() => {
    const chip = document.querySelector(".feedback-chip");
    return chip ? chip.textContent.replace(/\s+/g, " ").trim() : null;
}));
log("afterPublishBodyTextTail", (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 400));

writeFileSync(new URL("./pcm-p2-b-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
