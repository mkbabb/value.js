// PASS-5 probe P5-3 — the two duplicate-name latch chains, on /#/palettes
// (desktop, the ONE view where emitApply reaches a live picker), each seeded in
// a FRESH context so no reload / addInitScript re-seed can confound.
//
//  CHAIN 1 "dangling latch": duplicateTarget holds a store object. Delete that
//          palette while the banner is open, then press Update. updatePalette's
//          findIndex returns -1 → silent no-op; confirmUpdatePalette then clears
//          the name AND emits clearCurrent. Predicted: total data loss, zero
//          feedback.
//  CHAIN 2 "default-name collision": savedPaletteCount is savedPalettes.LENGTH,
//          so after deleting a middle "Palette N" the auto default name collides
//          with a surviving palette. Predicted: pressing Save with an EMPTY name
//          raises the duplicate banner, and Update overwrites an UNRELATED
//          palette's colors (and destroys its per-colour name/weight).
import { chromium } from "playwright";

const BASE = "http://localhost:9000";
const CUR = ["oklch(0.7 0.15 30)", "oklch(0.6 0.18 140)", "oklch(0.55 0.2 260)"];

const out = {};
const browser = await chromium.launch();

function mkPalette(name, colors, extra = {}) {
    return {
        id: `id-${name.replace(/\s+/g, "-")}`,
        name,
        slug: `${name.toLowerCase().replace(/\s+/g, "-")}-aaaaaaaa`,
        colors: colors.map((css, i) => ({ css, position: i, ...(extra.meta ?? {}) })),
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        isLocal: true,
    };
}

async function fresh(palettes) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(e.message));
    await page.addInitScript(
        ([cur, pal]) => {
            localStorage.setItem("color-picker", JSON.stringify({ inputColor: cur[0], savedColors: cur }));
            localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: pal }));
        },
        [CUR, palettes],
    );
    await page.goto(`${BASE}/#/palettes`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    return { ctx, page, errs };
}

const readStore = () =>
    JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => ({
        name: p.name,
        colors: p.colors.map((c) => c.css),
        meta: p.colors.map((c) => ({ name: c.name ?? null, weight: c.weight ?? null })),
        updatedAt: p.updatedAt,
    }));

const readRow = () => ({
    solidDots: [...document.querySelectorAll('.swatch-row [data-testid="watercolor-swatch"]')].filter(
        (d) => d.getAttribute("data-variant") === "solid",
    ).length,
    label: document.querySelector(".dashed-well .text-mono-small")?.textContent.trim() ?? null,
    persisted: JSON.parse(localStorage.getItem("color-picker")).savedColors,
    banner: (() => {
        const m = (document.querySelector(".dashed-well")?.textContent ?? "").match(
            /"([^"]+)" already exists\./,
        );
        return m ? m[0] : null;
    })(),
});

async function pressSave(page) {
    await page.evaluate(() => {
        const well = document.querySelector(".dashed-well");
        const inp = well.querySelector("input");
        const after = [...well.querySelectorAll("button")].filter(
            (b) => inp.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
        );
        after[0].click();
    });
    await page.waitForTimeout(600);
}

// ══════════════════════ CHAIN 1 — the dangling latch ══════════════════════
{
    const { ctx, page, errs } = await fresh([
        mkPalette("Latch", ["red", "blue"], { meta: { name: "Crimson", weight: 0.42 } }),
    ]);
    const rec = {};
    rec.t0_store = await page.evaluate(readStore);
    rec.t0_row = await page.evaluate(readRow);
    await page.locator(".dashed-well input").first().fill("Latch");
    await pressSave(page);
    rec.t1_afterSaveAttempt = { row: await page.evaluate(readRow), store: await page.evaluate(readStore) };
    rec.t1_updateBtn = await page.getByRole("button", { name: /^Update$/ }).count();

    // delete "Latch" out from under the open banner via Delete-all
    await page.locator('[aria-label="Delete all saved palettes"]').first().click();
    await page.waitForTimeout(400);
    const confirms = page.getByRole("button", { name: /Delete all/ });
    await confirms.last().click();
    await page.waitForTimeout(700);
    rec.t2_afterDeleteAll = {
        store: await page.evaluate(readStore),
        row: await page.evaluate(readRow),
        updateBtnStillThere: await page.getByRole("button", { name: /^Update$/ }).count(),
    };

    // press the now-dangling Update
    if (rec.t2_afterDeleteAll.updateBtnStillThere > 0) {
        await page.getByRole("button", { name: /^Update$/ }).first().click();
        await page.waitForTimeout(800);
    }
    rec.t3_afterUpdate = {
        store: await page.evaluate(readStore),
        row: await page.evaluate(readRow),
        anyErrorFeedback: await page.evaluate(() =>
            /error|failed|could not|couldn't|not found|missing/i.test(
                document.querySelector(".dashed-well")?.textContent ?? "",
            ),
        ),
        anyLiveRegionText: await page.evaluate(() =>
            [...document.querySelectorAll('[role="status"],[role="alert"],[aria-live]')]
                .map((e) => e.textContent.trim())
                .filter(Boolean)
                .slice(0, 5),
        ),
    };
    rec.pageErrors = errs;
    out.chain1_danglingLatch = rec;
    await ctx.close();
}

