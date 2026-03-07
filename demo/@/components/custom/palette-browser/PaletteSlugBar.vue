<template>
    <div v-if="userSlug || slugEditMode || isAdmin" class="flex items-center gap-1.5 mb-2 relative">
        <div :class="['flex items-center gap-1.5 min-w-0', slugEditMode && 'flex-1']">
            <!-- Slug pill (default) -->
            <HoverCard v-if="!slugEditMode && userSlug" :close-delay="0" :open-delay="300">
                <HoverCardTrigger as-child>
                    <span
                        class="fira-code text-sm font-bold px-2 py-0.5 rounded-full border cursor-help"
                        :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
                    >
                        {{ userSlug }}
                    </span>
                </HoverCardTrigger>
                <HoverCardContent class="fraunces text-sm w-56 z-[100]">
                    <p class="font-bold">Your slug</p>
                    <p class="text-muted-foreground text-xs mt-1">
                        This is your unique identity. Use it to sign in from any device and access your palettes.
                    </p>
                </HoverCardContent>
            </HoverCard>
            <!-- Admin pill (no user slug) -->
            <span
                v-else-if="!slugEditMode && isAdmin"
                class="fira-code text-sm font-bold px-2 py-0.5 rounded-full border cursor-default text-muted-foreground border-muted-foreground"
            >
                admin
            </span>
            <!-- Slug input (switch mode) -->
            <form v-else class="flex items-center gap-1.5 flex-1 min-w-0" @submit.prevent="onSlugSwitch">
                <Input
                    ref="slugInputRef"
                    v-model="slugInput"
                    placeholder="🐌 enter slug..."
                    class="fira-code text-sm h-7 flex-1 min-w-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    @keydown.escape.stop="slugEditMode = false"
                />
                <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    :disabled="!slugInput.trim() || slugSwitching"
                    class="fraunces text-sm h-7 px-2 cursor-pointer border-primary/30"
                >
                    <Loader2 v-if="slugSwitching" class="w-3.5 h-3.5 animate-spin" />
                    <LogIn v-else class="w-3.5 h-3.5" />
                </Button>
                <button
                    type="button"
                    class="p-0.5 transition-colors rounded-md hover:bg-secondary cursor-pointer"
                    @click="slugEditMode = false"
                >
                    <XIcon class="w-4 h-4 text-muted-foreground" />
                </button>
            </form>
        </div>
        <!-- Three-dot menu -->
        <Popover v-if="!slugEditMode" v-model:open="slugMenuOpen">
            <PopoverTrigger as-child>
                <button class="p-1 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                    <MoreHorizontal class="w-3.5 h-3.5 text-muted-foreground" />
                </button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-1 flex flex-col gap-0.5 z-[100]" align="end" :side-offset="4">
                <button
                    class="flex items-center gap-2 px-3 py-1.5 text-sm fraunces rounded-sm hover:bg-accent transition-colors cursor-pointer w-full text-left"
                    @click="slugMenuOpen = false; onCopySlug()"
                >
                    <Copy class="w-3.5 h-3.5" />
                    Copy slug
                </button>
                <button
                    class="flex items-center gap-2 px-3 py-1.5 text-sm fraunces rounded-sm hover:bg-accent transition-colors cursor-pointer w-full text-left"
                    @click="slugMenuOpen = false; onStartSlugEdit()"
                >
                    <LogIn class="w-3.5 h-3.5" />
                    Switch account
                </button>
                <button
                    class="flex items-center gap-2 px-3 py-1.5 text-sm fraunces rounded-sm hover:bg-accent transition-colors cursor-pointer w-full text-left text-muted-foreground"
                    @click="slugMenuOpen = false; $emit('regenerate')"
                >
                    <RefreshCw class="w-3.5 h-3.5" />
                    Regenerate slug
                </button>
            </PopoverContent>
        </Popover>
        <p v-if="slugError" class="absolute left-0 -bottom-4 text-[0.65rem] text-destructive fira-code whitespace-nowrap">
            {{ slugError }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@components/ui/hover-card";
import {
    Loader2,
    Copy,
    X as XIcon,
    MoreHorizontal,
    LogIn,
    RefreshCw,
} from "lucide-vue-next";
import { copyToClipboard } from "@composables/useClipboard";

const props = defineProps<{
    userSlug: string | null;
    cssColorOpaque: string;
    hasSavedPalettes: boolean;
    isAdmin?: boolean;
}>();

const emit = defineEmits<{
    copy: [];
    switchSlug: [slug: string, isAdmin: boolean];
    regenerate: [];
}>();

const slugEditMode = ref(false);
const slugMenuOpen = ref(false);
const slugInput = ref("");
const slugSwitching = ref(false);
const slugError = ref("");
const slugInputRef = ref<InstanceType<typeof Input> | null>(null);

function onCopySlug() {
    if (props.userSlug) copyToClipboard(props.userSlug);
}

function onStartSlugEdit() {
    slugInput.value = "";
    slugError.value = "";
    // Delay to let the Popover fully close before swapping to input mode
    setTimeout(() => {
        slugEditMode.value = true;
        nextTick(() => {
            const el = slugInputRef.value?.$el?.querySelector?.("input") ?? slugInputRef.value?.$el;
            el?.focus?.();
        });
    }, 50);
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

async function onSlugSwitch() {
    const raw = slugInput.value.trim();
    if (!raw) return;
    slugSwitching.value = true;
    slugError.value = "";
    try {
        const normalized = normalizeTokenInput(raw).toLowerCase();
        const isAdmin = !looksLikeSlug(normalized);

        if (looksLikeSlug(normalized) && normalized === props.userSlug) {
            slugError.value = "Already signed in as this slug.";
            slugSwitching.value = false;
            return;
        }

        emit("switchSlug", isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);
        slugInput.value = "";
        slugEditMode.value = false;
    } catch (e: any) {
        const msg = e?.message ?? "";
        if (msg.includes("409")) slugError.value = "Already signed in as this slug.";
        else if (msg.includes("404")) slugError.value = "Slug not found.";
        else if (msg.includes("429")) slugError.value = "Too many attempts.";
        else slugError.value = msg || "Login failed";
    } finally {
        slugSwitching.value = false;
    }
}

function setError(msg: string) {
    slugError.value = msg;
}

function resetEditMode() {
    slugInput.value = "";
    slugEditMode.value = false;
}

defineExpose({ slugEditMode, setError, resetEditMode });
</script>
