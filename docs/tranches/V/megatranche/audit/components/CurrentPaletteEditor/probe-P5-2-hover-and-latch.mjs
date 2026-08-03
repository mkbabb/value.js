// PASS-5 probe P5-2 — four independent checks on /#/palettes (the ONE view
// where emitApply reaches a live picker, i.e. the best case):
//
//  A. REAL mouse hover over a swatch → does useHoverPopover.positionPanel throw?
//     (pass 4 recorded this as "checked and clean"). Capture the stack.
//  B. The three glass `Button`s: does the dead `variant` prop reach the DOM as a
//     literal attribute, and what emphasis/tone/size do they actually render?
//     Plus accessible name + measured box for the Save confirm.
//  C. duplicateTarget latch: delete the target palette while the banner is open,
//     then press Update → is the current palette silently destroyed?
//  D. `swatchKeys` churn: does removing swatch 0 re-mint every remaining key?
import { chromium } from "playwright";

const BASE = "http://localhost:9000";
const SEED = ["oklch(0.7 0.15 30)", "oklch(0.6 0.18 140)", "oklch(0.55 0.2 260)"];
const out = {};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push({ message: e.message, stack: (e.stack || "").split("\n").slice(0, 6) }));
await page.addInitScript(
    ([colors]) => {
        localStorage.setItem("color-picker", JSON.stringify({ inputColor: colors[0], savedColors: colors }));
        localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] }));
    },
    [SEED],
);
await page.goto(`${BASE}/#/palettes`, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// ───────────────────────────── A. real hover ─────────────────────────────
errs.length = 0;
const wrapper = page.locator(".swatch-row > div.relative").nth(1);
const box = await wrapper.boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.waitForTimeout(400);
out.A_hover = {
    swatchBox: box,
    errorsAfterOneRealHover: JSON.parse(JSON.stringify(errs)),
    panel: await page.evaluate(() => {
        const p = document.querySelector("body > .floating-panel");
        if (!p) return null;
        const r = p.getBoundingClientRect();
        const cs = getComputedStyle(p);
        return {
            inlineStyle: p.getAttribute("style"),
            position: cs.position,
            computedTop: cs.top,
            computedLeft: cs.left,
            rect: { x: r.x, y: r.y, w: r.width, h: r.height },
            parentIsBody: p.parentElement === document.body,
            ariaHidden: p.getAttribute("aria-hidden"),
            focusableInside: p.querySelectorAll("button, [tabindex]").length,
            ruleCount: (() => {
                let n = 0;
                for (const ss of document.styleSheets) {
                    let rules;
                    try { rules = ss.cssRules; } catch { continue; }
                    for (const r2 of rules) if (r2.selectorText?.includes("floating-panel")) n++;
                }
                return n;
            })(),
        };
    }),
    btnInteractiveRuleCount: await page.evaluate(() => {
        let n = 0;
        for (const ss of document.styleSheets) {
            let rules;
            try { rules = ss.cssRules; } catch { continue; }
            for (const r of rules) if (r.selectorText?.includes("btn-interactive")) n++;
        }
        return n;
    }),
};
// hover a SECOND swatch — does it throw again (per-hover, not once)?
errs.length = 0;
const w2 = page.locator(".swatch-row > div.relative").nth(2);
const b2 = await w2.boundingBox();
await page.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2);
await page.waitForTimeout(400);
out.A_secondHoverErrors = JSON.parse(JSON.stringify(errs));
await page.mouse.move(5, 5);
await page.waitForTimeout(500);

// ─────────────────────── B. the glass Buttons + a11y ─────────────────────
out.B_buttons = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    return [...well.querySelectorAll("button")].map((b) => {
        const r = b.getBoundingClientRect();
        const cs = getComputedStyle(b);
        return {
            attrs: Object.fromEntries([...b.attributes].map((a) => [a.name, a.value])),
            text: b.textContent.trim().slice(0, 30),
            accName: b.getAttribute("aria-label") || b.getAttribute("title") || b.textContent.trim(),
            box: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
            bg: cs.backgroundColor,
            borderColor: cs.borderTopColor,
            borderWidth: cs.borderTopWidth,
            dataEmphasis: b.getAttribute("data-emphasis"),
            dataTone: b.getAttribute("data-tone"),
            dataSize: b.getAttribute("data-size"),
        };
    });
});
out.B_input = await page.evaluate(() => {
    const i = document.querySelector(".dashed-well input");
    if (!i) return null;
    return {
        attrs: Object.fromEntries([...i.attributes].map((a) => [a.name, a.value])),
        accName: i.getAttribute("aria-label") || i.getAttribute("placeholder"),
        hasLabel: !!document.querySelector(`label[for="${i.id}"]`),
        maxLength: i.maxLength,
    };
});

