<template>
    <!-- Explicit inert ornament root: the caller's anchor lands here and the
         fixed footprint never intercepts the card. Omitting pressLabel keeps
         the producer on its decorative canvas path—no button, focus target,
         pointer host, Tooltip, or duplicate Copy ownership. -->
    <!-- T.W4.5 R2 — @animationend: the caller's `.hero-blob-anchor` class
         (and with it the W2-4 `blob-emerge` beat) lands on THIS root, so the
         emerge pose's end fires here; onEmergeEnd re-measures the engine's
         backing store against the settled box (see the script block). -->
    <div class="pointer-events-none" aria-hidden="true" @animationend="onEmergeEnd">
        <!-- W6-4 (S.W6): the FOOTPRINT is the caller's law — the pane slot's
             anchor class sets `--blob-fp`; Blob only consumes it. -->
        <Blob
            ref="blobRef"
            :color="cssColorOpaque"
            :config="heroConfig"
            :paused="blobPaused"
            class="w-(--blob-fp)"
        />
    </div>
</template>

<script setup lang="ts">
import {
    computed,
    inject,
    onActivated,
    onScopeDispose,
    ref,
    shallowRef,
    useTemplateRef,
    watch,
} from "vue";
import { Blob, BLOB_CONFIG_KEY } from "@mkbabb/glass-ui/blob";
import type { BlobConfig } from "@mkbabb/glass-ui/blob";
import { cssToOklch, deriveBlobPalette, oklchStopToHex } from "@mkbabb/glass-ui/color";
import type { OklchStop } from "@mkbabb/glass-ui/color";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { clamp } from "@mkbabb/value.js/math";
import { COLOR_MODEL_KEY, INK_AMBIENT_KEY } from "@composables/color/keys";
import { resolveSurfaceLightnessLive } from "@composables/color/useContrastSafeColor";

// Thin consumer of glass-ui's Blob (the demo half of W6-4 — consume/config/
// placement ONLY; the engine is the producer's, genesis brief §3.0). The
// component owns its own autonomic mood arc; HeroBlob binds the noninteractive
// app moments the picker UX cares about (the W6-4 mood-FSM row):
//   scrub → excited   (a run of rapid colour changes — the user is scrubbing)
//   save  → happy drip (a colour lands in the palette — pulse() is the drip)
//   idle  → sleepy-as-contained-pose (the W3-3 park freezes the SLEEPY frame,
//           so the parked blob reads as a resting creature, not a paused video)
// PRM: no demo wiring — the producer substrate renders ONE static frame and
// parks itself under prefers-reduced-motion (seed w6-blob-redress §d-5); the
// idle-gate + mood writes below are harmless no-ops on that parked substrate.

const { cssColorOpaque, cssColorOpaqueFrame, savedColorStrings } = inject(COLOR_MODEL_KEY)!;

const blobRef = useTemplateRef<InstanceType<typeof Blob>>("blobRef");

// --- W6-4: the HERO config register (the consumer contract, genesis §3.0) ---
// The app-wide 8-atom config (provided by useAtmosphere via BLOB_CONFIG_KEY)
// stays the ONE base — BlobPane's live tuning flows through untouched. The
// hero OVERLAYS its register through the config PROP (the producer's own
// `config ?? injectedConfig` seam; Blob's liveConfig() re-reads the prop, so
// the fresh computed object is exactly the wake-repaint shape the producer
// built for — glass-ui Blob.vue AY.W-BLOB-CONFIG D1).
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

// The ONE ramp re-seed (the derive + floor + hex). Shared by the live colour
// watch and the KeepAlive re-activation cure (boot-B) so both write the SAME
// palette shape into `heroStops` — the wake path can never diverge from the
// live path.
function reseedHeroStops(css: string) {
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
}

watch(cssColorOpaqueFrame, (css) => reseedHeroStops(css), { immediate: true });

