<template>
    <div class="grid gap-3">
        <h3 class="text-subheading">Palette Management</h3>
        <div class="flex items-center gap-2">
            <Input
                v-model="slug"
                placeholder="Palette slug..."
                class="font-mono-code text-base h-10 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
                variant="outline"
                :disabled="!slug.trim()"
                class="cursor-pointer"
                @click="onFeature"
            >
                <Award class="w-4 h-4 mr-1.5" />
                Feature
            </Button>
            <Button
                variant="destructive"
                :disabled="!slug.trim()"
                class="cursor-pointer"
                @click="onDelete"
            >
                <Trash2 class="w-4 h-4 mr-1.5" />
                Delete
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Award, Trash2 } from "lucide-vue-next";

const emit = defineEmits<{
    feature: [slug: string];
    delete: [slug: string];
}>();

const slug = ref("");

function onFeature() {
    const s = slug.value.trim();
    if (!s) return;
    emit("feature", s);
    slug.value = "";
}

function onDelete() {
    const s = slug.value.trim();
    if (!s) return;
    emit("delete", s);
    slug.value = "";
}
</script>
