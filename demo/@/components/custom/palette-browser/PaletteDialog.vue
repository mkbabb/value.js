<template>
    <Dialog v-model:open="openModel">
        <DialogScrollContent
            :class="[
                'palette-dialog w-[calc(100%-1rem)] sm:w-[min(95vw,1050px)] p-0 gap-0 bg-card text-card-foreground overflow-hidden rounded-lg h-[min(90vh,820px)] max-h-[90vh] min-w-0 flex flex-col',
                editingExit && 'palette-dialog--editing-exit',
                editingEnter && 'palette-dialog--editing-enter',
            ]"
            @pointer-down-outside="onPointerDownOutside"
            @interact-outside="onInteractOutside"
        >
            <!-- Header -->
            <div class="shrink-0">
                <!-- Thick accent bar at top -->
                <div
                    class="h-3 w-full"
                    :style="{
                        background: `linear-gradient(to right, ${cssColorOpaque}, ${cssColor})`,
                    }"
                ></div>
                <div
                    class="flex items-center justify-between px-4 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-3"
                >
                    <div class="flex items-center gap-2 sm:gap-3 min-w-0">
                        <!-- Color swatch dot -->
                        <WatercolorDot
                            :color="isAdminAuthenticated ? '#D4AF37' : cssColorOpaque"
                            :class="[
                                'w-10 sm:w-12 aspect-square shrink-0 cursor-pointer',
                                isAdminAuthenticated && 'admin-golden',
                            ]"
                            animate
                            tag="button"
                            :title="cssColorOpaque"
                            @click="onDotClick"
                        />
                        <div class="min-w-0">
                            <DialogTitle
                                class="fraunces text-3xl sm:text-5xl font-black tracking-tight"
                            >
                                <template v-if="isAdminAuthenticated">
                                    Admin <span class="uppercase admin-golden-text">Palettes</span>
                                </template>
                                <template v-else>
                                    Color
                                    <span class="uppercase pastel-rainbow-text"
                                        >Palettes</span
                                    >
                                </template>
                            </DialogTitle>
                            <DialogDescription
                                class="fira-code text-xs sm:text-sm text-muted-foreground italic mt-0.5"
                            >
                                Save, browse, and publish color palettes.
                            </DialogDescription>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabs + Search -->
            <div
                data-testid="palette-browser-scroll-pane"
                class="px-4 sm:px-6 w-full flex flex-col flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden"
            >
                <Tabs
                    v-model="activeTab"
                    class="w-full min-h-full flex flex-col min-w-0"
                >
                    <!-- Controls: sticky tabs row, then search+sort row -->
                    <div class="flex flex-col gap-2 mb-4 min-w-0 sticky top-0 z-10 bg-card pb-2">
                        <!-- User slug display -->
                        <div v-if="userSlug || slugEditMode" class="flex items-center gap-1.5 mb-2 relative">
                            <div :class="['flex items-center gap-1.5 min-w-0', slugEditMode && 'flex-1']">
                                <!-- Slug pill (default) -->
                                <HoverCard v-if="!slugEditMode" :close-delay="0" :open-delay="300">
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
                                        @click="slugMenuOpen = false; onRegenerateSlug()"
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

                        <div class="tabs-scroll-container overflow-x-auto mx-0">
                            <TabsList class="shrink-0 w-fit flex-nowrap">
                                <TabsTrigger value="saved" class="fraunces text-base font-bold"
                                    >My Palettes</TabsTrigger
                                >
                                <TabsTrigger value="browse" class="fraunces text-base font-bold"
                                    >Browse</TabsTrigger
                                >
                                <template v-if="isAdminAuthenticated">
                                    <TabsTrigger value="admin-users" class="fraunces text-base font-bold">
                                        <Shield class="w-3.5 h-3.5 mr-1" />
                                        Users
                                    </TabsTrigger>
                                    <TabsTrigger value="admin-palettes" class="fraunces text-base font-bold">
                                        Palettes
                                    </TabsTrigger>
                                    <TabsTrigger value="admin-colors" class="fraunces text-base font-bold">
                                        Colors
                                    </TabsTrigger>
                                </template>
                            </TabsList>
                        </div>
                        <div class="flex items-center gap-2 min-w-0 flex-1">
                            <Input
                                v-model="searchQuery"
                                :placeholder="searchPlaceholder"
                                class="fira-code text-sm sm:text-base h-9 sm:h-10 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-0 flex-1"
                            />
                            <!-- Sort controls (browse tab only) -->
                            <template v-if="activeTab === 'browse'">
                                <SortFilterMenu
                                    :sort="sortMode"
                                    @update:sort="onSortChange"
                                />
                            </template>
                            <!-- Admin palette actions (admin-palettes tab) -->
                            <template v-if="activeTab === 'admin-palettes'">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    :disabled="!searchQuery.trim()"
                                    class="cursor-pointer fraunces h-9 sm:h-10"
                                    @click="onAdminFeature"
                                >
                                    Feature
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    :disabled="!searchQuery.trim()"
                                    class="cursor-pointer fraunces h-9 sm:h-10"
                                    @click="onAdminDelete"
                                >
                                    Delete
                                </Button>
                            </template>
                        </div>
                    </div>

                    <!-- My Palettes tab -->
                    <TabsContent value="saved" class="mt-0 w-full">
                        <Transition name="tab-fade" mode="out-in">
                            <div :key="'saved'" class="grid gap-3 pb-3">
                                <!-- Current working palette -->
                                <div
                                    class="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-3 grid gap-2"
                                >
                                    <div
                                        class="flex items-center justify-between gap-2"
                                    >
                                        <span
                                            class="fraunces text-sm font-bold text-muted-foreground"
                                        >
                                            {{
                                                savedColorStrings.length > 0
                                                    ? "Current Palette"
                                                    : "Start a new palette"
                                            }}
                                        </span>
                                        <span
                                            v-if="savedColorStrings.length > 0"
                                            class="fira-code text-xs text-muted-foreground"
                                            >{{ savedColorStrings.length }} colors</span
                                        >
                                    </div>
                                    <TransitionGroup
                                        name="swatch-item"
                                        tag="div"
                                        class="flex items-center gap-2.5 flex-wrap"
                                    >
                                        <div
                                            v-for="(color, i) in savedColorStrings"
                                            :key="swatchKeys[i]"
                                            class="relative"
                                            @pointerenter="
                                                onCurrentSwatchHover(i, $event)
                                            "
                                            @pointerleave="onCurrentSwatchLeave()"
                                        >
                                            <!-- Touch: native Popover click toggle -->
                                            <Popover
                                                v-if="!canHover"
                                                :open="currentSwatchPopoverIndex === i"
                                                @update:open="
                                                    (v: boolean) =>
                                                        onCurrentSwatchPopoverUpdateTouch(
                                                            v,
                                                            i,
                                                        )
                                                "
                                            >
                                                <PopoverTrigger as-child>
                                                    <WatercolorDot
                                                        :color="color"
                                                        tag="button"
                                                        class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer"
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    class="w-auto p-1.5 flex items-center gap-1"
                                                    :side-offset="8"
                                                >
                                                    <button
                                                        @click="
                                                            onCurrentSwatchEdit(
                                                                color,
                                                                i,
                                                            )
                                                        "
                                                        class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                                    >
                                                        <Pencil class="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        @click="
                                                            onCurrentSwatchCopy(color)
                                                        "
                                                        class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                                    >
                                                        <Copy
                                                            class="w-4 h-4"
                                                        />
                                                    </button>
                                                    <button
                                                        @click="
                                                            onCurrentSwatchRemove(
                                                                color,
                                                                i,
                                                            )
                                                        "
                                                        class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                                    >
                                                        <Trash2
                                                            class="w-4 h-4 text-destructive"
                                                        />
                                                    </button>
                                                </PopoverContent>
                                            </Popover>

                                            <!-- Hover: manually positioned floating panel -->
                                            <template v-else>
                                                <WatercolorDot
                                                    :color="color"
                                                    tag="button"
                                                    class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer"
                                                    @click.stop="
                                                        onCurrentSwatchClick(i)
                                                    "
                                                />
                                                <Teleport to="body">
                                                    <div
                                                        v-if="
                                                            currentSwatchPopoverIndex ===
                                                            i
                                                        "
                                                        class="swatch-floating-panel"
                                                        :style="currentFloatingStyle"
                                                        @pointerenter="
                                                            cancelCurrentSwatchLeave()
                                                        "
                                                        @pointerleave="
                                                            onCurrentSwatchLeave()
                                                        "
                                                    >
                                                        <button
                                                            @click="
                                                                onCurrentSwatchEdit(
                                                                    color,
                                                                    i,
                                                                )
                                                            "
                                                            class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                                        >
                                                            <Pencil class="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            @click="
                                                                onCurrentSwatchCopy(
                                                                    color,
                                                                )
                                                            "
                                                            class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                                        >
                                                            <Copy
                                                                class="w-4 h-4"
                                                            />
                                                        </button>
                                                        <button
                                                            @click="
                                                                onCurrentSwatchRemove(
                                                                    color,
                                                                    i,
                                                                )
                                                            "
                                                            class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                                        >
                                                            <Trash2
                                                                class="w-4 h-4 text-destructive"
                                                            />
                                                        </button>
                                                    </div>
                                                </Teleport>
                                            </template>
                                        </div>
                                        <!-- Add current color button -->
                                        <TooltipProvider
                                            key="__add__"
                                            :delay-duration="200"
                                        >
                                            <Tooltip>
                                                <TooltipTrigger as-child>
                                                    <button
                                                        class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center hover:scale-110 hover:border-primary/60 transition-all"
                                                        @click="addCurrentColor"
                                                    >
                                                        <Plus
                                                            class="w-5 h-5 text-primary/40"
                                                        />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    class="fira-code text-xs"
                                                >
                                                    Add current color ({{
                                                        cssColorOpaque
                                                    }})
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TransitionGroup>
                                    <div
                                        v-if="savedColorStrings.length > 0"
                                        class="flex items-center gap-2"
                                    >
                                        <Input
                                            v-model="currentPaletteName"
                                            :placeholder="
                                                'Palette ' + (savedPalettes.length + 1)
                                            "
                                            class="fira-code text-sm h-8 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            @keydown.enter="saveCurrentPalette"
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            class="fraunces text-sm h-8 cursor-pointer border-primary/30"
                                            :disabled="savedColorStrings.length === 0"
                                            @click="saveCurrentPalette"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                    <div
                                        v-if="duplicateTarget"
                                        class="flex items-center gap-2 flex-wrap"
                                    >
                                        <span class="fira-code text-xs text-muted-foreground italic">
                                            "{{ duplicateTarget.name }}" already exists.
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            class="h-6 px-2 text-xs cursor-pointer fraunces"
                                            @click="confirmUpdatePalette"
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            class="h-6 px-2 text-xs cursor-pointer fraunces"
                                            @click="duplicateTarget = null"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>

                                <PaletteCard
                                    v-for="palette in filteredSaved"
                                    :key="palette.id"
                                    :palette="palette"
                                    :expanded="expandedId === palette.id"
                                    :css-color="cssColorOpaque"
                                    :editable-name="true"
                                    @click="toggleExpand(palette.id)"
                                    @apply="onApply"
                                    @delete="onDelete"
                                    @publish="onPublish"
                                    @rename="onRenameSaved"
                                    @edit-color="onEditColor"
                                />
                                <p
                                    v-if="filteredSaved.length === 0"
                                    class="text-center text-muted-foreground py-4 fira-code text-sm italic"
                                >
                                    No saved palettes yet. Add colors above, then save.
                                </p>
                            </div>
                        </Transition>
                    </TabsContent>

                    <!-- Browse (remote) palettes tab -->
                    <TabsContent value="browse" class="mt-0 w-full">
                        <Transition name="tab-fade" mode="out-in">
                            <div :key="'browse'" class="grid gap-3 pb-3 min-h-[120px]">
                                <div
                                    v-if="browsing"
                                    class="flex items-center justify-center min-h-[120px]"
                                >
                                    <Loader2
                                        class="w-5 h-5 animate-spin text-muted-foreground"
                                    />
                                </div>
                                <template v-else>
                                    <div
                                        class="grid gap-3 transition-opacity duration-200"
                                        :class="{ 'opacity-50': sortLoading }"
                                    >
                                        <PaletteCard
                                            v-for="palette in filteredBrowse"
                                            :key="palette.slug"
                                            :palette="palette"
                                            :expanded="expandedId === palette.id"
                                            :css-color="cssColorOpaque"
                                            :is-owned="session.isOwned(palette.slug)"
                                            @click="toggleExpand(palette.id)"
                                            @apply="onApply"
                                            @save="onSaveRemote"
                                            @vote="onVote"
                                            @rename="onRename"
                                            @edit-color="onEditColor"
                                            @add-color="onSwatchAddColor"
                                        />
                                        <p
                                            v-if="filteredBrowse.length === 0"
                                            class="text-center text-muted-foreground py-8 fira-code text-base italic"
                                        >
                                            No published palettes found.
                                        </p>
                                    </div>
                                </template>
                            </div>
                        </Transition>
                    </TabsContent>

                    <!-- Admin Users tab -->
                    <TabsContent v-if="isAdminAuthenticated" value="admin-users" class="mt-0 w-full">
                        <Transition name="tab-fade" mode="out-in">
                            <div :key="'admin-users'" class="grid gap-3 pb-3">
                                <div v-if="loadingUsers" class="flex items-center justify-center py-8">
                                    <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
                                </div>
                                <template v-else>
                                    <div
                                        v-for="user in filteredAdminUsers"
                                        :key="user.slug"
                                        class="flex items-center gap-3 px-3 py-2.5 rounded-md border border-border"
                                    >
                                        <div class="flex-1 min-w-0">
                                            <span class="fira-code text-sm font-medium block truncate">
                                                {{ user.slug }}
                                            </span>
                                            <span class="fira-code text-xs text-muted-foreground">
                                                {{ user.paletteCount ?? 0 }} palettes
                                            </span>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            class="h-7 px-2 cursor-pointer fraunces text-xs"
                                            @click="onImpersonate(user.slug)"
                                        >
                                            Impersonate
                                        </Button>
                                    </div>
                                    <p v-if="filteredAdminUsers.length === 0" class="text-center text-muted-foreground py-6 fira-code text-sm italic">
                                        No users found.
                                    </p>
                                </template>
                            </div>
                        </Transition>
                    </TabsContent>

                    <!-- Admin Palettes tab -->
                    <TabsContent v-if="isAdminAuthenticated" value="admin-palettes" class="mt-0 w-full">
                        <Transition name="tab-fade" mode="out-in">
                            <div :key="'admin-palettes'" class="grid gap-3 py-2">
                                <p class="fira-code text-sm text-muted-foreground italic">
                                    Enter a palette slug above, then Feature or Delete.
                                </p>
                            </div>
                        </Transition>
                    </TabsContent>

                    <!-- Admin Colors tab -->
                    <TabsContent v-if="isAdminAuthenticated" value="admin-colors" class="mt-0 w-full">
                        <Transition name="tab-fade" mode="out-in">
                            <div :key="'admin-colors'" class="grid gap-3 pb-3">
                                <div v-if="loadingColorQueue" class="flex items-center justify-center py-8">
                                    <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
                                </div>
                                <div
                                    v-else-if="filteredColorQueue.length === 0"
                                    class="text-center text-muted-foreground py-6 fira-code text-sm italic"
                                >
                                    No pending proposals.
                                </div>
                                <div v-else class="grid gap-2">
                                    <div
                                        v-for="item in filteredColorQueue"
                                        :key="item.id"
                                        class="flex items-center gap-3 px-3 py-2 rounded-md border border-border"
                                    >
                                        <div
                                            class="w-6 h-6 rounded-full shrink-0"
                                            :style="{ backgroundColor: item.css }"
                                        ></div>
                                        <div class="flex-1 min-w-0">
                                            <span class="fira-code text-sm font-medium truncate block">{{ item.name }}</span>
                                            <span class="fira-code text-xs text-muted-foreground">{{ item.css }}</span>
                                        </div>
                                        <div class="flex items-center gap-1.5 shrink-0">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                class="h-7 px-2 cursor-pointer"
                                                @click="onApproveColor(item)"
                                            >
                                                <Check class="w-3.5 h-3.5" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                class="h-7 px-2 cursor-pointer"
                                                @click="onRejectColor(item)"
                                            >
                                                <XIcon class="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </TabsContent>

                </Tabs>
            </div>

            <MigratePalettesDialog
                v-model:open="showMigrateDialog"
                :count="savedPalettes.length"
                :mode="migrateMode"
                @respond="onMigrateRespond"
            />
        </DialogScrollContent>
    </Dialog>
