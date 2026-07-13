<template>
    <!-- T.W4-4 — THE LETTER RAIL, a vertical micro-dock (D5). Lifted to its
         own SFC at the exact boundary the producer P5 letter-rail primitive
         will occupy (the BOOKED swap touches ONE file). The enclosure is
         THE SEAL RECIPE TURNED PORTRAIT (Dock.vue's die-rim recipe
         verbatim, stadium radius — never a bespoke ring class); items ride
         the dock-trigger state ladder; the ACTIVE seat is the WatercolorDot
         in the live color — the ONE live-color voice in the zone (ring says
         WHICH, dot-hue says LIVE, enclosure says NAVIGATION, letters speak
         INK). The chassis persists across space changes; only the letters
         re-key (N-2). -->
    <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Color channels"
        class="channel-rail self-stretch"
        :style="{ '--console-rest-ink': restInk }"
    >
        <div
            :key="animationKey"
            class="rail-letters h-full flex flex-col items-center justify-around stagger-children"
        >
            <TooltipProvider :delay-duration="300">
                <Tooltip v-for="component in components" :key="component">
                    <TooltipTrigger as-child>
                        <button
                            :ref="(el: any) => { if (el) railItemEls[component] = el as HTMLButtonElement }"
                            type="button"
                            role="tab"
                            :aria-selected="active === component"
                            :tabindex="railTabIndex(component)"
                            :aria-label="`${component} channel`"
                            class="channel-rail-item font-display text-subheading italic"
                            :style="active === component ? { color: activeInk } : undefined"
                            @click="emit('select', component)"
                            @keydown="onRailKeydown($event, component)"
                        >
                            <!-- The ONE active indicator: the WatercolorDot
                                 seat under the active glyph (the live-color
                                 voice; the aria-selected neutral pill is
                                 retired). T.W8-P1-R1 (LAND · A-class): the dot
                                 is seated inside a DEMO-OWNED positioned box —
                                 the producer's scoped `.watercolor-swatch`
                                 (position:relative, 0-2-0) defeated the flat
                                 `.rail-dot { position:absolute }` (0-1-0), so
                                 the dot rendered 11.6×0px and NOTHING painted
                                 (the active glyph then inked near-white off the
                                 never-painted fill). The seat carries the
                                 absolute box; the dot fills it 100% — NO
                                 producer property overridden, T-28 ABROGATE
                                 (no geometric ring on the dot) intact. -->
                            <span
                                v-if="active === component"
                                class="rail-dot-seat"
                                aria-hidden="true"
                            >
                                <WatercolorDot
                                    tag="div"
                                    :color="cssColorOpaque"
                                    class="rail-dot"
                                />
                            </span>
                            <span
                                class="rail-glyph"
                                :class="{ 'rail-glyph--alpha': component === 'alpha' }"
                            >{{ componentGlyph(component) }}</span>
                        </button>
                    </TooltipTrigger>
                    <!-- The anatomy popover re-seats at touch bands (t-mobile
                         F-5: side=left has no seat at 390); it is also the
                         static range's retirement home #1 (W4-3 — the About
                         card is #2). -->
                    <TooltipContent :side="isLgViewport ? 'left' : 'bottom'" class="max-w-56">
                        <p class="font-display text-small font-semibold">{{ componentDescription(component) }}</p>
                        <p class="fira-code text-mono-caption opacity-60 mt-0.5">{{ currentColorRanges[component] }}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import { contrastInkFor, resolveMutedInk } from "@composables/color/ink";
import {
    bumpProbeEpochOnMount,
    resolveSurfaceLightnessLive,
} from "@composables/color/useContrastSafeColor";
import { colorSpaceInfo } from "../../index";
import type { DisplayColorSpace } from "../../index";
import { COLOR_MODEL_KEY, INK_AMBIENT_KEY } from "@composables/color/keys";

const { components, active, animationKey } = defineProps<{
    /** The current space's shown channels (rail order = row order). */
    components: string[];
    /** The active channel (the WatercolorDot seat). */
    active: string | null;
    /** The rows' re-key counter — letters re-key WITH the rows (N-2). */
    animationKey: number;
}>();

const emit = defineEmits<{ select: [component: string] }>();

const { currentColorSpace, currentColorRanges, cssColorOpaque } =
    inject(COLOR_MODEL_KEY)!;

// The tooltip's honest seat flips at the touch band (t-mobile F-5).
const { matches: isLgViewport } = useBreakpoint("(min-width: 1024px)");

