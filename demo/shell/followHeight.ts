// followHeight — the scene's block size travels with its cards (demo/DESIGN.md
// §5.7, G9; owner order 2026-11-05: "all height and width facilities fully
// animated"). The row's natural height is the lowest region's layout end,
// read to the sub-pixel: its drawn bottom less the two paint-only offsets a
// region carries (the FLIP's `translate`, flipRegions, and the device-pixel
// snap's relative `top`, useDevicePixelSnap); the leaver is out of flow
// inside its region, so it never counts. offsetTop + offsetHeight round each
// box to whole px: a 397.25 px card held its 961.25 px row at 961, and the
// page's height moved by a pixel (visual at-rest 390 palettes 1073/1074 across
// two runs, extract 1063 → 1062). The container is held at that
// height in px and `animations.css` transitions it on `--spring-panel`, so a
// swap that changes the scene's height glides from the drawn height to the
// new one, and a change mid-flight retargets from the live value (G7). The
// first measurement lands at once (auto → px does not interpolate), and
// under reduced motion the container is left at `auto` with no
// `data-follow-height`: its rows keep the layout they had before G9, so a
// scene that has no block size of its own (below) is never measured into
// `max-content` rows it would collapse in.
//
// A scene whose regions have no block size of their own (the five admin
// consoles: an `h-full` shell around a `min-h-0` scroller) is sized by the
// layout around it, not by its content: under `max-content` rows it measures
// 0 and would collapse to nothing. That scene is released, unheld and without
// `data-follow-height`, to the layout it had before G9. The question is asked
// again whenever the scene changes (a region added or removed, or a region's
// pane changing), never on a resize, so a released scene cannot flip back.
import { onBeforeUnmount, onMounted, type Ref } from "vue";

/** The block offset a region's paint-only moves add to its drawn box: the
 *  FLIP's `translate` and the device-pixel snap's relative `top`. */
function paintOffsetY(w: HTMLElement): number {
    const { translate, top, position } = getComputedStyle(w);
    const [, y = "0px"] = translate === "none" ? [] : translate.split(" ");
    return (parseFloat(y) || 0) + (position === "relative" ? parseFloat(top) || 0 : 0);
}

export function useFollowHeight(container: Ref<HTMLElement | null>) {
    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;
    let follow = true;
    const reduce =
        typeof matchMedia === "function"
            ? matchMedia("(prefers-reduced-motion: reduce)")
            : null;

    function update() {
        const c = container.value;
        if (c === null || !follow) return;
        if (reduce?.matches) {
            c.style.height = "";
            c.toggleAttribute("data-follow-height", false);
            return;
        }
        if (!c.hasAttribute("data-follow-height"))
            c.toggleAttribute("data-follow-height", true);
        const top = c.getBoundingClientRect().top + c.clientTop;
        let end = 0;
        for (const w of c.children)
            if (w instanceof HTMLElement)
                end = Math.max(end, w.getBoundingClientRect().bottom - top - paintOffsetY(w));
        if (end >= 1) {
            c.style.height = `${end}px`;
            return;
        }
        follow = false;
        c.style.height = "";
        c.toggleAttribute("data-follow-height", false);
    }

    function observe() {
        const c = container.value;
        if (c === null || ro === null || mo === null) return;
        ro.disconnect();
        mo.disconnect();
        mo.observe(c, { childList: true });
        for (const w of c.children) {
            ro.observe(w);
            mo.observe(w, { attributes: true, attributeFilter: ["data-pane"] });
        }
        follow = true;
        c.toggleAttribute("data-follow-height", true);
        update();
    }

    onMounted(() => {
        const c = container.value;
        if (c === null || typeof ResizeObserver !== "function") return;
        ro = new ResizeObserver(update);
        mo = new MutationObserver(observe);
        reduce?.addEventListener("change", update);
        observe();
    });

    onBeforeUnmount(() => {
        ro?.disconnect();
        mo?.disconnect();
        reduce?.removeEventListener("change", update);
    });
}
