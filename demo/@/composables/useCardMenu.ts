import { ref, reactive, nextTick, onUnmounted } from "vue";
import { useLeaveTimer } from "./useLeaveTimer";

export function useCardMenu(options?: { canHover?: boolean }) {
    const canHover = options?.canHover ?? (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches);

    const menuOpen = ref(false);
    const menuTriggerRef = ref<HTMLElement | null>(null);
    const menuStyle = reactive({ top: "0px", left: "0px" });
    const leaveTimer = useLeaveTimer(250);

    function positionMenu() {
        if (!menuTriggerRef.value) return;
        const rect = menuTriggerRef.value.getBoundingClientRect();
        menuStyle.top = `${rect.bottom + 4}px`;
        menuStyle.left = `${rect.right}px`;
    }

    function toggleMenu() {
        cancelMenuLeave();
        if (menuOpen.value) {
            menuOpen.value = false;
        } else {
            menuOpen.value = true;
            nextTick(positionMenu);
        }
    }

    function onMenuTriggerEnter(e: PointerEvent) {
        if (!canHover || e.pointerType === "touch") return;
        cancelMenuLeave();
        menuOpen.value = true;
        nextTick(positionMenu);
    }

    function onMenuTriggerLeave(e: PointerEvent) {
        if (!canHover || e.pointerType === "touch") return;
        scheduleMenuLeave();
    }

    function onMenuPanelEnter() {
        cancelMenuLeave();
    }

    function onMenuPanelLeave() {
        if (!canHover) return;
        scheduleMenuLeave();
    }

    function scheduleMenuLeave() {
        leaveTimer.schedule(() => { menuOpen.value = false; });
    }

    function cancelMenuLeave() {
        leaveTimer.cancel();
    }

    function onMenuAction(action: () => void, keepOpen = false) {
        if (!keepOpen) menuOpen.value = false;
        action();
    }

    // Close menu on outside click
    function onDocClick() {
        if (menuOpen.value) menuOpen.value = false;
    }
    if (typeof document !== "undefined") {
        document.addEventListener("click", onDocClick, { passive: true });
    }
    onUnmounted(() => {
        if (typeof document !== "undefined") {
            document.removeEventListener("click", onDocClick);
        }
        leaveTimer.cancel();
    });

    return {
        menuOpen,
        menuTriggerRef,
        menuStyle,
        toggleMenu,
        onMenuTriggerEnter,
        onMenuTriggerLeave,
        onMenuPanelEnter,
        onMenuPanelLeave,
        onMenuAction,
    };
}