</template>

<script setup lang="ts">
import {
    ref,
    reactive,
    computed,
    watch,
    nextTick,
    Transition,
    TransitionGroup,
} from "vue";
import {
    Dialog,
    DialogScrollContent,
    DialogDescription,
    DialogTitle,
} from "@components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@components/ui/hover-card";
import {
    Loader2,
    Shield,
    Plus,
    Pencil,
    Copy,
    Trash2,
    Check,
    X as XIcon,
    MoreHorizontal,
    LogIn,
    RefreshCw,
} from "lucide-vue-next";
import { createSlug } from "@lib/palette/utils";

import { copyToClipboard } from "@composables/useClipboard";
import { usePaletteStore } from "@composables/usePaletteStore";
import { useSession } from "@composables/useSession";
import { useAdminAuth } from "@composables/useAdminAuth";
import { useUserAuth } from "@composables/useUserAuth";
import {
    listPalettes,
    listUsers,
    impersonateUser,
    featurePalette,
    deletePaletteAdmin,
    publishPalette,
    votePalette,
    renamePalette,
    getAdminQueue,
    approveColorName,
    rejectColorName,
} from "@lib/palette/api";
import type { Palette, PaletteColor, User, ProposedColorName } from "@lib/palette/types";
import PaletteCard from "./PaletteCard.vue";
import MigratePalettesDialog from "./MigratePalettesDialog.vue";
import SortFilterMenu from "./SortFilterMenu.vue";
import { WatercolorDot } from "@components/custom/watercolor-dot";

