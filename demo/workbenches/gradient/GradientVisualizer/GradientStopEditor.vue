<script setup lang="ts">
import { ref, computed, useTemplateRef } from "vue";
import { X } from "@lucide/vue";
import { clamp, scale } from "@mkbabb/value.js/math";
import type { GradientStop } from "../composables/useGradientModel";
import { railPosition } from "../composables/useGradientModel";

const { stops, railRamp, colorAt } = defineProps<{
    stops: GradientStop[];
    /**
     * The rail-normalized 90° projection (`serializeRailRamp`, T.W6-2): the
     * rail ALWAYS paints this — at every type/direction — so handles,
     * add-ghost and ramp share one axis by construction. The true render
     * string (type + direction applied) is the render tile's job.
     */
    railRamp: string;
    /**
     * Ramp color at a position (0–100) — previews the ghost + seeds adds.
     * REQUIRED (X-W6 · X.W6.a): it was optional with a `?? null` default, and
     * a masking default is how a rail silently paints an empty ghost when its
     * owner forgets to wire the sampler.
     */
    colorAt: (position: number) => string;
}>();

const emit = defineEmits<{
    "update:position": [id: string, position: number];
    add: [position: number];
    remove: [id: string];
}>();

// The ONE selection channel (X-W6 · X.W6.a). The former `select` emit rode
// beside this model and the owner wrote the same ref from both, so a selection
// had two writers and no owner.
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
const caretColor = computed(() => colorAt(caretPos.value));

// ── The keyboard grab (VISUAL-CONSTITUTION §5.2, the stop row) ──
// "after Space grabs … Space drops, Escape cancels". It is the keyboard twin of
// a pointer drag: Escape returns the stop to where the grab began. It is a
// POSITION gesture and never an ordinal reorder — the model's own
// normalise-on-write (X-W6 / CC-058 / GRADSTOP-A §14) derives the ordinal from
// the position, and §15 bans any minimum-separation law outright.
const grabbed = ref<{ id: string; origin: number } | null>(null);

function isGrabbed(id: string): boolean {
    return grabbed.value?.id === id;
}

/** The keyboard steps: one percent, ten under Shift / Page (§5.2). */
const STEP = 1;
const PAGE_STEP = 10;

/**
 * The gesture dead zone, in CSS px. A press inside it is a tap, not a drag:
 * it is what the bar's add path already used to tell a click from a scrub, and
 * the handle now shares it, so a stop's FIRST position write waits for the
 * pointer to actually travel (X-W6 · X.W6.a — a5).
 */
const DEAD_ZONE = 4;

/**
 * A live handle drag. `grabDx` is the pointer's offset from the handle's own
 * CENTRE at the press, captured against a rect read ONCE at pointerdown: every
 * later position is read at `clientX - grabDx`, so grabbing a handle 8px off
 * centre and travelling 1px moves the stop 1px — never 10 (a5, the teleport).
 */
interface HandleDrag {
    id: string;
    axis: RailAxis;
    grabDx: number;
    pressX: number;
    pressY: number;
    wasSelected: boolean;
    moved: boolean;
}
let drag: HandleDrag | null = null;

// ── Geometry: the ONE axis (X-W6 · X.W6.a — a3 / a4 / a12) ──
//
// There is no `HANDLE_HALF` px literal any more. The axis inset is half a
// handle seat and is declared ONCE, as `--rail-inset` in this file's own scoped
// CSS; the seat is sized from the same property, so the two can never drift at
// a type-scale change (the +1.5px-at-rootFS-20 overhang was exactly that
// drift). `railPosition` is the ONE map: the rail ramp's colour-stop positions
// and every handle's `left` are the SAME CSS expression, and the inverse below
// reads the SAME custom property the expression reads.

interface RailAxis {
    /** Client-x of ordinal 0 — the first handle's centre. */
    originX: number;
    /** Distance from ordinal 0 to ordinal 100, in CSS px. */
    track: number;
}

