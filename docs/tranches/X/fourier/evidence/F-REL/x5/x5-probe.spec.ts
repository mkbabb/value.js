// SERVED MODEL: claude-opus-5-5 — F-REL.x5 diagnosis instrument (never committed).
// Reads the app dock's run at /equation (logged in, touch) for each width: the run's box,
// padding, gap, scroll/client widths, and every child's box + intrinsic min-content width,
// plus the nav trigger's inner parts. Writes JSON to $X5_OUT.
import { expect, test } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = process.env.X5_OUT ?? "x5-diag.json";
const ROUTES = (process.env.X5_ROUTES ?? "/equation").split(",");
const rows: unknown[] = [];

for (const width of [360, 390]) {
    test.describe(`x5 probe ${width}`, () => {
        test.use({ viewport: { width, height: 780 }, hasTouch: true });
        test(`x5 probe ${width}`, async ({ page }) => {
            test.setTimeout(120_000);
            const cdp = await page.context().newCDPSession(page);
            await cdp.send("Emulation.setSafeAreaInsetsOverride" as never, { insets: { top: 47, bottom: 34, left: 0, right: 0 } } as never);
            await page.addInitScript(() => {
                localStorage.setItem("fourier-user-slug", "quiet-amber-lattice-fox");
                localStorage.setItem("fourier-user-token", "e2e-token");
            });
            for (const route of ROUTES) {
                await page.goto(route);
                await expect(page.locator(".account-trigger")).toBeVisible({ timeout: 30_000 });
                await page.waitForLoadState("networkidle").catch(() => undefined);
                await page.waitForTimeout(800);
                const r = await page.evaluate(() => {
                    const px = (v: string) => Math.round(parseFloat(v) * 100) / 100;
                    const rect = (e: Element) => {
                        const b = e.getBoundingClientRect();
                        return { x: px(String(b.x)), w: px(String(b.width)), r: px(String(b.right)) };
                    };
                    const minContent = (e: HTMLElement) => {
                        const saved = e.getAttribute("style");
                        e.style.setProperty("inline-size", "min-content", "important");
                        e.style.setProperty("flex", "none", "important");
                        const w = e.getBoundingClientRect().width;
                        if (saved === null) e.removeAttribute("style");
                        else e.setAttribute("style", saved);
                        return Math.round(w * 100) / 100;
                    };
                    const cs = (e: Element, ks: string[]) => {
                        const s = getComputedStyle(e);
                        return Object.fromEntries(ks.map((k) => [k, s.getPropertyValue(k)]));
                    };
                    const run = document.querySelector(".app-header .dock-run") as HTMLElement | null;
                    if (!run) return { error: "no .dock-run" };
                    const chain: unknown[] = [];
                    for (let e: HTMLElement | null = run; e && e.tagName !== "HEADER"; e = e.parentElement)
                        chain.push({
                            cls: e.className.toString().slice(0, 70),
                            ...rect(e),
                            scrollW: e.scrollWidth,
                            clientW: e.clientWidth,
                            ...cs(e, ["padding-left", "padding-right", "column-gap", "box-sizing", "min-width", "max-width", "overflow-x", "margin-left", "margin-right"]),
                        });
                    const kids = Array.from(run.children).map((c) => {
                        const h = c as HTMLElement;
                        const inner = Array.from(h.querySelectorAll(":scope > *")).map((g) => ({
                            tag: g.tagName.toLowerCase(),
                            cls: g.getAttribute("class")?.slice(0, 40) ?? "",
                            text: (g.textContent ?? "").trim().slice(0, 20),
                            ...rect(g),
                            font: getComputedStyle(g).fontFamily.slice(0, 50),
                            fontSize: getComputedStyle(g).fontSize,
                        }));
                        return {
                            tag: h.tagName.toLowerCase(),
                            cls: h.className.toString().slice(0, 60),
                            aria: h.getAttribute("aria-label") ?? "",
                            ...rect(h),
                            minContent: minContent(h),
                            ...cs(h, ["padding-left", "padding-right", "column-gap", "min-width", "margin-left", "margin-right", "display"]),
                            inner,
                        };
                    });
                    const rs = getComputedStyle(run);
                    const sum = kids.reduce((a, k) => a + (k as { w: number }).w, 0);
                    return {
                        run: { scrollW: run.scrollWidth, clientW: run.clientWidth, ...rect(run), ...cs(run, ["padding-left", "padding-right", "column-gap", "box-sizing", "display"]) },
                        nKids: kids.length,
                        sumKidW: Math.round(sum * 100) / 100,
                        gapsTotal: Math.round(parseFloat(rs.columnGap || "0") * Math.max(0, kids.length - 1) * 100) / 100,
                        chain,
                        kids,
                        fonts: Array.from(document.fonts).filter((f) => f.status === "loaded").map((f) => `${f.family} ${f.weight}`),
                    };
                });
                rows.push({ width, route, r });
            }
        });
    });
}

test.afterAll(() => writeFileSync(OUT, JSON.stringify(rows, null, 1)));
