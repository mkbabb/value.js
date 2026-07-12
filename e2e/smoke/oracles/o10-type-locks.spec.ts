import { test, expect, type Page } from "@playwright/test";

/**
 * T.W4 · O-10 — THE TYPE LOCKS (SYNTHESIS §6.1 O-10; the D2 ×φ recalibration's
 * own oracle family). Minted at W4-1/W4-2 in the forced order:
 *
 *   (a) HOST-INDEPENDENCE — the space trigger's computed family/style/WEIGHT
 *       are identical across its two hosts (picker plate · About sentence);
 *       host-divergence on any un-sanctioned axis is the red condition (the
 *       About-700 inheritance bug, t-title-typography F2, dead by
 *       construction). SIZE is the ONE sanctioned host prop (F3): each host's
 *       size must ≡ its exact D2 landing — picker = display-2 (T-51/WR-4
 *       owner MANDATE §0.7 stepped the `.space-trigger` DOWN one golden rung
 *       from display-3, landed 5f273ae), About = the sentence's own display-1
 *       (`1em` inherit) — which is row (e)'s token census applied to the pair.
 *   (e) TOKEN CENSUS — every landed title size ≡ an exact shipped token
 *       (D2's "exact shipped token" law, mechanically checked against the
 *       live resolved ladder — h-oracle-slate F-2).
 *   HEIGHT GATE @900px — the ×φ titles must not push the picker console into
 *       scroll against `--content-max-h` (t-contradictions C1's acceptance
 *       row). A failure here is RATIFICATION material — never shrink the ×φ
 *       title to pass (T.W4 §Triumvirate, h-wave-w4-w5 S4).
 *   MOBILE MATRIX @390 — phones floor-pin display-1 AT heading (the
 *       deliberate no-op) and the About sentence is an HONEST 2-line lock
 *       <sm (t-mobile F-4.2) — never "one line everywhere".
 *
 *   (b) per-space line locks + (c) tnum digit-advance land with W4-2 below.
 */

/** Resolve a type token to its computed px on the live page (probe span —
 *  viewport-fluid clamps resolve at read time, so the census compares
 *  computed-to-computed, never a hand constant). */
async function resolveTokenPx(page: Page, token: string): Promise<number> {
    return page.evaluate((t) => {
        const probe = document.createElement("span");
        probe.style.fontSize = `var(${t})`;
        document.body.appendChild(probe);
        const px = Number.parseFloat(getComputedStyle(probe).fontSize);
        probe.remove();
        return px;
    }, token);
}

interface TypeVoice {
    family: string;
    style: string;
    weight: string;
    sizePx: number;
}

async function readVoice(page: Page, selector: string): Promise<TypeVoice> {
    return page.evaluate((sel) => {
        const el = document.querySelector<HTMLElement>(sel);
        if (!el) throw new Error(`voice probe: ${sel} not mounted`);
        const cs = getComputedStyle(el);
        return {
            family: cs.fontFamily,
            style: cs.fontStyle,
            weight: cs.fontWeight,
            sizePx: Number.parseFloat(cs.fontSize),
        };
    }, selector);
}

const PICKER_TRIGGER = ".pane-shell .space-trigger";
const ABOUT_TRIGGER = ".about-card .space-trigger";
const ABOUT_TITLE = ".about-card .pane-header-title";

test.describe("O-10a/e — title type locks (desktop dual grid)", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("host-independence: family/style/weight identical; size ≡ each host's exact D2 token", async ({
        page,
    }) => {
        await page.goto("/");
        await expect(
            page.getByRole("main", { name: "Color tool panes" }),
        ).toBeVisible();
        await expect(page.locator(PICKER_TRIGGER)).toBeVisible();
        await expect(page.locator(ABOUT_TRIGGER)).toBeVisible();

        const picker = await readVoice(page, PICKER_TRIGGER);
        const about = await readVoice(page, ABOUT_TRIGGER);

        // The un-sanctioned axes: byte-identical across hosts.
        expect(about.family, "family host-divergence").toBe(picker.family);
        expect(about.style, "style host-divergence").toBe(picker.style);
        expect(about.weight, "weight host-divergence (the F2 About-700 bug)").toBe(
            picker.weight,
        );
        // The non-bold edict (D2): weight 400 — the :root pin, both hosts.
        expect(picker.weight).toBe("400");
        expect(picker.family).toContain("Fraunces");
        expect(picker.style).toBe("italic");

        // (e) The token census — size ≡ the exact shipped token per host.
        // T-51/WR-4 (owner MANDATE §0.7): the picker `.space-trigger` steps DOWN
        // one golden rung, display-3 → --type-display-2 (landed 5f273ae). The lock
        // re-aims to the ruled token — the O-14-slim tighten-not-weaken idiom.
        const display2 = await resolveTokenPx(page, "--type-display-2");
        const display1 = await resolveTokenPx(page, "--type-display-1");
        expect(
            Math.abs(picker.sizePx - display2),
            `picker trigger ${picker.sizePx}px ≠ display-2 ${display2}px`,
        ).toBeLessThanOrEqual(0.5);
        // About = the sanctioned 1em inherit — the sentence's display-1 rung.
        const aboutTitle = await readVoice(page, ABOUT_TITLE);
        expect(
            Math.abs(about.sizePx - aboutTitle.sizePx),
            "About member does not ride its sentence (1em inherit broken)",
        ).toBeLessThanOrEqual(0.5);
        expect(
            Math.abs(aboutTitle.sizePx - display1),
            `pane title ${aboutTitle.sizePx}px ≠ display-1 ${display1}px`,
        ).toBeLessThanOrEqual(0.5);
        // Pane title weight: the same :root pin (non-bold).
        expect(aboutTitle.weight).toBe("400");
    });

    test("height gate @900px: the ×φ header never pushes the picker console into scroll (C1)", async ({
        page,
    }) => {
        await page.goto("/");
        await expect(
            page.getByRole("main", { name: "Color tool panes" }),
        ).toBeVisible();
        const card = page.locator(".pane-shell > *").first();
        await expect(card).toBeVisible();
        // Let the plate-open choreography land before measuring.
        await page.waitForTimeout(1200);
        const box = await page.evaluate(() => {
            const el = document.querySelector(".pane-shell > *")!;
            return {
                scrollHeight: el.scrollHeight,
                clientHeight: el.clientHeight,
            };
        });
        expect(
            box.scrollHeight,
            `picker card scrolls at 1440×900 (${box.scrollHeight} > ${box.clientHeight}) — RATIFICATION material; never shrink the ×φ title`,
        ).toBeLessThanOrEqual(box.clientHeight + 1);
    });
});

