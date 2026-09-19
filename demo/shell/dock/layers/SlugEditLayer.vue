<script setup lang="ts">
import { ref, nextTick, inject, useTemplateRef } from "vue";
import { LogIn, ArrowRight, RefreshCw, X as XIcon, Loader2 } from "@lucide/vue";
import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";
import { SESSION_PORT_KEY } from "../../../palettes/usePalettePorts";
import { writeClipboard } from "@mkbabb/glass-ui";

const pm = inject(SESSION_PORT_KEY)!;

const slugEditMode = defineModel<boolean>("active", { default: false });
const slugInput = ref("");
const slugSwitching = ref(false);
const slugError = ref("");
const slugInputRef = useTemplateRef<HTMLInputElement>("slugInputRef");

function onStartSlugEdit() {
    slugInput.value = "";
    slugError.value = "";
    slugEditMode.value = true;
    nextTick(() => {
        slugInputRef.value?.focus();
    });
}

function looksLikeSlug(value: string): boolean {
    return /^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/.test(value);
}

function normalizeTokenInput(raw: string): string {
    let token = raw.trim();
    const assignmentMatch = token.match(/^ADMIN_TOKEN\s*=\s*(.+)$/i);
    if (assignmentMatch) token = assignmentMatch[1]!.trim();
    if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
        token = token.slice(1, -1).trim();
    }
    return token;
}

async function onSlugSubmit() {
    const raw = slugInput.value.trim();
    if (!raw) return;
    slugSwitching.value = true;
    slugError.value = "";
    try {
        const normalized = normalizeTokenInput(raw).toLowerCase();
        const isAdmin = !looksLikeSlug(normalized);

        if (looksLikeSlug(normalized) && normalized === pm.userSlug.value) {
            slugError.value = "Already signed in.";
            slugSwitching.value = false;
            return;
        }

        pm.onSlugSwitch(isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);
        slugInput.value = "";
        slugEditMode.value = false;
    } catch (e: unknown) {
        // X-W4 Repair 1 (Check 1 defect 4) — D2's gate command scopes
        // `demo/shell/dock/**`, so a type-level `any` in this file is inside the
        // gate's letter even though the armed file list names seven others. The
        // narrowing is the sibling's own idiom (`useSlugMigration.ts:85-88`):
        // an `Error` carries the message, anything else carries none.
        const msg = e instanceof Error ? e.message : "";
        if (msg.includes("409")) slugError.value = "Already signed in.";
        else if (msg.includes("404")) slugError.value = "Slug not found.";
        else if (msg.includes("429")) slugError.value = "Too many attempts.";
        else slugError.value = msg || "Login failed";
    } finally {
        slugSwitching.value = false;
    }
}

function onCopySlug() {
    if (pm.userSlug.value) void writeClipboard(pm.userSlug.value);
}

defineExpose({ onStartSlugEdit, onCopySlug, slugSwitching });
</script>

<template>
    <form
        class="flex items-center gap-1.5"
        @submit.prevent="onSlugSubmit"
    >
        <LogIn class="w-4 h-4 text-muted-foreground shrink-0" />
        <!-- X-W4 · A4 (CC-041): the field's NAME. `placeholder` is not a name —
             it is prompt text that vanishes at the first keystroke, and the §6
             census rule ranks it nowhere. The prompt stays (it carries the format
             hint); the name is now the field's own. -->
        <input
            ref="slugInputRef"
            v-model="slugInput"
            aria-label="Slug or admin token"
            placeholder="enter slug or token..."
            class="slug-input text-mono-small bg-transparent border-none outline-none w-40 min-w-0 placeholder:text-muted-foreground"
            @keydown.escape.stop="slugEditMode = false"
        />
        <!-- W6-8 register pass: native `title` retired dock-wide — icon-only
             controls carry aria-label (the UA tooltip slab is a foreign
             register on the liquid-glass dock). -->
        <DockControl
            compact
            type="submit"
            class="slug-control"
            aria-label="Switch to slug"
            :disabled="!slugInput.trim() || slugSwitching"
        >
            <Loader2 v-if="slugSwitching" class="w-3.5 h-3.5 animate-spin" />
            <ArrowRight v-else class="w-3.5 h-3.5" />
        </DockControl>
    </form>

    <DockSeparator />

    <DockControl
        compact
        class="slug-control"
        aria-label="Generate new slug"
        @click="slugEditMode = false; pm.onRegenerateSlug()"
    >
        <RefreshCw class="w-3.5 h-3.5" />
    </DockControl>

    <DockControl
        compact
        class="slug-control"
        aria-label="Cancel"
        @click="slugEditMode = false"
    >
        <XIcon class="w-3.5 h-3.5" />
    </DockControl>
</template>

<style scoped>
/* ── X-W4 · A1/A2 (CC-040) — THE SLUG CLUSTER'S TARGET GEOMETRY ─────────────
 * Measured born-RED at this unit's re-baseline: the three `DockControl compact`
 * seats rendered 22×22 (smoke, fine) and 23.3×23.3 (smoke-mobile, coarse), and
 * the field 160×22.4 / 160×19.6 — every one under the 24 CSS-px floor, at BOTH
 * pointer classes.
 *
 * The lift is the PRODUCER's own, not a hand-rolled box. `.dock-icon-button--compact`
 * (glass-ui 7.0.0, `dist/components/dock/styles/controls/icon-button.css`) reads its
 * whole geometry from published custom properties — `--dock-compact-control-size`
 * sets width AND height — and `--control-floor` (`dist/styles/tokens/sizing.css`) is
 * `0px` at `:root` and `var(--touch-target, 2.75rem)` under `@media (pointer: coarse)`
 * (`dist/styles/tokens/light-dark.css`). So ONE declaration, composed of two producer
 * tokens, states both rungs exactly once:
 *
 *     max(1.5rem, var(--control-floor))  →  24px fine  ·  44px coarse
 *
 * The glyphs are untouched (w-3.5 = 14px): the HIT CELL grows, the paint does not —
 * the producer's own "hit box ≠ paint box" law, stated in DockControl's docblock.
 *
 * The field takes `--control-h-xs` as published (28px fine / 44px coarse) — the same
 * size axis A3 asserts over every other control in this wave. It is a MINIMUM, so the
 * dock band's own rhythm still sets the resting height wherever that is taller.
 * Nothing here restates a producer value as a literal: `1.5rem` is the 24px floor
 * W4.md §3 Scope 1 names, and every other number arrives through a token.
 */
.slug-control {
    --dock-compact-control-size: max(1.5rem, var(--control-floor));
}

.slug-input {
    min-block-size: var(--control-h-xs);
}
</style>
