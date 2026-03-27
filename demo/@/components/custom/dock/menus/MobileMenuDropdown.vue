<script setup lang="ts">
import { inject } from "vue";
import {
    Share2, Check, Github, LogIn, LogOut, Copy, RefreshCw, MoreVertical,
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

const open = defineModel<boolean>("open", { default: false });
const pm = inject(PALETTE_MANAGER_KEY)!;
const { toggleDark } = useGlobalDark();
</script>

<template>
    <div class="lg:hidden flex items-center">
        <DropdownMenu v-model:open="open">
            <DropdownMenuTrigger class="dock-icon-btn">
                <MoreVertical class="w-6 h-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="min-w-[11rem] font-display">
                <!-- Login / slug section -->
                <template v-if="pm.userSlug.value">
                    <DropdownMenuLabel class="px-2 py-1.5">
                        <span
                            class="text-mono-small font-bold px-2 py-0.5 rounded-full border whitespace-nowrap"
                            :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
                        >{{ pm.userSlug.value }}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuItem class="text-sm gap-2 cursor-pointer" @select.prevent @click="emit('copySlug')">
                        <Copy class="w-3.5 h-3.5" /> Copy slug
                    </DropdownMenuItem>
                    <DropdownMenuItem class="text-sm gap-2 cursor-pointer" @click="emit('startSlugEdit')">
                        <LogIn class="w-3.5 h-3.5" /> Switch account
                    </DropdownMenuItem>
                    <DropdownMenuItem class="text-sm gap-2 cursor-pointer" @click="pm.userLogout()">
                        <LogOut class="w-3.5 h-3.5" /> Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem class="text-sm gap-2 cursor-pointer text-muted-foreground" @click="pm.onRegenerateSlug()">
                        <RefreshCw class="w-3.5 h-3.5" /> Regenerate slug
                    </DropdownMenuItem>
                </template>
                <template v-else-if="pm.isAdminAuthenticated.value">
                    <DropdownMenuLabel class="px-2 py-1.5">
                        <span class="text-mono-small font-bold px-2 py-0.5 rounded-full border cursor-default text-muted-foreground border-muted-foreground whitespace-nowrap">admin</span>
                    </DropdownMenuLabel>
                </template>
                <template v-else>
                    <DropdownMenuItem class="text-sm gap-2 cursor-pointer" @click="emit('startSlugEdit')">
                        <LogIn class="w-3.5 h-3.5" /> Login
                    </DropdownMenuItem>
                </template>

                <DropdownMenuSeparator />

                <!-- @mbabb section -->
                <div class="flex items-center gap-2 px-2 py-1.5">
                    <Avatar class="w-7 h-7">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/2848617?v=4" />
                    </Avatar>
                    <div>
                        <a href="https://github.com/mkbabb" target="_blank" rel="noopener noreferrer" class="font-mono text-sm text-foreground hover:underline">@mbabb</a>
                        <p class="text-2xs italic text-muted-foreground leading-tight font-display">Color space picker &amp; converter</p>
                    </div>
                </div>
                <DropdownMenuItem class="text-sm gap-2 cursor-pointer" @select.prevent @click="emit('shareLink')">
                    <component :is="linkCopied ? Check : Share2" class="w-3.5 h-3.5" />
                    {{ linkCopied ? 'Copied!' : 'Share color' }}
                </DropdownMenuItem>
                <DropdownMenuItem class="text-sm gap-2 cursor-pointer" as-child>
                    <a href="https://github.com/mkbabb/value.js" target="_blank" rel="noopener noreferrer" class="no-underline text-foreground">
                        <Github class="w-3.5 h-3.5" /> GitHub
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-sm gap-2 cursor-pointer" @select.prevent @click="toggleDark()">
                    <DarkModeToggle passive title="Toggle dark mode" class="aspect-square w-4" />
                    Dark mode
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>
