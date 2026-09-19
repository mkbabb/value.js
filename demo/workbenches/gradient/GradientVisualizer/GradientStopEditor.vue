<script setup lang="ts">
import { ref, computed, useTemplateRef } from "vue";
import { X } from "@lucide/vue";
import type { GradientStop } from "../composables/useGradientModel";

const {
    stops,
    railRamp,
    colorAt = undefined,
} = defineProps<{
    stops: GradientStop[];
    /**
     * The rail-normalized 90° projection (`serializeRailRamp`, T.W6-2): the
     * rail ALWAYS paints this — at every type/direction — so handles,
     * add-ghost and ramp share one axis by construction. The true render
     * string (type + direction applied) is the render tile's job.
     */
    railRamp: string;
    /** Ramp color at a position (0–100) — previews the ghost + seeds adds. */
    colorAt?: (position: number) => string;
}>();

const emit = defineEmits<{
    "update:position": [id: string, position: number];
    add: [position: number];
    remove: [id: string];
    select: [id: string];
}>();

const selectedId = defineModel<string | null>("selectedId", { default: null });

const barRef = useTemplateRef<HTMLDivElement>("barRef");
const draggingId = ref<string | null>(null);
// S.W4 / W4-3: hover state for the handle scale — the inline `transform`
// shadows any `hover:` class utility, so hover must be modeled here and
// folded into the same inline expression.
const hoveredId = ref<string | null>(null);

// ── The add affordance (W5-11 / P1-3: the dblclick/warp truce) ──
// The old bar-pointerdown WARPED the nearest stop to the click point and
// started a drag — dblclick-to-add fired that twice first, corrupting a stop
// before adding one. The truce: the bar NEVER moves an existing stop. A bar
// click ADDS a stop at that position (a hover ghost previews exactly what
// will land — the gesture is self-evident, no instruction line needed);
// drags start ONLY on a handle.
const hoverPos = ref<number | null>(null);
let pendingAdd: { x: number; y: number } | null = null;

// ── The keyboard caret (X-W4 · CC-042 / D-7 · r3 row 7) ──
// The add gesture was POINTER-ONLY — "NO keyboard path to CREATE a stop exists
// at all". The caret is the keyboard twin of the hover ghost: a real, named
// `<button>` seat parked on the rail, moved by the arrows / Home / End /
// PageUp / PageDown and minting at its own position on Enter or Space. It takes
// NOTHING from the pointer gesture: it carries no `data-stop-id`, so a press
// that lands on it still travels the bar's own add path (`onBarPointerDown` /
// `onBarPointerUp`) and mints at the pointer, and it mints only from the
// keyboard, so no gesture is ever doubled.
const caretPos = ref(50);
const caretColor = computed(() => colorAt?.(caretPos.value) ?? null);

// ── The keyboard grab (VISUAL-CONSTITUTION §5.2, the stop row) ──
// "after Space grabs … Space drops, Escape cancels". It is the keyboard twin of
// a pointer drag: Escape returns the stop to where the grab began. It is a
// POSITION gesture and never an ordinal reorder — GRADSTOP-A §14 bans a reorder
// cure until the model's normalise-on-write lands (X-W6 / CC-058), and §15 bans
// any minimum-separation law outright.
const grabbed = ref<{ id: string; origin: number } | null>(null);

function isGrabbed(id: string): boolean {
    return grabbed.value?.id === id;
}

/** The keyboard steps: one percent, ten under Shift / Page (§5.2). */
const STEP = 1;
const PAGE_STEP = 10;

// A re-tap on the selected handle — when the press does not become a drag —
// clears selection. This is Escape's pointer twin for touch users.
let handleGesture: {
    wasSelected: boolean;
    x: number;
    y: number;
    moved: boolean;
} | null = null;

// ── Geometry (W5-11: end-handle truce) ──
// Handle CENTERS ride an inset track [HANDLE_HALF, width - HANDLE_HALF], so
// the 0%/100% handles sit fully INSIDE the bar instead of hanging half off
// its rounded corners.
const HANDLE_HALF = 10; // w-5 handle → 20px, half = 10

function handleLeft(position: number): string {
    return `calc(${HANDLE_HALF}px + (100% - ${HANDLE_HALF * 2}px) * ${position / 100})`;
}

