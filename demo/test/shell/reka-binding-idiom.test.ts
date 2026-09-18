// SERVED MODEL: claude-opus-5[1m]
//
// X-W1 · X.W1.a — R9 (SearchFilterBar SFB-19) / NG-6: **the producer's own
// render-effect canary, adopted on the consumer side.**
//
// THE IDIOM, in the producer's words
// (`tests/components/ui/reka-binding-idiom.test.ts:1-10` in the glass-ui repo):
//
//   > AW.W26 — the binding-correctness render-effect canary.
//   > Stale reka prop/emit bindings (`:pressed`, `v-model:search-term`, `tag=`)
//   > silently no-op — **vue-tsc + units MISS them**; only a render-effect probe
//   > catches it. This spec mounts the at-risk model bindings and asserts the
//   > RENDERED EFFECT each binding drives (the `data-state` / `aria-pressed` /
//   > rendered value), NOT the type.
//
// The producer wrote the epistemic claim down, built the probe, and shipped it.
// The consumer never adopted it: `reka-binding-idiom` appeared in ZERO of
// `test/`, `demo/test/` and `e2e/`. R9 splits the cure — *"adopt the assertion
// shape → X-W1; publish as a consumer-facing contract → BH relay"*. This file
// is the adoption. The relay is the receipt's.
//
// WHY A TYPE GATE CANNOT DO THIS. `tsconfig.demo.json` resolves glass-ui through
// its published `dist/` under `skipLibCheck` — its own header says *"the demo
// typecheck sees ZERO foreign errors"*. That trust boundary is what keeps
// `npx vue-tsc -p tsconfig.demo.json --noEmit` at zero diagnostics over a
// binding that no-ops at runtime. A render-effect probe crosses the boundary a
// typecheck cannot.
//
// WHAT THIS MEASURED, and it is not hypothetical. MEASURED 2026-09-18 in the
// installed producer bytes (`node_modules/@mkbabb/glass-ui/dist/glass-ui.js`,
// `src/components/checkbox/Checkbox.vue`): `Checkbox` declares
// `props: { modelValue, defaultValue, disabled, value, id, class, asChild, as,
// name, required }` and `emits: ["update:modelValue"]`. It declares **no
// `checked` prop and no `update:checked` emit.**
// `SearchFilterBar.vue:52-53` passes `:checked="selectedTags.includes(tag.name)"`
// and listens to `@update:checked="toggleTag(tag.name)"`. Both bindings are
// STALE: the box never reflects the filter state, and toggling it never reaches
// `toggleTag`. Every existing gate is green over it.
//
// The cure is the consumer's binding (`demo/`, this wave's Triumvirate trigger),
// so it is ROUTED. The canary is the gate, and it is born-RED on the second
// case below.
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Checkbox } from "../../ui/checkbox";

describe("NG-6 · the reka binding-correctness canary", () => {
    it("the RENDERED EFFECT follows the model binding — the idiom itself", () => {
        // The producer's own Checkbox case, three lines, adopted verbatim in
        // shape: mount both states and read `data-state` off the rendered node.
        const checked = mount(Checkbox, { props: { modelValue: true } });
        const unchecked = mount(Checkbox, { props: { modelValue: false } });

        expect(checked.get("[data-slot=checkbox]").attributes("data-state")).toBe(
            "checked",
        );
        expect(unchecked.get("[data-slot=checkbox]").attributes("data-state")).toBe(
            "unchecked",
        );
    });

    it("a `:checked` binding drives NOTHING — the stale-binding class, caught", () => {
        // This is the assertion a type gate cannot make. Passing `checked`
        // where the component reads `modelValue` compiles, mounts, and renders
        // the WRONG state — silently.
        const viaStaleProp = mount(Checkbox, {
            props: { checked: true } as unknown as { modelValue: boolean },
        });
        const state = viaStaleProp.get("[data-slot=checkbox]").attributes("data-state");

        expect(
            state,
            'a `:checked` binding renders as "' +
                state +
                "\" — glass-ui's Checkbox declares modelValue/update:modelValue and NO checked prop, so SearchFilterBar.vue:52-53's `:checked` + `@update:checked` are both stale: the box never reflects the filter and toggling it never reaches toggleTag. vue-tsc is green over this because tsconfig.demo resolves the producer through dist/ under skipLibCheck. Cure is the consumer binding — demo/, routed.",
        ).toBe("checked");
    });

    it("the emit the consumer listens for is the emit the producer publishes", async () => {
        // The second half of the same defect: the LISTENER. `update:checked`
        // is never emitted, so the handler is dead code that lints clean.
        const wrapper = mount(Checkbox, { props: { modelValue: false } });
        await wrapper.get("[data-slot=checkbox]").trigger("click");

        const emitted = wrapper.emitted();
        expect(
            Object.keys(emitted),
            "the producer's published emit surface, read from a real click",
        ).toContain("update:modelValue");
        expect(
            Object.keys(emitted),
            "SearchFilterBar listens for `update:checked`; if this ever contains it, the producer added the alias and the consumer binding is no longer stale",
        ).not.toContain("update:checked");
    });
});
