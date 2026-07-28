import { webkit } from "playwright";

const OUT = new URL("../../frames/", import.meta.url).pathname;

const probe = () => {
    const q = (s) => document.querySelector(s);
    const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2), bottom: +r.bottom.toFixed(2) };
    };
    // the pane root = the div wrapping the Card, inside the right slot
    const cards = [...document.querySelectorAll("main *")].filter((e) =>
        e.className && typeof e.className === "string" && e.className.includes("pane-scroll-fade"),
    );
    const mixCard = cards.find((c) => c.textContent.trim().startsWith("Mix"));
    const header = mixCard?.querySelector(".pane-header");
    const col = header?.nextElementSibling;               // the flex-col gap-4 content column
    const canvas = mixCard?.querySelector("canvas");
    const children = col ? [...col.children].map((c) => ({ tag: c.tagName, cls: (c.className||"").slice(0,60), ...rect(c) })) : [];
    const last = col?.lastElementChild;
    const cs = (el, ...props) => {
        if (!el) return null;
        const s = getComputedStyle(el);
        return Object.fromEntries(props.map((p) => [p, s.getPropertyValue(p)]));
    };
    return {
        viewport: { w: innerWidth, h: innerHeight },
        mainRect: rect(document.querySelector("main")),
        mixCard: rect(mixCard),
        mixCardStyles: cs(mixCard, "box-shadow", "contain", "overflow-y", "position", "padding-bottom"),
        header: rect(header),
        col: rect(col),
        colStyles: cs(col, "padding-left", "padding-right", "padding-top", "padding-bottom", "gap"),
        children,
        lastChildBottom: rect(last)?.bottom ?? null,
        canvas: rect(canvas),
        canvasStyles: cs(canvas, "position", "z-index", "pointer-events"),
        scroll: mixCard ? { scrollHeight: mixCard.scrollHeight, clientHeight: mixCard.clientHeight } : null,
        // sibling picker card for the two-part scene ratio
        allPaneCards: cards.map((c) => ({ label: c.textContent.trim().slice(0, 12), ...rect(c) })),
    };
};

const run = async (label, opts, actions) => {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, ...opts });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
    await p.waitForTimeout(4500);
    if (actions) await actions(p);
    const data = await p.evaluate(probe);
    console.log("### " + label);
    console.log(JSON.stringify(data, null, 2));
    await p.screenshot({ path: OUT + `D-${label}.png`, fullPage: false });
    await b.close();
};

await run("empty-1440", {});