// --- WR-2 / T-49c: ARM THE SHIPPED FISSION REGISTER (the never-meatball cure) ---
// The producer ships BD.W-GOOBLOB-MERCURY-COLONY — the mood-gated satellite
// fission P6 asked for (`surface.fissionAmp`, useBlobSatellites.ts) — but
// `BLOB_CONFIG_DEFAULTS.surface.fissionAmp = 0` ("the calm default, never
// splits"), and the hero's register overlaid geometry/color/quality ONLY, so
// the whole fission branch was DEAD at the hero (the "meatball" the owner
// photographed — bonded orbit necks that never detach). Arming it is an
// A-class MECHANISM fix, not a taste knob.
//
// SIZED FOR THE CALM STATE: the effective amp is mood-coupled —
// `effFissionAmp = fissionAmp × (0.4 + 0.6·arousal)`, so the RESTING hero
// (sleepy, arousal ≈ 0) splits at fissionAmp × 0.4. The bracket the owner
// rules is fissionAmp ∈ [0.4, 0.8] (calm-effective ≈ [0.16, 0.32] → a split
// every few merge windows ← target → a busy colony). The LANDED DEFAULT is the
// mid of the bracket; the `settled` seam + the exported HERO preset stay
// PRODUCER (communiqué §1.4). See the P6-B1-kin fission-amp package bracket.
const HERO_FISSION_AMP = 0.6;

const heroConfig = computed<BlobConfig>(() => ({
    ...appBlobConfig,
    // The HERO geometry register (seed w6-blob-redress §What-was-built): the
    // shipped default hides the satellite show (orbitRadius 0.17 < bodyRadius
    // 0.22 — centers orbit INSIDE the skin, genesis §1.3-4). W29 changes only
    // bodyRadius: 0.325; the frozen orbit/satellite/eccentricity bytes preserve
    // the established morphology. The dual-engine alpha-component witness,
    // not the nominal 0.65 diameter, closes the rendered 0.66 ±0.015 contract.
    geometry: {
        ...appBlobConfig.geometry,
        bodyRadius: 0.325,
        orbitRadius: 0.4,
        satelliteRadius: 0.09,
        eccentricity: 0.03,
    },
    // WR-2 / T-49c — arm the fission register (sized calm; the mood coupling
    // scales it ×0.4 at rest). `...appBlobConfig.surface` keeps every other
    // shipped surface atom (Fresnel/iridescence/SSS/lit) untouched.
    surface: { ...appBlobConfig.surface, fissionAmp: HERO_FISSION_AMP },
    color: { ...appBlobConfig.color, paletteStops: heroStops.value },
    // The <lg GL-lifecycle half of Q7 full presence (DESIGNED, not toggled):
    // phones ship DPR ≈ 3 and every mainstream mobile GPU is fill-rate bound
    // (genesis §2.4) — the hand-scale bead takes the producer's own half-res
    // quality rung below lg (visually free at the ~73px floor; the producer's
    // DPR ≤ 2 clamp still applies above it). lg+ keeps the app config's rung.
    quality: isLgViewport.value ? appBlobConfig.quality : "half",
}));

// --- W3-3 (S.W3): blob idle-gate (the demo half) + the W6-4 sleepy pose ---
// The blob's WebGL render loop costs ~7ms EVERY frame it is mounted, even fully
// idle — the picker's default-view floor sits at 54fps vs the blob-off 85fps
// (perf-transitions P0-2). We drive the renderer's EXISTING `paused` seam (the
// `v-model:paused` prop → the substrate's `manual` suspend) after N ms with no
// colour or save activity; the producer's own colour/paletteStops wake
// watchers repaint the parked blob on a colour change (single-frame repaint),
// and those programmatic moments resume the live loop. The producer per-frame
// CPU profile is letter L5 — this is the demo half ONLY, no ../glass-ui patch.
//
// W6-4 (idle → sleepy-as-contained-pose): at the idle threshold the blob is
// first put to SLEEP (the mood FSM's contained rest pose), then the park
// freezes that frame SLEEPY_POSE_MS later — the parked hero reads as a
// creature at rest, never a paused video.
//
// N is the idle threshold. The §6.1 idle-budget e2e specs' sampling windows
// MUST exceed the FULL park latency (N + SLEEPY_POSE_MS): the four blob-park
// specs import the ONE shared contract (e2e/smoke/fixtures/blob-timing.ts),
// which mirrors N + SLEEPY_POSE_MS here and derives PARK_SETTLE_MS =
// N + SLEEPY_POSE_MS + 800ms slack. Keep N and SLEEPY_POSE_MS in lock-step
// with that fixture (a one-file edit with four call sites).
//
// WR-2 / T-49c — THE PARK RUNWAY EXTENSION: one fission BEAT is 5.2s
// (FISSION_BEAT_MS, glass-ui goo-blob constants); the former 2.7s park froze
// the resting colony mid-split (or before any split showed). SLEEPY_POSE_MS is
// extended so the FULL park latency (N + SLEEPY_POSE_MS = 5.3s) clears one
// fission beat — the sleepy colony breathes out at least one calm split before
// the frame freezes. The idle-CPU cost of the longer live window is the demo
// INTERIM; the producer `settled`/park-from-quiescence seam (GAP-L5, booked at
// the 5.0.0 adopt) restores the tight park by consulting the engine's
// quiescence read instead of the wall clock (t49-research §2.3).
const BLOB_IDLE_MS = 2000;
const SLEEPY_POSE_MS = 3300;
const blobPaused = ref(false);
let idleTimer: ReturnType<typeof setTimeout> | undefined;
let poseTimer: ReturnType<typeof setTimeout> | undefined;
function noteBlobActivity() {
    blobPaused.value = false; // resume the live loop for the new app moment
    clearTimeout(idleTimer);
    clearTimeout(poseTimer);
    idleTimer = setTimeout(() => {
        blobRef.value?.setMood("sleepy"); // the contained rest pose…
        poseTimer = setTimeout(() => {
            blobPaused.value = true; // …then park, freezing the sleepy frame
        }, SLEEPY_POSE_MS);
    }, BLOB_IDLE_MS);
}
onScopeDispose(() => {
    clearTimeout(idleTimer);
    clearTimeout(poseTimer);
});

