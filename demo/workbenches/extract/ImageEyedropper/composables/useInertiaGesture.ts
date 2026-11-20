import { ref, onBeforeUnmount, watch, type Ref } from "vue";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import { useRAFLoop } from "@mkbabb/glass-ui/motion-core";

export interface InertiaGestureOptions {
    /** Content dimensions (image native size) */
    contentSize: () => { width: number; height: number };
    /** Minimum zoom (defaults to fit-to-viewport * 0.5) */
    minZoom?: number;
    /** Maximum zoom */
    maxZoom?: number;
    /** Friction coefficient for inertia (0–1, higher = more friction, default 0.92) */
    friction?: number;
    /** Called on each pointer click/tap (no drag) with viewport-relative coords */
    onTap?: (rx: number, ry: number) => void;
    /** Called on each pointer hover (no buttons) with viewport-relative coords */
    onHover?: (rx: number, ry: number) => void;
    /**
     * color-40 N: when given, ONE FINGER SCRUBS. A touch's press, moves
     * and lift are reported here (viewport-relative) and it never pans; two
     * fingers pan and zoom, and a second finger landing cancels the scrub. A
     * mouse keeps hover, click and drag-to-pan.
     */
    onScrub?: (phase: "start" | "move" | "end" | "cancel", rx: number, ry: number) => void;
}

