// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W6 · X.W6.b — THE SEAT / INSPECTOR / KEYBOARD GATE, built at this seat.
 *
 * WHY THIS FILE EXISTS. b1–b4's product properties are ALSO authored as four
 * ADDED specs in `e2e/smoke/oracles/o21-gradient-rail.spec.ts` (ADD-never-
 * replace). Measured at this seat's own clock, EVERY spec in that file and in
 * `e2e/smoke/views/gradient.spec.ts` — all 17 that predate this unit — fails
 * before its first assertion, at the shared fixture's
 * `getByRole("main", { name: "Color tool panes" })` binding, which resolves to
 * nothing at this HEAD. Reproduced in a CLEAN detached worktree at the wave's
 * own open commit `17734065`, i.e. with not one byte of this unit present, so
 * it is a pre-existing breakage owned by the shell (X-W5's landed composition
 * root, `de99ec15`) and not by this cure. `App.vue` and the e2e dock fixture
 * are both outside this unit's §4 writable set, so the honest act is to hold
 * the properties with an instrument built INSIDE the bounds — the same act
 * X.W6.a took when `gate-axis.mjs` / `gate-gesture.mjs` went stale.
 *
 * It drives the route directly (`#/gradient`), so it depends on no dock, no
 * pane fixture and no accessible name outside the instrument under test.
 *
 * ARMS
 *   b1  the keyboard grammar is TOTAL on an interior stop (Arrow/Page/Home/End
 *       all write), the seat carries role + aria-value* + an explicit selected
 *       state, and the ORDINAL is announced unconditionally in aria-valuetext.
 *       The terminal leg prints the axis bound honestly.
 *   b2  every ordinal of the ramp is mintable at 12 stops, at two rail widths,
 *       and a press 3px inside the rail's left edge mints.
 *   b3  numeric position entry round-trips to the painted ordinal within the
 *       axis tolerance (1 CSS px).
 *   b4  ONE removal owner: at the floor it is present, disabled, and carries
 *       its reason; above the floor it removes exactly one stop.
 *
 * ENV: a FRESHLY started dev server (STALE-SERVER law), chromium, API-LESS.
 * Exit 0 = GREEN. Exit 1 = RED, with every failing arm printed.
 *
 *   node docs/tranches/X/waves/W6-evidence/gradient/gate-b-seat-inspector.mjs
 */
import { chromium } from "playwright";

const URL = process.env.GRADIENT_URL ?? "http://localhost:9000/#/gradient";
const AXIS_TOL_PX = 1; // a3's stated tolerance, reused: entry ≡ paint
const fails = [];
const notes = [];

const ready = async (p) => {
    // A hash-only `goto` to the SAME url is a same-document navigation: the SPA
    // keeps its model and the next arm inherits the last arm's stops (measured
    // at this seat — an arm that expected 12 stops found 15). `reload` is the
    // one that actually re-seeds.
    if (p.url().startsWith("http")) await p.reload({ waitUntil: "networkidle" });
    else await p.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
    await p.waitForSelector("[data-stop-id]", { timeout: 20000 });
    await p.waitForTimeout(900);
};

const bar = (p) => p.locator('[data-testid="gradient-stop-bar"]').last();
const handles = (p) => bar(p).locator("[data-stop-id]");
const count = (p) => handles(p).count();
const seatOf = (p, id) => bar(p).locator(`[data-stop-id="${id}"]`);

/** The ramp's own add-surface census: a column counts when the topmost element
 *  at the ramp's centre row IS the ramp. */
const census = (p) =>
    bar(p).evaluate((el) => {
        const r = el.getBoundingClientRect();
        const cy = r.y + r.height / 2;
        let n = 0;
        for (let x = 0; x < Math.floor(r.width); x++) {
            if (document.elementFromPoint(r.x + x + 0.5, cy) === el) n++;
        }
        return { total: Math.round(r.width), addable: n };
    });

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
await ready(p);