function railAxis(bar: HTMLElement): RailAxis {
    const rect = bar.getBoundingClientRect();
    const cs = getComputedStyle(bar);
    const inset = parseFloat(cs.getPropertyValue("--rail-inset"));
    const borderLeft = parseFloat(cs.borderLeftWidth);
    const borderRight = parseFloat(cs.borderRightWidth);
    // `left` percentages resolve against the containing block's PADDING box,
    // which is the same box the ramp is painted over.
    const paddingBox = rect.width - borderLeft - borderRight;
    return {
        originX: rect.left + borderLeft + inset,
        // A rail with no laid-out track has no axis to invert; `scale` refuses
        // an empty input range, so the degenerate case is named here.
        track: Math.max(1, paddingBox - inset * 2),
    };
}

/** The inverse of `railPosition`: a client-x back onto the ordinal axis. */
function positionFromX(axis: RailAxis, clientX: number): number {
    return round1(
        clamp(scale(clientX, axis.originX, axis.originX + axis.track, 0, 100), 0, 100),
    );
}

/** 0–100, at the model's own tenth-of-a-percent resolution. */
function round1(position: number): number {
    return Math.round(clamp(position, 0, 100) * 10) / 10;
}

function handleLeft(position: number): string {
    return railPosition(position / 100);
}

// Handle scale ladder: selected/dragging/grabbed (1.25) > hover (1.1) > rest (1).
function handleScale(id: string): number {
    if (selectedId.value === id || draggingId.value === id || isGrabbed(id))
        return 1.25;
    return hoveredId.value === id ? 1.1 : 1;
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
    hoverPos.value !== null ? colorAt(hoverPos.value) : null,
);

// ── Bar gestures: hover ghost + click-to-add (never warp, never drag) ──

function barPosition(e: PointerEvent): number | null {
    const bar = barRef.value;
    return bar ? positionFromX(railAxis(bar), e.clientX) : null;
}

function onBarPointerDown(e: PointerEvent) {
    // Only the primary button mints (X-W6 · a7). A middle- or right-press used
    // to travel the whole add path and leave a stop behind with no caveat.
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("[data-stop-id]")) return; // handles own their gestures
    pendingAdd = { x: e.clientX, y: e.clientY };
}

function onBarPointerMove(e: PointerEvent) {
    // A captured handle drag is the HANDLE's, whole. The bar's former fallback
    // emit also fired on every captured move (the move bubbles here), so one
    // gesture wrote the position twice per frame (a8).
    if (draggingId.value) return;
    const target = e.target as HTMLElement;
    hoverPos.value = target.closest("[data-stop-id]") ? null : barPosition(e);
}

function onBarPointerUp(e: PointerEvent) {
    if (!pendingAdd) return;
    const moved =
        Math.abs(e.clientX - pendingAdd.x) > DEAD_ZONE ||
        Math.abs(e.clientY - pendingAdd.y) > DEAD_ZONE;
    pendingAdd = null;
    if (moved) return;
    const position = barPosition(e);
    if (position !== null) emit("add", position);
}

/** A cancelled press commits NOTHING — it only disarms (GRADSTOP-A §12). */
function onBarPointerCancel() {
    pendingAdd = null;
}

function onBarPointerLeave() {
    hoverPos.value = null;
    pendingAdd = null;
}

// ── Handle gestures: drag / select ──

