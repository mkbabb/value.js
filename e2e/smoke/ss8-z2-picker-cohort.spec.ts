// SERVED MODEL: claude-opus-5-5
/**
 * SS-8 Z2-picker-cohort — the falsifiers for the batch's REFUTED rows
 * (docs/tranches/X/execution/SS8/packets/Z2-picker-cohort.md §cures).
 *
 * Every row here was REFUTED live: the record's born-RED reading is stale and
 * the product holds the cured state. These specs pin that state so a
 * regression turns them RED. Z-ColorInput-1's code cure has its own vitest
 * falsifier (demo/test/color-session/ss8-z2-parse-boundary.test.ts).
 *
 *   P1  Z-ColorPicker-1 — at 390 every picker action is reachable: the seats
 *       the narrow run cannot hold sit in its "More actions" menu (COHESION
 *       §0fh.4, the ruled priority-prefix + menu idiom).
 *   P6  Z-ColorPicker-6 — a model write after a readout keystroke repaints the
 *       readout (it agrees with the URL again).
 *   P10 Z-ColorPicker-10 — an unknown pane shows "Not found", not the picker.
 *   P11/P14/P16/P20/P21/P22 — the header's polite region, the label→readout
 *       seam, the paired ratio, the one-line 3-tuple, the plate clock, the
 *       dark ambient ground.
 *   CI5/CI10/CI13 — the named send button, the global crown keyframes, the
 *       mobile free-text entry.
 *   CSS1..7 — the colour-space catalog and its About card.
 *   CSP3/4/5/10/12/14/15/16 — the Blob configurator.
 */
import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const MOBILE = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } as const;
const PICKER_TRIGGER = '.pane-shell [role="combobox"][aria-label="Select color space"]';