const props = defineProps<{
    savedColorStrings: string[];
    cssColor: string;
    cssColorOpaque: string;
    editingExit?: boolean;
    editingEnter?: boolean;
}>();

const emit = defineEmits<{
    apply: [colors: string[]];
    addColor: [css: string];
    startEdit: [target: { paletteId: string; colorIndex: number; originalCss: string }];
}>();

type TabValue = "saved" | "browse" | "admin-users" | "admin-palettes" | "admin-colors";

const openModel = defineModel<boolean>("open", { default: false });
const activeTab = ref<TabValue>("saved");
const searchQuery = ref("");
const expandedId = ref<string | null>(null);
const browsing = ref(false);
const sortLoading = ref(false);
const remotePalettes = ref<Palette[]>([]);
const sortMode = ref<"newest" | "popular">("newest");
const showMigrateDialog = ref(false);
const migrateMode = ref<"switch" | "regenerate">("switch");
const pendingMigrateAction = ref<((choice: "publish" | "transfer" | "discard") => Promise<void>) | null>(null);
const duplicateTarget = ref<Palette | null>(null);

const session = useSession();
const { isAuthenticated: isAdminAuthenticated, getToken: getAdminToken, login: adminLogin } = useAdminAuth();
const { userSlug, isLoggedIn, ensureUser, login: userLogin, logout: userLogout } = useUserAuth();