// Handle scale ladder: selected/dragging/grabbed (1.25) > hover (1.1) > rest (1).
function handleScale(id: string): number {
    if (selectedId.value === id || draggingId.value === id || isGrabbed(id))
        return 1.25;
    return hoveredId.value === id ? 1.1 : 1;
}

/** 0–100, at the model's own tenth-of-a-percent resolution. */
function clampPos(position: number): number {
    return Math.round(Math.max(0, Math.min(100, position)) * 10) / 10;
}

function formatPercent(position: number): string {
    return String(Math.round(position * 10) / 10);
}

/**
 * The stop's accessible NAME carries its identity and ORDINAL (§5.2: "announce
 * stop identity, percentage, ordinal"); its VALUE carries the percentage, so a
 * drag re-announces the value rather than renaming the control on every frame.
 */
function stopName(index: number): string {
    return `Gradient stop ${index + 1} of ${stops.length}`;
}

/** Human-readable and unit-aware — never the raw float `aria-valuenow` carries. */
function stopValueText(stop: GradientStop): string {
    const position = `Position ${formatPercent(stop.position)}%`;
    return isGrabbed(stop.id) ? `${position}, grabbed` : position;
}

// A stop is removable only when more than 2 stops exist.
const removable = computed(() => stops.length > 2);
const selectedStop = computed(
    () => stops.find((s) => s.id === selectedId.value) ?? null,
);

const ghostColor = computed(() =>
    hoverPos.value !== null ? (colorAt?.(hoverPos.value) ?? null) : null,
);

function getPosition(e: { clientX: number }): number {
    if (!barRef.value) return 0;
    const rect = barRef.value.getBoundingClientRect();
    const x = e.clientX - rect.left - HANDLE_HALF;
    const span = Math.max(1, rect.width - HANDLE_HALF * 2);
    return Math.round(Math.max(0, Math.min(100, (x / span) * 100)) * 10) / 10;
}

// ── Bar gestures: hover ghost + click-to-add (never warp, never drag) ──

function onBarPointerDown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    if (target.closest("[data-stop-id]")) return; // handles own their gestures
    pendingAdd = { x: e.clientX, y: e.clientY };
}

function onBarPointerMove(e: PointerEvent) {
    if (draggingId.value) {
        // Fallback path while a handle drag is live (capture sits on the handle).
        emit("update:position", draggingId.value, getPosition(e));
        return;
    }
    const target = e.target as HTMLElement;
    hoverPos.value = target.closest("[data-stop-id]") ? null : getPosition(e);
}

function onBarPointerUp(e: PointerEvent) {
    if (pendingAdd) {
        const moved =
            Math.abs(e.clientX - pendingAdd.x) > 4 ||
            Math.abs(e.clientY - pendingAdd.y) > 4;
        if (!moved) emit("add", getPosition(e));
        pendingAdd = null;
    }
    draggingId.value = null;
}

function onBarPointerLeave() {
    hoverPos.value = null;
    pendingAdd = null;
}

// ── Handle gestures: drag / select / remove ──

function onHandlePointerDown(e: PointerEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    // A pointer drag ends any keyboard grab — one gesture owns the stop at a
    // time, and a grab left armed behind a drag would make Escape teleport.
    grabbed.value = null;
    handleGesture = {
        wasSelected: selectedId.value === id,
        x: e.clientX,
        y: e.clientY,
        moved: false,
    };
    draggingId.value = id;
    selectedId.value = id;
    emit("select", id);

    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
}

function onHandlePointerMove(e: PointerEvent) {
    if (!draggingId.value) return;
    if (
        handleGesture &&
        (Math.abs(e.clientX - handleGesture.x) > 4 ||
            Math.abs(e.clientY - handleGesture.y) > 4)
    ) {
        handleGesture.moved = true;
    }
    emit("update:position", draggingId.value, getPosition(e));
}

function onHandlePointerUp() {
    // A press that never became a drag ON the already-selected handle is a
    // Re-tap the selected handle to deselect without moving it.
    if (handleGesture && handleGesture.wasSelected && !handleGesture.moved) {
        selectedId.value = null;
    }
    handleGesture = null;
    draggingId.value = null;
}

function removeStop(id: string) {
    if (!removable.value) return;
    if (selectedId.value === id) selectedId.value = null;
    if (isGrabbed(id)) grabbed.value = null;
    emit("remove", id);
}

