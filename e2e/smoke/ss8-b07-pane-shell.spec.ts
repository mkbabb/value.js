// SERVED MODEL: claude-opus-5-5
/**
 * SS-8 B07-pane-shell — the falsifiers for the batch's REFUTED rows
 * (docs/tranches/X/execution/SS8/packets/B07-pane-shell.md §cures).
 *
 *   V · SS8-0192 / 0197 — the header VEIL is gone. Every PaneHeader is seated
 *       above its FadingScroll port (PaneShell, X-DS tail), so the T.W3-4
 *       `::before` veil had no occlusion job and was never generated. Its CSS
 *       (fill, feather, SDA swell, `pane-header-veil` keyframes, the seated
 *       `display:none` rule) was dead; the cure deleted it. RED while any
 *       stylesheet still carries a `.pane-header…::before` rule or the
 *       `pane-header-veil` keyframes; GREEN once they are gone.
 *   S · SS8-0189 / 0195 / 0196 / 0199 — the seated contract: one visible
 *       header per region, seated before its port with 0 px overlap, never
 *       condensed and never scaled at any scroll depth (no parked pose, no
 *       dead band, no occlusion band).
 *   R · SS8-0194 — no shipped rule spells a ratio as tan(atan2()) (poles in
 *       WebKit 26.4 at 768/1280; calc(len/len) is the proven form, 0198).
 *   B · SS8-0214 — a deep-link cold boot that returns to `/#/` mounts the hero
 *       blob.
 */
import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const ROUTES = ["/", "/gradient", "/mix", "/extract", "/generate", "/browse"] as const;

async function boot(page: Page, route: string) {
    await page.goto(`/#${route}`, { timeout: 60_000 });
    await expect(page.locator("main .pane-header").first()).toBeVisible({ timeout: 30_000 });
}

test("SS8-0192/0197 — no stylesheet carries the dead pane-header veil", async ({ page }) => {
    test.setTimeout(90_000);
    await boot(page, "/");
    const found = await page.evaluate(() => {
        const hits: string[] = [];
        const walk = (rules: CSSRuleList) => {
            for (const r of Array.from(rules)) {
                if (r instanceof CSSKeyframesRule && r.name === "pane-header-veil") hits.push(`@keyframes ${r.name}`);
                if (r instanceof CSSStyleRule && /pane-header[^,]*::before/.test(r.selectorText)) hits.push(r.selectorText);
                if ("cssRules" in r && (r as CSSGroupingRule).cssRules) walk((r as CSSGroupingRule).cssRules);
            }
        };
        for (const s of Array.from(document.styleSheets)) {
            try {
                walk(s.cssRules);
            } catch {
                /* cross-origin sheet: not ours */
            }
        }
        return hits;
    });
    expect(found, "dead veil CSS still shipped").toEqual([]);
    const contents = await page.evaluate(() =>
        Array.from(document.querySelectorAll<HTMLElement>("main .pane-header")).map(
            (el) => {
                const cs = getComputedStyle(el, "::before");
                return cs.display === "none" ? "0" : cs.opacity;
            },
        ),
    );
    // What remains is glass's own `<CardHeader shrink>` condense veil (producer,
    // O-74d absorbed): hidden at rest, and a seated header never condenses.
    for (const c of contents) expect(c, "a pane-header veil paints at rest").toBe("0");
});

