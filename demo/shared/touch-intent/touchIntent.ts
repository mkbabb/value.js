/**
 * Touch intent: on a page that scrolls, up and down is the page's, sideways is
 * the control's, a tap sets, and the handle is always yours.
 *
 * A control that lands under a finger cannot know, at `pointerdown`, whether
 * the finger means it or means the page. Its CSS (`touch-action: pan-y`) hands
 * a vertical pan to the browser, on the compositor, from the first pixel; what
 * is left to decide is the press, since a slider (reka's) moves its value to
 * the finger at `pointerdown`. So a touch's press is held, in the capture
 * phase, until the finger has travelled `SLOP_PX`:
 * - sideways first: the press is replayed where the finger landed and the
 *   control tracks from there (state `drag`);
 * - vertical first: the page's; the press, its moves and its release never
 *   reach the control (the browser pans and cancels the pointer);
 * - a lift with no travel: a tap; the press is replayed, then the release.
 * A touch that starts on an `exempt` handle is the control's at once, in both
 * axes. A mouse or a pen is never held (`pointerType` is read per event).
 *
 * One listener serves many controls: with `match`, the root is a delegation
 * root (an app's document) and every control matching the selector is served
 * by it. Without `match`, the root is the control. An element that has its own
 * install (a control with its own wiring) is left to it by every delegation
 * root above it, and a press replayed by one install is never held by another.
 *
 * The state is presentation only, on the control: `data-touch-intent` is
 * `idle`, `held` (a touch is down and its direction is not known yet) or
 * `drag` (the control has the touch).
 *
 * The site's candidate for glass's Slider default (it retires `useTouchGate`'s
 * tap-to-arm); deleted here when glass ships the lock.
 */

/** Travel, in CSS px, before a touch's direction is read. */
export const SLOP_PX = 6;

export type TouchIntentState = "idle" | "held" | "drag";

/** What a replayed press stands for: the start of a drag, or a tap. */
export type TouchIntentKind = "drag" | "tap";

export interface TouchIntentOptions {
    /** The controls this root serves, by selector (delegation). Omitted, the root is the control. */
    match?: string;
    /** A handle inside a control: a touch that starts there is the control's at once, in both axes. */
    exempt?: string;
    /** A diagnostic hook (the picker's pointer debug log). */
    log?: (e: Event, tag: string) => void;
}

type HeldPress = {
    x: number;
    y: number;
    target: EventTarget;
    control: HTMLElement;
    init: PointerEventInit;
};

/** Presses replayed by any install, and what each stands for. */
const replays = new WeakMap<Event, TouchIntentKind>();
/** Elements with an install of their own (`match` omitted). */
const ownHosts = new WeakSet<Element>();

/**
 * A replayed press's kind (`drag` or `tap`), or `undefined` for a press that
 * came from the browser. A control reads it to tell a tap (the value glides
 * to the finger) from the start of a drag (the value follows the finger).
 */
export function touchIntentKind(e: Event): TouchIntentKind | undefined {
    return replays.get(e);
}

function setState(control: HTMLElement, state: TouchIntentState): void {
    if (control.dataset.touchIntent !== state) control.dataset.touchIntent = state;
}

function pressInit(e: PointerEvent): PointerEventInit {
    return {
        pointerId: e.pointerId,
        pointerType: e.pointerType,
        isPrimary: e.isPrimary,
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        button: e.button,
        buttons: e.buttons,
        width: e.width,
        height: e.height,
        pressure: e.pressure,
    };
}

/** Whether `node` sits inside an element with its own install, below `root`. */
function ownedBelow(node: Element, root: Document | HTMLElement): boolean {
    for (let n: Element | null = node; n && n !== root; n = n.parentElement) {
        if (ownHosts.has(n)) return true;
    }
    return false;
}

/**
 * Install the lock on `root`. Returns the cleanup.
 */
