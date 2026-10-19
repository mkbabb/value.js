// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.scene · init-script instrument (read-only): VT calls, the capture-time overlay/name census, a per-rAF sampler
(() => {
  const vis = (e) => { if (!e) return false; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && +cs.opacity > 0.05 && cs.visibility !== "hidden"; };
  const box = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return r.width ? [r.x, r.y, r.width, r.height].map((v) => Math.round(v)) : null; };
  const W = (window.__vt = { calls: [], frames: [] });
  const orig = Document.prototype.startViewTransition;
  if (orig) Document.prototype.startViewTransition = function (arg) {
    const t0 = performance.now();
    const rec = { t: t0, listbox: [...document.querySelectorAll('[role=listbox],[role=menu]')].filter(vis).length,
      names: [...document.querySelectorAll("body *")].map((e) => getComputedStyle(e).viewTransitionName).filter((n) => n && n !== "none") };
    W.calls.push(rec);
    const vt = orig.call(this, arg);
    vt.ready.then(() => (rec.ready = performance.now()), () => (rec.ready = -1));
    vt.finished.then(() => (rec.finished = performance.now()), () => (rec.finished = -1));
    return vt;
  };
  window.__sample = (ms) => new Promise((res) => {
    const out = []; const t0 = performance.now(); let last = t0;
    const tick = (t) => {
      const sk = document.querySelector(".scene-skeleton");
      const pane = document.querySelector(".controls-pane-wrapper");
      const lbl = document.querySelector('[data-dock-tether=top] .dock-select-trigger[aria-label=Scene]');
      out.push({ t: Math.round(t), dt: Math.round(t - last), sk: !!sk, skOp: sk ? +(+getComputedStyle(sk).opacity).toFixed(2) : null, pane: vis(pane), paneBox: box(pane),
        stage: box(document.querySelector(".scene-host")), lb: [...document.querySelectorAll('[role=listbox]')].filter(vis).length,
        label: lbl?.textContent?.trim() ?? null, vt: document.documentElement.matches(":active-view-transition") });
      last = t; if (t - t0 < ms) requestAnimationFrame(tick); else res(out);
    };
    requestAnimationFrame(tick);
  });
})();
