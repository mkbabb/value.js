<script setup lang="ts" generic="TInstance">
// PaneSlot — collapses the triple-nested Transition + KeepAlive + component:is
// pattern repeated three times in App.vue (Ae-3). Receives the resolved
// component, key, props, and transition name from the single route table that
// usePaneRouter provides so both mobile and desktop slots use one path.
//
// ── THE ACTIVATION CONTRACT (X.W5.a · gate N1 — read this FIRST) ────────────
//
// This slot owns the application's ONE `<KeepAlive>`. A cached subtree is
// DEACTIVATED, not unmounted: `runtime-core` returns into `deactivate` before
// any unmount hook runs, so **every `onBeforeUnmount` teardown inside a pane
// that this slot caches runs NEVER**. A pane that holds an OS or engine
// resource — a MediaStream track, a Worker, a `window` listener, a timer, a
// GPU sampler — therefore owes its teardown to `onDeactivated`, and its
// re-arm, if it needs one, to `onActivated`. `onBeforeUnmount` alone is a
// teardown that never fires; the cache makes it permanent, because the bound
// is a distinct-pane count and the panes that hold resources are never the
// ones evicted.
//
// The contract, stated so a pane can be written against it:
//   · onDeactivated — release everything a parked pane must not keep holding
//     (tracks stopped, workers terminated, listeners removed, timers cancelled);
//   · onActivated   — re-arm only what the pane needs to be operable again;
//     never silently re-acquire a device the user did not re-request;
//   · onBeforeUnmount — the same release, for the eviction and teardown paths.
//
// `onMount` is REQUIRED (X.W5.a · gate A4) and reports `(instance, key)`: the
// LIVE key of the pane that reported, never a key re-derived by the caller
// from a route-synchronous config. A function ref is re-invoked on every patch
// of the slot and a function OLD-ref is never retired, so the caller's own
// derivation filed the OUTGOING instance under the INCOMING pane's name for a
// measured 1275 ms window (fold W5F-02). Reporting the key with the instance
// makes that cross-wiring unrepresentable.
//
// ── THE STACKED DECK — default mode, and why (owner order 2026-11-05;
//    demo/DESIGN.md §5.7, the transition grammar) ────────────────────────
//
// The <Transition> below runs the DEFAULT mode: the leaving card and the
// rising card are co-mounted for one gesture, a stacked card swap. The
// leaving card is taken OUT OF FLOW (`animations.css`: absolute in the
// wrapper, inert, under or over the riser by direction), so the region is
// sized by the riser alone from the commit frame. That is what retired
// `out-in` (X.W5.d2 → OD19-V7, quoted in DESIGN.md §5.7): the serialised
// leave held the region EMPTY between the two panes and faded both, and the
// default mode it replaced had held TWO in-flow panes in one box (the region
// the SUM of the two, 7974 px = 7459 + 515 on `/` → `/gradient` at 1440,
// fold W5F-04). Out of flow, neither can happen: the region's block size is
// never 0 and never a sum (the U1 falsifier, per rAF).
//   · The D-1 coupled-architecture lock, rewritten to this contract: the rAF
//     mirror below and the per-pane loading/error plates still move together.
//     A plate is a leaver like any pane, so a plate → pane hop is the same
//     out-of-flow co-mount; the region is never empty while a chunk is in
//     flight, because the plate stays until the pane rises over it.
//     `PaneLoadingPlate` (after `usePaneRouter`'s load delay) and
//     `PaneErrorPlate` keep their EB-2 / W5F-53 cure-lock: the region's
//     boundary does not latch over a failed chunk's plate.
//   · The dev-root-fragment rule stands: a pane root must be ONE element with
//     no sibling comment (Vue's dev compiler keeps comments, and a fragment
//     root loses its transition hooks). Every pane in `usePaneRouter`'s table
//     is; the out-in re-probe's dev arm
//     (`docs/tranches/V/megatranche/workflows/gates/out-in-reprobe.mjs`) is
//     the stranding sentinel for both modes.
//   · Each commit runs through `flip` (`flipRegions`, App.vue): the regions
//     whose box the swap moved settle with the card.
//   · Appear hooks run only while the <Transition> is not yet mounted, so
//     `@after-appear` can never fire for an async chunk that resolves later.
//     Settlement is therefore ALSO state-checked (gate A2's b3 arm), never
//     inferred from the appear hook alone.

