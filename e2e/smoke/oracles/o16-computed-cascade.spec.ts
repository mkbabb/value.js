import { test, expect } from "@playwright/test";

/**
 * T.W0 W0-5 · O-16 — COMPUTED-CASCADE CENSUS (SYNTHESIS §6.1 O-16; §1.2 T-14).
 *
 * The ONLY oracle class that catches a DIST CLOBBER: token-level checks stay
 * green through it because the DECLARED token file is fine — the regression is a
 * later-cascade rule (glass-ui's shipped `components.css` ships Tailwind's
 * `:root { --default-transition-duration: 150ms }`; the ~46 interactive sites
 * that use the bare `transition` utility resolve to that dead 150ms instead of a
 * house liquid curve — t-transitions-liquid F1). So the census reads the
 * COMPUTED transition off live surfaces, not the declarations.
 *
 * ── R1 ROW BORN-RED (EXPECTED-RED, PKT-1 cite; T.W0.md §BOOKS): the `:root
 *    --default-transition-duration: 150ms` clobber is PRODUCER-ROOT (glass-ui
 *    dist, VERIFIED present). It goes live-green the day PKT-1 (P2) lands the
 *    dist fix. `test.fail()` records the honest EXPECTED-RED and is the tripwire
 *    that flips when PKT-1 lands. NOT softened — the computed read is real and
 *    the clobber is real. The explicitly-styled card surfaces already compute
 *    the liquid 0.3s curves (recorded below) — so the census also proves the
 *    house tokens are RIGHT and it is only the cascade DEFAULT that is dead.
 *
 * ── CURE: PKT-1 (P2 — the PKT-1 P0 clobber) at W5 (T-14, W5-1..3); O-16 arms
 *    fully at W5 (the full house-token congruence census, both schemes).
 */

const CLOBBER = "150ms"; // the dead :root --default-transition-duration (raw custom-prop value)

test("O-16 computed-cascade — the dist :root 150ms transition-default clobber is not live", async ({
    page,
}) => {
    // R1 EXPECTED-RED (PKT-1 producer-root). Remove test.fail when P2 lands the
    // dist fix and the cascade default clears. See the file docstring.
    test.fail();
    test.setTimeout(30_000);

    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    // The clobber SOURCE: the cascade default the ~46 dead sites resolve to.
    const defaultDur = await page.evaluate(() =>
        getComputedStyle(document.documentElement)
            .getPropertyValue("--default-transition-duration")
            .trim(),
    );
    console.log(`[O-16] :root --default-transition-duration = ${defaultDur}`);

    // The MANIFESTATION census: every card surface's computed transition (proves
    // the house tokens are the liquid curves, not the default).
    const cards = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[data-slot="card"]')).map((el) => {
            const cs = getComputedStyle(el as HTMLElement);
            return {
                surface: (el as HTMLElement).dataset.surface ?? "(none)",
                duration: cs.transitionDuration,
                timing: cs.transitionTimingFunction,
            };
        }),
    );
    for (const c of cards) {
        console.log(
            `[O-16] card surface=${c.surface} dur=${c.duration} timing=${c.timing}`,
        );
    }
    expect(cards.length, "O-16 found zero card surfaces to walk").toBeGreaterThan(0);

    // R1: the dead 150ms default is the producer-root clobber. It is present in
    // the shipped dist today (EXPECTED-RED); PKT-1/P2 clears it.
    expect(
        defaultDur,
        `the dist :root transition default is the dead ${CLOBBER} clobber (T-14/R1, cured by PKT-1/P2) — the ~46 bare-transition sites resolve to it instead of a house liquid curve`,
    ).not.toBe(CLOBBER);
});

