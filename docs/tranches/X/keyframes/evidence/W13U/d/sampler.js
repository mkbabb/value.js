// SERVED MODEL: claude-opus-5-5 — in-page rAF sampler for dock transitions (G-KFW13U-d).
window.__dockProbe = (() => {
  let frames = [], shifts = [], raf = 0, po = null;
  const key = (el) => { if (!el || !el.tagName) return String(el); const c = (el.className && (el.className.baseVal ?? el.className)) || ''; return el.tagName.toLowerCase() + '.' + c.split(/\s+/).filter(Boolean).slice(0, 2).join('.') + '#' + (el.__pid ??= Math.random().toString(36).slice(2, 6)); };
  const props = (a) => a.transitionProperty ? [a.transitionProperty] : (a.effect?.getKeyframes?.() ?? []).flatMap(k => Object.keys(k).filter(x => !['offset', 'easing', 'composite', 'computedOffset'].includes(x)));
  function sample() {
    const d = document.querySelector('[data-dock-tether=top] .glass-dock'); if (!d) return;
    const r = d.getBoundingClientRect(), cs = getComputedStyle(d);
    const text = d.querySelector('.dock-layer.is-active [data-slot=select-value], .dock-layer.is-active .dock-label span') || null;
    const tr = text?.getBoundingClientRect();
    // blur/scale owners on the text's ancestor chain
    const chain = []; for (let e = text; e && e !== document.body; e = e.parentElement) { const s = getComputedStyle(e); if (s.filter !== 'none' || s.scale !== 'none' || s.transform !== 'none' || s.backdropFilter !== 'none' && e === text) chain.push(key(e) + '{f:' + s.filter + ';s:' + s.scale + ';t:' + s.transform.slice(0, 40) + '}'); }
    const owners = {}; const running = []; const implicit = []; const morph = d.hasAttribute('data-morphing');
    for (const a of document.getAnimations()) { const t = a.effect?.target; if (!t || !(d.contains(t) || t === d)) continue; const pe = a.effect.pseudoElement || ''; for (const p of props(a)) { const k = key(t) + pe + '|' + p; if (morph && !pe && ((['opacity','scale','transform','translate'].includes(p) && t.matches('.dock-layer.is-active > *')) || (['filter','scale','transform'].includes(p) && t === d))) implicit.push(key(t) + '|' + p + '|spring+' + a.constructor.name); owners[k] = (owners[k] || 0) + 1; running.push(k + '|' + a.constructor.name); } }
    // implicit owner: an element whose CSS transition covers a property the spring drives THIS frame
    frames.push({ kids: d.querySelectorAll('.dock-layer.is-active > *').length, t: performance.now(), morph, cls: d.classList.contains('expanded') ? 'E' : 'C', x: r.x, y: r.y, w: r.width, h: r.height, filter: cs.filter, dscale: cs.scale, dtf: cs.transform.slice(0, 60), mt: cs.getPropertyValue('--dock-morph-t'), tx: tr?.x, ty: tr?.y, chain, running, implicit, dbl: Object.entries(owners).filter(([, n]) => n > 1).map(([k]) => k) });
  }
  return {
    start() { frames = []; shifts = []; po = new PerformanceObserver(l => { for (const e of l.getEntries()) shifts.push({ v: e.value, src: (e.sources || []).map(s => key(s.node)) }); }); po.observe({ type: 'layout-shift', buffered: false }); const loop = () => { sample(); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop); },
    stop() { cancelAnimationFrame(raf); po?.disconnect(); return { frames, shifts }; },
  };
})();
