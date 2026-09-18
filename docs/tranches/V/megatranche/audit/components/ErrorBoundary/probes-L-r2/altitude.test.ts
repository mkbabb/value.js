// CHALLENGE-L r2 probes — the ALTITUDE of containment, not the plate.
//
// Deliberately disjoint from probes/boundary.test.ts (r1), which established
// the latch and the blast radius. These establish:
//   R2-A  what the boundary CANNOT see: App.vue mounts it as a SIBLING of
//         <nav> (the Dock, App.vue:24-44) and of <MigratePalettesDialog>
//         (App.vue:152-158). Both are outside containment.
//   R2-B  what happens to a failed defineAsyncComponent LOADER — the chunk-404
//         class every one of the 10 panes (usePaneRouter.ts:69-78) is exposed
//         to on a deployed gh-pages build.
//   R2-C  the boundary is invisible to any app-root reporter: `return false`
//         (ErrorBoundary.vue:68) halts propagation, so an installed
//         app.config.errorHandler sees ZERO pane failures.
//
// Read-only: mounts the shipped SFC through the @demo alias. No source edits.
// Uses raw createApp (not VTU) so app.config is the REAL app config, exactly
// as index.html:210 would build it.

import { describe, it, expect, vi } from "vitest";
import { createApp, defineComponent, h, defineAsyncComponent, nextTick } from "vue";
import ErrorBoundary from "@demo/color-picker/ErrorBoundary.vue";

const ButtonStub = defineComponent({
    name: "Button",
    setup: (_p, { slots, attrs }) => () => h("button", attrs, slots.default?.()),
});
const IconStub = defineComponent({ setup: () => () => h("i") });

function makeApp(root: ReturnType<typeof defineComponent>) {
    const el = document.createElement("div");
    document.body.appendChild(el);
    const app = createApp(root);
    app.component("Button", ButtonStub);
    app.component("CircleAlert", IconStub);
    app.component("RotateCcw", IconStub);
    return { app, el };
}

const tick = async () => {
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    await nextTick();
};

describe("ErrorBoundary — r2 altitude probes", () => {
    it("R2-A: a throw in a SIBLING of the boundary (App.vue's <nav>) is not caught", async () => {
        const DockLike = defineComponent({
            name: "DockLike",
            setup: () => () => {
                throw new Error("dock render throw");
            },
        });
        const Good = defineComponent({ setup: () => () => h("div", { class: "alive" }) });

        // Exactly App.vue's containment shape.
        const AppShape = defineComponent({
            setup: () => () =>
                h("div", [
                    h("nav", [h(DockLike)]),
                    h("main", [h(ErrorBoundary as never, null, { default: () => h(Good) })]),
                ]),
        });

        const seen: unknown[] = [];
        const { app, el } = makeApp(AppShape);
        app.config.errorHandler = (e: unknown) => seen.push(e);
        app.mount(el);
        await tick();

        const announced = el.querySelector('[role="alert"]');
        console.log(
            JSON.stringify({
                probe: "R2-A",
                boundary_announced: announced !== null,
                errors_escaped_to_app_root: seen.map((e) => (e as Error).message),
                rendered_html_len: el.innerHTML.length,
            }),
        );

        expect(announced).toBeNull(); // the boundary never fires
        expect(seen.map((e) => (e as Error).message)).toEqual(["dock render throw"]);
        app.unmount();
    });

    it("R2-B: a failed async-component LOADER lands in the boundary; Retry re-attempts it", async () => {
        let attempts = 0;
        let failing = true;
        const Pane = defineAsyncComponent(() => {
            attempts++;
            return failing
                ? Promise.reject(new Error("Failed to fetch dynamically imported module"))
                : Promise.resolve(defineComponent({ setup: () => () => h("p", { class: "pane" }, "pane") }));
        });

        const Root = defineComponent({
            setup: () => () => h(ErrorBoundary as never, null, { default: () => h(Pane) }),
        });
        const { app, el } = makeApp(Root);
        app.config.errorHandler = () => {};
        app.mount(el);
        await tick();

        const caught1 = el.querySelector('[role="alert"]') !== null;
        const text1 = el.textContent ?? "";

        // Press "Try again" with the network STILL broken.
        (el.querySelector("button") as HTMLButtonElement).click();
        await tick();
        const attemptsAfterRetry = attempts;
        const caught2 = el.querySelector('[role="alert"]') !== null;
        const paneAfterRetry = el.querySelector(".pane") !== null;

        console.log(
            JSON.stringify({
                probe: "R2-B",
                caught_on_load_failure: caught1,
                detail_shown: text1.includes("Failed to fetch dynamically imported module"),
                loader_attempts_after_retry: attemptsAfterRetry,
                still_announced_after_retry: caught2,
                pane_present_after_retry: paneAfterRetry,
                text_after_retry: JSON.stringify(el.textContent),
            }),
        );

        expect(caught1).toBe(true);
        expect(text1).toContain("Failed to fetch dynamically imported module");
        void failing;
        app.unmount();
    });

    it("R2-C: with app.config.errorHandler installed, a caught pane error never reaches it", async () => {
        const handler = vi.fn();
        const Boom = defineComponent({
            setup: () => () => {
                throw new Error("pane render throw");
            },
        });
        const Root = defineComponent({
            setup: () => () => h(ErrorBoundary as never, null, { default: () => h(Boom) }),
        });

        const { app, el } = makeApp(Root);
        app.config.errorHandler = handler;
        app.mount(el);
        await tick();

        console.log(
            JSON.stringify({
                probe: "R2-C",
                boundary_announced: el.querySelector('[role="alert"]') !== null,
                app_errorHandler_calls: handler.mock.calls.length,
            }),
        );

        expect(el.querySelector('[role="alert"]')).not.toBeNull();
        expect(handler).toHaveBeenCalledTimes(0);
        app.unmount();
    });
});
