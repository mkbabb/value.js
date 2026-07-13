import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView } from "../fixtures/dock";

/**
 * T.W6 W6-3 · O-17 — THE EASING COMPOSITION ORACLE (SYNTHESIS §6.1 O-17;
 * T-47 SPEC ESCALATION consumed — the kf-assayed specimen bench).
 *
 * Four clauses, judged on the LIVE open specimen row of the gradient
 * pane's easing bench (`GradientEasingEditor` + `easing/*`):
 *
 * 1. ZERO LETTERBOX — the authoring canvas's drawn-plot box ≡ its element
 *    content box (±1px both axes) across container widths AND across
 *    curve regimes (non-overshoot / overshoot / steps), and the element
 *    aspect ≡ 1/vb-ratio (the h-refine-doctrine F-8 amendment: the LIVE
 *    viewBox is the referent — a designed overshoot geometry must not
 *    red). Measured through getScreenCTM (the viewBox→screen truth),
 *    never a token proxy.
 * 2. ≤1 CARTOON STAMP in-row — the open row's descendants carry at most
 *    one full cartoon rung (the design seats wells FLAT: the expected
 *    count is 0; the gate's letter is ≤1).
 * 3. DOT REST — no travel dot at rest, never a doubled endpoint (the
 *    producer's parked-dot arm is off this surface: zero `r="0.03"`
 *    travel circles, zero play pill).
 * 4. ONE-LITERAL LAW — the open row renders the curve literal in exactly
 *    ONE leaf (the readout rail); closed rows carry NO literal (specimen
 *    labels speak the curve's NAME).
 *
 * Plus the mint-law tripwire: a tile press writes the picker-law
 * byte-identical literal (the easingCatalogue byte-identity clause).
 */

async function openEasingBench(page: Page): Promise<Locator> {
    await page.goto("/");
    await openView(page, "Gradient");
    const main = page.getByRole("main", { name: "Color tool panes" });
    const head = main.locator("button[aria-controls^='easing-interval-']").first();
    await expect(head).toBeVisible();
    // The bench mounts with row 0 open; normalize in case a prior step closed it.
    if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
    const row = main.locator("#easing-interval-0");
    await expect(row).toBeVisible();
    return row;
}

/** Disclose the authoring stage (idempotent). */
async function discloseAuthoring(row: Locator): Promise<Locator> {
    const tune = row.getByRole("button", { name: "Author a custom curve" });
    if ((await tune.getAttribute("aria-expanded")) !== "true") await tune.click();
    const svg = row.locator("#easing-authoring-0 svg[role='img']");
    await expect(svg).toBeVisible();
    return svg;
}

/** The viewBox→screen geometry: corner deltas vs the element box + aspect. */
async function letterboxGeometry(svg: Locator) {
    return svg.evaluate((el) => {
        const s = el as unknown as SVGSVGElement;
        const r = s.getBoundingClientRect();
        const vb = s.viewBox.baseVal;
        const ctm = s.getScreenCTM();
        if (!ctm) throw new Error("no screen CTM");
        const pt = (x: number, y: number) => {
            const p = new DOMPoint(x, y).matrixTransform(ctm);
            return { x: p.x, y: p.y };
        };
        const tl = pt(vb.x, vb.y);
        const br = pt(vb.x + vb.width, vb.y + vb.height);
        return {
            dLeft: Math.abs(tl.x - r.left),
            dTop: Math.abs(tl.y - r.top),
            dRight: Math.abs(br.x - r.right),
            dBottom: Math.abs(br.y - r.bottom),
            aspect: r.width / r.height,
            vbAspect: vb.width / vb.height,
            width: r.width,
        };
    });
}

async function expectZeroLetterbox(svg: Locator) {
    // The vb-ratio custom property syncs on a rAF after emission — poll to rest.
    await expect
        .poll(
            async () => {
                const g = await letterboxGeometry(svg);
                return Math.max(g.dLeft, g.dTop, g.dRight, g.dBottom);
            },
            { timeout: 5000 },
        )
        .toBeLessThanOrEqual(1);
    const g = await letterboxGeometry(svg);
    // element aspect ≡ 1/vb-ratio, at ±1px-equivalent tolerance.
    expect(Math.abs(g.aspect - g.vbAspect)).toBeLessThanOrEqual(2 / g.width);
}

