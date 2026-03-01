<template>
    <div
        class="group rounded-lg border border-border bg-card overflow-hidden transition-all hover:shadow-md cursor-pointer"
        @click="$emit('click')"
    >
        <!-- Color strip — clamp each swatch to min 4px so large palettes don't collapse -->
        <div class="h-10 flex w-full overflow-hidden">
            <div
                v-for="(color, i) in palette.colors"
                :key="i"
                class="h-full shrink-0"
                :style="{
                    backgroundColor: color.css,
                    width: `${Math.max(100 / palette.colors.length, 0.5)}%`,
                }"
            ></div>
        </div>

        <!-- Metadata row -->
        <div class="px-3 py-2.5 flex items-center justify-between gap-2 min-w-0">
            <div class="flex items-center gap-2 min-w-0">
                <span
                    class="fraunces text-lg font-bold line-clamp-2 sm:line-clamp-1"
                    :title="palette.name"
                    @click.stop="toggleMenu"
                >{{ palette.name }}</span>
                <Badge v-if="palette.status === 'featured'" variant="default" class="fira-code text-xs shrink-0 gap-1">
                    <Award class="w-3 h-3" />
                    Featured
                </Badge>
                <Badge variant="secondary" class="fira-code text-sm shrink-0">
                    {{ palette.colors.length }}
                </Badge>

                <!-- Vote count (always visible for remote palettes) -->
                <button
                    v-if="!palette.isLocal"
                    class="flex items-center gap-1 px-1.5 py-0.5 rounded-sm hover:bg-accent transition-colors cursor-pointer shrink-0"
                    @click.stop="emit('vote', palette)"
                >
                    <Heart
                        class="w-3.5 h-3.5 transition-colors"
                        :class="palette.voted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'"
                    />
                    <span class="fira-code text-xs text-muted-foreground">{{ palette.voteCount ?? 0 }}</span>
                </button>
            </div>

            <!-- Hamburger menu trigger -->
            <div
                class="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                @click.stop
            >
                <button
                    ref="menuTriggerRef"
                    class="p-1 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                    @click="toggleMenu"
                    @pointerenter="onMenuTriggerEnter"
                    @pointerleave="onMenuTriggerLeave"
                >
                    <MoreHorizontal class="w-4 h-4" />
                </button>

                <!-- Floating menu panel -->
                <Teleport to="body">
                    <div
                        v-if="menuOpen"
                        class="card-menu-panel"
                        :style="menuStyle"
                        @pointerenter="onMenuPanelEnter"
                        @pointerleave="onMenuPanelLeave"
                        @click.stop
                    >
                        <!-- Full palette name as header -->
                        <div class="px-3 py-1.5 fraunces text-sm font-bold text-foreground border-b border-border truncate max-w-[200px]">
                            {{ palette.name }}
                        </div>

                        <button class="card-menu-item" @click="onMenuAction(() => emit('apply', palette))">
                            <Pipette class="w-4 h-4" />
                            <span>Apply palette</span>
                        </button>
                        <button class="card-menu-item" @click="onMenuAction(() => copyAllColors())">
                            <ClipboardCopy class="w-4 h-4" />
                            <span>Copy all colors</span>
                        </button>

                        <template v-if="palette.isLocal">
                            <button class="card-menu-item" @click="onMenuAction(() => emit('publish', palette))">
                                <Globe class="w-4 h-4" />
                                <span>Publish</span>
                            </button>
                            <button class="card-menu-item text-destructive" @click="onMenuAction(() => emit('delete', palette))">
                                <Trash2 class="w-4 h-4" />
                                <span>Delete</span>
                            </button>
                        </template>

                        <template v-if="!palette.isLocal">
                            <button class="card-menu-item" @click="onMenuAction(() => emit('save', palette))">
                                <Bookmark class="w-4 h-4" />
                                <span>Save locally</span>
                            </button>
                        </template>

                        <template v-if="!palette.isLocal && isOwned">
                            <button class="card-menu-item" @click="startRenaming">
                                <Pencil class="w-4 h-4" />
                                <span>Rename</span>
                            </button>
                        </template>
                    </div>
                </Teleport>
            </div>
        </div>

        <!-- Inline rename input -->
        <div v-if="renaming" class="px-3 pb-2" @click.stop>
            <form class="flex gap-2" @submit.prevent="submitRename">
                <Input
                    v-model="renameValue"
                    placeholder="New name..."
                    class="fira-code text-sm h-8"
                    autofocus
                />
                <Button type="submit" size="sm" variant="default" class="shrink-0 h-8">
                    <Check class="w-4 h-4" />
                </Button>
                <Button type="button" size="sm" variant="ghost" class="shrink-0 h-8" @click="renaming = false">
                    Cancel
                </Button>
            </form>
        </div>

        <!-- Expandable detail: color swatches -->
        <Transition
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @leave="onLeave"
            @after-leave="onAfterLeave"
        >
            <div v-if="expanded" @click.stop class="overflow-hidden">
                <div
                    class="px-3 pb-3 flex flex-wrap gap-2 items-start border-t border-gray-700/15 pt-3 min-w-0"
                >
                    <div
                        v-for="(color, i) in palette.colors"
                        :key="i"
                        class="relative"
                        @pointerenter="onSwatchHover(i, $event)"
                        @pointerleave="onSwatchLeave()"
                    >
                        <!-- Touch: native Popover click toggle. Hover: manually controlled. -->
                        <Popover v-if="!canHover" :open="openPopoverIndex === i" @update:open="(v: boolean) => onPopoverUpdateTouch(v, i)">
                            <PopoverTrigger as-child>
                                <WatercolorDot
                                    :color="color.css"
                                    tag="button"
                                    class="w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer"
                                />
                            </PopoverTrigger>
                            <PopoverContent
                                class="w-auto p-1.5 flex items-center gap-1"
                                :side-offset="8"
                            >
                                <button v-if="!palette.isLocal" @click="onPopoverAdd(color.css)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                    <Plus class="w-4 h-4" />
                                </button>
                                <button @click="onPopoverEdit(color, i)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                    <Pencil class="w-4 h-4" />
                                </button>
                                <button @click="onPopoverCopy(color.css)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                    <ClipboardCopy class="w-4 h-4" />
                                </button>
                            </PopoverContent>
                        </Popover>

                        <!-- Hover: no Popover wrapper — just the dot + a floating panel -->
                        <template v-else>
                            <WatercolorDot
                                :color="color.css"
                                tag="button"
                                class="w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer"
                                @click.stop="onSwatchClick(i)"
                            />
                            <Teleport to="body">
                                <div
                                    v-if="openPopoverIndex === i"
                                    ref="floatingPanelRefs"
                                    class="swatch-floating-panel"
                                    :style="floatingStyle"
                                    @pointerenter="cancelSwatchLeave()"
                                    @pointerleave="onSwatchLeave()"
                                >
                                    <button v-if="!palette.isLocal" @click="onPopoverAdd(color.css)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                        <Plus class="w-4 h-4" />
                                    </button>
                                    <button @click="onPopoverEdit(color, i)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                        <Pencil class="w-4 h-4" />
                                    </button>
                                    <button @click="onPopoverCopy(color.css)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                        <ClipboardCopy class="w-4 h-4" />
                                    </button>
                                </div>
                            </Teleport>
                        </template>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onUnmounted } from "vue";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import {
    Pipette,
    ClipboardCopy,
    Trash2,
    Globe,
    Bookmark,
    Heart,
    Award,
    Pencil,
    Check,
    Plus,
    MoreHorizontal,
} from "lucide-vue-next";
import type { PaletteColor } from "@lib/palette/types";
import type { Palette } from "@lib/palette/types";
import { copyToClipboard } from "@composables/useClipboard";
import { WatercolorDot } from "@components/custom/watercolor-dot";