async function boot(page: Page, route: string) {
    await page.goto(`/#${route}`, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
}

async function bootPicker(page: Page) {
    await boot(page, "/");
    await expect(page.locator(".pane-shell .readout .readout-fig").first()).toBeVisible({ timeout: 30_000 });
    // Measure the SETTLED plate: fonts in, then the probe's own 4 s settle.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(4_000);
}

/** The picker header census: polite region, seam, ratio, cell tops. */
function headerCensus(page: Page) {
    return page.evaluate((sel) => {
        const ps = document.querySelector(".pane-shell")!;
        const header = ps.querySelector(".picker-header");
        const trig = ps.querySelector(sel)!;
        const figs = [...ps.querySelectorAll(".readout .readout-fig")];
        const fig0 = figs[0]!;
        const range = document.createRange();
        range.selectNodeContents(fig0);
        const glyphTop = range.getClientRects()[0]?.top ?? NaN;
        return {
            live: header?.getAttribute("aria-live") ?? null,
            seam: glyphTop - trig.getBoundingClientRect().bottom,
            ratio: parseFloat(getComputedStyle(fig0).fontSize) / parseFloat(getComputedStyle(trig).fontSize),
            cellTops: [...ps.querySelectorAll(".readout-cell")].map((c) => Math.round(c.getBoundingClientRect().top)),
        };
    }, PICKER_TRIGGER);
}

test.describe("Z2 picker cohort — desktop 1440", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("P11/P14/P16/P21 · CI10 — header region, seam, ratio, clock, crown keyframes", async ({ page }) => {
        test.setTimeout(90_000);
        // The plate clock is read from first paint: the settle animation has
        // finished (and left the computed style) by the time the readout shows.
        await page.addInitScript(() => {
            const seen: Record<string, number> = {};
            (window as unknown as { __plateClock: Record<string, number> }).__plateClock = seen;
            const tick = () => {
                const shell = document.querySelector(".pane-shell");
                for (const a of shell?.getAnimations() ?? []) {
                    const name = (a as CSSAnimation).animationName;
                    const dur = a.effect?.getTiming().duration;
                    if (name && typeof dur === "number" && !(name in seen)) seen[name] = dur;
                }
                if (!("overture-plate-settle" in seen)) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
        await bootPicker(page);
        const c = await headerCensus(page);
        console.log("Z2 header census 1440", JSON.stringify(c));
        console.log("Z2 seam diag", JSON.stringify(await page.evaluate(() => {
            const r = (s: string) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { s, top: Math.round(b.top), bottom: Math.round(b.bottom), h: Math.round(b.height), minH: cs.minHeight, pad: cs.padding, mt: cs.marginTop }; };
            return [{ cols: getComputedStyle(document.querySelector(".pane-container")!).gridTemplateColumns, regions: [...document.querySelectorAll(".pane-wrapper")].map((w) => `${w.getAttribute("data-pane")}:${Math.round(w.getBoundingClientRect().width)}`), fp: getComputedStyle(document.querySelector(".pane-shell .title-row")!).paddingRight }, r(".pane-shell .picker-header"), r(".pane-shell .title-row"), r('.pane-shell .title-row [role="combobox"]'), r(".pane-shell .readout"), r(".pane-shell .readout .readout-fig"), r(".pane-shell .picker-color-name")];
        })));
        expect(c.live, "Z-ColorPicker-11: the picker header is a polite region").toBe("polite");
        expect.soft(c.seam, "Z-ColorPicker-14: the label→readout seam is under the φG ceiling").toBeLessThan(14.87);
        expect(c.ratio, "Z-ColorPicker-16: the paired readout/label ratio").toBeCloseTo(0.7862, 3);
        const clock = await page.evaluate(() => {
            const probe = document.createElement("div");
            probe.style.transitionDuration = "var(--overture-plate-land)";
            document.body.append(probe);
            const token = parseFloat(getComputedStyle(probe).transitionDuration) * 1000;
            probe.remove();
            const seen = (window as unknown as { __plateClock: Record<string, number> }).__plateClock;
            return { dur: seen["overture-plate-settle"] ?? null, token };
        });
        expect(clock.dur, "Z-ColorPicker-21: the plate-land clock is the token").toBeCloseTo(clock.token, 0);
        const crown = await page.evaluate(() => {
            const names: string[] = [];
            const walk = (rules: CSSRuleList) => {
                for (const r of Array.from(rules)) {
                    if (r instanceof CSSKeyframesRule) names.push(r.name);
                    if ("cssRules" in r && (r as CSSGroupingRule).cssRules) walk((r as CSSGroupingRule).cssRules);
                }
            };
            for (const s of Array.from(document.styleSheets)) {
                try { walk(s.cssRules); } catch { /* cross-origin sheet */ }
            }
            return names;
        });
        expect(crown, "Z-ColorInput-10: a global @keyframes crown-appear").toContain("crown-appear");
    });

    test("P6 — a model write after a readout keystroke repaints the readout", async ({ page }) => {
        test.setTimeout(90_000);
        await bootPicker(page);
        await page.locator(".pane-shell .readout .readout-fig").first().click();
        await page.keyboard.press("End");
        await page.keyboard.type("5");
        await page.waitForTimeout(1_200);
        await page.locator(".pane-shell [role=slider]").first().focus();
        for (let i = 0; i < 8; i++) await page.keyboard.press("ArrowLeft");
        await expect
            .poll(async () => page.evaluate(() => {
                const fig = document.querySelector(".pane-shell .readout .readout-fig")?.textContent ?? "";
                const l = decodeURIComponent(location.href).match(/oklch\(([\d.]+)%/)?.[1];
                return l !== undefined && Math.abs(parseFloat(fig) - parseFloat(l)) < 0.051;
            }), { message: "Z-ColorPicker-6: the readout agrees with the URL after the write", timeout: 6_000 })
            .toBe(true);
    });

    test("P10 — an unknown pane is Not found, never the picker", async ({ page }) => {
        test.setTimeout(60_000);
        await boot(page, "/does-not-exist");
        await expect(page.getByText(/Not found/i).first()).toBeVisible({ timeout: 20_000 });
        await expect(page.locator(".pane-shell .readout")).toHaveCount(0);
    });

    test("CSS1..7 — the colour-space catalog and the About card", async ({ page }) => {
        test.setTimeout(120_000);
        await bootPicker(page);
        const trig = page.locator(PICKER_TRIGGER).first();
        await trig.click();
        await expect(page.locator('[role="option"][data-space]').first()).toBeVisible();
        const rows = await page.evaluate(() => [...document.querySelectorAll('[role="option"][data-space]')].map((r) => {
            const cap = r.querySelector(".specimen-caption")!;
            const dot = r.querySelector(".specimen-dot");
            const seed = (dot?.querySelector("feTurbulence") ?? null)?.getAttribute("seed") ?? null;
            const decimals = (cap.textContent?.match(/\d+\.(\d+)/g) ?? []).map((m) => (m.split(".")[1] ?? "").length);
            return {
                space: r.getAttribute("data-space"),
                maxDecimals: Math.max(0, ...decimals),
                oog: cap.getAttribute("data-out-of-gamut") === "true" && /gamut/i.test(cap.getAttribute("title") ?? ""),
                form: cap.getAttribute("data-specimen-form"),
                overflows: cap.scrollWidth > cap.clientWidth + 0.5,
                seed,
                tag: dot?.getAttribute("tag") ?? null,
            };
        }));
        expect(rows.length, "18 options").toBe(18);
        expect(rows.filter((r) => r.maxDecimals > 4), "Z-ColorSpaceSelector-2: ≤ 4 decimals").toEqual([]);
        expect(rows.filter((r) => r.oog).length, "Z-ColorSpaceSelector-3: out-of-gamut rows are marked").toBeGreaterThan(0);
        expect(rows.filter((r) => r.form !== "channels" && r.form !== "css"), "Z-ColorSpaceSelector-4: a declared form").toEqual([]);
        expect(rows.filter((r) => r.overflows), "Z-ColorSpaceSelector-5: no caption overflows").toEqual([]);
        expect(new Set(rows.map((r) => r.seed)).size, "Z-ColorSpaceSelector-6: distinct dot seeds").toBe(rows.length);
        expect(rows.filter((r) => r.tag !== null), "Z-ColorSpaceSelector-7: no dead tag=").toEqual([]);
        await page.keyboard.press("Escape");
        for (const space of ["display-p3", "rec2020"]) {
            await trig.click();
            const opt = page.locator(`[role="option"][data-space="${space}"]`);
            await opt.scrollIntoViewIfNeeded();
            await opt.click();
            await expect
                .poll(() => page.evaluate(() => {
                    const about = [...document.querySelectorAll('[data-slot="card"]')]
                        .find((c) => !c.querySelector(".readout") && /Definition/.test((c as HTMLElement).innerText));
                    const t = (about as HTMLElement | undefined)?.innerText ?? "";
                    return { found: t.length > 0, cieRgb: /CIE\s*RGB|CIE 1931 RGB|CIE-RGB/i.test(t) };
                }), { message: `Z-ColorSpaceSelector-1: ${space} has its own About card`, timeout: 8_000 })
                .toEqual({ found: true, cieRgb: false });
        }
    });

    test("CSP3/4/10/12/14 · CSP5 — the Blob configurator census and Copy", async ({ page, context }) => {
        test.setTimeout(90_000);
        await context.grantPermissions(["clipboard-read", "clipboard-write"]);
        await boot(page, "/blob");
        await expect(page.locator(".config-console [role=slider]").first()).toBeAttached({ timeout: 30_000 });
        await page.waitForTimeout(800);
        const c = await page.evaluate(() => {
            const q = (s: string) => [...document.querySelectorAll(s)];
            const sliders = q(".config-console [role=slider]");
            const glass = sliders.map((s) => s.closest(".glass-slider"));
            const range = q(".config-console .slider-range")[0];
            const track = q(".config-console .slider-track")[0];
            const ink = document.createElement("div");
            ink.style.backgroundColor = "var(--ink-muted)";
            document.body.append(ink);
            const inkBg = getComputedStyle(ink).backgroundColor;
            ink.remove();
            const head = q(".config-section-title")[0];
            const row = q(".config-console .configurator-row")[0];
            const label = row && [...row.querySelectorAll("*")].find((e) => e.children.length === 0 && e.textContent!.trim() && !/^-?\d/.test(e.textContent!.trim()));
            return {
                sliders: sliders.length,
                variants: [...new Set(glass.map((g) => g?.getAttribute("data-variant")))],
                sizes: [...new Set(glass.map((g) => g?.getAttribute("data-size") ?? g?.closest("[data-size]")?.getAttribute("data-size") ?? null))],
                rangeBg: range ? getComputedStyle(range).backgroundColor : null,
                trackBg: track ? getComputedStyle(track).backgroundColor : null,
                inkBg,
                headFamily: head ? getComputedStyle(head).fontFamily.split(",")[0] : null,
                labelFamily: label ? getComputedStyle(label).fontFamily.split(",")[0] : null,
                docks: q(".glass-dock").length,
            };
        });
        expect(c.variants, "Z-ConfigSliderPane-3: every slider is the scrubber").toEqual(["scrubber"]);
        expect(c.rangeBg, "Z-ConfigSliderPane-3: the range is painted").not.toMatch(/^rgba\(0, 0, 0, 0\)$|transparent/);
        expect(c.trackBg, "Z-ConfigSliderPane-4: the track is not the text ink").not.toBe(c.inkBg);
        expect(c.headFamily, "Z-ConfigSliderPane-10: heading ≠ row-label recipe").not.toBe(c.labelFamily);
        expect(c.sizes, "Z-ConfigSliderPane-12: the producer size is stamped").toEqual(["sm"]);
        expect(c.docks, "Z-ConfigSliderPane-14: one .glass-dock").toBe(1);
        await page.getByRole("button", { name: /Copy JSON/ }).click();
        await expect(page.locator(".config-action-bar"), "Z-ConfigSliderPane-5: the label swaps").toContainText("Copied");
        const clip = await page.evaluate(() => navigator.clipboard.readText());
        expect(() => JSON.parse(clip), "Z-ConfigSliderPane-5: the clipboard holds the JSON").not.toThrow();
    });

    test("CSP15 — forced colors: a focused config slider draws the same outline as a button", async ({ page }) => {
        test.setTimeout(90_000);
        await page.emulateMedia({ forcedColors: "active" });
        await boot(page, "/blob");
        const read = () => page.evaluate(() => {
            const c = getComputedStyle(document.activeElement!);
            return `${c.outlineStyle} ${c.outlineWidth}`;
        });
        const slider = page.locator(".config-console [role=slider]").first();
        await slider.focus();
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowLeft");
        const sliderOutline = await read();
        const button = page.locator(".config-action-bar button").first();
        await button.focus();
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Tab");
        const buttonOutline = await read();
        expect(sliderOutline, "Z-ConfigSliderPane-15").not.toMatch(/^none/);
        expect(sliderOutline).toBe(buttonOutline);
    });

    test("P22 — the dark scheme darkens the ambient ground", async ({ browser }) => {
        test.setTimeout(120_000);
        const meanY: Record<string, number> = {};
        for (const scheme of ["light", "dark"] as const) {
            const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
            try {
                const page = await ctx.newPage();
                await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch { /* storage blocked */ } }, scheme);
                await bootPicker(page);
                await page.waitForTimeout(2_500);
                // The left gutter, outside both plates and the dock.
                const png = await page.screenshot({ clip: { x: 0, y: 200, width: 40, height: 500 } });
                meanY[scheme] = await page.evaluate(async (b64) => {
                    const img = new Image();
                    img.src = `data:image/png;base64,${b64}`;
                    await img.decode();
                    const cv = document.createElement("canvas");
                    cv.width = img.width; cv.height = img.height;
                    const g = cv.getContext("2d")!;
                    g.drawImage(img, 0, 0);
                    const d = g.getImageData(0, 0, cv.width, cv.height).data;
                    const lin = (v: number) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
                    let sum = 0;
                    for (let i = 0; i < d.length; i += 4) sum += 0.2126 * lin(d[i]!) + 0.7152 * lin(d[i + 1]!) + 0.0722 * lin(d[i + 2]!);
                    return sum / (d.length / 4);
                }, png.toString("base64"));
            } finally {
                await ctx.close();
            }
        }
        expect(meanY.dark, "Z-ColorPicker-22: dark ground is far darker than light").toBeLessThan((meanY.light ?? 0) * 0.5);
    });
});

test.describe("Z2 picker cohort — mobile 390", () => {
    test.use(MOBILE);

    test("P1 · CI5 · CI13 · P16 · P20 — every action reachable; free-text entry; the readout band", async ({ page }) => {
        test.setTimeout(120_000);
        await bootPicker(page);
        const c = await headerCensus(page);
        expect(c.ratio, "Z-ColorPicker-16: one paired ratio at 390").toBeCloseTo(0.7862, 3);
        expect(new Set(c.cellTops).size, "Z-ColorPicker-20: the 3-tuple shares one line").toBe(1);

        await page.locator('[aria-label="Toggle action bar"]').first().tap();
        const seat = (name: string) => page.locator(`[aria-label="${name}"]`).filter({ visible: true });
        const SEATS = ["Reset color", "Copy color", "Random color", "Palettes", "Extract palette"];
        await expect(seat("Copy color")).toHaveCount(1);
        const onRun: string[] = [];
        for (const name of SEATS) if ((await seat(name).count()) > 0) onRun.push(name);
        const inMenu: string[] = [];
        const more = page.locator('[aria-label="More actions"]').filter({ visible: true });
        if (onRun.length < SEATS.length) {
            await expect(more, "Z-ColorPicker-1: the run's overflow has a menu").toHaveCount(1);
            await more.tap();
            const items = page.locator("[data-scene-action-menu]");
            await expect(items.first()).toBeVisible();
            inMenu.push(...(await items.allInnerTexts()).map((t) => t.trim()));
            await page.keyboard.press("Escape");
        }
        expect([...onRun, ...inMenu].sort(), "Z-ColorPicker-1: all five scene actions reachable at 390").toEqual([...SEATS].sort());

        await seat("Open color input").first().tap();
        const field = page.locator('[aria-label="Enter a CSS color"]').first();
        await expect(field, "Z-ColorInput-13: the field opens on mobile").toBeVisible();
        await expect(page.locator('[aria-label="Apply color"]'), "Z-ColorInput-5: the send button is named").toHaveCount(1);
        await field.click();
        await page.keyboard.press("ControlOrMeta+A");
        await page.keyboard.type("rgb(10 200 30)");
        await page.keyboard.press("Enter");
        await expect(page, "Z-ColorInput-13: the entry commits").toHaveTitle(/rgb\(10 200 30\)/, { timeout: 5_000 });
    });

    test("CSP16 — below 1024 the configurator stays in the DOM", async ({ page }) => {
        test.setTimeout(90_000);
        await boot(page, "/blob");
        await expect(page.locator(".config-console [role=slider]")).toHaveCount(31, { timeout: 30_000 });
        await expect(page.locator(".config-console")).toBeVisible();
    });
});