function onHandlePointerDown(e: PointerEvent, id: string) {
    if (e.button !== 0) return;
    e.stopPropagation();
    const bar = barRef.value;
    if (!bar) return;
    // A pointer drag ends any keyboard grab — one gesture owns the stop at a
    // time, and a grab left armed behind a drag would make Escape teleport.
    grabbed.value = null;

    const seat = e.currentTarget as HTMLElement;
    const seatRect = seat.getBoundingClientRect();
    drag = {
        id,
        axis: railAxis(bar),
        grabDx: e.clientX - (seatRect.left + seatRect.width / 2),
        pressX: e.clientX,
        pressY: e.clientY,
        wasSelected: selectedId.value === id,
        moved: false,
    };
    draggingId.value = id;
    selectedId.value = id;
    seat.setPointerCapture(e.pointerId);
    // `e.preventDefault()` is DELETED. It was what kept a real mouse press from
    // focusing the handle, so a pointer user's selection had no keyboard seat
    // (a6). Focus is taken explicitly because WebKit does not focus a button on
    // press either — the two engines now agree by construction, not by default.
    seat.focus();
}

function onHandlePointerMove(e: PointerEvent) {
    if (!drag) return;
    if (!drag.moved) {
        const travelled =
            Math.abs(e.clientX - drag.pressX) > DEAD_ZONE ||
            Math.abs(e.clientY - drag.pressY) > DEAD_ZONE;
        if (!travelled) return; // the first write waits for the dead zone
        drag.moved = true;
    }
    emit("update:position", drag.id, positionFromX(drag.axis, e.clientX - drag.grabDx));
}

function onHandlePointerUp() {
    // A press that never became a drag ON the already-selected handle is a
    // re-tap: it deselects without moving the stop (Escape's pointer twin).
    if (drag && drag.wasSelected && !drag.moved) selectedId.value = null;
    drag = null;
    draggingId.value = null;
}

/** Cancel DISARMS and nothing else: no position write, no selection change. */
function onHandlePointerCancel() {
    drag = null;
    draggingId.value = null;
}

function removeStop(id: string) {
    if (!removable.value) return;
    if (selectedId.value === id) selectedId.value = null;
    if (isGrabbed(id)) grabbed.value = null;
    emit("remove", id);
}