for (const viewport of [
    { name: "desktop", width: 1280, height: 720 },
    { name: "390", width: 390, height: 844 },
] as const) {
    test(`O-17 zero letterbox across curve regimes — ${viewport.name}`, async ({
        page,
    }) => {
        const consoleErrors = setupEnvNoise(page);
        await page.setViewportSize({
            width: viewport.width,
            height: viewport.height,
        });
        const row = await openEasingBench(page);
        const svg = await discloseAuthoring(row);

        // Regime 1 — the seeded `linear` (non-overshoot; padded unit box).
        await expectZeroLetterbox(svg);

        // Regime 2 — overshoot: the back family expands the live viewBox.
        await row.locator("[data-specimen='ease-out-back']").click();
        await expectZeroLetterbox(svg);

        // Regime 3 — steps: a different frame with a negative-x viewBox.
        await row.locator("[data-specimen='step-end']").click();
        await expectZeroLetterbox(svg);

        expect(consoleErrors).toEqual([]);
    });
}

test("O-17 composition: stamps, dot rest, one-literal, mint law", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const row = await openEasingBench(page);

    // The open row carries the interval's live ramp strip (W5-9 — the
    // row's "ball", kept verbatim through the T-47 re-author; this clause
    // SUPERSEDES the W5-9-era views/gradient.spec.ts easing-row test,
    // whose SegmentedTabs-pill + head-literal referents the specimen
    // bench retired).
    await expect(
        row.getByRole("img", { name: /Eased ramp for interval/ }),
    ).toBeVisible();

    const svg = await discloseAuthoring(row);

    // ── 2. ≤1 cartoon stamp in-row (design target: 0 — wells seated flat).
    const stampCount = await row.evaluate((el) => {
        let count = 0;
        for (const node of el.querySelectorAll<HTMLElement>("*")) {
            const shadow = getComputedStyle(node).boxShadow;
            // The full cartoon rung's signature offset pair (8px 8px 0).
            if (/8px 8px 0(px)?/.test(shadow)) count++;
        }
        return count;
    });
    expect(stampCount).toBeLessThanOrEqual(1);
    // The canvas well itself is FLAT (census CC-4's inversion cured).
    const cardShadow = await row
        .locator("#easing-authoring-0 .glass-card")
        .first()
        .evaluate((el) => getComputedStyle(el).boxShadow);
    expect(cardShadow).toBe("none");

    // ── 3. Dot rest: no travel dot (r=0.03), no play pill; bezier canvas
    //      carries exactly its 2 endpoints + 2 handles.
    await expect(svg.locator("circle[r='0.03']")).toHaveCount(0);
    await expect(svg.locator("circle")).toHaveCount(4);
    await expect(
        row.getByRole("button", { name: /trace the curve|climb the staircase/i }),
    ).toHaveCount(0);

    // ── 4. One-literal law: exactly ONE leaf in the open row speaks the
    //      literal (the readout rail's <code>).
    const literalLeaves = await row.evaluate((el) => {
        let count = 0;
        for (const node of el.querySelectorAll<HTMLElement>("*")) {
            if (
                node.childElementCount === 0 &&
                /(cubic-bezier|steps)\s*\(/.test(node.textContent ?? "")
            ) {
                count++;
            }
        }
        return count;
    });
    expect(literalLeaves).toBe(1);

    // ── The mint-law tripwire: a tile press writes the picker-law
    //     byte-identical literal (+n.toFixed(3), ", "-joined).
    await row.locator("[data-specimen='ease-out-back']").click();
    await expect(row.locator("code").first()).toHaveText(
        "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    );
    // The head speaks the NAME, never the literal (closed-row anatomy).
    const head = page
        .locator("button[aria-controls='easing-interval-0']")
        .first();
    await expect(head).toContainText("ease-out-back");
    await head.click(); // close the row
    const benchLiteral = await page.evaluate(() => {
        for (const node of document.querySelectorAll<HTMLElement>(
            "button[aria-controls^='easing-interval-']",
        )) {
            if (/(cubic-bezier|steps)\s*\(/.test(node.textContent ?? "")) {
                return node.textContent;
            }
        }
        return null;
    });
    expect(benchLiteral).toBeNull();

    expect(consoleErrors).toEqual([]);
});