// --- THE INK SYSTEM (D5/D6 — the channel-color conceit is DEAD) -----------
// The letters SPEAK INK. Rest letters wear the certified de-emphasis rung
// against the VEIL's ground (T.W6.5-P · T-34: the console re-seat moved the
// D6 referent WITH the material — the well's closed-form dividend yields to
// the veil rung's live-probed quiet-α recipe composited over the resting
// plate); hover/active lift to full ink. Hue keeps living where it is
// honest — the ramps and the active dot.
const { isDark } = useGlobalDark();
const inkAmbient = inject(INK_AMBIENT_KEY, null);
// The live-instrument consumer contract (T.W6.5-P): the rail folds the
// surface referent into its own computed, so IT must register the mount-
// truth epoch bump — else its first (pre-style/detached) veil probe caches
// as undefined and the rest ink certifies against the static model forever.
bumpProbeEpochOnMount();
const restInk = computed(() =>
    resolveMutedInk(
        resolveSurfaceLightnessLive(
            "veil",
            inkAmbient?.value ?? 0.5,
            isDark.value,
        ),
        isDark.value,
    ),
);
// The active glyph sits ON the WatercolorDot's live fill — its ink derives
// from the FILL (the F-3 split's dependent guard: contrast-color, a pass by
// construction), never a fixed foreground over an arbitrary hue.
const activeInk = computed(
    () => contrastInkFor(cssColorOpaque.value) ?? "var(--foreground)",
);

// --- TRUE GLYPHS (N-1 — the A-collision dies) ------------------------------
// The column speaks each space's OWN notation: `L a b α` for lab (CIELAB's
// lowercase a/b), `L C h` for the cylindrical pair, two-glyph channels for
// ictcp/jzazbz, α for alpha EVERYWHERE. The lab exemplar is not a stamp:
// unlisted spaces fall to their canonical uppercase initial.
const SPACE_GLYPHS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
    lab: { l: "L", a: "a", b: "b" },
    oklab: { l: "L", a: "a", b: "b" },
    lch: { l: "L", c: "C", h: "h" },
    oklch: { l: "L", c: "C", h: "h" },
    ictcp: { i: "I", ct: "Cᴛ", cp: "Cᴘ" },
    jzazbz: { jz: "Jᴢ", az: "aᴢ", bz: "bᴢ" },
    kelvin: { kelvin: "K" },
};
function componentGlyph(component: string): string {
    if (component === "alpha") return "α";
    const glyph = SPACE_GLYPHS[currentColorSpace.value]?.[component];
    return glyph ?? component.charAt(0).toUpperCase();
}

// Component description from colorSpaceInfo for the tooltip.
function componentDescription(component: string): string {
    const space = currentColorSpace.value as DisplayColorSpace;
    const info = (colorSpaceInfo as any)[space];
    if (!info?.components) return component;
    const upper = component.charAt(0).toUpperCase();
    const match = info.components.find((c: string) =>
        c.startsWith(upper) || c.startsWith(component),
    );
    return match ?? component;
}

// --- Roving tabindex (WAI-ARIA tablist; verbatim from the pre-lift rail) ---
const railItemEls = ref<Record<string, HTMLButtonElement>>({});

function railTabIndex(component: string): number {
    const selected = active ?? components[0];
    return component === selected ? 0 : -1;
}

// Arrow-key navigation: Up/Down move along the vertical rail (with wrap),
// Home/End jump to the ends. Selecting a channel scrolls its slider into
// view and moves focus — the "selection follows focus" tablist idiom.
function onRailKeydown(e: KeyboardEvent, component: string) {
    const i = components.indexOf(component);
    if (i === -1) return;
    let next: string | undefined;
    switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
            next = components[(i + 1) % components.length];
            break;
        case "ArrowUp":
        case "ArrowLeft":
            next = components[(i - 1 + components.length) % components.length];
            break;
        case "Home":
            next = components[0];
            break;
        case "End":
            next = components[components.length - 1];
            break;
        default:
            return;
    }
    if (next === undefined) return;
    e.preventDefault();
    emit("select", next);
    railItemEls.value[next]?.focus();
}
</script>

