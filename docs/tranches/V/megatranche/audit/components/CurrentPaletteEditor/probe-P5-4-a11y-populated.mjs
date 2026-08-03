// PASS-5 probe P5-4 — the component's POPULATED-state accessibility contribution
// (pass 4's C4-5 established the visual matrix only ever captured the EMPTY
// state, where the component renders no controls at all; this supplies the
// number the matrix is missing), plus the keyboard walk and the Update/Cancel
// emphasis comparison.
import { chromium } from "playwright";

const BASE = "http://localhost:9000";
const CUR = ["oklch(0.7 0.15 30)", "oklch(0.6 0.18 140)", "oklch(0.55 0.2 260)"];
const out = {};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.addInitScript(
    ([cur]) => {
        localStorage.setItem("color-picker", JSON.stringify({ inputColor: cur[0], savedColors: cur }));
        localStorage.setItem(
            "color-palettes",
            JSON.stringify({
                version: 1,
                palettes: [
                    {
                        id: "id-dup",
                        name: "Dup",
                        slug: "dup-aaaaaaaa",
                        colors: [{ css: "red", position: 0 }],
                        createdAt: "2026-01-01T00:00:00.000Z",
                        updatedAt: "2026-01-01T00:00:00.000Z",
                        isLocal: true,
                    },
                ],
            }),
        );
    },
    [CUR],
);
await page.goto(`${BASE}/#/palettes`, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// ── 1. does the add-current-colour control exist as a control at all? ──────
out.roleQueries = {
    addByRole: await page.getByRole("button", { name: /Add current color/ }).count(),
    addByRoleAnyName: await page
        .locator('.dashed-well [role="button"], .dashed-well button')
        .count(),
    swatchByRole: await page.getByRole("button", { name: /Color swatch/ }).count(),
    tooltipNodes: await page.locator('[role="tooltip"]').count(),
};
out.addSlot = await page.evaluate(() => {
    const el = document.querySelector(".add-slot-ghost");
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
        tagName: el.tagName,
        ariaHidden: el.getAttribute("aria-hidden"),
        ariaLabel: el.getAttribute("aria-label"),
        tabIndex: el.tabIndex,
        pointerEvents: cs.pointerEvents,
        display: cs.display,
        box: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
        innerHTML: el.innerHTML.replace(/\s+/g, " ").slice(0, 220),
        hasPlusSvg: !!el.querySelector("svg.lucide-plus, svg[class*='plus']"),
        svgClasses: [...el.querySelectorAll("svg")].map((s) => s.getAttribute("class")),
        attrs: Object.fromEntries([...el.attributes].map((a) => [a.name, a.value])),
    };
});
out.swatchDots = await page.evaluate(() =>
    [...document.querySelectorAll('.swatch-row [data-testid="watercolor-swatch"]')].map((d) => {
        const cs = getComputedStyle(d);
        return {
            tagName: d.tagName,
            variant: d.getAttribute("data-variant"),
            ariaHidden: d.getAttribute("aria-hidden"),
            ariaLabel: d.getAttribute("aria-label"),
            tabIndex: d.tabIndex,
            pointerEvents: cs.pointerEvents,
        };
    }),
);

// ── 2. is `.dashed-well` a real class? and the two phantoms, re-measured ────
out.classRuleCounts = await page.evaluate(() => {
    const want = ["dashed-well", "floating-panel", "btn-interactive", "add-slot-ghost", "edit-overlay", "swatch-row"];
    const counts = Object.fromEntries(want.map((w) => [w, 0]));
    for (const ss of document.styleSheets) {
        let rules;
        try { rules = ss.cssRules; } catch { continue; }
        const walk = (rs) => {
            for (const r of rs) {
                if (r.selectorText) for (const w of want) if (r.selectorText.includes(w)) counts[w]++;
                if (r.cssRules) walk(r.cssRules);
            }
        };
        walk(rules);
    }
    return counts;
});

