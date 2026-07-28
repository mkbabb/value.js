// CHALLENGE-D · AuroraPane probe 2 — turn hypotheses into reproductions.
//  a) does clicking the visible "HARMONY" label do anything?
//  b) is `.aurora-row-label` typographically identical to `.config-section-title`?
//  c) does the focus indicator survive forced-colors (outline:none + box-shadow)?
//  d) do tuned atoms persist across reload (Motion "still" as the pause control)?
//  e) `--select-font` / `text-caption` / `max-h-[16rem]`: declared vs computed.
//  f) open menu at the 200%-zoom viewport — does it fit?
import { webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "frames");
mkdirSync(SHOTS, { recursive: true });
const ROUTE = "http://localhost:9000/#/atmosphere";
const out = {};
const browser = await webkit.launch();

async function open(ctx) {
    const p = await ctx.newPage();
    await p.goto(ROUTE, { waitUntil: "networkidle", timeout: 45000 });
    await p.waitForTimeout(2500);
    return p;
}

// ---- a,b,d,e on a normal desktop context ----
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await open(ctx);

    // (a) click the visible label; observe whether the select opened / took focus
    out.labelClick = await (async () => {
        const before = await page.evaluate(() => ({
            expanded: document.querySelector('[aria-label="Palette harmony"]').getAttribute("aria-expanded"),
            focused: document.activeElement.getAttribute("aria-label") || document.activeElement.tagName,
        }));
        await page.locator(".aurora-row-label", { hasText: "Harmony" }).first().click();
        await page.waitForTimeout(600);
        const after = await page.evaluate(() => ({
            expanded: document.querySelector('[aria-label="Palette harmony"]').getAttribute("aria-expanded"),
            focused: document.activeElement.getAttribute("aria-label") || document.activeElement.tagName,
            listboxOpen: !!document.querySelector("[role=listbox]"),
            labelCursor: getComputedStyle(document.querySelector(".aurora-row-label")).cursor,
        }));
        return { before, after };
    })();

    // (b) row label vs section title — identical voice?
    out.voice = await page.evaluate(() => {
        const pick = (el) => {
            const c = getComputedStyle(el);
            return {
                text: el.textContent.trim(),
                font: c.fontFamily.split(",")[0], size: c.fontSize, weight: c.fontWeight,
                ls: c.letterSpacing, tt: c.textTransform, color: c.color,
            };
        };
        return {
            rowLabel: pick(document.querySelector(".aurora-row-label")),
            sectionTitle: pick(document.querySelector(".config-section-title")),
            sliderRowLabel: (() => {
                const r = document.querySelector(".configurator-row");
                const l = r && (r.querySelector("label,.configurator-row-label") || r.firstElementChild);
                return l ? pick(l) : null;
            })(),
        };
    });

    // (e) declared-vs-computed on the trigger
    out.deadDeclarations = await page.evaluate(() => {
        const t = document.querySelector('[aria-label="Palette harmony"]');
        const c = getComputedStyle(t);
        const root = getComputedStyle(document.documentElement);
        const px = (v) => { const d = document.createElement("div"); d.style.width = v; document.body.append(d); const w = getComputedStyle(d).width; d.remove(); return w; };
        return {
            classList: t.className,
            selectFontToken: root.getPropertyValue("--select-font").trim(),
            fontMonoToken: root.getPropertyValue("--font-mono").trim(),
            computedFontFamily: c.fontFamily,
            computedFontStyle: c.fontStyle,
            typeCaptionToken: root.getPropertyValue("--type-caption").trim(),
            typeCaptionResolvedPx: px("var(--type-caption)"),
            computedFontSize: c.fontSize,
            computedMaxHeightOfTrigger: c.maxHeight,
        };
    });

    // (d) change Motion to "still", then reload — does it survive?
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await page.locator('[aria-label="Motion register"]').click();
    await page.waitForTimeout(600);
    await page.locator('[role=option]', { hasText: "Still" }).first().click();
    await page.waitForTimeout(800);
    const set = await page.evaluate(() => document.querySelector('[aria-label="Motion register"]').textContent.trim());
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    const afterReload = await page.evaluate(() => document.querySelector('[aria-label="Motion register"]').textContent.trim());
    out.persistence = { set, afterReload, persisted: set === afterReload };
    await ctx.close();
}

// ---- (c) forced-colors focus indicator ----
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active" });
    const page = await open(ctx);
    await page.evaluate(() => document.querySelector('[aria-label="Palette harmony"]').focus());
    await page.waitForTimeout(400);
    out.forcedColorsFocus = await page.evaluate(() => {
        const t = document.activeElement;
        const c = getComputedStyle(t);
        return {
            forcedColorsActive: matchMedia("(forced-colors: active)").matches,
            outline: `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor}`,
            boxShadow: c.boxShadow.slice(0, 160),
            border: `${c.borderTopStyle} ${c.borderTopWidth} ${c.borderTopColor}`,
            bg: c.backgroundColor,
            color: c.color,
            forcedColorAdjust: c.forcedColorAdjust,
        };
    });
    await page.screenshot({ path: resolve(SHOTS, "forced-colors-focus.png"), clip: { x: 199, y: 260, width: 1042, height: 260 } });
    await ctx.close();
}

// ---- (f) open menu at the 200%-zoom viewport ----
{
    const ctx = await browser.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
    const page = await open(ctx);
    await page.locator('[aria-label="Painterly medium"]').click();   // 7 options — the longest menu
    await page.waitForTimeout(800);
    out.zoomMenu = await page.evaluate(() => {
        const c = document.querySelector("[role=listbox]");
        if (!c) return { found: false };
        const b = c.getBoundingClientRect();
        return {
            found: true, rect: { y: Math.round(b.y), h: Math.round(b.height), bottom: Math.round(b.bottom) },
            viewportH: innerHeight,
            overflowBottom: Math.round(b.bottom - innerHeight),
            scrollable: c.scrollHeight > c.clientHeight,
            scrollH: c.scrollHeight, clientH: c.clientHeight,
            optionsVisible: [...c.querySelectorAll("[role=option]")].filter((o) => {
                const r = o.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight;
            }).length,
            optionsTotal: c.querySelectorAll("[role=option]").length,
        };
    });
    await page.screenshot({ path: resolve(SHOTS, "zoom-200-medium-open.png") });
    await ctx.close();
}

await browser.close();
writeFileSync(resolve(HERE, "probe-D2.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