test.describe("O-10a — the mobile matrix (390)", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("phones: pane title floor-pins AT heading (deliberate no-op); About = honest 2-line lock", async ({
        page,
    }) => {
        await page.goto("/");
        const main = page.getByRole("main", { name: "Color tool panes" });
        await expect(main).toBeVisible();

        // The picker trigger keeps the plate rung (display-2 after the T-51/WR-4
        // step-down, fluid band).
        const display2 = await resolveTokenPx(page, "--type-display-2");
        const picker = await readVoice(page, PICKER_TRIGGER);
        expect(Math.abs(picker.sizePx - display2)).toBeLessThanOrEqual(0.5);
        expect(picker.weight).toBe("400");

        // Switch the mobile slot to the About pane (the segmented control).
        const nav = page.getByRole("navigation", {
            name: "Application navigation",
        });
        await nav.getByRole("button", { name: "About", exact: true }).click();
        await expect(page.locator(ABOUT_TITLE)).toBeVisible();

        // display-1 floor-pins at heading (1.618rem) — the deliberate no-op.
        const display1 = await resolveTokenPx(page, "--type-display-1");
        const heading = await resolveTokenPx(page, "--type-heading");
        expect(Math.abs(display1 - heading)).toBeLessThanOrEqual(0.5);
        const title = await readVoice(page, ABOUT_TITLE);
        expect(Math.abs(title.sizePx - display1)).toBeLessThanOrEqual(0.5);

        // The HONEST 2-line lock (<sm): the sentence + inline member ink two
        // lines — a stable lock, not a value-dependent wrap. Count RENDERED
        // line boxes by clustering fragment tops (a height/line-height
        // division mis-rounds: the inline-flex trigger stretches its line
        // box past the computed line-height).
        const lines = await page.evaluate((sel) => {
            const el = document.querySelector<HTMLElement>(sel)!;
            const range = document.createRange();
            range.selectNodeContents(el);
            const tops: number[] = [];
            for (const r of range.getClientRects()) {
                if (r.width < 1) continue;
                if (!tops.some((t) => Math.abs(t - r.y) < 8)) tops.push(r.y);
            }
            return tops.length;
        }, ABOUT_TITLE);
        expect(lines, "About title <sm is an honest 2-line lock").toBe(2);
    });
});

/* ── O-10c — tnum equal digit-advance on the SHIPPED face (W4-2) ──────────
 * The self-host regression class: the declaration alone proved a silent
 * no-op on the Google-served face (t-title-typography F5) — and NO Fraunces
 * artifact ships tabular figures, so the shipped latin-normal face carries
 * the MINTED tnum (scripts/fonts/build-fraunces-tnum.py). This row judges
 * the RENDER: equal digit advance under the readout's own declaration, and
 * honest proportional digits without it (prose stays design-true). */