// ═════════════════ CHAIN 2 — the default-name collision ═══════════════════
{
    // Two surviving palettes with the DEFAULT names the component itself mints.
    // "Palette 1" was created then deleted → savedPalettes.length === 2 → the
    // next auto default is "Palette 3", which already exists.
    const { ctx, page, errs } = await fresh([
        mkPalette("Palette 3", ["#111111", "#222222"], { meta: { name: "Ink", weight: 0.9 } }),
        mkPalette("Palette 2", ["#333333"], {}),
    ]);
    const rec = {};
    rec.t0_store = await page.evaluate(readStore);
    rec.t0_placeholder = await page.evaluate(
        () => document.querySelector(".dashed-well input").placeholder,
    );
    // press Save with an EMPTY name field — the default name is used
    await pressSave(page);
    rec.t1 = {
        row: await page.evaluate(readRow),
        store: await page.evaluate(readStore),
        updateBtn: await page.getByRole("button", { name: /^Update$/ }).count(),
    };
    if (rec.t1.updateBtn > 0) {
        await page.getByRole("button", { name: /^Update$/ }).first().click();
        await page.waitForTimeout(800);
    }
    rec.t2_afterUpdate = {
        store: await page.evaluate(readStore),
        row: await page.evaluate(readRow),
    };
    rec.pageErrors = errs;
    out.chain2_defaultNameCollision = rec;
    await ctx.close();
}

// ═════════ CHAIN 3 — swatchKeys churn: remove index 0, do keys re-mint? ════
{
    const { ctx, page } = await fresh([]);
    const rec = {};
    const snap = () =>
        page.evaluate(() =>
            [...document.querySelectorAll('.swatch-row [data-testid="watercolor-swatch"]')].map(
                (d) => d.getAttribute("style")?.match(/border-radius:[^;]+/)?.[0] ?? null,
            ),
        );
    // stamp each swatch DOM node so a re-mint (unmount/remount) is observable
    await page.evaluate(() => {
        let n = 0;
        for (const w of document.querySelectorAll(".swatch-row > div.relative")) w.dataset.probeStamp = String(n++);
    });
    rec.stampsBefore = await page.evaluate(() =>
        [...document.querySelectorAll(".swatch-row > div.relative")].map((w) => w.dataset.probeStamp ?? "UNSTAMPED"),
    );
    // remove swatch 0 through the hover panel (real mouse)
    const wrapper = page.locator(".swatch-row > div.relative").nth(0);
    const b = await wrapper.boundingBox();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await page.waitForTimeout(350);
    const rm = page.locator('[aria-label^="Remove color"]');
    rec.removeBtnCount = await rm.count();
    if (rec.removeBtnCount) {
        await rm.first().evaluate((el) => el.click());
        await page.waitForTimeout(700);
    }
    rec.stampsAfter = await page.evaluate(() =>
        [...document.querySelectorAll(".swatch-row > div.relative")].map((w) => w.dataset.probeStamp ?? "UNSTAMPED"),
    );
    rec.interpretation =
        "stampsAfter all UNSTAMPED ⟹ every surviving swatch was destroyed+recreated (keys re-minted)";
    out.chain3_keyChurn = rec;
    await ctx.close();
}

console.log(JSON.stringify(out, null, 2));
await browser.close();
