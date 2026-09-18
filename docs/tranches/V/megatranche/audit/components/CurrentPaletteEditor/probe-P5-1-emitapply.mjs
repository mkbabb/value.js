// PASS-5 probe P5-1 — does `emitApply` reach a live picker on the views that
// host CurrentPaletteEditor?
//
// Hypothesis: `usePaletteWiring.emitApply` guards on `colorPickerRef.value`,
// which App.vue populates ONLY from `onDesktopLeftMount` (bound to the DESKTOP
// LEFT PaneSlot). Therefore:
//   * every view whose `left` pane is not "color-picker" → ref null
//   * every MOBILE view (the mobile PaneSlot has no :on-mount) → ref null
// and on the null branch `emitApply(colors)` does `applyColorString(colors[0])`
// (a CURRENT-COLOUR write, not a saved-list replace) or, for `[]`, returns
// silently.
//
// Measured consequences for CurrentPaletteEditor:
//   R1  Trash (remove swatch) does not remove; it moves the current colour.
//   R2  Trash on the LAST swatch does nothing at all.
//   R3  Save → clearCurrent → emitApply([]) → silent no-op; the row is never
//       cleared, so pressing Save again mints a duplicate palette.
import { chromium } from "playwright";

const BASE = "http://localhost:9000";
const SEED = ["oklch(0.7 0.15 30)", "oklch(0.6 0.18 140)", "oklch(0.55 0.2 260)"];

const out = { runs: [] };

async function seed(page) {
    await page.addInitScript(
        ([colors]) => {
            localStorage.setItem(
                "color-picker",
                JSON.stringify({ inputColor: "oklch(0.7 0.15 30)", savedColors: colors }),
            );
            localStorage.setItem(
                "color-palettes",
                JSON.stringify({ version: 1, palettes: [] }),
            );
        },
        [SEED],
    );
}

// Read the swatch row: the WatercolorDot roots inside .swatch-row
const readRow = () =>
    // eslint-disable-next-line no-undef
    (() => {
        const row = document.querySelector(".swatch-row");
        if (!row) return { row: null };
        const dots = [...row.querySelectorAll('[data-testid="watercolor-swatch"]')];
        return {
            row: true,
            dotCount: dots.length,
            variants: dots.map((d) => d.getAttribute("data-variant")),
            bgs: dots.map((d) => getComputedStyle(d).backgroundColor),
            countLabel:
                row.parentElement?.querySelector(".text-mono-small")?.textContent?.trim() ?? null,
        };
    })();

async function run(view, mobile) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext(
        mobile
            ? { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }
            : { viewport: { width: 1440, height: 900 } },
    );
    const page = await ctx.newPage();
    const console_ = [];
    page.on("console", (m) => console_.push(`${m.type()}: ${m.text()}`));
    page.on("pageerror", (e) => console_.push(`PAGEERROR: ${e.message}`));
    await seed(page);
    await page.goto(`${BASE}/#/${view}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);

    const rec = { view, mobile, console: [] };

    // Is the CurrentPaletteEditor mounted at all?
    rec.editorPresent = await page.evaluate(
        () => !!document.querySelector(".dashed-well .swatch-row"),
    );
    if (!rec.editorPresent) {
        rec.note = "editor not mounted on this view/viewport";
        rec.console = console_.slice(-12);
        out.runs.push(rec);
        await browser.close();
        return;
    }

    rec.before = await page.evaluate(readRow);
    rec.currentColorBefore = await page.evaluate(
        () => getComputedStyle(document.documentElement).getPropertyValue("--accent-live").trim(),
    );

    // ── R1: click the Trash action for swatch index 1 ─────────────────────────
    // The dot itself is pointer-events:none; the hover panel is teleported to
    // <body>. Open it by dispatching pointerenter on the SwatchHoverMenu root
    // (a real <div class="relative">), then click the Remove button wherever it
    // landed (body teleport on desktop, PopoverContent on touch).
    rec.trash = await page.evaluate(() => {
        const row = document.querySelector(".swatch-row");
        const wrappers = [...row.children].filter((c) => c.classList.contains("relative"));
        const target = wrappers[1];
        if (!target) return { err: "no wrapper[1]" };
        target.dispatchEvent(
            new PointerEvent("pointerenter", { bubbles: false, pointerType: "mouse" }),
        );
        return { dispatched: true, wrapperCount: wrappers.length };
    });
    await page.waitForTimeout(250);
    rec.removeButtons = await page.evaluate(
        () => document.querySelectorAll('[aria-label^="Remove color"]').length,
    );
    if (rec.removeButtons > 0) {
        await page.evaluate(() => {
            const btns = [...document.querySelectorAll('[aria-label^="Remove color"]')];
            btns[0].click();
        });
        await page.waitForTimeout(600);
    }
    rec.afterTrash = await page.evaluate(readRow);
    rec.currentColorAfterTrash = await page.evaluate(
        () => getComputedStyle(document.documentElement).getPropertyValue("--accent-live").trim(),
    );

    // ── R3: type a name and press the Save (check) button ─────────────────────
    const input = page.locator(".dashed-well input").first();
    if (await input.count()) {
        await input.fill("P5 probe");
        // the save button is the sibling glass Button holding a Check glyph
        await page.evaluate(() => {
            const well = document.querySelector(".dashed-well");
            const btns = [...well.querySelectorAll("button")];
            // the save confirm is the button that follows the text input
            const inp = well.querySelector("input");
            const after = btns.filter(
                (b) => inp.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
            );
            after[0]?.click();
        });
        await page.waitForTimeout(700);
    }
    rec.afterSave = await page.evaluate(readRow);
    rec.storeAfterSave = await page.evaluate(() => {
        try {
            const s = JSON.parse(localStorage.getItem("color-palettes"));
            return {
                n: s.palettes.length,
                names: s.palettes.map((p) => p.name),
                colorCounts: s.palettes.map((p) => p.colors.length),
            };
        } catch (e) {
            return { err: String(e) };
        }
    });

    // ── R3b: press Save a SECOND time (row was never cleared) ─────────────────
    await page.evaluate(() => {
        const well = document.querySelector(".dashed-well");
        const inp = well.querySelector("input");
        if (!inp) return;
        const btns = [...well.querySelectorAll("button")];
        const after = btns.filter(
            (b) => inp.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
        );
        after[0]?.click();
    });
    await page.waitForTimeout(700);
    rec.storeAfterSecondSave = await page.evaluate(() => {
        try {
            const s = JSON.parse(localStorage.getItem("color-palettes"));
            return { n: s.palettes.length, names: s.palettes.map((p) => p.name) };
        } catch (e) {
            return { err: String(e) };
        }
    });
    rec.duplicateBanner = await page.evaluate(() => {
        const el = [...document.querySelectorAll(".dashed-well span")].find((s) =>
            /already exists/.test(s.textContent),
        );
        return el ? el.textContent.trim() : null;
    });

    rec.console = console_.filter(
        (c) => !/VITE_API_URL|vite|hmr|Download the Vue/i.test(c),
    ).slice(-15);
    out.runs.push(rec);
    await browser.close();
}

await run("palettes", false); // left = color-picker  → ref SET (control)
await run("generate", false); // left = generate      → ref NULL
await run("browse", false); // left = browse        → ref NULL
await run("palettes", true); // mobile              → ref NULL (no :on-mount)

console.log(JSON.stringify(out, null, 2));
