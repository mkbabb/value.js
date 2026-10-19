// SERVED MODEL: claude-opus-5-5[1m]
//
// X.W6.d · gate **d1** — ONE RADIUS REGISTER: every radius in the easing panel
// derives from the panel's scale or is a declared circle.
//
//   npx vite --port 9002 --strictPort     # a FRESHLY started dev server
//   node docs/tranches/V/megatranche/audit/probes/x-w6/gate-easing-radius.mjs
//
// RED at open (W6.md d1): "four unrelated registers in one instrument —
// circular preset chips (50%), a small-radius strip, a large-radius pill, an
// outer card at a fourth" (owner witness OM-4, sha256 5b7906f3…). Measured at
// this gate's authoring against the pre-cure tree: row card 16px, ramp strip
// 6px, authoring well 16px (a card-scale corner one inset inside a card-scale
// corner), 18 chips 44×44 circles beside 9 chips 45×44 capsules.
//
// WHAT IT CHECKS (computed styles over the rendered panel, first interval open
// and its authoring well disclosed — the panel's whole element set):
//
//   1 · THE REGISTER IS DERIVED, not merely small. The panel root declares
//       `--easing-radius-outer`, `--easing-radius-inner` and `--easing-inset`;
//       the gate resolves all three to pixels and requires
//       inner === outer − inset (±0.5px), and that the rows' content inset IS
//       `--easing-inset` (read off the row body's computed padding).
//   2 · EVERY PAINTED ROUNDED SURFACE is a register member: its radius is the
//       outer rung, the inner rung, or it is a CIRCLE (|w − h| < 0.5px and a
//       radius ≥ half its side). A capsule (a pill that is not a circle) is
//       neither and REDS — that is the 45×44 chip beside the 44×44 one.
//   3 · ADJACENCY: a surface nested inside a row carries the INNER rung, never
//       the outer — the card-scale-inside-card-scale corner REDS even though
//       16px is a register member.
//   READ, NEVER SILENTLY SKIPPED — two element classes the panel does not own
//   are printed with their radius and their owner, and are not failures:
//     · the readout rail's own controls (`.readout-rail` descendants): gate d2
//       routed the readout's look to the dated glass-forward ask and bans a
//       local restyle (W6·127: "gate d2's field-primitive decision governs the
//       readout row these buttons sit in"). The rail ITSELF is a member (2/3).
//     · producer internals of <EasingPicker> other than its well: glass's own
//       control register (glass-first law, M-14 cl.1). The WELL is seat-owned
//       (EasingAuthoringStage's Law 2) and is measured.
//   NEGATIVE CONTROL (printed every run): the classifier must RED the two
//   adjudicated shapes — a 45×44 capsule, and a 16px corner nested in a row.
//
// Exit 0 = GREEN. Exit 1 = RED.

import { chromium } from "playwright";

const ORIGIN = process.env.EASING_RADIUS_ORIGIN ?? "http://localhost:9002";
const fails = [];

/** The classifier — pure, so the negative control exercises the same code. */
function classify(el, reg) {
    const r = el.radius;
    const circle = Math.abs(el.w - el.h) < 0.5 && r >= Math.min(el.w, el.h) / 2 - 0.5;
    if (circle) return "circle";
    const near = (a, b) => Math.abs(a - b) <= 0.5;
    if (el.nested) return near(r, reg.inner) ? "inner" : null;
    if (near(r, reg.outer)) return "outer";
    if (near(r, reg.inner)) return "inner";
    return null;
}

const CONTROL_REG = { outer: 16, inner: 6 };
const capsule = classify({ radius: 9999, w: 45, h: 44, nested: true }, CONTROL_REG);
const cardInCard = classify({ radius: 16, w: 436, h: 226, nested: true }, CONTROL_REG);
console.log(
    `negative control: 45×44 capsule → ${capsule ?? "FAIL"} · 16px corner nested in a row → ${cardInCard ?? "FAIL"}`,
);
if (capsule !== null || cardInCard !== null)
    fails.push("negative control: the classifier admits an adjudicated RED shape");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${ORIGIN}/#/gradient`);
const panel = page.locator(".easing-panel:visible").first();
await panel.waitFor({ timeout: 15000 });
const head = panel.locator("button.interval-head").first();
if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
await panel.locator('button[aria-label="Author a custom curve"]').first().click();
await page.waitForTimeout(600);

