// PaletteCardMenu — CHALLENGE-C pass 3, probe A (desktop)
// Decides:
//  A1  trigger semantics: does as-child forward aria-haspopup/expanded/controls?
//  A2  duplicate accessible-name census across the card list
//  A3  the OPEN menu's AX subtree — is the palette name reachable to AT?
//  A4  the `.fira-code` cascade: glass-ui @utility vs the demo-local fork
//  A5  keyboard reach of the Export submenu (Enter on the sub-trigger)
//  A6  mouse CLICK on the sub-trigger: does it open? does focus move?
//  A7  does clicking the trigger also toggle the card (expand) ?
//  A8  item geometry + order for kind=saved
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: Array.from({ length: 6 }, (_, i) => ({
        id: `seed${i}`, name: `Probe Palette ${i}`, slug: `probe-${i}`, isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }],
    })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));
const cdp = await ctx.newCDPSession(page);
await cdp.send("Accessibility.enable");

await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

// ── A4 : the fira-code cascade ────────────────────────────────────────────────
log("A4_firaCodeCascade", await page.evaluate(() => {
    const probe = (cls) => {
        const el = document.createElement("span");
        el.className = cls; el.textContent = "offline";
        document.body.appendChild(el);
        const cs = getComputedStyle(el);
        const out = {
            cls,
            fontFamily: cs.fontFamily.slice(0, 60),
            fontFeatureSettings: cs.fontFeatureSettings,
            fontSize: cs.fontSize,
            textTransform: cs.textTransform,
            letterSpacing: cs.letterSpacing,
        };
        el.remove();
        return out;
    };
    // which rules actually define .fira-code, in document order?
    const rules = [];
    for (const sheet of Array.from(document.styleSheets)) {
        let list; try { list = sheet.cssRules; } catch { continue; }
        const walk = (rl, layer) => {
            for (const r of Array.from(rl)) {
                if (r.cssRules && (r.constructor.name === "CSSLayerBlockRule" || r.type === 4 || r.cssRules)) {
                    if (r.selectorText === undefined && r.cssRules) {
                        walk(r.cssRules, r.name ? `@layer ${r.name}` : (layer || "(nested)"));
                        continue;
                    }
                }
                if (r.selectorText && /\.fira-code\b/.test(r.selectorText)) {
                    rules.push({ layer: layer || "(unlayered)", sel: r.selectorText, css: r.style.cssText.slice(0, 160) });
                }
            }
        };
        walk(list, null);
    }
    return { computed: [probe("fira-code"), probe("text-mono-caption"), probe("fira-code text-mono-caption")], rules };
}));

// ── A7 : does the trigger click toggle the card? ──────────────────────────────
const expandedBefore = await page.evaluate(() =>
    document.querySelectorAll('[role="article"] [data-palette-swatches], [role="article"] .swatch-grid').length);
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(500);

log("A1_triggerAttrs", await page.evaluate(() => {
    const t = document.querySelector('[aria-label="Palette menu"]');
    if (!t) return null;
    const a = {};
    for (const at of t.attributes) a[at.name] = at.value;
    const r = t.getBoundingClientRect();
    return { tag: t.tagName, attrs: a, w: Math.round(r.width), h: Math.round(r.height) };
}));

log("A2_duplicateNames", await page.evaluate(() => {
    const names = {};
    for (const b of document.querySelectorAll('button, [role="button"]')) {
        const n = b.getAttribute("aria-label") || (b.textContent || "").trim().replace(/\s+/g, " ");
        if (!n) continue;
        names[n] = (names[n] || 0) + 1;
    }
    return Object.entries(names).filter(([, c]) => c > 1).sort((a, b) => b[1] - a[1]).slice(0, 12);
}));

log("A8_menuShape", await page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    if (!menu) return null;
    const mr = menu.getBoundingClientRect();
    const kids = Array.from(menu.children).map((c) => ({
        role: c.getAttribute("role"),
        text: (c.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40),
        h: Math.round(c.getBoundingClientRect().height),
        w: Math.round(c.getBoundingClientRect().width),
    }));
    const label = menu.querySelector('[role="menu"] > div:not([role])');
    return {
        menuRect: { w: Math.round(mr.width), h: Math.round(mr.height) },
        menuAttrs: {
            role: menu.getAttribute("role"),
            ariaLabel: menu.getAttribute("aria-label"),
            ariaLabelledby: menu.getAttribute("aria-labelledby"),
        },
        firstChildIsLabel: label ? (label.textContent || "").trim().slice(0, 40) : null,
        children: kids,
    };
}));

