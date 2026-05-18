<script setup lang="ts">
import { computed, inject } from "vue";
import { Paintbrush, ChevronDown } from "lucide-vue-next";
import { DockLayer } from ".";
import { DockIconButton } from "@mkbabb/glass-ui/dock";
import MobileMenuDropdown from "./menus/MobileMenuDropdown.vue";
import ProfileSection from "./menus/ProfileSection.vue";
import DockViewSelect from "./DockViewSelect.vue";
import PaneSegmentedControl from "@components/custom/panes/PaneSegmentedControl.vue";
import { VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY } from "@components/custom/color-picker/keys";
import type { ViewEntry } from "./composables/useDockAdminMode";
import type { DockActionBar } from "./composables/useDockActionBar";

const props = defineProps<{
    currentView: string;
    currentIcon: unknown;
    isAdminMode: boolean;
    isDesktop: boolean;
    viewEntries: ViewEntry[];
    hasAnyActionBar: boolean;
    actionBarLayerActive: boolean;
    genericBar: DockActionBar | null;
    linkCopied: boolean;
}>();

const emit = defineEmits<{
    viewChange: [id: string | number | boolean | Record<string, string> | null];
    toggleActionBar: [];
    startSlugEdit: [];
    copySlug: [];
    shareLink: [];
}>();

// open is the single-mutex-managed model passed in from Dock.vue
const viewSelectOpen = defineModel<boolean>("viewSelectOpen", { default: false });
const mobileMenuOpen = defineModel<boolean>("mobileMenuOpen", { default: false });
const profileMenuOpen = defineModel<boolean>("profileMenuOpen", { default: false });
const mbabbMenuOpen = defineModel<boolean>("mbabbMenuOpen", { default: false });

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const safeAccent = inject(SAFE_ACCENT_KEY)!;
const viewManager = inject(VIEW_MANAGER_KEY)!;
</script>

<template>
    <DockLayer id="main">
        <!-- View selector — gate (a): viewSelectOpen comes from Dock.vue's single mutex -->
        <DockViewSelect
            v-model:open="viewSelectOpen"
            :current-view="currentView"
            :current-icon="currentIcon"
            :safe-accent="safeAccent"
            :css-color-opaque="cssColorOpaque"
            :is-admin-mode="isAdminMode"
            :is-desktop="isDesktop"
            :view-entries="viewEntries"
            @update:model-value="emit('viewChange', $event)"
        />

        <!-- Action bar toggle -->
        <div v-if="hasAnyActionBar" class="dock-separator"></div>
        <div
            class="action-bar-toggle-slot"
            :class="{ 'is-visible': hasAnyActionBar }"
        >
            <div class="action-bar-toggle-inner">
                <DockIconButton
                    compact
                    :class="{ 'is-active': actionBarLayerActive }"
                    title="Action bar"
                    :aria-pressed="actionBarLayerActive"
                    :tabindex="hasAnyActionBar ? 0 : -1"
                    @click="emit('toggleActionBar')"
                >
                    <component
                        :is="genericBar?.icon ?? Paintbrush"
                        class="w-6 h-6"
                        :style="{ color: genericBar?.accentColor ?? safeAccent }"
                    />
                    <span v-if="isDesktop" class="text-small font-display" :style="{ color: genericBar?.accentColor ?? safeAccent }">
                        {{ genericBar?.label ?? 'Tools' }}
                    </span>
                    <ChevronDown class="w-3 h-3 text-muted-foreground" />
                </DockIconButton>
            </div>
        </div>

        <!-- Mobile pane toggle — Ae-5: PaneSegmentedControl owns this control (one owner) -->
        <template v-if="viewManager.currentConfig.value.right !== null">
            <div class="dock-separator lg:hidden"></div>
            <div class="lg:hidden">
                <PaneSegmentedControl
                    :model-value="viewManager.mobilePaneIndex.value"
                    :left-label="viewManager.currentConfig.value.leftLabel ?? ''"
                    :right-label="viewManager.currentConfig.value.rightLabel ?? ''"
                    @update:model-value="(v) => viewManager.mobilePaneIndex.value = v"
                />
            </div>
        </template>

        <!-- Mobile overflow menu -->
        <div class="dock-separator lg:hidden"></div>
        <MobileMenuDropdown
            v-model:open="mobileMenuOpen"
            :css-color-opaque="safeAccent"
            :link-copied="linkCopied"
            @share-link="emit('shareLink')"
            @start-slug-edit="emit('startSlugEdit')"
            @copy-slug="emit('copySlug')"
        />

        <!-- Desktop profile + @mbabb -->
        <ProfileSection
            v-model:profile-menu-open="profileMenuOpen"
            v-model:mbabb-menu-open="mbabbMenuOpen"
            :css-color-opaque="safeAccent"
            :link-copied="linkCopied"
            @share-link="emit('shareLink')"
            @start-slug-edit="emit('startSlugEdit')"
            @copy-slug="emit('copySlug')"
        />
    </DockLayer>
</template>

<style scoped>
@reference "../../../styles/style.css";

/* Action-bar toggle slot: animates between 0 and content width via the
   grid-template-columns 0fr → 1fr pattern (no max-width clipping). */
.action-bar-toggle-slot {
    display: grid;
    grid-template-columns: 0fr;
    opacity: 0;
    transition:
        grid-template-columns var(--duration-normal) var(--ease-standard),
        opacity var(--duration-normal) var(--ease-standard);
}

.action-bar-toggle-slot.is-visible {
    grid-template-columns: 1fr;
    opacity: 1;
}

.action-bar-toggle-inner {
    overflow: hidden;
    min-width: 0;
    display: flex;
    align-items: center;
}
</style>
