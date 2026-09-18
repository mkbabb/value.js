/* CHALLENGE-D · FlagReportDialog — reproduction harness.
 *
 * The component is unreachable through the UI: its only entry point is
 * PaletteCardMenu.vue:143-150 (`v-if="paletteKind === 'remote' && !isOwned"`),
 * and the commons is down (`curl http://localhost:9000/api/palettes` returns the
 * SPA fallback). So we mount the real SFC through the live Vite graph, inside the
 * running app's cascade — real tokens, real glass, real fonts, real ambient ground.
 *
 * Usage: open http://localhost:9000/#/browse, paste this whole file into the
 * console, then call the numbered probes.
 */

const BASE = "/@fs/Users/mkbabb/Programming/value.js";
const vue = await import(BASE + "/node_modules/.vite/deps/vue.js");
const mod = await import(BASE + "/demo/palettes/browser/dialog/FlagReportDialog.vue");

window.__mountProbe = async (name = "Sunset Over the Bay") => {
    window.__probeApp && window.__probeApp.unmount();
    document.getElementById("probe-host")?.remove();
    document
        .querySelectorAll('[role="dialog"]')
        .forEach((d) =>
            (d.parentElement && d.parentElement !== document.body
                ? d.parentElement
                : d
            ).remove(),
        );
    await new Promise((r) => setTimeout(r, 200));
    const host = document.createElement("div");
    host.id = "probe-host";
    document.body.appendChild(host);
    const state = vue.reactive({ open: true, name });
    window.__probe = { state, emits: [] };
    const app = vue.createApp({
        setup() {
            return () =>
                vue.h(mod.default, {
                    open: state.open,
                    paletteName: state.name,
                    paletteSlug: "s",
                    "onUpdate:open": (v) => (state.open = v),
                    onSubmit: (r, d) => window.__probe.emits.push([r, d]),
                });
        },
    });
    app.mount(host);
    window.__probeApp = app;
    await new Promise((r) => setTimeout(r, 900));
    return document.querySelectorAll('[role="dialog"]').length;
};

const dlg = () => document.querySelector('[role="dialog"]');
const setVal = (el, v) => {
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value").set.call(el, v);
    el.dispatchEvent(new Event("input", { bubbles: true }));
};

/* -- D-1 : the destructive commit and the escape are the same button ---------- */
window.probeD1 = async () => {
    await window.__mountProbe();
    dlg().querySelector("#reason-copyright").click();
    await new Promise((r) => setTimeout(r, 600));
    const b = [...dlg().querySelectorAll("button")];
    const c = b.find((x) => x.textContent.trim() === "Cancel");
    const r = b.find((x) => x.textContent.trim() === "Report");
    const pick = (el) => {
        const s = getComputedStyle(el);
        return {
            bg: s.backgroundColor, color: s.color, fontSize: s.fontSize,
            fontWeight: s.fontWeight, radius: s.borderRadius, boxShadow: s.boxShadow,
            opacity: s.opacity, w: Math.round(el.getBoundingClientRect().width),
        };
    };
    const cc = pick(c), rr = pick(r);
    return {
        enabledReport: !r.disabled,
        cancelAttrs: [...c.attributes].map((a) => a.name + "=" + a.value),
        reportAttrs: [...r.attributes].map((a) => a.name + "=" + a.value),
        differingComputedProps: Object.keys(cc).filter((k) => cc[k] !== rr[k]),
    };
    // observed: differingComputedProps: ["w"]  (86 vs 84)
    //           both carry data-emphasis=secondary data-tone=neutral, variant=<dead attr>
};

/* -- D-2 : the loading state never paints ------------------------------------ */
window.probeD2 = async () => {
    await window.__mountProbe();
    dlg().querySelector("#reason-spam").click();
    setVal(dlg().querySelector("textarea"), "THIS TEXT SHOULD NOT SURVIVE A CANCEL");
    await new Promise((r) => setTimeout(r, 120));
    let spinnerSeen = false;
    const mo = new MutationObserver(() => {
        if (document.querySelector(".animate-spin")) spinnerSeen = true;
    });
    mo.observe(document.body, { childList: true, subtree: true, attributes: true });
    [...dlg().querySelectorAll("button")]
        .find((b) => b.textContent.trim() === "Report")
        .click();
    const sync = !!document.querySelector(".animate-spin");
    await new Promise((r) => setTimeout(r, 500));
    mo.disconnect();
    return {
        spinnerSyncAfterClick: sync,
        spinnerEverSeen: spinnerSeen,
        emits: JSON.parse(JSON.stringify(window.__probe.emits)),
        stateAfterSubmit: { detail: dlg().querySelector("textarea").value, open: window.__probe.state.open },
    };
    // observed: false / false / [["spam","THIS TEXT…"]] / { detail:"", open:true }
};

/* -- D-3 : one reporter's text is handed to the next palette ------------------ */
window.probeD3 = async () => {
    await window.__mountProbe("Palette A");
    dlg().querySelector("#reason-copyright").click();
    setVal(dlg().querySelector("textarea"), "private note about palette A");
    await new Promise((r) => setTimeout(r, 100));
    [...dlg().querySelectorAll("button")].find((b) => b.textContent.trim() === "Cancel").click();
    await new Promise((r) => setTimeout(r, 500));
    // BrowsePane.vue:168 mounts under v-if="flagPalette", and flagPalette is never
    // nulled (BrowsePane.vue:288-299) — so the instance survives every close.
    window.__probe.state.name = "Someone Else's Palette B";
    window.__probe.state.open = true;
    await new Promise((r) => setTimeout(r, 600));
    return {
        subject: dlg().querySelector("p").textContent.trim(),
        leakedDetail: dlg().querySelector("textarea").value,
        leakedReason: [...dlg().querySelectorAll('[role="radio"]')]
            .filter((r) => r.getAttribute("aria-checked") === "true")
            .map((r) => r.id),
        reportArmed: ![...dlg().querySelectorAll("button")]
            .find((b) => b.textContent.trim() === "Report").disabled,
    };
    // observed: subject names palette B, leakedDetail = "private note about palette A",
    //           leakedReason = ["reason-copyright"], reportArmed = true
};