/**
 * ── T.W5 — O-16 ARMS FULLY (the owned-rows census; T.W5.md §Hard gate 1+5).
 *
 * Every T.W5 Tranche-A row's COMPUTED transition duration/curve ≡ its
 * liquid-target column, read off the ACTUAL cascade (live elements where the
 * surface is unconditionally mounted; class-probe elements for utility/family
 * registers — the same computed read, so a dist clobber still trips it).
 * Both schemes walked (the motion tokens live at :root, but the census reads
 * the RESULT, never trusts the declaration).
 *
 * Row map (t-transitions-liquid §2 · the retune table of record):
 *   R2  pane-swap ENTER  — transform `--spring-snappy` @ 0.4s (own clock)
 *   R3  pane-swap LEAVE  — opacity+transform 0.2s `--ease-out`; STRICTLY
 *       shorter than the enter (the exit law, gate 5)
 *   R4  card cartoon     — translate/scale `--ease-cartoon-punch` @ 0.3s,
 *       box-shadow bezier @ 0.3s (the producer cartoon-surface register)
 *   R5  interactive scales — btn-interactive scale @ `--spring-smooth-duration`
 *       0.45s on `--transition-liquid-spatial`; rail-item press leg
 *       `--spring-press` @ 0.16s
 *   R8  skeleton settle  — the vj-morph enter family (transform snappy @ 0.4s)
 *   R11 .pane-shell nudge — transform liquid-spatial @ 0.45s
 *   R9  RECORDED, not gated here: the retime rides INSIDE W6-2's gradient
 *       re-author (T-46); this census owns the row's verification and flips
 *       to a hard assert when the re-authored instrument merges.
 *   R10 DISCHARGED BY EXCISION: the 0.55s PaletteDialog scrim died at W0-3
 *       (CC-6); live dialogs ride the producer bloom clock (F6 KEEP).
 *   R1  EXPECTED-RED above (PKT-1) — not re-asserted here.
 */

