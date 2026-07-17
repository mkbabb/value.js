<template>
    <div class="flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9">
        <!-- Edit mode: slug input form -->
        <Transition name="vj-morph" mode="out-in">
        <SearchBar
            v-if="slugEditMode"
            ref="searchBarRef"
            key="slug-edit"
            tag="form"
            v-model="slugInput"
            :icon="LogIn"
            placeholder="enter slug..."
            @submit.prevent="onSlugSwitch"
            @keydown.escape.stop="slugEditMode = false"
        >
            <!-- W5-a11y: icon-only submit / close buttons need accessible names -->
            <Button
                type="submit"
                variant="ghost"
                icon-only
                size="xs"
                class="shrink-0"
                :disabled="!slugInput.trim() || slugSwitching"
                :aria-label="slugSwitching ? 'Signing in…' : 'Sign in with slug'"
            >
                <Loader2 v-if="slugSwitching" class="w-3.5 h-3.5 animate-spin text-muted-foreground" aria-hidden="true" />
                <ArrowRight v-else class="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
            </Button>
            <Button
                type="button"
                variant="ghost"
                icon-only
                size="xs"
                class="shrink-0"
                aria-label="Cancel slug edit"
                @click="slugEditMode = false"
            >
                <XIcon class="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
            </Button>
        </SearchBar>

        <!-- Default mode -->
        <div v-else key="slug-default" class="flex items-center gap-1.5">
            <!-- Slug pill (logged in) -->
            <HoverCard v-if="userSlug" :close-delay="0" :open-delay="300">
                <HoverCardTrigger as-child>
                    <span
                        class="slug-pill cursor-help"
                        :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
                    >
                        {{ userSlug }}
                    </span>
                </HoverCardTrigger>
                <HoverCardContent class="text-small font-display w-56">
                    <p class="font-bold">Your slug</p>
                    <p class="text-muted-foreground text-caption mt-1">
                        This is your unique identity. Use it to sign in from any device and access your palettes.
                    </p>
                </HoverCardContent>
            </HoverCard>

            <!-- Admin pill -->
            <span
                v-else-if="isAdmin"
                class="slug-pill cursor-default text-muted-foreground border-muted-foreground"
            >
                admin
            </span>

            <!-- Login button (not logged in, not admin) -->
            <button
                v-else
                class="flex items-center gap-1.5 text-mono-small font-bold px-3 py-1 rounded-full border border-primary/30 hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                @click="onStartSlugEdit()"
            >
                <LogIn class="w-3.5 h-3.5" />
                Login
            </button>

            <!-- Three-dot menu -->
            <Popover v-model:open="slugMenuOpen">
                <PopoverTrigger as-child>
                    <!-- W5-a11y: three-dot menu trigger needs accessible name -->
                <button class="p-1 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors duration-fast cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" aria-label="Account menu" :aria-expanded="slugMenuOpen" aria-haspopup="dialog">
                        <MoreHorizontal class="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                    </button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-1 flex flex-col gap-0.5 z-popover" align="end" :side-offset="4">
                    <button
                        v-if="userSlug"
                        class="flex items-center gap-2 px-3 py-1.5 text-small font-display rounded-sm hover:bg-accent active:scale-[0.98] active:bg-accent/70 transition-colors duration-fast cursor-pointer w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                        @click="slugMenuOpen = false; onCopySlug()"
                    >
                        <Copy class="w-3.5 h-3.5" />
                        Copy slug
                    </button>
                    <button
                        class="flex items-center gap-2 px-3 py-1.5 text-small font-display rounded-sm hover:bg-accent active:scale-[0.98] active:bg-accent/70 transition-colors duration-fast cursor-pointer w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                        @click="slugMenuOpen = false; onStartSlugEdit()"
                    >
                        <LogIn class="w-3.5 h-3.5" />
                        Switch account
                    </button>
                    <button
                        v-if="userSlug"
                        class="flex items-center gap-2 px-3 py-1.5 text-small font-display rounded-sm hover:bg-accent active:scale-[0.98] active:bg-accent/70 transition-colors duration-fast cursor-pointer w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                        @click="slugMenuOpen = false; $emit('logout')"
                    >
                        <LogOut class="w-3.5 h-3.5" />
                        Logout
                    </button>
                    <button
                        class="flex items-center gap-2 px-3 py-1.5 text-small font-display rounded-sm hover:bg-accent active:scale-[0.98] active:bg-accent/70 transition-colors duration-fast cursor-pointer w-full text-left text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                        @click="slugMenuOpen = false; $emit('regenerate')"
                    >
                        <RefreshCw class="w-3.5 h-3.5" />
                        {{ userSlug ? 'Regenerate slug' : 'Generate slug' }}
                    </button>
                </PopoverContent>
            </Popover>
        </div>
        </Transition>

        <p v-if="slugError" class="absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap">
            {{ slugError }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { SearchBar } from "@mkbabb/glass-ui/search";
import { Button } from "../../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../../ui/hover-card";
import {
    Loader2,
    Copy,
    X as XIcon,
    ArrowRight,
    MoreHorizontal,
    LogIn,
    LogOut,
    RefreshCw,
} from "@lucide/vue";
import { copyToClipboard } from "@mkbabb/glass-ui";

const { userSlug, cssColorOpaque, hasSavedPalettes, isAdmin } = defineProps<{
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
const searchBarRef = ref<InstanceType<typeof SearchBar> | null>(null);

function onCopySlug() {
    if (userSlug) copyToClipboard(userSlug);
}

function onStartSlugEdit() {
    slugInput.value = "";
    slugError.value = "";
    // Delay to let the Popover fully close before swapping to input mode
    setTimeout(() => {
        slugEditMode.value = true;
        nextTick(() => {
            searchBarRef.value?.inputRef?.focus();
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

        if (looksLikeSlug(normalized) && normalized === userSlug) {
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
@reference "../../../../styles/foundation.css";

/* slug swap rides the morph family (R.W4 B1) — default geometry. */
</style>