function moveStop(stop: GradientStop, position: number) {
    selectedId.value = stop.id;
    emit("update:position", stop.id, round1(position));
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
            caretPos.value = round1(caretPos.value - step);
            break;
        case "ArrowRight":
        case "ArrowUp":
            caretPos.value = round1(caretPos.value + step);
            break;
        case "PageDown":
            caretPos.value = round1(caretPos.value - PAGE_STEP);
            break;
        case "PageUp":
            caretPos.value = round1(caretPos.value + PAGE_STEP);
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
    <!-- `relative`: the remove chip anchors to the RAIL root, and the root
         RESERVES the chip's band below the rail (X-W6 · a10) so the chip can
         never paint across a sibling rule. -->
    <div class="rail-seat relative flex flex-col gap-1">
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
                'gradient-rail relative select-none touch-none',
                draggingId ? 'cursor-grabbing' : 'cursor-copy',
            ]"
            :style="{ '--rail-ramp': railRamp }"
            @pointerdown="onBarPointerDown"
            @pointermove="onBarPointerMove"
            @pointerup="onBarPointerUp"
            @pointercancel="onBarPointerCancel"
            @pointerleave="onBarPointerLeave"
        >
            <!-- The add ghost: a dashed twin of the handle species, filled
                 with the exact ramp color a click would mint (W5-11 — the
                 affordance replaces the instruction line). -->
            <div
                v-if="hoverPos !== null && !draggingId"
                class="rail-ghost absolute top-1/2 rounded-full border-2 border-dashed border-white/70 opacity-80 pointer-events-none z-0"
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
                    background: `linear-gradient(${caretColor}, ${caretColor}), var(--alpha-checker)`,
                    transform: 'translate(-50%, -50%)',
                }"
                @keydown="onCaretKeydown"
            />

            <!-- Stop handles. The BUTTON is the ≥24×24 target and the seat that
                 owns role / value / name / focus (X-W4 · C2/C4); the FACE inside
                 it is the painted silhouette, carrying the DUAL-CONTRAST resting
                 ring (X-W6 · a11). -->
            <button
                v-for="(stop, index) in stops"
                :key="stop.id"
                :data-stop-id="stop.id"
                :data-grabbed="isGrabbed(stop.id) ? '' : undefined"
                :data-selected="selectedId === stop.id ? '' : undefined"
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
                @pointercancel="onHandlePointerCancel"
                @pointerenter="hoveredId = stop.id"
                @pointerleave="hoveredId = null"
                @keydown="(e) => onHandleKeydown(e, stop)"
            >
                <span
                    class="rail-handle-face absolute top-1/2 left-1/2 rounded-full"
                    aria-hidden="true"
                    :style="{
                        /* S owner-ruling 2026-07-05: the stop well paints its
                           color as a layer OVER the `--alpha-checker` ground
                           (background-color would sit UNDER background-image, so
                           the color rides a const-color gradient layer). The
                           per-stop COLOR is the only thing still inline here —
                           it is per-stop DATA; the material lift and both rings
                           are stylesheet contracts (U-F25 / X-W6 a11, below). */
                        background: `linear-gradient(${stop.cssColor}, ${stop.cssColor}), var(--alpha-checker)`,
                    }"
                />
            </button>
        </div>

        <!-- The remove chip (W5-11 / P1-3: remove was right-click-ONLY —
             undiscoverable, impossible on touch). Floats BELOW the selected
             handle whenever removal is legal, a FULL coarse touch target below
             the handle's centre so the grab and destroy hit regions are
             disjoint on a coarse pointer (X-W6 · a9). A SIBLING of the rail,
             never a child: it lives OUTSIDE the rail's box, and the seat above
             reserves its band (a10). -->
        <button
            v-if="selectedStop && removable"
            type="button"
            aria-label="Remove selected stop"
            class="rail-remove-chip absolute rounded-full border border-card-edge bg-well text-muted-foreground flex items-center justify-center z-20 cursor-pointer hover:text-destructive hover:border-destructive/60"
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
/* ── THE ONE AXIS (X-W6 · X.W6.a — a3 / a4 / a12) ─────────────────────────────
   `--rail-inset` is half a handle seat and `--rail-track` is the span between
   the two terminal handle CENTRES. Both the handles' `left` and every
   colour-stop position in `--rail-ramp` are the one expression
   `calc(var(--rail-inset) + var(--rail-track) * <ordinal>)` (minted once, in
   `useGradientCSS.railPosition`), and the inverse map in this file's script
   reads `--rail-inset` back off this element — so there is no px literal on
   either side to drift at a type-scale change, and the ramp cannot paint an
   ordinal at a pixel where no handle sits.

   `--rail-inset` is REGISTERED so it computes to a length: an unregistered
   custom property hands JavaScript back its own token text, and an axis the
   script cannot read is an axis the script must guess. */
@property --rail-inset {
    syntax: "<length>";
    inherits: true;
    initial-value: 12px;
}

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
   the glass-ui slider-track rounding register (`--radius-pill`).

   X-W6 · a3: the hairline is an INSET RING, never a `border`. A border puts
   the ramp's gradient box (border box) and the handles' containing block
   (padding box) one pixel out of step at every ordinal — the two-language
   disagreement this unit exists to delete — for a paint no eye can tell
   apart. */
.gradient-rail {
    block-size: var(--rail-height);
    border-radius: var(--radius-pill, 9999px);
    background: var(--rail-ramp), var(--alpha-checker);
    background-origin: border-box;
    background-clip: border-box;
    background-repeat: no-repeat, repeat;
    background-size:
        100% 100%,
        16px 16px;
    box-shadow:
        inset 0 0 0 1px var(--card-edge),
        var(--shadow-sm);
}

/* ── The seat's own register (X-W6 · a9 / a10 / a12) ──
   One handle size, one rail height, one chip size, one coarse touch target —
   every other geometry below is DERIVED from these four, so a type-scale
   change moves the whole instrument together instead of pulling the axis away
   from its handles or the chip into the next section's rule. */
