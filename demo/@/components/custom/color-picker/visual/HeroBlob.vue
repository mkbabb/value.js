<template>
    <!-- Explicit root: the caller's class (the pane slot's corner-break
         anchor) lands here, never on the renderless TooltipProvider.
         pointer-events-none: the producer's F9.R8 pointer shaping makes the
         SDF-shaped `.goo-blob-hit` child the ONLY interactive surface (its
         explicit pointer-events:auto re-enables under this none) — the
         wrapper square must never re-intercept a sibling-card click in the
         corner-break overlap strip (the seed's (770,150) interception,
         discharged by the producer's clip-path hit layer). -->
    <div class="pointer-events-none">
        <TooltipProvider :skip-delay-duration="0" :delay-duration="100">
            <Tooltip>
                <TooltipTrigger as-child>
                    <!-- W6-4 (S.W6): the FOOTPRINT is the caller's law — the
                         pane slot's anchor class sets `--blob-fp` (the
                         corner-break placement law in ColorPicker.vue); the
                         blob only consumes it. No self-owned width rungs —
                         Q7 full presence means the SAME consume at every
                         viewport, sized by the slot. -->
                    <!-- T.W4-5 — the RELEASE beat (t-blob-hero F-6/§3): the
                         missing @mouseleave lands — hover-out returns the
                         mood to the autonomic idle arc and re-arms the park
                         countdown, so the park can never embalm a mid-smear
                         hover pose. The park TRIGGER stays wall-clock until
                         P6's `settled` seam ships (BOOKED — never a demo
                         guess at silhouette energy). -->
                    <GooBlob
                        ref="gooBlobRef"
                        :color="cssColorOpaque"
                        :config="heroConfig"
                        :paused="blobPaused"
                        class="w-(--blob-fp)"
                        @click="onBlobClick"
                        @mouseenter="onBlobHover"
                        @mouseleave="onBlobLeave"
                        @pointermove="noteBlobActivity"
                    />
                </TooltipTrigger>
                <!-- T.W4-5 — the tooltip re-seats BELOW the bead, into the
                     card region (t-blob-hero §3 Celebration: it used to pop
                     upward into the dock band). -->
                <TooltipContent side="bottom" align="end" class="fira-code">
                    {{ denormalizedCurrentColor.value.toFormattedString() }}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, onScopeDispose, ref, shallowRef, useTemplateRef, watch } from "vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { GooBlob, BLOB_CONFIG_KEY } from "@mkbabb/glass-ui/goo-blob";
import type { BlobConfig } from "@mkbabb/glass-ui/goo-blob";
import { cssToOklch, deriveBlobPalette, oklchStopToHex } from "@mkbabb/glass-ui/color";
import type { OklchStop } from "@mkbabb/glass-ui/color";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { clamp } from "@mkbabb/value.js/math";
import { COLOR_MODEL_KEY, INK_AMBIENT_KEY } from "@composables/color/keys";
import { resolveSurfaceLightnessLive } from "@composables/color/useContrastSafeColor";

// Thin consumer of glass-ui's GooBlob (the demo half of W6-4 — consume/config/
// placement ONLY; the engine is the producer's, genesis brief §3.0). The
// component owns its own autonomic mood arc; HeroBlob binds the REAL APP
// MOMENTS the picker UX cares about (the W6-4 mood-FSM row):
//   scrub → excited   (a run of rapid colour changes — the user is scrubbing)
//   save  → happy drip (a colour lands in the palette — pulse() is the drip)
//   click → happy + nudge (click = copy; the celebratory bounce)
//   hover → curious
//   idle  → sleepy-as-contained-pose (the W3-3 park freezes the SLEEPY frame,
//           so the parked blob reads as a resting creature, not a paused video)
// PRM: no demo wiring — the producer substrate renders ONE static frame and
// parks itself under prefers-reduced-motion (seed w6-blob-redress §d-5); the
// idle-gate + mood writes below are harmless no-ops on that parked substrate.

const { cssColorOpaque, cssColorOpaqueFrame, denormalizedCurrentColor, savedColorStrings } =
    inject(COLOR_MODEL_KEY)!;

const emit = defineEmits<{ click: [] }>();

const gooBlobRef = useTemplateRef<InstanceType<typeof GooBlob>>("gooBlobRef");

// --- W6-4: the HERO config register (the consumer contract, genesis §3.0) ---
// The app-wide 8-atom config (provided by useAtmosphere via BLOB_CONFIG_KEY)
// stays the ONE base — BlobPane's live tuning flows through untouched. The
// hero OVERLAYS its register through the config PROP (the producer's own
// `config ?? injectedConfig` seam; GooBlob's liveConfig() re-reads the prop, so
// the fresh computed object is exactly the wake-repaint shape the producer
// built for — glass-ui GooBlob.vue AY.W-BLOB-CONFIG D1).
const appBlobConfig = inject(BLOB_CONFIG_KEY)!;

