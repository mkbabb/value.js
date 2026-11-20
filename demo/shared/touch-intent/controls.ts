/**
 * The touch grammar for every slider on the site (DESIGN.md law S-8): one
 * delegated install per app root (`demo/app/main.ts`, `demo/app/embed/main.ts`)
 * serves every horizontal glass Slider and the gradient stop rail, so no
 * consumer is edited and a page of thirty sliders has one listener. The
 * colocated sheet gives them `touch-action: pan-y`.
 *
 * A control with its own install (the picker's channel sliders, the colour
 * field) is left to it. Deleted at the glass bump that makes the lock its
 * Slider's default.
 */
import "./controls.css";
import { attachTouchIntent } from "./touchIntent";

/** The controls the app root serves. */
export const TOUCH_INTENT_CONTROLS = '.glass-slider:not([data-orientation="vertical"]), .gradient-rail';

/** Install the lock for the app's sliders on `root`. Returns the cleanup. */
export function installControlTouchIntent(root: Document): () => void {
    return attachTouchIntent(root, { match: TOUCH_INTENT_CONTROLS });
}
