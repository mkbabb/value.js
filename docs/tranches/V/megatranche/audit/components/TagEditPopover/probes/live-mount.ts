// CHALLENGE-C live probe shim — imported by the browser through Vite's /@fs/
// rail so it resolves the SAME `vue` copy as the running app (a second Vue
// module instance makes `renderSlot` read a null `currentRenderingInstance`).
// READ-ONLY probe: mounts TagEditPopover into a detached host, drives one
// checkbox click, reports what the component actually did.
import { createApp, h, ref } from "vue";
import TagEditPopover from "../../../../../../../../demo/palettes/browser/search/TagEditPopover.vue";
import { BROWSE_PORT_KEY } from "../../../../../../../../demo/palettes/usePalettePorts";

export async function probe() {
    const host = document.createElement("div");
    host.id = "tep-probe-host";
    document.body.appendChild(host);

    const saveCalls: unknown[][] = [];
    const emitted: string[][] = [];

    const port = {
        remotePalettes: ref([
            {
                slug: "p1",
                name: "P",
                tags: ["warm"],
                currentHash: "h1",
                updatedAt: "2026-07-01T00:00:00.000Z",
            },
        ]),
        tagEdit: {
            allTags: ref([
                { name: "warm", category: "mood" },
                { name: "cool", category: "mood" },
            ]),
            loading: ref(false),
            loaded: ref(true),
            loadAllTags: async () => {},
            saveTags: async (...a: unknown[]) => {
                saveCalls.push(a);
                return undefined;
            },
        },
    };

    const app = createApp({
        setup() {
            return () =>
                h(TagEditPopover as any, {
                    open: true,
                    paletteSlug: "p1",
                    currentTags: ["warm"],
                    "onUpdate:tags": (t: string[]) => emitted.push(t),
                    "onUpdate:open": () => {},
                });
        },
    });
    app.provide(BROWSE_PORT_KEY as any, port as any);
    app.mount(host);

    await new Promise((r) => setTimeout(r, 600));

    const wrap = document.querySelector("[data-reka-popper-content-wrapper]");
    const boxes = Array.from(
        (wrap ?? document).querySelectorAll('[role="checkbox"]'),
    ) as HTMLElement[];

    const out: Record<string, unknown> = {
        ua: navigator.userAgent.slice(0, 70),
        viewport: { w: innerWidth, h: innerHeight },
        hostHTML: host.innerHTML.slice(0, 240),
        anchorsHasPopup: document.querySelectorAll('[aria-haspopup="dialog"]').length,
        triggerIds: document.querySelectorAll('[id^="reka-popover-trigger"]').length,
        wrapperStyle: wrap?.getAttribute("style") ?? null,
        wrapperRect: wrap?.getBoundingClientRect().toJSON() ?? null,
        checkboxCount: boxes.length,
        boxes: boxes.map((b) => ({
            checkedAttr: b.getAttribute("checked"),
            ariaChecked: b.getAttribute("aria-checked"),
            dataState: b.getAttribute("data-state"),
            accName: (b.closest("label")?.textContent ?? "").trim(),
            rect: b.getBoundingClientRect().toJSON(),
        })),
    };

    const dlg = wrap?.querySelector('[role="dialog"]') ?? null;
    const lbl = dlg?.getAttribute("aria-labelledby") ?? null;
    out.dialogName = {
        ariaLabelledby: lbl,
        labelledbyResolvesInDocument: lbl ? !!document.getElementById(lbl) : null,
        ariaLabel: dlg?.getAttribute("aria-label") ?? null,
        computedNameSource: lbl && document.getElementById(lbl)
            ? document.getElementById(lbl)!.textContent
            : "(no element with that id — name is EMPTY)",
    };
    const rows = Array.from((wrap ?? document).querySelectorAll("label"));
    out.rowGeometry = rows.map((r) => {
        const b = r.getBoundingClientRect();
        return { w: Math.round(b.width * 100) / 100, h: Math.round(b.height * 100) / 100 };
    });

    if (boxes[1]) {
        boxes[1].click();
        await new Promise((r) => setTimeout(r, 400));
        out.afterClick = {
            dataState: boxes[1].getAttribute("data-state"),
            ariaChecked: boxes[1].getAttribute("aria-checked"),
            emitted: JSON.stringify(emitted),
            saveTagsCalls: saveCalls.length,
        };
    }

    app.unmount();
    host.remove();
    return out;
}

