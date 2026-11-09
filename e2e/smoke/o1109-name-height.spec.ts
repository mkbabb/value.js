// SERVED MODEL: claude-opus-5-5
import { test, expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

/**
 * Owner order 2026-11-09 17:18 — "named colors should NOT modify the height
 * of the whole page".
 *
 * The picker's name line (owner 2026-10-19) rendered only while the colour
 * had a name, so a named colour added a row under the readout and an
 * unnamed one took it away: the header, the plate, the scene and (where the
 * document scrolls) the page all moved with the colour.
 *
 *   VJS_E2E_PORT=… npx playwright test e2e/smoke/o1109-name-height.spec.ts --project=smoke
 *
 * Per cell (360 · 390 · 430 · 820 · 1440, light and dark), the colour walks
 * a sweep of unnamed, keyword-named and approved-named colours in one
 * session (the hash is the picker's colour seam). At rest after each step:
 *   (1) the document's scrollHeight, the picker header's height and every
 *       pane region's rect equal the first step's, ±0.5 px;
 *   (2) a name is never clipped: on its line it is whole (no overflow), and
 *       where the line cannot hold it, the colour's badge carries it whole.
 * Frames of each step land in O1109_NAME_OUT when it is set.
 */

const EPS = 0.5;

const CELLS = [
    { name: "360x800", width: 360, height: 800 },
    { name: "390x844", width: 390, height: 844 },
    { name: "430x932", width: 430, height: 932 },
    { name: "820x1180", width: 820, height: 1180 },
    { name: "1440x900", width: 1440, height: 900 },
] as const;

// The API's own cap on an approved name (api color schema: ≤ 50, kebab).
const LONG = "the-quiet-hour-before-the-garden-lamps-are-lit-now";
const SHORT = "efflorescence";

/** The sweep: [hash colour, the name it should carry or null]. Every colour
 *  is written in oklch, so the space (and with it the readout and the
 *  channel rows) holds and only the name varies; the keywords are their
 *  oklch coordinates. */
const SWEEP: readonly (readonly [string, string | null])[] = [
    ["oklch(0.55 0.18 260)", null],
    ["oklch(44.03% 0.1603 303.37)", "rebeccapurple"],
    ["oklch(73% 0.185 2)", SHORT],
    ["oklch(0.42 0.09 150)", null],
    ["oklch(97.5% 0.0518 107.32)", "lightgoldenrodyellow"],
    ["oklch(0.62 0.21 40)", LONG],
    ["oklch(0.55 0.18 260)", null],
];

async function seedNames(page: Page) {
    await page.route("**/colors/approved**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                data: [
                    [SHORT, "oklch(73% 0.185 2)"],
                    [LONG, "oklch(0.62 0.21 40)"],
                ].map(([name, css], i) => ({
                    id: `o1109-${i}`,
                    name,
                    css,
                    status: "approved",
                    createdAt: "2026-11-09T00:00:00.000Z",
                    approvedAt: "2026-11-09T00:00:00.000Z",
                })),
            }),
        }),
    );
}

interface Reading {
    doc: number;
    header: number;
    regions: string[];
    name: { text: string; visible: boolean; overflow: boolean } | null;
    badge: string | null;
}

function readOnce(page: Page): Promise<Reading> {
    return page.evaluate(() => {
        const r = (el: Element) => {
            const b = el.getBoundingClientRect();
            return [b.x, b.y + scrollY, b.width, b.height].map((v) => v.toFixed(1)).join(",");
        };
        const line = document.querySelector<HTMLElement>('[data-testid="picker-color-name"]');
        const text = line?.querySelector<HTMLElement>(".picker-color-name-text") ?? line;
        const lineCs = line ? getComputedStyle(line) : null;
        const badge = document.querySelector<HTMLElement>('[data-testid="picker-color-badge"]');
        return {
            doc: document.scrollingElement!.scrollHeight,
            header: document.querySelector(".picker-header")!.getBoundingClientRect().height,
            // The pane regions (a region nested in a pane, such as About's
            // formula figures, is that pane's content).
            regions: [...document.querySelectorAll('main [role="region"]')]
                .filter((el) => !el.parentElement?.closest('[role="region"]'))
                .map(
                (el) => `${el.getAttribute("aria-label")}:${r(el)}`,
            ),
            name: line
                ? {
                      text: (text?.textContent ?? "").trim(),
                      visible:
                          lineCs!.display !== "none" &&
                          (text ? getComputedStyle(text).visibility !== "hidden" : true),
                      overflow: line.scrollWidth > line.clientWidth + 0.5,
                  }
                : null,
            badge: badge?.getAttribute("aria-label") ?? null,
        };
    });
}

