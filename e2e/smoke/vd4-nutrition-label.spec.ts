// SERVED MODEL: claude-opus-5-5
/**
 * V-D4 (X realization, value-DESIGN) — the About inspector's colour-space
 * nutrition label, measured in the served page.
 *
 *   · BC-CNL-9  zero separators inside `.nutrition-label` (rhythm, not rules);
 *   · BC-CNL-24 at 1800 the key→value gutter is ≤ `--phi-3` + 1 px (the
 *               label column hugs its labels; a 50 % split opened ~500 px);
 *   · BC-CNL-11 under `dir=rtl` every component row keeps its name and range
 *               inside its own column;
 *   · BC-CNL-25 no `svg` inside the label lacks both a name and `aria-hidden`;
 *   · BC-CNL-8  no element inside the label carries a hover-only background.
 *
 * The PLAN's two further legs (X §0hw adversarial check, finding 3):
 *   · AXE       axe-core over the label (WCAG 2.x A/AA): zero violations, and
 *               zero `svg` that is neither named nor `aria-hidden`;
 *   · KEYBOARD  every element inside the label that a stylesheet `:hover`
 *               rule paints is reachable by Tab, and every Tab stop inside the
 *               label shows a focus ring when reached by the keyboard.
 */
import { createRequire } from "node:module";
import { test, expect, type Page } from "@playwright/test";

const AXE = createRequire(import.meta.url).resolve("axe-core/axe.min.js");

test.describe.configure({ timeout: 120_000 });

async function boot(page: Page) {
    await page.goto("/#/", { waitUntil: "domcontentloaded" });
    const label = page.locator(".pane-wrapper--inspector [data-space-facts]").first();
    await expect(label).toBeVisible({ timeout: 60_000 });
    await page.waitForTimeout(800);
    return label;
}

for (const scheme of ["light", "dark"] as const) {
    test(`label structure at 1800 · ${scheme}`, async ({ browser }) => {
        const ctx = await browser.newContext({ viewport: { width: 1800, height: 1000 }, colorScheme: scheme });
        try {
            const page = await ctx.newPage();
            const label = await boot(page);
            const r = await label.evaluate((root) => {
                const phi3 = (() => {
                    const p = document.createElement("div");
                    p.style.cssText = "position:absolute;visibility:hidden;width:var(--phi-3)";
                    document.body.append(p);
                    const w = p.getBoundingClientRect().width;
                    p.remove();
                    return w;
                })();
                const separators = root.querySelectorAll('[data-orientation][role="none"], [role="separator"], hr').length;
                // The key→value gutter of each key/value group: from the
                // right edge of its WIDEST key's text to the left edge of its
                // value column — the column gap a reader's eye crosses. (A
                // 50 % split opened ~500 px here; a hugging column, one gap.)
                let gutter = 0;
                const textBox = (el: Element) => {
                    const range = document.createRange();
                    range.selectNodeContents(el);
                    return range.getBoundingClientRect();
                };
                // Key/value groups alternate key, value: the new `dl.nl-facts`
                // and the retired `div.grid-cols-2` alike.
                const groups: Element[][] = [
                    ...[...root.querySelectorAll("dl.nl-facts")].map((dl) => [...dl.children]),
                    ...[...root.querySelectorAll("div.grid-cols-2")].map((g) => [...g.children]),
                ];
                for (const kids of groups) {
                    const keys = kids.filter((_, i) => i % 2 === 0);
                    const vals = kids.filter((_, i) => i % 2 === 1);
                    if (!keys.length || !vals.length) continue;
                    const keyRight = Math.max(...keys.map((k) => textBox(k).right));
                    const valLeft = Math.min(...vals.map((v) => v.getBoundingClientRect().left));
                    gutter = Math.max(gutter, valLeft - keyRight);
                }
                const bareSvg = [...root.querySelectorAll("svg")].filter(
                    (s) => s.getAttribute("aria-hidden") !== "true" && !s.getAttribute("aria-label") && !s.querySelector("title"),
                ).length;
                const hoverOnly = [...root.querySelectorAll("*")].filter((e) =>
                    [...e.classList].some((c) => c.startsWith("hover:")),
                ).length;
                return { phi3, separators, gutter, bareSvg, hoverOnly };
            });
            test.info().annotations.push({ type: "reading", description: JSON.stringify(r) });
            expect(r.separators, "separators inside the label").toBe(0);
            expect(r.gutter, "key → value gutter at 1800").toBeLessThanOrEqual(r.phi3 + 1);
            expect(r.bareSvg, "svg without a name or aria-hidden").toBe(0);
            expect(r.hoverOnly, "hover-only backgrounds").toBe(0);
        } finally {
            await ctx.close();
        }
    });
}

test("component rows hold under dir=rtl at 1440", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await ctx.newPage();
        const label = await boot(page);
        await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
        await page.waitForTimeout(300);
        const rows = await label.evaluate((root) => {
            const cells = [...root.querySelectorAll('[data-o18="component-name"]')].map((name) => {
                const cell = name.parentElement!;
                const c = cell.getBoundingClientRect();
                const n = name.getBoundingClientRect();
                const v = (name.nextElementSibling as HTMLElement | null)?.getBoundingClientRect();
                const inside = (b: DOMRect | undefined) => !!b && b.left >= c.left - 0.5 && b.right <= c.right + 0.5;
                return { inside: inside(n) && inside(v), w: c.width };
            });
            return cells;
        });
        expect(rows.length, "component rows").toBeGreaterThan(0);
        for (const [i, row] of rows.entries()) expect(row.inside, `component row ${i} intact under rtl`).toBe(true);
    } finally {
        await ctx.close();
    }
});