// ── 3. keyboard walk from the pane search field ────────────────────────────
await page.locator(".dashed-well input").first().focus();
const walk = [];
for (let i = 0; i < 6; i++) {
    walk.push(
        await page.evaluate(() => {
            const a = document.activeElement;
            if (!a) return null;
            const r = a.getBoundingClientRect();
            return {
                tag: a.tagName,
                name: a.getAttribute("aria-label") || a.getAttribute("placeholder") || a.textContent.trim().slice(0, 24),
                cls: (a.getAttribute("class") || "").slice(0, 48),
                box: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
            };
        }),
    );
    await page.keyboard.press("Tab");
    await page.waitForTimeout(120);
}
out.keyboardWalkFromNameField = walk;

// ── 4. the hover panel's three action buttons: names + tap targets ─────────
const wrap = page.locator(".swatch-row > div.relative").nth(1);
const wb = await wrap.boundingBox();
await page.mouse.move(wb.x + wb.width / 2, wb.y + wb.height / 2);
await page.waitForTimeout(400);
out.hoverPanelButtons = await page.evaluate(() => {
    const p = document.querySelector("body > .floating-panel");
    if (!p) return null;
    const pr = p.getBoundingClientRect();
    return {
        panelAriaHidden: p.getAttribute("aria-hidden"),
        panelPosition: getComputedStyle(p).position,
        panelRect: { x: +pr.x.toFixed(1), y: +pr.y.toFixed(1), w: +pr.width.toFixed(1), h: +pr.height.toFixed(1) },
        viewportH: window.innerHeight,
        belowTheFold: pr.y >= window.innerHeight,
        buttons: [...p.querySelectorAll("button")].map((b) => {
            const r = b.getBoundingClientRect();
            const cs = getComputedStyle(b);
            return {
                accName: b.getAttribute("aria-label") || b.textContent.trim(),
                box: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
                tabIndex: b.tabIndex,
                outlineOnFocus: cs.outlineStyle,
                classes: b.getAttribute("class"),
                under24: r.width < 24 || r.height < 24,
                under44: r.width < 44 || r.height < 44,
            };
        }),
    };
});
await page.mouse.move(5, 5);
await page.waitForTimeout(400);

// ── 5. Update vs Cancel: do the two dead `variant`s render identically? ────
await page.locator(".dashed-well input").first().fill("Dup");
await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    const inp = well.querySelector("input");
    const after = [...well.querySelectorAll("button")].filter(
        (b) => inp.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
    );
    after[0].click();
});
await page.waitForTimeout(600);
out.duplicateBranch = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    const btns = [...well.querySelectorAll("button")].map((b) => {
        const cs = getComputedStyle(b);
        const r = b.getBoundingClientRect();
        return {
            text: b.textContent.trim(),
            variantAttr: b.getAttribute("variant"),
            dataEmphasis: b.getAttribute("data-emphasis"),
            dataTone: b.getAttribute("data-tone"),
            dataSize: b.getAttribute("data-size"),
            bg: cs.backgroundColor,
            color: cs.color,
            borderWidth: cs.borderTopWidth,
            borderColor: cs.borderTopColor,
            box: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
            classes: b.getAttribute("class"),
        };
    });
    const bannerSpan = [...well.querySelectorAll("span")].find((s) => /already exists/.test(s.textContent));
    let live = null;
    let el = bannerSpan;
    while (el) {
        if (el.getAttribute?.("aria-live") || ["status", "alert", "log"].includes(el.getAttribute?.("role") ?? "")) {
            live = { tag: el.tagName, role: el.getAttribute("role"), live: el.getAttribute("aria-live") };
            break;
        }
        el = el.parentElement;
    }
    return {
        buttons: btns,
        bannerText: bannerSpan?.textContent.trim() ?? null,
        bannerLiveAncestor: live,
        focusAfterRefusal: document.activeElement?.tagName + "." + (document.activeElement?.getAttribute("class") ?? "").slice(0, 40),
        updateAndCancelIdentical:
            btns.length >= 2 &&
            (() => {
                const u = btns.find((b) => b.text === "Update");
                const c = btns.find((b) => b.text === "Cancel");
                return u && c ? u.dataEmphasis === c.dataEmphasis && u.bg === c.bg : null;
            })(),
    };
});

console.log(JSON.stringify(out, null, 2));
await browser.close();
