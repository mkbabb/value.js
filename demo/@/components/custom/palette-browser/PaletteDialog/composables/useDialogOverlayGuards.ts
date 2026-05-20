/**
 * useDialogOverlayGuards — pointer/escape-key guards for the palette dialog
 * overlay. Extracted from the inline `isTeleportedTarget` / `onPointerDownOutside`
 * / `onInteractOutside` block in `PaletteDialog.vue` (D.W3 Lane A).
 *
 * Reka-ui's Dialog dispatches `pointerDownOutside` + `interactOutside` events
 * when the user clicks outside the dialog content. We need to call
 * `event.preventDefault()` if the target is actually inside a teleported
 * popper/menu/panel (the floating UI surfaces render at the document root,
 * so reka-ui sees them as "outside"). We also suppress focus-only interact-
 * outside events to keep the dialog open during programmatic focus restoration.
 */
export function useDialogOverlayGuards() {
    function isTeleportedTarget(event: any): boolean {
        const target = event.detail?.originalEvent?.target ?? event.target;
        return (
            target instanceof HTMLElement &&
            !!(
                target.closest("[data-reka-popper-content-wrapper]") ||
                target.closest(".card-menu-panel") ||
                target.closest(".floating-panel")
            )
        );
    }

    function onPointerDownOutside(event: any) {
        if (isTeleportedTarget(event)) {
            event.preventDefault();
        }
    }

    function onInteractOutside(event: any) {
        if (isTeleportedTarget(event)) {
            event.preventDefault();
            return;
        }
        const originalEvent = event.detail?.originalEvent;
        if (
            !originalEvent ||
            originalEvent.type === "focusin" ||
            originalEvent.type === "focus"
        ) {
            event.preventDefault();
        }
    }

    return {
        isTeleportedTarget,
        onPointerDownOutside,
        onInteractOutside,
    };
}