function onHandleContextMenu(e: MouseEvent, id: string) {
    e.preventDefault();
    removeStop(id);
}

function moveStop(stop: GradientStop, position: number) {
    selectedId.value = stop.id;
    emit("update:position", stop.id, clampPos(position));
}

/**
 * The stop's keyboard grammar, in the VISUAL-CONSTITUTION §5.2 rows it answers:
 *
 * - Right/Up increase the serialized percentage, Left/Down decrease, by one
 *   percent (ten under Shift); Page Up/Down take the ten-percent step.
 * - **Home = 0%, End = 100%, unconditionally** — they are the axis's ends, not
 *   an ordinal's, so they read the same whichever direction the gradient runs.
 * - Space grabs, Space drops, Escape cancels back to the grab's origin; an
 *   ungrabbed Escape clears the selection while the handle keeps focus.
 * - Delete/Backspace removes (when removal is legal).
 *
 * Every arm emits a POSITION; none reorders. `aria-valuetext` is what announces
 * the move, so nothing here depends on the whole-percent accessible name
 * (GRADSTOP-A §6).
 */
function onHandleKeydown(e: KeyboardEvent, stop: GradientStop) {
    const step = e.shiftKey ? PAGE_STEP : STEP;
    switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
            moveStop(stop, stop.position - step);
            break;
        case "ArrowRight":
        case "ArrowUp":
            moveStop(stop, stop.position + step);
            break;
        case "PageDown":
            moveStop(stop, stop.position - PAGE_STEP);
            break;
        case "PageUp":
            moveStop(stop, stop.position + PAGE_STEP);
            break;
        case "Home":
            moveStop(stop, 0);
            break;
        case "End":
            moveStop(stop, 100);
            break;
        case " ":
            if (isGrabbed(stop.id)) {
                grabbed.value = null; // drop: the move stands where it is
            } else {
                grabbed.value = { id: stop.id, origin: stop.position };
                selectedId.value = stop.id;
            }
            break;
        case "Delete":
        case "Backspace":
            removeStop(stop.id);
            break;
        case "Escape": {
            const grab = grabbed.value;
            if (grab && grab.id === stop.id) {
                grabbed.value = null;
                moveStop(stop, grab.origin); // cancel: back where the grab began
            } else {
                selectedId.value = null;
            }
            break;
        }
        default:
            return; // never swallow a key this grammar does not own
    }
    e.preventDefault();
}

/**
 * The caret's own grammar — the same axis keys, with Enter/Space minting a stop
 * at the caret instead of moving one. Activation is handled HERE (and the event
 * defaulted) so the platform's own click never fires: the bar's pointer-add path
 * stays the single owner of a pointer press, wherever it lands.
 */
function onCaretKeydown(e: KeyboardEvent) {
    const step = e.shiftKey ? PAGE_STEP : STEP;
    switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
            caretPos.value = clampPos(caretPos.value - step);
            break;
        case "ArrowRight":
        case "ArrowUp":
            caretPos.value = clampPos(caretPos.value + step);
            break;
        case "PageDown":
            caretPos.value = clampPos(caretPos.value - PAGE_STEP);
            break;
        case "PageUp":
            caretPos.value = clampPos(caretPos.value + PAGE_STEP);
            break;
        case "Home":
            caretPos.value = 0;
            break;
        case "End":
            caretPos.value = 100;
            break;
        case "Enter":
        case " ":
            emit("add", caretPos.value);
            break;
        default:
            return;
    }
    e.preventDefault();
}
</script>

