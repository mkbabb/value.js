// SERVED MODEL: claude-opus-5[1m]
//
// X.W5.a — gate A3's WITNESS (dock-action parity).
//
// COHESION §0k.3 S-1 ruled A3's CURE to X-W8 (MT-DOCK-LAYERS-1's `DockCommand`
// provide/inject registry); X-W5 owns the WITNESS only. This probe therefore
// MEASURES and never cures: it prints the parity reading at the three viewports
// the fold names and the two source predicates that carry the Save/Cancel
// discard arm, and it exits 1 while parity is broken — an honest RED, not a
// pass-through.
//
// Arms (fold §2a A3):
//   (i)   the mobile/desktop Regenerate pair over the dock action bar;
//   (ii)  the Save/Cancel discard arm — a mobile edit may not report success
//         while the edit is discarded (App.vue's `@commit-edit` seat);
//   (iii) the 720×900 arm (≡ 1440 at 200 % zoom), from Dock G-I.
//
// Usage:  node docs/tranches/V/megatranche/workflows/gates/dock-action-parity.mjs

import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import path from "node:path";

const BASE = process.env.PROBE_BASE ?? "http://localhost:9000";
const ROOT = path.resolve(import.meta.dirname, "../../../../../..");

const VIEWPORTS = [
    { label: "mobile390", width: 390, height: 844 },
    { label: "zoom200_720x900", width: 720, height: 900 },
    { label: "desktop1440", width: 1440, height: 900 },
];

async function regenArm(browser, { label, width, height }) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/#/generate", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(5000);
    const reading = await page.evaluate(async () => {
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        const mainText = () => document.querySelector("main")?.innerText ?? "";
        const click = (el) =>
            el &&
            el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        const dockButtons = () => [...document.querySelectorAll("nav.dock-band button")];
        const named = (list, re) =>
            list.find((b) =>
                re.test((b.getAttribute("aria-label") ?? "") + (b.textContent ?? "")),
            );

        click(
            document.querySelector("nav.dock-band .action-bar-toggle-inner") ??
                named(dockButtons(), /action|tool/i),
        );
        await wait(600);

        const before = mainText();
        const dockBtn = named(dockButtons(), /regenerate/i);
        const dockDisabled =
            dockBtn === undefined
                ? null
                : dockBtn.disabled || dockBtn.getAttribute("aria-disabled") === "true";
        click(dockBtn);
        await wait(900);
        const afterDock = mainText();

        const paneBtn = [...document.querySelectorAll("main button")].find((b) =>
            /regenerate|new palette/i.test(
                (b.getAttribute("aria-label") ?? "") +
                    (b.getAttribute("title") ?? "") +
                    (b.textContent ?? ""),
            ),
        );
        click(paneBtn);
        await wait(900);

        return {
            dockBtnFound: dockBtn !== undefined,
            dockDisabled,
            dockChanged: afterDock !== before,
            paneBtnFound: paneBtn !== undefined,
            paneChanged: mainText() !== afterDock,
        };
    });
    await ctx.close();
    return { label, width, height, ...reading };
}

/**
 * Arm (ii), read at the bytes: the seat that reports success.
 *
 * The defect the arm names is structural — a `@commit-edit` seat that flips the
 * mobile pane index in the SAME expression as an optional-chained commit, so
 * the pane settles (the visible success signal) whether or not the edit landed.
 * A live click cannot distinguish "committed" from "discarded then settled";
 * the byte can, so the byte is the witness.
 */
function sourceArms() {
    const app = readFileSync(path.join(ROOT, "demo/color-picker/App.vue"), "utf8");
    const router = readFileSync(path.join(ROOT, "demo/shell/usePaneRouter.ts"), "utf8");
    const inlineFlip =
        /@commit-edit="[\s\S]{0,200}?mobilePaneIndex\.value = 1/.test(app) ||
        /@cancel-edit="[\s\S]{0,200}?mobilePaneIndex\.value = 1/.test(app);
    const boundSlots = (app.match(/:on-mount=/g) ?? []).length;
    const paneSlots = (app.match(/<PaneSlot\b/g) ?? []).length;
    return {
        // RED while the dock seat settles the pane in the same breath as an
        // unguarded commit.
        unconditionalPaneFlip: inlineFlip,
        // RED while any PaneSlot renders with no mount report — the structural
        // cause of the mobile half of the parity failure.
        paneSlots,
        boundSlots,
        everySlotReports: paneSlots > 0 && boundSlots === paneSlots,
        // S-1's own boundary: command dispatch through instance refs may not
        // be resurrected here; the registry lands at X-W8. The predicate is a
        // DECLARATION, not a mention — a comment naming the future registry is
        // not the registry.
        dockCommandRegistry: /\b(?:interface|type|const)\s+DockCommand\b/.test(router),
    };
}

const browser = await chromium.launch();
const live = [];
for (const vp of VIEWPORTS) live.push(await regenArm(browser, vp));
await browser.close();

const source = sourceArms();
const mobile = live.find((r) => r.label === "mobile390");
const desktop = live.find((r) => r.label === "desktop1440");
const zoom = live.find((r) => r.label === "zoom200_720x900");

const verdict = {
    probe: "dock-action-parity",
    gate: "A3",
    cureOwner: "X-W8 (MT-DOCK-LAYERS-1) — COHESION §0k.3 S-1; X-W5 witnesses only",
    base: BASE,
    when: new Date().toISOString(),
    live,
    source,
    parity: {
        mobileChanged: mobile.dockChanged,
        zoom200Changed: zoom.dockChanged,
        desktopChanged: desktop.dockChanged,
        // Parity is two-sided by design: the mobile control inert OR the
        // desktop control broken both fail it.
        green:
            mobile.dockChanged === desktop.dockChanged &&
            zoom.dockChanged === desktop.dockChanged &&
            desktop.dockChanged === true,
    },
    saveCancelDiscardArm: {
        green: source.unconditionalPaneFlip === false,
        note: "a mobile edit may not report success while the edit is discarded",
    },
};

console.log(JSON.stringify(verdict, null, 1));
process.exit(verdict.parity.green && verdict.saveCancelDiscardArm.green ? 0 : 1);