// ── A3 : the AX subtree of the open menu ─────────────────────────────────────
{
    const { nodes } = await cdp.send("Accessibility.getFullAXTree");
    const byId = new Map(nodes.map((n) => [n.nodeId, n]));
    const menuNode = nodes.find((n) => n.role?.value === "menu" && n.ignored === false);
    const collect = (n, depth, acc) => {
        if (!n || depth > 4) return acc;
        acc.push({
            d: depth,
            role: n.role?.value,
            name: n.name?.value,
            ignored: n.ignored,
            desc: n.description?.value,
        });
        for (const cid of n.childIds || []) collect(byId.get(cid), depth + 1, acc);
        return acc;
    };
    log("A3_menuAXSubtree", menuNode ? collect(menuNode, 0, []) : "NO MENU AX NODE");
    // is the palette name anywhere in the AX tree of the open menu?
    const names = (menuNode ? collect(menuNode, 0, []) : []).map((x) => x.name).filter(Boolean);
    log("A3_paletteNameReachable", names.some((n) => /Probe Palette/.test(n)));
    // trigger AX
    const trig = nodes.filter((n) => n.name?.value === "Palette menu")
        .map((n) => ({ role: n.role?.value, name: n.name?.value, ignored: n.ignored,
            props: (n.properties || []).map((p) => `${p.name}=${JSON.stringify(p.value?.value)}`) }));
    log("A1_triggerAX", trig.slice(0, 3));
    log("A1_triggerAXCount", trig.length);
}

// ── A6 : mouse CLICK on the Export sub-trigger ───────────────────────────────
const sub = page.getByRole("menuitem", { name: /Export/ }).first();
const beforeClick = await page.evaluate(() => {
    const s = document.querySelector('[aria-haspopup="menu"][data-state]');
    return { menus: document.querySelectorAll('[role="menu"]').length,
             ae: document.activeElement?.textContent?.trim().slice(0, 24) };
});
// a true mouse click (pointerdown + pointerup + click, pointerType mouse)
const box = await sub.boundingBox();
await page.mouse.move(box.x + 8, box.y + box.height / 2); // hover first would open it — move to far edge instead
await page.waitForTimeout(30);
// undo any hover-open before measuring the click path: move away, wait past the 100ms timer
await page.mouse.move(box.x + 8, box.y - 200);
await page.waitForTimeout(500);
const menusBeforeClick = await page.evaluate(() => document.querySelectorAll('[role="menu"]').length);
// jump straight onto the element and click without a preceding pointermove dwell
await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('[role="menuitem"]'))
        .find((e) => /Export/.test(e.textContent || ""));
    el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerType: "mouse" }));
    el.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerType: "mouse" }));
    el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
});
await page.waitForTimeout(400);
log("A6_clickOnSubTrigger", await page.evaluate((before) => {
    const el = Array.from(document.querySelectorAll('[role="menuitem"]'))
        .find((e) => /Export/.test(e.textContent || ""));
    return {
        menusBefore: before,
        menusAfter: document.querySelectorAll('[role="menu"]').length,
        ariaExpanded: el?.getAttribute("aria-expanded"),
        dataState: el?.getAttribute("data-state"),
        dataHighlighted: el?.getAttribute("data-highlighted"),
        focusMovedToSubTrigger: document.activeElement === el,
        activeElement: document.activeElement?.tagName + ":" +
            (document.activeElement?.getAttribute("aria-label") ||
             (document.activeElement?.textContent || "").trim().slice(0, 24)),
    };
}, menusBeforeClick));

// ── A5 : keyboard reach of the submenu ───────────────────────────────────────
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
await page.locator('[aria-label="Palette menu"]').first().focus();
await page.keyboard.press("Enter");
await page.waitForTimeout(450);
const kbSteps = [];
for (let i = 0; i < 8; i++) {
    const cur = await page.evaluate(() => (document.activeElement?.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30));
    kbSteps.push(cur);
    if (/^Export/.test(cur)) break;
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(90);
}
log("A5_keyboardWalk", kbSteps);
await page.keyboard.press("Enter");
await page.waitForTimeout(450);
log("A5_afterEnterOnExport", await page.evaluate(() => ({
    menus: document.querySelectorAll('[role="menu"]').length,
    items: Array.from(document.querySelectorAll('[role="menuitem"]')).map((e) => (e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 28)),
    activeElement: document.activeElement?.getAttribute("role") + ":" +
        (document.activeElement?.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30),
    activeIsMenuContent: document.activeElement?.getAttribute("role") === "menu",
})));
// one ArrowDown should land on JSON
await page.keyboard.press("ArrowDown");
await page.waitForTimeout(150);
log("A5_afterArrowDownInSub", await page.evaluate(() => ({
    activeElement: (document.activeElement?.textContent || "").trim().slice(0, 30),
    role: document.activeElement?.getAttribute("role"),
})));

await page.keyboard.press("Escape");
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
const expandedAfter = await page.evaluate(() =>
    document.querySelectorAll('[role="article"] [data-palette-swatches], [role="article"] .swatch-grid').length);
log("A7_cardExpandLeak", { expandedBefore, expandedAfter });

log("pageErrors", pageErrors);
writeFileSync(new URL("./pcm-p3-a-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