// Auto-register user when dialog opens if no slug exists
watch(openModel, (open) => {
    if (open) {
        ensureUser().catch((e: any) => {
            console.warn("Auto-register failed:", e?.message);
        });
    }
});

const searchPlaceholder = computed(() => {
    switch (activeTab.value) {
        case "admin-users": return "Search users...";
        case "admin-palettes": return "Palette slug...";
        case "admin-colors": return "Search color names...";
        default: return "Search palettes...";
    }
});

// Admin state
const adminUsers = ref<User[]>([]);
const loadingUsers = ref(false);
const adminColorQueue = ref<ProposedColorName[]>([]);
const loadingColorQueue = ref(false);

const {
    savedPalettes,
    createPalette,
    updatePalette,
    deletePalette,
    addPublishedPalette,
} = usePaletteStore();

// Current palette save
const currentPaletteName = ref("");

function addCurrentColor() {
    const existingIdx = props.savedColorStrings.indexOf(props.cssColorOpaque);
    if (existingIdx !== -1 && props.savedColorStrings.length > 1) {
        const reordered = props.savedColorStrings.filter((_, i) => i !== existingIdx);
        reordered.push(props.cssColorOpaque);
        emit("apply", reordered);
        return;
    }
    if (existingIdx !== -1) {
        return;
    }
    emit("addColor", props.cssColorOpaque);
}

