<script setup lang="ts">
/**
 * <GenericActionBar> — THE seat row of the dock's action bar.
 *
 * X-W4 · CC-043. This is the ONE renderer the collapse leaves standing: every
 * scene's actions — the color session's five and each workbench's three — come
 * through this `v-for` and no other. Before the collapse there were two rows
 * (this one and the picker's hardcoded `ActionToolbar`), chosen against each
 * other in `Dock.vue` by a `v-if`/`v-else-if` priority that let the picker's
 * bar suppress whichever scene bar stood beside it.
 *
 * It renders a `SceneAction`'s TOTAL state, so the shell can no longer paint an
 * operable control over a command that does not exist:
 *
 *   · `ready`       — the seat is live; clicking runs the contract's dispatch.
 *   · `blocked`     — present, refused right now (an open color edit).
 *   · `unavailable` — the scene's target has NOT registered. The seat is named,
 *                     visible, inert, SAYS so in its accessible name, and the
 *                     row carries one `role="status"` line naming the condition.
 *                     This is D4's whole subject: the predecessor rendered the
 *                     same seat fully operable over a `?.()` that resolved to
 *                     `undefined`, so the user pressed a live-looking button and
 *                     nothing happened, anywhere, ever.
 *   · `failed`      — the command ran and threw. Announced through `role="alert"`
 *                     and left OPERABLE, so the state is recoverable — the dock
 *                     band closes before `<main>`, so the app's only
 *                     ErrorBoundary cannot see a dock dispatch at all (MP-3).
 *
 * `ActionButton` (the seat itself) is NOT in this wave's bounds, so the state is
 * expressed entirely through props it already publishes — `disabled`, `title`,
 * `description`, `activeStyle` — plus the wrapper's own data stamps.
 */
import { computed, ref } from "vue";
import ActionButton from "../ActionButton.vue";
import type { SceneAction, SceneActionState } from "../../../color-session/keys";

const { actions, accentColor } = defineProps<{
    actions: readonly SceneAction[];
    accentColor?: string;
}>();

const activeHover = ref<string | null>(null);

/** Only `ready` and `failed` carry a command; the other two are inert by type. */
function operable(state: SceneActionState): boolean {
    return state.kind === "ready" || state.kind === "failed";
}

function run(state: SceneActionState): void {
    if (state.kind === "ready" || state.kind === "failed") state.run();
}

/**
 * The accessible name carries the state, because a seat that is inert but named
 * exactly like a live one tells a screen-reader user a lie.
 */
function seatName(action: SceneAction): string {
    if (action.state.kind === "unavailable") return `${action.title} — unavailable`;
    if (action.state.kind === "blocked") return `${action.title} — unavailable now`;
    if (action.state.kind === "failed") return `${action.title} — failed, try again`;
    return action.title;
}

/** The hover card says WHY, in the same words the status line announces. */
function seatDescription(action: SceneAction): string {
    if (action.state.kind === "unavailable" || action.state.kind === "blocked") {
        return `Unavailable — ${action.state.reason}.`;
    }
    if (action.state.kind === "failed") {
        return `This action failed: ${action.state.detail}. Select it to try again.`;
    }
    return action.description;
}

/**
 * AB-32's rider, rendered. The pre-collapse `ActionToolbar` fed the palette-open
 * indicator through exactly this inline stroke; the contract now carries the
 * `active` member so the indicator survives the collapse. A failed seat speaks
 * the destructive ink through the same published prop — no new paint code.
 */
function seatStyle(action: SceneAction): Record<string, string> {
    if (action.state.kind === "failed") {
        return { stroke: "var(--destructive)", strokeWidth: "2" };
    }
    if (action.active === true && accentColor !== undefined) {
        return { stroke: accentColor, strokeWidth: "2" };
    }
    return {};
}

const unavailable = computed(() =>
    actions.filter((action) => action.state.kind === "unavailable"),
);
const failed = computed(() =>
    actions.filter((action) => action.state.kind === "failed"),
);

/** One announcement for the whole row, not one per dead seat. */
const unavailableMessage = computed(() => {
    const first = unavailable.value[0];
    if (first === undefined || first.state.kind !== "unavailable") return "";
    const names = unavailable.value.map((action) => action.title).join(", ");
    return `${unavailable.value.length} of ${actions.length} actions are unavailable (${names}) — ${first.state.reason}.`;
});

const failedMessage = computed(() =>
    failed.value
        .map((action) =>
            action.state.kind === "failed"
                ? `${action.title} failed: ${action.state.detail}.`
                : "",
        )
        .join(" "),
);
</script>

<template>
    <div class="flex items-center justify-around flex-1" data-testid="scene-action-row">
        <div
            v-for="action in actions"
            :key="action.token"
            class="scene-action-seat"
            :data-scene-action="action.token"
            :data-action-state="action.state.kind"
            :data-action-active="action.active === true ? 'true' : 'false'"
        >
            <ActionButton
                :icon="action.icon"
                :hover-key="action.token"
                :active-hover="activeHover"
                :title="seatName(action)"
                :description="seatDescription(action)"
                :css-color-opaque="accentColor"
                :rotate-on-click="action.rotateOnClick"
                :icon-class="action.iconClass"
                :disabled="!operable(action.state)"
                :active-style="seatStyle(action)"
                @action="run(action.state)"
                @update:active-hover="(v) => (activeHover = v)"
            />
        </div>

        <!-- The two announced regions. They are visually hidden because the dock
             pill has no room for a text line and the SIGHTED signal is already
             the inert (or destructive-inked) seat; an AT user gets the words. -->
        <p v-if="unavailableMessage" class="sr-only" role="status">
            {{ unavailableMessage }}
        </p>
        <p v-if="failedMessage" class="sr-only" role="alert">
            {{ failedMessage }}
        </p>
    </div>
</template>

<style scoped>
@reference "../../../styles/foundation.css";

/* The seat wrapper exists to carry the contract's stamps into the DOM; it adds
   no box of its own beyond the seat it holds. */
.scene-action-seat {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
</style>
