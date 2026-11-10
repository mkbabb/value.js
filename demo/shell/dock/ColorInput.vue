<template>
    <div class="color-input-face grid grid-cols-1 gap-y-2 p-0 m-0">
        <!-- X·§0hr.2 (2) OD-11: the help preview and the invalid badge hang
             from the same edge of the field, and glass's scale stacks the
             popover tier (130) over the tooltip tier (120) the badge rides.
             The gestalt: while the field is invalid the badge IS the field's
             floating status, so the help preview yields — it closes on the
             invalid commit and cannot reopen until the field is valid again
             (the next edit clears the badge; hover brings the help back). -->
        <Popover
            trigger="hover"
            :close-delay="0"
            :open-delay="300"
            :open="helpOpen && !badgeRaised"
            class="pointer-events-auto w-full"
            @update:open="helpOpen = $event"
        >
            <PopoverTrigger as-child>
                <!-- OD-9 · OD-10 (COHESION §0hk): this row IS the field box
                     (border, plate, radius, focus/error ring) and lays its three
                     parts out in flow — the text run, the crown, the Apply
                     arrow — so no part sits on another. The fade that used to
                     mask the text under an absolutely placed arrow masked the
                     whole box with it: the border and plate faded out at the
                     right end, which read as the field being clipped. -->
                <div
                    ref="fieldBox"
                    class="color-field relative w-full flex items-center cursor-default border bg-background rounded-media"
                    :class="{
                        'color-input-error': parseError && !proposeMode,
                        'color-input-mode-flash': modeTransition,
                    }"
                    :style="inputStyle"
                >
                    <span
                        ref="inputColorRef"
                        contenteditable
                        role="textbox"
                        spellcheck="false"
                        autocapitalize="off"
                        autocorrect="off"
                        :aria-label="proposeMode ? 'Propose a color name' : 'Enter a CSS color'"
                        :aria-invalid="parseError && !proposeMode ? 'true' : undefined"
                        :aria-describedby="parseError && !proposeMode ? 'color-input-error' : undefined"
                        class="color-input flex-1 min-w-0 block overflow-hidden ps-3 pe-1 focus-visible:outline-none font-mono text-ellipsis whitespace-nowrap text-center"
                        @keydown="onInputKeydown"
                        @input="onInputInput"
                        @focus="onInputFocus"
                        @blur="onInputBlur"
                    ></span>

                    <!-- Crown indicator for approved custom color names — its own
                         slot between the text and the Apply arrow (OD-10). -->
                    <TooltipProvider v-if="currentColorMeta && !proposeMode" :delay-duration="200">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Crown
                                    :key="crownKey"
                                    class="shrink-0 w-[0.75em] h-[0.75em] gold-ink hover:scale-110 transition-transform cursor-help"
                                    :stroke-width="1.75"
                                    style="
                                        animation: crown-appear var(--duration-panel) var(--ease-decelerate) forwards;
                                    "
                                />
                            </TooltipTrigger>
                            <TooltipContent class="text-mono-small max-w-tooltip">
                                <div class="grid gap-1">
                                    <span class="font-bold">{{
                                        currentColorMeta.name
                                    }}</span>
                                    <span
                                        v-if="currentColorMeta.contributor"
                                        class="text-muted-foreground"
                                    >
                                        by {{ currentColorMeta.contributor }}
                                    </span>
                                    <span class="text-muted-foreground">
                                        {{ formatCssCaption(currentColorMeta.css) }}
                                    </span>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <!-- Inline send button — .send-btn keeps only seat
                         geometry (see the scoped block). X.W8.d
                         (W5-BTN-INTERACTIVE-DEAD): the `btn-interactive` atom
                         left glass at 490cc46e; its dead class is deleted. -->
                    <button
                        v-if="proposeMode"
                        class="send-btn"
                        aria-label="Propose this color name"
                        :disabled="!proposedName.trim() || proposing"
                        @click="submitProposedName"
                    >
                        <Loader2 v-if="proposing" class="w-3.5 h-3.5 animate-spin" />
                        <ArrowRight v-else class="w-4 h-4" :style="{ stroke: safeAccent }" />
                    </button>
                    <button
                        v-else
                        class="send-btn"
                        aria-label="Apply color"
                        @click="onSubmitColor"
                    >
                        <ArrowRight class="w-4 h-4" :style="{ stroke: safeAccent }" />
                    </button>

                    <!-- Parse error badge — celebration family (a one-shot
                         feedback beat; geometry vars live on .error-badge).
                         OD-11 (COHESION §0hk): it is glass's Badge on the
                         destructive tone at the caption rung, so type, stadium
                         radius, pad and plate are the badge canon; this file
                         owns only where it hangs.
                         OD-8 (COHESION §0hh): it hangs BELOW the field, never
                         over the text it reports on. In flow it cannot: the
                         glass dock run is a scroll container that clips 4 px
                         under the field, so the badge leaves the run for the
                         body and is anchored to the field's rect. -->
                    <Teleport to="body">
                        <Transition name="vj-celebrate">
                            <Badge
                                v-if="parseError && !proposeMode"
                                id="color-input-error"
                                role="status"
                                tone="destructive"
                                size="sm"
                                class="error-badge"
                                :style="badgeAnchor"
                                >not a valid color</Badge
                            >
                        </Transition>
                    </Teleport>
                </div>
            </PopoverTrigger>

            <PopoverContent v-if="!proposeMode" class="pointer-events-auto font-display w-full">
                <!-- T.W4-6 (T-15/F7): popover title → display voice, ≤500
                     non-bold (the `font-bold` 700 dies with the sweep). -->
                <p class="font-display font-medium text-subheading">Enter a color</p>
                <p>
                    <span class="italic">Any</span> valid CSS color string is accepted.
                </p>
                <Separator class="my-2" />

                <div class="font-mono w-full flex justify-center">
                    {{ formatColor(currentPhysicalColor, "caption") }}
                </div>

                <!-- E4 (Q10): the Parse-Lab echo (AST + gamut verdict). -->
                <Separator class="my-2" />
                <ParseEchoReadout />
            </PopoverContent>
        </Popover>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue";
