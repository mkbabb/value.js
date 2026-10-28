import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { test, expect } from "@playwright/test";

/**
 * T.W6 — O-22: THE DOCK STATUS LAMP ORACLE (SYNTHESIS §6.1; W6-6 / T-9).
 *
 * The dev-misconfig BANNER is dead (owner order; the R10 live confirm — it
 * dominated the overture and overlapped the dock band). Its affordance
 * re-homed as the dock band's STATUS LAMP. This oracle asserts the LIVE
 * half of O-22:
 *
 *   1. NO false lamp — under the healthy harness backend (VITE_API_URL is
 *      same-origin here) the band carries no lamp, and the dead banner
 *      never resurrects (negative watch on `.dev-misconfig-banner`).
 *   2. The `unavailable` variant lights under a REAL transport failure
 *      (routes aborted → the fetch rejection trips the S.W0-1 latch), with
 *      the honest quiet register (role="status"), WITHOUT any dock
 *      interaction — the lamp is band chrome, never a collapsible layer.
 *   3. Band seat: the lamp renders inside the dock band (the nav
 *      landmark), not inside the dock's layer machinery.
 *
 * HARNESS BOUND (recorded, not fudged): the `misconfigured` variant CANNOT
 * fire under this suite — the e2e webServer sets VITE_API_URL (the triad's
 * first leg disarms it by design). The misconfigured face + the full
 * variant matrix + the S.W0-1 contract rows (synchronous DevMisconfigError,
 * loud console.error, misconfigured ≠ unavailable, dev-gating) are asserted
 * closed-form in test/status-lamp.test.ts over the SAME resolver the SFC
 * consumes.
 */

/**
 * Every file under `demo/` whose bytes name `needle`. The census walks the
 * tracked product tree rather than asking the browser, because a resurrection
 * guard must be able to fail BEFORE the thing it guards against is rendered.
 */
function sourcesNaming(needle: string): string[] {
    const root = fileURLToPath(new URL("../../../demo", import.meta.url));
    const hits: string[] = [];
    const walk = (dir: string) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const full = join(dir, entry.name);
            if (entry.isDirectory()) {
                if (entry.name === "test") continue;
                walk(full);
            } else if (/\.(vue|ts|css|html)$/.test(entry.name)) {
                if (readFileSync(full, "utf8").includes(needle)) hits.push(full);
            }
        }
    };
    walk(root);
    return hits;
}

test.describe("O-22 · the dock status lamp (W6-6 / T-9)", () => {
    test("healthy backend → no lamp; the dead banner stays dead", async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        // ── X-W1 · R2/R29 (AP-4) — the resurrection guard, made capable of
        // failing. It watched `.dev-misconfig-banner` at RUNTIME, a class that
        // exists in no product byte and never has since the banner died: the
        // assertion was a tautology, green forever, and it would stay green if
        // the banner came back under any other class name. R29's cure is
        // literal — *"watch the STRING per MT-F031's born-RED grep, not a dead
        // selector"* — so the guard is now a SOURCE census that reds the moment
        // the banner's own identifier reappears anywhere in `demo/`.
        expect(
            sourcesNaming("dev-misconfig-banner"),
            "the dev-misconfig BANNER was killed by owner order and re-homed as the dock band's status lamp; these files resurrect it",
        ).toEqual([]);
        // Its live successor is the lamp, whose absence under a healthy backend
        // is the real runtime claim.
        // A healthy band carries no lamp (correct variant per precondition:
        // available → nothing).
        await expect(page.locator(".dock-status-lamp")).toHaveCount(0);
    });

    test("transport failure → the unavailable variant, first-paint band chrome", async ({
        page,
    }) => {
        // A REAL network-level failure on the api paths (never an HTTP
        // status): the boot color-names read rejects and trips the latch.
        // Re-baselined X-W12U .q2: the pattern also matches the dev server's
        // OWN module scripts since the feature trees were homed under
        // `demo/palettes/**` (v-w43b3 `a61094e31`; served as
        // `/@fs/…/demo/palettes/…`), so aborting every match killed the boot
        // itself (34 script requests, `W12U-evidence/q2/probes/probe-lamp.mjs`)
        // and no dock ever painted. The transport the latch watches is the
        // api's fetch/XHR — exactly those are refused.
        await page.route(/\/(colors|sessions|palettes|users)\//, (route) => {
            const type = route.request().resourceType();
            return type === "fetch" || type === "xhr"
                ? route.abort("connectionrefused")
                : route.continue();
        });
        await page.goto("/");

        // NO dock interaction: the lamp must arrive as band chrome the
        // moment the latch trips — never gated on expanding a layer or
        // saving a palette.
        const lamp = page.locator(".dock-status-lamp");
        await expect(lamp).toBeVisible({ timeout: 10000 });
        await expect(lamp).toHaveAttribute("data-variant", "unavailable");
        // The quiet honest register — a status, not an alert.
        await expect(lamp).toHaveAttribute("role", "status");

        // Band seat: inside the nav landmark (the dock band) …
        const nav = page.locator('nav[aria-label="Application navigation"]');
        expect(
            await lamp.evaluate(
                (el, navSel) => !!el.closest(navSel),
                'nav[aria-label="Application navigation"]',
            ),
        ).toBe(true);
        await expect(nav).toBeVisible();
        // … and NOT inside the dock's collapsible layer machinery.
        expect(await lamp.evaluate((el) => !!el.closest(".dock-layers"))).toBe(false);

        // Geometry: the lamp is ON the band's axis (its vertical centre falls
        // within the dock pill's band), parked at the inline end — it never
        // shifts the pill's centring (out-of-flow chrome).
        const lampBox = (await lamp.boundingBox())!;
        const dockBox = (await page.locator(".glass-dock").boundingBox())!;
        const lampMidY = lampBox.y + lampBox.height / 2;
        expect(lampMidY).toBeGreaterThan(dockBox.y - 1);
        expect(lampMidY).toBeLessThan(dockBox.y + dockBox.height + 1);
    });
});