const census = await panel.evaluate((root) => {
    const px = (expr) => {
        const probe = document.createElement("div");
        probe.style.width = expr;
        root.appendChild(probe);
        const w = probe.getBoundingClientRect().width;
        probe.remove();
        return w;
    };
    const reg = {
        outer: px("var(--easing-radius-outer)"),
        inner: px("var(--easing-radius-inner)"),
        inset: px("var(--easing-inset)"),
    };
    const body = root.querySelector(".easing-row-body");
    const bodyInset = body ? parseFloat(getComputedStyle(body).paddingLeft) : NaN;
    const picker = root.querySelector('[data-testid="easing-picker"]');
    const els = [];
    for (const el of root.querySelectorAll("*")) {
        const cs = getComputedStyle(el);
        const box = el.getBoundingClientRect();
        if (box.width === 0 || cs.display === "none" || cs.visibility === "hidden")
            continue;
        const painted =
            cs.backgroundColor !== "rgba(0, 0, 0, 0)" ||
            cs.backgroundImage !== "none" ||
            parseFloat(cs.borderTopWidth) > 0 ||
            cs.boxShadow !== "none";
        const raw = cs.borderTopLeftRadius;
        const radius = raw.endsWith("%")
            ? (parseFloat(raw) / 100) * Math.min(box.width, box.height)
            : parseFloat(raw);
        if (!painted || !(radius > 0)) continue;
        const inReadout = !!el.parentElement?.closest(".readout-rail");
        const inPicker =
            !!picker && picker.contains(el) && !el.classList.contains("glass-card");
        els.push({
            tag: `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join(".")}`,
            label: el.getAttribute("aria-label") ?? "",
            radius: Math.min(radius, 9999),
            w: Math.round(box.width * 10) / 10,
            h: Math.round(box.height * 10) / 10,
            nested: !!el.parentElement?.closest(".easing-row"),
            owner: inReadout ? "d2-ask" : inPicker ? "producer" : "panel",
        });
    }
    return { reg, bodyInset, els };
});
await browser.close();

const { reg, bodyInset, els } = census;
console.log(
    `register: outer ${reg.outer}px · inner ${reg.inner}px · inset ${reg.inset}px · row-body inset ${bodyInset}px`,
);
if (!(reg.outer > 0 && reg.inner > 0))
    fails.push(
        "the panel declares no register (--easing-radius-outer / --easing-radius-inner unresolved)",
    );
if (Math.abs(reg.inner - (reg.outer - reg.inset)) > 0.5)
    fails.push(
        `inner ${reg.inner} ≠ outer ${reg.outer} − inset ${reg.inset}: the rungs are not derived`,
    );
if (Math.abs(bodyInset - reg.inset) > 0.5)
    fails.push(
        `the rows' content inset ${bodyInset}px is not --easing-inset ${reg.inset}px`,
    );

const tally = new Map();
for (const el of els) {
    const verdict = el.owner === "panel" ? classify(el, reg) : `read:${el.owner}`;
    const key = `${el.owner.padEnd(8)} ${verdict ?? "FAIL"}  ${el.tag} r=${el.radius}px ${el.w}×${el.h}`;
    tally.set(key, (tally.get(key) ?? 0) + 1);
    if (el.owner === "panel" && verdict === null) {
        fails.push(
            `${el.tag} (${el.label || "no label"}) r=${el.radius}px ${el.w}×${el.h}${el.nested ? " nested in a row" : ""} derives from no rung and is not a circle`,
        );
    }
}
for (const [k, n] of tally) console.log(`  ${String(n).padStart(3)} × ${k}`);
const panelCount = els.filter((e) => e.owner === "panel").length;
console.log(
    `panel surfaces measured: ${panelCount} · read-only (d2-ask / producer): ${els.length - panelCount}`,
);
if (panelCount < 5)
    fails.push(
        `only ${panelCount} panel surfaces measured — the panel did not render its element set`,
    );

if (fails.length) {
    console.error(
        "GATE d1 (easing radius) — RED\n" + fails.map((f) => "  " + f).join("\n"),
    );
    process.exit(1);
}
console.log("GATE d1 (easing radius) — GREEN");
