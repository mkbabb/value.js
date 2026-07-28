// CHALLENGE-C pass 3 — focus indicator (REAL keyboard), tab-stop census,
// and the Reset/Copy state reproduction at today's HEAD. Read-only.
import { chromium } from "playwright";

const out = {};
const browser = await chromium.launch();

function rel(c) {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
function lum([r, g, b]) {
    return 0.2126 * rel(r) + 0.7152 * rel(g) + 0.0722 * rel(b);
}
function ratio(a, b) {
    const L1 = lum(a),
        L2 = lum(b);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

// ── A · real-keyboard focus, ordinary register, both schemes ───────────────
for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: scheme,
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/blob", { waitUntil: "load" });
    await page.locator(".config-console .configurator-row").first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(1200);

    // Real keyboard: click a NON-focusable label first would move focus; instead
    // Tab from the document start until activeElement is a config slider.
    await page.evaluate(() => document.body.focus());
    let hops = 0;
    for (; hops < 200; hops++) {
        await page.keyboard.press("Tab");
        const inConsole = await page.evaluate(
            () =>
                !!document.activeElement?.closest(".config-console") &&
                document.activeElement.getAttribute("role") === "slider",
        );
        if (inConsole) break;
    }

    const focused = await page.evaluate(() => {
        const el = document.activeElement;
        const cs = getComputedStyle(el);
        const track = el.closest(".glass-slider").querySelector(".slider-track");
        const tcs = getComputedStyle(track);
        return {
            tag: el.tagName.toLowerCase(),
            role: el.getAttribute("role"),
            label: el.getAttribute("aria-label"),
            focusVisible: el.matches(":focus-visible"),
            outlineStyle: cs.outlineStyle,
            outlineWidth: cs.outlineWidth,
            outlineColor: cs.outlineColor,
            boxShadow: cs.boxShadow,
            borderColor: cs.borderTopColor,
            borderWidth: cs.borderTopWidth,
            trackBg: tcs.backgroundColor,
            thumbRect: (() => {
                const r = el.getBoundingClientRect();
                return [+r.width.toFixed(2), +r.height.toFixed(2)];
            })(),
        };
    });

    // Tab-stop census inside the pane
    const tabStops = await page.evaluate(() => {
        const pane = document.querySelector(".config-console")?.closest(".relative");
        const root = pane ?? document;
        const sel =
            "a[href],button,input,select,textarea,[tabindex]:not([tabindex='-1']),[role='slider']";
        const els = [...root.querySelectorAll(sel)].filter(
            (e) => !e.hasAttribute("disabled") && e.getAttribute("tabindex") !== "-1",
        );
        return {
            total: els.length,
            byKind: els.reduce((a, e) => {
                const k = e.getAttribute("role") ?? e.tagName.toLowerCase();
                a[k] = (a[k] || 0) + 1;
                return a;
            }, {}),
            landmarksInsidePane: root.querySelectorAll(
                "[role='group'],[role='region'],fieldset,nav,section[aria-label]",
            ).length,
            liveRegionsInsidePane: root.querySelectorAll("[aria-live],[role='status'],[role='alert']")
                .length,
        };
    });

    out["A_" + scheme] = { tabHopsToFirstSlider: hops + 1, focused, tabStops };
    await ctx.close();
}

// ── B · the focus-ring / thumb contrast against the demo's re-inked track ──
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/blob", { waitUntil: "load" });
    await page.locator(".config-console .configurator-row").first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(1200);
    const raw = await page.evaluate(() => {
        const toRgb = (s) => {
            const d = document.createElement("div");
            d.style.color = s;
            document.body.appendChild(d);
            const c = getComputedStyle(d).color;
            d.remove();
            const m = c.match(/[\d.]+/g);
            return m ? m.slice(0, 3).map(Number) : null;
        };
        const track = document.querySelector(".config-console .slider-track");
        const thumb = document.querySelector(".config-console .slider-thumb");
        const well = document.querySelector(".config-console");
        return {
            trackBg: getComputedStyle(track).backgroundColor,
            trackBgRgb: toRgb(getComputedStyle(track).backgroundColor),
            thumbBorderRgb: toRgb(getComputedStyle(thumb).borderTopColor),
            wellBgRgb: toRgb(getComputedStyle(well).backgroundColor),
            inkMuted: getComputedStyle(document.documentElement)
                .getPropertyValue("--ink-muted")
                .trim(),
            inkMutedRgb: toRgb(
                getComputedStyle(document.documentElement).getPropertyValue("--ink-muted").trim() ||
                    "black",
            ),
            sliderTrackBgVar: getComputedStyle(
                document.querySelector(".config-console"),
            ).getPropertyValue("--slider-track-bg"),
            cardBgRgb: toRgb(
                getComputedStyle(document.querySelector(".config-console").closest("[data-slot]") ??
                    document.body).backgroundColor,
            ),
        };
    });
    out.B_contrast = {
        ...raw,
        thumbBorderVsTrack:
            raw.thumbBorderRgb && raw.trackBgRgb
                ? +ratio(raw.thumbBorderRgb, raw.trackBgRgb).toFixed(3)
                : null,
    };
    await ctx.close();
}