/** A11y + focus-restoration surface of the same mount. */
export async function probeA11y() {
    const host = document.createElement("div");
    host.id = "tep-a11y-host";
    document.body.appendChild(host);

    const openRef = ref(true);
    const loadingRef = ref(true);
    const port = {
        remotePalettes: ref([]),
        tagEdit: {
            allTags: ref([] as { name: string; category: string }[]),
            loading: loadingRef,
            loaded: ref(false),
            loadAllTags: async () => {},
            saveTags: async () => undefined,
        },
    };
    const sentinel = document.createElement("button");
    sentinel.textContent = "sentinel";
    sentinel.id = "tep-sentinel";
    document.body.appendChild(sentinel);
    sentinel.focus();
    const focusBefore = document.activeElement?.id ?? document.activeElement?.tagName;

    const app = createApp({
        setup() {
            return () =>
                h(TagEditPopover as any, {
                    open: openRef.value,
                    paletteSlug: "p1",
                    currentTags: [],
                    "onUpdate:tags": () => {},
                    "onUpdate:open": (v: boolean) => (openRef.value = v),
                });
        },
    });
    app.provide(BROWSE_PORT_KEY as any, port as any);
    app.mount(host);
    await new Promise((r) => setTimeout(r, 500));

    const wrap = document.querySelector("[data-reka-popper-content-wrapper]");
    const dialog = wrap?.querySelector('[role="dialog"]') ?? null;
    const loadingHTML = wrap?.innerHTML ?? "";

    const out: Record<string, unknown> = {
        loadingState: {
            hasAriaLive: loadingHTML.includes("aria-live"),
            hasAriaBusy: loadingHTML.includes("aria-busy"),
            hasRoleStatus: loadingHTML.includes('role="status"'),
            spinnerHasName: /aria-label|sr-only/.test(loadingHTML),
        },
        dialog: {
            exists: !!dialog,
            ariaLabel: dialog?.getAttribute("aria-label") ?? null,
            ariaLabelledby: dialog?.getAttribute("aria-labelledby") ?? null,
            ariaDescribedby: dialog?.getAttribute("aria-describedby") ?? null,
        },
        focusOnOpen: document.activeElement?.getAttribute("data-slot") ??
            document.activeElement?.id ?? document.activeElement?.tagName,
        focusBefore,
    };

    // now flip to the loaded-empty state and re-read
    loadingRef.value = false;
    await new Promise((r) => setTimeout(r, 200));
    out.emptyStateHTML = (document
        .querySelector("[data-reka-popper-content-wrapper]")
        ?.textContent ?? "").trim();

    // close → does focus return anywhere sane?
    openRef.value = false;
    await new Promise((r) => setTimeout(r, 400));
    out.focusAfterClose =
        document.activeElement?.id ?? document.activeElement?.tagName;

    app.unmount();
    host.remove();
    sentinel.remove();
    return out;
}

/** Domain-boundary probe: object-shaped /colors/tags payload + open-watch. */
export async function probeEdges() {
    const out: Record<string, unknown> = {};

    // (a) object-shaped payload (the X9 case BrowsePane.vue:211-219 defends
    //     against and this component does NOT).
    {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const port = {
            remotePalettes: ref([]),
            tagEdit: {
                allTags: ref({} as any), // empty OBJECT, not []
                loading: ref(false),
                loaded: ref(true),
                loadAllTags: async () => {},
                saveTags: async () => undefined,
            },
        };
        const app = createApp({
            setup: () => () =>
                h(TagEditPopover as any, {
                    open: true, paletteSlug: "p1", currentTags: [],
                    "onUpdate:tags": () => {}, "onUpdate:open": () => {},
                }),
        });
        app.provide(BROWSE_PORT_KEY as any, port as any);
        app.mount(host);
        await new Promise((r) => setTimeout(r, 400));
        const w = document.querySelector("[data-reka-popper-content-wrapper]");
        out.objectPayload = {
            lengthOfObject: (port.tagEdit.allTags.value as any).length,
            renderedText: (w?.textContent ?? "").trim(),
            showsEmptyState: (w?.textContent ?? "").includes("No tags available"),
        };
        app.unmount(); host.remove();
    }

    // (b) does the open-watch actually fire? (reactive-props-destructure check)
    {
        const host = document.createElement("div");
        document.body.appendChild(host);
        let loads = 0;
        const openRef = ref(false);
        const port = {
            remotePalettes: ref([]),
            tagEdit: {
                allTags: ref([{ name: "warm", category: "mood" }]),
                loading: ref(false), loaded: ref(false),
                loadAllTags: async () => { loads++; },
                saveTags: async () => undefined,
            },
        };
        const app = createApp({
            setup: () => () =>
                h(TagEditPopover as any, {
                    open: openRef.value, paletteSlug: "p1", currentTags: [],
                    "onUpdate:tags": () => {}, "onUpdate:open": () => {},
                }),
        });
        app.provide(BROWSE_PORT_KEY as any, port as any);
        app.mount(host);
        await new Promise((r) => setTimeout(r, 200));
        const afterMountClosed = loads;
        openRef.value = true;
        await new Promise((r) => setTimeout(r, 300));
        const afterOpen = loads;
        openRef.value = false;
        await new Promise((r) => setTimeout(r, 200));
        openRef.value = true;
        await new Promise((r) => setTimeout(r, 300));
        out.openWatch = { afterMountClosed, afterOpen, afterReopen: loads };
        app.unmount(); host.remove();
    }
    return out;
}