const props = defineProps<{
    palette: Palette;
    expanded?: boolean;
    cssColor?: string;
    isOwned?: boolean;
}>();

const emit = defineEmits<{
    click: [];
    apply: [palette: Palette];
    delete: [palette: Palette];
    publish: [palette: Palette];
    save: [palette: Palette];
    vote: [palette: Palette];
    rename: [palette: Palette, newName: string];
    editColor: [palette: Palette, colorIndex: number, css: string];
    addColor: [css: string];
}>();

// --- Hamburger menu ---
const menuOpen = ref(false);
const menuTriggerRef = ref<HTMLElement | null>(null);
const menuStyle = reactive({ top: "0px", left: "0px" });
let menuLeaveTimer: ReturnType<typeof setTimeout> | null = null;
const renaming = ref(false);

function positionMenu() {
    if (!menuTriggerRef.value) return;
    const rect = menuTriggerRef.value.getBoundingClientRect();
    menuStyle.top = `${rect.bottom + 4}px`;
    menuStyle.left = `${rect.right}px`;
}

function toggleMenu() {
    cancelMenuLeave();
    if (menuOpen.value) {
        menuOpen.value = false;
    } else {
        menuOpen.value = true;
        nextTick(positionMenu);
    }
}

function onMenuTriggerEnter(e: PointerEvent) {
    if (!canHover || e.pointerType === "touch") return;
    cancelMenuLeave();
    menuOpen.value = true;
    nextTick(positionMenu);
}

