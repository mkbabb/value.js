<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button
                variant="outline"
                size="sm"
                class="h-9 sm:h-10 px-2.5 cursor-pointer shrink-0"
            >
                <ArrowUpDown class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-44 fraunces">
            <DropdownMenuLabel class="text-xs">Sort</DropdownMenuLabel>
            <DropdownMenuRadioGroup
                :model-value="sort"
                @update:model-value="(v: any) => $emit('update:sort', v as string)"
            >
                <DropdownMenuRadioItem value="newest" class="text-sm cursor-pointer">
                    Newest first
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="popular" class="text-sm cursor-pointer">
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
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-vue-next";

defineProps<{
    sort: "newest" | "popular";
}>();

defineEmits<{
    "update:sort": [value: string];
}>();
</script>