import { useElementBounding } from "@vueuse/core";
import { writeClipboard } from "@mkbabb/glass-ui/dom";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@mkbabb/glass-ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@mkbabb/glass-ui/tooltip";
import { Separator } from "@mkbabb/glass-ui/separator";
import { Badge } from "@mkbabb/glass-ui/badge";
import { Crown, ArrowRight, Loader2 } from "@lucide/vue";
import ParseEchoReadout from "./ParseEchoReadout.vue";
import { proposeColorName } from "../../color-session/color-names";
import { useSession } from "../../platform/auth/useSession";
import { serializePickerColor } from "../../color-session/picker-color";
import { normalizeColorNameKey } from "../../color-session/color-name-input";
import { formatColor, formatCssCaption } from "../../color-session/format-color";
import { COLOR_MODEL_KEY, SAFE_ACCENT_KEY } from "../../color-session/keys";

const { proposeMode } = defineProps<{
    proposeMode?: boolean;
}>();

const emit = defineEmits<{
    /** A name proposal succeeded (UIA-V-12); the parent leaves propose mode. */
    proposed: [name: string];
}>();

const {
    currentPhysicalColor,
    cssColor,
    formattedCurrentColor,
    currentColorMeta,
    crownKey,
    parseAndSetColor,
    parseAndSetColorDebounced,
    parseError,
    clearParseError,
    updateModel,
} = inject(COLOR_MODEL_KEY)!;

const safeAccent = inject(SAFE_ACCENT_KEY)!;

const inputColorRef = useTemplateRef<HTMLElement>("inputColorRef");
const inputIsFocused = ref(false);

// OD-8: the badge's anchor — the field's bottom centre, re-read as the badge
// raises (the dock's layer motion moves the field without a resize or scroll).
// OD-9: the field is the box row, not the text run inside it (the run stops
// short of the crown and the arrow, so its centre is off the field's).
const fieldBox = useTemplateRef<HTMLElement>("fieldBox");
const fieldRect = useElementBounding(fieldBox);
watch(parseError, (raised) => {
    if (raised) fieldRect.update();
});
/** OD-11: the badge is up — the help preview yields to it (see the Popover). */
const badgeRaised = computed(() => parseError.value && !proposeMode);
const helpOpen = ref(false);
watch(badgeRaised, (up) => {
    if (up) helpOpen.value = false;
});

const badgeAnchor = computed(() => ({
    "--anchor-cx": `${fieldRect.x.value + fieldRect.width.value / 2}px`,
    "--anchor-bottom": `${fieldRect.bottom.value}px`,
}));

const inputStyle = computed(() => {
    if (!proposeMode && parseError.value) return { borderColor: "var(--destructive)" };
    if (inputIsFocused.value) return { borderColor: cssColor.value };
    return undefined;
});

const selectAll = () => {
    const target = inputColorRef.value;
    if (!target) return;
    const range = document.createRange();
    range.selectNodeContents(target);
    const selection = window.getSelection();
    if (selection?.toString() === target.innerText) return;
    selection?.removeAllRanges();
    selection?.addRange(range);
};

