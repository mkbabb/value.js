<script setup lang="ts">
import { ref, computed, useTemplateRef } from "vue";
import { X } from "@lucide/vue";
import type { GradientStop } from "../composables/useGradientModel";

const { stops, railRamp, colorAt = undefined, rungs = undefined } = defineProps<{
    stops: GradientStop[];
    /**
     * The rail-normalized 90° projection (`serializeRailRamp`, T.W6-2): the
     * rail ALWAYS paints this — at every type/direction — so handles,
     * add-ghost, rungs, and ramp share one axis by construction. The raw
     * render string (type + direction applied) is the render tile's job.
     */
    railRamp: string;
    /** Ramp color at a position (0–100) — previews the ghost + seeds adds. */
    colorAt?: (position: number) => string | null;
    /**
     * iso-ΔE_OK rung positions (0–100) from `usePerceivedRamp` (W5-8):
     * equal perceptual arc-length ticks — bunched rungs = fast perceptual
     * change, open rungs = a flat zone; a steps() interval reads as
     * rung-free bands with clusters at the risers.
     */
    rungs?: number[];
}>();

const emit = defineEmits<{
    "update:position": [id: string, position: number];
    "add": [position: number];
    "remove": [id: string];
    "select": [id: string];
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

// ── The re-tap deselect (P7-R1: the sweep regime's EXIT) ──
// Selecting a stop pins the envelope plate to its single-hue slice; the
// sweep hero regime was one-way (no gesture un-pinned it). A re-tap on the
// already-selected handle — a press that does NOT become a drag — clears the
// selection, un-pinning the plate. This is Escape's pointer twin (touch has
// no Escape), so it must NOT fire when the press turns into a drag.
let handleGesture: { wasSelected: boolean; x: number; y: number; moved: boolean } | null = null;

// ── Geometry (W5-11: end-handle truce) ──
// Handle CENTERS ride an inset track [HANDLE_HALF, width - HANDLE_HALF], so
// the 0%/100% handles sit fully INSIDE the bar instead of hanging half off
// its rounded corners.
const HANDLE_HALF = 10; // w-5 handle → 20px, half = 10

function handleLeft(position: number): string {
    return `calc(${HANDLE_HALF}px + (100% - ${HANDLE_HALF * 2}px) * ${position / 100})`;
}

// Handle scale ladder: selected/dragging (1.25) > hover (1.1) > rest (1).
function handleScale(id: string): number {
    if (selectedId.value === id || draggingId.value === id) return 1.25;
    return hoveredId.value === id ? 1.1 : 1;
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
    // re-tap → deselect (un-pin the plate; the touch/mouse EXIT — P7-R1).
    if (handleGesture && handleGesture.wasSelected && !handleGesture.moved) {
        selectedId.value = null;
    }
    handleGesture = null;
    draggingId.value = null;
}

function removeStop(id: string) {
    if (!removable.value) return;
    if (selectedId.value === id) selectedId.value = null;
    emit("remove", id);
}

function onHandleContextMenu(e: MouseEvent, id: string) {
    e.preventDefault();
    removeStop(id);
}

/**
 * Keyboard: arrows nudge (±1, shift ±10); Delete/Backspace removes; Escape
 * clears the selection (P7-R1 — un-pins the envelope plate back to the
 * swept-hue hero regime; the handle keeps focus, the pin-on-select law is
 * untouched — this is the EXIT the sweep regime lacked).
 */
function onHandleKeydown(e: KeyboardEvent, stop: GradientStop) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const delta = (e.key === "ArrowLeft" ? -1 : 1) * (e.shiftKey ? 10 : 1);
        const next = Math.max(0, Math.min(100, stop.position + delta));
        selectedId.value = stop.id;
        emit("update:position", stop.id, Math.round(next * 10) / 10);
    } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        removeStop(stop.id);
    } else if (e.key === "Escape") {
        e.preventDefault();
        selectedId.value = null;
    }
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
            :class="['gradient-rail relative h-10 select-none touch-none', draggingId ? 'cursor-grabbing' : 'cursor-copy']"
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

            <!-- Stop handles -->
            <button
                v-for="stop in stops"
                :key="stop.id"
                :data-stop-id="stop.id"
                type="button"
                :aria-label="`Gradient stop at ${Math.round(stop.position)}%`"
                class="rail-handle absolute top-1/2 w-5 h-5 rounded-full border-2 cursor-grab active:cursor-grabbing"
                :class="[
                    selectedId === stop.id
                        ? 'border-white z-10'
                        : 'border-white/80 z-0'
                ]"
                :style="{
                    left: handleLeft(stop.position),
                    /* S owner-ruling 2026-07-05: the stop well paints its
                       color as a layer OVER the `--alpha-checker` ground
                       (background-color would sit UNDER background-image,
                       so the color rides a const-color gradient layer). */
                    background: `linear-gradient(${stop.cssColor}, ${stop.cssColor}), var(--alpha-checker)`,
                    /* U.W-A11Y / U-F25 (Pole A): the material lift (`--shadow-sm`)
                       is HOISTED to the scoped `.rail-handle` cascade (below) so
                       the focus ring COMPOSES with it — an inline box-shadow here
                       clobbered the whole property, killing `focus-visible:ring-2`
                       (the twin of the 4e6c178 dead-hover miss). The per-stop
                       COLOR stays inline (it is per-stop DATA); only the shadow
                       stack became a stylesheet contract. */
                    /* S.W4 / W4-3: the hover scale rides the INLINE transform —
                       the `hover:scale-110` utility was DEAD, shadowed by this
                       inline `transform` (inline style always outranks the
                       class). Selected/dragging (1.25) outranks hover (1.1).
                       T.W5 R9 (ridden here per the cross-wave clause): the
                       handle's scale settle is SPATIAL — `--spring-snappy` @
                       its own clock, never the squeezed generic 0.3s. */
                    transform: `translate(-50%, -50%) scale(${handleScale(stop.id)})`,
                    transition: 'box-shadow var(--duration-fast) var(--ease-standard), transform var(--spring-snappy-duration) var(--spring-snappy)',
                }"
                @pointerdown="(e) => onHandlePointerDown(e, stop.id)"
                @pointermove="onHandlePointerMove"
                @pointerup="onHandlePointerUp"
                @pointercancel="onHandlePointerUp"
                @pointerenter="hoveredId = stop.id"
                @pointerleave="hoveredId = null"
                @contextmenu="(e) => onHandleContextMenu(e, stop.id)"
                @keydown="(e) => onHandleKeydown(e, stop)"
            />

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
                transition: 'color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
            }"
            @click.stop="removeStop(selectedStop.id)"
        >
            <X class="w-3.5 h-3.5" aria-hidden="true" />
        </button>

        <!-- The iso-ΔE_OK ruler (W5-8 rungs; T.W6-2 ruler grammar — finding
             6's cure): rungs are INTERIOR perceptual arc-length marks (the
             ends are not rungs), so the row carries terminal caps at 0/100
             in a distinct taller voice — the termination law made visible;
             the asymmetric extents read as perceptual truth, not layout
             error. Mapped to the same inset track as the handles; the rung
             ink joins the recalibrated gamut-ink register (ONE netting
             voice across plate and rail, both schemes). -->
        <!-- `mx-px`: the rail's 1px hairline insets its padding box (where
             the handles' inset track lives); the borderless ruler row takes
             the same 1px inset so caps/rungs and handle centers share ONE
             axis to the pixel (O-21's cap↔handle congruence). -->
        <div
            v-if="rungs && rungs.length"
            data-testid="gradient-rung-row"
            class="relative h-2.5 mx-px"
            aria-hidden="true"
        >
            <span
                v-for="cap in [0, 100]"
                :key="`cap-${cap}`"
                data-testid="gradient-ruler-cap"
                class="absolute top-0 h-full w-[1.5px] -translate-x-1/2 rounded-full bg-foreground/70"
                :style="{ left: handleLeft(cap) }"
            />
            <span
                v-for="(r, i) in rungs"
                :key="i"
                data-testid="gradient-rung"
                class="absolute top-1/2 w-px h-1.5 -translate-y-1/2"
                :style="{ left: handleLeft(r), background: 'var(--gamut-edge)' }"
            />
        </div>
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
    background-size: 100% 100%, 16px 16px;
    box-shadow: var(--shadow-sm);
}

/* ── The focus affordance SYSTEM (U.W-A11Y · U-F25 · BR-1) ──
   The keyboard-operable stop handle + remove chip carry the material lift
   (--shadow-sm) in the CASCADE now (hoisted off the inline style, Pole A), so
   the focus ring COMPOSES with it instead of an inline box-shadow clobbering
   the ring layer (the twin of the 4e6c178 dead-hover miss; the `--ring` token
   the dead `focus-visible:ring-*` utility reached also resolved empty). The
   ring is DUAL-CONTRAST — a 1px inner dark hairline UNDER a 3px outer light
   ring (the ONE `--focus-ring-inner/-outer` recipe, focus-ring.css) riding
   OVER the stop's own colour fill, so at least one edge contrasts against ANY
   fill. */
.rail-handle,
.rail-remove-chip {
    box-shadow: var(--shadow-sm);
}
.rail-handle:focus-visible,
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
   `auto` initial). The VISUAL dot is UNCHANGED (the pseudo is absolute → zero
   layout/geometry delta → the mount box is HELD, the clean U-F76 handoff).
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