function onMenuTriggerLeave(e: PointerEvent) {
    if (!canHover || e.pointerType === "touch") return;
    scheduleMenuLeave();
}

function onMenuPanelEnter() {
    cancelMenuLeave();
}

function onMenuPanelLeave() {
    if (!canHover) return;
    scheduleMenuLeave();
}

function scheduleMenuLeave() {
    cancelMenuLeave();
    menuLeaveTimer = setTimeout(() => {
        menuOpen.value = false;
    }, 250);
}

function cancelMenuLeave() {
    if (menuLeaveTimer) {
        clearTimeout(menuLeaveTimer);
        menuLeaveTimer = null;
    }
}

function onMenuAction(action: () => void) {
    menuOpen.value = false;
    action();
}

function startRenaming() {
    menuOpen.value = false;
    renaming.value = true;
    renameValue.value = props.palette.name;
}

// Close menu on outside click
function onDocClick() {
    if (menuOpen.value) menuOpen.value = false;
}
if (typeof document !== "undefined") {
    document.addEventListener("click", onDocClick, { passive: true });
}
onUnmounted(() => {
    if (typeof document !== "undefined") {
        document.removeEventListener("click", onDocClick);
    }
    cancelMenuLeave();
});

const openPopoverIndex = ref<number | null>(null);
let hoverCloseTimer: ReturnType<typeof setTimeout> | null = null;
const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

// Floating panel positioning (hover devices only)
const floatingStyle = reactive({ top: "0px", left: "0px" });
const floatingPanelRefs = ref<HTMLElement[]>([]);

function positionFloatingPanel(swatchEl: Element) {
    const rect = swatchEl.getBoundingClientRect();
    floatingStyle.top = `${rect.top - 42}px`;
    floatingStyle.left = `${rect.left + rect.width / 2}px`;
}

// Touch: let Popover handle open/close natively
function onPopoverUpdateTouch(open: boolean, index: number) {
    openPopoverIndex.value = open ? index : null;
}

// Hover: pointer events drive everything, no Popover involved
function onSwatchHover(index: number, e: PointerEvent) {
    if (!canHover || e.pointerType === "touch") return;
    cancelSwatchLeave();
    openPopoverIndex.value = index;
    nextTick(() => positionFloatingPanel(e.currentTarget as Element));
}

function onSwatchClick(index: number) {
    cancelSwatchLeave();
    // Toggle on click for hover devices as a fallback
    if (openPopoverIndex.value === index) {
        openPopoverIndex.value = null;
    } else {
        openPopoverIndex.value = index;
    }
}

function onSwatchLeave() {
    if (!canHover) return;
    hoverCloseTimer = setTimeout(() => {
        openPopoverIndex.value = null;
    }, 250);
}

function cancelSwatchLeave() {
    if (hoverCloseTimer) {
        clearTimeout(hoverCloseTimer);
        hoverCloseTimer = null;
    }
}

function onPopoverAdd(css: string) {
    openPopoverIndex.value = null;
    emit("addColor", css);
}