for (const scheme of ["light", "dark"] as const) {
    test(`axe over the label at 1440 · ${scheme}`, async ({ browser }) => {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        try {
            const page = await ctx.newPage();
            await boot(page);
            await page.addScriptTag({ path: AXE });
            const r = await page.evaluate(async () => {
                const axe = (window as unknown as { axe: { run: (ctx: unknown, opts: unknown) => Promise<{ violations: { id: string; nodes: { target: unknown }[] }[] }> } }).axe;
                const root = document.querySelector(".pane-wrapper--inspector [data-space-facts]")!;
                const res = await axe.run(root, {
                    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
                });
                const bareSvg = [...root.querySelectorAll("svg")].filter(
                    (s) => s.getAttribute("aria-hidden") !== "true" && !s.getAttribute("aria-label") && !s.querySelector("title"),
                ).length;
                return {
                    violations: res.violations.map((v) => `${v.id} × ${v.nodes.length}: ${JSON.stringify(v.nodes.slice(0, 3).map((n) => n.target))}`),
                    bareSvg,
                };
            });
            test.info().annotations.push({ type: "reading", description: JSON.stringify(r) });
            expect(r.violations, "axe violations inside the label").toEqual([]);
            expect(r.bareSvg, "svg neither named nor aria-hidden").toBe(0);
        } finally {
            await ctx.close();
        }
    });
}

test("keyboard: every :hover-painted element in the label has a focus path, every Tab stop a ring", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await ctx.newPage();
        const label = await boot(page);
        // (a) The :hover rules that paint something inside the label: each
        // rule's selector with its `:hover` removed names the elements a
        // pointer can light; each must be a keyboard stop (tabIndex ≥ 0).
        const hoverTargets = await label.evaluate((root) => {
            const out: string[] = [];
            // Nested rules (`.x { &:hover { … } }`, Tailwind v4's own output)
            // carry a RELATIVE selector: `&` is resolved against the parent
            // style rule, so `&:hover` under `.hover\:bg-accent\/50` names
            // that class, never the scope.
            const resolve = (sel: string, parent: string | null) =>
                parent === null ? sel : sel.includes("&") ? sel.replace(/&/g, `:is(${parent})`) : `:is(${parent}) ${sel}`;
            const walk = (rules: CSSRuleList, parent: string | null) => {
                for (const rule of [...rules]) {
                    const style = rule instanceof CSSStyleRule ? rule : null;
                    const own = style ? style.selectorText.split(",").map((sel) => resolve(sel.trim(), parent)).join(", ") : parent;
                    if ("cssRules" in rule && (rule as CSSGroupingRule).cssRules?.length) walk((rule as CSSGroupingRule).cssRules, own);
                    if (!style || !own || !own.includes(":hover")) continue;
                    for (const sel of own.split(/,(?![^(]*\))/)) {
                        if (!sel.includes(":hover")) continue;
                        const base = sel.replace(/:hover/g, "").trim() || "*";
                        let hits: Element[] = [];
                        try {
                            hits = [...root.querySelectorAll(base)];
                            if (root.matches(base)) hits.push(root);
                        } catch {
                            continue;
                        }
                        for (const el of hits) {
                            const stop = (el as HTMLElement).tabIndex >= 0 && !(el as HTMLButtonElement).disabled;
                            if (!stop) out.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join(".")} ← ${style.selectorText.trim()}`);
                        }
                    }
                }
            };
            for (const sheet of [...document.styleSheets]) {
                try {
                    walk(sheet.cssRules, null);
                } catch {
                    /* cross-origin sheet: not ours */
                }
            }
            return [...new Set(out)];
        });
        test.info().annotations.push({ type: "hover-without-focus", description: JSON.stringify(hoverTargets) });
        expect(hoverTargets, ":hover-painted elements with no keyboard stop").toEqual([]);

        // (b) Walk the label's own Tab stops by the keyboard: each, reached by
        // Tab, matches :focus-visible and draws a ring (outline or shadow).
        const stops = await label.evaluate(
            (root) =>
                [...root.querySelectorAll<HTMLElement>("a[href], button, input, select, textarea, [tabindex]")].filter(
                    (e) => e.tabIndex >= 0 && !(e as HTMLButtonElement).disabled && e.getClientRects().length > 0,
                ).length,
        );
        const rings: { inLabel: boolean; ring: boolean }[] = [];
        if (stops > 0) {
            await label.evaluate((root) => {
                const before = document.createElement("button");
                before.id = "vd4-kbd-anchor";
                before.textContent = "anchor";
                root.before(before);
                before.focus();
            });
            for (let i = 0; i < stops; i++) {
                await page.keyboard.press("Tab");
                rings.push(
                    await page.evaluate(() => {
                        const el = document.activeElement as HTMLElement;
                        const root = document.querySelector(".pane-wrapper--inspector [data-space-facts]")!;
                        const cs = getComputedStyle(el);
                        const ring = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== "none";
                        return { inLabel: root.contains(el), ring: el.matches(":focus-visible") && ring };
                    }),
                );
            }
        }
        test.info().annotations.push({ type: "tab-stops", description: JSON.stringify({ stops, rings }) });
        for (const [i, r] of rings.entries()) {
            expect(r.inLabel, `Tab ${i + 1} stays inside the label`).toBe(true);
            expect(r.ring, `Tab stop ${i + 1} shows a focus ring`).toBe(true);
        }
    } finally {
        await ctx.close();
    }
});