// ── C · Reset / Copy state reproduction through the public UI only ─────────
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        permissions: [],
    });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
        window.__clip = [];
        Object.defineProperty(navigator, "clipboard", {
            configurable: true,
            value: {
                writeText: (t) => {
                    window.__clip.push(t);
                    return Promise.resolve();
                },
            },
        });
    });
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e)));
    await page.goto("http://localhost:9000/#/blob", { waitUntil: "load" });
    await page.locator(".config-console .configurator-row").first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(1500);

    const copy = page.locator(".config-action-bar button", { hasText: "Copy JSON" });
    const reset = page.locator(".config-action-bar button", { hasText: "Reset" });

    await copy.click();
    await page.waitForTimeout(300);
    // move one declared slider by keyboard so we have a user edit to lose too
    const first = page.locator(".config-console [role='slider']").first();
    await first.focus();
    await page.keyboard.press("End");
    await page.waitForTimeout(200);
    const afterEdit = await page.evaluate(() =>
        document
            .querySelector(".config-console [role='slider']")
            .getAttribute("aria-valuenow"),
    );
    await reset.click();
    await page.waitForTimeout(400);
    await copy.click();
    await page.waitForTimeout(300);

    const clip = await page.evaluate(() => window.__clip.slice());
    const parse = (s) => {
        try {
            return JSON.parse(s);
        } catch {
            return null;
        }
    };
    const pre = parse(clip[0]);
    const post = parse(clip[1]);
    out.C_state = {
        clipboardCaptures: clip.length,
        prePaletteStops: pre?.color?.paletteStops,
        postPaletteStops: post?.color?.paletteStops,
        paletteStopsWiped: JSON.stringify(pre?.color?.paletteStops) !== JSON.stringify(post?.color?.paletteStops),
        preBytes: clip[0]?.length,
        preTopLevelKeys: pre ? Object.keys(pre) : null,
        keysCopiedNoSliderDrives: pre
            ? ["morphT", "quality"].filter((k) => k in pre).concat(
                  pre.color && "paletteStops" in pre.color ? ["color.paletteStops"] : [],
                  pre.color && "lightnessFloor" in pre.color ? ["color.lightnessFloor"] : [],
                  pre.surface && "rimColor" in pre.surface ? ["surface.rimColor"] : [],
                  pre.geometry && "canvasSize" in pre.geometry ? ["geometry.canvasSize"] : [],
              )
            : null,
        firstSliderAfterEnd: afterEdit,
        firstSliderAfterReset: await page.evaluate(() =>
            document
                .querySelector(".config-console [role='slider']")
                .getAttribute("aria-valuenow"),
        ),
        statusRegionsAfterCopy: await page.evaluate(
            () =>
                document.querySelectorAll(
                    "[aria-live],[role='status'],[role='alert']",
                ).length,
        ),
        pageErrors,
    };
    await ctx.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
