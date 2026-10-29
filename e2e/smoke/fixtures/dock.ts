/**
 * N.W5 Defect-B — the dock view-select OPEN idiom (shared fixture).
 *
 * Replaces the `click({ force: true })` open the smoke suite carried at every
 * view-switch site. That idiom was authored around a now-fixed app defect: the
 * dock booted COLLAPSED on desktop, so the `.glass-dock.collapsed` overlay
 * intercepted the trigger's pointer and the specs reached for `force` to punch
 * the click through. But reka-ui 2.9's `<Select>` IGNORES (and sometimes
 * mis-toggles) a synthetic forced click, so `force:true` left `data-state`
 * `closed` — the click landed on the button but the listbox never opened.
 *
 * The app fix (N.W5 Defect-B): the desktop dock now boots EXPANDED
 * (`Dock.vue` `:collapse="isDesktop ? 'open' : false"`), so the view-select trigger is a
 * top-level reachable control on first paint — exactly as on mobile (where the
 * dock is `:collapse="false"`). A REAL click then opens the listbox
 * deterministically (live-probed: WebGL-off 5/5; SwiftShader-on 3/4, the lone
 * miss being the orthogonal Defect-A WebGL hit-test stall the CI `retries`
 * absorb). This helper is that real-user interaction, factored once:
 *
 *   1. If the dock is collapsed (a narrow-viewport pill, or a post-idle
 *      auto-collapse), click the pill to expand it first — a real user taps the
 *      pill before reaching the controls inside. No-op when already expanded.
 *   2. Real-click the `Select view` combobox (NO force) and assert the listbox
 *      opened (the named option becomes visible), so a regression to the
 *      closed-listbox failure mode surfaces HERE with a clear message rather
 *      than as an opaque downstream timeout.
 *   3. Click the named option.
 *
 * `expandDock(page)` is exported separately for the specs that interact with
 * other dock controls (the action-bar toggle) and need the dock open without
 * driving the view-select.
 */
import { expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

/**
 * X.W11.v1f (COHESION §0gu.2, ESC-W11v1e-1) — THE DOCK MORPH'S OWN COMPLETION.
 *
 * glass's `useDockMorph` sets `[data-morphing]` when the collapse↔expand
 * spring starts and removes it in that spring's own `onSettle` (glass
 * `dist/dock.js`, the morph's `c()`). The settle is read from that event — a
 * MutationObserver resolving on the attribute's removal — never from a
 * wall-clock window: on a starved software-raster runner the spring's frames
 * arrive late and a 5 s window measured the runner, not the dock (CI
 * `40842251692`: `o21`, `o14`, `w12-dock` rows). A morph that never settles
 * still fails, at the test's own budget. The one-shot assertion after it
 * restates the state the event delivered. The read rides `waitForFunction`
 * (no timeout of its own), which re-arms in the new document if a dev-server
 * reload replaces the page mid-wait — a plain `evaluate` dies with the
 * context (measured: o14 ×3 "Execution context was destroyed" on a cold
 * vite cache).
 */
export async function dockSettled(page: Page): Promise<void> {
    await page.waitForFunction(
        () =>
            new Promise<boolean>((resolve) => {
                const morphing = () => document.querySelector(".glass-dock[data-morphing]") !== null;
                if (!morphing()) return resolve(true);
                const mo = new MutationObserver(() => {
                    if (morphing()) return;
                    mo.disconnect();
                    resolve(true);
                });
                mo.observe(document.documentElement, {
                    subtree: true,
                    childList: true,
                    attributes: true,
                    attributeFilter: ["data-morphing"],
                });
            }),
    );
    await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0);
}

/**
 * X.W11.v1f (COHESION §0gu.2) — THE DOCK AT REST: its morph has settled
 * (`dockSettled`) AND every finite transition inside the dock has finished —
 * the DockCrossfade faces' enter/leave, the plate's boot arrival, the
 * vj-settle beat. Read from the transitions' own completion: each finite
 * running Animation's `finished` promise (`getAnimations({ subtree: true })`),
 * and, while a node carries a Vue transition class with no Animation yet (the
 * frame before the CSSTransition exists), the next animation frame. Infinite
 * loops (the dock lamp) are not an arrival and are not awaited. Replaces the
 * fixed 900-1200 ms quiet windows the dock specs slept through (CI
 * `40842251692`: `w12-dock:315`, the crossfade face read mid-swap).
 */
