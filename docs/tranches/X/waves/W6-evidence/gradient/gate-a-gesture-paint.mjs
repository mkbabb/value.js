// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W6 · X.W6.a — GESTURE AND PAINT GATE, built at this seat.
 *
 * WHY THIS FILE EXISTS. The wave's named instruments for a5/a6/a7 are
 * `…/probes/wb-gradient-stopeditor/gate-gesture.mjs` and for a3/a4
 * `…/gate-axis.mjs`. Both are STALE AT THE BYTES and cannot run at all — not
 * RED for the defect, UNRUNNABLE — because a sibling X wave re-authored the
 * DOM they address AFTER the W6 spec's 2026-08-03 stamp:
 *
 *   ⟨cmd⟩ node …/gate-axis.mjs
 *     → page.evaluate: TypeError: null is not an object
 *       (evaluating 'h.getAttribute("aria-label").match(/([\d.]+)%/)[1]')   :35
 *   ⟨cmd⟩ node …/gate-gesture.mjs
 *     → locator.boundingBox: Timeout 30000ms exceeded.
 *       waiting for locator('button[data-stop-id][aria-label="Gradient stop at 0%"]')
 *
 * X-W4 · C2 moved the stop's PERCENTAGE off the accessible NAME (now
 * "Gradient stop 1 of 2") and onto `aria-valuenow` / `aria-valuetext`, which is
 * the correct ARIA split — a drag must re-announce a VALUE, not rename its
 * control every frame. Both instruments parse the percentage out of the name,
 * so neither can ever go green against the shipped tree, and §4's Bounds law
 * makes them `execute, no write` for this unit.
 *
 * WHAT THIS FILE DOES. It holds the SAME properties, with the SAME tolerances,
 * reading the ordinal from `aria-valuenow` (the model's exact value) and the
 * geometry from `style.left` — strictly more precise than the whole-percent
 * name the originals parsed. a3/a4/a12 ride the smoke suite instead
 * (`o21-gradient-rail.spec.ts`, three ADDED specs); this file carries a5, a6,
 * a7, a8, a10, a11 at 1440×900 chromium and a9 in the coarse webkit cell.
 *
 * ENV: a FRESHLY started dev server (STALE-SERVER law). API-LESS.
 * Exit 0 = GREEN. Exit 1 = RED, with every failing arm printed.
 *
 *   node docs/tranches/X/waves/W6-evidence/gradient/gate-a-gesture-paint.mjs
 */
import { chromium, webkit, devices } from "playwright";

const URL = process.env.GRADIENT_URL ?? "http://localhost:9000/#/gradient";
const DEAD_ZONE = 4; // the component's own gesture dead zone, in CSS px
const fails = [];
const notes = [];

const ready = async (p) => {
    await p.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
    await p.waitForSelector("[data-stop-id]", { timeout: 20000 });
    await p.waitForTimeout(900);
};

const bar = (p) => p.locator('[data-testid="gradient-stop-bar"]').last();
const handles = (p) => bar(p).locator("[data-stop-id]");
const ordinals = (p) =>
    handles(p).evaluateAll((els) => els.map((e) => Number(e.getAttribute("aria-valuenow"))));

// ─────────────────────────────────────────────────────────────── chromium cell
{
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    const errs = [];
    p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
    await ready(p);

    // ── a5 — A GRAB IS NOT A TELEPORT ──────────────────────────────────────
    // The adjudicated RED: an 8px-off-centre press plus 1px of travel moved the
    // handle 10.11px and relabelled the stop 0% → 2%.
    {
        const first = handles(p).first();
        const fb = await first.boundingBox();
        const cx = fb.x + fb.width / 2;
        const cy = fb.y + fb.height / 2;

        await p.mouse.move(cx + 8, cy);
        await p.mouse.down();
        await p.mouse.move(cx + 9, cy);
        await p.waitForTimeout(120);
        const inside = await handles(p).first().boundingBox();
        const insideTravel = inside.x + inside.width / 2 - cx;

        // …and a REAL drag travels with the pointer, offset and all.
        await p.mouse.move(cx + 128, cy, { steps: 8 });
        await p.waitForTimeout(120);
        const far = await handles(p).first().boundingBox();
        const farTravel = far.x + far.width / 2 - cx;
        await p.mouse.up();

        notes.push(
            `a5 grab-offset 8px: travel@1px=${insideTravel.toFixed(2)}px  travel@120px=${farTravel.toFixed(2)}px`,
        );
        if (Math.abs(insideTravel) > DEAD_ZONE) {
            fails.push(
                `a5  an 8px-off-centre grab with 1px of pointer travel moved the stop ${insideTravel.toFixed(2)}px (dead zone ${DEAD_ZONE}px)`,
            );
        }
        // The grab offset must not be added to the travel: 120px of pointer
        // travel is 120px of stop travel, never 128.
        if (Math.abs(farTravel - 120) > 3) {
            fails.push(
                `a5  120px of pointer travel moved the stop ${farTravel.toFixed(2)}px — the grab offset is being added to the position`,
            );
        }
    }

    // ── a6 — POINTER SELECT FOCUSES ────────────────────────────────────────
    // The adjudicated RED: activeElement = BODY after a real click; two
    // ArrowRight presses had no effect.
    await ready(p);
    {
        const last = handles(p).last();
        const lb = await last.boundingBox();
        await p.mouse.click(lb.x + lb.width / 2, lb.y + lb.height / 2);
        await p.waitForTimeout(150);
        const active = await p.evaluate(() => {
            const a = document.activeElement;
            return { tag: a?.tagName ?? null, stop: a?.getAttribute?.("data-stop-id") ?? null };
        });
        const before = await ordinals(p);
        await p.keyboard.press("ArrowLeft");
        await p.keyboard.press("ArrowLeft");
        await p.waitForTimeout(150);
        const after = await ordinals(p);

        notes.push(`a6 activeElement=${active.tag}/${active.stop ?? ""}  ${JSON.stringify(before)} → ${JSON.stringify(after)}`);
        if (active.tag !== "BUTTON" || active.stop === null) {
            fails.push(`a6  a real mouse click left focus on ${active.tag} — the handle is not the seat the pointer selects`);
        }
        if (JSON.stringify(before) === JSON.stringify(after)) {
            fails.push(`a6  ArrowLeft after a pointer click moved nothing (${JSON.stringify(after)})`);
        }
    }

    // ── a7 — ONLY THE PRIMARY BUTTON MINTS; CANCEL ONLY DISARMS ────────────
    // The adjudicated RED: middle-click 2→3, right-click 3→4.
    await ready(p);
    {
        const rb = await bar(p).boundingBox();
        const before = (await ordinals(p)).length;

        await p.mouse.click(rb.x + rb.width * 0.3, rb.y + 4, { button: "middle" });
        await p.waitForTimeout(200);
        const afterMiddle = (await ordinals(p)).length;

        await p.mouse.click(rb.x + rb.width * 0.62, rb.y + 4, { button: "right" });
        await p.waitForTimeout(200);
        await p.keyboard.press("Escape");
        const afterRight = (await ordinals(p)).length;

        // A cancelled press INSIDE the dead zone must mint nothing (§12).
        await p.evaluate((sel) => {
            const el = document.querySelector(sel);
            const r = el.getBoundingClientRect();
            const opts = { bubbles: true, pointerId: 77, pointerType: "touch", isPrimary: true, button: 0, clientX: r.x + r.width * 0.45, clientY: r.y + 4 };
            el.dispatchEvent(new PointerEvent("pointerdown", opts));
            el.dispatchEvent(new PointerEvent("pointercancel", opts));
        }, '[data-testid="gradient-stop-bar"]');
        await p.waitForTimeout(200);
        const afterCancel = (await ordinals(p)).length;

        notes.push(`a7 stops: before=${before} middle=${afterMiddle} right=${afterRight} cancel=${afterCancel}`);
        if (afterMiddle !== before) fails.push(`a7  a middle-click minted a stop (${before} → ${afterMiddle})`);
        if (afterRight !== before) fails.push(`a7  a right-click minted a stop (${before} → ${afterRight})`);
        if (afterCancel !== before) fails.push(`a7  a cancelled press minted a stop (${before} → ${afterCancel})`);
    }

    // ── a8 — ONE GESTURE, ONE OWNER: one pointermove = ONE position write ──
    // The adjudicated RED: 2 emits per move (the bar's fallback path fired
    // alongside the captured handle's own handler).
    await ready(p);
    {
        const rbox = await bar(p).boundingBox();
        await p.mouse.click(rbox.x + rbox.width * 0.5, rbox.y + rbox.height / 2);
        await p.waitForTimeout(250);
        const mid = handles(p).nth(1);
        const mb = await mid.boundingBox();

        await p.evaluate(() => {
            window.__valueWrites = 0;
            const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
            new MutationObserver((rs) => {
                window.__valueWrites += rs.filter((r) => r.attributeName === "aria-valuenow").length;
            }).observe(bar, { subtree: true, attributes: true, attributeFilter: ["aria-valuenow"] });
        });

        await p.mouse.move(mb.x + mb.width / 2, mb.y + mb.height / 2);
        await p.mouse.down();
        // Clear the dead zone first, then take exactly FIVE further moves.
        await p.mouse.move(mb.x + mb.width / 2 + 20, mb.y + mb.height / 2);
        await p.waitForTimeout(120);
        await p.evaluate(() => (window.__valueWrites = 0));
        for (let i = 1; i <= 5; i++) {
            await p.mouse.move(mb.x + mb.width / 2 + 20 + i * 9, mb.y + mb.height / 2);
            await p.waitForTimeout(70);
        }
        await p.mouse.up();
        const writes = await p.evaluate(() => window.__valueWrites);

        notes.push(`a8 aria-valuenow writes over 5 pointermoves: ${writes}`);
        if (writes > 5) {
            fails.push(`a8  five pointermoves produced ${writes} position writes — one gesture has more than one owner`);
        }
    }

    // ── a10 — THE CHIP RESERVES ITS OWN GROUND ─────────────────────────────
    // The adjudicated RED: the chip painted y 244.7→268.7 across the hr at
    // 260.7, and elementFromPoint at the rule returned the chip.
    await ready(p);
    {
        await handles(p).nth(0).click();
        await p.waitForTimeout(250);
        const verdict = await p.evaluate(() => {
            const chip = document.querySelector('[aria-label="Remove selected stop"]');
            if (!chip) return { chip: null };
            const c = chip.getBoundingClientRect();
            const hits = [];
            for (const rule of document.querySelectorAll("hr")) {
                const r = rule.getBoundingClientRect();
                if (r.bottom > c.top && r.top < c.bottom && r.right > c.left && r.left < c.right) {
                    hits.push({ ruleY: +r.top.toFixed(1), chip: [+c.top.toFixed(1), +c.bottom.toFixed(1)] });
                }
            }
            return { chip: [+c.top.toFixed(1), +c.bottom.toFixed(1)], hits };
        });
        notes.push(`a10 chip band ${JSON.stringify(verdict.chip)}  rules intersected: ${verdict.hits ? verdict.hits.length : "n/a"}`);
        if (!verdict.chip) fails.push("a10  no remove chip appeared for a selected stop");
        else if (verdict.hits.length > 0) {
            fails.push(`a10  the chip's border box crosses ${verdict.hits.length} sibling rule(s): ${JSON.stringify(verdict.hits)}`);
        }
    }

    // ── a11 — CONTRAST FLOOR ON THE WHITE RAMP ─────────────────────────────
    // The adjudicated RED: #ffffff→#fafafa gave ring:fill 1.00:1 — the handles
    // were invisible (committed shot D-03-white-ramp-handles.png).
    await ready(p);
    {
        const editor = p.getByRole("textbox", { name: "Gradient CSS" }).last();
        await editor.scrollIntoViewIfNeeded();
        await editor.click();
        await p.keyboard.press("ControlOrMeta+a");
        await p.keyboard.type("linear-gradient(90deg, #ffffff 0%, #fafafa 100%)", { delay: 3 });
        await p.waitForTimeout(900);

        const ratios = await p.evaluate(() => {
            const srgb = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
            const lum = ([r, g, b]) => 0.2126 * srgb(r / 255) + 0.7152 * srgb(g / 255) + 0.0722 * srgb(b / 255);
            const ratio = (a, b) => {
                const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
                return (x + 0.05) / (y + 0.05);
            };
            const parse = (s) => {
                const m = s.match(/rgba?\(([^)]+)\)/);
                if (!m) return null;
                const n = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
                return { rgb: n.slice(0, 3), a: n.length > 3 ? n[3] : 1 };
            };
            const over = (fg, bg) => fg.rgb.map((c, i) => c * fg.a + bg[i] * (1 - fg.a));

            const css = getComputedStyle(document.documentElement);
            const inner = parse(css.getPropertyValue("--focus-ring-inner"));
            const outer = parse(css.getPropertyValue("--focus-ring-outer"));

            return [...document.querySelectorAll("[data-stop-id]")].map((h) => {
                const face = h.querySelector(".rail-handle-face") ?? h;
                const fr = face.getBoundingClientRect();
                // The fill under the ring is the stop's own colour; read it from
                // the ramp the rail paints at that handle's centre pixel — the
                // face's own background-image carries it as a flat layer.
                const fill = parse(getComputedStyle(face).backgroundImage.match(/rgba?\([^)]+\)/)?.[0] ?? "rgb(255,255,255)");
                const base = fill ? fill.rgb : [255, 255, 255];
                return {
                    ordinal: Number(h.getAttribute("aria-valuenow")),
                    width: +fr.width.toFixed(1),
                    innerRatio: +ratio(over(inner, base), base).toFixed(2),
                    outerRatio: +ratio(over(outer, base), base).toFixed(2),
                };
            });
        });

        notes.push(`a11 white-ramp ring:fill ${JSON.stringify(ratios)}`);
        for (const r of ratios) {
            const best = Math.max(r.innerRatio, r.outerRatio);
            if (best < 3) {
                fails.push(`a11  stop ${r.ordinal}% on the white ramp: best ring edge is ${best}:1 (floor 3:1)`);
            }
        }
        if (ratios.length === 0) fails.push("a11  no handles found on the white ramp");
    }

    if (errs.length) notes.push(`chromium pageerrors: ${JSON.stringify(errs)}`);
    await b.close();
}