const onInputFocus = () => {
    inputIsFocused.value = true;
    selectAll();
};
const onInputBlur = () => {
    inputIsFocused.value = false;
    // U9: repaint the canonical current colour on blur so uncommitted/invalid
    // typed text never lingers. A dock-triggered reset blurs the field first, so
    // this is the path that makes the contenteditable repaint unconditionally to
    // the (reset) model value — the `formattedCurrentColor` watch skips repaint
    // while focused, leaving stale text without this snap-back.
    if (!proposeMode && inputColorRef.value) {
        inputColorRef.value.innerText = formatCssCaption(formattedCurrentColor.value);
        // X·§0ht (c): the edit scroll would outlive the edit, and the repainted
        // caption ellipsized against it showed "…" alone; at rest it reads
        // from its start.
        inputColorRef.value.scrollLeft = 0;
        clearParseError();
    }
};
const onInputInput = (e: Event) => {
    const text = (e.target as HTMLElement).innerText;
    if (proposeMode) {
        proposedName.value = text;
    } else {
        // UIA-V-13: the verdict belonged to the text just replaced.
        clearParseError();
        parseAndSetColorDebounced(text);
    }
};
const onInputKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (proposeMode) {
            submitProposedName();
        } else {
            // UIA-V-508: Enter commits NOW; the pending debounced parse of the
            // same text is dropped rather than re-running 2 s later.
            parseAndSetColorDebounced.cancel();
            parseAndSetColor((e.target as HTMLElement).innerText);
        }
    }
};

const onSubmitColor = () => {
    if (inputColorRef.value) {
        parseAndSetColorDebounced.cancel();
        parseAndSetColor(inputColorRef.value.innerText);
    }
};

const copyAndSetInputColor = () => {
    // O-1109: the field and the clipboard take the caption the field shows.
    const color = formatCssCaption(formattedCurrentColor.value);
    updateModel({ inputColor: color });
    void writeClipboard(color);
};

// Propose name state
const proposedName = ref("");
const proposing = ref(false);
const session = useSession();

async function submitProposedName() {
    if (!normalizeColorNameKey(proposedName.value) || proposing.value) return;
    proposing.value = true;
    try {
        await session.ensureSession();
        const cssStr = serializePickerColor(currentPhysicalColor.value);
        // OD-7: the key form the field reads back ("Daraksha Rose" →
        // `daraksha-rose`) — the API's name schema refuses the spaced form.
        const name = normalizeColorNameKey(proposedName.value);
        await proposeColorName(name, cssStr);
        proposedName.value = "";
        // UIA-V-12: the parent owns the toolbar mode, so the success is a
        // signal, not a local repaint — writing the colour string into the
        // propose-mode field is what left "lab(...)" sitting in the name slot.
        // The mode watch below repaints the colour when the parent leaves
        // propose.
        emit("proposed", name);
    } catch (e: any) {
        console.warn("[ColorInput] Failed to propose name:", e?.message);
    } finally {
        proposing.value = false;
    }
}

// Switch content when entering/exiting propose mode
const modeTransition = ref(false);

watch(() => proposeMode, (propose) => {
    if (!inputColorRef.value) return;
    // Flash animation
    modeTransition.value = true;
    setTimeout(() => { modeTransition.value = false; }, 300);

    if (propose) {
        proposedName.value = "";
        inputColorRef.value.innerText = "";
        inputColorRef.value.setAttribute("data-placeholder", "propose a name...");
        requestAnimationFrame(() => inputColorRef.value?.focus());
    } else {
        inputColorRef.value.removeAttribute("data-placeholder");
        inputColorRef.value.innerText = formatCssCaption(formattedCurrentColor.value);
    }
});

// Sync displayed text when not focused (only in color mode).
// X.W12U.p (W12U.md addendum (c) 3): this is the dock seat a colour drag
// re-renders on every input. An `innerText` write REPLACES the text node — a
// childList mutation inside the dock run, which glass's `useDockRun` roving
// MutationObserver answers with a `syncRoving` pass each input. The caption is
// therefore painted at most once per frame (latest text wins) and in place on
// the existing text node (a characterData write: no node churn, no roving pass).
let captionFrame: number | null = null;
const paintCaption = () => {
    captionFrame = null;
    const el = inputColorRef.value;
    if (proposeMode || inputIsFocused.value || !el) return;
    const text = formatCssCaption(formattedCurrentColor.value);
    const node = el.firstChild;
    if (node instanceof Text && node === el.lastChild) {
        if (node.data !== text) node.data = text;
    } else {
        el.textContent = text;
    }
};
watch(formattedCurrentColor, () => {
    if (captionFrame === null) captionFrame = requestAnimationFrame(paintCaption);
});
onBeforeUnmount(() => {
    if (captionFrame !== null) cancelAnimationFrame(captionFrame);
});

onMounted(() => {
    if (inputColorRef.value) {
        inputColorRef.value.innerText = formatCssCaption(formattedCurrentColor.value);
    }
});

defineExpose({
    focus: () => inputColorRef.value?.focus(),
    inputIsFocused,
    copyAndSetInputColor,
    onSubmitColor,
    submitProposedName,
});
</script>

