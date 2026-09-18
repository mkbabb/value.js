// CHALLENGE-C pass 4 — independent probe of PaletteSlugBar.vue
// Mounts the REAL SFC against the REAL glass-ui 7 SearchBar/Button/Popover.
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import PaletteSlugBar from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/slug/PaletteSlugBar.vue";

function mk(props: Partial<Record<string, unknown>> = {}) {
    return mount(PaletteSlugBar as any, {
        props: {
            userSlug: null,
            cssColorOpaque: "#ff0000",
            hasSavedPalettes: false,
            ...props,
        },
        attachTo: document.body,
    });
}

async function intoEditMode(w: ReturnType<typeof mk>) {
    vi.useFakeTimers();
    (w.vm as any).slugEditMode = true;
    await w.vm.$nextTick();
    vi.useRealTimers();
}

describe("P4-1 · rendered credential field attribute census", () => {
    it("dumps the shipped <input> attributes", async () => {
        const w = mk();
        (w.vm as any).slugEditMode = true;
        await w.vm.$nextTick();
        const input = w.find("input").element as HTMLInputElement;
        const attrs: Record<string, string> = {};
        for (const a of Array.from(input.attributes)) attrs[a.name] = a.value;
        console.log("INPUT ATTRS:", JSON.stringify(attrs));
        console.log("HAS name:", input.hasAttribute("name"));
        console.log("HAS autocomplete:", input.hasAttribute("autocomplete"));
        console.log("HAS autocapitalize:", input.hasAttribute("autocapitalize"));
        console.log("HAS autocorrect:", input.hasAttribute("autocorrect"));
        console.log("HAS spellcheck:", input.hasAttribute("spellcheck"));
        console.log("HAS aria-label:", input.hasAttribute("aria-label"));
        console.log("HAS aria-describedby:", input.hasAttribute("aria-describedby"));
        console.log("HAS inputmode:", input.hasAttribute("inputmode"));
        console.log("type:", input.getAttribute("type"));
        console.log("ROOT TAG:", w.find("form").exists() ? "FORM" : "(no form)");
        expect(input).toBeTruthy();
        w.unmount();
    });

    it("dumps the whole edit-mode markup", async () => {
        const w = mk();
        (w.vm as any).slugEditMode = true;
        await w.vm.$nextTick();
        console.log("EDIT MARKUP:\n" + w.html());
        w.unmount();
    });
});

describe("P4-2 · submit wiring — where does @submit.prevent land?", () => {
    it("submit on <form> vs submit re-targeted at <input>", async () => {
        const w = mk();
        (w.vm as any).slugEditMode = true;
        await w.vm.$nextTick();
        const form = w.find("form").element as HTMLFormElement;
        const input = w.find("input").element as HTMLInputElement;

        console.log("form has onsubmit prop-listener attr:", form.getAttribute("onsubmit"));
        // Vue attaches listeners via addEventListener; count effect by emission.
        const before = w.emitted("switchSlug")?.length ?? 0;
        (w.vm as any).slugInput = "aaa-bbb-ccc-ddd";
        await w.vm.$nextTick();

        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        await w.vm.$nextTick();
        const afterFormSubmit = w.emitted("switchSlug")?.length ?? 0;

        input.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        await w.vm.$nextTick();
        const afterInputSubmit = w.emitted("switchSlug")?.length ?? 0;

        console.log("emits before:", before, "after form submit:", afterFormSubmit, "after input-targeted submit:", afterInputSubmit);
        w.unmount();
    });
});

describe("P4-3 · classifier routing table (including the ADMIN_TOKEN= disambiguator)", () => {
    const cases = [
        "aaa-bbb-ccc-ddd",
        "ADMIN_TOKEN=correct-horse-battery-staple",
        'ADMIN_TOKEN="correct-horse-battery-staple"',
        "correct-horse-battery-staple",
        "ADMIN_TOKEN=change-me-to-a-secure-random-string",
        "change-me-to-a-secure-random-string",
        "test-user",
        "Correct-Horse-Battery-Staple",
        "ADMIN_TOKEN=S3cret!",
        "   ",
        "-a-b-c-",
    ];
    for (const raw of cases) {
        it(`routes ${JSON.stringify(raw)}`, async () => {
            const w = mk();
            (w.vm as any).slugEditMode = true;
            await w.vm.$nextTick();
            (w.vm as any).slugInput = raw;
            await w.vm.$nextTick();
            // call the SFC's own handler directly (the template binding is proven dead in P4-2)
            const vm: any = w.vm;
            const handler = (w.find("form").element as any);
            void handler;
            // reach the setup fn through the exposed proxy is not possible; drive via the submit button click
            const btn = w.findAll("button").find((b) => b.attributes("type") === "submit");
            await btn!.trigger("click");
            // jsdom does not run implicit submission; drive the input-targeted submit path instead
            (w.find("input").element as HTMLInputElement).dispatchEvent(
                new Event("submit", { bubbles: true, cancelable: true }),
            );
            await w.vm.$nextTick();
            const e = w.emitted("switchSlug") as any[] | undefined;
            console.log(
                `RAW=${JSON.stringify(raw)} -> ${e ? JSON.stringify(e[0]) : "NO EMIT"}`,
            );
            void vm;
            w.unmount();
        });
    }
});