// Stable keys for TransitionGroup — tracks color identity across add/remove
let swatchKeyCounter = 0;
const swatchKeyMap = new Map<string, number>();
const swatchKeys = computed(() =>
    props.savedColorStrings.map((color, i) => {
        const mapKey = `${color}::${i}`;
        if (!swatchKeyMap.has(mapKey)) {
            swatchKeyMap.set(mapKey, swatchKeyCounter++);
        }
        return swatchKeyMap.get(mapKey)!;
    }),
);
// Clean stale keys when the list changes
watch(
    () => props.savedColorStrings,
    () => {
        const validKeys = new Set(props.savedColorStrings.map((c, i) => `${c}::${i}`));
        for (const key of swatchKeyMap.keys()) {
            if (!validKeys.has(key)) swatchKeyMap.delete(key);
        }
    },
);

const currentSwatchPopoverIndex = ref<number | null>(null);
let currentSwatchHoverTimer: ReturnType<typeof setTimeout> | null = null;
const canHover =
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

// Floating panel positioning (hover devices only)
const currentFloatingStyle = reactive({ top: "0px", left: "0px" });

function positionCurrentFloatingPanel(el: Element) {
    const rect = el.getBoundingClientRect();
    currentFloatingStyle.top = `${rect.top - 42}px`;
    currentFloatingStyle.left = `${rect.left + rect.width / 2}px`;
}

// Touch: let Popover handle open/close natively
function onCurrentSwatchPopoverUpdateTouch(open: boolean, index: number) {
    currentSwatchPopoverIndex.value = open ? index : null;
}

// Hover: pointer events drive everything
function onCurrentSwatchHover(index: number, e: PointerEvent) {
    if (!canHover || e.pointerType === "touch") return;
    cancelCurrentSwatchLeave();
    currentSwatchPopoverIndex.value = index;
    nextTick(() => positionCurrentFloatingPanel(e.currentTarget as Element));
}

function onCurrentSwatchClick(index: number) {
    cancelCurrentSwatchLeave();
    if (currentSwatchPopoverIndex.value === index) {
        currentSwatchPopoverIndex.value = null;
    } else {
        currentSwatchPopoverIndex.value = index;
    }
}

function onCurrentSwatchLeave() {
    if (!canHover) return;
    currentSwatchHoverTimer = setTimeout(() => {
        currentSwatchPopoverIndex.value = null;
    }, 250);
}

function cancelCurrentSwatchLeave() {
    if (currentSwatchHoverTimer) {
        clearTimeout(currentSwatchHoverTimer);
        currentSwatchHoverTimer = null;
    }
}

