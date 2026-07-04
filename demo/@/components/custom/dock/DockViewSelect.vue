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
    safeAccent,
    cssColorOpaque,
    isAdminMode,
    isDesktop,
    viewEntries,
} = defineProps<{
    currentView: string;
    currentIcon: unknown;
    safeAccent: string;
    cssColorOpaque: string;
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
        <DockSelectTrigger
            aria-label="Select view"
            class="text-small font-display font-normal [&>span]:line-clamp-none"
            :style="{ '--dock-ring': safeAccent }"
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
                    <span class="flex items-center gap-2">
                        <span
                            class="inline-block w-2 h-2 rounded-full shrink-0 transition-colors"
                            :style="{ backgroundColor: currentView === entry.id ? (isAdminMode ? 'var(--color-gold)' : cssColorOpaque) : 'color-mix(in srgb, var(--muted-foreground) 25%, transparent)' }"
                        ></span>
                        <component
                            :is="entry.icon"
                            class="w-4 h-4 shrink-0"
                            :style="currentView === entry.id ? { color: isAdminMode ? 'var(--color-gold)' : safeAccent } : {}"
                            :class="currentView !== entry.id ? 'text-muted-foreground' : ''"
                        />
                        <span :class="[
                            currentView === entry.id ? 'font-semibold' : '',
                            entry.id === 'palettes' ? 'pastel-rainbow-text' : '',
                        ]">{{ entry.label }}</span>
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
</style>
