// flipRegions — the scene's regions settle with their cards (demo/DESIGN.md
// §5.7, G3 + G6). A region that MOVES (a stacked row reflowing under a new
// stage height, a reorder) translates from where it was drawn to where it now
// lies. First is read as DRAWN (a travel still in flight is the start of the
// next), so A → B → C retargets from the live pose. Only the wrapper is
// written, and nothing it writes outlives its travel: a cached pane never
// carries a FLIP away with it.
//
// ONE READ, ONE WRITE (owner's FORTIETH order, B: "per-page performance and
// transitions are very slow"). The commit reads every region once before the
// mutate and once after it, and writes only after the second read. Before, the
// writes and reads were interleaved per region (a transition reset, a rect, a
// forced restart, the plate's computed `clip-path`), which forced 110-453 ms of
// style and layout inside the commit on a 4x phone. The travel runs on the Web
// Animations API: nothing has to be restarted by a forced reflow, it lands on
// the compositor (`translate`), and a newer commit cancels it and starts from
// the pose it had reached. A region that WIDENS is not opened by a clip any
// more: the dealt card arrives at its width, and the stage keeps one width
// across the picker routes (shell.css, the FORTIETH A).
//
// o1111 (the 390 view swap) — ONLY THE CARD THAT STAYS TRAVELS. A region that
// is dealing a new card does not move: its riser comes up from under the deck
// where it now lies, and its leaver is flung from where it was drawn
// (`--region-pin`, animations.css). The picker is the one card in motion; it
// paints above the deck (`.pane-wrapper--stage` holds z 1, shell.css), so it
// slides off the new card and uncovers it. The move rides the riser's own
// clock (`--spring-panel-settle`) on a symmetric ease: it starts and lands at
// rest with no overshoot (a spring's overshoot carried a ~600 px reorder ~24 px
// into the dock band, o1109c), and its peak speed is ~1.6x its mean (o1110 D3).
import { nextTick } from "vue";

// the sine ease-in-out: peak speed pi/2 of the mean, so ~21 % of the travel in
// any 60 ms of the panel clock (the move still lands inside OD19's 450 ms window)
const EASE = "cubic-bezier(0.37, 0, 0.63, 1)";
// A leaver that is swapped out mid-leave never reports its own end; past the
// panel spring's settle (0.45 s) its pin is released regardless.
const SETTLED_MS = 700;

const travels = new WeakMap<HTMLElement, Animation>();
const pins = new WeakMap<HTMLElement, number>();

let panelMs = 0;
/** The panel clock in ms: glass's settle times its tempo, read once. */
function panelClock(el: Element): number {
    if (panelMs > 0) return panelMs;
    const style = getComputedStyle(el);
    const settle = parseFloat(style.getPropertyValue("--spring-panel-settle"));
    const tempo = parseFloat(style.getPropertyValue("--motion-tempo"));
    panelMs = (Number.isFinite(settle) ? settle * 1000 : 450) * (Number.isFinite(tempo) ? tempo : 1);
    return panelMs;
}

/** Hold a dealing region's leaver where it was drawn for the length of its leave. */
function pin(w: HTMLElement, dx: number, dy: number): void {
    const mine = (pins.get(w) ?? 0) + 1;
    pins.set(w, mine);
    w.style.setProperty("--region-pin", `${dx}px ${dy}px`);
    window.setTimeout(() => {
        if (pins.get(w) === mine) w.style.removeProperty("--region-pin");
    }, SETTLED_MS);
}

export async function flipRegions(container: HTMLElement | null, mutate: () => unknown): Promise<void> {
    if (container === null || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        await mutate();
        return;
    }
    const regions = () => [...container.querySelectorAll<HTMLElement>(":scope > .pane-wrapper")];

    // READ, before the commit: each region as drawn, a travel in flight included.
    const clock = panelClock(container);
    const y0 = window.scrollY;
    const first = new Map(regions().map((w) => [w, w.getBoundingClientRect()] as const));

    await mutate();
    await nextTick();

    // Lift what the last commit left in flight, so the read below is each
    // region's own seat. Nothing is drawn between this and the new travel.
    const now = regions();
    for (const w of now) {
        travels.get(w)?.cancel();
        travels.delete(w);
        if (w.style.getPropertyValue("--region-pin") === "") continue;
        pins.set(w, (pins.get(w) ?? 0) + 1);
        w.style.removeProperty("--region-pin");
    }

    // READ, after the commit: every seat in one layout.
    const y1 = window.scrollY;
    const seats = now.map(
        (w) =>
            [
                w,
                w.getBoundingClientRect(),
                w.querySelector(":scope > .vj-enter-enter-active") !== null,
            ] as const,
    );

    // WRITE. G6: the scroll is kept, unless the anchor region now ends above
    // it (the case the browser would clamp anyway); then the anchor is landed
    // on, at once. The offsets are taken in document space, so the scroll
    // cancels out of them.
    const anchor = seats[0];
    if (anchor && anchor[1].bottom < 0) anchor[0].scrollIntoView({ block: "start", behavior: "instant" });
    for (const [w, seat, dealing] of seats) {
        const was = first.get(w);
        if (was === undefined) continue;
        const dx = was.left - seat.left;
        const dy = was.top + y0 - (seat.top + y1);
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
        if (dealing) {
            pin(w, dx, dy);
            continue;
        }
        const travel = w.animate([{ translate: `${dx}px ${dy}px` }, { translate: "0px 0px" }], {
            duration: clock,
            easing: EASE,
        });
        travels.set(w, travel);
        const done = () => {
            if (travels.get(w) === travel) travels.delete(w);
        };
        travel.finished.then(done, done);
    }
}