/**
 * SS-8 B06 (packets/B06-dock-toolbar-status.md §cures) — the lamp's two
 * served-face rows, measured on the live band under the same REAL transport
 * failure as above.
 *
 *   SS8-0165 · WCAG 2.2.2 — automatic motion that starts with the content
 *       and runs beside it stops within 5 s: the dot's pulse, summed over
 *       every iteration, is ≤ 5 s (it read 2.4 s × 3 = 7.2 s).
 *   SS8-0162 · the dock seat's label clears 4.5:1 against the ground it is
 *       actually painted on (the capsule fill composited over the band), in
 *       both schemes at 1440 — it read 3.31:1 in light (glass's muted chip
 *       ink on the translucent band). The ground is a screenshot of the
 *       label's own box with its ink made transparent; the resolved ink is
 *       composited over every ground pixel and the WORST pixel is asserted.
 */
async function lightTheLamp(page: import("@playwright/test").Page) {
    await page.route(/\/(colors|sessions|palettes|users)\//, (route) => {
        const type = route.request().resourceType();
        return type === "fetch" || type === "xhr"
            ? route.abort("connectionrefused")
            : route.continue();
    });
    await page.goto("/");
    const lamp = page.locator(".api-status-chip[data-seat=dock]");
    await expect(lamp).toBeVisible({ timeout: 10000 });
    return lamp;
}

test.describe("SS-8 B06 · the dock lamp's served face", () => {
    test("SS8-0165 — the arrival pulse stops within 5 s (WCAG 2.2.2)", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "no-preference" });
        const lamp = await lightTheLamp(page);
        const runs = await lamp.evaluate((el) =>
            el.getAnimations({ subtree: true }).map((a) => {
                const t = a.effect!.getComputedTiming();
                return { name: (a as CSSAnimation).animationName, total: Number(t.endTime) };
            }),
        );
        expect(runs.length, "the arrival beat is part of the lamp's identity").toBeGreaterThan(0);
        for (const r of runs) expect(r.total, `${r.name} runs ${r.total} ms`).toBeLessThanOrEqual(5000);
    });

    for (const scheme of ["light", "dark"] as const) {
        test(`SS8-0162 — the dock label clears 4.5:1 on its own ground (${scheme}, 1440)`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
            const lamp = await lightTheLamp(page);
            const label = lamp.locator(".api-status-label");
            // let the band's boot inks settle before reading the ground
            await page.waitForTimeout(1200);
            const ink = await label.evaluate((el) => {
                const cv = document.createElement("canvas");
                cv.width = cv.height = 1;
                const ctx = cv.getContext("2d", { willReadFrequently: true })!;
                const draw = (ground: string, css: string) => {
                    ctx.fillStyle = ground;
                    ctx.fillRect(0, 0, 1, 1);
                    ctx.fillStyle = "#000";
                    ctx.fillStyle = css;
                    ctx.fillRect(0, 0, 1, 1);
                    return ctx.getImageData(0, 0, 1, 1).data;
                };
                const css = getComputedStyle(el).color;
                const b = draw("#000", css);
                const w = draw("#fff", css);
                const [b0, b1, b2] = [b[0]!, b[1]!, b[2]!];
                const a = 1 - (w[0]! - b0) / 255;
                let op = 1;
                for (let n: Element | null = el; n; n = n.parentElement)
                    op *= Number(getComputedStyle(n).opacity);
                const rgb: [number, number, number] = a > 0 ? [b0 / a, b1 / a, b2 / a] : [0, 0, 0];
                return { css, rgb, alpha: a * op };
            });
            await label.evaluate((el) => {
                el.style.setProperty("color", "transparent", "important");
                el.style.setProperty("transition", "none", "important");
            });
            await page.waitForTimeout(100);
            const shot = await label.screenshot();
            const min = await page.evaluate(
                async ({ b64, ink }) => {
                    const img = new Image();
                    img.src = "data:image/png;base64," + b64;
                    await img.decode();
                    const c = document.createElement("canvas");
                    c.width = img.width;
                    c.height = img.height;
                    const x = c.getContext("2d")!;
                    x.drawImage(img, 0, 0);
                    const d = x.getImageData(0, 0, c.width, c.height).data;
                    const lin = (v: number) => {
                        const s = v / 255;
                        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
                    };
                    const L = (r: number, g: number, b: number) =>
                        0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
                    const a = ink.alpha;
                    let worst = Infinity;
                    for (let i = 0; i < d.length; i += 4) {
                        const [r, g, b] = [d[i]!, d[i + 1]!, d[i + 2]!];
                        const l1 = L(a * ink.rgb[0] + (1 - a) * r, a * ink.rgb[1] + (1 - a) * g, a * ink.rgb[2] + (1 - a) * b);
                        const l2 = L(r, g, b);
                        worst = Math.min(worst, (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
                    }
                    return worst;
                },
                { b64: shot.toString("base64"), ink },
            );
            expect(min, `label ink ${ink.css} — worst-pixel contrast`).toBeGreaterThanOrEqual(4.5);
        });
    }
});
