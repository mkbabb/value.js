#!/usr/bin/env node
/**
 * R.W3 gate probe — the INSTRUMENT clauses (Lanes C/D/E), companion to
 * probe-keystone.mjs (Lane A). Authored fresh (the W0-2 .w6a scratch stays
 * dead). Computed-truth (CSSOM + measured-rect + getAnimations) against the
 * BUILT demo. Each clause maps to the §Hard gate:
 *
 *   I1 (gate b) — the slider thumb paints LIVE color under KEYBOARD drive:
 *        focus the L-channel thumb, read computed background-color, arrow
 *        20 steps, read again → the computed background MUST change (the
 *        consume is a token feed, not a pointer-event cosmetic). Pre-wave
 *        RED by construction: the raw-reka fork thumb was bg-transparent +
 *        literal gray-200 border.
 *   I2 (gate c) — the orchestrated open is LIVE animation objects at load
 *        (PRM off): plate-land + field-paint-in + stagger-child-in all in
 *        document.getAnimations(); under PRM reduce, none. Pre-wave RED:
 *        only stagger-child-in existed.
 *   I3 (gate e) — every keyboard tab stop inside the picker paints a
 *        computed visible focus ring (box-shadow/outline ≠ none). Pre-wave
 *        RED: the space trigger carried focus:outline-none bare.
 *   I4 (gate d) — ComponentSliders.vue ≤ 400 LoC (fork deleted).
 *   I5 (card-lock, D1/U31/A6) — keyboard-drive the L slider End→Home→End:
 *        the picker Card's bounding rect NEVER changes (±0.5px tolerance
 *        for DPR rounding). Pre-wave RED: text-4xl flex-wrap readout with
 *        stripped decimals reflowed the card during drags.
 *
 * Usage: node probe-instrument.mjs [baseURL]  (default http://localhost:4179)
 * Exit 0 = all GREEN · exit 1 = any RED.
 */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:4179";
const results = [];
const record = (id, pass, detail) => {
    results.push({ id, pass, detail });
    console.log(`${pass ? "GREEN" : "RED  "}  ${id}  ${detail}`);
};

const browser = await chromium.launch();

// ── I4: LoC cap (static truth) ──────────────────────────────────────────────
const sliderLoc = readFileSync(
    new URL("../../../../../demo/@/components/custom/color-picker/controls/ComponentSliders.vue", import.meta.url),
    "utf8",
).split("\n").length;
record("I4-sliders-loc", sliderLoc <= 400, `ComponentSliders.vue = ${sliderLoc} LoC (cap 400)`);

// ── PRM-off context: I1, I2(on), I3, I5 ─────────────────────────────────────
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        reducedMotion: "no-preference",
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/picker`, { waitUntil: "domcontentloaded" });

    // I2 — sample animations DURING the open (first ~700ms window)
    await page.waitForTimeout(350);
    const liveAnims = await page.evaluate(() =>
        document.getAnimations().map((a) => a.animationName ?? "").filter(Boolean),
    );
    const hasBeat = (n) => liveAnims.some((a) => a.startsWith(n));
    record(
        "I2-orchestrated-open",
        hasBeat("plate-land") && hasBeat("field-paint-in") && liveAnims.includes("stagger-child-in"),
        `getAnimations @350ms: plate-land=${hasBeat("plate-land")} field-paint-in=${hasBeat("field-paint-in")} stagger=${liveAnims.includes("stagger-child-in")}`,
    );

    await page.waitForTimeout(2000);

    // I1 — thumb bg tracks the model under keyboard drive
    const lThumb = page.getByRole("slider", { name: "L channel" });
    await lThumb.focus();
    const readThumbBg = () =>
        page.evaluate(() => {
            const el = document.activeElement;
            const thumb = el?.classList?.contains("slider-thumb")
                ? el
                : el?.closest?.(".channel-slider")?.querySelector(".slider-thumb") ?? el;
            return getComputedStyle(thumb).backgroundColor;
        });
    const bg0 = await readThumbBg();
    for (let i = 0; i < 20; i++) await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(250);
    const bg1 = await readThumbBg();
    record(
        "I1-thumb-token-feed",
        bg0 !== bg1 && bg1 !== "rgba(0, 0, 0, 0)",
        `thumb bg ${bg0} → ${bg1} across 20 ArrowRight steps`,
    );

    // I5 — card-lock: End/Home/End must not move the Card rect
    const cardRect = () =>
        page.evaluate(() => {
            const card = document.querySelector(".pane-shell > :first-child");
            const r = card.getBoundingClientRect();
            return [r.x, r.y, r.width, r.height].map((v) => Math.round(v * 2) / 2);
        });
    const r0 = await cardRect();
    await page.keyboard.press("End");
    await page.waitForTimeout(200);
    const r1 = await cardRect();
    await page.keyboard.press("Home");
    await page.waitForTimeout(200);
    const r2 = await cardRect();
    await page.keyboard.press("End");
    await page.waitForTimeout(200);
    const r3 = await cardRect();
    const same = (a, b) => a.every((v, i) => Math.abs(v - b[i]) <= 0.5);
    record(
        "I5-card-lock",
        same(r0, r1) && same(r0, r2) && same(r0, r3),
        `card rect ${JSON.stringify(r0)} → End ${JSON.stringify(r1)} → Home ${JSON.stringify(r2)} → End ${JSON.stringify(r3)}`,
    );

    // I3 — focus rings on the picker's keyboard stops. Tab from the top of
    // the picker card; for each of the first 10 in-card stops assert a
    // computed visible ring (box-shadow or outline).
    await page.evaluate(() => {
        document.querySelector(".pane-shell")?.scrollIntoView();
        document.body.focus?.();
        const sel = document.activeElement;
        if (sel && sel !== document.body) sel.blur();
    });
    const ringless = [];
    let inspected = 0;
    for (let i = 0; i < 30 && inspected < 10; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return null;
            const inPicker = !!el.closest(".pane-shell");
            if (!inPicker) return { skip: true };
            const cs = getComputedStyle(el);
            const ring =
                (cs.boxShadow && cs.boxShadow !== "none") ||
                (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0);
            const tag = `${el.tagName.toLowerCase()}${el.getAttribute("aria-label") ? `[${el.getAttribute("aria-label")}]` : `.${(el.className?.toString?.() ?? "").split(" ")[0]}`}`;
            return { tag, ring };
        });
        if (!info) continue;
        if (info.skip) continue;
        inspected++;
        if (!info.ring) ringless.push(info.tag);
    }
    record(
        "I3-focus-rings",
        inspected > 0 && ringless.length === 0,
        `${inspected} in-picker tab stops inspected · ringless: ${ringless.length ? ringless.join(", ") : "none"}`,
    );

    await ctx.close();
}

// ── PRM-reduce context: I2 absence half ─────────────────────────────────────
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/picker`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(350);
    const anims = await page.evaluate(() =>
        document.getAnimations().map((a) => a.animationName ?? "").filter(Boolean),
    );
    const leaked = anims.filter(
        (a) => a.startsWith("plate-land") || a.startsWith("field-paint-in") || a === "stagger-child-in",
    );
    record(
        "I2r-prm-absent",
        leaked.length === 0,
        `PRM reduce: open-beat animations present = ${leaked.length ? leaked.join(",") : "none"}`,
    );
    await ctx.close();
}

await browser.close();
const red = results.filter((r) => !r.pass).length;
console.log(`\nPROBE: ${results.length - red}/${results.length} GREEN${red ? ` · ${red} RED` : ""}`);
process.exit(red ? 1 : 0);