// ───────────── C. latch survives its target's deletion → data loss ────────
// 1. save the row as "Latch" so a target exists
await page.locator(".dashed-well input").first().fill("Latch");
await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    const inp = well.querySelector("input");
    const after = [...well.querySelectorAll("button")].filter(
        (b) => inp.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
    );
    after[0].click();
});
await page.waitForTimeout(600);
// 2. re-seed the current row via the store-independent model, then re-type "Latch"
await page.evaluate(([colors]) => {
    // reinstate savedColors through the persisted projection + reload-free path:
    // dispatch a storage-independent model write by re-adding via the palette card
    // is not available here, so drive the row back through localStorage + reload.
    localStorage.setItem("color-picker", JSON.stringify({ inputColor: colors[0], savedColors: colors }));
}, [SEED]);
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(2500);
out.C_rowAfterReload = await page.evaluate(() => ({
    dots: document.querySelectorAll('.swatch-row [data-testid="watercolor-swatch"]').length,
    label: document.querySelector(".dashed-well .text-mono-small")?.textContent.trim(),
    store: JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => p.name),
}));
await page.locator(".dashed-well input").first().fill("Latch");
await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    const inp = well.querySelector("input");
    const after = [...well.querySelectorAll("button")].filter(
        (b) => inp.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
    );
    after[0].click();
});
await page.waitForTimeout(500);
out.C_banner = await page.evaluate(() => {
    const t = document.querySelector(".dashed-well")?.textContent ?? "";
    const m = t.match(/"([^"]+)" already exists\./);
    return {
        bannerText: m ? m[0] : null,
        liveRegion: (() => {
            let el = [...document.querySelectorAll(".dashed-well span")].find((s) =>
                /already exists/.test(s.textContent),
            );
            while (el) {
                if (el.getAttribute?.("aria-live") || ["status", "alert"].includes(el.getAttribute?.("role")))
                    return { tag: el.tagName, role: el.getAttribute("role"), live: el.getAttribute("aria-live") };
                el = el.parentElement;
            }
            return null;
        })(),
        focused: document.activeElement?.outerHTML.slice(0, 90),
    };
});
// 3. delete the "Latch" palette out from under the open banner
out.C_deleted = await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem("color-palettes"));
    return { before: s.palettes.map((p) => p.name) };
});
const delBtn = page.locator('[aria-label="Delete all saved palettes"]');
if (await delBtn.count()) {
    await delBtn.first().click();
    await page.waitForTimeout(300);
    const confirm = page.getByRole("button", { name: /Delete all/ });
    if (await confirm.count()) await confirm.last().click();
    await page.waitForTimeout(600);
}
out.C_afterDeleteAll = await page.evaluate(() => ({
    store: JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => p.name),
    bannerStillOpen: /already exists\./.test(document.querySelector(".dashed-well")?.textContent ?? ""),
    rowDots: document.querySelectorAll('.swatch-row [data-testid="watercolor-swatch"]').length,
}));
// 4. press Update on the now-dangling latch
const upd = page.getByRole("button", { name: /^Update$/ });
out.C_updateButtonFound = await upd.count();
if (await upd.count()) {
    await upd.first().click();
    await page.waitForTimeout(700);
}
out.C_afterUpdate = await page.evaluate(() => ({
    store: JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => ({
        name: p.name,
        n: p.colors.length,
    })),
    rowDots: document.querySelectorAll('.swatch-row [data-testid="watercolor-swatch"]').length,
    rowLabel: document.querySelector(".dashed-well .text-mono-small")?.textContent.trim() ?? null,
    persistedSaved: JSON.parse(localStorage.getItem("color-picker")).savedColors,
    anyFeedback: /error|fail|could not|couldn|not found/i.test(
        document.querySelector(".dashed-well")?.textContent ?? "",
    ),
}));

console.log(JSON.stringify(out, null, 2));
await browser.close();
