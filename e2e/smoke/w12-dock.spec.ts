// SERVED MODEL: claude-opus-5-5
import { test, expect, type Page, type Locator, type BrowserContext } from "@playwright/test";
import { mkdirSync, writeFileSync, renameSync } from "node:fs";

/**
 * X.W12.e · OA-6 / OA-22 / OA-55 — THE DOCK SITS ON GLASS'S PRIMITIVES.
 *
 * The owner (2026-09-23, frame 3): *"login's background has a strange
 * different color and is squared, same with @mbabb; the dock transitions in
 * tools and others is janky, not glass-ui idiomatic and ios27 like"* and
 * (OA-55) *"buttons in the dock are clipped on hover and select like this."*
 *
 *   (1) PILLS — the Login and @mbabb pills (and the logged-in Profile twin)
 *       take their plate colour and radius from glass's dock control: the
 *       computed background at rest equals the sibling glass dock trigger's
 *       (the view select), on hover it equals the resolved
 *       `--dock-control-hover-bg` token, and every corner radius is at least
 *       half the pill's height (a stadium, never a squared plate).
 *   (2) LAYERS — each dock layer switch (Tools → action bar and back; Login →
 *       slug edit and back; the mobile edit layer at 390) runs on glass's
 *       `DockLayerGroup` → `DockCrossfade` spine: the faces are
 *       `.dock-crossfade > .dock-face`, and no consumer-authored
 *       `@keyframes` runs on the layer machinery (face, crossfade, layer host,
 *       dock body) during the switch; an element's own feedback inside a face
 *       (the colour input's mode flash) is reported as `element:` and is not a
 *       layer transition. The Tools bar's actions ↔ input sub-layer rides a
 *       nested glass DockCrossfade too. Each switch is recorded as its own
 *       WebM (`W12E_WEBM_DIR`).
 *   (3) DOCK-TRIGGER-CLIP (O-63) — frames of a dock trigger at hover,
 *       selected and focus-visible on the served page (`W12E_FRAMES_DIR`),
 *       and the ancestor chain from the trigger to the root read for every
 *       clipping box. A clip on a CONSUMER ancestor is value.js's to cure and
 *       the leg asserts none; the producer's own row clip is reported with
 *       its measured cut (honest-RED DOCK-TRIGGER-CLIP, relayed as O-63).
 */

const WEBM_DIR = process.env.W12E_WEBM_DIR;
const FRAMES_DIR = process.env.W12E_FRAMES_DIR;
const OUT_DIR = process.env.W12E_OUT;

/** Consumer-authored keyframes that may never run on a dock layer switch. */
const CONSUMER_KEYFRAMES = [
    "action-pulse",
    "action-spin",
    "input-mode-flash",
    "crown-appear",
    "lamp-dot-pulse",
    "vj-settle",
    "edit-drawer-in",
    "stagger-child-in",
];

async function openHome(page: Page, width: number, height: number) {
    await page.setViewportSize({ width, height });
    await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
    await page.locator(".glass-dock").first().waitFor({ timeout: 30_000 });
    await page.locator(".dock-crossfade .dock-face.is-active").first().waitFor({ timeout: 30_000 });
    // the dock's own boot morph settles before any reading
    await page.waitForTimeout(1_200);
}

function dockButton(page: Page, name: string | RegExp): Locator {
    return page.locator(".glass-dock").getByRole("button", { name, exact: typeof name === "string" });
}

interface PillReading {
    name: string;
    classes: string;
    rest: string;
    hover: string;
    hoverToken: string;
    reference: string;
    height: number;
    radii: number[];
}

/** Resolve a custom property to a computed colour IN the pill's own cascade. */
async function readPill(page: Page, pill: Locator, name: string): Promise<Omit<PillReading, "hover">> {
    return pill.evaluate((el, n) => {
        const cs = getComputedStyle(el);
        const probe = document.createElement("span");
        probe.style.background = "var(--dock-control-hover-bg)";
        el.parentElement!.appendChild(probe);
        const hoverToken = getComputedStyle(probe).backgroundColor;
        probe.remove();
        const ref = document.querySelector(".glass-dock .view-select-trigger");
        const r = el.getBoundingClientRect();
        return {
            name: n,
            classes: el.className.toString(),
            rest: cs.backgroundColor,
            hoverToken,
            reference: ref ? getComputedStyle(ref).backgroundColor : "(no reference)",
            height: r.height,
            radii: [
                cs.borderTopLeftRadius,
                cs.borderTopRightRadius,
                cs.borderBottomRightRadius,
                cs.borderBottomLeftRadius,
            ].map((v) => parseFloat(v)),
        };
    }, name);
}