// The lg rung (width-only — the quality ladder cares about device scale, not
// the X6 aspect law).
const { matches: isLgViewport } = useBreakpoint("(min-width: 1024px)");

// The picked colour made flesh, with the RAMP CEILING TRACKING THE PICKED C
// (W6-4: the flat 0.16 ceiling literally cannot show the advertised ink — a
// C 0.23 pick now derives a C 0.23 ramp; 0.16 stays as the non-neon FLOOR for
// muted seeds, and the producer's gamut-map still bounds the top). Derives on
// the rAF-COALESCED colour (the W3-1 discipline — one derive per frame under a
// 60×/s scrub), seeded from the app config so the first frame has a ramp.
const heroStops = shallowRef<string[]>([...appBlobConfig.color.paletteStops]);

// --- T.W4-5: THE INK FLOOR (D8 · t-blob-hero F-4) --------------------------
// |ΔL(bead body, card plate)| ≥ INK_FLOOR — the figure-ground collapse cure
// (bead, field, and plate all derive from ONE seed; without a floor a pink
// bead sits on a pink plate). CLOSED-FORM inside the 12ms drag headroom
// (PI-3 — this runs in the exact rAF-coalesced fan-out drag-frame-budget
// measures; an iterative solve here is forbidden): one referent read (the
// scheme/epoch-CACHED tier probe — never a per-frame style recalc), one mean,
// one shift, applied uniformly so the ramp's internal spread survives.
// The floor value is the RULED default 0.15 ∈ [0.12, 0.20] OKLab L (M-9;
// owner eye-judge inside the bracket at W8). The producer F9.R1
// `lightnessFloor` knob replaces this at the W7 adopt (BOOKED — the bracket
// is its sizing spec).
const INK_FLOOR = 0.15;
const { isDark } = useGlobalDark();
const inkAmbient = inject(INK_AMBIENT_KEY, null);

function floorStops(stops: OklchStop[]): OklchStop[] {
    const ambient = inkAmbient?.value ?? 0.5;
    const plateL = resolveSurfaceLightnessLive("resting", ambient, isDark.value);
    const meanL = stops.reduce((s, x) => s + x.L, 0) / stops.length;
    const delta = meanL - plateL;
    if (Math.abs(delta) >= INK_FLOOR) return stops;
    // Push AWAY from the plate on the side the ramp already leans; flip if
    // that side has no headroom (closed-form — two branches, zero iteration).
    let dir = delta >= 0 ? 1 : -1;
    const need = INK_FLOOR - Math.abs(delta);
    const headroom = dir === 1 ? 0.98 - meanL : meanL - 0.02;
    if (headroom < need) dir = -dir;
    const push = dir * (INK_FLOOR - dir * delta);
    return stops.map((s) => ({ ...s, L: clamp(s.L + push, 0.02, 0.98) }));
}

watch(
    cssColorOpaqueFrame,
    (css) => {
        try {
            const seed = cssToOklch(css); // throws iff un-parseable
            heroStops.value = floorStops(
                deriveBlobPalette(css, {
                    stopCount: 4,
                    harmony: "analogous",
                    chromaCeiling: Math.max(0.16, seed.C),
                }),
            ).map(oklchStopToHex);
        } catch {
            // A transient un-parseable colour string leaves the last good ramp.
        }
    },
    { immediate: true },
);

const heroConfig = computed<BlobConfig>(() => ({
    ...appBlobConfig,
    // The HERO geometry register (seed w6-blob-redress §What-was-built): the
    // shipped default hides the satellite show (orbitRadius 0.17 < bodyRadius
    // 0.22 — centers orbit INSIDE the skin, genesis §1.3-4). Widened orbit +
    // grown body = the visible-bead/satellite ceiling the CONSUMER can reach
    // (~92px bead at the 11rem footprint; ≥96px + ≥2 detached beads at rest
    // need the producer L5 HERO preset — the recorded producer-gap row).
    // RETIRES to the producer HERO preset at the S.W8 5.0.0 adopt.
    geometry: {
        ...appBlobConfig.geometry,
        bodyRadius: 0.26,
        orbitRadius: 0.4,
        satelliteRadius: 0.09,
        eccentricity: 0.03,
    },
    color: { ...appBlobConfig.color, paletteStops: heroStops.value },
    // The <lg GL-lifecycle half of Q7 full presence (DESIGNED, not toggled):
    // phones ship DPR ≈ 3 and every mainstream mobile GPU is fill-rate bound
    // (genesis §2.4) — the hand-scale bead takes the producer's own half-res
    // quality rung below lg (visually free at a ~67px bead; the producer's
    // DPR ≤ 2 clamp still applies above it). lg+ keeps the app config's rung.
    quality: isLgViewport.value ? appBlobConfig.quality : "half",
}));

