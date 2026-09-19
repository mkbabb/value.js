import type { ShallowRef } from "vue";
import { nextTick, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { ColorModel } from "./color-model";
import type { DisplayColorSpace } from "./color-model";
import { resolveColorSpace, colorToHexString } from "./color-model";
import { convertPickerColor, parsePickerColor, serializePickerColor } from "./picker-color";
import { debounce } from "../shared/utils";

/**
 * useColorUrl — the LIVE URL↔model sync, and nothing else.
 *
 * X.W5.a · gate A6. Two things changed here and both are subtractions.
 *
 * (1) THE BOOT APPLY IS GONE. `boot/hydrate.ts` owns the FIRST value (the
 *     W2-1 ordering law: the model is BORN hydrated from URL → storage →
 *     default, synchronously, before the pipeline exists). The setup-time
 *     `applyUrlToModel()` here was a second reader of the same address — dead
 *     while the router navigated asynchronously (empty `route.query` at
 *     setup), and a redundant double-commit now that the composition root
 *     awaits `router.isReady()` before mounting. One URL read owner.
 *
 * (2) THE BOOT NO LONGER WRITES THE ADDRESS BAR. A cold load settled at
 *     `?space=lab&color=lab(92%25+88.8+20+/+82.7%25)` — state no user action
 *     produced, on both route classes, measured again at this wave's open.
 *     The writer is a model write that lands during SETUP, after this watch
 *     registers; the setup clamp is REFUTED as the trigger because it runs
 *     before the registration. Rather than pin one of the remaining setup-time
 *     writers, the cure names the CLASS: everything the boot commits happens
 *     synchronously in setup, so the sync ARMS on mount. The whole synchronous
 *     boot window is excluded, exactly, and every later write still lands — a
 *     cure that also killed the live sync would be over-cured, which is A6's
 *     own falsifier.
 */
export function useColorUrl(options: {
    model: ShallowRef<ColorModel>;
    updateModel: (patch: Partial<ColorModel>) => void;
}) {
    const { model, updateModel } = options;
    const router = useRouter();
    const route = useRoute();

    // Monotonic generation counter — replaces fragile boolean syncing guard.
    // When URL→Model writes (applyUrlToModel), it increments the generation.
    // The Model→URL debounced writer captures the generation at call time and
    // no-ops if it changed (meaning someone else wrote in the interim).
    let syncGen = 0;

    // URL → Model.
    //
    // Either half of the pair is enough (⟨ColorNutritionLabel CNL-26⟩): a
    // `?space=` with no colour used to be rejected outright by the `!space ||
    // !color` guard and then overwritten by the model→URL sync — a no-op twice
    // over, on an address a user can legitimately type or share.
    function applyUrlToModel(): boolean {
        const space = route.query.space as string | undefined;
        const color = route.query.color as string | undefined;
        if (!space && !color) return false;

        try {
            const displaySpace = (space ??
                model.value.selectedColorSpace) as DisplayColorSpace;
            const parsed =
                color !== undefined ? parsePickerColor(color) : model.value.color;
            const converted = convertPickerColor(parsed, resolveColorSpace(displaySpace));

            syncGen++;
            updateModel({
                selectedColorSpace: displaySpace,
                // With no colour in the address the SPACE changed, so the input
                // text is re-derived from the converted colour rather than left
                // reading in the space the user just navigated away from.
                inputColor:
                    color ??
                    (displaySpace === "hex"
                        ? colorToHexString(converted)
                        : serializePickerColor(converted)),
                color: converted,
            });
            return true;
        } catch (e) {
            console.warn("[useColorUrl] Invalid color in URL:", { space, color }, e);
            return false;
        }
    }

    // Model → URL (debounced, generation-guarded)
    const syncModelToUrl = debounce(() => {
        const gen = syncGen;
        const space = model.value.selectedColorSpace;

        const color = space === "hex"
              ? colorToHexString(model.value.color)
              : serializePickerColor(model.value.color);

        // If generation changed since debounce was scheduled, URL→Model wrote
        // in the interim — skip to avoid circular update
        if (gen !== syncGen) return;

        syncGen++;
        void router.replace({ query: { ...route.query, space, color } });
    }, 300);

    // The sync is armed once the boot's synchronous writes have flushed — and
    // the address is reconciled ONCE at that same moment, by the module that
    // owns the live sync rather than by a second boot reader.
    //
    // ⟨ColorNutritionLabel CNL-26⟩: the boot seed resolver requires BOTH halves
    // (`#/?space=…&color=…`) to seed from the address, so `?space=oklch` alone
    // reached the model through nothing at all — measured silently inert on
    // every space, then formerly overwritten by the model→URL sync. It is the
    // LIVE reader's job: at mount the boot's own writes have landed, so
    // applying the address here is a reconciliation, not a race. A `?color=`
    // the seed already used re-commits to the same value and nothing moves.
    let live = false;
    onMounted(() => {
        applyUrlToModel();
        // Arm AFTER the reconciliation's own flush, so it can never be read as
        // a user edit and echoed straight back into the address.
        void nextTick(() => {
            live = true;
        });
    });

    // Back/forward navigation — either half of the pair re-reads.
    watch(
        [() => route.query.color, () => route.query.space],
        () => applyUrlToModel(),
    );

    // Model → URL
    watch(
        [() => model.value.selectedColorSpace, () => model.value.color],
        () => {
            if (!live) return;
            syncModelToUrl();
        },
    );
}