// ──────────────────────────────────────────── webkit iPhone-14 (coarse) cell
{
    const b = await webkit.launch();
    const ctx = await b.newContext({ ...devices["iPhone 14"] });
    const p = await ctx.newPage();
    await ready(p);

    // ── a9 — NO TAP THAT GRABS MAY DELETE ──────────────────────────────────
    // The adjudicated RED: a tap at handle-centre + 20px removed a stop,
    // silently — the 8px band 234.7..242.7 sat inside the rail, unpainted.
    const rbox = await bar(p).boundingBox();
    await p.touchscreen.tap(rbox.x + rbox.width * 0.5, rbox.y + rbox.height / 2);
    await p.waitForTimeout(400);
    const before = (await ordinals(p)).length;

    const mid = await handles(p).nth(1).boundingBox();
    const cx = mid.x + mid.width / 2;
    const cy = mid.y + mid.height / 2;
    await p.touchscreen.tap(cx, cy); // select, so the chip is on screen
    await p.waitForTimeout(400);

    // The property is DISJOINTNESS: no point inside the handle's OWN advertised
    // coarse target may be claimed by the destructive control. The census reads
    // that directly (and non-destructively) with `elementFromPoint`, so the gate
    // measures the whole band rather than stopping at the first casualty.
    const census = await p.evaluate(
        ({ cx, cy }) => {
            // Read the RESOLVED inflated box off the pseudo-element itself.
            // `getPropertyValue("--rail-touch")` hands back the token text
            // (`var(--touch-target, 2.75rem)`), which `parseFloat` would turn
            // into 2.75 — a one-pixel scan, i.e. a vacuous green.
            const handle = document.querySelectorAll("[data-stop-id]")[1];
            const reach = parseFloat(getComputedStyle(handle, "::before").height);
            if (!Number.isFinite(reach) || reach < 24) {
                return { touchPx: reach, halfPx: null, claimedByChip: null, chipCentre: null };
            }
            const half = Math.floor(reach / 2);
            const claimed = [];
            for (let dy = 0; dy <= half; dy += 1) {
                const el = document.elementFromPoint(cx, cy + dy);
                if (el && el.closest('[aria-label="Remove selected stop"]')) claimed.push(dy);
            }
            const chip = document
                .querySelector('[aria-label="Remove selected stop"]')
                .getBoundingClientRect();
            return {
                touchPx: reach,
                halfPx: half,
                claimedByChip: claimed,
                chipCentre: { x: chip.x + chip.width / 2, y: chip.y + chip.height / 2 },
            };
        },
        { cx, cy },
    );

    notes.push(
        `a9 coarse target ${census.touchPx}px (half ${census.halfPx}px); rows inside the handle's own target claimed by the destructive control: ${JSON.stringify(census.claimedByChip)}`,
    );
    if (census.claimedByChip === null) {
        fails.push(
            `a9  the handle's coarse hit region measured ${census.touchPx}px — the census would have scanned a band too small to mean anything, so this gate REFUSES to report green`,
        );
    } else if (census.claimedByChip.length > 0) {
        fails.push(
            `a9  the destructive control claims ${census.claimedByChip.length} row(s) inside the handle's own ${census.touchPx}px target (first at +${census.claimedByChip[0]}px) — a tap that grabs can delete`,
        );
    }

    // …and the chip must still be REACHABLE: disjointness cured by exile is not
    // a cure. One real tap at the chip's own centre removes exactly one stop.
    if (!census.chipCentre) {
        fails.push("a9  no remove chip was on screen for a selected stop");
        await b.close();
        report();
    }
    await p.touchscreen.tap(census.chipCentre.x, census.chipCentre.y);
    await p.waitForTimeout(400);
    const afterChip = (await ordinals(p)).length;
    notes.push(`a9 chip reachability: ${before} → ${afterChip} after a tap at the chip's own centre`);
    if (afterChip !== before - 1) {
        fails.push(`a9  the chip is not reachable on a coarse pointer (${before} → ${afterChip})`);
    }
    await b.close();
}

function report() {
    console.log(notes.map((n) => "  · " + n).join("\n"));
    if (fails.length) {
        console.error(
            "\nGATE X.W6.a (gesture + paint) — RED\n" + fails.map((f) => "  " + f).join("\n"),
        );
        process.exit(1);
    }
    console.log("\nGATE X.W6.a (gesture + paint) — GREEN");
    process.exit(0);
}

report();