export async function dockAtRest(page: Page): Promise<void> {
    await dockSettled(page);
    await page.waitForFunction(async () => {
        const dock = document.querySelector(".glass-dock");
        if (!dock) return true;
        const root = dock.parentElement ?? dock;
        // A RUNNING time-based transition with an end: scroll-driven
        // animations (the dock plate's `gl-dock-cap-inline-*`, endTime "100%"),
        // infinite loops and paused effects never "finish" and are not an arrival.
        const finite = (a: Animation) => {
            const end = a.effect?.getComputedTiming().endTime;
            return (
                a.playState === "running" &&
                a.timeline === document.timeline &&
                typeof end === "number" &&
                Number.isFinite(end)
            );
        };
        const inPhase = () =>
            [root, ...root.querySelectorAll("*")].some((el) =>
                [...el.classList].some((c) => /-(enter|leave)-(from|active|to)$/.test(c)),
            );
        for (;;) {
            const running = root.getAnimations({ subtree: true }).filter(finite);
            if (running.length) {
                await Promise.allSettled(running.map((a) => a.finished));
                continue;
            }
            if (!inPhase()) return true;
            await new Promise((r) => requestAnimationFrame(r));
        }
    });
    await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0);
}

/**
 * Ensure the dock is expanded. A real user clicks the collapsed pill before
 * reaching the controls inside it. No-op when the dock is already expanded
 * (mobile `:collapse="false"`, or desktop's expanded first-paint).
 */
export async function expandDock(page: Page): Promise<void> {
    const dock = page.locator(".glass-dock").first();
    // A morph already in flight (an idle collapse under way) is read at its
    // END, never mid-flight, so "already expanded" is not misread.
    await dockSettled(page);
    const collapsedPill = page.locator(".glass-dock.collapsed");
    if (await collapsedPill.count()) {
        // Real click on the pill body; the dock un-collapses on the click.
        await collapsedPill.click();
        // The collapse↔expand morph runs the dock's single settling spring;
        // wait for `[data-morphing]` to clear so the controls inside are at rest.
        await dockSettled(page);
    }
    // X-W12U .q2 (X-W7L C-DOCK-IDLE, glass 9.0.0+ at X.W7L.m `c8a4959dd`): an
    // UNHOVERED, unheld desktop dock idles shut `DOCK_COLLAPSE_DELAY_MS`
    // (3600 ms) after its last release, so an expanded dock could collapse
    // between this call and the caller's click (r1: o14 ×3 read
    // "Select view … element is not visible" with the pill collapsed). A
    // user reaching for a dock control has the pointer ON the dock, which is
    // what holds it open: rest the pointer on the plate's own inline-start
    // padding (no control sits there, so no control's hover state is armed).
    const box = await dock.boundingBox();
    if (box) await page.mouse.move(box.x + 3, box.y + box.height / 2);
}

/**
 * Open the dock view-select and switch to the named view. The real-user idiom:
 * expand the dock if collapsed, real-click the combobox, assert it opened, pick
 * the option. `name` matches a `VIEW_MAP` label ("Palettes", "Home", …).
 */
export async function openView(page: Page, name: string): Promise<void> {
    await expandDock(page);

    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    await expect(viewSelect).toBeVisible();
    await viewSelect.click();

    // Assert the listbox actually opened, so a closed-listbox regression
    // surfaces HERE with a clear message rather than as a downstream
    // option-not-found timeout. NOTE: once the reka-ui Select opens, the
    // combobox's *computed accessible name* changes (it pulls in the live
    // listbox's `aria-activedescendant`), so `getByRole("combobox", { name:
    // "Select view" })` no longer resolves the same element — asserting
    // `data-state` through that named locator is a false negative. The stable
    // open-signal is the listbox itself: the named option becomes visible only
    // when the listbox is open. That `option` locator is also what we click,
    // so the assertion and the action share one truth.
    const option = page.getByRole("option", { name, exact: true });
    await expect(option).toBeVisible();
    await option.click();
}