<style scoped>
@reference "../../styles/foundation.css";

/* UIA-V-9 · V-79 · A2-VA-X-13: the field has an inline-size contract. The span
 * is content-sized (nowrap), so the face's min-content was the typed text: the
 * dock grew to it on every keystroke (a 50 px stub when empty) and, below sm,
 * pushed Back and the arm toggle out of the aperture. Size containment on the
 * inline axis takes the text out of the measure, and the face states its own
 * width: 40% of the viewport between an 8rem floor and a 14rem cap — at 360 it
 * leaves Back, both separators and the arm toggle inside the dock; at 1440 it
 * is the cap. The text ellipsizes inside a width that no keystroke moves. */
.color-input-face {
    contain: inline-size;
    inline-size: clamp(8rem, 40vw, 14rem);
    /* X.W12U.m2 · A2-VA-X-13: the inline action (Apply / Propose) takes the
     * control floor the slug cluster's seats take (SlugEditLayer.vue): glass's
     * `--control-floor` is 0px at :root and `--touch-target` (44 px) under
     * `(pointer: coarse)`, so it is 24 px fine · 44 px coarse. */
    --input-action-size: max(1.5rem, var(--control-floor));
}

/* OD19 C3-V-02: the field is a dock control, so its block size is the dock's
 * control size (glass `--dock-control-size`, the 40 px row the other seats
 * take), not its text's line box plus `py-2` and the border: that measured
 * 46 px at 1440 and 42 px at 390, and since this face shares the dock-layer
 * grid the dock grew on the first Tools visit and never came back to 40.
 * `align-content` centres the one line inside that box. */
.color-field {
    block-size: var(--dock-control-size);
    border-color: var(--input);
    transition:
        border-color var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}
/* OD-9: the box is the row (`.color-field`); the text run fills what the
 * crown and the arrow leave, stretched to the row so its whole height takes
 * the caret, and ends in an ellipsis — nothing fades the box. */
.color-input {
    align-self: stretch;
    align-content: center;
}
/* X·§0ht (c) — WHILE EDITED, THE RUN SCROLLS TO ITS CARET; IT NEVER ELIDES.
 * Chrome computes the ellipsis at the box's end in unscrolled coordinates and
 * then applies the edit scroll, so a focused run longer than the field (the
 * caret at its end) painted only that "…", pushed to the start, over an empty
 * box: at 390 "zzqq-not-a-colour" read as "…". Focused, the overflow clips
 * and the field scrolls to the caret, so the user sees what they typed; at
 * rest the caption ellipsizes from its start (onInputBlur). */
.color-input:focus {
    text-overflow: clip;
}

.color-input-error {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--destructive) 25%, transparent);
}

/* X.W12.e: input-mode-flash and crown-appear live in styles/animations.css
 * (moved, never deleted). crown-appear is bound from an INLINE style, which
 * a scoped (hash-renamed) keyframe could never match — global is its home. */
.color-input-mode-flash {
    animation: input-mode-flash var(--duration-slow) var(--ease-decelerate);
}

.color-input:empty[data-placeholder]::before {
    content: attr(data-placeholder);
    color: var(--muted-foreground);
    pointer-events: none;
}

/* T.W5-R5 (T-14 / D7): the bespoke transform-on-bezier hover/press recipe
 * (scale 1.1/0.95 composed into `transform` @ --duration-fast --ease-standard
 * — the F3 spatial-on-bezier stray) stays RETIRED. The producer
 * `btn-interactive` atom it moved onto left glass at 490cc46e and its class is
 * deleted (X.W8.d, W5-BTN-INTERACTIVE-DEAD; the motion question rides O-52
 * R-2). This block keeps ONLY the seat geometry. */
.send-btn {
    flex: none;
    margin-inline-end: 0.25rem;
    display: grid;
    place-items: center;
    min-inline-size: var(--input-action-size);
    min-block-size: var(--input-action-size);
    padding: 0.25rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
}
.send-btn:disabled {
    cursor: not-allowed;
}

/* OD-8: anchored under the field's bottom centre (`badgeAnchor`), outside
 * the text run and the Apply arrow, at the tooltip tier (it is the field's
 * floating status, above the dock and the pane beneath it). OD-11: placement
 * only — the face is glass's Badge (tone destructive, size sm). */
.error-badge {
    position: fixed;
    left: var(--anchor-cx);
    top: calc(var(--anchor-bottom) + 0.375rem);
    transform: translateX(-50%);
    z-index: var(--z-tooltip);
    pointer-events: none;
    /* vj-celebrate geometry: the badge rests at translateX(-50%), so the
       from-state keeps that x and drops in from just under the field (a pop
       out of the field, no sideways jump). */
    --vj-celebrate-x: -50%;
    --vj-celebrate-y: -0.25rem;
    --vj-celebrate-scale: 0.85;
}
</style>
