<template>
    <!-- S.W4 W4-1 (S-1 + S-14) — TITLE-AS-COMPONENT: the veil capsule, the
         catalog caption, and the per-row index are EXCISED. The space name is
         the plate TITLE — a bare ghost trigger sitting directly on the field
         like every other piece of plate typography. The Select root is
         renderless; the title IS this component's first painted node. -->
    <Select
        v-model:open="openModel"
        :model-value="space"
        @update:model-value="onSelect"
    >
        <!-- The trigger OWNS its face — ALL FOUR AXES (T.W4-1 · O-10a; the
             S-21 law extended to weight): `font-display italic` + the scoped
             font-size/font-weight below live on the trigger's own class list,
             host-independent by construction. WEIGHT rides the :root
             `--type-weight-display` pin (the About-700 inheritance bug —
             t-title-typography F2 — is dead: weight no longer inherits from
             any host heading). SIZE is the ONE sanctioned host prop (F3):
             the picker plate keeps the explicit display-3 rung (Q11a — two
             token steps, ×φ, above the retired audacious/display-1 basis;
             the producer trigger ladder tops out at display-1, so the rung
             lands as the exact shipped token in the scoped block — the P10
             size-station consume is the BOOKED swap); the About host passes
             `inline` and the trigger inks `1em`, riding its sentence (and
             its compositor shrink) by construction. The ink ladder rides
             `--space-title-ink` so the scoped block owns rest/hover/open as
             ONE grammar in both hosts. The caret is the ONLY rest
             affordance — producer-owned glyph; size + nudge are em-relative
             so the affordance holds its optical ratio at every rung (a
             fixed-px caret/underline reads hairline at the ×φ landing). -->
        <!-- Open-state caret (seed rider 1, DISCHARGED-BY-PRODUCER): glass-ui's
             SelectTrigger chevron now keys off the TRIGGER's data-state
             (`in-data-[state=open]:rotate-180`, SelectTrigger.vue — the L18
             letter item, shipped at tranche/BG) on the spring + punch clock.
             The rotation is producer-owned; the demo carries NO consumer
             rotation utility — re-adding one would shadow the shipped fix. -->
        <SelectTrigger
            aria-label="Select color space"
            variant="ghost"
            size="default"
            :style="{ '--space-title-ink': safeAccent }"
            :class="[
                'space-trigger inline-flex w-fit h-fit align-baseline font-display italic tracking-tight select-none [&>span]:overflow-visible [&>span]:line-clamp-none [&>span]:block [&_svg]:translate-y-[0.06em]',
                inline ? 'space-trigger--inline' : '',
            ]"
        >
            <SelectValue class="w-full" />
        </SelectTrigger>
        <!-- The specimen catalog stays — all glass belongs to the dropdown,
             never the title (W4-1 open-state law). Rows are SPECIMEN entries:
             display-face name, WatercolorDot swatch, live per-space
             conversion (identical in both hosts — see the injection note).

             X-W6.f · X:CSS-1 — the rows iterate SPACE_CATALOG_ENTRIES, the
             KEY-PRESERVING catalog list: `row.entry.id` already IS a
             `DisplayColorSpace`, so the render-boundary cast that `Object.entries`
             forced (its keys widen to `string`) is unspellable here rather than
             merely removed. -->
        <!-- X.W12.t · UIA-V-5 — the list never leaves a phone screen: it is
             capped at reka's own available width (the collision-bounded room
             the floating layer measures), and the caption's char-budget box
             yields to that cap (`min(…, 100%)`) so its `truncate` applies. -->
        <SelectContent
            align="start"
            class="max-w-(--reka-select-content-available-width)"
        >
            <SelectGroup>
                <SelectItem
                    v-for="row in rows"
                    :key="row.entry.id"
                    :value="row.entry.id"
                    :data-space="row.entry.id"
                    hide-indicator
                    class="pl-3 pr-4 py-2"
                >
                    <!-- Default slot = SelectItemText: the display-face
                         name ONLY (reka's SelectValue clones this node
                         into the trigger — the swatch/conversion must
                         stay in the #description row). T-40a (T.W6.5 row
                         10): the letterform is NON-BOLD by the owner's word
                         — the weight pin lives on `.specimen-name` below;
                         the former selected-row `font-semibold` dies with
                         the bold (selection speaks through the specimen
                         dot's idle-opacity step, never through weight). -->
                    <span
                        class="specimen-name font-display italic text-title leading-tight"
                    >{{ row.entry.label }}</span>
                    <template #description>
                        <span class="flex items-center gap-2 min-w-0">
                            <!-- X-W6.f · f8 — EIGHTEEN DOTS, EIGHTEEN
                                 SILHOUETTES. `seed` is the producer's own
                                 shape/wet-edge PRNG salt: seeding it with the
                                 space id gives each row its own border-radius
                                 silhouette AND its own feTurbulence seed
                                 (identical `seed 240` across all 18 was the
                                 defect). The dead `tag` prop — WatercolorDot
                                 declares no such prop — is deleted. -->
                            <WatercolorDot
                                :color="cssColor"
                                :seed="row.entry.id"
                                class="specimen-dot shrink-0"
                                :class="space === row.entry.id ? '' : 'specimen-dot-idle'"
                            />
                            <span
                                v-if="row.specimen"
                                class="specimen-caption fira-code text-mono-caption lowercase truncate"
                                :data-specimen-form="row.specimen.form"
                                :data-out-of-gamut="String(row.specimen.outOfGamut)"
                                :style="{ '--specimen-char-budget': SPECIMEN_CHAR_BUDGET }"
                                :title="
                                    row.specimen.outOfGamut
                                        ? `Outside ${row.entry.label}'s gamut — shown as measured, not mapped`
                                        : undefined
                                "
                            >
                                {{ row.specimen.text }}
                            </span>
                        </span>
                    </template>
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>

<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@mkbabb/glass-ui/select";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import { computed, inject } from "vue";
import { resolveColorSpace } from "./color-model";
import type { DisplayColorSpace } from "./color-model";
import { SPACE_CATALOG, SPACE_CATALOG_ENTRIES } from "./space-catalog";
import { SPECIMEN_CHAR_BUDGET, formatSpecimen } from "./format-color";
import { COLOR_MODEL_KEY, SAFE_ACCENT_KEY } from "./keys";

const { cssColor, inline = false } = defineProps<{
    cssColor: string;
    /** The ONE sanctioned host axis (T.W4-1 · S-21 restated): `inline` hosts
     *  (the About sentence) ink `1em` and ride the sentence's rung + shrink;
     *  the default is the picker plate's explicit display-3 rung (Q11a). */
    inline?: boolean;
}>();

/**
 * X-W6.f · X:CSS-1 (f7) — THE BOUNDARY IS THE DOMAIN TYPE. The former wide
 * `modelValue: string` prop plus its hand-written emit let every host bind a
 * bare string and widen the payload back to `any` in its handler; all three
 * holes were spellable because the contract was. `defineModel<DisplayColorSpace>`
 * makes them unspellable: a host binding a non-member is a compile error, which
 * is why f7's evidence is `vue-tsc` plus a `@ts-expect-error` witness and never
 * lint (eslint exits 0 with all three holes present).
 */
const space = defineModel<DisplayColorSpace>({ required: true });
const openModel = defineModel<boolean>("open", { required: true });

const safeAccent = inject(SAFE_ACCENT_KEY)!;

// The color-model injection (the S-1 parity half): since S.W2's transposition
// App provides the ONE pipeline app-wide (COLOR_MODEL_KEY, App.vue), so BOTH
// hosts — the picker and About — resolve the same instance ambiently and the
// specimen rows carry the live per-space conversion identically. The default
// stays null-tolerant: a future host outside any provider renders the catalog
// without the conversion line rather than crashing. (Adjudicated deliberate —
// ColorSpaceSelector L-5(b): SAFE_ACCENT_KEY and COLOR_MODEL_KEY carry
// different criticality, and this asymmetry is the house contract, not a
// masking fallback.)
const colorModel = inject(COLOR_MODEL_KEY, null);

/**
 * The catalog rows. Each carries its own `DisplayColorSpace` and — when a
 * pipeline is present — the ONE specimen for the live colour in that space:
 * one call, one digit policy, one declared grammar, gamut measured and marked.
 *
 * X.W12.a · OA-19 — the specimens compute ONLY while the menu is open. The
 * producer Select keeps its items rendered while closed (SelectValue reads the
 * selected item's text), so the former "SelectContent unmounts when closed"
 * premise was false at the bytes: every drag frame re-ran eighteen per-space
 * conversions in each of the two hosts — the kelvin inverse among them, a
 * 39,001-step search — and the drag trace named it the top JS cost. The rows
 * (and the SelectValue text) stay; only the live conversion line waits for
 * the menu that shows it.
 */
const rows = computed(() => {
    const color = colorModel && openModel.value ? colorModel.model.value.color : null;
    return SPACE_CATALOG_ENTRIES.map((entry) => ({
        entry,
        specimen: color ? formatSpecimen(color, entry.id) : null,
    }));
});

/**
 * X-W6.f · X:CSS-1 (f9) — ONE COMMAND, ONE HOME. The space switch used to be
 * two halves in two files: this component emitted a bare string, and a WATCHER
 * in a peer component (`ColorPicker.vue`) noticed the model had changed and
 * converted the colour. The control did not own its own command, and About —
 * which hosts the same control — only worked because the picker happened to be
 * mounted beside it. The switch lands here, once: the model takes the new
 * space, then the pipeline's own `updateToColorSpace` converts the live colour
 * into it. `updateModel` writes the ONE ref synchronously
 * (`useColorPipeline.ts`), so the conversion reads the space just set.
 */
function onSelect(value: string | number) {
    if (!isDisplayColorSpace(value)) return;
    space.value = value;
    colorModel?.updateToColorSpace(resolveColorSpace(value));
    openModel.value = false;
}

/**
 * The producer boundary. `Select` declares its payload as `string | number`,
 * because it knows nothing about colour spaces; the catalog is what turns one
 * into a `DisplayColorSpace`. A GUARD, not a cast — it discharges the claim at
 * runtime against the same total record the options were rendered from, so it
 * cannot drift from them and nothing outside the union can reach the model. The
 * false branch is unreachable by construction (every option IS a catalog key);
 * it exists because the producer's type permits a value the catalog does not,
 * and silently ignoring such a value is the only answer that invents nothing.
 */
function isDisplayColorSpace(value: string | number): value is DisplayColorSpace {
    return typeof value === "string" && value in SPACE_CATALOG;
}
</script>

<style scoped>
/* W4-1 — the full affordance grammar, bound.
 *
 * REST: the title ink sits just shy of full strength (86% alpha of the
 * safeAccent) so hover has somewhere to deepen TO; the caret is the only
 * affordance — no background, border, radius, padding rhythm, or shadow.
 *
 * HOVER (hover-capable pointers only): the editorial link grammar — the ink
 * deepens to full strength and a 1px underline in the same ink enters at 3px
 * offset, AS INK (text-decoration-color fade), never as surface. The
 * letterforms never move; the decoration box is present from rest
 * (transparent), so zero layout shift. A hover that paints a background/veil
 * is a named regression of W4-1 itself.
 *
 * OPEN: the title HOLDS the hover ink (data-state="open"); the caret's 180°
 * rotation is producer-owned (glass-ui SelectTrigger chevron — spring clock,
 * PRM re-aliased). All glass belongs to the SelectContent.
 *
 * Reduced motion: the global PRM guard (animations.css) neutralises these
 * transition durations; states still land instantly as ink.
 */
.space-trigger {
    color: color-mix(in srgb, var(--space-title-ink) 86%, transparent);
    transition: color var(--duration-fast) var(--ease-standard);
    /* T.W4-1 — the ×φ landing (Q11a: the glass-ui ladder is the sizing
     * AUTHORITY; two token steps = one full golden rung). The producer
     * trigger's size grammar tops out at audacious→display-1, so the plate
     * rung lands HERE as the exact shipped token — never a minted value —
     * on the trigger's own class list (unlayered scoped beats the layered
     * `text-dropdown` utility the producer size rung feeds). BOOKED SWAP:
     * retires onto the P10 SelectTrigger size station the day it ships. */
    /* T.W8-WR-4 (T-51) — THE TITLE STEP-DOWN: the owner's "the 'lab' text
     * should be a bit smaller, go down a golden-typography step by 1 or 2"
     * brackets the T-2 "1.5× bigger" ruling from BOTH sides. The LANDED
     * default steps down ONE golden rung — `--type-display-3` (67.78px @1440)
     * → `--type-display-2` (53.28px @1440); zero mint, Q11a working exactly as
     * ruled (the token ladder is the sizing authority). The far bracket pole
     * (down two, `--type-display-1` = 41.89px @1440) rides the roster —
     * owner-judged. The step-down also shrinks the header band, easing the
     * title↔readout seam (the WR-4 seam half lands in ColorComponentDisplay). */
    font-size: var(--type-display-2);
    /* The non-bold edict, host-independent BY CONSTRUCTION (the F2 kill:
     * About's h3 700 can no longer reach the trigger through inheritance).
     * Rides the :root pin — the P10 weight-tokenization booked swap. */
    font-weight: var(--type-weight-display);
    /* Em-relative caret gutter (was gap-2 = 0.19em at the display-1 basis —
     * the same optical ratio carried up the rung). */
    gap: 0.19em;
    /* The excision, enforced (seed rider 2): the producer's control padding
     * (`px-3 py-2`) must NOT survive — the title sits flush with the plate's
     * typography grid. This SCOPED block outranks the utility list (unlayered
     * beats @layer utilities); glass-ui's slim `cn` does not resolve a p-0
     * against the producer's px-3. The bottom is descender room for the
     * italic face, not a padding rhythm — em-relative so it scales with the
     * rung (0.095em ≈ the 0.25rem it carried at the display-1 basis). */
    padding: 0 0 0.095em;
    margin: 0;
    /* X.W12.t · OA-54 / UIA-V-479 — the caret is the text trigger's rest
     * affordance ("hover and press affordance comes from ink and the
     * chevron"): glass's chevron reads its alpha from this token (0.5 at
     * 7.0.0), so the caret draws in the title's own ink, not a faint tint. */
    --select-chevron-opacity: 1;
}

/* The inline host (About): the trigger rides its SENTENCE — size 1em means
 * the member inherits the h3's rung AND its compositor shrink with zero
 * per-host keyframe wiring (t-title-typography F3's desync cure). */
.space-trigger--inline {
    font-size: 1em;
}

/* Em-relative caret (T.W4-1): the producer chevron ships h-4/w-4 fixed px —
 * at the ×φ title that reads as a shrunken foreign glyph. 0.382em (φ⁻²) is
 * today's exact optical ratio (1rem at the 41.89px display-1 cap), carried
 * as a ratio so both hosts and every band keep the same caret weight. */
.space-trigger :deep(svg) {
    width: 0.382em;
    height: 0.382em;
}

/* text-decoration does not propagate into flex items — the underline lives
 * on the cloned SelectValue label span itself. Thickness/offset are
 * EM-RELATIVE (T.W4-1): the 1px/3px pair read hairline at the ×φ landing —
 * 0.024em/0.072em are the same pair expressed as the display-1-basis ratio,
 * so the editorial link grammar holds its weight at every rung. */
.space-trigger > :deep(span) {
    text-decoration-line: underline;
    text-decoration-thickness: 0.024em;
    text-underline-offset: 0.072em;
    text-decoration-color: transparent;
    transition: text-decoration-color var(--duration-fast) var(--ease-standard);
}

@media (hover: hover) {
    .space-trigger:hover {
        color: var(--space-title-ink);
    }
    .space-trigger:hover > :deep(span) {
        text-decoration-color: currentColor;
    }
}

.space-trigger[data-state="open"] {
    color: var(--space-title-ink);
}
.space-trigger[data-state="open"] > :deep(span) {
    text-decoration-color: currentColor;
}

/* X.W12.t · OA-54 / UIA-V-480 — THE FOCUS RING, ON THE FIELD CORNER. The
 * ring is glass's own token, `--focus-ring-shadow`. It is re-applied here
 * because glass 7.0.0's ghost arm composes `shadow-none` (a utility) over its
 * own `.focus-ring:focus-visible` rule, so without this line the text trigger
 * shows NO focus ring at all (measured: every box-shadow layer transparent;
 * relayed with the text-trigger gap). The CORNER is the unit's ruling: glass's
 * ring rides `--radius-pill`, and a stadium around a display-type title is the
 * shape the owner ruled out ("the large dropdowns should not be so rounded").
 * The text trigger's only surface is its focus ring, so it takes the
 * large-holder role token `--radius-field` (glass DESIGN.md radius table;
 * O-58), never the `--radius-md` scale step it carried. */
.space-trigger:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
    border-radius: var(--radius-field);
}

