/**
 * GATE G3 — the stop seat: no destructive overlap, a real value-control contract,
 * a reserved footprint, and an add gesture that does not starve.
 *
 * Asserted product properties:
 *   G3a  (COARSE) no pixel inside a stop handle's own advertised hit region is claimed by
 *        the destructive remove control. Overlap set must be empty.
 *   G3b  (COARSE) tapping 20px below a SELECTED handle's centre does not change the stop count.
 *   G3c  the handle carries a value-control contract: role, aria-valuenow/min/max, an
 *        aria-valuetext naming identity + percentage + ordinal, and an explicit selected state.
 *   G3d  the keyboard grammar of VISUAL-CONSTITUTION §5.2 is complete: Home->0%, End->100%,
 *        ArrowUp/ArrowDown at the same signed step as Left/Right.
 *   G3e  the remove chip reserves its own block-axis footprint: the editor root's border box
 *        contains the chip's border box, and the chip never paints over the next section rule.
 *   G3f  with 12 stops on the rail, at least 60% of the rail can still mint a stop, and a
 *        click 3px inside the rail's left edge mints one.
 *
 * Input that makes each RED today is printed with the failure.
 *
 * ENV: playwright-webkit; COARSE cell = the iPhone 14 device descriptor (pointer: coarse,
 * --touch-target 2.75rem). Per I-20 this cell says NOTHING about real Safari 26.4
 * (safaridriver on :4599 is a separate evidence cell). Dev server :9000, API-LESS —
 * this gate reads no data-backed surface.
 *
 * Exit 0 = GREEN. Exit 1 = RED.
 */
import { webkit, devices } from "playwright";

const URL = process.env.GRADIENT_URL ?? "http://localhost:9000/#/gradient";
const fails = [];
const b = await webkit.launch();