describe("P4-4 · looksLikeSlug regex — ReDoS negative proof", () => {
    it("times the shipped regex on adversarial inputs", () => {
        const re = /^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/;
        const probes: [string, string][] = [
            ["10k 'a'", "a".repeat(10000)],
            ["20k 'a-' pairs", "a-".repeat(20000)],
            ["4 x 50k segs + '!'", ["a".repeat(50000), "b".repeat(50000), "c".repeat(50000), "d".repeat(50000)].join("-") + "!"],
            ["1M mixed", ("ab-".repeat(300000)) + "z"],
        ];
        for (const [name, s] of probes) {
            const t0 = performance.now();
            const r = re.test(s);
            const dt = performance.now() - t0;
            console.log(`REDOS ${name}: len=${s.length} match=${r} ms=${dt.toFixed(3)}`);
        }
        expect(true).toBe(true);
    });
});

describe("P4-5 · setTimeout across unmount", () => {
    it("counts pending timers when the component unmounts mid-delay", async () => {
        vi.useFakeTimers();
        const w = mk();
        const loginBtn = w.findAll("button").find((b) => b.text().includes("Login"));
        await loginBtn!.trigger("click");
        console.log("pending timers after click:", vi.getTimerCount());
        w.unmount();
        console.log("pending timers after unmount:", vi.getTimerCount());
        vi.advanceTimersByTime(100);
        console.log("pending timers after advance:", vi.getTimerCount());
        vi.useRealTimers();
        expect(true).toBe(true);
    });
});

describe("P4-6 · default-mode focusability + junk attributes", () => {
    it("censuses focusable nodes and stray DOM attributes", async () => {
        const w = mk({ userSlug: "aaa-bbb-ccc-ddd" });
        await w.vm.$nextTick();
        console.log("DEFAULT MARKUP:\n" + w.html());
        const focusables = w.element.querySelectorAll(
            "a[href],button,input,select,textarea,[tabindex]",
        );
        console.log(
            "focusable:",
            JSON.stringify(
                Array.from(focusables).map((n) => `${n.tagName}:${n.getAttribute("aria-label") ?? (n.textContent || "").trim().slice(0, 24)}`),
            ),
        );
        const pill = w.element.querySelector(".slug-pill") as HTMLElement | null;
        console.log("pill tag:", pill?.tagName, "tabIndex:", pill?.tabIndex, "role:", pill?.getAttribute("role"));
        w.unmount();
    });
});

describe("P4-7 · stale error across mode change", () => {
    it("submits own slug then cancels", async () => {
        const w = mk({ userSlug: "aaa-bbb-ccc-ddd" });
        (w.vm as any).slugEditMode = true;
        await w.vm.$nextTick();
        (w.vm as any).slugInput = "aaa-bbb-ccc-ddd";
        await w.vm.$nextTick();
        (w.find("input").element as HTMLInputElement).dispatchEvent(
            new Event("submit", { bubbles: true, cancelable: true }),
        );
        await w.vm.$nextTick();
        console.log("error after self-submit:", JSON.stringify(w.find("p").exists() ? w.find("p").text() : null));
        const cancel = w.findAll("button").find((b) => b.attributes("aria-label") === "Cancel slug edit");
        await cancel!.trigger("click");
        await w.vm.$nextTick();
        const ps = w.findAll("p").map((p) => p.text());
        console.log("paragraphs in default mode after cancel:", JSON.stringify(ps));
        console.log("MARKUP AFTER CANCEL:\n" + w.html());
        w.unmount();
    });
});
