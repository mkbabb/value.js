<script setup lang="ts">
import { inject } from "vue";
import {
    Share2, Check, LogIn, LogOut, Copy, RefreshCw, UserCircle,
} from "@lucide/vue";
import { DockSeparator } from "@mkbabb/glass-ui/dock";
import { Button } from "@components/ui/button";
import { DarkModeToggle, useGlobalDark } from "@components/custom/dark-mode-toggle";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel,
} from "@components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@components/ui/avatar";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

const { cssColorOpaque, linkCopied } = defineProps<{
    cssColorOpaque: string;
    linkCopied: boolean;
}>();

const emit = defineEmits<{
    shareLink: [];
    startSlugEdit: [];
    copySlug: [];
}>();

const profileMenuOpen = defineModel<boolean>("profileMenuOpen", { default: false });
const mbabbMenuOpen = defineModel<boolean>("mbabbMenuOpen", { default: false });

const pm = inject(PALETTE_MANAGER_KEY)!;
const { toggleDark } = useGlobalDark();
</script>

<template>
    <!-- Desktop-only: user/login section -->
    <div class="hidden lg:flex items-center gap-1">
        <DockSeparator />

        <!-- Logged in: "Account" button with dropdown -->
        <template v-if="pm.userSlug.value">
            <DropdownMenu v-model:open="profileMenuOpen">
                <DropdownMenuTrigger as-child>
                    <!-- S.W5-4: hand-rolled pill → glass-ui Button (buttons
                         only — W7-6 owns this section's casing later). The
                         live-color identity stays via :style. -->
                    <Button
                        variant="outline"
                        size="xs"
                        class="gap-1.5 text-mono-small font-bold whitespace-nowrap"
                        :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
                    >
                        <UserCircle class="w-3.5 h-3.5" />
                        Profile
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="min-w-menu font-display">
                    <DropdownMenuLabel class="px-2 py-1.5">
                        <span
                            class="slug-pill whitespace-nowrap"
                            :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
                        >{{ pm.userSlug.value }}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuItem class="text-small gap-2 cursor-pointer" @select.prevent @click="emit('copySlug')">
                        <Copy class="w-3.5 h-3.5" /> Copy slug
                    </DropdownMenuItem>
                    <DropdownMenuItem class="text-small gap-2 cursor-pointer" @click="emit('startSlugEdit')">
                        <LogIn class="w-3.5 h-3.5" /> Switch account
                    </DropdownMenuItem>
                    <DropdownMenuItem class="text-small gap-2 cursor-pointer" @click="pm.userLogout()">
                        <LogOut class="w-3.5 h-3.5" /> Logout
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem class="text-small gap-2 cursor-pointer text-muted-foreground" @click="pm.onRegenerateSlug()">
                        <RefreshCw class="w-3.5 h-3.5" /> Regenerate slug
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </template>

        <!-- Admin (no slug) -->
        <template v-else-if="pm.isAdminAuthenticated.value">
            <span class="slug-pill cursor-default whitespace-nowrap gold-shimmer" style="border-color: var(--color-gold); color: var(--color-gold)">
                admin
            </span>
        </template>

        <!-- Not logged in -->
        <template v-else>
            <Button
                variant="outline"
                size="xs"
                class="gap-1.5 text-mono-small font-bold whitespace-nowrap border-primary/30"
                @click="emit('startSlugEdit')"
            >
                <LogIn class="w-3.5 h-3.5" />
                Login
            </Button>
        </template>

        <DockSeparator />
    </div>

    <!-- @mbabb menu -->
    <div class="hidden lg:flex items-center">
        <DropdownMenu v-model:open="mbabbMenuOpen">
            <DropdownMenuTrigger as-child>
                <!-- S.W5-4: hand-rolled trigger → glass-ui Button ghost.
                     Casing class kept verbatim — W7-6 owns the @mbabb
                     register fix. -->
                <Button
                    variant="ghost"
                    size="xs"
                    class="text-mono-caption text-foreground/70 hover:text-foreground hover:underline underline-offset-4 whitespace-nowrap"
                >
                    @mbabb
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="min-w-menu font-display">
                <div class="flex items-center gap-2 px-2 py-1.5">
                    <Avatar class="w-7 h-7">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/2848617?v=4" />
                    </Avatar>
                    <div>
                        <a href="https://github.com/mkbabb" target="_blank" rel="noopener noreferrer" class="text-mono-small text-foreground hover:underline">@mbabb</a>
                        <p class="text-micro italic text-muted-foreground leading-tight font-display">Color space picker &amp; converter</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-small gap-2 cursor-pointer" @select.prevent @click="emit('shareLink')">
                    <component :is="linkCopied ? Check : Share2" class="w-3.5 h-3.5" />
                    {{ linkCopied ? 'Copied!' : 'Share color' }}
                </DropdownMenuItem>
                <DropdownMenuItem class="text-small gap-2 cursor-pointer" as-child>
                    <a href="https://github.com/mkbabb/value.js" target="_blank" rel="noopener noreferrer" class="no-underline text-foreground">
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.99 0 1.98.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.13 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
                        </svg>
                        GitHub
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-small gap-2 cursor-pointer" @select.prevent @click="toggleDark()">
                    <DarkModeToggle passive title="Toggle dark mode" class="aspect-square w-4" />
                    Dark mode
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>
