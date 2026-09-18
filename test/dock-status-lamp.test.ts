// SERVED MODEL: claude-opus-5[1m]
//
// X-W1 · X.W1.a — R30 (shell-dock-dockstatuslamp DSL-2) / NG-4 · NG-10:
// **the lamp's first mount, and the first assertion on its rendered TEXT.**
//
// THE DEFECT, re-derived against the live files. `test/status-lamp.test.ts`
// holds 19 assertions and never mounts the SFC — it exercises
// `resolveLampState`, the pure resolver, and stops there. `@vue/test-utils`
// was installed with ZERO importers repo-wide. And `o22-status-lamp.spec.ts`
// asserts count, attribute and geometry, never TEXT and never an accessible
// name. So the one thing a user actually reads — the words in the lamp — was
// asserted by nothing at any level.
//
// CURE-SHAPE LOCK (verbatim, binding): *"A's C-9-cure kill stands:
// `toHaveAccessibleName` would fail against a correctly-repaired region (name
// != content for `status`/`alert`); the gate asserts rendered TEXT, or lands
// the author-name cure with it."* This gate asserts rendered TEXT. It does NOT
// assert an accessible name, because for `role="status"` and `role="alert"`
// the accessible name is not the content and a correct repair would fail such
// an assertion — the exact trap the lock names.
//
// This is also R6's first real consumer: before this wave the harness could not
// mount an SFC at all (`vitest.config.ts` carried no `plugins` key, so
// `@vitejs/plugin-vue` never reached the transform). And it is R53's
// MOUNTABILITY LOCK honoured rather than dodged: `DockStatusLamp` reaches
// `useApiClient()`, which THROWS without a provider, so the injection is
// SUPPLIED here explicitly. Wrapping the lamp in its parent to make it mount
// would have tested the parent.
//
// NOTE carried from R30: MT-DOCK-LAYERS-1's G-Q (lamp `role:"status"`) and
// G-K(iii) retire the M2/M3 mutation classes when they land. This gate does
// not re-assert what those retire — it reads the ROLE off `resolveLampState`'s
// own answer rather than pinning a literal, so a ruled role change moves the
// resolver and this gate follows it.
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ref } from "vue";

import DockStatusLamp from "../demo/shell/dock/DockStatusLamp.vue";
import { API_CLIENT_KEY } from "../demo/platform/transport/useApiClient";
import type { ApiAvailability } from "../demo/platform/transport/availability";
import { resolveLampState } from "../demo/shell/dock/status-lamp";

/** Mount the lamp with its ONE injection supplied (R53's lock). */
function mountLamp(availability: ApiAvailability) {
    return mount(DockStatusLamp, {
        global: {
            provide: {
                [API_CLIENT_KEY as unknown as symbol]: {
                    request: () => {
                        throw new Error("not called by the lamp");
                    },
                    adminRequest: () => {
                        throw new Error("not called by the lamp");
                    },
                    sessionToken: ref<string | null>(null),
                    availability: ref<ApiAvailability>(availability),
                    baseUrl: "http://localhost:0/test",
                },
            },
        },
    });
}

describe("R30 · DockStatusLamp renders the words it promises", () => {
    // `import.meta.env.DEV` is true under vitest, so the dev gate is open here
    // and the two lamp faces are reachable. The production-dark case is the
    // resolver's own row in status-lamp.test.ts; asserting it again through a
    // mount would assert vitest's env, not the component.
    it("the dev gate is open in this harness — the precondition, stated", () => {
        expect(import.meta.env.DEV).toBe(true);
    });

    for (const availability of ["misconfigured", "unavailable"] as const) {
        it(`${availability}: the rendered text IS the resolver's label`, () => {
            const expected = resolveLampState(availability, true);
            expect(expected, `${availability} resolves to a lamp`).not.toBeNull();

            const wrapper = mountLamp(availability);
            const lamp = wrapper.find(".dock-status-lamp");
            expect(lamp.exists(), "the lamp mounts").toBe(true);

            // THE assertion this component has never had: the words.
            expect(lamp.text().trim()).toBe(expected!.label);
            // …and they are in the label span, not leaked from the dot, which
            // is aria-hidden and must stay empty.
            expect(wrapper.find(".lamp-label").text().trim()).toBe(expected!.label);
            expect(wrapper.find(".lamp-dot").text()).toBe("");
            expect(wrapper.find(".lamp-dot").attributes("aria-hidden")).toBe("true");

            // The register travels with the words: the role is READ from the
            // resolver, never pinned to a literal here.
            expect(lamp.attributes("role")).toBe(expected!.role);
            expect(lamp.attributes("data-variant")).toBe(expected!.variant);
            wrapper.unmount();
        });
    }

    for (const availability of ["available", "unknown"] as const) {
        it(`${availability}: a healthy band carries NO lamp — nothing renders`, () => {
            expect(resolveLampState(availability, true)).toBeNull();
            const wrapper = mountLamp(availability);
            expect(wrapper.find(".dock-status-lamp").exists()).toBe(false);
            expect(wrapper.text().trim()).toBe("");
            wrapper.unmount();
        });
    }

    it("the two faces are DISTINGUISHABLE by text alone, not only by attribute", () => {
        // O-22's matrix proves the variants differ; nothing proved a user could
        // TELL them apart. A misconfigured dev box and an offline backend are
        // different problems with different fixes, so the words must differ.
        const misconfigured = mountLamp("misconfigured").find(".dock-status-lamp");
        const unavailable = mountLamp("unavailable").find(".dock-status-lamp");
        expect(misconfigured.text().trim()).not.toBe(unavailable.text().trim());
        expect(misconfigured.text().trim().length).toBeGreaterThan(0);
        expect(unavailable.text().trim().length).toBeGreaterThan(0);
    });
});