export function useInertiaGesture(
    elementRef: Ref<HTMLElement | null>,
    options: InertiaGestureOptions,
) {
    const panX = ref(0);
    const panY = ref(0);
    const zoom = ref(1);
    const gestureActive = ref(false);

    const maxZoom = options.maxZoom ?? 10;
    const friction = options.friction ?? 0.92;

    // PRM gate (the demo's standing prefers-reduced-motion discipline — no
    // ungated rAF): momentum coasting is decorative MOTION. Under reduced-motion
    // the inertia loop is not armed at all; the pan SNAPS to rest at the release
    // position instead of animating to a stop (the drag itself is direct
    // manipulation and stays live — only the post-release coast is skipped).
    const { matches: prefersReducedMotion } = useBreakpoint(
        "(prefers-reduced-motion: reduce)",
    );

    let fitZoom = 1;

    // --- Pointer tracking ---
    const pointers = new Map<number, { x: number; y: number }>();
    let isPanning = false;
    let hasMoved = false;
    /** A one-finger touch is scrubbing (never panning). */
    let scrubbing = false;
    let lastX = 0;
    let lastY = 0;

    // Pinch (incremental)
    let prevPinchDist = 0;
    let prevPinchMidX = 0;
    let prevPinchMidY = 0;

    // Velocity tracking for inertia
    let velocityX = 0;
    let velocityY = 0;
    let lastMoveTime = 0;

    // --- Helpers ---

    function getViewportRect() {
        return elementRef.value?.getBoundingClientRect() ?? null;
    }

    /**
     * The viewport's own layout size. The pan and zoom are in the viewport's
     * layout pixels, so they are fitted against its layout box, never its
     * drawn box: the dialog opens on a scale, and a fit read through that
     * transform left the photo short of the stage, or past it.
     */
    function layoutSize(el: HTMLElement) {
        return { width: el.clientWidth, height: el.clientHeight };
    }

    function clientToViewport(clientX: number, clientY: number) {
        const rect = getViewportRect();
        if (!rect) return null;
        return { rx: clientX - rect.left, ry: clientY - rect.top };
    }

    function clampPan() {
        const el = elementRef.value;
        if (!el) return;
        const rect = layoutSize(el);
        const { width: cw, height: ch } = options.contentSize();
        const scaledW = cw * zoom.value;
        const scaledH = ch * zoom.value;

        if (scaledW <= rect.width) {
            panX.value = (rect.width - scaledW) / 2;
        } else {
            panX.value = Math.max(rect.width - scaledW, Math.min(0, panX.value));
        }
        if (scaledH <= rect.height) {
            panY.value = (rect.height - scaledH) / 2;
        } else {
            panY.value = Math.max(rect.height - scaledH, Math.min(0, panY.value));
        }
    }

    function zoomAround(rx: number, ry: number, newZoom: number) {
        const old = zoom.value;
        zoom.value = newZoom;
        panX.value = rx - (rx - panX.value) * (newZoom / old);
        panY.value = ry - (ry - panY.value) * (newZoom / old);
        clampPan();
    }

    function minZoomValue() {
        return options.minZoom ?? fitZoom * 0.5;
    }

    // --- Inertia animation ---

    // W3-8 (S.W3 · RAF discipline, god-module §2.4): the momentum coast rides
    // glass-ui's `useRAFLoop` (`@mkbabb/glass-ui/motion-core`) instead of a
    // hand-rolled requestAnimationFrame chain — `pauseWhenHidden` freezes the
    // coast on a hidden/background tab (the §2.4 perf cost this migration cures)
    // and its frame-count timeline resumes cleanly. `respectReducedMotion` is
    // FALSE on the host: this composable owns the PRM decision in `startInertia`
    // (snap to rest, never coast), so the loop's own auto-pause must never
    // strand a half-glide mid-pan.
    const inertiaLoop = useRAFLoop(
        () => {
            if (Math.abs(velocityX) < 0.5 && Math.abs(velocityY) < 0.5) {
                velocityX = 0;
                velocityY = 0;
                inertiaLoop.stop();
                return;
            }
            panX.value += velocityX;
            panY.value += velocityY;
            velocityX *= friction;
            velocityY *= friction;
            clampPan();
        },
        { immediate: false, pauseWhenHidden: true, respectReducedMotion: false },
    );

    function startInertia() {
        inertiaLoop.stop();
        if (prefersReducedMotion.value) {
            // PRM: snap to rest — no coast loop. Zero the velocity so a later
            // resume does not inherit stale momentum.
            velocityX = 0;
            velocityY = 0;
            return;
        }
        // start() resets the host's frame/elapsed counters and arms delivery.
        inertiaLoop.start();
    }

    function stopInertia() {
        inertiaLoop.stop();
        velocityX = 0;
        velocityY = 0;
    }

    // --- Fit to viewport ---

    function fitToViewport() {
        const el = elementRef.value;
        if (!el) return;
        const rect = layoutSize(el);
        const { width: cw, height: ch } = options.contentSize();
        if (!cw || !ch || !rect.width || !rect.height) return;
        // S.W5-6 · F13: the plate is the event — fit fills the viewport in
        // BOTH directions (a small specimen scales UP, aspect preserved),
        // clamped to the gesture's own maxZoom. The former `…, 1)` cap left
        // small images floating small in a mostly-empty overlay.
        const fit = Math.min(rect.width / cw, rect.height / ch, maxZoom);
        fitZoom = fit;
        zoom.value = fit;
        panX.value = (rect.width - cw * fit) / 2;
        panY.value = (rect.height - ch * fit) / 2;
    }

    // --- Pointer events ---

    function onPointerDown(e: PointerEvent) {
        stopInertia();
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        gestureActive.value = true;

        if (pointers.size === 1) {
            isPanning = false;
            hasMoved = false;
            lastX = e.clientX;
            lastY = e.clientY;
            velocityX = 0;
            velocityY = 0;
            lastMoveTime = performance.now();
            scrubbing = options.onScrub !== undefined && e.pointerType === "touch";
            if (scrubbing) {
                const vp = clientToViewport(e.clientX, e.clientY);
                if (vp) options.onScrub?.("start", vp.rx, vp.ry);
            }
        } else if (pointers.size === 2) {
            if (scrubbing) {
                // A second finger: the scrub is dropped, the two pan and zoom.
                scrubbing = false;
                options.onScrub?.("cancel", 0, 0);
            }
            isPanning = true;
            hasMoved = true;
            const [p0, p1] = [...pointers.values()];
            if (!p0 || !p1) return;
            prevPinchDist = Math.hypot(p1.x - p0.x, p1.y - p0.y);
            const mid = clientToViewport(
                (p0.x + p1.x) / 2,
                (p0.y + p1.y) / 2,
            );
            if (mid) {
                prevPinchMidX = mid.rx;
                prevPinchMidY = mid.ry;
            }
        }
    }

    function onPointerMove(e: PointerEvent) {
        if (!pointers.has(e.pointerId)) {
            // Hover (no buttons)
            const vp = clientToViewport(e.clientX, e.clientY);
            if (vp) options.onHover?.(vp.rx, vp.ry);
            return;
        }

        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const now = performance.now();

        if (pointers.size === 2) {
            // Pinch zoom + pan (incremental)
            const [p0, p1] = [...pointers.values()];
            if (!p0 || !p1) return;
            const dist = Math.hypot(p1.x - p0.x, p1.y - p0.y);
            const mid = clientToViewport(
                (p0.x + p1.x) / 2,
                (p0.y + p1.y) / 2,
            );
            if (!mid) return;

            const scaleFactor = dist / prevPinchDist;
            const newZoom = Math.min(maxZoom, Math.max(minZoomValue(), zoom.value * scaleFactor));
            zoomAround(mid.rx, mid.ry, newZoom);

            // Pan by midpoint drift
            panX.value += mid.rx - prevPinchMidX;
            panY.value += mid.ry - prevPinchMidY;
            clampPan();

            prevPinchDist = dist;
            prevPinchMidX = mid.rx;
            prevPinchMidY = mid.ry;
        } else if (pointers.size === 1) {
            if (scrubbing) {
                const vp = clientToViewport(e.clientX, e.clientY);
                if (vp) options.onScrub?.("move", vp.rx, vp.ry);
                lastMoveTime = now;
                return;
            }
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;

            if (!hasMoved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
                hasMoved = true;
                isPanning = true;
            }

            if (isPanning) {
                panX.value += dx;
                panY.value += dy;
                clampPan();

                // Track velocity for inertia
                const dt = now - lastMoveTime;
                if (dt > 0) {
                    const alpha = 0.4; // Smoothing factor
                    velocityX = alpha * (dx / dt * 16) + (1 - alpha) * velocityX;
                    velocityY = alpha * (dy / dt * 16) + (1 - alpha) * velocityY;
                }
            }

            lastX = e.clientX;
            lastY = e.clientY;
        }

        lastMoveTime = now;
    }

    function onPointerUp(e: PointerEvent) {
        const didMove = hasMoved;
        pointers.delete(e.pointerId);

        if (pointers.size === 0) {
            gestureActive.value = false;

            if (scrubbing) {
                scrubbing = false;
                const vp = clientToViewport(e.clientX, e.clientY);
                options.onScrub?.(
                    e.type === "pointercancel" ? "cancel" : "end",
                    vp?.rx ?? 0,
                    vp?.ry ?? 0,
                );
                isPanning = false;
                hasMoved = false;
                return;
            }

            if (isPanning && (Math.abs(velocityX) > 1 || Math.abs(velocityY) > 1)) {
                startInertia();
            }

            if (!didMove) {
                // Tap — notify consumer
                const vp = clientToViewport(e.clientX, e.clientY);
                if (vp) options.onTap?.(vp.rx, vp.ry);
            }

            isPanning = false;
            hasMoved = false;
        } else if (pointers.size === 1) {
            // One finger left after pinch — seamlessly continue as pan
            const remaining = [...pointers.values()][0];
            if (remaining) {
                lastX = remaining.x;
                lastY = remaining.y;
            }
            isPanning = true;
            velocityX = 0;
            velocityY = 0;
            lastMoveTime = performance.now();
        }
    }

    function onWheel(e: WheelEvent) {
        e.preventDefault();
        stopInertia();
        const vp = clientToViewport(e.clientX, e.clientY);
        if (!vp) return;

        if (e.ctrlKey) {
            // Trackpad pinch-to-zoom
            const factor = e.deltaY < 0 ? 1.06 : 1 / 1.06;
            const newZoom = Math.min(maxZoom, Math.max(minZoomValue(), zoom.value * factor));
            zoomAround(vp.rx, vp.ry, newZoom);
        } else {
            // Two-finger scroll → pan with momentum
            panX.value -= e.deltaX;
            panY.value -= e.deltaY;
            clampPan();

            // Feed wheel deltas into velocity for smooth coast
            velocityX = -e.deltaX * 0.3;
            velocityY = -e.deltaY * 0.3;
            startInertia();
        }
    }

    // --- Bind/unbind events ---

    let bound = false;

    function bind(el: HTMLElement) {
        if (bound) return;
        el.addEventListener("pointerdown", onPointerDown);
        el.addEventListener("pointermove", onPointerMove);
        el.addEventListener("pointerup", onPointerUp);
        el.addEventListener("pointercancel", onPointerUp);
        el.addEventListener("wheel", onWheel, { passive: false });
        bound = true;
    }

    function unbind(el: HTMLElement) {
        el.removeEventListener("pointerdown", onPointerDown);
        el.removeEventListener("pointermove", onPointerMove);
        el.removeEventListener("pointerup", onPointerUp);
        el.removeEventListener("pointercancel", onPointerUp);
        el.removeEventListener("wheel", onWheel);
        bound = false;
    }

    // Auto-bind when element ref resolves
    watch(elementRef, (el, oldEl) => {
        if (oldEl) unbind(oldEl);
        if (el) bind(el);
    }, { immediate: true });

    // ResizeObserver for refit
    let resizeObserver: ResizeObserver | null = null;
    watch(elementRef, (el, oldEl) => {
        resizeObserver?.disconnect();
        if (el) {
            resizeObserver = new ResizeObserver(() => fitToViewport());
            resizeObserver.observe(el);
        }
    }, { immediate: true });

    onBeforeUnmount(() => {
        if (elementRef.value) unbind(elementRef.value);
        resizeObserver?.disconnect();
        // useRAFLoop auto-disposes on scope teardown; this belt-and-suspenders
        // stop also halts an in-flight coast if the viewport unmounts mid-glide.
        inertiaLoop.stop();
    });

    return {
        panX,
        panY,
        zoom,
        gestureActive,
        fitToViewport,
        /** Convert client coords to viewport-relative coords */
        clientToViewport,
    };
}