// ── b1 — THE KEYBOARD GRAMMAR IS TOTAL, AND SELECTION IS PROGRAMMATIC ───────
{
    const box = await bar(p).boundingBox();
    await p.mouse.click(box.x + box.width * 0.5, box.y + box.height / 2);
    await p.waitForTimeout(250);
    if ((await count(p)) !== 3) fails.push(`b1  setup: expected 3 stops, got ${await count(p)}`);

    const id = await handles(p).nth(1).getAttribute("data-stop-id");
    const seat = seatOf(p, id);
    const valueNow = async () => Number(await seat.getAttribute("aria-valuenow"));

    for (const [key, want] of [
        ["ArrowUp", 51],
        ["ArrowDown", 50],
        ["ArrowRight", 51],
        ["ArrowLeft", 50],
        ["PageUp", 60],
        ["PageDown", 50],
        ["Home", 0],
        ["End", 100],
    ]) {
        await seat.focus();
        await p.keyboard.press(key);
        await p.waitForTimeout(120);
        const got = await valueNow();
        if (got !== want) fails.push(`b1  key "${key}" on an interior stop: want ${want}%, got ${got}%`);
    }
    notes.push("b1 interior stop answered all eight keys");

    const a11y = await seat.evaluate((el) => ({
        role: el.getAttribute("role"),
        valuemin: el.getAttribute("aria-valuemin"),
        valuemax: el.getAttribute("aria-valuemax"),
        valuetext: el.getAttribute("aria-valuetext"),
        selected: el.getAttribute("aria-selected"),
    }));
    notes.push(`b1 a11y ${JSON.stringify(a11y)}`);
    if (a11y.role !== "slider" || a11y.valuemin === null || a11y.valuemax === null) {
        fails.push(`b1  the seat is not a value control: ${JSON.stringify(a11y)}`);
    }
    if (a11y.selected === null) fails.push("b1  selection has no programmatic representation");
    if (!/^Stop \d+ of \d+, position /.test(a11y.valuetext ?? "")) {
        fails.push(`b1  the ordinal is not announced with the value: ${JSON.stringify(a11y.valuetext)}`);
    }

    // The terminal leg: the same grammar at the axis's end. Home and ArrowDown
    // on a stop already at 0% are bound and CORRECTLY inert — a value control
    // at its minimum cannot decrease — and the seat answers ArrowUp at once,
    // which is what tells a bound apart from an absent binding.
    const first = handles(p).first();
    const leftOf = () => first.evaluate((el) => el.style.left);
    const before = await leftOf();
    for (const key of ["Home", "ArrowDown"]) {
        await first.focus();
        await p.keyboard.press(key);
        await p.waitForTimeout(120);
        if ((await leftOf()) !== before) fails.push(`b1  "${key}" moved a stop already at the axis minimum`);
    }
    await first.focus();
    await p.keyboard.press("ArrowUp");
    await p.waitForTimeout(120);
    const after = Number(await first.getAttribute("aria-valuenow"));
    if (after !== 1) fails.push(`b1  the terminal seat did not answer ArrowUp (0% → ${after}%)`);
    notes.push(`b1 terminal bound: Home/ArrowDown inert at 0%, ArrowUp → ${after}%`);
}

// ── b2 — THE RAIL SEATS EVERY ADDABLE ORDINAL, AT ANY WIDTH ─────────────────
{
    await ready(p); // a clean seed: the b1 arm left three stops on the rail
    const box = await bar(p).boundingBox();
    for (const f of [0.12, 0.2, 0.28, 0.36, 0.44, 0.52, 0.6, 0.72, 0.8, 0.88]) {
        await p.mouse.click(box.x + box.width * f, box.y + box.height / 2);
        await p.waitForTimeout(90);
    }
    const n = await count(p);
    if (n !== 12) fails.push(`b2  setup: expected 12 stops, got ${n}`);

    for (const width of [1440, 390]) {
        await p.setViewportSize({ width, height: 900 });
        await p.waitForTimeout(250);
        const c = await census(p);
        notes.push(`b2 @${width}px viewport: addable ${c.addable}/${c.total} with ${n} stops`);
        if (c.addable !== c.total) {
            fails.push(
                `b2  at a ${width}px viewport only ${c.addable} of the rail's ${c.total} columns can mint — ${(c.total - c.addable)}px of addable ordinal is masked`,
            );
        }
    }

    await p.setViewportSize({ width: 1440, height: 900 });
    await p.waitForTimeout(250);
    const wide = await bar(p).boundingBox();
    const before = await count(p);
    await p.mouse.click(wide.x + 3, wide.y + wide.height / 2);
    await p.waitForTimeout(250);
    const after = await count(p);
    notes.push(`b2 meniscus press at bar.x+3: ${before} → ${after}`);
    if (after !== before + 1) fails.push(`b2  a press 3px inside the rail's left edge mints nothing (${before} → ${after})`);
}