/**
 * Wait for the pane-swap enter transition to fully settle (T.W6 round-4
 * remediation). Under a cold dev server the swap's CSSTransition can STALL
 * at `currentTime = 0` for ~1s (the first-visit transform burst starves the
 * main thread) and then resume — Playwright's "stable bounding box"
 * actionability check is satisfied DURING the stall, so a click measured
 * mid-stall lands on a surface that then slides away (observed live: a
 * 50%-of-bar click minting a 0% gradient stop while the pane was still
 * 563px off-station), and pixel probes screenshot a mid-flight surface.
 *
 * X.W11.v1f (COHESION §0gu.2, ESC-W11v1e-1): the settle is read from the
 * transition's OWN completion, never a wall-clock window. PaneSlot's
 * `<Transition mode="out-in">` runs CSS transitions on the pane nodes; the
 * read awaits every finite running animation's `finished` promise
 * (`Element.getAnimations()`: the CSSTransitions and CSSAnimations of those
 * nodes) and, between Vue's class phases (`*-enter-from` / `*-leave-active`
 * …, the frame before a transition is created), the next animation frame —
 * until the nodes carry neither. The poll it replaces gave the transform 15 s
 * and timed out on the starved SwiftShader runner while the transition was
 * still running ("Expected false · Received true"). Then ONE assertion: no
 * pane node rests on a transform. A PERMANENT resting transform (the W5-10
 * class) carries no animation, so it fails that assertion loudly.
 */
export async function paneSettled(page: Page): Promise<void> {
    await page.waitForFunction(async () => {
        const nodes = () =>
            [".pane-container", ".pane-wrapper", ".pane-wrapper > *"].flatMap((sel) => [
                ...document.querySelectorAll(sel),
            ]);
        const inPhase = (el: Element) =>
            [...el.classList].some((c) => /-(enter|leave)-(from|active|to)$/.test(c));
        // A RUNNING time-based transition with an end: scroll-driven
        // animations (the dock plate's `gl-dock-cap-inline-*`, endTime "100%"),
        // infinite loops and paused effects never "finish" and are not an arrival.
        const finite = (a: Animation) => {
            const end = a.effect?.getComputedTiming().endTime;
            return (
                a.playState === "running" &&
                a.timeline === document.timeline &&
                typeof end === "number" &&
                Number.isFinite(end)
            );
        };
        for (;;) {
            const els = nodes();
            const running = els.flatMap((el) => el.getAnimations()).filter(finite);
            if (running.length) {
                await Promise.allSettled(running.map((a) => a.finished));
                continue;
            }
            if (!els.some(inPhase)) return true;
            await new Promise((r) => requestAnimationFrame(r));
        }
    });
    const resting = await page.evaluate(() =>
        [".pane-container", ".pane-wrapper", ".pane-wrapper > *"]
            .flatMap((sel) => [...document.querySelectorAll(sel)])
            .some((el) => getComputedStyle(el).transform !== "none"),
    );
    expect(resting, "a pane node rests on a transform after its transition finished").toBe(false);
}

/**
 * X.W5.c2 (COHESION §0ax ESC-R1-1) — THE MAIN-PANE LANDMARK, declared once.
 *
 * X.W5.a retired the static `aria-label` naming for the live
 * landmark: `<main :aria-labelledby="route-title">`, named BY the route's one
 * `<h1 id="route-title">` (`demo/app/App.vue`), so the name
 * now tracks the route ("Home", "Gradient", "Not Found", …) and can never
 * announce a scene that is no longer mounted. Every spec reaches the shell's
 * main pane through THIS export — never a per-file copy of the query — so the
 * next landmark change is one edit, not sixty-one.
 *
 * X-DS value pass 8 (V8C-01): that H1 is App's caption only where no pane
 * title says the label; on a `titled` route it is the pane's own title, inside
 * the row. COHESION §0gf.2(a) (OD19-V4): App's caption is visually hidden.
 *
 * The selector is the relation itself: a `<main>` labelled by `route-title`
 * that CONTAINS that H1. A `<main>` whose label points elsewhere, or whose H1
 * went missing, does not match. `MAIN_PANE` is exported for the in-page
 * (`page.evaluate`) readers that cannot hold a `Locator`.
 */
export const ROUTE_TITLE_ID = "route-title";

export const MAIN_PANE = `main[aria-labelledby="${ROUTE_TITLE_ID}"]:has(h1#${ROUTE_TITLE_ID})`;

/** The shell's main-pane landmark — the one `<main>` the route H1 names. */
export function mainPane(page: Page): Locator {
    return page.locator(MAIN_PANE);
}
