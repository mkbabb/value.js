// CHALLENGE-D probe 2 — the dead `variant` axis, pixel identity, contrast over
// the composited glass, and the reduced-motion / dismissal arms.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const SLUG = "quiet-amber-river-fox";

const seed = (n, scheme) => {
    const now = new Date().toISOString();
    const store = {
        version: 1,
        palettes: Array.from({ length: n }, (_, i) => ({
            id: `probe-${i}`,
            name: `Probe palette ${i + 1}`,
            slug: `probe-palette-${i + 1}`,
            colors: [{ css: "oklch(70% 0.18 30)", position: 0 }],
            createdAt: now,
            updatedAt: now,
            isLocal: true,
        })),
    };
    return `
try {
  localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(scheme)});
  localStorage.setItem('palette-user-slug', ${JSON.stringify(SLUG)});
  localStorage.setItem('palette-user-token', 'probe-token');
  localStorage.setItem('color-palettes', ${JSON.stringify(JSON.stringify(store))});
  const de = document.documentElement;
  if (${JSON.stringify(scheme)} === 'dark') de.classList.add('dark'); else de.classList.remove('dark');
} catch (e) {}`;
};

async function openSwitch(page) {
    await page.click('[data-o18="profile-trigger"]');
    await page.waitForTimeout(300);
    await page.click("text=Switch account");
    await page.waitForTimeout(300);
    await page.fill('input[placeholder="enter slug or token..."]', "other-slug-here-now");
    await page.press('input[placeholder="enter slug or token..."]', "Enter");
    await page.waitForTimeout(700);
}

const out = {};
const browser = await webkit.launch();

// ── A. the dead axis + full computed style of every action ─────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await ctx.addInitScript(seed(3, "light"));
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    await openSwitch(page);
    out.deadAxis = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]');
        const btns = [...dlg.querySelectorAll("button")].filter(
            (b) => !/close/i.test(b.getAttribute("aria-label") || ""),
        );
        const full = (el) => {
            const s = getComputedStyle(el);
            return {
                text: el.textContent.trim(),
                attrs: [...el.attributes].map((a) => `${a.name}="${a.value}"`),
                emphasisAttr: el.getAttribute("data-emphasis"),
                bg: s.backgroundColor,
                color: s.color,
                border: `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`,
                boxShadow: s.boxShadow,
                backdropFilter: s.backdropFilter || s.webkitBackdropFilter,
                opacity: s.opacity,
                fontFamily: s.fontFamily.split(",")[0],
                fontSize: s.fontSize,
                fontWeight: s.fontWeight,
                borderRadius: s.borderRadius,
                padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
                width: el.getBoundingClientRect().width,
                height: el.getBoundingClientRect().height,
                classList: [...el.classList],
            };
        };
        return btns.map(full);
    });

    // pixel identity of the three pills (crop each, compare mean RGB of the
    // interior band that carries no glyph — x offset 250..320 of each pill)
    const rects = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]');
        return [...dlg.querySelectorAll("button")]
            .filter((b) => !/close/i.test(b.getAttribute("aria-label") || ""))
            .map((b) => {
                const r = b.getBoundingClientRect();
                return { x: r.x, y: r.y, width: r.width, height: r.height };
            });
    });
    out.pillRects = rects;
    for (let i = 0; i < rects.length; i++) {
        await page.screenshot({
            path: `${HERE}/shots/pill-${i}.png`,
            clip: { x: rects[i].x + 200, y: rects[i].y + 8, width: 120, height: 24 },
        });
    }

    // ── contrast of button ink over the ACTUAL composited pixels ──────────
    out.compositedContrast = await page.evaluate(async () => {
        // sample the rendered page under a pill via html2canvas-free route:
        // read the pill's own computed bg alpha instead, and report the
        // scrim/overlay alpha so the reader can see nothing is opaque.
        const dlg = document.querySelector('[role="dialog"]');
        const cs = getComputedStyle(dlg);
        const scrim = document.querySelector('[data-slot="dialog-overlay"], [data-reka-portal] [aria-hidden="true"]');
        return {
            dialogBackground: cs.backgroundColor,
            dialogBackdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
            dialogOpacity: cs.opacity,
            scrimBackground: scrim ? getComputedStyle(scrim).backgroundColor : null,
            scrimBackdrop: scrim ? getComputedStyle(scrim).backdropFilter : null,
        };
    });

    // ── dismissal arms ─────────────────────────────────────────────────────
    // 1. overlay (scrim) click
    await page.mouse.click(60, 60);
    await page.waitForTimeout(600);
    out.afterScrimClick = await page.evaluate(() => ({
        dialogPresent: !!document.querySelector('[role="dialog"]'),
        active: document.activeElement?.tagName,
        slug: localStorage.getItem("palette-user-slug"),
    }));
    await ctx.close();
}

