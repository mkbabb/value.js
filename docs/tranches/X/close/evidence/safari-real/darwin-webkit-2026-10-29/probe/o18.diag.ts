// SERVED MODEL: claude-opus-5-5 — X.W11.wk diagnostic (not a gate): the o18:769/823 element stacks.
import { test, expect } from "@playwright/test";
test.use({ colorScheme: "light" });
test("o18 stacks", async ({ page }) => {
    await page.goto("/#/?space=lab&color=" + encodeURIComponent("lab(38% 32 24)"));
    await page.waitForTimeout(4000);
    for (const sel of ['[data-o18="graph-node"]', ".markdown-wrapper .markdown-body p > code", ".markdown-wrapper .markdown-body p"]) {
        const out = await page.evaluate((s) => {
            const el = document.querySelector(s);
            if (!el) return null;
            const chain: string[] = [];
            for (let e: Element | null = el; e; e = e.parentElement) {
                const cs = getComputedStyle(e);
                if (cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.backgroundImage !== "none" || cs.opacity !== "1" || cs.backdropFilter !== "none")
                    chain.push(`${e.tagName}.${String(e.className).slice(0, 50)} bg=${cs.backgroundColor} img=${cs.backgroundImage.slice(0, 60)} op=${cs.opacity} bf=${cs.backdropFilter}`);
            }
            const r = document.documentElement;
            const v = (t: string) => getComputedStyle(r).getPropertyValue(t).trim();
            return { color: getComputedStyle(el).color, chain, scheme: r.className, fg: v("--foreground"), bg: v("--background"), well: v("--well-bg") };
        }, sel);
        console.log(sel, JSON.stringify(out, null, 1));
    }
    expect(1).toBe(1);
});
