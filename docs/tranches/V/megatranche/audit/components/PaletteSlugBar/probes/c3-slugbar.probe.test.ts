import { describe, it, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import PaletteSlugBar from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/slug/PaletteSlugBar.vue";

const baseProps = {
    userSlug: "azure-drifting-teal-fox",
    cssColorOpaque: "#4488aa",
    hasSavedPalettes: false,
    isAdmin: false,
};

function mountBar(props: Partial<typeof baseProps> = {}, listeners: Record<string, any> = {}) {
    return mount(PaletteSlugBar as any, {
        props: { ...baseProps, ...props, ...listeners },
        attachTo: document.body,
    });
}

// Drive the real UI path: the "Login" pill (logged-out) or, when a slug is
// present, the exposed edit-mode flag — then wait out the component's own
// hard-coded 50ms popover-close timer.
// The ONLY way to actually reach onSlugSwitch (see PROBE G): dispatch the
// submit event straight at the <input>, where SearchBar's inheritAttrs:false
// fallthrough parked the listener.
function submitViaInput(w: any) {
    (w.find("input").element as HTMLElement).dispatchEvent(new Event("submit", { bubbles: false }));
}

async function enterEditMode(w: any) {
    const login = w.find("button.rounded-full");
    if (login.exists()) await login.trigger("click");
    else (w.vm as any).slugEditMode = true;
    await new Promise((r) => setTimeout(r, 80));
    await flushPromises();
    await w.vm.$nextTick();
    if (!w.find("input").exists()) {
        console.log("[helper] no input after enterEditMode; html=", w.html().slice(0, 400));
    }
}

describe("PROBE G — the @submit listener lands on the INPUT, not the FORM", () => {
    it("shows where Vue attached onSubmit and that form submit never calls it", async () => {
        const onSwitchSlug = vi.fn();
        const w = mountBar({ userSlug: null }, { onSwitchSlug });
        await enterEditMode(w);
        const form = w.find("form").element as HTMLFormElement;
        const input = w.find("input").element as HTMLInputElement;
        console.log("[G] root tag:", form.tagName, "| input type:", input.getAttribute("type"));
        console.log("[G] form._vei keys:", Object.keys((form as any)._vei ?? {}));
        console.log("[G] input._vei keys:", Object.keys((input as any)._vei ?? {}));
        await w.find("input").setValue("misty-flowing-amber-otter");
        await w.find("form").trigger("submit");
        await flushPromises();
        console.log("[G] handler calls after FORM submit:", onSwitchSlug.mock.calls.length);
        // now dispatch submit directly at the input to prove misplacement
        input.dispatchEvent(new Event("submit", { bubbles: false }));
        await flushPromises();
        console.log("[G] handler calls after INPUT-targeted submit:", onSwitchSlug.mock.calls.length);
        console.log("[G] emitted:", JSON.stringify(w.emitted("switchSlug") ?? null));
        expect(true).toBe(true);
    });

    it("clicking the type=submit button does not reach the handler either", async () => {
        const onSwitchSlug = vi.fn();
        const errs: string[] = [];
        const origErr = console.error;
        console.error = (...a: any[]) => errs.push(String(a[0]).slice(0, 160));
        const w = mountBar({ userSlug: null }, { onSwitchSlug });
        await enterEditMode(w);
        await w.find("input").setValue("misty-flowing-amber-otter");
        const submitBtn = w.find('button[type="submit"]');
        console.log("[G2] submit button found:", submitBtn.exists(), "| disabled:", (submitBtn.element as HTMLButtonElement).disabled);
        await submitBtn.trigger("click");
        await flushPromises();
        console.log("[G2] handler calls after clicking submit:", onSwitchSlug.mock.calls.length);
        console.log("[G2] jsdom errors (navigation attempts):", errs);
        console.error = origErr;
        expect(true).toBe(true);
    });
});

describe("PROBE A — loading state is unreachable with an async parent", () => {
    it("never renders the spinner while the parent's switchSlug promise is pending", async () => {
        let resolveParent: () => void = () => {};
        const parentPending = new Promise<void>((r) => (resolveParent = r));
        const onSwitchSlug = vi.fn(async () => {
            await parentPending;
        });
        const w = mountBar({}, { onSwitchSlug });
        await enterEditMode(w);
        const input = w.find("input");
        await input.setValue("misty-flowing-amber-otter");
        submitViaInput(w);
        await flushPromises();
        // parent promise still pending here
        console.log("[A] spinner nodes while parent pending:", w.findAll(".animate-spin").length);
        console.log("[A] form still mounted:", w.find("form").exists());
        console.log("[A] parent called:", onSwitchSlug.mock.calls);
        expect(w.findAll(".animate-spin").length).toBe(0);
        resolveParent();
        await flushPromises();
    });
});

describe("PROBE B — the catch/finally block cannot see a parent rejection", () => {
    it("swallows a rejected parent handler: no error text, unhandled rejection instead", async () => {
        const seen: any[] = [];
        const onRej = (e: any) => seen.push(e?.reason ?? e);
        process.on("unhandledRejection", onRej);
        const onSwitchSlug = vi.fn(async () => {
            throw new Error("404 Slug not found");
        });
        const w = mountBar({}, { onSwitchSlug });
        await enterEditMode(w);
        await w.find("input").setValue("misty-flowing-amber-otter");
        submitViaInput(w);
        await flushPromises();
        await new Promise((r) => setTimeout(r, 20));
        console.log("[B] rendered error text:", JSON.stringify(w.find("p.text-destructive").exists() ? w.find("p.text-destructive").text() : null));
        console.log("[B] unhandled rejections captured:", seen.map(String));
        expect(w.find("p.text-destructive").exists()).toBe(false);
        process.off("unhandledRejection", onRej);
    });
});

describe("PROBE C — stale error survives cancel / resetEditMode", () => {
    it("keeps the error banner after the user cancels out of edit mode", async () => {
        const w = mountBar({}, { onSwitchSlug: vi.fn() });
        await enterEditMode(w);
        // user re-enters their OWN slug -> local guard fires
        await w.find("input").setValue("azure-drifting-teal-fox");
        submitViaInput(w);
        await flushPromises();
        console.log("[C] error after self-slug submit:", w.find("p.text-destructive").text());
        // user clicks the Cancel (X) button
        const cancel = w.find('button[aria-label="Cancel slug edit"]');
        console.log("[C] cancel button found:", cancel.exists());
        await cancel.trigger("click");
        await flushPromises();
        console.log("[C] still in edit mode?", w.find("form").exists());
        console.log("[C] error STILL rendered in default mode:", w.find("p.text-destructive").exists(), JSON.stringify(w.find("p.text-destructive").exists() ? w.find("p.text-destructive").text() : null));
        expect(w.find("p.text-destructive").exists()).toBe(true);
    });

    it("resetEditMode() leaves slugError set", async () => {
        const w = mountBar({}, { onSwitchSlug: vi.fn() });
        (w.vm as any).setError("Slug not found.");
        await flushPromises();
        (w.vm as any).resetEditMode();
        await flushPromises();
        console.log("[C2] error after resetEditMode():", JSON.stringify(w.find("p.text-destructive").exists() ? w.find("p.text-destructive").text() : null));
        expect(w.find("p.text-destructive").exists()).toBe(true);
    });
});

describe("PROBE D — non-slug input is silently reclassified as an ADMIN TOKEN", () => {
    const cases = [
        "azure-drifting-teal",            // 3 words: one hyphen fumbled
        "azure drifting teal fox",        // spaces instead of hyphens
        "azure-drifting-teal-fox-extra",  // 5 words
        "azure_drifting_teal_fox",        // underscores
        "azure-drifting-teal-fox2",       // trailing digit
        "azure--drifting-teal-fox",       // double hyphen
    ];
    for (const raw of cases) {
        it(`classifies ${JSON.stringify(raw)}`, async () => {
            const onSwitchSlug = vi.fn();
            const w = mountBar({ userSlug: null }, { onSwitchSlug });
            await enterEditMode(w);
            await w.find("input").setValue(raw);
            submitViaInput(w);
            await flushPromises();
            const args = (w.emitted("switchSlug") ?? [])[0];
            console.log(`[D] ${JSON.stringify(raw)} -> emit`, JSON.stringify(args));
            expect(args?.[1]).toBe(true); // isAdmin === true
        });
    }
});

describe("PROBE E — the 50ms popover timer is unguarded", () => {
    it("fires after unmount", async () => {
        vi.useFakeTimers();
        const w = mountBar({ userSlug: null }, { onSwitchSlug: vi.fn() });
        await w.find("button.rounded-full").trigger("click"); // Login
        const pending = vi.getTimerCount();
        w.unmount();
        console.log("[E] pending timers at unmount:", pending, "after unmount:", vi.getTimerCount());
        vi.advanceTimersByTime(100);
        console.log("[E] timers after advance:", vi.getTimerCount());
        expect(pending).toBeGreaterThan(0);
        vi.useRealTimers();
    });
});

describe("PROBE F — dead prop + dead emit", () => {
    it("mounts fine with hasSavedPalettes omitted (required, never read)", async () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const w = mount(PaletteSlugBar as any, {
            props: { userSlug: "azure-drifting-teal-fox", cssColorOpaque: "#48a" },
        });
        console.log("[F] mounted without hasSavedPalettes; vue warnings:", warn.mock.calls.map((c) => String(c[0]).slice(0, 120)));
        expect(w.exists()).toBe(true);
        warn.mockRestore();
    });

    it("never emits the declared `copy` event", async () => {
        const w = mountBar();
        (w.vm as any).$?.exposed;
        // open the three-dot menu path is popover-driven; call the handler surface directly
        const html = w.html();
        console.log("[F2] emitted after mount:", Object.keys(w.emitted()));
        expect(Object.keys(w.emitted())).not.toContain("copy");
        expect(html.length).toBeGreaterThan(0);
    });
});

