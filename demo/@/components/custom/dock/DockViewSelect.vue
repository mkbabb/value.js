<script setup lang="ts">
import { ArrowLeft, Shield } from "@lucide/vue";
import { DockSelectTrigger } from "@mkbabb/glass-ui/dock";
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectValue,
} from "@components/ui/select";
import { inject } from "vue";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import type { ViewEntry } from "./composables/useDockAdminMode";

const {
    currentView,
    currentIcon,
    isAdminMode,
    isDesktop,
    viewEntries,
} = defineProps<{
    currentView: string;
    currentIcon: unknown;
    isAdminMode: boolean;
    isDesktop: boolean;
    viewEntries: ViewEntry[];
}>();

const emit = defineEmits<{
    "update:modelValue": [id: string];
    // gate (a): open is passed in as v-model:open from the single mutex instance
    // Dock.vue owns — DockViewSelect does NOT call usePopupMutex itself.
    "update:open": [open: boolean];
}>();

// open is driven entirely by the parent's single mutex-managed ref
const open = defineModel<boolean>("open", { default: false });

const pm = inject(PALETTE_MANAGER_KEY)!;

// W7-4 (ONE dock voice) — each menu entry speaks ITS OWN gamut-guarded view
// hue (the `--accent-view-<id>` static tokens useViewAccents writes): the
// menu is the navigation's color-wheel legend. Admin entries keep the gold
// identity (admin is a mode, not a hue turn — viewSchema's own ruling).
function entryAccent(id: string): string {
    return id.startsWith("admin-")
        ? "var(--color-gold)"
        : `var(--accent-view-${id})`;
}
</script>

<template>
    <Select
        :model-value="currentView"
        :open="open"
        @update:open="open = $event"
        @update:model-value="(id) => emit('update:modelValue', id as string)"
    >
        <!-- Ad-18 marker: [&>span]:line-clamp-none cancels glass-ui's internal
             line-clamp-1 on the trigger label span. Root fix is a `clampLabel`
             prop on glass-ui DockSelectTrigger (filed coordination/Q.md §3). -->
        <!-- W7-4 (ONE dock voice): the trigger — icon + ring — speaks
             `--accent-view`, the CURRENT view's gamut-guarded token. The ring
             seam (`--dock-ring`) is re-wired off the live accent onto the view
             accent: it is the W7-1 morph clause's continuity carrier (the seal
             rim grows into this ring — one hue held the whole way). The
             producer-side ring consume is the filed L13/W7-1 ask. -->
        <DockSelectTrigger
            aria-label="Select view"
            class="view-select-trigger text-small font-display font-normal [&>span]:line-clamp-none"
            :style="{ '--dock-ring': isAdminMode ? 'var(--color-gold)' : 'var(--accent-view)' }"
        >
            <!-- The view-select moment (R.W4 Lane B / B3): the trigger icon
                 swaps on the morph family (scale-settle beat), and reads the
                 per-view accent (B2 — var(--accent-view), the ONE resolver). -->
            <Transition name="vj-morph" mode="out-in">
                <component
                    :is="currentIcon"
                    :key="currentView"
                    class="w-6 h-6 shrink-0"
                    :class="isAdminMode && 'gold-shimmer-icon'"
                    :style="[
                        { '--vj-morph-scale': '0.6', '--vj-morph-y': '0px' },
                        isAdminMode ? {} : { color: 'var(--accent-view)' },
                    ]"
                />
            </Transition>
            <SelectValue v-if="isDesktop" />
        </DockSelectTrigger>
        <!-- B.W1: kept wider than --menu-min-w — long view-option labels need the space -->
        <SelectContent class="min-w-[12rem]">
            <SelectGroup class="text-small font-display">
                <SelectItem
                    v-for="entry in viewEntries"
                    :key="entry.id"
                    :value="entry.id"
                    class="py-1.5 px-2.5"
                    hide-indicator
                >
                    <!-- W7-4 — the color-wheel legend: every entry's dot +
                         icon speak THEIR OWN view hue (the 9 gamut-guarded
                         static tokens), never the live accent (that voice
                         belongs to Tools/Login — app chrome). The former
                         current-item-only live dot + gray siblings die here.
                         S.W5-7 (Q4 EXCISE) stands: labels speak ink — hue
                         belongs to color-data surfaces (dots/icons). -->
                    <span class="flex items-center gap-2">
                        <span
                            class="inline-block w-2 h-2 rounded-full shrink-0 transition-colors"
                            :style="{ backgroundColor: entryAccent(entry.id) }"
                        ></span>
                        <component
                            :is="entry.icon"
                            class="w-4 h-4 shrink-0"
                            :style="{ color: entryAccent(entry.id) }"
                        />
                        <span :class="currentView === entry.id ? 'font-semibold' : ''">{{ entry.label }}</span>
                    </span>
                </SelectItem>

                <!-- Admin mode toggle separator + entry (single derived row, not two duplicated branches) -->
                <template v-if="pm.isAdminAuthenticated.value">
                    <div class="border-t border-border my-1"></div>
                    <SelectItem
                        value="__admin_toggle__"
                        class="py-1.5 px-2.5"
                        hide-indicator
                    >
                        <span v-if="!isAdminMode" class="flex items-center gap-2">
                            <span class="inline-block w-2 h-2 rounded-full shrink-0" style="background: var(--color-gold)"></span>
                            <Shield class="w-4 h-4 shrink-0 gold-shimmer-icon" />
                            <span class="gold-shimmer">Admin</span>
                        </span>
                        <span v-else class="flex items-center gap-2">
                            <span class="inline-block w-2 h-2 rounded-full shrink-0" style="background: color-mix(in srgb, var(--muted-foreground) 25%, transparent)"></span>
                            <ArrowLeft class="w-4 h-4 shrink-0 text-muted-foreground" />
                            <span>Back to app</span>
                        </span>
                    </SelectItem>
                </template>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>

<style scoped>
/* Admin golden icon — matches the class used in Dock.vue collapsed slot */
.gold-shimmer-icon {
    color: var(--color-gold);
    filter: drop-shadow(0 0 2px color-mix(in srgb, var(--color-gold) 30%, transparent));
}

/* W7-4 — the BOUNDED view-switch hue sweep (the W3-7 §2 mechanism, form A):
 * the <color>-registered `--accent-view` transitions on THIS trigger scope
 * only — the icon + ring inherit the one animating computed value, so the
 * navigation still SWEEPS to the new view's hue, while the root token snaps
 * (no per-frame whole-document inherited-property invalidation — the P1-7
 * tax is dead). PRM: neutralised by the global guard like any transition. */
.view-select-trigger {
    transition: --accent-view var(--duration-panel) var(--ease-standard);
}
</style>