<style>
/* ── THE LETTER RAIL RING (T.W4-4 · D5) ──────────────────────────────────
 * THE SEAL RECIPE TURNED PORTRAIT — Dock.vue's die-rim verbatim (1px
 * color-mix(in oklab, var(--accent-view) 60%, transparent), stadium
 * radius, 2px padding), the ONE navigation hue at its third scale (seal →
 * trigger → rail). NEVER a bespoke ring class; the enclosure's final
 * material is the P5 letter-rail primitive (BOOKED swap; T-28's register
 * law binds any future ring to the dot's own silhouette). Unscoped block
 * (the pre-lift convention — selectors are rail-unique). */
.channel-rail {
    border: 1px solid color-mix(in oklab, var(--accent-view) 60%, transparent);
    border-radius: var(--radius-pill);
    padding: 2px;
}

/* Rail items — the dock-trigger STATE LADDER (the producer's own tokens:
 * hover/press fills; the bespoke opacity/scale hover + the 8% selected pill
 * are retired). Letters speak INK: rest = the certified de-emphasis rung on
 * the veil (T.W6.5-P — the console's T-34 seat); hover + active lift to
 * full ink; the ACTIVE letter's ink derives from the WatercolorDot fill it
 * sits on (:style binding). */
.channel-rail-item {
    appearance: none;
    background: transparent;
    border: 0;
    position: relative;
    line-height: 1;
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-pill);
    cursor: pointer;
    color: var(--console-rest-ink, var(--muted-foreground));
    transition:
        color var(--duration-normal) var(--ease-standard),
        background-color var(--duration-normal) var(--ease-standard),
        /* T.W5-R5 (T-14 / D7): the only transform here is the :active press
         * scale — a SPATIAL press leg, so it rides `--spring-press` at the
         * spring's OWN clock (0.16s sub-200ms tap answer), never a bezier on
         * a generic clock. Effects legs above stay bezier (two-channel law). */
        transform var(--spring-press-duration) var(--spring-press);
}
.channel-rail-item:hover {
    color: var(--foreground);
    background-color: var(--dock-control-hover-bg);
}
.channel-rail-item:active {
    background-color: var(--dock-control-press-bg);
    transform: scale(0.96);
}
.channel-rail-item:focus-visible {
    /* The accent-aware house focus register — never a bespoke gray outline. */
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}

/* The ONE active indicator — the WatercolorDot seat under the active glyph
 * (the live-color voice; organic silhouette, per-instance filter).
 *
 * T.W8-P1-R1 (LAND · A-class — the seat was DEAD BY CASCADE): the positioned
 * box is a DEMO-OWNED wrapper (`.rail-dot-seat`), NOT the producer dot. The
 * producer's `.watercolor-swatch` ships `position: relative` (0-2-0 with its
 * data-v attr), which defeated a flat `.rail-dot { position: absolute }`
 * (0-1-0) → the dot computed `relative`, rendered 11.6×0px, painted nothing
 * (the `background-color` was correctly bound but had zero box). The seat now
 * owns the absolute geometry; the dot FILLS it (100%×100%), so no producer
 * property is overridden and the dot's own `position: relative` is honoured.
 * T-28's ABROGATE law holds — no geometric ring anywhere on the organic
 * silhouette. */
.rail-dot-seat {
    position: absolute;
    inset: -1px;
    z-index: 0;
    pointer-events: none;
    display: block;
}
.rail-dot {
    width: 100%;
    height: 100%;
}
.rail-glyph {
    position: relative;
    z-index: 1;
}

/* T.W8-P1-R2 (LAND · legibility/identity) — the α glyph is a Latin-`a` twin:
 * Fraunces carries no Greek, so U+03B1 falls back to the metric-compatible
 * serif and inks as a near-twin of the CIELAB `a*` glyph one row up (the rail
 * read `L a b a`). The LANDED default is a distinct styling rung: alpha inks
 * in the house MONO face (Fira Code ships a genuine, open Greek alpha) and
 * UPRIGHT, so it can never be confused with the italic Fraunces `a*` — alpha
 * is the transparency channel, not a color axis, and now reads as its own
 * token. The C-4 house-cut-face flag (a donor-Greek subset into the self-cut
 * Fraunces, or the P10 producer ask) rides this row into the package as the
 * far bracket pole — the owner has never seen a minted face named. */
.rail-glyph--alpha {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-style: normal;
}

/* THE TOUCH RUNG (t-mobile F-5) — ≥44px hits <lg via the producer's own
 * --dock-touch-target; hit areas grow, glyphs do NOT. */
@media (max-width: 1023px) {
    .channel-rail-item {
        min-height: var(--dock-touch-target, 2.75rem);
        min-width: calc(var(--dock-touch-target, 2.75rem) * 0.72);
    }
}
</style>
