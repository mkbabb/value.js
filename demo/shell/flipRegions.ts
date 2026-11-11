// flipRegions — the scene's regions settle with their cards (demo/DESIGN.md
// §5.7, G3 + G6). A region that MOVES (a stacked row reflowing under a new
// stage height, a reorder) translates from where it was drawn to where it now
// lies; a region that WIDENS (a dual → single hop) opens its plate from the old
// edge to the new. Both run on the riser's own clock (`--spring-panel-duration`),
// so the boxes and the card land together. The move rides `--ease-standard`,
// never the panel spring: the spring overshoots by a share of the travel, and a
// stacked reorder travels ~600 px, so its overshoot carried the region ~24 px
// past its rest and into the dock band above (o1109c). Nor `--ease-out`: it
// leaves rest at full speed, five times the mean, so a stacked reorder's
// first frame moved the picker 45-100 px at once, the 390 "picker jump"
// (o1110 D3). The standard curve starts from rest and lands without overshoot. The card's own rise
// keeps the spring; its travel is 0.75rem, so its overshoot stays sub-pixel. First is read as DRAWN (a FLIP still in
// flight is the start of the next), so A → B → C retargets from the live pose.
// Only the wrapper is written, and every write is cleared when its transition
// ends or is cancelled: a cached pane never carries a FLIP away with it.
import { nextTick } from "vue";

const PLATE = ":scope > .glass-resting, :scope > div > .glass-resting";
const CAST = "-12px";
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
        claim(w, "translate");
        w.style.transition = "none";
        w.style.translate = "";
        const now = w.getBoundingClientRect();
        const dx = was[0].left - now.left;
        const dy = was[0].top - scrolled - now.top;
        if (Math.abs(dx) >= 1 || Math.abs(dy) >= 1) {
            w.style.translate = `${dx}px ${dy}px`;
            void w.offsetWidth;
            w.style.transition = "translate var(--spring-panel-duration) var(--ease-standard)";
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
