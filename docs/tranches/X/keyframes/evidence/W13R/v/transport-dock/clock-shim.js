// Deterministic library clock (method 2): every rAF consumer (the keyframes.js engine + glass-ui's kf spring)
// reads its time from the rAF timestamp / performance.now; freeze() queues rAF callbacks, step(dt) flushes them at a
// fake monotonic time, and pauses+advances any WAAPI/CSS animation by the same dt. thaw() resumes real time (offset kept).
(() => {
  const rRAF = window.requestAnimationFrame.bind(window), rCAF = window.cancelAnimationFrame.bind(window), pn = performance.now.bind(performance);
  let manual = false, offset = 0, fakeT = 0, lastTs = 0, q = new Map(), hid = 1e9; const known = new Set();
  performance.now = () => (manual ? fakeT : pn() + offset);
  window.requestAnimationFrame = (cb) => { if (manual) { const h = hid++; q.set(h, cb); return h; } return rRAF((ts) => { lastTs = ts + offset; cb(ts + offset); }); };
  window.cancelAnimationFrame = (h) => { if (q.has(h)) q.delete(h); else rCAF(h); };
  const pauseAll = () => { for (const a of document.getAnimations()) if (!known.has(a)) { known.add(a); if (a.playState === "running") a.pause(); } };
  window.__clock = {
    freeze() { fakeT = Math.max(pn() + offset, lastTs); manual = true; known.clear(); pauseAll(); },
    step(dt) { fakeT += dt; for (const a of known) { try { if (a.playState === "paused") a.currentTime = (a.currentTime ?? 0) + dt; } catch {} } const cbs = [...q.values()]; q.clear(); for (const cb of cbs) { try { cb(fakeT); } catch (e) { console.error(e); } } pauseAll(); },
    thaw() { manual = false; offset = fakeT - pn(); for (const a of known) { try { if (a.playState === "paused") a.play(); } catch {} } known.clear(); const cbs = [...q.values()]; q.clear(); for (const cb of cbs) rRAF((ts) => cb(ts + offset)); },
    get t() { return fakeT; }, get manual() { return manual; },
  };
})();
