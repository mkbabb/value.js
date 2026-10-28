import { ref, readonly, shallowRef } from "vue";
import { namedColorEntry, type NamedColorEntry } from "./named-color-snap";
import { getApprovedColorNames } from "./color-names";
import { ApiUnavailableError } from "../platform/transport/availability";
import type { ProposedColorName } from "./color-names";

const customNameRegistry = ref<Map<string, ProposedColorName>>(new Map());
// The approved names projected into OKLab ONCE, at load — the named snap's
// custom half (`named-color-snap.ts`). It replaced a full-precision XYZ-string
// map that matched a bit-identical colour only.
const customNameEntries = shallowRef<readonly NamedColorEntry[]>([]);
const loaded = ref(false);
const loading = ref(false);

export function useCustomColorNames() {
    async function loadFromAPI(): Promise<void> {
        if (loaded.value || loading.value) return;
        loading.value = true;

        try {
            const { data: approved } = await getApprovedColorNames(500);

            const registry = new Map<string, ProposedColorName>();
            const entries: NamedColorEntry[] = [];

            for (const entry of approved) {
                const key = entry.name.toLowerCase();
                registry.set(key, entry);
                // An entry whose css does not parse is skipped, not fatal.
                const projected = namedColorEntry(key, entry.css, "custom");
                if (projected) entries.push(projected);
            }

            customNameRegistry.value = registry;
            customNameEntries.value = entries;
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

    function getMetadata(name: string): ProposedColorName | undefined {
        return customNameRegistry.value.get(name.toLowerCase());
    }

    function reset(): void {
        customNameRegistry.value = new Map();
        customNameEntries.value = [];
        loaded.value = false;
    }

    return {
        loaded: readonly(loaded),
        loading: readonly(loading),
        loadFromAPI,
        customNameEntries: readonly(customNameEntries),
        getMetadata,
        reset,
    };
}