test.describe("O-10c — rendered digit advance (the shipped face)", () => {
    test("tabular-nums yields equal digit advance at the readout's weights; prose stays proportional", async ({
        page,
    }) => {
        await page.goto("/");
        await expect(
            page.getByRole("main", { name: "Color tool panes" }),
        ).toBeVisible();
        const r = await page.evaluate(async () => {
            await document.fonts.load("600 55px Fraunces");
            await document.fonts.load("300 55px Fraunces");
            const measure = (text: string, weight: number, tnum: boolean) => {
                const s = document.createElement("span");
                s.style.cssText = `font-family: Fraunces; font-size: 55px; font-weight: ${weight}; position: absolute; visibility: hidden; white-space: pre; ${tnum ? "font-variant-numeric: tabular-nums lining-nums;" : ""}`;
                s.textContent = text;
                document.body.appendChild(s);
                const w = s.getBoundingClientRect().width;
                s.remove();
                return w;
            };
            const out: Record<string, number[]> = {};
            for (const weight of [300, 600]) {
                out[`t${weight}`] = ["1111", "0000", "9999"].map((t) =>
                    measure(t, weight, true),
                );
                out[`p${weight}`] = ["1111", "0000"].map((t) =>
                    measure(t, weight, false),
                );
            }
            return out;
        });
        for (const weight of [300, 600]) {
            const [a, b, c] = r[`t${weight}`]!;
            expect(
                Math.abs(a! - b!),
                `w${weight}: '1111' vs '0000' advance differs (tnum dead on the shipped face)`,
            ).toBeLessThanOrEqual(0.5);
            expect(Math.abs(b! - c!), `w${weight}: '0000' vs '9999'`).toBeLessThanOrEqual(0.5);
            const [p1, p0] = r[`p${weight}`]!;
            expect(
                Math.abs(p1! - p0!),
                `w${weight}: prose digits went tabular — the default figures must stay design-true`,
            ).toBeGreaterThan(2);
        }
    });
});

/* ── O-10b — per-space line-count locks (W4-2's re-authored gate text) ────
 * "Every space inks its own LOCKED line count" — all catalog spaces + hex,
 * at the 32rem band AND 390 (Q11b: levers 1+2, lever 3 for lab-class).
 * Asserted per space: (i) the bound lock ≡ the reservation table's derived
 * count via the min-height mechanism; (ii) the render never EXCEEDS the
 * lock (a rendered line past the lock moves the card rect — the exact
 * defect the lock exists to kill); (iii) no horizontal cell overflow. */
for (const vp of [
    { name: "32rem band", width: 1440, height: 900 },
    { name: "390 phone", width: 390, height: 844 },
] as const) {
    test.describe(`O-10b — line locks (${vp.name})`, () => {
        test.use({ viewport: { width: vp.width, height: vp.height } });

        test(`every space inks its own locked line count at ${vp.width}px`, async ({
            page,
        }) => {
            test.setTimeout(180_000);
            // Boot at the owner reference color (the O-18 census referent),
            // then drive the app's OWN selector through the whole catalog —
            // the census population is the shipped dropdown, never a hand
            // list (the options carry no machine id, so the UI drive IS the
            // honest enumeration).
            await page.goto(
                `/#/?space=lab&color=${encodeURIComponent("lab(38% 32 24)")}`,
            );
            await expect(
                page.getByRole("main", { name: "Color tool panes" }),
            ).toBeVisible();
            const trigger = page.locator(".pane-shell .space-trigger").first();
            await trigger.click();
            const optionCount = await page.locator('[role="option"]').count();
            await page.keyboard.press("Escape");
            expect(optionCount, "catalog enumerated").toBeGreaterThanOrEqual(15);

            const failures: string[] = [];
            for (let i = 0; i < optionCount; i++) {
                await trigger.click();
                const option = page.locator('[role="option"]').nth(i);
                const spaceName =
                    (await option.locator("span").first().textContent())?.trim() ??
                    `option-${i}`;
                await option.click();
                const readout = page.locator(".readout").first();
                await expect(readout).toBeVisible();
                const space = spaceName;
                // Fonts settle once per page; poll the readout's lock var.
                const row = await readout.evaluate((el) => {
                    const cs = getComputedStyle(el);
                    const lock = Number.parseFloat(
                        cs.getPropertyValue("--readout-lines") || "1",
                    );
                    // Rendered line count: cluster the cells' top edges.
                    const tops: number[] = [];
                    for (const cell of el.children) {
                        const r = cell.getBoundingClientRect();
                        if (r.width < 1) continue;
                        if (!tops.some((t) => Math.abs(t - r.top) < 4)) {
                            tops.push(r.top);
                        }
                    }
                    const elBox = el.getBoundingClientRect();
                    const host = el.parentElement!.getBoundingClientRect();
                    return {
                        lock,
                        rendered: tops.length,
                        minHeightPx: Number.parseFloat(cs.minHeight),
                        lineHeightPx: Number.parseFloat(cs.lineHeight),
                        overflowX: elBox.right - host.right > 1,
                    };
                });
                if (row.rendered > row.lock) {
                    failures.push(
                        `${space}: rendered ${row.rendered} > lock ${row.lock}`,
                    );
                }
                if (
                    Math.abs(
                        row.minHeightPx - row.lock * row.lineHeightPx,
                    ) > 1
                ) {
                    failures.push(
                        `${space}: min-height ${row.minHeightPx} ≠ lock ${row.lock} × ${row.lineHeightPx}`,
                    );
                }
                if (row.overflowX) {
                    failures.push(`${space}: horizontal cell overflow`);
                }
            }
            expect(
                failures,
                `line-lock census failures:\n${failures.join("\n")}`,
            ).toEqual([]);
        });
    });
}