import {
    computed,
    nextTick,
    onBeforeUnmount,
    ref,
    shallowRef,
    watch,
    type Component,
} from "vue";
import { useRoute } from "vue-router";
import {
    PANE_LOAD_DELAY_MS,
    PANE_PLATE_PHASE,
    preloadPane,
    resolvedPane,
    type PaneRenderProps,
} from "./usePaneRouter";
import { VIEW_MAP } from "./viewSchema";

const {
    component,
    componentKey,
    componentProps,
    transitionName,
    max,
    onMount,
    appear = false,
    onAppeared,
    flip = (apply: () => void) => apply(),
} = defineProps<{
    /** The resolved async component for this slot. */
    component: Component | null;
    /** Stable key passed to <component> for keep-alive identity. */
    componentKey: string;
    /** v-bind spread onto the resolved component — one typed bag per pane. */
    componentProps?: PaneRenderProps;
    /** Transition name (empty string suppresses animation). */
    transitionName: string;
    /** KeepAlive cache size — DERIVED from the route table (`PANE_CACHE_MAX`). */
    max: number;
    /**
     * Mount report: the instance (or `null` on unmount) AND the live key of the
     * pane it belongs to. Required — the gate that proves the typed
     * registration bites deletes one argument of a `bindPane` call.
     */
    onMount: (instance: TInstance | null, key: string) => void;
    /**
     * W2-3 (T.W2) — the pane-slot APPEAR grammar (LS-4): the slot's FIRST
     * mount lands through the shell's plate-land family via the dedicated
     * `.overture-appear-*` classes (App.vue owns them; transform-only — the
     * LCP reveal-only law). A late async chunk's arrival does NOT: appear
     * hooks run only before the <Transition> mounts (see the header). View swaps keep the
     * vj-enter family untouched; the two grammars never share classes.
     */
    appear?: boolean;
    /** The plate-land completion report. `null` when the settled pane's root is
     *  not a single element (a fragment root reports settlement without one). */
    onAppeared?: (el: Element | null) => void;
    /** Runs a commit so the scene's regions can settle with it (`flipRegions`). */
    flip?: (apply: () => void) => unknown;
}>();

// X.W11.p4c (COHESION §0go.2(a), ESC-W11p4b-1) — THE FIRST DOCUMENT LOAD PAINTS
// FROM THE SHELL. Vue's SSR compiler wraps the children of any <Transition>
// that carries an `appear` attribute — static or bound, even bound to false —
// in `<template>` (compiler-ssr `ssrProcessTransition`), so that hydration can
// run the appear hooks on them. A `<template>`'s content is inert: the
// prerendered panes painted nothing until the app had loaded and hydrated, and
// the LCP was the whole boot graph (measured, `.p4b` act 8). The appear
// grammar is therefore bound only on the client. The SSR markup is the pane
// itself, hydrated in place with no appear hooks; its first-load arrival is the
// transform-only settle the overture sheet runs from the first frame
// (`overture-shell-settle`, boot/overture.css). A client-rendered first view
// still mounts through the full appear grammar below, and route changes keep
// the vj-enter family, both unchanged.
const appearGrammar = import.meta.env.SSR
    ? {}
    : {
          appear,
          appearFromClass: "overture-appear-from",
          appearActiveClass: "overture-appear-active",
          appearToClass: "overture-appear-to",
      };

// W3-4 (S.W3 · pane-swap payload): the rendered triplet TRAILS the incoming
// props by one animation frame on a KEY change (a real pane swap), so the
// click frame paints nothing but the input's own feedback, and rapid A→B→C
// swaps COALESCE into one leave and one mount (only the latest pane is
// committed), instead of queueing a leave per intermediate key.
// Same-key prop updates flow through LIVE (the active pane never lags its
// colour). The initial render and any swap with no enter animation commit
// immediately (no blank frame).
const liveComponent = shallowRef(component);
const liveKey = ref(componentKey);
const liveProps = shallowRef(componentProps);

