import { webkit } from "playwright";

const ORIGIN = "http://localhost:9000";
const out = {};

const browser = await webkit.launch();

async function run(id, opts) {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3500);

    const r = await page.evaluate(() => {
        const res = {};
        const rail = document.querySelector('[data-o18="extract-k-rail"]');
        const kc = document.querySelector('[data-o18="extract-kc"]');
        res.railFound = !!rail;
        res.kcFound = !!kc;

        let cluster = null;
        if (rail && kc) {
            let a = rail;
            while (a && !a.contains(kc)) a = a.parentElement;
            cluster = a;
        }
        res.clusterCls = cluster ? cluster.className : null;

        const rect = (el) => {
            if (!el) return null;
            const b = el.getBoundingClientRect();
            return { w: +b.width.toFixed(2), h: +b.height.toFixed(2), x: +b.x.toFixed(2), y: +b.y.toFixed(2) };
        };
        const cs = (el, props) => {
            if (!el) return null;
            const s = getComputedStyle(el);
            const o = {};
            for (const p of props) o[p] = s.getPropertyValue(p);
            return o;
        };

        res.buttons = [];
        if (cluster) {
            for (const b of cluster.querySelectorAll("button")) {
                res.buttons.push({
                    title: b.getAttribute("title"),
                    ariaLabel: b.getAttribute("aria-label"),
                    ariaPressed: b.getAttribute("aria-pressed"),
                    dataActive: b.getAttribute("data-active"),
                    text: b.textContent.trim(),
                    disabled: b.disabled,
                    rect: rect(b),
                });
            }
        }

        res.separators = [...(cluster ? cluster.querySelectorAll('[role="separator"]') : [])].map((s) => ({
            rect: rect(s),
            cls: s.className,
            style: cs(s, ["background-color", "width", "height", "opacity", "border-left-width"]),
        }));

        res.thumbs = [];
        for (const t of document.querySelectorAll('[aria-label="Number of colors"], [aria-label="Chroma weight"]')) {
            res.thumbs.push({
                label: t.getAttribute("aria-label"),
                tag: t.tagName.toLowerCase(),
                role: t.getAttribute("role"),
                rect: rect(t),
                valuenow: t.getAttribute("aria-valuenow"),
                valuetext: t.getAttribute("aria-valuetext"),
                tabindex: t.getAttribute("tabindex"),
                parentRect: rect(t.parentElement),
                parentCls: t.parentElement ? String(t.parentElement.className) : null,
            });
        }

        const labels = cluster ? [...cluster.querySelectorAll("label")] : [];
        const typo = ["font-family", "font-size", "font-weight", "color", "width", "line-height"];
        res.labels = labels.map((l) => ({
            text: l.textContent.trim(),
            htmlFor: l.htmlFor,
            hasControl: !!l.control,
            title: l.getAttribute("title"),
            cls: l.className,
            rect: rect(l),
            cs: cs(l, typo),
            scrollW: l.scrollWidth,
            clientW: l.clientWidth,
        }));

        const kcReadout = kc ? kc.querySelector("span") : null;
        res.kcReadout = kcReadout
            ? { text: kcReadout.textContent.trim(), cls: kcReadout.className, rect: rect(kcReadout), cs: cs(kcReadout, typo), scrollW: kcReadout.scrollWidth, clientW: kcReadout.clientWidth }
            : null;

        res.rail = rail
            ? { rect: rect(rail), cs: cs(rail, ["background-image", "background-color", "box-shadow", "border-radius"]), inlineStyle: rail.getAttribute("style") }
            : null;

        let g = rail ? rail.parentElement : null;
        const grounds = [];
        while (g && grounds.length < 8) {
            const bg = getComputedStyle(g).backgroundColor;
            if (bg && bg !== "rgba(0, 0, 0, 0)") grounds.push({ cls: String(g.className).slice(0, 80), bg });
            g = g.parentElement;
        }
        res.grounds = grounds;

        const main = document.querySelector("main");
        res.touchGateInMain = main ? main.querySelectorAll(".touch-gate-target").length : -1;
        res.touchGateGlobal = document.querySelectorAll(".touch-gate-target").length;

        res.icons = [...(cluster ? cluster.querySelectorAll("svg") : [])].map((s) => ({
            cls: typeof s.className === "object" ? s.className.baseVal : String(s.className),
            cs: cs(s, ["transition-property", "transition-duration", "transition-timing-function"]),
            rect: rect(s),
        }));

        const probe = document.createElement("span");
        probe.textContent = "1.5";
        document.body.appendChild(probe);
        const tokens = {};
        for (const c of ["text-micro", "text-mono-small", "text-small", "text-body", "fira-code text-micro tabular-nums"]) {
            probe.className = c;
            const s = getComputedStyle(probe);
            tokens[c] = { fontSize: s.fontSize, lineHeight: s.lineHeight, fontFamily: s.fontFamily.slice(0, 46), inkWidth: +probe.getBoundingClientRect().width.toFixed(2) };
        }
        probe.remove();
        res.tokens = tokens;

        const root = getComputedStyle(document.documentElement);
        res.inkMuted = root.getPropertyValue("--ink-muted");
        res.mutedFg = root.getPropertyValue("--muted-foreground");

        return res;
    });

    const aria = await page.locator("main").ariaSnapshot();
    r.ariaSnapshot = aria
        .split("\n")
        .filter((l) => /button|slider|separator/.test(l))
        .join("\n");

    out[id] = r;
    await ctx.close();
}

await run("desktop", { viewport: { width: 1440, height: 900 } });
await run("mobile", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
await run("reduced-motion", { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await run("forced-colors", { viewport: { width: 1440, height: 900 }, forcedColors: "active" });

await browser.close();
console.log(JSON.stringify(out, null, 2));