/* -- D-5 : the 44px radio seats overlap by 13.05px, three times --------------- */
window.probeD5 = async () => {
    await window.__mountProbe();
    const items = [...dlg().querySelectorAll('[role="radio"]')];
    const rects = items.map((i) => i.getBoundingClientRect());
    const overlaps = [];
    for (let i = 0; i < rects.length - 1; i++) {
        const ov = rects[i].bottom - rects[i + 1].top;
        if (ov <= 0) continue;
        const midY = (rects[i + 1].top + rects[i].bottom) / 2;
        const midX = rects[i].left + rects[i].width / 2;
        const hit = document.elementFromPoint(midX, midY);
        overlaps.push({
            pair: [items[i].id, items[i + 1].id],
            overlapPx: +ov.toFixed(2),
            probePoint: [Math.round(midX), Math.round(midY)],
            hitId: hit?.closest('[role="radio"]')?.id ?? null,
        });
    }
    return {
        seatH: Math.round(rects[0].height),
        pitch: +(rects[1].top - rects[0].top).toFixed(2),
        faceD: dlg().querySelector(".radio-group__face").getBoundingClientRect().width,
        overlaps,
    };
    // observed: seatH 44 · pitch 30.95 · faceD 18 · 3 overlaps of 13.05px,
    //           each hit-tested to the LOWER radio
};

/* -- D-6/D-7/D-8/D-10 : names, rhythm, geometry, type ------------------------- */
window.probeGeometry = async () => {
    await window.__mountProbe();
    const d = dlg(), r = (el) => el.getBoundingClientRect();
    const title = d.querySelector("h2"), desc = d.querySelector("p");
    const rg = d.querySelector('[role="radiogroup"]'), ta = d.querySelector("textarea");
    const footer = [...d.children].find((c) => /Cancel/.test(c.textContent) && c.querySelector("button"));
    return {
        radiogroupName: { ariaLabel: rg.getAttribute("aria-label"), ariaLabelledby: rg.getAttribute("aria-labelledby") },
        gaps: {
            "title→desc": +(r(desc).top - r(title).bottom).toFixed(2),
            "desc→radios": +(r(rg).top - r(desc).bottom).toFixed(2),
            "radios→textarea": +(r(ta).top - r(rg).bottom).toFixed(2),
            "textarea→footer": +(r(footer).top - r(ta).bottom).toFixed(2),
        },
        textarea: {
            clientH: ta.clientHeight,
            lineHeight: getComputedStyle(ta).lineHeight,
            visibleLines: +(ta.clientHeight / parseFloat(getComputedStyle(ta).lineHeight)).toFixed(2),
            resize: getComputedStyle(ta).resize,
            bg: getComputedStyle(ta).backgroundColor,
            radius: getComputedStyle(ta).borderRadius,
        },
        radii: { dialog: getComputedStyle(d).borderRadius, textarea: getComputedStyle(ta).borderRadius,
                 button: getComputedStyle([...d.querySelectorAll("button")].find((b) => b.textContent.trim() === "Cancel")).borderRadius },
        type: { title: getComputedStyle(title).fontSize, desc: getComputedStyle(desc).fontSize,
                label: getComputedStyle(d.querySelector("label")).fontSize },
        counterPresent: /\d+\s*\/\s*500/.test(d.textContent),
    };
    // observed (1440×900 light):
    //   radiogroupName: { null, null }
    //   gaps: title→desc 6 · desc→radios 24 · radios→textarea 12 · textarea→footer 24
    //   textarea: clientH 78, visibleLines 3.98, resize "none", bg rgb(251,250,248), radius 4px
    //   radii: dialog 16px / textarea 4px / button 9999px
    //   type:  title 20.352px · desc 14px · label 16.4px   ← help smaller than controls
    //   counterPresent: false
};

/* -- focus register : programmatic .focus() has a ZERO delta ------------------ */
window.probeFocus = async () => {
    await window.__mountProbe();
    const items = [...dlg().querySelectorAll('[role="radio"]')];
    items[1].click();
    await new Promise((r) => setTimeout(r, 700));
    items[0].focus(); // programmatic — does NOT set :focus-visible
    await new Promise((r) => setTimeout(r, 700));
    const probe = (el) => {
        const s = getComputedStyle(el), f = getComputedStyle(el.querySelector(".radio-group__face"));
        return { outline: s.outline, boxShadow: s.boxShadow, faceBg: f.backgroundColor,
                 faceBorder: f.borderColor, faceShadow: f.boxShadow };
    };
    const a = probe(items[0]), b = probe(items[2]);
    return { focusedUnchecked: a, plainUnchecked: b,
             FOCUS_DELTA_IS_ZERO: JSON.stringify(a) === JSON.stringify(b) };
    // observed: FOCUS_DELTA_IS_ZERO true — identical face bg/border/shadow, outline "…none 3px".
    // A real keyboard Tab (:focus-visible) does yield a ring:
    //   faceShadow "color(srgb .9999 .9247 .9331 / 0.3) 0 0 0 2px, … / 0.15) 0 0 8px 0"
    //   — a 30% alpha glow on an 18px face, distinguished from CHECKED only by hue.
};

console.log(
    "probes ready: probeD1() probeD2() probeD3() probeD5() probeGeometry() probeFocus()",
);
