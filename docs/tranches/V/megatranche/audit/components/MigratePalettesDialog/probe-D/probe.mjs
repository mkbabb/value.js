// CHALLENGE-D probe — MigratePalettesDialog, the session-gated modal the
// mega-tranche visual matrix never captured (it has no route of its own).
//
// READ-ONLY against the running dev server. Writes ONLY under this directory.
//   node docs/tranches/V/megatranche/audit/components/MigratePalettesDialog/probe-D/probe.mjs
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";

const SLUG = "quiet-amber-river-fox";

function seedPalettes(n) {
    const now = new Date().toISOString();
    return {
        version: 1,
        palettes: Array.from({ length: n }, (_, i) => ({
            id: `probe-${i}`,
            name: `Probe palette ${i + 1}`,
            slug: `probe-palette-${i + 1}`,
            colors: [
                { css: "oklch(70% 0.18 30)", position: 0 },
                { css: "oklch(60% 0.14 140)", position: 1 },
                { css: "oklch(55% 0.20 260)", position: 2 },
            ],
            createdAt: now,
            updatedAt: now,
            isLocal: true,
        })),
    };
}

const initScript = (scheme, n) => `
try {
  localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(scheme)});
  localStorage.setItem('palette-user-slug', ${JSON.stringify(SLUG)});
  localStorage.setItem('palette-user-token', 'probe-token-not-a-real-secret');
  localStorage.setItem('color-palettes', ${JSON.stringify(JSON.stringify(seedPalettes(3))).replace(/PALETTE_N/g, "")});
  const de = document.documentElement;
  if (${JSON.stringify(scheme)} === 'dark') de.classList.add('dark'); else de.classList.remove('dark');
} catch (e) {}
`;

const initScriptN = (scheme, n) => `
try {
  localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(scheme)});
  localStorage.setItem('palette-user-slug', ${JSON.stringify(SLUG)});
  localStorage.setItem('palette-user-token', 'probe-token-not-a-real-secret');
  localStorage.setItem('color-palettes', ${JSON.stringify(JSON.stringify(seedPalettes(n)))});
  const de = document.documentElement;
  if (${JSON.stringify(scheme)} === 'dark') de.classList.add('dark'); else de.classList.remove('dark');
} catch (e) {}
`;

const MATRIX = [
    {
        id: "desktop-light",
        scheme: "light",
        mobile: false,
        ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
    },
    {
        id: "desktop-dark",
        scheme: "dark",
        mobile: false,
        ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
    },
    { id: "mobile-light", scheme: "light", mobile: true, ctx: { ...devices["iPhone 14"] } },
    { id: "mobile-dark", scheme: "dark", mobile: true, ctx: { ...devices["iPhone 14"] } },
];

const telemetry = {};

