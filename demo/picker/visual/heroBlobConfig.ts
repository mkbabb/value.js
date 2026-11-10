/**
 * The hero blob's config, provided under glass's `BLOB_CONFIG_KEY`, with its
 * palette coupled to the live colour: the colour seeds a harmonious OKLCh ramp
 * (≤4 stops) that flows straight into the blob's spatial multi-stop colour
 * field. glass's Blob deep-watches `config.color.paletteStops`, so a colour
 * change repaints free. One source for every host that seats `HeroBlob`: the
 * app's atmosphere and the embed's picker slice.
 */
import { provide, reactive, watch, type Ref } from "vue";
import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/blob-config";
import { deriveBlobPalette, oklchStopToHex } from "@mkbabb/glass-ui/color";

export function provideHeroBlobConfig(color: Readonly<Ref<string>>) {
    // The 8-atom nested config: structuredClone so the reactive copy owns deep atoms.
    const blobConfig = reactive(structuredClone(BLOB_CONFIG_DEFAULTS));
    provide(BLOB_CONFIG_KEY, blobConfig);
    watch(
        color,
        (css) => {
            try {
                blobConfig.color.paletteStops = deriveBlobPalette(css, {
                    stopCount: 4,
                    harmony: "analogous",
                    chromaCeiling: 0.16,
                }).map(oklchStopToHex);
            } catch {
                // A transient un-parseable colour string leaves the last good ramp.
            }
        },
        { immediate: true },
    );
    return blobConfig;
}