describe("PROBE H — rendered a11y surface", () => {
    it("dumps default-mode markup (slug pill + three-dot trigger)", async () => {
        const w = mountBar();
        await flushPromises();
        console.log("[H] DEFAULT MODE HTML:\n" + w.html());
        const pill = w.find(".slug-pill");
        console.log("[H] pill tagName:", pill.element.tagName, "| tabindex:", pill.attributes("tabindex"), "| role:", pill.attributes("role"), "| aria-describedby:", pill.attributes("aria-describedby"));
        console.log("[H] focusable nodes:", w.findAll("button, a, input, [tabindex]").map((n) => n.element.tagName + ":" + (n.attributes("aria-label") ?? n.text().slice(0, 20))));
        const err = mountBar();
        (err.vm as any).setError("Slug not found.");
        await flushPromises();
        const p = err.find("p.text-destructive");
        console.log("[H] error node:", p.html(), "| aria-live:", p.attributes("aria-live"), "| role:", p.attributes("role"));
        expect(pill.exists()).toBe(true);
    });

    it("dumps edit-mode markup", async () => {
        const w = mountBar({ userSlug: null });
        await enterEditMode(w);
        console.log("[H2] EDIT MODE HTML:\n" + w.html());
        expect(w.find("input").exists()).toBe(true);
    });
});