async function measure(page) {
    return page.evaluate(() => {
        const round = (n) => Math.round(n * 100) / 100;
        const dlg = document.querySelector('[role="dialog"]');
        if (!dlg) return { present: false };
        const cs = getComputedStyle(dlg);
        const r = dlg.getBoundingClientRect();
        const title = dlg.querySelector("h2, [data-slot='dialog-title']");
        const desc = dlg.querySelector("p, [data-slot='dialog-description']");
        const btns = [...dlg.querySelectorAll("button")];
        const style = (el) => {
            if (!el) return null;
            const s = getComputedStyle(el);
            const b = el.getBoundingClientRect();
            return {
                text: (el.textContent || "").trim().slice(0, 60),
                fontFamily: s.fontFamily,
                fontSize: s.fontSize,
                fontWeight: s.fontWeight,
                lineHeight: s.lineHeight,
                color: s.color,
                borderRadius: s.borderRadius,
                backgroundColor: s.backgroundColor,
                borderColor: s.borderColor,
                cursor: s.cursor,
                justifyContent: s.justifyContent,
                minHeight: s.minHeight,
                rect: { x: round(b.x), y: round(b.y), w: round(b.width), h: round(b.height) },
                accName: el.getAttribute("aria-label") || (el.textContent || "").trim().slice(0, 40),
            };
        };
        // vertical gaps between the stacked action buttons
        const gaps = [];
        for (let i = 1; i < btns.length; i++) {
            const a = btns[i - 1].getBoundingClientRect();
            const b = btns[i].getBoundingClientRect();
            gaps.push(round(b.top - a.bottom));
        }
        return {
            present: true,
            dialog: {
                rect: { x: round(r.x), y: round(r.y), w: round(r.width), h: round(r.height) },
                borderRadius: cs.borderRadius,
                classList: [...dlg.classList],
                ariaLabelledby: dlg.getAttribute("aria-labelledby"),
                ariaDescribedby: dlg.getAttribute("aria-describedby"),
                ariaModal: dlg.getAttribute("aria-modal"),
                radiusCtx: cs.getPropertyValue("--radius-ctx"),
                radiusDialog: getComputedStyle(document.documentElement).getPropertyValue("--radius-dialog"),
            },
            title: style(title),
            description: style(desc),
            buttons: btns.map(style),
            buttonGaps: gaps,
            activeElement: document.activeElement
                ? {
                      tag: document.activeElement.tagName,
                      text: (document.activeElement.textContent || "").trim().slice(0, 40),
                      inDialog: dlg.contains(document.activeElement),
                  }
                : null,
            // is there a producer close affordance?
            closeButtons: btns
                .filter((b) => /close|dismiss/i.test(b.getAttribute("aria-label") || b.textContent || ""))
                .map((b) => b.getAttribute("aria-label") || b.textContent.trim()),
            overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
    });
}

async function openRegenerate(page, mobile) {
    if (!mobile) {
        await page.click('[data-o18="profile-trigger"]');
        await page.waitForTimeout(350);
        await page.click('text=Regenerate slug');
    } else {
        // mobile dock menu
        const trig = page.locator('[data-o18="mobile-menu-trigger"], button:has-text("Menu")').first();
        if (await trig.count()) {
            await trig.click();
            await page.waitForTimeout(350);
        }
        await page.click("text=Regenerate slug");
    }
    await page.waitForTimeout(700);
}

async function openSwitch(page) {
    await page.click('[data-o18="profile-trigger"]');
    await page.waitForTimeout(350);
    await page.click("text=Switch account");
    await page.waitForTimeout(400);
    await page.fill('input[placeholder="enter slug or token..."]', "other-slug-here-now");
    await page.press('input[placeholder="enter slug or token..."]', "Enter");
    await page.waitForTimeout(700);
}

const browser = await webkit.launch();

for (const m of MATRIX) {
    const ctx = await browser.newContext({ ...m.ctx, colorScheme: m.scheme });
    await ctx.addInitScript(initScriptN(m.scheme, 3));
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on("console", (msg) => {
        if (msg.type() === "error" || msg.type() === "warning") consoleErrors.push(`${msg.type()}: ${msg.text()}`);
    });
    await page.goto(`${ORIGIN}/#/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);

    const rec = { consoleErrors };

    // ── regenerate mode ────────────────────────────────────────────────────
    try {
        await openRegenerate(page, m.mobile);
        rec.regenerate = await measure(page);
        mkdirSync(`${HERE}/shots`, { recursive: true });
        await page.screenshot({ path: `${HERE}/shots/${m.id}-regenerate.png` });
        const dlg = page.locator('[role="dialog"]').first();
        if (await dlg.count()) await dlg.screenshot({ path: `${HERE}/shots/${m.id}-regenerate-crop.png` });
    } catch (e) {
        rec.regenerateError = String(e).slice(0, 300);
    }

    // ── ESC dismissal: does the pending action survive? where does focus go? ──
    try {
        await page.keyboard.press("Escape");
        await page.waitForTimeout(600);
        rec.afterEsc = await page.evaluate(() => ({
            dialogPresent: !!document.querySelector('[role="dialog"]'),
            activeElement: document.activeElement
                ? {
                      tag: document.activeElement.tagName,
                      cls: document.activeElement.className?.toString?.().slice(0, 80),
                      text: (document.activeElement.textContent || "").trim().slice(0, 40),
                  }
                : null,
            paletteCount: JSON.parse(localStorage.getItem("color-palettes") || "{}")?.palettes?.length,
            slug: localStorage.getItem("palette-user-slug"),
        }));
    } catch (e) {
        rec.escError = String(e).slice(0, 300);
    }

    // ── switch mode (3 actions) — desktop only, the layer is lg-gated ───────
    if (!m.mobile) {
        try {
            await page.reload({ waitUntil: "domcontentloaded" });
            await page.waitForTimeout(2200);
            await openSwitch(page);
            rec.switch = await measure(page);
            await page.screenshot({ path: `${HERE}/shots/${m.id}-switch.png` });
            const dlg2 = page.locator('[role="dialog"]').first();
            if (await dlg2.count()) await dlg2.screenshot({ path: `${HERE}/shots/${m.id}-switch-crop.png` });
        } catch (e) {
            rec.switchError = String(e).slice(0, 300);
        }
    }

    telemetry[m.id] = rec;
    await ctx.close();
}

// ── count-boundary arm: 1 palette (singular) and 137 (long number) ─────────
for (const n of [1, 137]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await ctx.addInitScript(initScriptN("light", n));
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    try {
        await openRegenerate(page, false);
        const m = await measure(page);
        telemetry[`count-${n}`] = { description: m.description?.text, title: m.title?.text, dialog: m.dialog?.rect };
        await page.screenshot({ path: `${HERE}/shots/count-${n}.png` });
    } catch (e) {
        telemetry[`count-${n}`] = { error: String(e).slice(0, 300) };
    }
    await ctx.close();
}

// ── 320px narrow arm + 200% zoom arm ───────────────────────────────────────
for (const arm of [
    { id: "narrow-320", ctx: { viewport: { width: 320, height: 640 } } },
    { id: "zoom-200", ctx: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 } },
]) {
    const ctx = await browser.newContext({ ...arm.ctx, colorScheme: "light" });
    await ctx.addInitScript(initScriptN("light", 3));
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    try {
        await openRegenerate(page, true);
        telemetry[arm.id] = await measure(page);
        await page.screenshot({ path: `${HERE}/shots/${arm.id}.png` });
        const d = page.locator('[role="dialog"]').first();
        if (await d.count()) await d.screenshot({ path: `${HERE}/shots/${arm.id}-crop.png` });
    } catch (e) {
        telemetry[arm.id] = { error: String(e).slice(0, 300) };
    }
    await ctx.close();
}

// ── reduced-motion + forced-colors arms ────────────────────────────────────
for (const arm of [
    { id: "reduced-motion", opts: { reducedMotion: "reduce" } },
    { id: "forced-colors", opts: { forcedColors: "active" } },
]) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        ...arm.opts,
    });
    await ctx.addInitScript(initScriptN("light", 3));
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    try {
        await openRegenerate(page, false);
        telemetry[arm.id] = await measure(page);
        await page.screenshot({ path: `${HERE}/shots/${arm.id}.png` });
        const d = page.locator('[role="dialog"]').first();
        if (await d.count()) await d.screenshot({ path: `${HERE}/shots/${arm.id}-crop.png` });
    } catch (e) {
        telemetry[arm.id] = { error: String(e).slice(0, 300) };
    }
    await ctx.close();
}

await browser.close();
writeFileSync(`${HERE}/telemetry.json`, JSON.stringify(telemetry, null, 2));
console.log(JSON.stringify(telemetry, null, 2).slice(0, 200));
console.log("\nWROTE", `${HERE}/telemetry.json`);
