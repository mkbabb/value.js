<template>
    <div class="grid gap-3">
        <p class="fira-code text-sm text-muted-foreground">
            Enter admin token to continue.
        </p>
        <form class="flex items-center gap-2" @submit.prevent="onSubmit">
            <Input
                v-model="tokenInput"
                type="password"
                placeholder="Admin token..."
                class="fira-code text-base h-10 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
                type="submit"
                :disabled="!tokenInput.trim()"
                class="cursor-pointer"
            >
                <LogIn class="w-4 h-4 mr-1.5" />
                Login
            </Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { LogIn } from "lucide-vue-next";

const emit = defineEmits<{
    login: [token: string];
}>();

const tokenInput = ref("");

function onSubmit() {
    let token = tokenInput.value.trim();
    const assignmentMatch = token.match(/^ADMIN_TOKEN\s*=\s*(.+)$/i);
    if (assignmentMatch) {
        token = assignmentMatch[1]!.trim();
    }
    if (
        (token.startsWith('"') && token.endsWith('"')) ||
        (token.startsWith("'") && token.endsWith("'"))
    ) {
        token = token.slice(1, -1).trim();
    }
    if (!token) return;
    emit("login", token);
    tokenInput.value = "";
}
</script>