/** A settled reading: two reads 250 ms apart that agree. */
async function readSettled(page: Page): Promise<Reading> {
    let prev = await readOnce(page);
    for (let i = 0; i < 40; i++) {
        await page.waitForTimeout(250);
        const next = await readOnce(page);
        if (JSON.stringify(next) === JSON.stringify(prev)) return next;
        prev = next;
    }
    return prev;
}

/** A name as the page prints it: the approved kebab id reads as words. */
const printed = (name: string | null) => name?.replace(/-/g, " ").toLowerCase() ?? null;

/** Whether the name the step expects is the one the page carries. */
async function waitForName(page: Page, name: string | null) {
    await expect
        .poll(
            async () => {
                const r = await readOnce(page);
                const shown = r.name?.visible && r.name.text ? r.name.text.toLowerCase() : null;
                const badged = r.badge?.replace(/^Colour name: /, "").toLowerCase() ?? null;
                return shown ?? badged;
            },
            { timeout: 20_000 },
        )
        .toBe(printed(name));
}

for (const scheme of ["light", "dark"] as const) {
    test.describe(`o1109 · a colour's name never moves the page (${scheme})`, () => {
        for (const cell of CELLS) {
            test.describe(cell.name, () => {
                test.use({ viewport: { width: cell.width, height: cell.height }, colorScheme: scheme });

                test("the sweep holds every height and every pane rect; no name is clipped", async ({ page }) => {
                    test.setTimeout(120_000);
                    await seedNames(page);
                    const first = SWEEP[0]!;
                    await page.goto(`/#/?space=oklch&color=${encodeURIComponent(first[0])}`);
                    await expect(page.locator(".picker-header")).toBeVisible({ timeout: 60_000 });
                    const out = process.env.O1109_NAME_OUT;
                    if (out) mkdirSync(out, { recursive: true });

                    let base: Reading | null = null;
                    for (const [i, [css, name]] of SWEEP.entries()) {
                        if (i > 0) {
                            await page.evaluate((c) => {
                                location.hash = `#/?space=oklch&color=${encodeURIComponent(c)}`;
                            }, css);
                        }
                        await waitForName(page, name);
                        const r = await readSettled(page);
                        console.log(
                            `[o1109-name] ${scheme} ${cell.name} step${i} ${css} name=${name} doc=${r.doc} header=${r.header.toFixed(1)} ` +
                                `line=${JSON.stringify(r.name)} badge=${r.badge} ${r.regions.join(" ")}`,
                        );
                        if (out) {
                            await page.screenshot({ path: `${out}/${scheme}-${cell.name}-step${i}.png` });
                        }
                        // (2) never clipped: whole on its line, or whole behind the badge.
                        if (name) {
                            if (r.name?.visible && r.name.text) {
                                expect(r.name.overflow, `the name '${name}' overflows its line`).toBe(false);
                            } else {
                                expect(printed(r.badge), "the badge carries the name").toBe(printed(`Colour name: ${name}`));
                            }
                        }
                        if (!base) {
                            base = r;
                            continue;
                        }
                        // (1) nothing moves with the name.
                        expect(Math.abs(r.doc - base.doc), `document height ${base.doc} → ${r.doc} at ${css}`).toBeLessThanOrEqual(EPS);
                        expect(
                            Math.abs(r.header - base.header),
                            `picker header ${base.header.toFixed(1)} → ${r.header.toFixed(1)} at ${css}`,
                        ).toBeLessThanOrEqual(EPS);
                        // Each pane's rect, number by number, ±0.5 px (the
                        // scene's own sub-pixel settle reads 0.2 px apart).
                        expect(r.regions.map((x) => x.split(":")[0]), "the pane set").toEqual(
                            base.regions.map((x) => x.split(":")[0]),
                        );
                        for (const [j, region] of r.regions.entries()) {
                            const now = region.split(":")[1]!.split(",").map(Number);
                            const was = base.regions[j]!.split(":")[1]!.split(",").map(Number);
                            const drift = Math.max(...now.map((v, k) => Math.abs(v - was[k]!)));
                            expect(drift, `pane rect ${base.regions[j]} → ${region} at ${css}`).toBeLessThanOrEqual(EPS);
                        }
                    }
                });
            });
        }
    });
}