function onPopoverEdit(color: PaletteColor, index: number) {
    openPopoverIndex.value = null;
    emit("editColor", props.palette, index, color.css);
}

function onPopoverCopy(css: string) {
    openPopoverIndex.value = null;
    copyColor(css);
}

const renameValue = ref(props.palette.name);

// JS-driven height transition for smooth expand/collapse
const EXPAND_DURATION = 300;
const COLLAPSE_DURATION = 200;
const EXPAND_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const COLLAPSE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

function onBeforeEnter(el: Element) {
    const htmlEl = el as HTMLElement;
    htmlEl.style.height = "0";
    htmlEl.style.opacity = "0";
}

function onEnter(el: Element, done: () => void) {
    const htmlEl = el as HTMLElement;
    const targetHeight = htmlEl.scrollHeight;
    htmlEl.style.transition = `height ${EXPAND_DURATION}ms ${EXPAND_EASING}, opacity ${EXPAND_DURATION}ms ease`;
    // Force reflow
    void htmlEl.offsetHeight;
    htmlEl.style.height = `${targetHeight}px`;
    htmlEl.style.opacity = "1";
    htmlEl.addEventListener("transitionend", function handler(e) {
        if (e.propertyName !== "height") return;
        htmlEl.removeEventListener("transitionend", handler);
        done();
    });
}

function onAfterEnter(el: Element) {
    const htmlEl = el as HTMLElement;
    htmlEl.style.height = "";
    htmlEl.style.transition = "";
    htmlEl.style.opacity = "";
    htmlEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function onBeforeLeave(el: Element) {
    const htmlEl = el as HTMLElement;
    openPopoverIndex.value = null;
    htmlEl.style.height = `${htmlEl.scrollHeight}px`;
    // Force reflow
    void htmlEl.offsetHeight;
}

function onLeave(el: Element, done: () => void) {
    const htmlEl = el as HTMLElement;
    htmlEl.style.transition = `height ${COLLAPSE_DURATION}ms ${COLLAPSE_EASING}, opacity ${COLLAPSE_DURATION}ms ease`;
    // Force reflow
    void htmlEl.offsetHeight;
    htmlEl.style.height = "0";
    htmlEl.style.opacity = "0";
    htmlEl.addEventListener("transitionend", function handler(e) {
        if (e.propertyName !== "height") return;
        htmlEl.removeEventListener("transitionend", handler);
        done();
    });
}

function onAfterLeave(el: Element) {
    const htmlEl = el as HTMLElement;
    htmlEl.style.height = "";
    htmlEl.style.transition = "";
    htmlEl.style.opacity = "";
}

function submitRename() {
    const name = renameValue.value.trim();
    if (name && name !== props.palette.name) {
        emit("rename", props.palette, name);
    }
    renaming.value = false;
}

function copyColor(css: string) {
    copyToClipboard(css);
}

function copyAllColors() {
    const text = props.palette.colors.map((c) => c.css).join(", ");
    copyToClipboard(text, "Copied all colors");
}
</script>

<style scoped>
.card-menu-panel {
    position: fixed;
    z-index: 50;
    display: flex;
    flex-direction: column;
    min-width: 160px;
    border-radius: var(--radius-md);
    border: 1px solid hsl(var(--border));
    background: hsl(var(--popover));
    color: hsl(var(--popover-foreground));
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    pointer-events: auto;
    animation: card-menu-in 0.15s ease-out;
    overflow: hidden;
}
.card-menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.15s ease;
    width: 100%;
    text-align: left;
}
.card-menu-item:hover {
    background-color: hsl(var(--accent));
}
@keyframes card-menu-in {
    from {
        opacity: 0;
        transform: translateX(-100%) translateY(-4px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateX(-100%) translateY(0) scale(1);
    }
}

.swatch-floating-panel {
    position: fixed;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem;
    border-radius: var(--radius-md);
    border: 1px solid hsl(var(--border));
    background: hsl(var(--popover));
    color: hsl(var(--popover-foreground));
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    transform: translateX(-50%);
    pointer-events: auto;
    animation: swatch-panel-in 0.15s ease-out;
}

@keyframes swatch-panel-in {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(4px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
    }
}
</style>
