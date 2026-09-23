/**
 * X.W7.c — the browser harness the G9/G10 layout assertions mount.
 *
 * Every named fixture case renders one real `PaletteCard` under the shipped
 * stylesheet cascade (the same three sheets `color-picker/main.ts` imports), so
 * the measured geometry is the product's, not a jsdom zero. The harness adds
 * only the page gutter; every card sits in one shipped `PaletteCardGrid`.
 * It styles no card byte.
 */
import { computed, createApp, h, ref } from "vue";
import "../../../../styles/utils.css";
import "../../../../styles/foundation.css";
import "../../../../styles/focus-ring.css";
import { PaletteCard, PaletteCardGrid } from "../../../../palettes/browser/card";
import { API_CLIENT_KEY, createApiClient } from "../../../../platform/transport/useApiClient";
import { INK_AMBIENT_KEY } from "../../../../color-session/keys";
import { HARNESS_CASES, fixturePalette } from "../fixtures";

// N-13: one card whose disclosure the browser suite drives (expand/collapse),
// so the reduced-motion leave can be observed to COMPLETE.
const expanded = ref(false);
declare global {
    interface Window {
        setDisclosure: (open: boolean) => void;
    }
}
window.setDisclosure = (open) => {
    expanded.value = open;
};

createApp({
    render: () =>
        h("main", { style: "padding: 16px;" }, [
            // ONE shipped list, every case a direct child card — the product's
            // own geometry (grid-cols-1 = minmax(auto, 1fr), auto rows), so a
            // card's height is its own, never a stretched grid cell's.
            h(PaletteCardGrid, null, () =>
                [
                    ...Object.entries(HARNESS_CASES).map(([key, make]) =>
                        h(PaletteCard, { key, palette: make(), "data-case": key }),
                    ),
                    h(PaletteCard, {
                        key: "disclosure",
                        palette: fixturePalette({ name: "Disclosure" }),
                        expanded: expanded.value,
                        "data-case": "disclosure",
                    }),
                ],
            ),
        ]),
})
    // The card menu reads the api-client seam (availability) — the same
    // root provider `color-picker/main.ts` installs; no request is issued.
    .provide(API_CLIENT_KEY, createApiClient())
    // The ink referent the boot writer provides (`useAtmosphereBoot`): the
    // atmosphere's derived lightness — here its empty-palette value, 0.5.
    .provide(INK_AMBIENT_KEY, computed(() => 0.5))
    .mount("#app");