// X.W5.d4 (COHESION §0az · ESC-W5d3-1, ruled (a)) — the Transition child is
// keyed on `(pane, resolved)`. A lazy pane renders as its PLATE PHASE (key
// `<pane>:plate`, never cached — `PANE_PLATE_PHASE` is the KeepAlive
// `exclude`) until `usePaneRouter`'s loader publishes the resolved pane, then
// as the pane itself (key `<pane>`, cached as before). The key change is a real
// swap: the plate leaves out of flow while the pane rises over it. The one
// thing that could never be allowed again is the old shape — the plate and the
// pane as two roots of ONE child under ONE key — because Vue's enter guard
// (`leavingVNodesCache[key] === vnode`) drops the pane's enter there. Only the
// resolved pane carries the mount report and the pane props: a plate is
// neither a registration target nor a settled plate (gate A2).
const livePane = computed(() =>
    liveComponent.value === null ? null : resolvedPane(liveComponent.value),
);

let raf = 0;
let hold = 0;

function commit(key: string) {
    liveComponent.value = component;
    liveKey.value = key;
    liveProps.value = componentProps;
}

function schedule(key: string) {
    if (!transitionName) {
        // No enter animation to cover a deferred mount — swap now.
        commit(key);
        return;
    }
    raf = requestAnimationFrame(() => void flip(() => commit(key)));
}

// X.W12.b (OA-25 — one enter per region): a swap to a lazy pane whose chunk
// is not yet resolved HOLDS for at most the plate's own `delay` while the
// chunk loads (`preloadPane`). Inside that window the swap commits straight
// to the resolved pane — one leave, one enter, the region travels once.
// Only a chunk slower than the window commits the plate phase, which then
// shows its plate exactly as X.W5.d4 keyed it (`(pane, resolved)`: the plate
// leaves as the pane rises), so the cold-navigation cure stands whole.
watch(
    () => componentKey,
    (key) => {
        cancelAnimationFrame(raf);
        window.clearTimeout(hold);
        const loading = component === null ? null : preloadPane(component);
        if (loading === null) {
            schedule(key);
            return;
        }
        let settled = false;
        const go = () => {
            if (settled || componentKey !== key) return;
            settled = true;
            window.clearTimeout(hold);
            schedule(key);
        };
        hold = window.setTimeout(go, PANE_LOAD_DELAY_MS);
        loading.then(go, go);
    },
);

// X.W12.b — the FIRST arrival of a lazy region lands through the overture's
// appear grammar, never through a plate. `<Transition appear>` voices only a
// child present when the Transition mounts, so the Transition mounts with the
// first RESOLVED pane; until then the plate phase renders bare beside it (its
// plate still shows after `delay` on a slow chunk) and leaves with no travel.
// Before (w12-motion census, W12-evidence/b/before): the boot's inspector
// region mounted as a plate phase, then its pane arrived on the pane-SWAP
// family (the off-canvas slide) — never landing beside the stage plate.
const arrived = ref(livePane.value !== null);
watch(livePane, (pane) => {
    if (pane !== null) arrived.value = true;
});

// Same-key prop updates stay live: while the rendered key matches the incoming
// key (i.e. NOT mid-swap), forward fresh props to the active pane every tick.
watch(
    () => componentProps,
    (p) => {
        if (componentKey === liveKey.value) liveProps.value = p;
    },
);

// ── Plate settlement: the event arm AND the state arm (gate A2) ─────────────
//
// `@after-appear` covers the pane that is already resolved when the slot first
// renders — today exactly one of the eleven, the statically imported picker.
// For the other ten the chunk resolves AFTER mount, the appear hooks are long
// gone, and the settlement report never fires: a deep link to any of those
// routes terminated the overture at b2 FOR THE SESSION (measured at this
// wave's open: marks [b0,b1,b2], terminal). So settlement is also read as a
// STATE — the slot's content is in the DOM and no finite, time-driven
// animation is still running on it — which is true whenever the plate has
// landed, however it got there. Reported ONCE per slot; the beat's own
// `noteLeftPlateSettled` is idempotent besides.
let settlementReported = false;