// --- boot-B / §0.3: THE WAKE-GRAY CURE (the KeepAlive re-activation flash) ---
// The picker pane is KeepAlive-cached; navigating away parks the blob (or the
// engine parks itself when quiescent), and the deactivated subtree drops from
// paint. On RE-ACTIVATION (a Home-return swap) the parked engine wakes and
// repaints — and the mid-flight capture showed it re-enter GRAY through the
// swap window, re-inking to the live palette only at settle (the §0.3 "too
// gray" family made visible on every cached-pane return). The DEMO cure seats
// the correct state BEFORE the wake repaint: re-seed the ramp from the live
// colour (a fresh `heroStops` reference → the producer's paletteStops wake
// watcher repaints with the LIVE palette, never its default stops) and wake
// the loop (`noteBlobActivity` unparks + re-arms the park; `resume()` forces
// the engine awake in the same tick). If a gray frame survives this — the
// engine painting its default BEFORE reading the re-seeded prop — the root is
// PRODUCER (the P6 reveal/wake rider, PR-2 fence: no demo shader/engine fork).
onActivated(() => {
    reseedHeroStops(cssColorOpaqueFrame.value);
    noteBlobActivity();
    blobRef.value?.resume();
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
            blobRef.value?.setMood("excited");
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
            blobRef.value?.setMood("happy");
            blobRef.value?.pulse();
        }
    },
);

// --- T.W4.5 R2 — THE EMERGE RE-MEASURE (the T-30 boot-blur demo cure) ------
// The W2-4 `blob-emerge` pose scales the anchor from 0.35 while the engine
// arms: the substrate presizes its backing store from gBCR (the leaf sizer,
// BG.W-VIZ-RESIZE-ADOPT), so the bead's canvas boots at ~0.35× resolution —
// and the transform never fires the leaf ResizeObserver (layout box
// unchanged), so the idle park FREEZES the low-res frame (measured at dpr2:
// backing 126×126 for a 180.2px box; a wake re-measures to 360×360). The cure
// drives the producer's EXISTING re-measure seam — `resume()` re-measures via
// idempotent `resize()` on the was-suspended path — as a pause()/resume() pair
// at the emerge pose's animationend, sizing the backing against the settled
// (untransformed) box with one same-frame repaint. Name-filtered (the engine's own grammars
// compose inside this subtree); park-guarded so a parked blob is never woken
// by a beat's end. Under PRM the emerge never runs (no-preference-wrapped) and
// the engine arms against the untransformed box — no cure needed, none fires.
function onEmergeEnd(e: AnimationEvent) {
    if (e.animationName !== "blob-emerge") return;
    if (blobPaused.value) return;
    blobRef.value?.pause();
    blobRef.value?.resume();
}
</script>
