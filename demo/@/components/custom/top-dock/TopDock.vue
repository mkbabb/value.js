<script setup lang="ts">
import { computed, inject, ref, nextTick, watch, useTemplateRef } from "vue";
import {
    ChevronDown,
    Share2,
    Check,
    Github,
    LogIn,
    LogOut,
    Copy,
    RefreshCw,
    ArrowRight,
    X as XIcon,
    Loader2,
    MoreVertical,
    Undo2,
    UserCircle,
    Paintbrush,
    Home,
    ArrowLeft,
} from "lucide-vue-next";
import GlassDock from "@components/custom/color-picker/GlassDock.vue";
import { DarkModeToggle } from "@components/custom/dark-mode-toggle";
import { WatercolorDot } from "@components/custom/watercolor-dot";
import DockPopover from "./DockPopover.vue";
import ActionBarLayer from "./ActionBarLayer.vue";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { Avatar, AvatarImage } from "@components/ui/avatar";
import { useMediaQuery } from "@vueuse/core";
import { VIEW_MANAGER_KEY } from "@composables/useViewManager";
import type { ViewId } from "@composables/useViewManager";
import { PALETTE_MANAGER_KEY } from "@composables/usePaletteManager";
import { copyToClipboard } from "@composables/useClipboard";
import type { ActionBarContext } from "@components/custom/color-picker/keys";

import type { EditTarget } from "@components/custom/color-picker";

const props = defineProps<{
    cssColorOpaque: string;
    linkCopied: boolean;
    editTarget: EditTarget | null;
    actionBar?: ActionBarContext | null;
}>();

const emit = defineEmits<{
    shareLink: [];
    commitEdit: [];
    cancelEdit: [];
}>();

const viewManager = inject(VIEW_MANAGER_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;
const actionBar = computed(() => props.actionBar ?? null);

const viewEntries = computed(() => {
    const entries: { id: ViewId; label: string; icon: any }[] = [
        { id: "picker", ...viewManager.viewMap.picker },
        { id: "palettes", ...viewManager.viewMap.palettes },
        { id: "browse", ...viewManager.viewMap.browse },
        { id: "extract", ...viewManager.viewMap.extract },
    ];
    if (pm.isAdminAuthenticated.value) {
        entries.push(
            { id: "admin-users", ...viewManager.viewMap["admin-users"] },
            { id: "admin-names", ...viewManager.viewMap["admin-names"] },
        );
    }
    return entries;
});

function onViewChange(id: string | number | boolean | Record<string, string> | null) {
    if (typeof id === "string") {
        viewManager.switchView(id as ViewId);
    }
}

// ── Action bar layer ──
const actionBarLayerActive = ref(false);
const actionBarLayerRef = ref<InstanceType<typeof ActionBarLayer> | null>(null);

function toggleActionBar() {
    actionBarLayerActive.value = !actionBarLayerActive.value;
}

// Auto-close action bar when actionBar becomes null (KeepAlive deactivation)
watch(actionBar, (ctx) => {
    if (!ctx && actionBarLayerActive.value) {
        actionBarLayerActive.value = false;
    }
});

// Keep dock open while action bar is active
watch(actionBarLayerActive, (active) => {
    if (active) dockRef.value?.keepOpen();
    else dockRef.value?.release();
});

function onActionBarOpenPalette() {
    if (viewManager.currentView.value === "palettes") {
        viewManager.switchView("picker");
    } else {
        viewManager.switchView("palettes");
    }
}

function onActionBarOpenExtract() {
    if (viewManager.currentView.value === "extract") {
        viewManager.switchView("picker");
    } else {
        viewManager.switchView("extract");
    }
}

// ── Inline slug / login logic ──
const slugEditMode = ref(false);
const slugInput = ref("");
const slugSwitching = ref(false);
const slugError = ref("");
const slugInputRef = ref<HTMLInputElement | null>(null);

function onStartSlugEdit() {
    slugInput.value = "";
    slugError.value = "";
    slugEditMode.value = true;
    nextTick(() => {
        slugInputRef.value?.focus();
    });
}

function looksLikeSlug(value: string): boolean {
    return /^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/.test(value);
}

function normalizeTokenInput(raw: string): string {
    let token = raw.trim();
    const assignmentMatch = token.match(/^ADMIN_TOKEN\s*=\s*(.+)$/i);
    if (assignmentMatch) token = assignmentMatch[1]!.trim();
    if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
        token = token.slice(1, -1).trim();
    }
    return token;
}