function settleAppear(el: Element | null) {
    if (settlementReported) return;
    settlementReported = true;
    const running = (el?.getAnimations?.({ subtree: true }) ?? []).filter((a) => {
        // TIME-DRIVEN FINITE animations only: an infinite or scroll-driven
        // ambient loop must never wedge the beat (the useDockArrival lesson).
        if (!(a.timeline instanceof DocumentTimeline)) return false;
        const timing = a.effect?.getTiming();
        return timing ? timing.iterations !== Infinity : true;
    });
    if (!running.length) {
        onAppeared?.(el);
        return;
    }
    void Promise.allSettled(running.map((a) => a.finished)).then(() =>
        onAppeared?.(el),
    );
}

/** The mount report, plus the state-checked settlement arm. */
function reportMount(instance: TInstance | null) {
    onMount(instance, liveKey.value);
    if (!appear || settlementReported || instance === null) return;
    const root = (instance as { $el?: unknown }).$el;
    const el = root instanceof Element ? root : null;
    // One frame past the mount flush, so the appear transition the shell just
    // started is observable through `getAnimations`.
    void nextTick(() => requestAnimationFrame(() => settleAppear(el)));
}

// ── The atomic-commit contract (gate N6) ───────────────────────────────────
//
// For the leave's whole duration the outgoing pane is still in the DOM, so
// without this sequential focus can land inside a pane the user has already
// left. `inert` + `aria-hidden` on the leaving element keeps the swap
// single-voiced: an observer or a microtask never sees the departing subtree
// as ACTIVE. The stamps are cleared on enter because a cancelled leave
// re-enters the same element (and a KeepAlive-cached pane re-enters later).
function hideLeaving(el: Element) {
    el.toggleAttribute("inert", true);
    el.setAttribute("aria-hidden", "true");
    el.setAttribute("data-scene-direction", sceneDirection);
}

function showEntering(el: Element) {
    el.toggleAttribute("inert", false);
    el.removeAttribute("aria-hidden");
    el.setAttribute("data-scene-direction", sceneDirection);
}

// ── The scene-direction token (X.W5.d · gate D3's direction arm) ───────────
//
// The `vj-enter` pane family is keyed on the region ROLE (`animations.css`),
// and a role alone cannot say which way the user moved: before this token the
// 390 column gave every swap the same travel, so forward and back were
// motion-identical (fold W5F-19 / NEW-DU-5). The direction is read from the
// route's position in the scene table's OWN order — `VIEW_MAP`'s key order, the
// order the dock lists the scenes in — never from a copy of it: a hop to a
// later scene is `forward`, to an earlier one `back`. It is taken on the route
// change itself (`flush: "sync"`), which precedes the key change this slot
// swaps on, and the hooks above stamp it on BOTH the entering and the leaving
// pane so the two travel as one gesture. A hop that does not move in the order
// keeps the last direction rather than inventing one.
const SCENE_ORDER: readonly string[] = Object.keys(VIEW_MAP);
const route = useRoute();
let sceneDirection: "forward" | "back" = "forward";

watch(
    () => route.name,
    (to, from) => {
        const delta =
            SCENE_ORDER.indexOf(String(to)) - SCENE_ORDER.indexOf(String(from));
        if (delta !== 0) sceneDirection = delta > 0 ? "forward" : "back";
    },
    { flush: "sync" },
);

onBeforeUnmount(() => {
    cancelAnimationFrame(raf);
    window.clearTimeout(hold);
});
</script>

<template>
    <Transition
        v-if="arrived"
        :name="transitionName"
        v-bind="appearGrammar"
        @before-enter="showEntering"
        @before-leave="hideLeaving"
        @after-appear="settleAppear"
    >
        <KeepAlive :max="max" :exclude="PANE_PLATE_PHASE">
            <component
                :is="livePane"
                v-if="livePane"
                :key="liveKey"
                :ref="(el: unknown) => reportMount(el as TInstance | null)"
                v-bind="liveProps"
            />
            <component :is="liveComponent" v-else :key="`${liveKey}:plate`" />
        </KeepAlive>
    </Transition>
    <component :is="liveComponent" v-else-if="liveComponent" :key="`${liveKey}:plate`" />
</template>
