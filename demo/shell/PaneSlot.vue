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
// TRANSITION MODE — the <Transition> below is the DEFAULT (simultaneous) mode,
// NOT `mode="out-in"`. Under `vite` DEV, Vue 3.5's out-in machinery fails to
// re-mount the incoming pane once the outgoing pane's leave transition has
// completed: the internal `afterLeave → instance.update()` re-render does not
// fire, so the slot is stranded on a bare comment placeholder forever (the
// incoming component's setup — even a *synchronous* one — is never invoked).
// The production build schedules the same handoff correctly, so the defect was
// dev-only and silent (R.W3 close blocker; see docs/tranches/R/audit/
// R.W3-visual-runtime/DELTA.md). The default mode mounts the incoming pane
// immediately and CROSS-FADES the two slides (the Lane-E space-switch intent),
// working identically in dev and build. The pane slots stay height-bounded
// (min-h-0 + --content-max-h), so the brief co-mount never jumps the layout.
//
// ── CORRECTIONS TO THE PARAGRAPH ABOVE (X.W5.a, fold W5F-05; the paragraph's
//    bytes stand because the D-1 coupled-architecture lock forbids deleting
//    this record before the out-in re-probe runs) ─────────────────────────────
//   (1) "CROSS-FADES" is FALSE: `animations.css` pins opacity at 1 on both
//       sides of the vj-enter family — its own comment says "travel, not a
//       fade". The two panes TRAVEL past each other; neither fades.
//   (2) "height-bounded (min-h-0 + --content-max-h)" is FALSE for the case it
//       is invoked to defend: `--content-max-h` caps `.pane-container`, not
//       this slot, so the co-mount it claims to bound is exactly the case the
//       token does not reach.
//   (3) "never jumps the layout" is FALSE: no `mode`, no `position:absolute`
//       on any leave override, and flex/block wrappers — so the default mode
//       leaves TWO in-flow panes in one ordinary box for the whole overlap.
//   (4) the retired claim that "a late async chunk's arrival lands through
//       `.overture-appear-*`" is IMPOSSIBLE: appear hooks are substituted only
//       while the instance is not yet mounted, so `@after-appear` can never
//       fire for a chunk that resolves later. That is why settlement is ALSO
//       state-checked below (gate A2's b3 arm).
// The three geometry corrections are recorded, not cured, here: the mode, the
// rAF mirror and the loading states move TOGETHER or not at all (the D-1
// ruling), and the re-probe that unlocks them is not this unit's.

import {
    nextTick,
    onBeforeUnmount,
    ref,
    shallowRef,
    watch,
    type Component,
} from "vue";
import { useRoute } from "vue-router";
import type { PaneRenderProps } from "./usePaneRouter";
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
     * W2-3 (T.W2) — the pane-slot APPEAR grammar (LS-4): first-mount (and a
     * late async chunk's arrival) lands through the shell's plate-land
     * family via the dedicated `.overture-appear-*` classes (App.vue owns
     * them; transform-only — the LCP reveal-only law). View swaps keep the
     * vj-enter family untouched; the two grammars never share classes.
     */
    appear?: boolean;
    /** The plate-land completion report. `null` when the settled pane's root is
     *  not a single element (a fragment root reports settlement without one). */
    onAppeared?: (el: Element | null) => void;
}>();

// W3-4 (S.W3 · pane-swap payload): the rendered triplet TRAILS the incoming
// props by one animation frame on a KEY change (a real pane swap), so the first
// post-click frame paints only the cheap container slide — the incoming pane's
// synchronous mount (the P1 long task, perf-transitions P1-1) lands on the NEXT
// frame, under cover of the enter transition instead of on the click frame.
// Same-key prop updates flow through LIVE (the active pane never lags its
// colour). The initial render and any swap with no enter animation mount
// immediately (no blank frame). Rapid A→B→C swaps coalesce — only the latest
// pane mounts. KEEP simultaneous mode (the fceed47 cure stands).
const liveComponent = shallowRef(component);
const liveKey = ref(componentKey);
const liveProps = shallowRef(componentProps);

let raf = 0;

function commit(key: string) {
    liveComponent.value = component;
    liveKey.value = key;
    liveProps.value = componentProps;
}

watch(
    () => componentKey,
    (key) => {
        cancelAnimationFrame(raf);
        if (!transitionName) {
            // No enter animation to cover a deferred mount — swap now.
            commit(key);
            return;
        }
        raf = requestAnimationFrame(() => commit(key));
    },
);

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
// Under the simultaneous mode the outgoing and incoming panes co-exist for the
// whole overlap, so without this the accessibility tree carries TWO live pane
// subtrees and sequential focus can land inside the one that is leaving.
// `inert` + `aria-hidden` on the leaving element makes the overlap
// single-voiced: an observer or a microtask sees exactly one ACTIVE subtree at
// every instant. The stamps are cleared on enter because a cancelled leave
// re-enters the same element.
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

onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>

<template>
    <Transition
        :name="transitionName"
        :appear="appear"
        appear-from-class="overture-appear-from"
        appear-active-class="overture-appear-active"
        appear-to-class="overture-appear-to"
        @before-enter="showEntering"
        @before-leave="hideLeaving"
        @after-appear="settleAppear"
    >
        <KeepAlive :max="max">
            <component
                :is="liveComponent"
                :key="liveKey"
                :ref="(el: unknown) => reportMount(el as TInstance | null)"
                v-bind="liveProps"
            />
        </KeepAlive>
    </Transition>
</template>
