import { test, expect } from "@playwright/test";
import { mainPane } from "../fixtures/dock";

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
    // ── X-W1 · G-6 RULING — `test.fail()` REMOVED; the assertion stands real,
    // and it is GREEN.
    //
    // The annotation read *"R1 EXPECTED-RED (PKT-1 producer-root). Remove
    // test.fail when P2 lands the dist fix and the cascade default clears."*
    // MEASURED at the full-suite baseline run of 2026-09-18 (`58d6f731`): this
    // leg PASSED, which Playwright reported as `unexpected` precisely because
    // the annotation still claimed it must fail. The dist fix HAS landed and the
    // cascade default HAS cleared; the marker had outlived its defect and was
    // by then asserting the opposite of the truth — an inverted gate that would
    // have red the suite the day the product got better.
    test.setTimeout(30_000);

    await page.goto("/");
    await expect(mainPane(page)).toBeVisible();

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
 *   R2  pane-swap ENTER  — transform `--spring-panel` @ the RESOLVED
 *       `--spring-panel-duration` (own clock)
 *   R3  pane-swap LEAVE (O16's dealt cards, DESIGN.md §5.7) — the card slides
 *       off its side: transform `--ease-in` @ the RESOLVED `--duration-normal`,
 *       and fades on `--duration-fast` (an exit is about six tenths of its
 *       entrance and carries less motion); STRICTLY shorter than the enter
 *       (the exit law, gate 5)
 *   R4  RETIRED 2026-09-23 (COHESION §0az ESC-W5c3-1) — the producer
 *       `cartoon-surface` register: glass 7.0.0 ships the utility with NO
 *       transition, so there is no producer value to assert. Recorded, never
 *       re-authored in the consumer; a wanted-back motion is one BK relay row.
 *   R5  btn-interactive atom + send-btn — RETIRED 2026-09-23 (§0az, the same
 *       producer-removed clause): glass 7.0.0 ships no `btn-interactive`
 *       utility at all (0 dist hits), and `.send-btn` carries no transition of
 *       its own — its scale leg WAS the atom. Recorded only.
 *       The live rail-item press leg — transform `--spring-press` @ the
 *       RESOLVED `--spring-press-duration` (the rule reads that token).
 *   R8  skeleton settle  — the vj-morph enter family (transform snappy @ the
 *       RESOLVED `--spring-present-duration`)
 *   R11 .pane-shell nudge — transform `--transition-liquid-spatial` @ the
 *       RESOLVED `--spring-present-duration` (the rule reads that token)
 *   Resolved-token pattern (§0az): every row measuring a DEMO rule asserts
 *   equality with the token's value resolved by getComputedStyle on the
 *   rule's own element, and the rule reads that token — drift is cured at
 *   the rule, never by copying an observed literal into the assertion.
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
    test.setTimeout(90_000);
    await page.goto("/");
    await expect(mainPane(page)).toBeVisible();
    // R2's text leg is read off a live swap to Gradient and back; warm its
    // chunk first, so the swap is the swap and not a load.
    await page.evaluate(() => (location.hash = "#/gradient"));
    await page.waitForTimeout(2500);
    await page.evaluate(() => (location.hash = "#/"));
    await page.waitForTimeout(2500);

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
                const delays = cs.transitionDelay.split(", ");
                const legs: Record<string, { duration: string; timing: string; delay: string }> =
                    {};
                props.forEach((p, i) => {
                    legs[p] = {
                        duration: durs[i % durs.length] ?? "",
                        delay: delays[i % delays.length] ?? "",
                        timing: (times[i % times.length] ?? "").trim(),
                    };
                });
                return legs;
            };

            // §0az resolved-token pattern: the value a rule's token RESOLVES to
            // on the rule's own element. The motion tokens are unregistered
            // custom properties (`calc(<settle> * <tempo>)`), so the raw
            // custom-prop read is unevaluated; parking the token in the
            // element's animation-duration / animation-timing-function and
            // reading them back resolves it through each engine's own calc
            // (no animation-name, so nothing runs). Prior inline values restored.
            const resolve = (el: Element, duration: string, curve: string) => {
                const h = el as HTMLElement;
                const prevD = h.style.getPropertyValue("animation-duration");
                const prevT = h.style.getPropertyValue("animation-timing-function");
                h.style.setProperty("animation-duration", `var(${duration})`);
                h.style.setProperty("animation-timing-function", `var(${curve})`);
                const cs = getComputedStyle(h);
                const out = { duration: cs.animationDuration, timing: cs.animationTimingFunction };
                h.style.setProperty("animation-duration", prevD);
                h.style.setProperty("animation-timing-function", prevT);
                return out;
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
            const wrapper = document.querySelector(".pane-wrapper--stage");
            const pane = wrapper?.firstElementChild ?? null;
            let enter: ReturnType<typeof readLegs> | null = null;
            let leave: ReturnType<typeof readLegs> | null = null;
            let leaveTok: ReturnType<typeof resolve> | null = null;
            let textTok: ReturnType<typeof resolve> | null = null;
            if (pane) {
                pane.classList.add("vj-enter-enter-active");
                enter = readLegs(pane);
                pane.classList.remove("vj-enter-enter-active");
                pane.classList.add("vj-enter-leave-active");
                leave = readLegs(pane);
                // R3's rule reads `--duration-control` / `--ease-in`; R2's text
                // waits `--duration-control`, then runs `--duration-fast` on
                // `--ease-decelerate`.
                leaveTok = resolve(pane, "--duration-control", "--ease-in");
                textTok = resolve(pane, "--duration-fast", "--ease-decelerate");
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
            // The rail rule reads `--spring-press-duration` / `--spring-press`.
            const railTok = railItem
                ? resolve(railItem, "--spring-press-duration", "--spring-press")
                : null;
            const sendBtn = document.querySelector(".send-btn");
            const send = sendBtn ? readLegs(sendBtn) : null;

            // R8 — the vj-morph enter family (the settle's curve/clock).
            const morph = probe("vj-morph-enter-active");

            // R11 — the live .pane-shell nudge.
            const shell = document.querySelector(".pane-shell");
            const paneShell = shell ? readLegs(shell) : null;
            // The .pane-shell rule reads `--spring-present-duration` /
            // `--transition-liquid-spatial`.
            const shellTok = shell
                ? resolve(shell, "--spring-present-duration", "--transition-liquid-spatial")
                : null;

            // R9 — RECORDED (handed across to W6-2): the current handle, if
            // this view hosts one (picker view: none — logged as absent).
            const r9 = document.querySelector("[class*='gradient-stop']");

            return {
                enter,
                leave,
                leaveTok,
                textTok,
                cartoon,
                liveCards,
                btnAtom,
                rail,
                railTok,
                send,
                morph,
                paneShell,
                shellTok,
                r9Present: r9 != null,
            };
        });

        const log = (row: string, v: unknown) =>
            console.log(`[O-16·W5·${scheme}] ${row}: ${JSON.stringify(v)}`);

        // R2 — the enter (rewritten for the FORTIETH order, A: "a strange
        // re-sizing", "transitions are very slow"; DESIGN 5.7): the arriving
        // PLATE is on its seat from its first frame, so the root runs no
        // transform; its text starts as the leaver clears, half way through
        // the leaver's clock (`--duration-control` / 2; waiting the whole
        // leave held an empty plate), and comes in on `--duration-fast`. The
        // root declares the text's clock (Vue times the enter by the root's
        // transition), on opacity alone. Equal to the RESOLVED tokens the
        // rules read (§0az), never literals.
        expect(census.enter, "R2: no pane wrapper child found").toBeTruthy();
        log("R2 enter", census.enter);
        log("R2 resolved tokens", census.textTok);
        expect(Object.keys(census.enter!), "R2 the arriving plate does not travel").toEqual(["opacity"]);
        expect(census.enter!["opacity"]!.duration, "R2 the root declares the text's clock").toBe(census.textTok!.duration);
        const handOver = `${parseFloat(census.leaveTok!.duration) / 2}s`;
        expect(census.enter!["opacity"]!.delay, "R2 the root starts as the leaver clears").toBe(handOver);
        // The text: the plate's own children (its material is its
        // pseudo-elements and stays put) are held at 0 from the card's first
        // frame and fade in on the Web Animations API (PaneSlot's `dealText`;
        // as rules keyed on the root's enter classes they restyled the whole
        // card at each class change). Read off a live swap: every child, held
        // at 0, then 0 to 1 on `--duration-fast` and `--ease-decelerate`,
        // after the hand-over.
        // The runs are taken on the card's first frame and read once each has
        // been played, so a loaded runner's sparse frames cannot miss a fade
        // that is over before the next one.
        const dealt = await page.evaluate(
            (to) =>
                new Promise<{
                    held: string[];
                    children: number;
                    legs: Array<{ from: string; to: string; duration: number; delay: number; easing: string } | null>;
                }>((done) => {
                    type Leg = { from: string; to: string; duration: number; delay: number; easing: string };
                    const stage = document.querySelector(".pane-wrapper--stage")!;
                    const out = { held: [] as string[], children: 0, legs: [] as Array<Leg | null> };
                    const fadeOf = (k: Element) =>
                        k.getAnimations().find((a) => {
                            const kf = (a.effect as KeyframeEffect | null)?.getKeyframes() ?? [];
                            return kf.length === 2 && "opacity" in kf[0]!;
                        }) ?? null;
                    let runs: Array<Animation | null> | null = null;
                    const t0 = performance.now();
                    const loop = () => {
                        if (runs === null) {
                            const card = stage.querySelector(":scope > .vj-enter-enter-active");
                            const plate = card?.classList.contains("glass-resting") ? card : card?.querySelector(":scope > .glass-resting");
                            if (plate && plate.children.length > 0) {
                                const kids = [...plate.children];
                                out.held = kids.map((k) => getComputedStyle(k).opacity);
                                out.children = kids.length;
                                runs = kids.map(fadeOf);
                            }
                        }
                        if (runs !== null && runs.every((r) => r === null || r.playState !== "paused")) {
                            out.legs = runs.map((run) => {
                                if (run === null) return null;
                                const kf = (run.effect as KeyframeEffect).getKeyframes();
                                const t = run.effect!.getTiming();
                                return { from: String(kf[0]!.opacity), to: String(kf[1]!.opacity), duration: Number(t.duration), delay: Number(t.delay ?? 0), easing: String(t.easing) };
                            });
                            return done(out);
                        }
                        if (performance.now() - t0 > 10_000) return done(out);
                        requestAnimationFrame(loop);
                    };
                    requestAnimationFrame(loop);
                    location.hash = to;
                }),
            "#/gradient",
        );
        log("R2 enter text", dealt);
        await page.evaluate(() => (location.hash = "#/"));
        await page.waitForFunction(() => !document.querySelector(".vj-enter-enter-active, .vj-enter-leave-active"));
        await page.waitForTimeout(600);
        const ms = (css: string) => (css.trim().endsWith("ms") ? parseFloat(css) : parseFloat(css) * 1000);
        expect(dealt.children, "R2: the arriving plate's text was not found").toBeGreaterThan(0);
        expect(dealt.held, "R2 the text is held at 0 from the card's first frame").toEqual(dealt.held.map(() => "0"));
        expect(dealt.legs.length, "R2 every child of the plate fades in").toBe(dealt.children);
        for (const leg of dealt.legs) {
            expect(leg, "R2 every child of the plate fades in").not.toBeNull();
            expect([leg!.from, leg!.to], "R2 text fades in").toEqual(["0", "1"]);
            expect(leg!.duration, "R2 text duration").toBeCloseTo(ms(census.textTok!.duration), 3);
            expect(leg!.easing, "R2 text curve").toBe(census.textTok!.timing);
            expect(leg!.delay, "R2 the text starts as the leaver clears").toBeCloseTo(ms(handOver), 3);
        }
        const textIn = { duration: `${dealt.legs[0]!.duration / 1000}s`, delay: `${dealt.legs[0]!.delay / 1000}s` };

        // R3 — leave: the card slides off its side and its text drops at
        // once, both on `--duration-control` (the slide on `--ease-in`, never
        // a spring on an exit). §0az: equal to the RESOLVED tokens.
        log("R3 leave", census.leave);
        log("R3 resolved tokens", census.leaveTok);
        const move = census.leave!["transform"];
        expect(move?.duration, "R3 transform duration").toBe(census.leaveTok!.duration);
        expect(move?.timing, "R3 transform curve").toBe(census.leaveTok!.timing);
        expect(move?.timing, "R3 transform curve").toMatch(/^cubic-bezier\(/);
        expect(Object.keys(census.leave!).sort(), "R3 the leave is transform + its fade").toEqual(["opacity", "transform"]);
        expect(census.leave!["opacity"]!.duration, "R3 the fade ends with the slide").toBe(census.leaveTok!.duration);
        // Gate 5 — the exit law: the leave is over before the enter is.
        const maxLeave = Math.max(
            ...Object.values(census.leave!).map(
                (l) => parseFloat(l.duration) + (parseFloat(l.delay) || 0),
            ),
        );
        expect(maxLeave, "exit law: leave < enter").toBeLessThan(
            parseFloat(textIn!.duration) + parseFloat(textIn!.delay),
        );

        // R4 — RETIRED 2026-09-23 (COHESION §0az ESC-W5c3-1). The row asserted
        // the producer `cartoon-surface` register (translate/scale @ 0.3s on the
        // punch curve, box-shadow @ 0.3s). glass 7.0.0 ships `@utility
        // cartoon-surface` with NO transition (components/card/styles.css), so
        // the register has no producer value left to assert. The reading stays
        // RECORDED; the lost motion is never copied into the consumer — wanted
        // back, it is one BK relay row.
        log("R4 cartoon-surface (RETIRED 2026-09-23, §0az)", census.cartoon);
        log("R4 live cards", census.liveCards.length);

        // R5 — the btn-interactive atom + the live send-btn: RETIRED 2026-09-23
        // (§0az, the same producer-removed clause). glass 7.0.0 ships no
        // `btn-interactive` utility (0 hits in the dist), and `.send-btn`
        // declares no transition of its own — its scale leg WAS the atom. The
        // readings stay RECORDED; no consumer copy of the removed atom.
        log("R5 btn-interactive (RETIRED 2026-09-23, §0az)", census.btnAtom);
        if (census.send) log("R5 send-btn (RETIRED 2026-09-23, §0az)", census.send);
        // The live rail-item press leg: `--spring-press` @ the RESOLVED
        // `--spring-press-duration` — the tokens its rule reads (§0az).
        expect(census.rail, "R5: .channel-rail-item not found").toBeTruthy();
        log("R5 rail-item", census.rail);
        log("R5 rail-item resolved tokens", census.railTok);
        expect(census.rail!["transform"]?.duration).toBe(census.railTok!.duration);
        expect(census.rail!["transform"]?.timing).toBe(census.railTok!.timing);
        expect(census.rail!["transform"]?.timing).toMatch(/^linear\(/);

        // R8 — the settle family: vj-morph enter transform snappy @ the
        // resolved `--spring-present-duration` (0.44s at glass 7.0.0).
        log("R8 vj-morph enter", census.morph);
        // ESC-W5c2-1 (COHESION §0ay): equal to the RESOLVED `--spring-present-duration`,
        // read by getComputedStyle on the rule's own element (the census's
        // `vj-morph-enter-active` probe, through the real cascade).
        expect(census.morph["transform"]?.duration).toBe(
            await page.evaluate(() => {
                const el = document.createElement("div");
                el.className = "vj-morph-enter-active";
                document.body.appendChild(el);
                el.style.setProperty("animation-duration", "var(--spring-present-duration)");
                const resolved = getComputedStyle(el).animationDuration;
                el.remove();
                return resolved;
            }),
        );
        expect(census.morph["transform"]?.timing).toMatch(/^linear\(/);

        // R11 — the shell nudge: `--transition-liquid-spatial` @ the RESOLVED
        // `--spring-present-duration` — the tokens its rule reads (§0az).
        expect(census.paneShell, "R11: .pane-shell not found").toBeTruthy();
        log("R11 pane-shell", census.paneShell);
        log("R11 resolved tokens", census.shellTok);
        expect(census.paneShell!["transform"]?.duration).toBe(census.shellTok!.duration);
        expect(census.paneShell!["transform"]?.timing).toBe(census.shellTok!.timing);
        expect(census.paneShell!["transform"]?.timing).toMatch(/^linear\(/);

        // R9 — RECORDED, not gated: the row rides W6-2's re-author (T-46).
        log(
            "R9 gradient-stop handle",
            census.r9Present
                ? "present on this view (verify at W6-2 merge)"
                : "HANDED-ACROSS → W6-2 (T-46); target --spring-present @ --spring-present-duration; census owns the row at merge",
        );

        // R10 — DISCHARGED BY EXCISION (W0-3 CC-6): no 0.55s scrim exists;
        // live dialog scrims are the producer bloom (F6 KEEP). Recorded.
        log("R10 dialog scrim", "discharged by excision (W0-3 CC-6)");
    }
});