function onCurrentSwatchEdit(css: string, index: number) {
    currentSwatchPopoverIndex.value = null;
    emit("startEdit", {
        paletteId: "__current__",
        colorIndex: index,
        originalCss: css,
    });
}

function onCurrentSwatchCopy(css: string) {
    currentSwatchPopoverIndex.value = null;
    copyColor(css);
}

function onCurrentSwatchRemove(css: string, index: number) {
    currentSwatchPopoverIndex.value = null;
    const updated = props.savedColorStrings.filter((_, i) => i !== index);
    emit("apply", updated);
}

function onSwatchAddColor(css: string) {
    emit("addColor", css);
}

function saveCurrentPalette() {
    if (props.savedColorStrings.length === 0) return;
    const name =
        currentPaletteName.value.trim() || `Palette ${savedPalettes.value.length + 1}`;

    // Check for duplicate name
    const existing = savedPalettes.value.find(
        (p) => p.name.toLowerCase() === name.toLowerCase(),
    );
    if (existing) {
        duplicateTarget.value = existing;
        return;
    }

    const palette = createPalette(name, colorsFromStrings(props.savedColorStrings));
    currentPaletteName.value = "";
    duplicateTarget.value = null;
    expandedId.value = palette.id;
}

function confirmUpdatePalette() {
    if (!duplicateTarget.value) return;
    updatePalette(duplicateTarget.value.id, {
        colors: colorsFromStrings(props.savedColorStrings),
    });
    currentPaletteName.value = "";
    expandedId.value = duplicateTarget.value.id;
    duplicateTarget.value = null;
}

function copyColor(css: string) {
    copyToClipboard(css);
}

function onEditColor(palette: Palette, colorIndex: number, css: string) {
    emit("startEdit", { paletteId: palette.id, colorIndex, originalCss: css });
}

// Exposed method for parent to call when committing edits
function commitColorEdit(paletteId: string, colorIndex: number, newCss: string) {
    if (paletteId === "__current__") {
        const oldCss = props.savedColorStrings[colorIndex];
        if (oldCss === newCss) return;
        const updated = [...props.savedColorStrings];
        updated[colorIndex] = newCss;
        emit("apply", updated);
        return;
    }

    const palette =
        savedPalettes.value.find((p) => p.id === paletteId) ??
        remotePalettes.value.find((p) => p.id === paletteId);
    if (!palette) return;

    const oldCss = palette.colors[colorIndex]?.css;
    if (oldCss === newCss) return;

    const updatedColors = [...palette.colors];
    updatedColors[colorIndex] = { ...updatedColors[colorIndex], css: newCss };
    updatePalette(paletteId, { colors: updatedColors });
}

defineExpose({ commitColorEdit });

function toggleExpand(id: string) {
    expandedId.value = expandedId.value === id ? null : id;
}

function isTeleportedTarget(event: any): boolean {
    const target = event.detail?.originalEvent?.target ?? event.target;
    return target instanceof HTMLElement && !!(
        target.closest('[data-reka-popper-content-wrapper]') ||
        target.closest('.card-menu-panel') ||
        target.closest('.swatch-floating-panel')
    );
}

function onPointerDownOutside(event: any) {
    // Prevent dialog close only when clicking on teleported floating panels (popovers,
    // hover cards, menus) that live outside the dialog DOM tree but are logically "inside" it.
    if (isTeleportedTarget(event)) {
        event.preventDefault();
    }
}

function onInteractOutside(event: any) {
    // interact-outside fires for focus-loss too (e.g. when a popover closes).
    // Prevent it unless it's a genuine pointer event on the overlay.
    if (isTeleportedTarget(event)) {
        event.preventDefault();
        return;
    }
    // For focus-loss events (no pointer), always prevent — it's from a closing popover/menu
    const originalEvent = event.detail?.originalEvent;
    if (!originalEvent || originalEvent.type === 'focusin' || originalEvent.type === 'focus') {
        event.preventDefault();
    }
}

function onDotClick() {
    copyToClipboard(props.cssColorOpaque);
}

const filteredSaved = computed(() => {
    const q = searchQuery.value.toLowerCase();
    if (!q) return savedPalettes.value;
    return savedPalettes.value.filter(
        (p) => p.name.toLowerCase().includes(q) || p.slug.includes(q),
    );
});

const filteredBrowse = computed(() => {
    const q = searchQuery.value.toLowerCase();
    if (!q) return remotePalettes.value;
    return remotePalettes.value.filter(
        (p) => p.name.toLowerCase().includes(q) || p.slug.includes(q),
    );
});

const filteredAdminUsers = computed(() => {
    const q = searchQuery.value.toLowerCase();
    if (!q) return adminUsers.value;
    return adminUsers.value.filter((u) => u.slug.toLowerCase().includes(q));
});

