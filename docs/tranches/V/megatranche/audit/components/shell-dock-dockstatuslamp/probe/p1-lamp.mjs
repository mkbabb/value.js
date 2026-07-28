import { chromium } from "playwright";

const out = {};
const browser = await chromium.launch();

for (const [name, vp] of Object.entries({
    w1440: { width: 1440, height: 900 },
    w1024: { width: 1024, height: 800 },
    w1023: { width: 1023, height: 800 },
    w390: { width: 390, height: 844 },
})) {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Accessibility.enable");
    await page.goto("http://localhost:9000/", { waitUntil: "load" });
    await page.waitForSelector(".glass-dock", { timeout: 15000 });
    await page.waitForTimeout(1200);

    const dom = await page.evaluate(() => {
        const lamp = document.querySelector(".dock-status-lamp");
        if (!lamp) return { present: false };
        const label = lamp.querySelector(".lamp-label");
        const dot = lamp.querySelector(".lamp-dot");
        const cs = getComputedStyle(lamp);
        const lcs = label ? getComputedStyle(label) : null;
        const dcs = dot ? getComputedStyle(dot) : null;
        const r = lamp.getBoundingClientRect();
        const band = document.querySelector("nav.dock-band");
        const bandR = band?.getBoundingClientRect();
        const dock = document.querySelector(".glass-dock");
        const dockR = dock?.getBoundingClientRect();
        const layout = document.querySelector(".app-layout");
        const layoutCs = layout ? getComputedStyle(layout) : null;
        // interactive elements the lamp geometrically covers
        const covered = [...document.querySelectorAll(
            "nav.dock-band button, nav.dock-band [role='button'], nav.dock-band a, nav.dock-band input"
        )]
            .map((el) => ({ el, b: el.getBoundingClientRect() }))
            .filter(({ b }) =>
                b.width > 0 &&
                !(b.right <= r.left || b.left >= r.right || b.bottom <= r.top || b.top >= r.bottom))
            .map(({ el, b }) => ({
                tag: el.tagName.toLowerCase(),
                cls: el.className?.toString?.().slice(0, 60),
                aria: el.getAttribute("aria-label"),
                box: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
            }));
        const anims = lamp.querySelector(".lamp-dot")
            ? lamp.querySelector(".lamp-dot").getAnimations().map((a) => ({
                  name: a.animationName, state: a.playState,
              }))
            : [];
        // live-region census of the whole page
        const live = [...document.querySelectorAll("[role=alert],[role=status],[aria-live]")].map(
            (e) => ({
                role: e.getAttribute("role"),
                live: e.getAttribute("aria-live"),
                text: (e.textContent || "").trim().slice(0, 50),
                display: getComputedStyle(e).display,
            }),
        );
        return {
            present: true,
            role: lamp.getAttribute("role"),
            variant: lamp.getAttribute("data-variant"),
            textContent: (lamp.textContent || "").trim(),
            innerText: lamp.innerText?.trim?.() ?? null,
            labelDisplay: lcs?.display,
            labelText: label?.textContent?.trim(),
            dotAriaHidden: dot?.getAttribute("aria-hidden"),
            dotSize: dcs ? `${dcs.width} x ${dcs.height}` : null,
            pointerEvents: cs.pointerEvents,
            position: cs.position,
            color: cs.color,
            box: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
            bandBox: bandR && { x: +bandR.x.toFixed(1), w: +bandR.width.toFixed(1), h: +bandR.height.toFixed(1) },
            dockBox: dockR && { x: +dockR.x.toFixed(1), y: +dockR.y.toFixed(1), w: +dockR.width.toFixed(1), h: +dockR.height.toFixed(1) },
            lampOverlapsDock: dockR ? !(r.right <= dockR.left || r.left >= dockR.right || r.bottom <= dockR.top || r.top >= dockR.bottom) : null,
            layoutOverflow: layoutCs?.overflow,
            clippedRight: bandR ? +(r.right - bandR.right).toFixed(1) : null,
            coveredInteractive: covered,
            anims,
            liveRegions: live,
            elementFromLampCentre: (() => {
                const el = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
                return el ? el.tagName.toLowerCase() + "." + (el.className?.toString?.().slice(0, 50) ?? "") : null;
            })(),
        };
    });

    // CDP computed accessible name for the lamp
    let ax = null;
    if (dom.present) {
        const { root } = await cdp.send("DOM.getDocument", { depth: -1, pierce: true });
        const { nodeId } = await cdp.send("DOM.querySelector", {
            nodeId: root.nodeId,
            selector: ".dock-status-lamp",
        });
        if (nodeId) {
            const res = await cdp.send("Accessibility.getPartialAXTree", {
                nodeId,
                fetchRelatives: false,
            });
            const n = res.nodes[0];
            ax = {
                role: n?.role?.value,
                name: n?.name?.value,
                ignored: n?.ignored,
                ignoredReasons: n?.ignoredReasons?.map((r) => r.name),
                childIds: n?.childIds?.length,
            };
        }
    }
    out[name] = { viewport: vp, dom, ax };
    await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 2));
