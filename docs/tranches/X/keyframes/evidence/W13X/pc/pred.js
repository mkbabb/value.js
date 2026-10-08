// SERVED MODEL: claude-opus-5-5
// KF.W13X.pc served falsifier — predicate half (evaluated in the page).
// phase "geom": every PAINTED card inside the desktop rail has its four corners
// inside every clipping ancestor's clip box (no corner cut square by
// .controls-surface or any other scroll port); returns the cards and the last
// control's reach.
(view) => {
    const rail = document.querySelector(".controls-pane-wrapper");
    if (!rail) return { error: "no .controls-pane-wrapper" };
    const alpha = (c) => {
        if (!c || c === "transparent") return 0;
        const m = c.match(/\/\s*([\d.]+)\s*\)$/) || c.match(/rgba\([^)]*,\s*([\d.]+)\)$/);
        return m ? parseFloat(m[1]) : 1;
    };
    const painted = (e) => {
        const cs = getComputedStyle(e);
        if (parseFloat(cs.borderTopLeftRadius) < 8) return false;
        const r = e.getBoundingClientRect();
        if (r.width < 150 || r.height < 60) return false;
        if (cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) return false;
        return (
            alpha(cs.backgroundColor) > 0.02 ||
            (parseFloat(cs.borderBottomWidth) > 0 && alpha(cs.borderBottomColor) > 0.02) ||
            cs.backdropFilter !== "none" ||
            cs.boxShadow !== "none"
        );
    };
    const clipChain = (e) => {
        const out = [];
        for (let a = e.parentElement; a; a = a.parentElement) {
            const cs = getComputedStyle(a);
            if (cs.overflowX !== "visible" || cs.overflowY !== "visible") {
                const r = a.getBoundingClientRect();
                const bl = parseFloat(cs.borderLeftWidth), bt = parseFloat(cs.borderTopWidth);
                out.push({
                    who: a.tagName.toLowerCase() + "." + [...a.classList].slice(0, 2).join("."),
                    l: r.left + bl, t: r.top + bt,
                    r: r.left + bl + a.clientWidth, b: r.top + bt + a.clientHeight,
                });
            }
            if (a === rail) break;
        }
        return out;
    };
    // A CARD is a plate: glass Card / Configurator layer / panel — not a control
    // inside a scroll port (a port cuts its scrolled content by definition).
    const cards = [...rail.querySelectorAll('.card, [data-slot="card"], .configurator-layer, .glass-panel')].filter((e) => e.offsetParent && painted(e));
    const cut = [];
    const boxes = [];
    for (const c of cards) {
        const r = c.getBoundingClientRect();
        const name = c.tagName.toLowerCase() + "." + [...c.classList].slice(0, 3).join(".");
        const vis = { l: r.left, t: r.top, r: r.right, b: r.bottom };
        for (const k of clipChain(c)) {
            const sides = [];
            if (r.left < k.l - 1) sides.push("left");
            if (r.top < k.t - 1) sides.push("top");
            if (r.right > k.r + 1) sides.push("right");
            if (r.bottom > k.b + 1) sides.push("bottom");
            if (sides.length) cut.push(`${name} cut ${sides.join("+")} by ${k.who} (card ${Math.round(r.top)}..${Math.round(r.bottom)} clip ${Math.round(k.t)}..${Math.round(k.b)})`);
            vis.l = Math.max(vis.l, k.l); vis.t = Math.max(vis.t, k.t);
            vis.r = Math.min(vis.r, k.r); vis.b = Math.min(vis.b, k.b);
        }
        if (vis.r > vis.l && vis.b > vis.t) boxes.push({ name, ...vis, radius: parseFloat(getComputedStyle(c).borderTopLeftRadius) });
    }
    // the pane's last control
    const surf = [...rail.querySelectorAll(".controls-surface")].find((e) => e.offsetParent) || rail;
    let last = null;
    if (view === "easing") last = [...surf.querySelectorAll(".param-row")].at(-1);
    if (view === "spring") last = surf.querySelector(".spring-heatmap[role=application]");
    // the pane's LAST control in document order: in view at the end of the wheel
    const ctl = [...surf.querySelectorAll('button, input, select, textarea, [role=slider], [tabindex]:not([tabindex="-1"])')]
        .filter((e) => e.offsetParent).at(-1);
    const lim = (e) => {
        const o = { t: 0, b: innerHeight, l: 0, r: innerWidth };
        for (const k of clipChain(e)) {
            o.t = Math.max(o.t, k.t); o.b = Math.min(o.b, k.b);
            o.l = Math.max(o.l, k.l); o.r = Math.min(o.r, k.r);
        }
        return o;
    };
    const readReach = (e) => {
        if (!e) return { found: false };
        const r = e.getBoundingClientRect(), L = lim(e);
        const inView = r.top >= L.t - 1 && r.bottom <= L.b + 1;
        const cx = (r.left + r.right) / 2, cy = (Math.max(r.top, L.t) + Math.min(r.bottom, L.b)) / 2;
        const hit = document.elementFromPoint(cx, cy);
        // a slider's thumb is pressed through its root (track + thumb)
        const own = e.getAttribute("role") === "slider" ? e.parentElement : e;
        return {
            found: true, inView,
            hit: !!hit && (own === hit || own.contains(hit) || hit.contains(own)),
            hitWho: hit ? hit.tagName.toLowerCase() + "." + [...hit.classList].slice(0, 2).join(".") : null,
            top: Math.round(r.top), bottom: Math.round(r.bottom), portT: Math.round(L.t), portB: Math.round(L.b),
        };
    };
    // the NAMED control (Easing duration row / Spring heatmap) must be wholly
    // presentable: no taller than the port, inside the scroll range, and not
    // cut on the inline axis (the port has no inline scroll: a cut there is
    // permanent).
    let named = { found: !!last };
    if (last) {
        const r = last.getBoundingClientRect(), L = lim(last);
        const fits = r.height <= L.b - L.t + 1;
        let inRange = true;
        if (surf !== rail) {
            const sr = surf.getBoundingClientRect();
            const top = r.top - sr.top + surf.scrollTop;
            inRange = top >= 0 && top + r.height <= surf.scrollHeight + 1;
        }
        const inline = r.left >= L.l - 1 && r.right <= L.r + 1;
        named = { found: true, fits, inRange, inline, h: Math.round(r.height), port: Math.round(L.b - L.t), x: `${Math.round(r.left)}..${Math.round(r.right)}`, portX: `${Math.round(L.l)}..${Math.round(L.r)}` };
    }
    const reach = { last: readReach(ctl), lastWho: ctl ? ctl.tagName.toLowerCase() + "." + [...ctl.classList].slice(0, 2).join(".") : null, named };
    return { cut, boxes, reach, surfaceScroll: surf === rail ? null : { sh: surf.scrollHeight, ch: surf.clientHeight } };
}