// ── B. reduced motion: does the reveal animate anyway? ─────────────────────
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        reducedMotion: "reduce",
    });
    await ctx.addInitScript(seed(3, "light"));
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    await page.click('[data-o18="profile-trigger"]');
    await page.waitForTimeout(300);
    await page.click("text=Regenerate slug");
    await page.waitForTimeout(60); // mid-reveal
    out.reducedMotionMidReveal = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]');
        if (!dlg) return { present: false };
        const s = getComputedStyle(dlg);
        return {
            present: true,
            animationName: s.animationName,
            animationDuration: s.animationDuration,
            transitionProperty: s.transitionProperty,
            transitionDuration: s.transitionDuration,
            transform: s.transform,
            opacity: s.opacity,
            scale: s.scale,
            translate: s.translate,
            anims: dlg.getAnimations().map((a) => ({
                name: a.animationName || a.transitionProperty,
                dur: a.effect?.getTiming?.().duration,
                playState: a.playState,
            })),
        };
    });
    await ctx.close();
}

// ── C. what happens after "Publish, then regenerate" — the in-flight state ──
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await ctx.addInitScript(seed(12, "light"));
    const page = await ctx.newPage();
    const requests = [];
    page.on("request", (r) => {
        if (r.url().includes("/api") || r.method() !== "GET") requests.push(`${r.method()} ${r.url().slice(0, 90)}`);
    });
    await page.goto(`${ORIGIN}/#/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    await page.click('[data-o18="profile-trigger"]');
    await page.waitForTimeout(300);
    await page.click("text=Regenerate slug");
    await page.waitForTimeout(600);
    await page.click("text=Publish, then regenerate");
    await page.waitForTimeout(120);
    out.rightAfterCommit = await page.evaluate(() => ({
        dialogPresent: !!document.querySelector('[role="dialog"]'),
        anyBusy: document.querySelectorAll('[aria-busy="true"]').length,
        anyProgress: document.querySelectorAll('[role="progressbar"],[role="status"],[role="alert"]').length,
        liveRegionText: [...document.querySelectorAll("[aria-live]")]
            .map((n) => n.textContent.trim())
            .filter(Boolean)
            .slice(0, 6),
        overlayPresent: !!document.querySelector("[data-reka-portal]"),
    }));
    await page.waitForTimeout(4000);
    out.fourSecondsAfterCommit = await page.evaluate(() => ({
        anyProgress: document.querySelectorAll('[role="progressbar"],[role="status"],[role="alert"]').length,
        liveRegionText: [...document.querySelectorAll("[aria-live]")]
            .map((n) => n.textContent.trim())
            .filter(Boolean)
            .slice(0, 6),
        slug: localStorage.getItem("palette-user-slug"),
    }));
    out.networkAfterCommit = requests.slice(-25);
    await page.screenshot({ path: `${HERE}/shots/after-commit.png` });
    await ctx.close();
}

await browser.close();
writeFileSync(`${HERE}/telemetry2.json`, JSON.stringify(out, null, 2));
console.log("WROTE telemetry2.json");
