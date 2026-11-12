// flipRegions — the scene's regions settle with their cards (demo/DESIGN.md
// §5.7, G3 + G6). A region that MOVES (a stacked row reflowing under a new
// stage height, a reorder) translates from where it was drawn to where it now
// lies; a region that WIDENS (a dual → single hop) opens its plate from the old
// edge to the new. First is read as DRAWN (a FLIP still in flight is the start
// of the next), so A → B → C retargets from the live pose. Only the wrapper is
// written, and every write is cleared when its transition ends or is
// cancelled: a cached pane never carries a FLIP away with it.
//
// o1111 (the 390 view swap) — ONLY THE CARD THAT STAYS TRAVELS. A region that
// is dealing a new card does not move: its riser comes up from under the deck
// where it now lies, and its leaver is flung from where it was drawn
// (`--region-pin`, animations.css). Before, a stacked reorder slid BOTH regions
// through each other (the inspector ~490 px up, the stage ~410 px down): the
// leaving card rode the inspector up past the picker while it was flung, three
// cards stood in one column and two panes' text shared a line. Now the picker
// is the one card in motion; it paints above the deck (`.pane-wrapper--stage`
// holds z 1, shell.css), so it slides off the new card and uncovers it.
// The move rides the riser's own clock (`--spring-panel-duration`) on a
// symmetric ease: it starts and lands at rest with no overshoot (a spring's
// overshoot carried a ~600 px reorder ~24 px into the dock band, o1109c), and
// its peak speed is ~1.6x its mean, where `--ease-standard` peaks at ~2.6x and
// moved a third of the travel in one 60 ms, the picker "jump" (o1110 D3, o1111).
import { nextTick } from "vue";

const PLATE = ":scope > .glass-resting, :scope > div > .glass-resting";
const CAST = "-12px";
// the sine ease-in-out: peak speed pi/2 of the mean, so ~21 % of the travel in
// any 60 ms of the panel clock (the move still lands inside OD19's 450 ms window)
const TRAVEL = "translate var(--spring-panel-duration) cubic-bezier(0.37, 0, 0.63, 1)";
const generation = new WeakMap<HTMLElement, Record<string, number>>();
// A plate that is swapped out mid-open never reports its own end; past the
// panel spring's settle (0.45 s) the clip is released regardless.
const SETTLED_MS = 700;

function claim(w: HTMLElement, prop: string): number {
    const g = generation.get(w) ?? {};
    g[prop] = (g[prop] ?? 0) + 1;
    generation.set(w, g);
    return g[prop];
}

function shownWidth(w: HTMLElement): number {
    const plate = w.querySelector<HTMLElement>(PLATE);
    const end = plate ? /inset\(\S+ (-?[\d.]+)px/.exec(getComputedStyle(plate).clipPath) : null;
    return w.getBoundingClientRect().width - Math.max(0, end ? Number(end[1]) : 0);
}

/** Run `done` once `prop` settles on `w`, unless a newer FLIP has claimed it. */
function release(w: HTMLElement, prop: string, done: () => void) {
    const mine = claim(w, prop);
    const end = (e?: TransitionEvent) => {
        if (e && (e.propertyName !== prop || (prop === "translate" && e.target !== w))) return;
        w.removeEventListener("transitionend", end);
        w.removeEventListener("transitioncancel", end);
        window.clearTimeout(timer);
        if (generation.get(w)?.[prop] === mine) done();
    };
    const timer = window.setTimeout(end, SETTLED_MS);
    w.addEventListener("transitionend", end);
    w.addEventListener("transitioncancel", end);
}

export async function flipRegions(container: HTMLElement | null, mutate: () => unknown): Promise<void> {
    if (container === null || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        await mutate();
        return;
    }
    const regions = () => [...container.querySelectorAll<HTMLElement>(":scope > .pane-wrapper")];
    const y0 = window.scrollY;
    const first = new Map(regions().map((w) => [w, [w.getBoundingClientRect(), shownWidth(w)] as const]));
    await mutate();
    await nextTick();
    // G6: the scroll is kept, unless the anchor region now ends above it (the
    // case the browser would clamp anyway); then the anchor is landed on, at once.
    const anchor = regions()[0];
    if (anchor && anchor.getBoundingClientRect().bottom < 0)
        anchor.scrollIntoView({ block: "start", behavior: "instant" });
    const scrolled = window.scrollY - y0;
    for (const w of regions()) {
        const was = first.get(w);
        if (was === undefined) continue;
        const mine = claim(w, "translate");
        w.style.removeProperty("--region-pin");
        w.style.transition = "none";
        w.style.translate = "";
        const now = w.getBoundingClientRect();
        const dx = was[0].left - now.left;
        const dy = was[0].top - scrolled - now.top;
        const moved = Math.abs(dx) >= 1 || Math.abs(dy) >= 1;
        if (moved && w.querySelector(":scope > .vj-enter-enter-active") !== null) {
            w.style.setProperty("--region-pin", `${dx}px ${dy}px`);
            w.style.transition = "";
            window.setTimeout(() => {
                if (generation.get(w)?.translate === mine)
                    w.style.removeProperty("--region-pin");
            }, SETTLED_MS);
        } else if (moved) {
            w.style.translate = `${dx}px ${dy}px`;
            void w.offsetWidth;
            w.style.transition = TRAVEL;
            w.style.translate = "";
            release(w, "translate", () => (w.style.transition = ""));
        } else w.style.transition = "";
        const gained = now.width - was[1];
        const plate = w.querySelector<HTMLElement>(PLATE);
        if (gained >= 1 && plate !== null) {
            w.style.setProperty("--region-clip-end", `${gained}px`);
            w.style.setProperty("--region-clip-cast", "0px");
            w.toggleAttribute("data-region-clip", true);
            void getComputedStyle(plate).clipPath;
            w.style.setProperty("--region-clip-end", CAST);
            w.style.setProperty("--region-clip-cast", CAST);
            release(w, "clip-path", () => {
                w.toggleAttribute("data-region-clip", false);
                w.style.removeProperty("--region-clip-end");
                w.style.removeProperty("--region-clip-cast");
            });
        }
    }
}
