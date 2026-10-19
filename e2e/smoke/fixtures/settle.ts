import { expect } from "@playwright/test";
import type { Locator } from "@playwright/test";

/**
 * X-W6 · X.W6.s (COHESION §0ba, ESC-W5d4-1 ruled (a)) — THE REGION SETTLE,
 * declared once.
 *
 * A pane swap mounts the incoming pane in its `vj-enter-enter-from` pose (the
 * role-keyed travel in `demo/styles/animations.css`: the stage at
 * `translateX(-110%)`, the inspector at `+110%`, the action at `translateY(110%)`)
 * and Vue flips it to `-enter-active`/`-enter-to` on the NEXT animation frame.
 * Under SwiftShader the first WebGL context can hold that frame for seconds
 * (rAF gap 2,760 ms measured at X-W5 RESUME 8). During the gap the pane is
 * parked off-station with NO Animation object yet — the CSS transition has not
 * started — so a settle that counts only `getAnimations()` reads it as still
 * and hands a pre-start pose to the caller (g2's 6.50 px; the `:243` drag's
 * stale rail box). A pose the user never sees at rest is not a product defect;
 * a settle check that cannot see it is.
 *
 * SETTLED means BOTH, on the target itself AND on its pane root (the element
 * that is the direct child of the enclosing `role="region"` slot — the node the
 * `<Transition>` classes; when the target IS the region, its first element
 * child):
 *   1. no Animation of the element's OWN is `running` (own, never the subtree:
 *      the atmosphere, the dock lamp and the gradient ramp's aurora loop forever
 *      and are not this pane's arrival);
 *   2. no `*-enter-*` / `*-leave-*` transition class is present (the pre-start
 *      pose, and the whole of an in-flight enter or leave).
 *   3. (a region target) the region HAS a pane root: an empty slot is a swap
 *      between an out-in leave and the incoming mount, never a settled pane.
 *
 * This is a WAIT, never a relaxation: it asserts nothing about the caller's
 * geometry, and a pane that never leaves its transition classes times the poll
 * out and fails the caller loudly, naming the element and the reason.
 */
export async function regionSettled(
    target: Locator,
    { timeout = 15_000 }: { timeout?: number } = {},
): Promise<void> {
    await expect
        .poll(
            () =>
                target.evaluate((el) => {
                    let paneRoot: Element | null = null;
                    if (el.getAttribute("role") === "region") {
                        paneRoot = el.firstElementChild;
                    } else {
                        let node: Element | null = el;
                        while (
                            node?.parentElement &&
                            node.parentElement.getAttribute("role") !== "region"
                        )
                            node = node.parentElement;
                        paneRoot = node?.parentElement ? node : null;
                    }
                    const TRANSITION_CLASS = /-(enter|leave)-/;
                    const unsettled: string[] = [];
                    // An EMPTY region has not arrived: between an out-in leave's
                    // end and the incoming pane's mount the slot holds no pane
                    // root at all — that is the swap still in flight, not rest.
                    if (el.getAttribute("role") === "region" && !paneRoot)
                        unsettled.push("the region renders no pane yet");
                    for (const node of new Set([el, paneRoot])) {
                        if (!node) continue;
                        const name = `${node.tagName.toLowerCase()}.${[
                            ...node.classList,
                        ]
                            .slice(0, 2)
                            .join(".")}`;
                        const classes = [...node.classList].filter((c) =>
                            TRANSITION_CLASS.test(c),
                        );
                        if (classes.length)
                            unsettled.push(`${name} carries ${classes.join(" ")}`);
                        const running = node
                            .getAnimations()
                            .filter((a) => a.playState === "running").length;
                        if (running)
                            unsettled.push(`${name} runs ${running} animation(s)`);
                    }
                    return unsettled.join("; ");
                }),
            { timeout, message: "the region never settled" },
        )
        .toBe("");
}