.specimen-dot {
    width: 0.875rem;
    height: 0.875rem;
    display: inline-block;
}
.specimen-dot-idle {
    opacity: 0.35;
}

/* T-40a (T.W6.5 row 10) — "Dropdown options should not be bold" (§0.6
 * t33-audit-06). Root: glass-ui's `text-title` @utility hardcodes
 * `font-weight: 700` (semantic.css:132) — a UTILITY hardcode, not a token.
 * The W4-1 idiom, applied to the option letterforms: the surface's OWN class
 * list pins the display weight through the `:root --type-weight-display` pin
 * (= 400, style.css) — unlayered scoped beats the layered utility. BOOKED
 * SWAP: the pin retires the day P10 weight-tokenization lands (the producer
 * cure). The pin travels with reka's SelectValue clone into the trigger by
 * construction (the class rides the node). */
.specimen-name {
    font-weight: var(--type-weight-display);
}

/* T.W6.5 row 8 — the `opacity-60` guard-then-alpha survivor dies (§5.2: the
 * F-4 class W3-5 killed elsewhere). The specimen conversion line speaks the
 * CERTIFIED de-emphasis rung — the D6 contract's stamped token — never a
 * post-hoc alpha over an already-resolved ink. */
.specimen-caption {
    color: var(--ink-muted, var(--muted-foreground));

    /* X-W6.f · X:CSS-1 (f4) — THE BOX IS SIZED BY THE DIGIT POLICY.
     *
     * The caption used to sit in a hand-picked `max-w-[16rem]` — a 234px box
     * that 16 of 18 rows overflowed, worst 723px, every one of them silently
     * ellipsised by `truncate`. The width is now DERIVED: the box is exactly
     * `SPECIMEN_CHAR_BUDGET` characters wide, and the budget is the measured
     * maximum the one digit policy can emit (specimen-format.ts). Text and box
     * are therefore sized by the same number and cannot drift apart — no px
     * literal to re-tune when a space or a digit changes.
     *
     * `1ch` is the advance of `0`, which in a monospaced face IS the advance of
     * every glyph — so the `ch` arithmetic is exact ONLY with the caps tracking
     * off. That tracking comes from `text-mono-caption`, the UPPERCASE CAPTION
     * token (the row already overrides its `text-transform` with `lowercase`);
     * a caption's 0.1em letter-spacing does not belong on a lowercase mono
     * DATA line, and removing it is the same correction, finished. NOTHING
     * SHRINKS: the type rung is untouched — the box grew to hold the sentence,
     * the sentence was not shrunk to fit the box. */
    letter-spacing: normal;
    max-width: min(calc(var(--specimen-char-budget) * 1ch), 100%);
}
</style>
