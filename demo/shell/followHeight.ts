// followHeight — the scene's block size travels with its cards (demo/DESIGN.md
// §5.7, G9; owner order 2026-11-05: "all height and width facilities fully
// animated"). The row's natural height is the lowest region's layout end
// (offsetTop + offsetHeight: layout boxes, so a FLIP's translate and the
// leaver, which is out of flow, never count). The container is held at that
// height in px and `animations.css` transitions it on `--spring-panel`, so a
// swap that changes the scene's height glides from the drawn height to the
// new one, and a change mid-flight retargets from the live value (G7). The
// first measurement lands at once (auto → px does not interpolate), and
// under reduced motion the container is left at `auto`.
//
// A scene whose regions have no block size of their own (the five admin
// consoles: an `h-full` shell around a `min-h-0` scroller) is sized by the
// layout around it, not by its content: under `max-content` rows it measures
// 0 and would collapse to nothing. That scene is released, unheld and without
// `data-follow-height`, to the layout it had before G9. The question is asked
// again whenever the scene changes (a region added or removed, or a region's
// pane changing), never on a resize, so a released scene cannot flip back.
import { onBeforeUnmount, onMounted, type Ref } from "vue";

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
            return;
        }
        let end = 0;
        for (const w of c.children)
            if (w instanceof HTMLElement)
                end = Math.max(end, w.offsetTop + w.offsetHeight);
        if (end > 0) {
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
