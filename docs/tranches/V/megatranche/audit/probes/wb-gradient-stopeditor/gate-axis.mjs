/**
 * GATE G1 — the gradient rail has ONE position axis.
 *
 * Asserted product property: for every stop, the ramp percentage painted under the
 * handle's centre pixel equals the model position the handle carries, within 0.25%
 * (a quarter of the 0.1% quantum the model rounds to); and the forward map
 * (pointer -> position) is the exact inverse of the inverse map (position -> pixels),
 * so clicking the pixel at which a handle is painted mints that handle's position.
 *
 * Input that makes it RED today: the default two-stop gradient at 1440x900.
 * The ramp is a border-box layer spanning the full 462px box while handle centres ride
 * `calc(10px + (100% - 20px) * p/100)` over the 460px PADDING box — the two axes agree
 * only near 47%.
 *
 * ENV: playwright-webkit against the dev server at :9000 (API-LESS — this gate reads no
 * data-backed surface). Structurally blind to: build output, real Safari (I-20), and any
 * defect that only appears with server-seeded stops.
 *
 * Exit 0 = GREEN. Exit 1 = RED (assertions printed).
 */
import { webkit } from "playwright";

const URL = process.env.GRADIENT_URL ?? "http://localhost:9000/#/gradient";
const TOL_SKEW = 0.25;   // percent of the ramp
const TOL_INV = 0.15;    // percent, forward/inverse round-trip
const fails = [];

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
await p.waitForTimeout(2500);

// ── G1a: painted ramp percentage under each handle centre == the handle's model position
const skew = await p.evaluate(() => {
    const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
    const r = bar.getBoundingClientRect();
    return [...bar.querySelectorAll("[data-stop-id]")].map((h) => {
        const hr = h.getBoundingClientRect();
        const cx = hr.x + hr.width / 2;
        return {
            label: h.getAttribute("aria-label"),
            modelPct: +h.getAttribute("aria-label").match(/([\d.]+)%/)[1],
            paintedPct: +(((cx - r.x) / r.width) * 100).toFixed(3),
        };
    });
});
for (const s of skew) {
    const d = +(s.paintedPct - s.modelPct).toFixed(3);
    if (Math.abs(d) > TOL_SKEW) {
        fails.push(`G1a  ${s.label}: model ${s.modelPct}% but the ramp under its centre paints ${s.paintedPct}% (skew ${d > 0 ? "+" : ""}${d}%, tolerance ±${TOL_SKEW}%)`);
    }
}

// ── G1b: clicking the pixel where a handle is painted mints that handle's position
{
    const g = await p.evaluate(() => {
        const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
        const r = bar.getBoundingClientRect();
        const h0 = bar.querySelector("[data-stop-id]");
        const hr = h0.getBoundingClientRect();
        return { cx: hr.x + hr.width / 2, barTop: r.y, n: bar.querySelectorAll("[data-stop-id]").length };
    });
    await p.mouse.click(g.cx, g.barTop + 4); // y inside the bar but above the handle's box
    await p.waitForTimeout(400);
    const minted = await p.evaluate(() => {
        const hs = [...document.querySelectorAll("[data-stop-id]")];
        return { n: hs.length, labels: hs.map((h) => h.getAttribute("aria-label")), lefts: hs.map((h) => h.style.left) };
    });
    if (minted.n !== g.n + 1) {
        fails.push(`G1b  clicking the 0% handle's own painted pixel did not mint a stop (n ${g.n} -> ${minted.n})`);
    } else {
        // aria-label rounds to whole percent (GradientStopEditor.vue:234) — read the true
        // value off the inline `left: calc(<p>% + <k>px)` instead, or this gate is vacuous.
        const mintedPct = +(minted.lefts[1].match(/calc\(([-\d.]+)%/)?.[1] ?? NaN);
        if (!Number.isFinite(mintedPct)) {
            fails.push(`G1b  could not read the minted stop's position from style.left=${JSON.stringify(minted.lefts[1])}`);
        } else if (Math.abs(mintedPct - 0) > TOL_INV) {
            fails.push(`G1b  clicked the exact pixel at which the 0% handle paints; the forward map minted ${mintedPct}% (expected 0% ± ${TOL_INV}%) — the forward and inverse maps are not inverse (border box vs padding box)`);
        }
    }
}

// ── G1c: the click->position map agrees with the ramp the user is pointing at
{
    await p.reload({ waitUntil: "networkidle" });
    await p.waitForTimeout(2200);
    const g = await p.evaluate(() => { const r = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    for (const f of [0.12, 0.88]) {
        const before = await p.evaluate(() => document.querySelectorAll("[data-stop-id]").length);
        await p.mouse.click(g.x + g.w * f, g.y + g.h / 2);
        await p.waitForTimeout(350);
        const after = await p.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map((h) => +h.getAttribute("aria-label").match(/([\d.]+)%/)[1]));
        if (after.length !== before + 1) { fails.push(`G1c  click at rail fraction ${(f * 100).toFixed(0)}% minted nothing (n ${before} -> ${after.length})`); continue; }
        const want = f * 100;
        const got = after.find((v) => Math.abs(v - want) < 12 && v !== 0 && v !== 100);
        if (got === undefined || Math.abs(got - want) > TOL_SKEW) {
            fails.push(`G1c  click at rail fraction ${(f * 100).toFixed(0)}% (the pixel where the ramp paints ${want.toFixed(0)}%) minted a stop at ${got}% (tolerance ±${TOL_SKEW}%)`);
        }
    }
}

await b.close();
if (fails.length) {
    console.error("GATE G1 (one position axis) — RED\n" + fails.map((f) => "  " + f).join("\n"));
    process.exit(1);
}
console.log("GATE G1 (one position axis) — GREEN");
