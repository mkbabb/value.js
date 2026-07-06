<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <!-- S.W5-4: the triplicated hand-rolled icon-trigger recipe dies
                 onto the sanctioned glass-ui atom (+ the missing name). -->
            <Button
                icon-only
                variant="ghost"
                size="xs"
                aria-label="Sort palettes"
                class="shrink-0"
            >
                <EllipsisVertical class="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="min-w-menu font-display">
            <DropdownMenuRadioGroup
                :model-value="sort"
                @update:model-value="(v: any) => $emit('update:sort', v as string)"
            >
                <DropdownMenuRadioItem value="newest" class="text-small cursor-pointer gap-2">
                    <Clock class="w-3.5 h-3.5" />
                    Newest first
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="popular" class="text-small cursor-pointer gap-2">
                    <TrendingUp class="w-3.5 h-3.5" />
                    Most popular
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import { Button } from "@components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { EllipsisVertical, Clock, TrendingUp } from "@lucide/vue";

defineProps<{
    sort: "newest" | "popular";
}>();

defineEmits<{
    "update:sort": [value: string];
}>();
</script>