<template>
    <!-- `relative`: the remove chip anchors to the RAIL root (the bar's
         contain:paint would clip a child chip — see below). -->
    <div class="relative flex flex-col gap-1">
        <!-- The editing rail (T.W6-2 re-author): a pill-silhouette instrument
             (T-46 — the glass-ui slider-track rounding register) painting the
             NORMALIZED ramp projection. Its paint stack is an owned material
             contract (`.gradient-rail`, scoped below), never a per-callsite
             `background` shorthand. Hover ghost previews the add; handles
             drag; the selected handle carries a touch-true remove chip. -->
        <div
            ref="barRef"
            data-testid="gradient-stop-bar"
            role="group"
            aria-label="Gradient stop rail"
            :class="[
                'gradient-rail relative h-10 select-none touch-none',
                draggingId ? 'cursor-grabbing' : 'cursor-copy',
            ]"
            :style="{ '--rail-ramp': railRamp }"
            @pointerdown="onBarPointerDown"
            @pointermove="onBarPointerMove"
            @pointerup="onBarPointerUp"
            @pointercancel="onBarPointerUp"
            @pointerleave="onBarPointerLeave"
        >
            <!-- The add ghost: a dashed twin of the handle species, filled
                 with the exact ramp color a click would mint (W5-11 — the
                 affordance replaces the instruction line). -->
            <div
                v-if="hoverPos !== null && !draggingId"
                class="absolute top-1/2 w-5 h-5 rounded-full border-2 border-dashed border-white/70 opacity-80 pointer-events-none z-0"
                :style="{
                    left: handleLeft(hoverPos),
                    background: ghostColor
                        ? `linear-gradient(${ghostColor}, ${ghostColor}), var(--alpha-checker)`
                        : 'var(--alpha-checker)',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 'var(--shadow-sm)',
                }"
                aria-hidden="true"
            />

            <!-- The keyboard caret seat (X-W4 · C1): the rail's add gesture,
                 operable without a pointer. It shows itself only when it takes
                 keyboard focus — the pointer user already has the hover ghost
                 above — and it carries no `data-stop-id`, so a pointer press
                 landing on it is still the BAR's add, at the pointer. -->
            <button
                type="button"
                data-testid="gradient-stop-caret"
                class="rail-caret absolute top-1/2 rounded-full border-2 border-dashed border-white/70 z-0"
                :aria-label="`Add gradient stop at ${formatPercent(caretPos)}%`"
                :style="{
                    left: handleLeft(caretPos),
                    background: caretColor
                        ? `linear-gradient(${caretColor}, ${caretColor}), var(--alpha-checker)`
                        : 'var(--alpha-checker)',
                    transform: 'translate(-50%, -50%)',
                }"
                @keydown="onCaretKeydown"
            />

            <!-- Stop handles. The BUTTON is the ≥24×24 target and the seat that
                 owns role / value / name / focus (X-W4 · C2/C4); the FACE inside
                 it is the 20px painted silhouette, held byte-for-byte at its
                 pre-cure size (W4.md §5: "its 20×20 visual silhouette may stay —
                 the target is what must grow"). -->
            <button
                v-for="(stop, index) in stops"
                :key="stop.id"
                :data-stop-id="stop.id"
                :data-grabbed="isGrabbed(stop.id) ? '' : undefined"
                type="button"
                role="slider"
                aria-orientation="horizontal"
                :aria-valuemin="0"
                :aria-valuemax="100"
                :aria-valuenow="stop.position"
                :aria-valuetext="stopValueText(stop)"
                :aria-label="stopName(index)"
                class="rail-handle absolute top-1/2 rounded-full cursor-grab active:cursor-grabbing"
                :class="[selectedId === stop.id ? 'z-10' : 'z-0']"
                :style="{
                    left: handleLeft(stop.position),
                    /* S.W4 / W4-3: the hover scale rides the INLINE transform —
                       the `hover:scale-110` utility was DEAD, shadowed by this
                       inline `transform` (inline style always outranks the
                       class). Selected/dragging/grabbed (1.25) outranks hover
                       (1.1). T.W5 R9 (ridden here per the cross-wave clause):
                       the handle's scale settle is SPATIAL — `--spring-snappy` @
                       its own clock, never the squeezed generic 0.3s. */
                    transform: `translate(-50%, -50%) scale(${handleScale(stop.id)})`,
                    transition:
                        'box-shadow var(--duration-fast) var(--ease-standard), transform var(--spring-snappy-duration) var(--spring-snappy)',
                }"
                @pointerdown="(e) => onHandlePointerDown(e, stop.id)"
                @pointermove="onHandlePointerMove"
                @pointerup="onHandlePointerUp"
                @pointercancel="onHandlePointerUp"
                @pointerenter="hoveredId = stop.id"
                @pointerleave="hoveredId = null"
                @contextmenu="(e) => onHandleContextMenu(e, stop.id)"
                @keydown="(e) => onHandleKeydown(e, stop)"
            >
                <span
                    class="rail-handle-face absolute top-1/2 left-1/2 w-5 h-5 rounded-full border-2"
                    :class="selectedId === stop.id ? 'border-white' : 'border-white/80'"
                    aria-hidden="true"
                    :style="{
                        /* S owner-ruling 2026-07-05: the stop well paints its
                           color as a layer OVER the `--alpha-checker` ground
                           (background-color would sit UNDER background-image, so
                           the color rides a const-color gradient layer). The
                           per-stop COLOR is the only thing still inline here —
                           it is per-stop DATA; the material lift and the focus
                           ring are stylesheet contracts (U-F25, below). */
                        background: `linear-gradient(${stop.cssColor}, ${stop.cssColor}), var(--alpha-checker)`,
                    }"
                />
            </button>
        </div>

        <!-- The remove chip (W5-11 / P1-3: remove was right-click-ONLY —
             undiscoverable, impossible on touch). Floats BELOW the selected
             handle whenever removal is legal. A SIBLING of the rail, never a
             child: it lives OUTSIDE the rail's box, so it must not grow the
             rail's hit-area or ride inside its paint contract. (The former
             glass-wash `contain: paint` clip — the R8-17 class — died with
             the owned paint stack; the sibling seat stays on its own merit.) -->
        <button
            v-if="selectedStop && removable"
            type="button"
            aria-label="Remove selected stop"
            class="rail-remove-chip absolute w-6 h-6 top-11 rounded-full border border-card-edge bg-well text-muted-foreground flex items-center justify-center z-20 cursor-pointer hover:text-destructive hover:border-destructive/60"
            :style="{
                left: handleLeft(selectedStop.position),
                transform: 'translate(-50%, 0)',
                /* U.W-A11Y / U-F25: `--shadow-sm` + the focus ring hoisted to the
                   scoped `.rail-remove-chip` cascade (below), same class-of-fix
                   as the handle — the inline box-shadow clobbered the ring. */
                transition:
                    'color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
            }"
            @click.stop="removeStop(selectedStop.id)"
        >
            <X class="w-3.5 h-3.5" aria-hidden="true" />
        </button>
    </div>