export function attachTouchIntent(
    root: Document | HTMLElement,
    options: TouchIntentOptions = {},
): () => void {
    const { match, exempt, log = () => {} } = options;
    const own = match === undefined && root instanceof HTMLElement ? root : null;
    if (own) {
        ownHosts.add(own);
        setState(own, "idle");
    }

    const held = new Map<number, HeldPress>();
    const refused = new Set<number>();
    /** Touches the control has (a drag, a handle): reset to idle on release. */
    const active = new Map<number, HTMLElement>();

    const controlOf = (target: EventTarget | null): HTMLElement | null => {
        if (!(target instanceof Element)) return null;
        if (own) return own;
        if (match === undefined) return null;
        const control = target.closest<HTMLElement>(match);
        if (!control || !root.contains(control)) return null;
        return ownedBelow(target, root) ? null : control;
    };

    const replay = (press: HeldPress, kind: TouchIntentKind) => {
        const down = new PointerEvent("pointerdown", {
            ...press.init,
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        replays.set(down, kind);
        press.target.dispatchEvent(down);
    };

    const onPointerDown = (e: PointerEvent) => {
        if (replays.has(e)) return;
        const control = controlOf(e.target);
        if (!control) return;
        log(e, "down");
        if (e.pointerType !== "touch") return;
        refused.delete(e.pointerId);
        const handle = exempt ? (e.target as Element).closest(exempt) : null;
        if (handle && control.contains(handle)) {
            // The handle: the control's at once, in both axes.
            active.set(e.pointerId, control);
            setState(control, "drag");
            return;
        }
        e.stopPropagation();
        held.set(e.pointerId, {
            x: e.clientX,
            y: e.clientY,
            target: e.target ?? control,
            control,
            init: pressInit(e),
        });
        setState(control, "held");
    };

    const onPointerMove = (e: PointerEvent) => {
        if (held.size === 0 && refused.size === 0) return;
        if (refused.has(e.pointerId)) {
            e.stopPropagation();
            return;
        }
        const press = held.get(e.pointerId);
        if (!press) return;
        const dx = Math.abs(e.clientX - press.x);
        const dy = Math.abs(e.clientY - press.y);
        if (Math.max(dx, dy) < SLOP_PX) {
            e.stopPropagation();
            return;
        }
        held.delete(e.pointerId);
        if (dx > dy) {
            // A drag: the control takes the press where the finger landed,
            // then this move, so it tracks from the first pixel.
            log(e, "drag");
            active.set(e.pointerId, press.control);
            setState(press.control, "drag");
            replay(press, "drag");
            return;
        }
        // A swipe: the page's. The browser pans (pan-y) and cancels the pointer.
        log(e, "swipe");
        refused.add(e.pointerId);
        setState(press.control, "idle");
        e.stopPropagation();
    };

    const onPointerUp = (e: PointerEvent) => {
        if (refused.delete(e.pointerId)) {
            e.stopPropagation();
            return;
        }
        const press = held.get(e.pointerId);
        if (press) {
            // A tap: the press lands where it was made, then the release.
            held.delete(e.pointerId);
            log(e, "tap");
            replay(press, "tap");
            setState(press.control, "idle");
            return;
        }
        const control = active.get(e.pointerId);
        if (control) {
            active.delete(e.pointerId);
            setState(control, "idle");
        }
    };

    const onPointerCancel = (e: PointerEvent) => {
        const control = held.get(e.pointerId)?.control ?? active.get(e.pointerId);
        held.delete(e.pointerId);
        refused.delete(e.pointerId);
        active.delete(e.pointerId);
        if (control) {
            log(e, "cancel");
            setState(control, "idle");
        }
    };

    // Glass's Slider takes its held look from `touchstart` as well as from the
    // press; a touch whose press is held must not wear it while it may yet be
    // the page's (the replayed press brings it).
    const onTouchStart = (e: TouchEvent) => {
        if (held.size === 0) return;
        const control = controlOf(e.target);
        if (control?.dataset.touchIntent === "held") e.stopPropagation();
    };

    const capture = { capture: true } as const;
    const passiveCapture = { capture: true, passive: true } as const;
    root.addEventListener("pointerdown", onPointerDown as EventListener, capture);
    root.addEventListener("pointermove", onPointerMove as EventListener, capture);
    root.addEventListener("pointerup", onPointerUp as EventListener, capture);
    root.addEventListener("pointercancel", onPointerCancel as EventListener, capture);
    root.addEventListener("touchstart", onTouchStart as EventListener, passiveCapture);
    return () => {
        root.removeEventListener("pointerdown", onPointerDown as EventListener, capture);
        root.removeEventListener("pointermove", onPointerMove as EventListener, capture);
        root.removeEventListener("pointerup", onPointerUp as EventListener, capture);
        root.removeEventListener("pointercancel", onPointerCancel as EventListener, capture);
        root.removeEventListener("touchstart", onTouchStart as EventListener, passiveCapture);
        if (own) {
            ownHosts.delete(own);
            delete own.dataset.touchIntent;
        }
    };
}