test.describe("X.W12.e — the dock sits on glass's primitives", () => {
    test.setTimeout(180_000);

    test("(1) Login + @mbabb pills: glass dock-control plate and a stadium radius", async ({ page }) => {
        await page.emulateMedia({ colorScheme: "dark" });
        await openHome(page, 1440, 900);
        const readings: PillReading[] = [];
        for (const name of ["Login", "@mbabb"]) {
            const pill = dockButton(page, name);
            await expect(pill).toBeVisible();
            await page.mouse.move(2, 2);
            await page.waitForTimeout(400);
            const base = await readPill(page, pill, name);
            // the dock may still settle its own geometry under the pointer
            // (the hover lands, then the row shifts under it): re-aim for up
            // to 6 s until the plate settles, reading the pill's own computed
            // plate each time — the assertion below judges the last reading
            let hover = "";
            const deadline = Date.now() + 6_000;
            do {
                await pill.hover();
                // the hover plate rides the producer's --dock-motion-fast transition
                await page.waitForTimeout(400);
                hover = await pill.evaluate((el) => getComputedStyle(el).backgroundColor);
            } while (hover !== base.hoverToken && Date.now() < deadline);
            readings.push({ ...base, hover });
            await page.mouse.move(2, 2);
        }
        console.log(JSON.stringify(readings, null, 1));
        if (OUT_DIR) {
            mkdirSync(OUT_DIR, { recursive: true });
            writeFileSync(`${OUT_DIR}/pills-${Date.now()}.json`, JSON.stringify(readings, null, 1));
        }
        for (const r of readings) {
            // the plate colour is glass's dock control: rest = the sibling glass
            // dock trigger's rest plate, hover = the resolved token
            expect(r.rest, `${r.name} rest plate`).toBe(r.reference);
            expect(r.hover, `${r.name} hover plate`).toBe(r.hoverToken);
            // a stadium: every corner radius ≥ height / 2
            for (const rad of r.radii) expect(rad, `${r.name} radius vs h/2=${r.height / 2}`).toBeGreaterThanOrEqual(r.height / 2);
        }
    });

    /** Sample every animation in the dock subtree through one switch window. */
    async function armSwitchCensus(page: Page) {
        await page.evaluate(() => {
            const w = window as unknown as { __w12e?: { names: Set<string>; stop: boolean } };
            const st = { names: new Set<string>(), stop: false };
            w.__w12e = st;
            const dock = document.querySelector(".glass-dock")!;
            // only animations that START inside the switch window (a boot
            // overture still finishing on an ancestor is not the switch's)
            const t0 = Number(document.timeline.currentTime ?? 0);
            const tick = () => {
                for (const a of document.getAnimations()) {
                    if (a.startTime !== null && Number(a.startTime) < t0 - 1) continue;
                    const t = (a.effect as KeyframeEffect | null)?.target as Element | null;
                    if (!t || !(dock.contains(t) || t.contains(dock))) continue;
                    // a LAYER keyframe animates the layer machinery itself (a
                    // face, a crossfade, a layer host or the dock body); an
                    // element's own feedback inside a face (the colour input's
                    // mode flash, an action pulse) is not a layer transition
                    const layerTarget = t.matches(".dock-face, .dock-face-content, .dock-crossfade, .dock-layer, .dock-layers, .glass-dock") || t.contains(dock);
                    const kind = a.constructor.name;
                    const name =
                        kind === "CSSAnimation"
                            ? (a as CSSAnimation).animationName
                            : kind === "CSSTransition"
                              ? `transition(${(a as CSSTransition).transitionProperty})`
                              : `waapi(${a.id || "anon"})`;
                    st.names.add(`${layerTarget ? "" : "element:"}${kind}:${name}`);
                }
                if (!st.stop) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
    }
    async function readSwitchCensus(page: Page): Promise<string[]> {
        return page.evaluate(() => {
            const st = (window as unknown as { __w12e: { names: Set<string>; stop: boolean } }).__w12e;
            st.stop = true;
            return [...st.names].sort();
        });
    }
    // the dock's LAYER group face (the Tools bar's nested sub-layer crossfade excluded)
    const TOP_FACE = ".glass-dock .dock-crossfade:not(.dock-layer-grid) > .dock-face.is-active";
    async function activeFace(page: Page, sel = TOP_FACE): Promise<string> {
        return page.evaluate((q) => {
            const f = document.querySelector(q);
            return f ? `${f.getAttribute("data-face") ?? f.id ?? ""}|${f.textContent?.trim().slice(0, 24)}` : "(none)";
        }, sel);
    }

    /** A local palette in the store: the only served path to a swatch Edit at
     *  390 while the current palette's add-slot is dead (O-15 BLOCKER). */
    const SEED_PALETTE = {
        version: 1,
        palettes: [
            {
                id: "w12e-seed",
                name: "W12e seed",
                slug: "w12e-seed",
                colors: [
                    { css: "oklch(0.7 0.15 30)", position: 0 },
                    { css: "oklch(0.6 0.12 250)", position: 1 },
                ],
                createdAt: "2026-09-24T00:00:00Z",
                updatedAt: "2026-09-24T00:00:00Z",
                isLocal: true,
            },
        ],
    };

    const SWITCHES: {
        id: string;
        width: number;
        height: number;
        hash: string;
        enter: (p: Page) => Promise<void>;
        entered: (p: Page) => Locator;
        leave: (p: Page) => Promise<void>;
        /** the crossfade whose active face the switch changes (default: the dock's layer group) */
        face?: string;
        seed?: boolean;
    }[] = [
        {
            // the Tools bar's own sub-layer swap (actions ↔ colour input),
            // on glass's DockCrossfade since X.W12.e
            id: "action-sub-layer",
            width: 1440,
            height: 900,
            hash: "#/",
            face: ".glass-dock .dock-layer-grid > .dock-face.is-active",
            enter: async (p) => {
                await dockButton(p, "Toggle action bar").click();
                await dockButton(p, "Back").waitFor({ timeout: 10_000 });
                await p.waitForTimeout(900);
                await dockButton(p, "Open color input").click();
            },
            entered: (p) => dockButton(p, /^(Close input|Propose color name)$/),
            leave: async (p) => {
                await dockButton(p, /^(Close input|Propose color name)$/).click();
                await p.waitForTimeout(300);
                if (await dockButton(p, "Close propose").isVisible()) await dockButton(p, "Close propose").click();
            },
        },
        {
            id: "tools-action-bar",
            width: 1440,
            height: 900,
            hash: "#/",
            enter: (p) => dockButton(p, "Toggle action bar").click(),
            entered: (p) => dockButton(p, "Back"),
            leave: (p) => dockButton(p, "Back").click(),
        },
        {
            id: "login-slug-edit",
            width: 1440,
            height: 900,
            hash: "#/",
            enter: (p) => dockButton(p, "Login").click(),
            entered: (p) => dockButton(p, "Cancel"),
            leave: (p) => dockButton(p, "Cancel").click(),
        },
        {
            id: "mobile-edit",
            width: 390,
            height: 844,
            hash: "#/palettes",
            seed: true,
            enter: async (p) => {
                // a LOCAL palette's swatch in edit: open the seeded card, open
                // its first swatch's popover, take its Edit (pm.onEditColor →
                // emitStartEdit → the dock's mobile-edit layer at < lg)
                const card = p.locator('[aria-label="Palette: W12e seed"]');
                await card.click({ timeout: 10_000 });
                await card.locator(".watercolor-swatch").first().locator("xpath=..").click({ timeout: 10_000 });
                const edit = p.locator('[aria-label^="Edit color "]').first();
                // MEASURED 2026-09-24: at 390×844 the saved card's swatch
                // popover paints its Edit at x=-189, y=879 (off-screen), so the
                // mobile-edit layer has no served entry (MOBILE-EDIT-ENTRY; the
                // current palette's add-slot is dead too, O-15 BLOCKER)
                await expect(edit, "the swatch popover's Edit lands inside the 390 viewport (MOBILE-EDIT-ENTRY)").toBeInViewport({ timeout: 5_000 });
                await edit.click({ timeout: 10_000 });
            },
            entered: (p) => dockButton(p, "Save edit"),
            leave: (p) => dockButton(p, "Cancel edit").click(),
        },
    ];

    for (const sw of SWITCHES) {
        test(`(2) layer switch ${sw.id}: glass DockCrossfade faces, no consumer keyframes, WebM`, async ({ browser, baseURL }) => {
            const ctx: BrowserContext = await browser.newContext({
                baseURL,
                viewport: { width: sw.width, height: sw.height },
                colorScheme: "dark",
                ...(WEBM_DIR ? { recordVideo: { dir: WEBM_DIR, size: { width: sw.width, height: sw.height } } } : {}),
            });
            if (sw.seed) {
                await ctx.addInitScript((store) => {
                    localStorage.setItem("color-palettes", JSON.stringify(store));
                }, SEED_PALETTE);
            }
            const page = await ctx.newPage();
            await openHome(page, sw.width, sw.height);
            if (sw.hash !== "#/") {
                // X-W12 Repair 2 (M-2′): the navigation's own view-select
                // settle beat (Dock.vue `.dock-settle`, vj-settle) must END
                // before the census arms — a fixed 1.5 s let a beat still
                // pending under load be billed to the layer switch. The census
                // itself is unchanged: vj-settle stays a consumer keyframe.
                await page.evaluate((h) => {
                    const w = window as unknown as { __w12eSettled?: boolean };
                    w.__w12eSettled = false;
                    const done = (e: AnimationEvent) => {
                        if (e.animationName === "vj-settle") w.__w12eSettled = true;
                    };
                    document.addEventListener("animationend", done, true);
                    document.addEventListener("animationcancel", done, true);
                    location.hash = h;
                }, sw.hash);
                await page.waitForFunction(() => (window as unknown as { __w12eSettled?: boolean }).__w12eSettled === true, null, { timeout: 15_000 });
            }
            const before = await activeFace(page, sw.face);
            await armSwitchCensus(page);
            await sw.enter(page);
            await expect(sw.entered(page)).toBeVisible({ timeout: 10_000 });
            await page.waitForTimeout(900);
            const during = await activeFace(page, sw.face);
            await sw.leave(page);
            await page.waitForTimeout(900);
            const after = await activeFace(page, sw.face);
            const names = await readSwitchCensus(page);
            const faces = await page.locator(".glass-dock .dock-crossfade > .dock-face").count();
            const video = page.video();
            await ctx.close();
            if (video && WEBM_DIR) renameSync(await video.path(), `${WEBM_DIR}/${sw.id}.webm`);
            const consumer = names.filter((n) => CONSUMER_KEYFRAMES.some((k) => n === `CSSAnimation:${k}` || n.startsWith(`CSSAnimation:${k}-`)));
            console.log(JSON.stringify({ switch: sw.id, before, during, after, faces, names, consumer }, null, 1));
            expect(faces, "faces ride glass's DockCrossfade").toBeGreaterThanOrEqual(2);
            expect(during).not.toBe(before);
            expect(after).toBe(before);
            expect(consumer, "no consumer @keyframes on a dock layer switch").toEqual([]);
        });
    }

    test("(3) DOCK-TRIGGER-CLIP: hover / selected / focus-visible frames + the ancestor-chain clip census", async ({ browser, baseURL }) => {
        // 2× so the frames resolve the capsule edge the owner's retina frame shows
        const ctx = await browser.newContext({ baseURL, viewport: { width: 1440, height: 900 }, colorScheme: "dark", deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        await openHome(page, 1440, 900);
        const trigger = page.locator(".glass-dock .view-select-trigger");
        const tools = dockButton(page, "Toggle action bar");
        await expect(trigger).toBeVisible();

        /** Every ancestor that clips (overflow ≠ visible, clip-path, contain: paint). */
        const chain = () =>
            trigger.evaluate((el) => {
                const rows: { node: string; overflow: string; clipPath: string; contain: string; owner: string; cutBlock: number }[] = [];
                const t = el.getBoundingClientRect();
                const glassy = (e: Element) =>
                    [...e.classList].some((c) => /^(glass|dock)[-_]|^glass$|^dock$/.test(c)) || e.closest("[data-glass-owned]") === e;
                // the walk stops below <body>: html/body overflow is the
                // viewport's scroll box (and reka's scroll lock), not a clip
                for (let a = el.parentElement; a && a.tagName !== "BODY"; a = a.parentElement) {
                    const cs = getComputedStyle(a);
                    const ov = `${cs.overflowX} ${cs.overflowY}`;
                    const clips = ov !== "visible visible" || cs.clipPath !== "none" || /paint|strict|content/.test(cs.contain);
                    if (!clips) continue;
                    const r = a.getBoundingClientRect();
                    // the 1.1× hover capsule + ring reach ~ (h * 0.05 + 3px) past the trigger box
                    const reach = t.height * 0.05 + 3;
                    const cutBlock = Math.max(0, r.top - (t.top - reach), t.bottom + reach - r.bottom);
                    rows.push({
                        node: `${a.tagName.toLowerCase()}.${[...a.classList].join(".")}`,
                        overflow: ov,
                        clipPath: cs.clipPath,
                        contain: cs.contain,
                        owner: glassy(a) ? "producer" : "consumer",
                        cutBlock: +cutBlock.toFixed(2),
                    });
                }
                return rows;
            });

        const frames: Record<string, unknown> = {};
        const snap = async (state: string) => {
            frames[state] = await chain();
            if (FRAMES_DIR) {
                mkdirSync(FRAMES_DIR, { recursive: true });
                const box = (await page.locator(".glass-dock").first().boundingBox())!;
                await page.screenshot({
                    path: `${FRAMES_DIR}/dock-trigger-${state}.png`,
                    clip: { x: Math.max(0, box.x - 24), y: Math.max(0, box.y - 24), width: box.width + 48, height: box.height + 48 },
                });
            }
        };

        await page.mouse.move(2, 2);
        await page.waitForTimeout(500);
        await snap("rest");
        await trigger.hover();
        await page.waitForTimeout(600);
        await snap("hover");
        await page.mouse.move(2, 2);
        // selected: the Tools layer toggle's pressed seat is not reachable in
        // the main face once pressed (the layer swaps), so "selected" is the
        // view-select trigger open (aria-expanded=true → --dock-control-active-bg)
        await trigger.click();
        await page.waitForTimeout(600);
        await snap("selected");
        await page.keyboard.press("Escape");
        await page.waitForTimeout(400);
        // keyboard focus on the view trigger: from its next sibling, Shift+Tab
        await tools.focus();
        await page.keyboard.press("Shift+Tab");
        await page.waitForTimeout(500);
        await snap("focus-visible");
        const focusVisible = await trigger.evaluate((el) => el === document.activeElement && el.matches(":focus-visible"));

        await ctx.close();
        const all = Object.values(frames).flat() as { owner: string; node: string }[];
        const consumerClips = all.filter((r) => r.owner === "consumer");
        console.log(JSON.stringify({ focusVisible, frames }, null, 1));
        if (OUT_DIR) {
            mkdirSync(OUT_DIR, { recursive: true });
            writeFileSync(`${OUT_DIR}/trigger-clip-${Date.now()}.json`, JSON.stringify({ focusVisible, frames }, null, 1));
        }
        expect(focusVisible, "the focus-visible frame is a keyboard focus").toBe(true);
        // value.js's half: no consumer ancestor clips the dock trigger. The
        // producer row's clip (glass `.dock-layer--full`, O-63) is reported
        // above and carried as honest-RED DOCK-TRIGGER-CLIP.
        expect(consumerClips, "consumer ancestor clips around the dock").toEqual([]);
    });
});