async function onSlugSubmit() {
    const raw = slugInput.value.trim();
    if (!raw) return;
    slugSwitching.value = true;
    slugError.value = "";
    try {
        const normalized = normalizeTokenInput(raw).toLowerCase();
        const isAdmin = !looksLikeSlug(normalized);

        if (looksLikeSlug(normalized) && normalized === pm.userSlug.value) {
            slugError.value = "Already signed in.";
            slugSwitching.value = false;
            return;
        }

        pm.onSlugSwitch(isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);
        slugInput.value = "";
        slugEditMode.value = false;
    } catch (e: any) {
        const msg = e?.message ?? "";
        if (msg.includes("409")) slugError.value = "Already signed in.";
        else if (msg.includes("404")) slugError.value = "Slug not found.";
        else if (msg.includes("429")) slugError.value = "Too many attempts.";
        else slugError.value = msg || "Login failed";
    } finally {
        slugSwitching.value = false;
    }
}

function onCopySlug() {
    if (pm.userSlug.value) copyToClipboard(pm.userSlug.value);
}

// View select open state — keep dock open while dropdown is visible
const viewSelectOpen = ref(false);

// Mobile edit mode — show edit controls in dock instead of EditDrawer
const isDesktop = useMediaQuery("(min-width: 1024px)");
const mobileEditActive = computed(() => !isDesktop.value && !!props.editTarget);

// Reset login mode when dock collapses (but preserve action bar state)
const dockRef = useTemplateRef<InstanceType<typeof GlassDock>>('dockRef');
watch(() => dockRef.value?.expanded, (expanded) => {
    if (!expanded && slugEditMode.value) {
        slugEditMode.value = false;
    }
});

// Keep dock open while editing on mobile
watch(mobileEditActive, (active) => {
    if (active) { dockRef.value?.keepOpen(); dockRef.value?.expand?.(); }
    else dockRef.value?.release();
});

// Keep dock open when view select dropdown, @mbabb popover, or any teleported child is open
watch(viewSelectOpen, (open) => {
    if (open) dockRef.value?.keepOpen();
    else dockRef.value?.release();
});

// Determine which main layer is active
const mainLayerActive = computed(() => !slugEditMode.value && !mobileEditActive.value && !actionBarLayerActive.value);
</script>