// --- W3-3 (S.W3): blob idle-gate (the demo half) + the W6-4 sleepy pose ---
// The blob's WebGL render loop costs ~7ms EVERY frame it is mounted, even fully
// idle — the picker's default-view floor sits at 54fps vs the blob-off 85fps
// (perf-transitions P0-2). We drive the renderer's EXISTING `paused` seam (the
// `v-model:paused` prop → the substrate's `manual` suspend) after N ms with no
// colour or pointer activity; the producer's own colour/paletteStops wake
// watchers repaint the parked blob on a colour change (single-frame repaint),
// and pointer activity resumes the live loop. The producer per-frame CPU
// profile is letter L5 — this is the demo half ONLY, no ../glass-ui patch.
//
// W6-4 (idle → sleepy-as-contained-pose): at the idle threshold the blob is
// first put to SLEEP (the mood FSM's contained rest pose), then the park
// freezes that frame SLEEPY_POSE_MS later — the parked hero reads as a
// creature at rest, never a paused video.
//
// N is the idle threshold. The §6.1 idle-budget e2e specs' sampling windows
// MUST exceed the FULL park latency (N + SLEEPY_POSE_MS = 2700ms):
// webgl-goo-blob-idle.spec.ts + perf/idle-frame-budget.spec.ts mirror N=2000
// and wait N+1500ms (= 3500ms) before sampling — 800ms of slack over the park
// completion. Keep N and SLEEPY_POSE_MS inside that contract.
const BLOB_IDLE_MS = 2000;
const SLEEPY_POSE_MS = 700;
const blobPaused = ref(false);
let idleTimer: ReturnType<typeof setTimeout> | undefined;
let poseTimer: ReturnType<typeof setTimeout> | undefined;
function noteBlobActivity() {
    blobPaused.value = false; // resume the live loop under interaction
    clearTimeout(idleTimer);
    clearTimeout(poseTimer);
    idleTimer = setTimeout(() => {
        gooBlobRef.value?.setMood("sleepy"); // the contained rest pose…
        poseTimer = setTimeout(() => {
            blobPaused.value = true; // …then park, freezing the sleepy frame
        }, SLEEPY_POSE_MS);
    }, BLOB_IDLE_MS);
}
onScopeDispose(() => {
    clearTimeout(idleTimer);
    clearTimeout(poseTimer);
});

// --- W6-4: scrub → excited ---
// A colour change is activity (keeps the blob live + re-arms the idle park);
// a RUN of changes inside the window is a SCRUB — the moment the picker is
// being played like an instrument — and reads as excitement. Re-fire is
// throttled so a long drag lands one mood kick, not a mood flood (the
// producer's autonomic arc settles it back down on its own). `immediate`
// arms the first idle countdown at mount, so an untouched picker parks.
const SCRUB_WINDOW_MS = 700;
const SCRUB_CHANGES = 5;
const SCRUB_REFIRE_MS = 1600;
let changeTimes: number[] = [];
let lastScrubFire = 0;
watch(
    cssColorOpaque,
    () => {
        noteBlobActivity();
        const now = performance.now();
        changeTimes.push(now);
        changeTimes = changeTimes.filter((t) => now - t <= SCRUB_WINDOW_MS);
        if (
            changeTimes.length >= SCRUB_CHANGES &&
            now - lastScrubFire > SCRUB_REFIRE_MS
        ) {
            lastScrubFire = now;
            gooBlobRef.value?.setMood("excited");
        }
    },
    { immediate: true },
);

// --- W6-4: save → happy drip ---
// A colour landing in the palette is the picker's save moment — the hero
// celebrates with the happy mood + a pulse (the drip). Length-increase only:
// removals/clears are not celebrations.
watch(
    () => savedColorStrings.value.length,
    (n, prev) => {
        if (n > prev) {
            noteBlobActivity(); // wake the parked loop so the drip renders
            gooBlobRef.value?.setMood("happy");
            gooBlobRef.value?.pulse();
        }
    },
);

function onBlobHover() {
    noteBlobActivity();
    gooBlobRef.value?.setMood("curious");
}

// T.W4-5 — the RELEASE beat (F-6's missing half): hover-out hands the body
// back to the autonomic arc (idle — the engine settles itself) and re-arms
// the park countdown, so the freeze can never race a mid-smear hover pose.
function onBlobLeave() {
    noteBlobActivity();
    gooBlobRef.value?.setMood("idle");
}

function onBlobClick() {
    noteBlobActivity();
    emit("click");
    gooBlobRef.value?.setMood("happy");
    gooBlobRef.value?.nudge();
}

function nudgeSatellites() {
    gooBlobRef.value?.nudge();
}

defineExpose({ nudgeSatellites });
</script>
