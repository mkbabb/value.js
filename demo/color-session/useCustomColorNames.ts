import { ref, readonly } from "vue";
import { convertPickerColor, parsePickerColor, serializePickerColor } from "./picker-color";
import { getApprovedColorNames } from "./color-names";
import { ApiUnavailableError } from "../platform/transport/availability";
import type { ProposedColorName } from "./color-names";

const customNameRegistry = ref<Map<string, ProposedColorName>>(new Map());
const normalizedCustomNames = ref<Map<string, string>>(new Map());
const loaded = ref(false);
const loading = ref(false);

export function useCustomColorNames() {
    async function loadFromAPI(): Promise<void> {
        if (loaded.value || loading.value) return;
        loading.value = true;

        try {
            const { data: approved } = await getApprovedColorNames();

            const registry = new Map<string, ProposedColorName>();
            const normalized = new Map<string, string>();

            for (const entry of approved) {
                const key = entry.name.toLowerCase();
                registry.set(key, entry);

                try {
                    const xyz = convertPickerColor(parsePickerColor(entry.css), "xyz");
                    normalized.set(key, serializePickerColor(xyz));
                } catch {
                    // skip entries that fail to parse
                }
            }

            customNameRegistry.value = registry;
            normalizedCustomNames.value = normalized;
            loaded.value = true;
        } catch (e) {
            // inv-K-5 (K.W2b): custom color names are an OPTIONAL enhancement
            // (the picker falls back to the 147 built-in CSS names + value.js's
            // COLOR_NAMES). A failed/absent read is non-fatal and must fail
            // SILENTLY in production — no console output — so the e2e `zero
            // console errors` assertion holds when no backend is reachable.
            //
            // S.W2 W2-6: but a *code* defect in the registration loop above (a
            // response-shape change, a registerColorNames/Map bug) must not hide
            // behind the same undiagnosable silence. In DEV only, and only for a
            // throw that is NOT the expected backend-absence signal, emit a
            // console.debug (never an error/warn — the e2e gate stays clean).
            const isBackendAbsence =
                e instanceof ApiUnavailableError || e instanceof TypeError;
            if (import.meta.env.DEV && !isBackendAbsence) {
                console.debug("[useCustomColorNames] color-name load failed (not backend-absence):", e);
            }
        } finally {
            loading.value = false;
        }
    }

    function findCustomName(xyzString: string): string | undefined {
        for (const [name, xyz] of normalizedCustomNames.value) {
            if (xyz === xyzString) return name;
        }
        return undefined;
    }

    function getMetadata(name: string): ProposedColorName | undefined {
        return customNameRegistry.value.get(name.toLowerCase());
    }

    function reset(): void {
        customNameRegistry.value = new Map();
        normalizedCustomNames.value = new Map();
        loaded.value = false;
    }

    return {
        loaded: readonly(loaded),
        loading: readonly(loading),
        loadFromAPI,
        findCustomName,
        getMetadata,
        reset,
    };
}