</template>

<style scoped>
/* ── The rail's owned paint stack (T.W6-2 — a MATERIAL CONTRACT, not a
   shorthand assembly; t-gradient-surfaces §5's cure). The former per-callsite
   `background: <render-string>, var(--alpha-checker)` on a glass-wash box
   resolved origin `padding-box` / clip `border-box` / `repeat`, so the ramp
   TILED into the 1px border ring and each border column showed the OPPOSITE
   terminal's color (the shot-visible mirrored slivers). Here the ramp is a
   border-box layer, no-repeat, sized to the full box: silhouette and ramp
   agree to the pixel at both ends by construction. The alpha-checker ground
   tiles beneath (S owner-ruling 2026-07-05); the glass grammar — hairline +
   soft lift — sits OUTSIDE the ramp's geometry. Pill silhouette per T-46:
   the glass-ui slider-track rounding register (`--radius-pill`). */
.gradient-rail {
    border-radius: var(--radius-pill, 9999px);
    border: 1px solid var(--card-edge);
    background: var(--rail-ramp), var(--alpha-checker);
    background-origin: border-box;
    background-clip: border-box;
    background-repeat: no-repeat, repeat;
    background-size:
        100% 100%,
        16px 16px;
    box-shadow: var(--shadow-sm);
}

/* ── The focus affordance SYSTEM (U.W-A11Y · U-F25 · BR-1; X-W4 · C4) ──
   The keyboard-operable seats carry the material lift (--shadow-sm) in the
   CASCADE (hoisted off the inline style at U-F25, Pole A), so the focus ring
   COMPOSES with it instead of an inline box-shadow clobbering the ring layer
   (the twin of the 4e6c178 dead-hover miss; the `--ring` token the dead
   `focus-visible:ring-*` utility reached also resolved empty). X-W4 splits the
   handle's two jobs across two elements — the lift on the face it belongs to,
   the ring on the 24px seat it surrounds — so the clobbering is now impossible
   rather than merely avoided. The ring is DUAL-CONTRAST: a 1px inner dark
   hairline UNDER a 3px outer light ring (the ONE `--focus-ring-inner/-outer`
   recipe, focus-ring.css), so at least one of its edges contrasts against ANY
   ramp colour it is drawn over. */
