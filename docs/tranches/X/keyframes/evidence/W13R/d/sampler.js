// SERVED MODEL: claude-opus-5-5 — KF.W13R.d per-rAF dock-morph sampler (OA-41/OA-48): blur on text, rows, radius, width, morph span.
window.__morph = (() => {
  let frames = [], raf = 0;
  const blurOf = (v) => /blur\(\s*(?!0(px)?\s*\))[^)]*\)/.test(v || '');
  const textEls = (d) => [...d.querySelectorAll('*')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && e.getClientRects().length);
  function one(sel) {
    const d = document.querySelector(sel); if (!d) return null;
    const r = d.getBoundingClientRect(), cs = getComputedStyle(d);
    const plate = d.querySelector('.dock-plate'); const ps = plate ? getComputedStyle(plate) : null; const pr = plate?.getBoundingClientRect();
    // blur on text: filter anywhere on the text's chain up to (and incl.) the dock root; backdrop-filter on the text or a chain element (the plate is a sibling layer, never on the chain)
    let textBlur = 0; const owners = new Set();
    for (const t of textEls(d)) { for (let e = t; e; e = e.parentElement) { const s = getComputedStyle(e); if (blurOf(s.filter) || blurOf(s.backdropFilter)) { textBlur++; owners.add((e.className?.baseVal ?? e.className ?? e.tagName).toString().split(/\s+/).slice(0, 2).join('.') + '{' + (blurOf(s.filter) ? s.filter : s.backdropFilter) + '}'); break; } if (e === d) break; } }
    // rows: visible children of the active full layer, grouped by top (±2 px)
    const kids = [...d.querySelectorAll('.dock-layer.is-active > *, .dock-layer--full > *')].filter((k) => { const kr = k.getBoundingClientRect(); return kr.width > 0 && kr.height > 0 && +getComputedStyle(k).opacity > 0.01; });
    // a row = a band of child centres within 12 px (separators and 40 px triggers share a row; a wrapped second row sits >= 24 px lower)
    const tops = []; for (const k of kids) { const kr = k.getBoundingClientRect(); const y = kr.top + kr.height / 2; if (!tops.some((v) => Math.abs(v - y) <= 12)) tops.push(y); }
    // scale/transform on the text chain (a scaled raster reads soft), and two animation owners on one target|property
    let textScale = 0; for (const t of textEls(d)) { for (let e = t; e; e = e.parentElement) { const s = getComputedStyle(e); if ((s.scale !== 'none' && s.scale !== '1') || (s.transform !== 'none' && !/^matrix\(1, 0, 0, 1, /.test(s.transform))) { textScale++; break; } if (e === d) break; } }
    const own = {}; for (const a of document.getAnimations()) { const tg = a.effect?.target; if (!tg || !(tg === d || d.contains(tg))) continue; const ps = a.transitionProperty ? [a.transitionProperty] : (a.effect.getKeyframes?.() ?? []).flatMap((k) => Object.keys(k).filter((x) => !['offset', 'easing', 'composite', 'computedOffset'].includes(x))); for (const pp of new Set(ps)) { const k = (tg.className?.baseVal ?? tg.className ?? tg.tagName).toString().split(/\s+/).slice(0, 2).join('.') + (a.effect.pseudoElement || '') + '|' + pp; own[k] = (own[k] || 0) + 1; } }
    const dbl = Object.entries(own).filter(([, n]) => n > 1).map(([k]) => k);
    return { w: +r.width.toFixed(2), h: +r.height.toFixed(2), x: +r.x.toFixed(2), morph: d.hasAttribute('data-morphing'), cls: d.classList.contains('expanded') ? 'E' : 'C', mt: cs.getPropertyValue('--dock-morph-t').trim(),
      rad: cs.borderTopLeftRadius, prad: ps?.borderTopLeftRadius ?? null, pw: pr ? +pr.width.toFixed(2) : null, dFilter: cs.filter, pBackdrop: ps?.backdropFilter ?? null, textBlur, owners: [...owners], textScale, dbl, rows: tops.length, kids: kids.length };
  }
  return {
    start(sels) { frames = []; const loop = () => { const f = { t: performance.now() }; for (const [k, s] of Object.entries(sels)) f[k] = one(s); frames.push(f); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop); },
    stop() { cancelAnimationFrame(raf); return frames; },
    tokens() { const s = getComputedStyle(document.documentElement); return Object.fromEntries(['--spring-dock-duration', '--spring-dock-settle', '--spring-dock-exit-duration', '--duration-panel', '--duration-slow', '--duration-normal', '--motion-tempo'].map((k) => [k, s.getPropertyValue(k).trim()])); },
  };
})();