// ── COARSE cell: G3a, G3b ──
{
    const ctx = await b.newContext({ ...devices["iPhone 14"] });
    const p = await ctx.newPage();
    await p.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
    await p.waitForTimeout(2600);
    const g = await p.evaluate(() => { const r = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    await p.mouse.click(g.x + g.w * 0.5, g.y + g.h / 2); await p.waitForTimeout(450);
    const mid = await p.evaluate(() => { const h = [...document.querySelectorAll("[data-stop-id]")][1]; const r = h.getBoundingClientRect(); return { cx: r.x + r.width / 2, cy: r.y + r.height / 2 }; });
    await p.mouse.click(mid.cx, mid.cy); await p.waitForTimeout(500);

    const map = await p.evaluate(() => {
        const h = [...document.querySelectorAll("[data-stop-id]")][1];
        const r = h.getBoundingClientRect();
        const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
        const rows = [];
        for (let d = -40; d <= 70; d++) {
            const el = document.elementFromPoint(cx, cy + d);
            const kind = !el ? "none"
                : (el.getAttribute && el.getAttribute("data-stop-id")) ? "HANDLE"
                : (el.classList && el.classList.contains("rail-remove-chip")) ? "REMOVE"
                : "other";
            rows.push([d, kind]);
        }
        const chip = document.querySelector(".rail-remove-chip");
        const cr = chip && chip.getBoundingClientRect();
        const handleAdvertised = (() => {
            const cs = getComputedStyle(h, "::before");
            return { w: cs.width, h: cs.height };
        })();
        return { rows, chipVisualOffsets: cr ? [+(cr.y - cy).toFixed(1), +(cr.y + cr.height - cy).toFixed(1)] : null, handleAdvertised, coarse: matchMedia("(pointer: coarse)").matches };
    });
    const span = (k) => { const f = map.rows.filter((r) => r[1] === k).map((r) => r[0]); return f.length ? [f[0], f[f.length - 1]] : null; };
    const hs = span("HANDLE"), rs = span("REMOVE");
    // The handle's OWN advertised region is its ::before box, centred: ±half of it.
    const halfAdv = Math.round(parseFloat(map.handleAdvertised.h) / 2);
    if (rs && hs) {
        const claimedInsideHandle = map.rows.filter((r) => r[1] === "REMOVE" && Math.abs(r[0]) <= halfAdv).map((r) => r[0]);
        if (claimedInsideHandle.length) {
            fails.push(`G3a  COARSE: the destructive remove control claims ${claimedInsideHandle.length}px of the SELECTED handle's own advertised ${map.handleAdvertised.h} hit region (offsets ${claimedInsideHandle[0]}..${claimedInsideHandle[claimedInsideHandle.length - 1]} from the handle centre). The remove control's painted box starts at offset ${map.chipVisualOffsets?.[0]}, so offsets ${claimedInsideHandle[0]}..${Math.min(map.chipVisualOffsets?.[0] ?? 0, claimedInsideHandle[claimedInsideHandle.length - 1])} are INVISIBLE and destructive.`);
        }
    }
    const before = await p.evaluate(() => document.querySelectorAll("[data-stop-id]").length);
    await p.mouse.click(mid.cx, mid.cy + 20); await p.waitForTimeout(500);
    const afterN = await p.evaluate(() => document.querySelectorAll("[data-stop-id]").length);
    if (afterN !== before) fails.push(`G3b  COARSE: a tap 20px below the SELECTED handle's centre changed the stop count ${before} -> ${afterN} (the stop was deleted; no undo, no confirmation, no painted control at that pixel)`);
    await p.close(); await ctx.close();
}

// ── FINE cell: G3c, G3d, G3e, G3f ──
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
    await p.waitForTimeout(2400);

    const a11y = await p.evaluate(() => {
        const h = document.querySelector("[data-stop-id]");
        return { role: h.getAttribute("role"), valuenow: h.getAttribute("aria-valuenow"), valuemin: h.getAttribute("aria-valuemin"), valuemax: h.getAttribute("aria-valuemax"), valuetext: h.getAttribute("aria-valuetext"), pressed: h.getAttribute("aria-pressed"), selected: h.getAttribute("aria-selected"), label: h.getAttribute("aria-label") };
    });
    const missing = Object.entries({ role: a11y.role, "aria-valuenow": a11y.valuenow, "aria-valuemin": a11y.valuemin, "aria-valuemax": a11y.valuemax, "aria-valuetext": a11y.valuetext }).filter(([, v]) => v === null).map(([k]) => k);
    if (missing.length) fails.push(`G3c  the stop handle is a bare <button> impersonating a value control: missing ${missing.join(", ")} (accessible name is ${JSON.stringify(a11y.label)} — no ordinal, no total)`);
    if (a11y.pressed === null && a11y.selected === null) fails.push(`G3c  selection has no programmatic representation: aria-pressed and aria-selected are both absent. With exactly 2 stops the remove chip is suppressed (removable = stops.length > 2), so the ONLY selected-state cue is scale(1.25) + a border-alpha change.`);

    for (const [key, want] of [["Home", 0], ["End", 100], ["ArrowUp", 1], ["ArrowDown", -1]]) {
        await p.reload({ waitUntil: "networkidle" }); await p.waitForTimeout(1600);
        await p.evaluate(() => document.querySelector("[data-stop-id]").focus());
        const before = await p.evaluate(() => document.querySelector("[data-stop-id]").style.left);
        await p.keyboard.press(key); await p.waitForTimeout(150);
        const after = await p.evaluate(() => document.querySelector("[data-stop-id]").style.left);
        if (before === after) fails.push(`G3d  key "${key}" is a no-op on a focused stop handle (VISUAL-CONSTITUTION §5.2 requires Home=0%, End=100% and Up/Down at the same signed step; expected ${want}%). style.left stayed ${JSON.stringify(before)}.`);
    }

    await p.reload({ waitUntil: "networkidle" }); await p.waitForTimeout(2200);
    {
        const g = await p.evaluate(() => { const r = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
        await p.mouse.click(g.x + g.w * 0.5, g.y + g.h / 2); await p.waitForTimeout(300);
        const mid = await p.evaluate(() => { const h = [...document.querySelectorAll("[data-stop-id]")][1]; const r = h.getBoundingClientRect(); return { cx: r.x + r.width / 2, cy: r.y + r.height / 2 }; });
        await p.mouse.click(mid.cx, mid.cy); await p.waitForTimeout(400);
        const geo = await p.evaluate(() => {
            const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
            const root = bar.parentElement;
            const chip = document.querySelector(".rail-remove-chip");
            const hr = document.querySelector("hr");
            if (!chip) return null;
            const rr = root.getBoundingClientRect(), cr = chip.getBoundingClientRect(), hrr = hr && hr.getBoundingClientRect();
            const overRule = hrr ? document.elementFromPoint(cr.x + cr.width / 2, hrr.y + 0.5) : null;
            return { rootBottom: +(rr.y + rr.height).toFixed(1), chipBottom: +(cr.y + cr.height).toFixed(1), chipTop: +cr.y.toFixed(1), ruleY: hrr ? +hrr.y.toFixed(1) : null, overRule: overRule ? overRule.tagName + "." + String(overRule.className).split(" ")[0] : null };
        });
        if (geo && geo.chipBottom > geo.rootBottom) fails.push(`G3e  the remove control has no block-axis reservation: the editor root's box ends at y=${geo.rootBottom} while the chip's box ends at y=${geo.chipBottom} (${(geo.chipBottom - geo.rootBottom).toFixed(1)}px outside), so it consumes the parent's flex gap.`);
        if (geo && geo.overRule && geo.overRule.startsWith("BUTTON")) fails.push(`G3e  the remove control paints over the next section's rule: elementFromPoint at the <hr>'s own y (${geo.ruleY}) under the chip returns ${geo.overRule}. PROPORTION-AUDIT §5.3 — footprints reserve collision space only on the axis where collision exists.`);
    }

    await p.reload({ waitUntil: "networkidle" }); await p.waitForTimeout(2200);
    {
        const g = await p.evaluate(() => { const r = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
        const n0 = await p.evaluate(() => document.querySelectorAll("[data-stop-id]").length);
        await p.mouse.click(g.x + 3, g.y + g.h / 2); await p.waitForTimeout(400);
        const n1 = await p.evaluate(() => document.querySelectorAll("[data-stop-id]").length);
        if (n1 === n0) fails.push(`G3f  a click 3px inside the rail's left edge mints nothing (n stayed ${n0}) — with only 2 stops the terminal handle's always-on hit expander already owns the end of the rail, and there is no other add path (no numeric entry, no add button).`);

        for (const f of [0.12, 0.2, 0.28, 0.36, 0.44, 0.52, 0.6, 0.72, 0.8, 0.88]) { await p.mouse.click(g.x + g.w * f, g.y + g.h / 2); await p.waitForTimeout(150); }
        const addable = await p.evaluate(() => {
            const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
            const r = bar.getBoundingClientRect(), cy = r.y + r.height / 2;
            let n = 0;
            for (let x = 0; x < Math.floor(r.width); x++) if (document.elementFromPoint(r.x + x + 0.5, cy) === bar) n++;
            return { total: Math.round(r.width), addable: n, pct: +(n / r.width * 100).toFixed(1), stops: bar.querySelectorAll("[data-stop-id]").length };
        });
        if (addable.pct < 60) fails.push(`G3f  with ${addable.stops} stops, only ${addable.addable}px of the ${addable.total}px rail (${addable.pct}%) can still mint a stop — the handles' always-on hit expanders mask ${(100 - addable.pct).toFixed(1)}% of the add gesture, with no indication of why it stopped working.`);
    }
    await p.close(); await ctx.close();
}

await b.close();
if (fails.length) { console.error("GATE G3 (stop seat) — RED\n" + fails.map((f) => "  " + f).join("\n")); process.exit(1); }
console.log("GATE G3 (stop seat) — GREEN");