test("O-16 W5 census — every owned row's computed duration/curve ≡ its liquid target (both schemes)", async ({
    page,
}) => {
    test.setTimeout(45_000);
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    for (const scheme of ["light", "dark"] as const) {
        await page.evaluate((s) => {
            document.documentElement.classList.toggle("dark", s === "dark");
        }, scheme);

        const census = await page.evaluate(() => {
            /** Per-property legs of a computed transition. */
            const readLegs = (el: Element) => {
                const cs = getComputedStyle(el as HTMLElement);
                const props = cs.transitionProperty.split(", ");
                const durs = cs.transitionDuration.split(", ");
                const times = cs.transitionTimingFunction
                    // timing functions carry commas INSIDE linear()/
                    // cubic-bezier(); split at top level only.
                    .split(/,\s*(?![^()]*\))/);
                const legs: Record<
                    string,
                    { duration: string; timing: string }
                > = {};
                props.forEach((p, i) => {
                    legs[p] = {
                        duration: durs[i % durs.length] ?? "",
                        timing: (times[i % times.length] ?? "").trim(),
                    };
                });
                return legs;
            };

            // Class-probe: computed read through the REAL cascade (utility +
            // family registers) — a dist clobber trips it identically.
            const probe = (className: string) => {
                const el = document.createElement("div");
                el.className = className;
                document.body.appendChild(el);
                const legs = readLegs(el);
                el.remove();
                return legs;
            };

            // R2/R3 — the pane-swap legs on the REAL pane wrapper child
            // (direct-child scoped rules; the probe class rides the live
            // element so the `.pane-wrapper--* >` combinator binds).
            const wrapper = document.querySelector(".pane-wrapper--left");
            const pane = wrapper?.firstElementChild ?? null;
            let enter: ReturnType<typeof readLegs> | null = null;
            let leave: ReturnType<typeof readLegs> | null = null;
            if (pane) {
                pane.classList.add("vj-enter-enter-active");
                enter = readLegs(pane);
                pane.classList.remove("vj-enter-enter-active");
                pane.classList.add("vj-enter-leave-active");
                leave = readLegs(pane);
                pane.classList.remove("vj-enter-leave-active");
            }

            // R4 — the producer cartoon register (PaletteCard's root class
            // set); live card walked too when the wall has data.
            const cartoon = probe("cartoon-surface");
            const liveCards = Array.from(
                document.querySelectorAll("[role='article'].cartoon-surface"),
            ).map((el) => readLegs(el));

            // R5 — the btn-interactive atom + the live rail-item press leg +
            // the live send-btn.
            const btnAtom = probe("btn-interactive");
            const railItem = document.querySelector(".channel-rail-item");
            const rail = railItem ? readLegs(railItem) : null;
            const sendBtn = document.querySelector(".send-btn");
            const send = sendBtn ? readLegs(sendBtn) : null;

            // R8 — the vj-morph enter family (the settle's curve/clock).
            const morph = probe("vj-morph-enter-active");

            // R11 — the live .pane-shell nudge.
            const shell = document.querySelector(".pane-shell");
            const paneShell = shell ? readLegs(shell) : null;

            // R9 — RECORDED (handed across to W6-2): the current handle, if
            // this view hosts one (picker view: none — logged as absent).
            const r9 = document.querySelector("[class*='gradient-stop']");

            return {
                enter,
                leave,
                cartoon,
                liveCards,
                btnAtom,
                rail,
                send,
                morph,
                paneShell,
                r9Present: r9 != null,
            };
        });

        const log = (row: string, v: unknown) =>
            console.log(`[O-16·W5·${scheme}] ${row}: ${JSON.stringify(v)}`);

        // R2 — enter transform: snappy spring @ its OWN 0.4s clock.
        expect(census.enter, "R2: no pane wrapper child found").toBeTruthy();
        log("R2 enter", census.enter);
        expect(census.enter!["transform"]?.duration).toBe("0.4s");
        expect(census.enter!["transform"]?.timing).toMatch(/^linear\(/);

        // R3 — leave: 0.2s bezier on BOTH legs; never a spring on an exit.
        log("R3 leave", census.leave);
        for (const legName of ["opacity", "transform"]) {
            const leg = census.leave![legName];
            expect(leg?.duration, `R3 ${legName} duration`).toBe("0.2s");
            expect(leg?.timing, `R3 ${legName} curve`).toMatch(/^cubic-bezier\(/);
        }
        // Gate 5 — the exit law: leave strictly shorter than the enter.
        const maxLeave = Math.max(
            ...Object.values(census.leave!).map((l) => parseFloat(l.duration)),
        );
        expect(maxLeave, "exit law: leave < enter").toBeLessThan(
            parseFloat(census.enter!["transform"]!.duration),
        );

        // R4 — cartoon register: translate/scale on the punch curve @ 0.3s,
        // box-shadow on a bezier @ 0.3s (SPATIAL+EFFECTS split).
        log("R4 cartoon-surface", census.cartoon);
        for (const legName of ["translate", "scale"]) {
            const leg = census.cartoon[legName];
            expect(leg?.duration, `R4 ${legName} duration`).toBe("0.3s");
            expect(leg?.timing, `R4 ${legName} curve`).toMatch(/^linear\(/);
        }
        expect(census.cartoon["box-shadow"]?.duration).toBe("0.3s");
        expect(census.cartoon["box-shadow"]?.timing).toMatch(/^cubic-bezier\(/);
        log("R4 live cards", census.liveCards.length);

        // R5 — the atom: scale @ the smooth spring's OWN 0.45s clock.
        log("R5 btn-interactive", census.btnAtom);
        expect(census.btnAtom["scale"]?.duration).toBe("0.45s");
        expect(census.btnAtom["scale"]?.timing).toMatch(/^linear\(/);
        // The live rail-item press leg: --spring-press @ 0.16s.
        expect(census.rail, "R5: .channel-rail-item not found").toBeTruthy();
        log("R5 rail-item", census.rail);
        expect(census.rail!["transform"]?.duration).toBe("0.16s");
        expect(census.rail!["transform"]?.timing).toMatch(/^linear\(/);
        // The live send-btn rides the atom (scale leg present at 0.45s).
        if (census.send) {
            log("R5 send-btn", census.send);
            expect(census.send["scale"]?.duration).toBe("0.45s");
            expect(census.send["scale"]?.timing).toMatch(/^linear\(/);
        }

        // R8 — the settle family: vj-morph enter transform snappy @ 0.4s.
        log("R8 vj-morph enter", census.morph);
        expect(census.morph["transform"]?.duration).toBe("0.4s");
        expect(census.morph["transform"]?.timing).toMatch(/^linear\(/);

        // R11 — the shell nudge: liquid-spatial @ the smooth clock.
        expect(census.paneShell, "R11: .pane-shell not found").toBeTruthy();
        log("R11 pane-shell", census.paneShell);
        expect(census.paneShell!["transform"]?.duration).toBe("0.45s");
        expect(census.paneShell!["transform"]?.timing).toMatch(/^linear\(/);

        // R9 — RECORDED, not gated: the row rides W6-2's re-author (T-46).
        log(
            "R9 gradient-stop handle",
            census.r9Present
                ? "present on this view (verify at W6-2 merge)"
                : "HANDED-ACROSS → W6-2 (T-46); target --spring-snappy @ --spring-snappy-duration; census owns the row at merge",
        );

        // R10 — DISCHARGED BY EXCISION (W0-3 CC-6): no 0.55s scrim exists;
        // live dialog scrims are the producer bloom (F6 KEEP). Recorded.
        log("R10 dialog scrim", "discharged by excision (W0-3 CC-6)");
    }
});