<template>
    <div class="fixed top-[var(--dock-pos)] left-1/2 -translate-x-1/2 z-40 flex items-center justify-center pointer-events-none">
        <div class="pointer-events-auto">
            <GlassDock ref="dockRef" :collapse-delay="5000" :start-collapsed="true" :fit-content="true">
                <!-- Expanded state: login mode transforms entire dock -->
                <div class="dock-content-layers">
                    <!-- Mobile edit layer -->
                    <div :class="['dock-content-layer justify-center', { 'layer-active': mobileEditActive }]"
                         :inert="!mobileEditActive || undefined">
                        <WatercolorDot
                            v-if="editTarget"
                            :color="editTarget.originalCss"
                            tag="div"
                            class="w-7 h-7 shrink-0 opacity-50"
                            seed="edit-original"
                        />
                        <span class="text-muted-foreground text-xs">&rarr;</span>
                        <WatercolorDot
                            :color="cssColorOpaque"
                            tag="div"
                            class="w-7 h-7 shrink-0"
                            seed="edit-new"
                        />
                        <div class="dock-separator"></div>
                        <button
                            class="dock-icon-btn"
                            title="Save edit"
                            @click="emit('commitEdit')"
                        >
                            <Check class="w-4 h-4" :style="{ color: cssColorOpaque }" />
                        </button>
                        <button
                            class="dock-icon-btn"
                            title="Cancel edit"
                            @click="emit('cancelEdit')"
                        >
                            <Undo2 class="w-4 h-4" />
                        </button>
                    </div>

                    <!-- Slug edit layer -->
                    <div :class="['dock-content-layer justify-center', { 'layer-active': slugEditMode && !mobileEditActive }]"
                         :inert="!(slugEditMode && !mobileEditActive) || undefined">
                        <form
                            class="flex items-center gap-1.5"
                            @submit.prevent="onSlugSubmit"
                        >
                            <LogIn class="w-4 h-4 text-muted-foreground shrink-0" />
                            <input
                                ref="slugInputRef"
                                v-model="slugInput"
                                placeholder="enter slug or token..."
                                class="fira-code text-sm bg-transparent border-none outline-none w-40 min-w-0 placeholder:text-muted-foreground/50"
                                @keydown.escape.stop="slugEditMode = false"
                            />
                            <button
                                type="submit"
                                :disabled="!slugInput.trim() || slugSwitching"
                                class="dock-icon-btn !min-w-0 !w-auto !h-auto !p-1"
                            >
                                <Loader2 v-if="slugSwitching" class="w-3.5 h-3.5 animate-spin" />
                                <ArrowRight v-else class="w-3.5 h-3.5" />
                            </button>
                        </form>

                        <div class="dock-separator"></div>

                        <button
                            class="dock-icon-btn !min-w-0 !w-auto !h-auto !p-1"
                            title="Generate new slug"
                            @click="slugEditMode = false; pm.onRegenerateSlug()"
                        >
                            <RefreshCw class="w-3.5 h-3.5" />
                        </button>

                        <button
                            class="dock-icon-btn !min-w-0 !w-auto !h-auto !p-1"
                            title="Cancel"
                            @click="slugEditMode = false"
                        >
                            <XIcon class="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <!-- Action bar layer -->
                    <div v-if="actionBar"
                         :class="['dock-content-layer', { 'layer-active': actionBarLayerActive && !mobileEditActive && !slugEditMode }]"
                         :inert="!(actionBarLayerActive && !mobileEditActive && !slugEditMode) || undefined">
                        <button
                            class="dock-icon-btn shrink-0"
                            title="Back"
                            @click="actionBarLayerActive = false"
                        >
                            <ArrowLeft class="w-5 h-5" />
                        </button>
                        <div class="dock-separator"></div>
                        <ActionBarLayer
                            ref="actionBarLayerRef"
                            :action-bar="actionBar"
                            :edit-target="editTarget"
                            @open-palette="onActionBarOpenPalette"
                            @open-extract="onActionBarOpenExtract"
                        />
                    </div>

                    <!-- Main navigation layer -->
                    <div :class="['dock-content-layer', { 'layer-active': mainLayerActive }]"
                         :inert="!mainLayerActive || undefined">
                        <!-- View selector -->
                        <Select
                            :model-value="viewManager.currentView.value"
                            :open="viewSelectOpen"
                            @update:open="viewSelectOpen = $event"
                            @update:model-value="onViewChange"
                        >
                            <SelectTrigger
                                class="dock-select-trigger border-none h-auto bg-transparent fraunces text-sm gap-1 w-auto [&>span]:line-clamp-none [&>svg:last-child]:w-3 [&>svg:last-child]:h-3 !rounded-full focus:!ring-0 focus:!ring-offset-0 focus:!outline-none"
                                :style="{ '--dock-ring': cssColorOpaque }"
                            >
                                <Home
                                    class="w-5 h-5 shrink-0"
                                    :style="{ color: cssColorOpaque }"
                                />
                                <SelectValue class="hidden sm:inline" />
                            </SelectTrigger>
                            <SelectContent class="view-select-content min-w-[12rem] bg-card/95 backdrop-blur-xl border-border/60 shadow-lg rounded-xl">
                                <SelectGroup class="fraunces text-sm">
                                    <SelectItem
                                        v-for="entry in viewEntries"
                                        :key="entry.id"
                                        :value="entry.id"
                                        class="!pl-2.5 py-1.5 px-2.5 !rounded-lg"
                                        hide-indicator
                                    >
                                        <span class="flex items-center gap-2">
                                            <span
                                                class="inline-block w-2 h-2 rounded-full shrink-0 transition-colors"
                                                :style="{ backgroundColor: viewManager.currentView.value === entry.id ? cssColorOpaque : 'hsl(var(--muted-foreground) / 0.25)' }"
                                            ></span>
                                            <component :is="entry.icon" class="w-4 h-4 shrink-0" :style="viewManager.currentView.value === entry.id ? { color: cssColorOpaque } : {}" :class="viewManager.currentView.value !== entry.id ? 'text-muted-foreground' : ''" />
                                            <span :class="[
                                                viewManager.currentView.value === entry.id ? 'font-semibold' : '',
                                                entry.id === 'palettes' ? 'pastel-rainbow-text' : '',
                                            ]">{{ entry.label }}</span>
                                        </span>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <!-- Action bar toggle button -->
                        <template v-if="actionBar">
                            <div class="dock-separator"></div>
                            <button
                                class="dock-icon-btn"
                                title="Action bar"
                                @click="toggleActionBar"
                            >
                                <Paintbrush class="w-5 h-5" :style="{ color: cssColorOpaque }" />
                            </button>
                        </template>

                        <!-- Mobile pane toggle (only when two panes exist) -->
                        <template v-if="viewManager.currentConfig.value.right !== null">
                            <div class="dock-separator lg:hidden"></div>
                            <div class="lg:hidden flex items-center gap-0.5 rounded-full bg-foreground/5 p-0.5">
                                <button
                                    :class="[
                                        'px-2.5 py-0.5 text-xs fraunces rounded-full transition-all cursor-pointer',
                                        viewManager.mobilePaneIndex.value === 0
                                            ? 'bg-foreground text-background'
                                            : 'text-muted-foreground hover:text-foreground',
                                    ]"
                                    @click="viewManager.mobilePaneIndex.value = 0"
                                >
                                    {{ viewManager.currentConfig.value.leftLabel }}
                                </button>
                                <button
                                    :class="[
                                        'px-2.5 py-0.5 text-xs fraunces rounded-full transition-all cursor-pointer',
                                        viewManager.mobilePaneIndex.value === 1
                                            ? 'bg-foreground text-background'
                                            : 'text-muted-foreground hover:text-foreground',
                                    ]"
                                    @click="viewManager.mobilePaneIndex.value = 1"
                                >
                                    {{ viewManager.currentConfig.value.rightLabel }}
                                </button>
                            </div>
                        </template>

                        <!-- Mobile overflow menu (⋮) -->
                        <div class="dock-separator lg:hidden"></div>
                        <div class="lg:hidden flex items-center">
                        <DockPopover direction="down" :collapse-delay="2400" align="end" click-only>
                            <template #trigger>
                                <MoreVertical class="w-5 h-5" />
                            </template>

                            <div class="flex flex-col gap-0.5 p-1 min-w-[11rem]">
                                <!-- Login / slug section -->
                                <template v-if="pm.userSlug.value">
                                    <div class="flex items-center gap-2 px-2 py-1.5">
                                        <span
                                            class="fira-code text-sm font-bold px-2 py-0.5 rounded-full border whitespace-nowrap"
                                            :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
                                        >
                                            {{ pm.userSlug.value }}
                                        </span>
                                    </div>
                                    <button class="floating-panel-item text-sm fraunces" @click="onCopySlug()">
                                        <Copy class="w-3.5 h-3.5" /> Copy slug
                                    </button>
                                    <button class="floating-panel-item text-sm fraunces" @click="onStartSlugEdit()">
                                        <LogIn class="w-3.5 h-3.5" /> Switch account
                                    </button>
                                    <button class="floating-panel-item text-sm fraunces" @click="pm.userLogout()">
                                        <LogOut class="w-3.5 h-3.5" /> Logout
                                    </button>
                                    <button class="floating-panel-item text-sm fraunces text-muted-foreground" @click="pm.onRegenerateSlug()">
                                        <RefreshCw class="w-3.5 h-3.5" /> Regenerate slug
                                    </button>
                                </template>
                                <template v-else-if="pm.isAdminAuthenticated.value">
                                    <div class="flex items-center gap-2 px-2 py-1.5">
                                        <span class="fira-code text-sm font-bold px-2 py-0.5 rounded-full border cursor-default text-muted-foreground border-muted-foreground whitespace-nowrap">admin</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <button class="floating-panel-item text-sm fraunces" @click="onStartSlugEdit()">
                                        <LogIn class="w-3.5 h-3.5" /> Login
                                    </button>
                                </template>

                                <div class="h-[2px] bg-border/70 my-1"></div>

                                <!-- @mbabb section -->
                                <div class="flex items-center gap-2 px-2 py-1.5">
                                    <Avatar class="w-7 h-7">
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/2848617?v=4" />
                                    </Avatar>
                                    <div>
                                        <a href="https://github.com/mkbabb" target="_blank" rel="noopener noreferrer" class="font-mono text-sm text-foreground hover:underline">@mbabb</a>
                                        <p class="text-[10px] italic text-muted-foreground leading-tight fraunces">Color space picker &amp; converter</p>
                                    </div>
                                </div>
                                <button class="floating-panel-item text-sm fraunces" @click="emit('shareLink')">
                                    <component :is="linkCopied ? Check : Share2" class="w-3.5 h-3.5" />
                                    {{ linkCopied ? 'Copied!' : 'Share color' }}
                                </button>
                                <a href="https://github.com/mkbabb/value.js" target="_blank" rel="noopener noreferrer" class="floating-panel-item text-sm fraunces no-underline text-foreground">
                                    <Github class="w-3.5 h-3.5" /> GitHub
                                </a>
                                <div class="h-px bg-border/50 my-0.5"></div>
                                <div class="floating-panel-item text-sm fraunces">
                                    <DarkModeToggle title="Toggle dark mode" class="aspect-square w-4" />
                                    Dark mode
                                </div>
                            </div>
                        </DockPopover>
                        </div>

                        <!-- Desktop-only: user/login section -->
                        <div class="hidden lg:flex items-center gap-[0.25rem]">
                            <div class="dock-separator"></div>

                            <!-- Logged in: "Account" button with popover -->
                            <template v-if="pm.userSlug.value">
                                <DockPopover direction="down" :collapse-delay="2400" click-only class="profile-popover">
                                    <template #trigger>
                                        <span
                                            class="flex items-center gap-1.5 fira-code text-sm font-bold px-3 py-0.5 rounded-full border whitespace-nowrap transition-colors"
                                            :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
                                        >
                                            <UserCircle class="w-3.5 h-3.5" />
                                            Profile
                                        </span>
                                    </template>

                                    <div class="flex flex-col gap-0.5 p-1 min-w-[10rem]">
                                        <div class="px-2 py-1.5">
                                            <span
                                                class="fira-code text-xs font-bold px-2 py-0.5 rounded-full border whitespace-nowrap"
                                                :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
                                            >{{ pm.userSlug.value }}</span>
                                        </div>
                                        <button
                                            class="floating-panel-item text-sm fraunces"
                                            @click="onCopySlug()"
                                        >
                                            <Copy class="w-3.5 h-3.5" />
                                            Copy slug
                                        </button>
                                        <button
                                            class="floating-panel-item text-sm fraunces"
                                            @click="onStartSlugEdit()"
                                        >
                                            <LogIn class="w-3.5 h-3.5" />
                                            Switch account
                                        </button>
                                        <button
                                            class="floating-panel-item text-sm fraunces"
                                            @click="pm.userLogout()"
                                        >
                                            <LogOut class="w-3.5 h-3.5" />
                                            Logout
                                        </button>
                                        <div class="h-px bg-border/50 my-0.5"></div>
                                        <button
                                            class="floating-panel-item text-sm fraunces text-muted-foreground"
                                            @click="pm.onRegenerateSlug()"
                                        >
                                            <RefreshCw class="w-3.5 h-3.5" />
                                            Regenerate slug
                                        </button>
                                    </div>
                                </DockPopover>
                            </template>

                            <!-- Admin (no slug) -->
                            <template v-else-if="pm.isAdminAuthenticated.value">
                                <span class="fira-code text-sm font-bold px-2 py-0.5 rounded-full border cursor-default text-muted-foreground border-muted-foreground whitespace-nowrap">
                                    admin
                                </span>
                            </template>

                            <!-- Not logged in -->
                            <template v-else>
                                <button
                                    class="flex items-center gap-1.5 fira-code text-sm font-bold px-3 py-0.5 rounded-full border border-primary/30 hover:bg-accent/50 transition-colors cursor-pointer whitespace-nowrap"
                                    @click="onStartSlugEdit()"
                                >
                                    <LogIn class="w-3.5 h-3.5" />
                                    Login
                                </button>
                            </template>

                            <div class="dock-separator"></div>
                        </div>

                        <!-- @mbabb menu -->
                        <div class="hidden lg:flex items-center">
                        <DockPopover direction="down" :collapse-delay="2400" click-only>
                            <template #trigger>
                                <span class="text-xs font-mono">@mbabb</span>
                            </template>

                            <div class="flex flex-col gap-0.5 p-1 min-w-[11rem]">
                                <div class="flex items-center gap-2 px-2 py-1.5">
                                    <Avatar class="w-7 h-7">
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/2848617?v=4" />
                                    </Avatar>
                                    <div>
                                        <a href="https://github.com/mkbabb" target="_blank" rel="noopener noreferrer" class="font-mono text-sm text-foreground hover:underline">@mbabb</a>
                                        <p class="text-[10px] italic text-muted-foreground leading-tight fraunces">Color space picker &amp; converter</p>
                                    </div>
                                </div>
                                <div class="h-px bg-border/50 my-1"></div>
                                <button
                                    class="floating-panel-item text-sm fraunces"
                                    @click="emit('shareLink')"
                                >
                                    <component :is="linkCopied ? Check : Share2" class="w-3.5 h-3.5" />
                                    {{ linkCopied ? 'Copied!' : 'Share color' }}
                                </button>
                                <a
                                    href="https://github.com/mkbabb/value.js"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="floating-panel-item text-sm fraunces no-underline text-foreground"
                                >
                                    <Github class="w-3.5 h-3.5" />
                                    GitHub
                                </a>
                                <div class="h-px bg-border/50 my-1"></div>
                                <div class="floating-panel-item text-sm fraunces">
                                    <DarkModeToggle
                                        title="Toggle dark mode"
                                        class="aspect-square w-4"
                                    />
                                    Dark mode
                                </div>
                            </div>
                        </DockPopover>
                        </div>
                    </div>
                </div>

                <!-- Collapsed state -->
                <template #collapsed>
                    <WatercolorDot
                        :color="cssColorOpaque"
                        tag="div"
                        class="w-6 h-6 shrink-0"
                        seed="top-dock"
                    />
                    <component
                        :is="viewManager.currentConfig.value.icon"
                        class="w-5 h-5 shrink-0 sm:hidden"
                        :style="{ color: cssColorOpaque }"
                    />
                    <span class="text-base fraunces text-foreground whitespace-nowrap hidden sm:inline">
                        {{ viewManager.currentConfig.value.label }}
                    </span>
                    <ChevronDown class="w-3 h-3 text-muted-foreground shrink-0" />
                </template>
            </GlassDock>
        </div>
    </div>
</template>

<style scoped>
@reference "../../../styles/style.css";

.dock-content-layers {
    display: grid;
    position: relative;
}
.dock-content-layer {
    grid-area: 1 / 1;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: opacity 0.25s var(--ease-standard),
                transform 0.25s var(--ease-standard);
    transform-origin: center;
}
.dock-content-layer:not(.layer-active) {
    opacity: 0;
    pointer-events: none;
    transform: scale(0.96);
}

.profile-popover :deep(.popover-trigger) {
    width: auto;
    height: auto;
    padding: 0;
    border-radius: 9999px;
}
</style>
