import { ref, readonly } from "vue";
import { registerColorNames, clearCustomColorNames } from "@src/parsing/color";
import { parseCSSColor } from "@src/parsing/color";
import { colorUnit2 } from "@src/units/color/normalize";
import { getApprovedColorNames } from "@lib/palette/api";
import type { ProposedColorName } from "@lib/palette/types";

const DIGITS = 2;

const customNameRegistry = ref<Map<string, ProposedColorName>>(new Map());
const normalizedCustomNames = ref<Map<string, string>>(new Map());
const loaded = ref(false);
const loading = ref(false);

export function useCustomColorNames() {
    async function loadFromAPI(): Promise<void> {
        if (loaded.value || loading.value) return;
        loading.value = true;

        try {
            const approved = await getApprovedColorNames();

            const nameMap: Record<string, string> = {};
            const registry = new Map<string, ProposedColorName>();
            const normalized = new Map<string, string>();

            for (const entry of approved) {
                const key = entry.name.toLowerCase();
                nameMap[key] = entry.css;
                registry.set(key, entry);

                try {
                    const parsed = parseCSSColor(entry.css);
                    const xyz = colorUnit2(parsed as any, "xyz", false, false, false);
                    normalized.set(key, xyz.value.toFormattedString(DIGITS));
                } catch {
                    // skip entries that fail to parse
                }
            }

            registerColorNames(nameMap);
            customNameRegistry.value = registry;
            normalizedCustomNames.value = normalized;
            loaded.value = true;
        } catch (e) {
            console.warn("Failed to load custom color names:", e);
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
        clearCustomColorNames();
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