/* X-W4 · C4 — the TARGET box. The seat a pointer and the keyboard address is a
   ≥24 CSS-px box on every pointer class (WCAG 2.5.8); `1.5rem` tracks the type
   scale exactly as the 20px silhouette always has, and the `max()` holds the
   absolute floor if the root ever shrinks below 16px. The handle's PAINT is the
   `.rail-handle-face` inside it, so the visual row is unchanged: only the seat
   grew, which is what "the target is what must grow" means. */
.rail-handle,
.rail-caret {
    inline-size: max(1.5rem, 24px);
    block-size: max(1.5rem, 24px);
}
/* The caret is the keyboard's affordance alone: invisible until it takes
   keyboard focus (the pointer already has the hover ghost), never removed from
   the DOM — a seat that is not there cannot be Tabbed to. */
.rail-caret {
    opacity: 0;
    transition: opacity var(--duration-fast) var(--ease-standard);
}
.rail-caret:focus-visible {
    opacity: 1;
}
/* A grabbed stop says so with the cursor as well as with `aria-valuetext`. */
.rail-handle[data-grabbed] {
    cursor: grabbing;
}

/* The material lift rides the FACE (the paint) while the focus ring rides the
   TARGET box (the seat) — two elements, so the U-F25 composition now holds by
   construction: nothing on the handle can clobber the other's layer. The chip
   is a single element and keeps both stacks on itself. */
.rail-handle-face {
    translate: -50% -50%;
    box-shadow: var(--shadow-sm);
}
.rail-remove-chip {
    box-shadow: var(--shadow-sm);
}
.rail-handle:focus-visible,
.rail-caret:focus-visible {
    outline: none;
    box-shadow:
        0 0 0 1px var(--focus-ring-inner),
        0 0 0 3px var(--focus-ring-outer);
}
.rail-remove-chip:focus-visible {
    outline: none;
    box-shadow:
        0 0 0 1px var(--focus-ring-inner),
        0 0 0 3px var(--focus-ring-outer),
        var(--shadow-sm);
}
/* Forced-colors (WHCM) strips box-shadow → the ring vanishes; a real outline
   keeps the affordance (links U-F57). The scoped rule also FIRMS the UA's own
   forced-colors focus outline into a deterministic, branded 2px. */
@media (forced-colors: active) {
    .rail-handle:focus-visible,
    .rail-caret:focus-visible,
    .rail-remove-chip:focus-visible {
        outline: 2px solid Highlight;
        outline-offset: 2px;
    }
}

/* ── Always-on hit inflation (U.W-A11Y · U-F27 · Pole A — mount-safe; BR-3) ──
   The 20×20 handle / 24×24 chip under-serve WCAG 2.5.8 (24px) on FINE pointers
   (the former ::before was `@media (pointer: coarse)`-gated, so fine pointers
   saw a 20px target) and the producer's 44px referent on COARSE. The
   hit-expander is now PRESENT ON ALL POINTERS — a centred, transparent
   ::before at max(24px, the visual box) on fine / the producer 44px
   --touch-target on coarse — a REAL hit target (pointer-events left at its
   `auto` initial). At X-W4 the handle's own seat became the 24px box, so on
   fine pointers the two floors now AGREE by construction (`max(1.5rem, 100%)`
   resolves to the box) and this rule's live work is the COARSE 44px rung; it
   stays, because the chip is still a 24px box and because a rung that is only
   true while another rule holds is the kind that breaks silently.
   Because the pseudo belongs to the handle/chip button (data-stop-id / the
   remove role), a tap in the inflated zone targets the button, so the bar's
   add-on-click guard (`target.closest("[data-stop-id]")`) still treats a
   handle-adjacent hit as a grab, never an unintended mint. */
.rail-handle::before,
.rail-remove-chip::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: max(1.5rem, 100%);
    height: max(1.5rem, 100%);
    transform: translate(-50%, -50%);
    border-radius: 9999px;
}
@media (pointer: coarse) {
    .rail-handle::before,
    .rail-remove-chip::before {
        width: var(--touch-target, 2.75rem);
        height: var(--touch-target, 2.75rem);
    }
}
</style>
