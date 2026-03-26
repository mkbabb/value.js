<template>
    <div class="flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9">
        <!-- Edit mode: slug input form -->
        <Transition name="slug-bar-swap" mode="out-in">
        <form
            v-if="slugEditMode"
            key="slug-edit"
            class="flex items-center gap-2 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl px-3 h-9 max-w-sm w-full transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-border"
            @submit.prevent="onSlugSwitch"
        >
            <LogIn class="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
                ref="slugInputRef"
                v-model="slugInput"
                placeholder="enter slug..."
                class="fira-code text-sm bg-transparent border-none outline-none flex-1 min-w-0 placeholder:text-muted-foreground/50"
                @keydown.escape.stop="slugEditMode = false"
            />
            <button
                type="submit"
                :disabled="!slugInput.trim() || slugSwitching"
                class="p-0.5 rounded-sm hover:bg-accent/50 transition-colors cursor-pointer shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <Loader2 v-if="slugSwitching" class="w-3.5 h-3.5 animate-spin text-muted-foreground" />
                <ArrowRight v-else class="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button
                type="button"
                class="p-0.5 rounded-sm hover:bg-accent/50 transition-colors cursor-pointer shrink-0"
                @click="slugEditMode = false"
            >
                <XIcon class="w-3.5 h-3.5 text-muted-foreground" />
            </button>
        </form>

        <!-- Default mode -->
        <div v-else key="slug-default" class="flex items-center gap-1.5">
            <!-- Slug pill (logged in) -->
            <HoverCard v-if="userSlug" :close-delay="0" :open-delay="300">
                <HoverCardTrigger as-child>
                    <span
                        class="fira-code text-sm font-bold px-2 py-0.5 rounded-full border cursor-help"
                        :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
                    >
                        {{ userSlug }}
                    </span>
                </HoverCardTrigger>
                <HoverCardContent class="fraunces text-sm w-56 z-[var(--z-popover)]">
                    <p class="font-bold">Your slug</p>
                    <p class="text-muted-foreground text-xs mt-1">
                        This is your unique identity. Use it to sign in from any device and access your palettes.
                    </p>
                </HoverCardContent>
            </HoverCard>

            <!-- Admin pill -->
            <span
                v-else-if="isAdmin"
                class="fira-code text-sm font-bold px-2 py-0.5 rounded-full border cursor-default text-muted-foreground border-muted-foreground"
            >
                admin
            </span>

            <!-- Login button (not logged in, not admin) -->
            <button
                v-else
                class="flex items-center gap-1.5 fira-code text-sm font-bold px-3 py-1 rounded-full border border-primary/30 hover:bg-accent transition-colors cursor-pointer"
                @click="onStartSlugEdit()"
            >
                <LogIn class="w-3.5 h-3.5" />
                Login
            </button>

            <!-- Three-dot menu -->
            <Popover v-model:open="slugMenuOpen">
                <PopoverTrigger as-child>
                    <button class="p-1 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                        <MoreHorizontal class="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-1 flex flex-col gap-0.5 z-[var(--z-popover)]" align="end" :side-offset="4">
                    <button
                        v-if="userSlug"
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
                        v-if="userSlug"
                        class="flex items-center gap-2 px-3 py-1.5 text-sm fraunces rounded-sm hover:bg-accent transition-colors cursor-pointer w-full text-left"
                        @click="slugMenuOpen = false; $emit('logout')"
                    >
                        <LogOut class="w-3.5 h-3.5" />
                        Logout
                    </button>
                    <button
                        class="flex items-center gap-2 px-3 py-1.5 text-sm fraunces rounded-sm hover:bg-accent transition-colors cursor-pointer w-full text-left text-muted-foreground"
                        @click="slugMenuOpen = false; $emit('regenerate')"
                    >
                        <RefreshCw class="w-3.5 h-3.5" />
                        {{ userSlug ? 'Regenerate slug' : 'Generate slug' }}
                    </button>
                </PopoverContent>
            </Popover>
        </div>
        </Transition>

        <p v-if="slugError" class="absolute left-0 -bottom-4 text-xs text-destructive fira-code whitespace-nowrap">
            {{ slugError }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@components/ui/hover-card";
import {
    Loader2,
    Copy,
    X as XIcon,
    ArrowRight,
    MoreHorizontal,
    LogIn,
    LogOut,
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
    logout: [];
}>();

const slugEditMode = ref(false);
const slugMenuOpen = ref(false);
const slugInput = ref("");
const slugSwitching = ref(false);
const slugError = ref("");
const slugInputRef = ref<HTMLInputElement | null>(null);

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
            slugInputRef.value?.focus();
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

<style scoped>
@reference "../../../styles/style.css";

.slug-bar-swap-enter-active {
    transition: opacity var(--duration-normal) var(--ease-decelerate),
                transform var(--duration-normal) var(--ease-spring);
}
.slug-bar-swap-leave-active {
    transition: opacity var(--duration-fast) var(--ease-accelerate),
                transform var(--duration-fast) var(--ease-accelerate);
}
.slug-bar-swap-enter-from {
    opacity: 0;
    transform: translateY(-4px) scale(0.97);
}
.slug-bar-swap-leave-to {
    opacity: 0;
    transform: translateY(4px) scale(0.97);
}
</style>