.rail-seat {
    --rail-handle-size: max(1.5rem, 24px);
    --rail-face-size: 1.25rem;
    --rail-height: 2.5rem;
    --rail-chip-size: 1.5rem;
    --rail-touch: var(--touch-target, 2.75rem);
    /* The axis, declared on the SEAT so the rail's handles and the chip that
       tracks the selected one read the same two properties. The seat draws no
       horizontal padding, so `100%` is the same length in both containing
       blocks — one axis, not two that happen to agree. */
    --rail-inset: calc(var(--rail-handle-size) / 2);
    --rail-track: calc(100% - 2 * var(--rail-inset));
    /* The chip's centre sits ONE full coarse target below the handle's, so the
       grab and the destroy hit regions cannot overlap on a coarse pointer. */
    --rail-chip-top: calc(
        var(--rail-height) / 2 + var(--rail-touch) - var(--rail-chip-size) / 2
    );
    /* …and the seat reserves that band, so the chip paints on its OWN ground
       instead of across whatever rule the next section draws. */
    padding-bottom: calc(
        var(--rail-chip-top) + var(--rail-chip-size) - var(--rail-height)
    );
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
    inline-size: var(--rail-handle-size);
    block-size: var(--rail-handle-size);
}
/* The ghost is a preview of the painted SILHOUETTE, not of the seat. */
.rail-ghost {
    inline-size: var(--rail-face-size);
    block-size: var(--rail-face-size);
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

/* ── The RESTING ring is dual-contrast too (X-W6 · a11) ──
   A white-on-white ramp painted the old `border-white/80` face at 1.00:1 — the
   handles simply disappeared. The face now carries the same two-pole recipe the
   focus ring uses: a dark hairline INSIDE a light ring, so whatever colour the
   ramp puts under a handle, one of the two edges clears 3:1 against it. The
   focus ring still reads, because it is drawn on the SEAT (a wider box) and so
   lands outside the face's own band. */
.rail-handle-face {
    inline-size: var(--rail-face-size);
    block-size: var(--rail-face-size);
    translate: -50% -50%;
    box-shadow:
        inset 0 0 0 1px var(--focus-ring-inner),
        0 0 0 2px var(--focus-ring-outer),
        var(--shadow-sm);
}
.rail-handle[data-selected] .rail-handle-face {
    box-shadow:
        inset 0 0 0 2px var(--focus-ring-inner),
        0 0 0 3px var(--focus-ring-outer),
        var(--shadow-sm);
}
.rail-remove-chip {
    inline-size: var(--rail-chip-size);
    block-size: var(--rail-chip-size);
    top: var(--rail-chip-top);
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
    /* The resting ring is box-shadow too, so WHCM would leave the handles
       unmarked; a real outline carries the silhouette into forced colors. */
    .rail-handle-face {
        outline: 1px solid CanvasText;
    }
}

/* ── Always-on hit inflation (U.W-A11Y · U-F27 · Pole A — mount-safe; BR-3) ──
   The handle / chip boxes under-serve the producer's 44px COARSE referent, so a
   centred, transparent ::before carries the coarse rung (pointer-events left at
   its `auto` initial). On FINE pointers the seat IS the ≥24px box (X-W4 · C4),
   so `max(1.5rem, 100%)` resolves to the box and the two floors agree by
   construction; the rule stays because the chip is still a 24px box and because
   a rung that is only true while another rule holds is the kind that breaks
   silently.
   Because the pseudo belongs to the handle/chip button (data-stop-id / the
   remove role), a tap in the inflated zone targets the button, so the bar's
   add-on-click guard (`target.closest("[data-stop-id]")`) still treats a
   handle-adjacent hit as a grab, never an unintended mint. The chip's own band
   starts one full coarse target below the handle's centre (`--rail-chip-top`),
   so the two inflated zones no longer share a row of pixels (a9). */
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
        width: var(--rail-touch);
        height: var(--rail-touch);
    }
}
</style>