async function loadRemotePalettes(isSort = false) {
    if (!isSort) {
        browsing.value = true;
    } else {
        sortLoading.value = true;
    }
    try {
        const res = await listPalettes(50, 0, sortMode.value);
        remotePalettes.value = res.data;
    } catch (e) {
        console.warn("Failed to load remote palettes:", e);
    } finally {
        browsing.value = false;
        sortLoading.value = false;
    }
}

function onSortChange(value: string) {
    if (!value) return;
    sortMode.value = value as "newest" | "popular";
    loadRemotePalettes(true);
}

watch(activeTab, (tab) => {
    if (tab === "browse" && remotePalettes.value.length === 0) {
        loadRemotePalettes();
    }
    if (tab === "admin-users" && adminUsers.value.length === 0) {
        loadAdminUsers();
    }
    if (tab === "admin-colors" && adminColorQueue.value.length === 0) {
        loadColorQueue();
    }
});

watch(isAdminAuthenticated, (auth) => {
    if (!auth && activeTab.value.startsWith("admin-")) {
        activeTab.value = "saved";
    }
});

// Admin functionality
async function loadAdminUsers() {
    const token = getAdminToken();
    if (!token) return;
    loadingUsers.value = true;
    try {
        const res = await listUsers(token, 50);
        adminUsers.value = res.data;
    } catch (e) {
        console.warn("Failed to load users:", e);
    } finally {
        loadingUsers.value = false;
    }
}

async function onImpersonate(slug: string) {
    const token = getAdminToken();
    if (!token) return;
    try {
        const res = await impersonateUser(token, slug);
        console.warn(`Impersonating ${slug} — token: ${res.token.slice(0, 8)}...`);
    } catch (e: any) {
        console.warn("Failed to impersonate:", e?.message);
    }
}

async function onAdminFeature() {
    const token = getAdminToken();
    if (!token) return;
    const slug = searchQuery.value.trim();
    if (!slug) return;
    try {
        await featurePalette(token, slug);
        searchQuery.value = "";
    } catch (e: any) {
        console.warn("Failed to feature palette:", e?.message);
    }
}

async function onAdminDelete() {
    const token = getAdminToken();
    if (!token) return;
    const slug = searchQuery.value.trim();
    if (!slug) return;
    try {
        await deletePaletteAdmin(token, slug);
        searchQuery.value = "";
    } catch (e: any) {
        console.warn("Failed to delete palette:", e?.message);
    }
}

// Admin color queue
async function loadColorQueue() {
    const token = getAdminToken();
    if (!token) return;
    loadingColorQueue.value = true;
    try {
        adminColorQueue.value = await getAdminQueue(token);
    } catch (e: any) {
        console.warn("Failed to load color queue:", e?.message);
    } finally {
        loadingColorQueue.value = false;
    }
}

const filteredColorQueue = computed(() => {
    const q = searchQuery.value.toLowerCase();
    if (!q) return adminColorQueue.value;
    return adminColorQueue.value.filter(
        (item) => item.name.toLowerCase().includes(q) || item.css.toLowerCase().includes(q),
    );
});

async function onApproveColor(item: ProposedColorName) {
    const token = getAdminToken();
    if (!token) return;
    try {
        await approveColorName(token, item.id);
        adminColorQueue.value = adminColorQueue.value.filter((q) => q.id !== item.id);
    } catch (e: any) {
        console.warn("Failed to approve:", e?.message);
    }
}

async function onRejectColor(item: ProposedColorName) {
    const token = getAdminToken();
    if (!token) return;
    try {
        await rejectColorName(token, item.id);
        adminColorQueue.value = adminColorQueue.value.filter((q) => q.id !== item.id);
    } catch (e: any) {
        console.warn("Failed to reject:", e?.message);
    }
}

// --- Inline slug management ---

const slugEditMode = ref(false);
const slugMenuOpen = ref(false);
const slugInput = ref("");
const slugSwitching = ref(false);
const slugError = ref("");
const slugInputRef = ref<InstanceType<typeof Input> | null>(null);