test("SS8-0194 — no shipped rule computes a ratio through tan(atan2()) (the WebKit pole)", async ({ page }) => {
    test.setTimeout(90_000);
    await boot(page, "/gradient");
    const hits = await page.evaluate(() => {
        const out: string[] = [];
        for (const s of Array.from(document.styleSheets)) {
            try {
                for (const r of Array.from(s.cssRules))
                    if (/tan\(\s*atan2\(/.test(r.cssText)) out.push(r.cssText.slice(0, 120));
            } catch {
                /* cross-origin sheet: not ours */
            }
        }
        return out;
    });
    // A rung ratio is written calc(len / len) (SS8-0198, proven in both engines).
    expect(hits, "a tan(atan2()) ratio is shipped").toEqual([]);
});

for (const route of ROUTES) {
    test(`SS8-0189/0195/0196/0199 — seated, uncondensed, unscaled header at every depth (${route})`, async ({
        page,
    }) => {
        test.setTimeout(60_000);
        await boot(page, route);
        // Let the out-in swap finish: every region holds exactly one pane.
        await expect
            .poll(() =>
                page.evaluate(() =>
                    Array.from(document.querySelectorAll(".pane-wrapper")).every((w) => w.children.length === 1),
                ),
            )
            .toBe(true);
        const rows = await page.evaluate(async () => {
            const raf = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            const out: { region: string; headers: number; seated: boolean; samples: string[] }[] = [];
            // A region that mounts PaneShell owes one seated header; the picker
            // region carries its own card and no PaneHeader.
            for (const w of Array.from(document.querySelectorAll<HTMLElement>(".pane-wrapper")).filter(
                (el) => el.querySelector(".pane-shell__card") !== null,
            )) {
                const headers = Array.from(w.querySelectorAll<HTMLElement>(".pane-header")).filter(
                    (h) => h.offsetParent !== null,
                );
                const h = headers[0];
                const port = h?.parentElement?.querySelector<HTMLElement>(":scope > .pane-scroll-fade") ?? null;
                const samples: string[] = [];
                if (h && port) {
                    const max = port.scrollHeight - port.clientHeight;
                    for (const y of [0, 64, 120, 300, max]) {
                        port.scrollTop = Math.min(y, Math.max(max, 0));
                        document.scrollingElement!.scrollTop = y;
                        await raf();
                        const t = h.querySelector<HTMLElement>(".pane-header-title")!;
                        samples.push(
                            [
                                h.dataset.condensed ?? "unset",
                                getComputedStyle(t).transform,
                                getComputedStyle(t).fontSize,
                                // LAYOUT overlap (offset boxes, one offsetParent: the card) —
                                // never client rects, which the boot's
                                // `overture-plate-settle` scale inflates.
                                h.offsetTop + h.offsetHeight - port.offsetTop,
                                `y=${y}`,
                            ].join("|"),
                        );
                    }
                    port.scrollTop = 0;
                    document.scrollingElement!.scrollTop = 0;
                }
                out.push({
                    region: w.dataset.pane ?? "?",
                    headers: headers.length,
                    seated: !!port && !port.contains(h!),
                    samples,
                });
            }
            return out;
        });
        expect(rows.length, `${route}: no pane region`).toBeGreaterThan(0);
        for (const r of rows) {
            expect.soft(r.headers, `${route} ${r.region}: visible headers`).toBe(1);
            expect.soft(r.seated, `${route} ${r.region}: header not seated above its port`).toBe(true);
            expect(r.samples.length, `${route} ${r.region}: no depth sampled`).toBe(5);
            const first = r.samples[0] ?? "";
            for (const s of r.samples) {
                const [condensed, transform, , overlap] = s.split("|");
                expect.soft(condensed, `${route} ${r.region}: header condensed`).not.toBe("true");
                expect.soft(transform, `${route} ${r.region}: title scaled`).toBe("none");
                expect.soft(Number(overlap), `${route} ${r.region}: header overlies its port (${s})`).toBe(0);
                // constant pose: every depth renders the rest sample
                expect.soft(s.split("|").slice(0, 3), `${route} ${r.region}: pose drifted`).toEqual(
                    first.split("|").slice(0, 3),
                );
            }
        }
    });
}

for (const start of ["/gradient", "/browse"] as const) {
    test(`SS8-0214 — deep-link cold boot ${start} then home mounts the hero blob`, async ({ page }) => {
        test.setTimeout(60_000);
        await boot(page, start);
        await page.evaluate(() => {
            location.hash = "#/";
        });
        await expect(page.locator(".hero-blob-anchor canvas")).toHaveCount(1, { timeout: 20_000 });
        const box = await page.locator(".hero-blob-anchor canvas").boundingBox();
        expect(box?.width ?? 0).toBeGreaterThan(0);
    });
}
