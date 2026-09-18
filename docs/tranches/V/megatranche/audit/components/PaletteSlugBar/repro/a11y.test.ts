import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import PaletteSlugBar from "../../../../../../../../demo/palettes/browser/slug/PaletteSlugBar.vue";

describe("a11y · logged-in default mode", () => {
    it("dumps the slug-pill trigger + the three-dot trigger", async () => {
        const w = mount(PaletteSlugBar, {
            props: {
                userSlug: "alpha-bravo-charlie-delta",
                cssColorOpaque: "#369",
                hasSavedPalettes: true,
            },
            attachTo: document.body,
            global: { stubs: { transition: false } },
        });
        await nextTick();
        const pill = document.querySelector(".slug-pill");
        // eslint-disable-next-line no-console
        console.log("A11Y slug-pill outerHTML:", pill?.outerHTML);
        // eslint-disable-next-line no-console
        console.log("A11Y slug-pill tabIndex:", (pill as HTMLElement)?.tabIndex);
        const dots = document.querySelector('[aria-label="Account menu"]');
        // eslint-disable-next-line no-console
        console.log("A11Y three-dot outerHTML:", dots?.outerHTML.slice(0, 400));

        // open the menu
        (w.vm as any).$.setupState.slugMenuOpen = true;
        for (let i = 0; i < 6; i++) {
            await new Promise((r) => requestAnimationFrame(() => r(0)));
            await nextTick();
        }
        const content = document.querySelector('[role="dialog"],[data-radix-popper-content-wrapper],[role="menu"]');
        // eslint-disable-next-line no-console
        console.log(
            "A11Y menu container role:",
            content?.getAttribute("role"),
            "| items:",
            [...document.querySelectorAll("button")]
                .map((b) => `${b.getAttribute("role") ?? "button"}:${b.textContent?.trim()}`)
                .join(" | "),
        );
        expect(pill).toBeTruthy();
        w.unmount();
    });
});

describe("a11y · edit mode form semantics", () => {
    it("dumps the input + error association", async () => {
        const w = mount(PaletteSlugBar, {
            props: { userSlug: null, cssColorOpaque: "#369", hasSavedPalettes: false },
            attachTo: document.body,
            global: { stubs: { transition: false } },
        });
        (w.vm as any).$.setupState.slugEditMode = true;
        (w.vm as any).setError("Slug not found.");
        for (let i = 0; i < 6; i++) {
            await new Promise((r) => requestAnimationFrame(() => r(0)));
            await nextTick();
        }
        const input = document.querySelector("input");
        // eslint-disable-next-line no-console
        console.log("A11Y input outerHTML:", input?.outerHTML);
        // eslint-disable-next-line no-console
        console.log(
            "A11Y input a11y attrs:",
            JSON.stringify({
                ariaLabel: input?.getAttribute("aria-label"),
                ariaDescribedby: input?.getAttribute("aria-describedby"),
                ariaInvalid: input?.getAttribute("aria-invalid"),
                id: input?.getAttribute("id"),
                autocomplete: input?.getAttribute("autocomplete"),
                type: input?.getAttribute("type"),
                labelFor: document.querySelector("label")?.getAttribute("for"),
            }),
        );
        expect(input).toBeTruthy();
        w.unmount();
    });
});

describe("a11y · focus is not restored when edit mode is cancelled", () => {
    it("activeElement falls to <body> after Escape / Cancel", async () => {
        const w = mount(PaletteSlugBar, {
            props: { userSlug: null, cssColorOpaque: "#369", hasSavedPalettes: false },
            attachTo: document.body,
            global: { stubs: { transition: false } },
        });
        const state = (w.vm as any).$.setupState;
        state.slugEditMode = true;
        for (let i = 0; i < 6; i++) {
            await new Promise((r) => requestAnimationFrame(() => r(0)));
            await nextTick();
        }
        const input = document.querySelector("input")!;
        input.focus();
        expect(document.activeElement).toBe(input);

        // Cancel button — the component's own handler
        const cancel = [...document.querySelectorAll("button")].find(
            (b) => b.getAttribute("aria-label") === "Cancel slug edit",
        )!;
        cancel.focus();
        cancel.click();
        await nextTick();
        // and the Escape path, for completeness
        document
            .querySelector("form")
            ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
        for (let i = 0; i < 8; i++) {
            await new Promise((r) => requestAnimationFrame(() => r(0)));
            await nextTick();
        }
        // eslint-disable-next-line no-console
        console.log("A11Y focus after Escape:", {
            activeElement: document.activeElement?.tagName,
            inputStillMounted: !!document.querySelector("input"),
        });
        expect(document.activeElement?.tagName).toBe("BODY");
        w.unmount();
    });
});