function onCopySlug() {
    if (userSlug.value) copyToClipboard(userSlug.value);
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

async function publishAllLocal() {
    try {
        await session.ensureSession();
        for (const palette of savedPalettes.value) {
            try {
                await publishPalette({
                    name: palette.name,
                    slug: palette.slug,
                    colors: palette.colors,
                });
                session.markOwned(palette.slug);
            } catch {
                // Skip failures (e.g. duplicate slugs)
            }
        }
    } catch (e) {
        console.warn("Publish all failed:", e);
    }
}

async function onSlugSwitch() {
    const raw = slugInput.value.trim();
    if (!raw) return;
    slugSwitching.value = true;
    slugError.value = "";
    try {
        const normalized = normalizeTokenInput(raw).toLowerCase();
        if (looksLikeSlug(normalized)) {
            if (normalized === userSlug.value) {
                slugError.value = "Already signed in as this slug.";
                slugSwitching.value = false;
                return;
            }
            if (savedPalettes.value.length > 0) {
                // Show migrate dialog before switching
                migrateMode.value = "switch";
                pendingMigrateAction.value = async (choice) => {
                    if (choice === "publish") {
                        await publishAllLocal();
                    }
                    await userLogin(normalized);
                    if (choice === "transfer") {
                        await publishAllLocal();
                    }
                    slugInput.value = "";
                    slugEditMode.value = false;
                    activeTab.value = "saved";
                };
                showMigrateDialog.value = true;
                slugSwitching.value = false;
                return;
            }
            await userLogin(normalized);
        } else {
            adminLogin(normalizeTokenInput(raw));
        }
        slugInput.value = "";
        slugEditMode.value = false;
        activeTab.value = "saved";
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

async function onRegenerateSlug() {
    slugMenuOpen.value = false;
    slugEditMode.value = false;
    if (savedPalettes.value.length > 0) {
        migrateMode.value = "regenerate";
        pendingMigrateAction.value = async (choice) => {
            if (choice === "publish") {
                await publishAllLocal();
            }
            await userLogout();
        };
        showMigrateDialog.value = true;
    } else {
        await userLogout();
    }
}

async function onMigrateRespond(choice: "publish" | "transfer" | "discard") {
    const action = pendingMigrateAction.value;
    pendingMigrateAction.value = null;
    if (action) {
        try {
            await action(choice);
        } catch (e: any) {
            console.warn("Migration action failed:", e?.message);
        }
    }
}

function colorsFromStrings(colors: string[]): PaletteColor[] {
    return colors.map((css, i) => ({ css, position: i }));
}

function onApply(palette: Palette) {
    emit(
        "apply",
        palette.colors.map((c) => c.css),
    );
}

function onDelete(palette: Palette) {
    deletePalette(palette.id);
}

async function onPublish(palette: Palette) {
    try {
        await session.ensureSession();
    } catch {
        console.warn("Failed to create session — check your network connection");
        return;
    }
    try {
        await publishPalette({
            name: palette.name,
            slug: palette.slug,
            colors: palette.colors,
        });
        session.markOwned(palette.slug);
    } catch (e: any) {
        const msg = e?.message ?? "";
        console.warn(`Failed to publish: ${msg || "unknown error"}`);
    }
}

function onSaveRemote(palette: Palette) {
    addPublishedPalette(palette);
}

async function onVote(palette: Palette) {
    try {
        await session.ensureSession();
        const result = await votePalette(palette.slug);
        const idx = remotePalettes.value.findIndex((p) => p.slug === palette.slug);
        if (idx !== -1) {
            remotePalettes.value[idx] = {
                ...remotePalettes.value[idx],
                voted: result.voted,
                voteCount: result.voteCount,
            };
        }
    } catch (e) {
        console.warn("Failed to vote:", e);
    }
}

function onRenameSaved(palette: Palette, newName: string) {
    updatePalette(palette.id, { name: newName });
}

async function onRename(palette: Palette, newName: string) {
    try {
        await session.ensureSession();
        const updated = await renamePalette(palette.slug, newName);
        const idx = remotePalettes.value.findIndex((p) => p.slug === palette.slug);
        if (idx !== -1) {
            remotePalettes.value[idx] = {
                ...remotePalettes.value[idx],
                name: updated.name,
            };
        }
    } catch (e: any) {
        console.warn("Failed to rename palette:", e?.message);
    }
}
</script>

<style scoped>
.tabs-scroll-container {
    mask-image: linear-gradient(to right, transparent, black 0.75rem, black calc(100% - 0.75rem), transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 0.75rem, black calc(100% - 0.75rem), transparent);
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
}

.swatch-floating-panel {
    position: fixed;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem;
    border-radius: var(--radius-md);
    border: 1px solid hsl(var(--border));
    background: hsl(var(--popover));
    color: hsl(var(--popover-foreground));
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -2px rgba(0, 0, 0, 0.1);
    transform: translateX(-50%);
    pointer-events: auto;
    animation: swatch-panel-in 0.15s ease-out;
}

@keyframes swatch-panel-in {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(4px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
    }
}

</style>

<style>
/* Smaller, tighter close button inside the dialog portal */
.palette-dialog button.absolute {
    top: 0.875rem;
    right: 0.5rem;
    padding: 0.125rem;
    opacity: 0.35;
    transition: opacity 0.15s ease;
}
.palette-dialog button.absolute:hover {
    opacity: 0.7;
}
.palette-dialog button.absolute svg {
    width: 0.5rem;
    height: 0.5rem;
}
</style>
