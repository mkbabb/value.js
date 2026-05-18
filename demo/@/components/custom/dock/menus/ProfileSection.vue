<script setup lang="ts">
import { inject } from "vue";
import {
    Share2, Check, Github, LogIn, LogOut, Copy, RefreshCw, UserCircle,
} from "lucide-vue-next";
import { DarkModeToggle, useGlobalDark } from "@components/custom/dark-mode-toggle";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel,
} from "@components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@components/ui/avatar";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

const props = defineProps<{
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
        <div class="dock-separator"></div>

        <!-- Logged in: "Account" button with dropdown -->
        <template v-if="pm.userSlug.value">
            <DropdownMenu v-model:open="profileMenuOpen">
                <DropdownMenuTrigger as-child>
                    <button
                        class="flex items-center gap-1.5 text-mono-small font-bold px-3 py-0.5 rounded-full border whitespace-nowrap transition-colors cursor-pointer focus-ring active:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed"
                        :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
                    >
                        <UserCircle class="w-3.5 h-3.5" />
                        Profile
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="min-w-[var(--menu-min-w)] font-display">
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
            <button
                class="flex items-center gap-1.5 text-mono-small font-bold px-3 py-0.5 rounded-full border border-primary/30 hover:bg-accent/50 active:bg-accent/70 transition-colors cursor-pointer whitespace-nowrap focus-ring focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 disabled:cursor-not-allowed"
                @click="emit('startSlugEdit')"
            >
                <LogIn class="w-3.5 h-3.5" />
                Login
            </button>
        </template>

        <div class="dock-separator"></div>
    </div>

    <!-- @mbabb menu -->
    <div class="hidden lg:flex items-center">
        <DropdownMenu v-model:open="mbabbMenuOpen">
            <DropdownMenuTrigger as-child>
                <button class="text-mono-caption text-foreground/70 hover:text-foreground hover:underline active:text-foreground/50 underline-offset-4 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed">
                    @mbabb
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="min-w-[var(--menu-min-w)] font-display">
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
                        <Github class="w-3.5 h-3.5" /> GitHub
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