// ── b3 — NUMERIC POSITION ENTRY ROUND-TRIPS TO THE PAINTED ORDINAL ──────────
{
    await ready(p);
    const box = await bar(p).boundingBox();
    await p.mouse.click(box.x + box.width * 0.5, box.y + box.height / 2);
    await p.waitForTimeout(250);
    await handles(p).nth(1).click();
    await p.waitForTimeout(200);
    const id = await handles(p).nth(1).getAttribute("data-stop-id");

    const entry = p.locator('[data-testid="gradient-stop-position"]');
    const subject = await p.evaluate(() => ({
        selected: document.querySelectorAll("[data-stop-id][aria-selected='true']").length,
        entryDisabled: document.querySelector('[data-testid="gradient-stop-position"]')?.disabled,
        entryValue: document.querySelector('[data-testid="gradient-stop-position"]')?.value,
    }));
    notes.push(`b3 inspector subject after selecting the interior stop: ${JSON.stringify(subject)}`);
    if ((await entry.count()) !== 1) {
        fails.push(`b3  the inspector has no numeric position entry (${await entry.count()} found)`);
    } else if (subject.entryDisabled) {
        fails.push(`b3  the entry is disabled with a stop selected: ${JSON.stringify(subject)}`);
    } else {
        await entry.fill("37.5");
        await p.waitForTimeout(250);
        const read = await seatOf(p, id).getAttribute("aria-valuenow");
        const skewPx = await bar(p).evaluate((el, stopId) => {
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            const inset = parseFloat(cs.getPropertyValue("--rail-inset"));
            const bl = parseFloat(cs.borderLeftWidth);
            const br = parseFloat(cs.borderRightWidth);
            const originX = r.x + bl + inset;
            const track = r.width - bl - br - inset * 2;
            const h = el.querySelector(`[data-stop-id="${stopId}"]`).getBoundingClientRect();
            return +(h.x + h.width / 2 - (originX + track * 0.375)).toFixed(3);
        }, id);
        notes.push(`b3 typed 37.5 → aria-valuenow ${read}, painted skew ${skewPx}px`);
        if (Number(read) !== 37.5) fails.push(`b3  entry did not reach the model (aria-valuenow ${read})`);
        if (Math.abs(skewPx) > AXIS_TOL_PX) {
            fails.push(`b3  entry and paint disagree by ${skewPx}px (tolerance ${AXIS_TOL_PX}px)`);
        }
    }
}

// ── b4 — ONE REMOVAL OWNER, AND A FLOOR THAT SAYS WHY ───────────────────────
{
    await ready(p);
    const removers = p.locator('[aria-label*="Remove" i], button:has-text("Remove")');
    const owners = await removers.count();
    notes.push(`b4 removal controls on the route: ${owners}`);
    if (owners !== 1) fails.push(`b4  ${owners} removal controls exist on the route — the owner is not one`);

    const remove = p.locator('[aria-label="Remove selected stop"]');
    // At the two-stop floor: present, refused, and saying why.
    await handles(p).first().click();
    await p.waitForTimeout(200);
    const floor = await remove.evaluate((el) => {
        const id = el.getAttribute("aria-describedby");
        const reason = id ? document.getElementById(id) : null;
        return {
            present: true,
            disabled: el.disabled,
            describedBy: id,
            reason: reason ? reason.textContent.trim() : null,
            visible: el.getBoundingClientRect().width > 0,
        };
    });
    notes.push(`b4 at the floor: ${JSON.stringify(floor)}`);
    if (!floor.visible) fails.push("b4  the floor is expressed as absence: the control is not rendered");
    if (!floor.disabled) fails.push("b4  at the two-stop floor the removal control is still enabled");
    if (!floor.reason) fails.push("b4  the disabled control carries no reason (aria-describedby resolves to nothing)");

    // Above the floor: the owner works, exactly once.
    const box = await bar(p).boundingBox();
    await p.mouse.click(box.x + box.width * 0.5, box.y + box.height / 2);
    await p.waitForTimeout(250);
    await handles(p).nth(1).click();
    await p.waitForTimeout(200);
    const before = await count(p);
    if (await remove.isDisabled()) fails.push("b4  above the floor the removal control is still disabled");
    await remove.click();
    await p.waitForTimeout(300);
    const after = await count(p);
    notes.push(`b4 above the floor: ${before} → ${after}`);
    if (after !== before - 1) fails.push(`b4  the owner did not remove exactly one stop (${before} → ${after})`);

    // …and it is back at the floor, still present, still refusing.
    await handles(p).first().click();
    await p.waitForTimeout(200);
    if (!(await remove.isDisabled())) fails.push("b4  back at the floor the control did not return to its refused state");
}

if (errs.length) fails.push(`page errors during the run: ${JSON.stringify(errs.slice(0, 3))}`);

await b.close();
for (const n of notes) console.log("  · " + n);
if (fails.length) {
    console.error("\nGATE X.W6.b (seat + inspector + keyboard) — RED\n" + fails.map((f) => "  " + f).join("\n"));
    process.exit(1);
}
console.log("\nGATE X.W6.b (seat + inspector + keyboard) — GREEN");
