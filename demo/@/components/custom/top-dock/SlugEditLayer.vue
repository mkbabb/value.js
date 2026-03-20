<script setup lang="ts">
import { ref, nextTick, inject } from "vue";
import { LogIn, ArrowRight, RefreshCw, X as XIcon, Loader2 } from "lucide-vue-next";
import { PALETTE_MANAGER_KEY } from "@composables/usePaletteManager";
import { copyToClipboard } from "@composables/useClipboard";

const pm = inject(PALETTE_MANAGER_KEY)!;

const slugEditMode = defineModel<boolean>("active", { default: false });
const slugInput = ref("");
const slugSwitching = ref(false);
const slugError = ref("");
const slugInputRef = ref<HTMLInputElement | null>(null);

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
    } catch (e: any) {
        const msg = e?.message ?? "";
        if (msg.includes("409")) slugError.value = "Already signed in.";
        else if (msg.includes("404")) slugError.value = "Slug not found.";
        else if (msg.includes("429")) slugError.value = "Too many attempts.";
        else slugError.value = msg || "Login failed";
    } finally {
        slugSwitching.value = false;
    }
}

function onCopySlug() {
    if (pm.userSlug.value) copyToClipboard(pm.userSlug.value);
}

defineExpose({ onStartSlugEdit, onCopySlug, slugSwitching });
</script>

<template>
    <form
        class="flex items-center gap-1.5"
        @submit.prevent="onSlugSubmit"
    >
        <LogIn class="w-4 h-4 text-muted-foreground shrink-0" />
        <input
            ref="slugInputRef"
            v-model="slugInput"
            placeholder="enter slug or token..."
            class="fira-code text-sm bg-transparent border-none outline-none w-40 min-w-0 placeholder:text-muted-foreground/50"
            @keydown.escape.stop="slugEditMode = false"
        />
        <button
            type="submit"
            :disabled="!slugInput.trim() || slugSwitching"
            class="dock-icon-btn-compact"
        >
            <Loader2 v-if="slugSwitching" class="w-3.5 h-3.5 animate-spin" />
            <ArrowRight v-else class="w-3.5 h-3.5" />
        </button>
    </form>

    <div class="dock-separator"></div>

    <button
        class="dock-icon-btn-compact"
        title="Generate new slug"
        @click="slugEditMode = false; pm.onRegenerateSlug()"
    >
        <RefreshCw class="w-3.5 h-3.5" />
    </button>

    <button
        class="dock-icon-btn-compact"
        title="Cancel"
        @click="slugEditMode = false"
    >
        <XIcon class="w-3.5 h-3.5" />
    </button>
</template>
