OD-14 dock transition trace — value.js seat, READ-ONLY on glass (COHESION §0hk OD-14; relayed to glass as O-128 / glass BL INBOUND O-124)
2026-11-03 ~21:50-22:05 local, post-reboot.

SERVED BYTES
  value.js tranche-u @ 64ee320ea (localhost:9000, API :3000) and https://color.babb.dev (prod).
  glass consumed = @mkbabb/glass-ui 10.1.3 (node_modules; tag v10.1.3 = a76edb789). glass master HEAD (85c9adbf3) has
  moved past 10.1.3 (e.g. --dock-pane-shift is gone from src), so every glass line below is cited AT v10.1.3
  (`git -C glass-ui show v10.1.3:<path>`), the bytes the owner is looking at.

METHOD
  Playwright chromium headless shell, one browser per run, a context per cell, dark, 1800x1000@2x and 390x844@3x (touch).
  Per transition: CDP trace (devtools.timeline + .frame + viz/cc/gpu), rAF delta sampler, PerformanceObserver
  long-animation-frame + longtask, document.getAnimations() sampled at +16/+60/+120/+220 ms, ResizeObserver on the dock
  box/plate/layers/run, MutationObserver on style/class. The window starts at the click (collapse: at the class flip
  after the 3600 ms idle delay) and ends when [data-morphing] clears and no finite dock animation is running.
  Two compositor paths:
    (a) headless default = SoftwareRenderer (SwiftShader) — summary-swiftshader.json
    (b) GPU witness = headless shell + --use-angle=metal --enable-gpu-rasterization — summary-gpu-angle-metal.json
        (named need: frame timing on a real GPU compositor; the owner's Mac composites on the GPU).
  Separate visual-continuity witness (probe-od14-geom.mjs, GPU path): per-rAF painted plate rect (includes transforms),
  offsetWidth, computed scale, --dock-morph-t, border-radius, padding-inline, face opacities — geom-gpu-per-frame.json.
  (This one forces layout per frame, so its numbers are never mixed into the timing tables.)
  Headless ticks rAF at 120 Hz (idle p50 8.3 ms); "dropped@60" = sum(round(dt/16.67)-1).
  Raw traces (>2 MB each, 0.9 GB total): ~/.dev-logs/x-0hk/trace/r2/ (SwiftShader) and ~/.dev-logs/x-0hk/trace/gpu/.

TRANSITIONS
  collapse              mouse leaves the expanded desktop dock; idle collapse (DOCK_COLLAPSE_DELAY_MS 3600)
  expand                mouse enters the collapsed dock (hover expand)
  face-to-actionbar     "Toggle action bar"  (main face -> action-bar layer)
  actionbar-to-input    "Open color input"   (action-bar arm crossfade: seats -> colour input)
  input-to-actionbar    "Close input"
  actionbar-to-face     "Back"
  menu-open             first visible [aria-haspopup=menu] in the dock (desktop: the dock dropdown trigger)
  Mobile has no collapse/expand (Dock.vue binds :collapse="isDesktop ? 'open' : false" — always expanded below desktop).
  Mobile menu-open was NOT captured: headless reports the "More actions" trigger's pointer intercepted by <nav aria-label="App…">;
  the keyboard fallback opened nothing within 4 s. Recorded as an observation only.

HEADLINE
  1. Frame RATE is not the defect on a GPU compositor. GPU path, local and prod, desktop and mobile: rAF p50 8.3 ms,
     p95 8.7-17 ms, 0-2 dropped 60 Hz frames per transition, zero long tasks, at most one LoAF (menu-open r1, 60 ms, 7.6 ms
     style/layout). In the SwiftShader runs desktop drops 7-34 frames per transition, but the trace pins that on the
     GPU-process VizCompositorThread (SoftwareRenderer::DoDrawQuad 905 of 1046 ms in face-to-actionbar) while
     CrRendererMain is ~13 % busy. LoAFs there are 50-75 ms with ~0 script and <6 ms style/layout. That is software
     compositing of a 3600x2000 backdrop-filtered surface, not dock main-thread work.
  2. What the owner sees as "not smooth" is GEOMETRIC DISCONTINUITY. It reproduces identically on local and prod:
     a. FACE <-> ACTION-BAR WIDTH SNAP. The dock box/plate/run change width in ONE frame at swap start
        (desktop 451.6 -> 378 px, a 73.6 px step at +26 ms, plate x jumps 36.8 px; mobile 188 -> 356 px, a 168 px step at +24 ms),
        while the content crossfade runs ~300 ms on opacity only. Mobile also flips the plate radius discretely
        (50%/48% cut caps <-> 9999px) on the same frame.
     b. COLLAPSE/EXPAND IS A NON-UNIFORM SCALE of the whole root. scale: <s> 1 goes 1 -> 0.124 while the pill keeps
        border-radius 9999px. The caps squash into ellipses mid-morph, and the 1.5 px border and the backdrop blur are
        x-scaled with it. The children are counter-scaled (1/s) to stay rigid. At settle the rest radius switches
        DISCRETELY from the scaled pill to the collapsed rest radius "50% / calc(0% + 16px)", a squared 16 px trailing cap on
        the collapsed seal (the OD-5b cut-cap in a third posture).
     c. COLLAPSE START HITCH. The first spring frames after the class flip run dt 24.5 ms, then --dock-morph-t jumps
        0.10 -> 0.29 (painted width -76.5 px in one frame, against neighbours of -20 and -29). Fast-phase frames alternate
        8 and 16-17 ms. Expand is cleaner, with one 16.7 ms frame and a 35 px step at t~0.75.
     d. PER-FRAME LAYOUT during collapse/expand. UpdateLayoutTree ~1.5-2.0 and Layout ~1.1-2.0 per rAF frame, against ~0.1
        Layout/frame for the face swaps. The driver is padding-inline lerped on --dock-expand-t (12 -> 8 px, a new value every
        frame). Every frame also recomputes style for the dock subtree: --dock-morph-t is an inline custom property on the
        root, written from JS each frame, which drives child --child-reveal opacity/scale, the plate ink color-mix, clip-path
        and padding. Paint ~2.2/frame.
     e. CAP RADII ARE SCROLL-DRIVEN border-radius ANIMATIONS on the backdrop-filtered plate (gl-dock-cap-inline-start/-end on
        the --dock-run ScrollTimeline). They are always attached, so any run overflow re-rasterises the plate's rounded
        backdrop. actionbar<->input shows the asymmetric radius sequence 50%/47.9% -> 47.9%/50% -> 48.96% -> 50%/47.9%,
        i.e. the caps flip between leading and trailing as the run's scroll extent changes across the swap.

ANIMATING PROPERTIES (getAnimations, every transition)
  .dock-plate               CSSAnimation gl-dock-cap-inline-start/-end [border-*-radius], timeline=ScrollTimeline (always)
  dock icon buttons         CSSTransition background-color, color, scale (120 ms), ::before opacity + --specular-x/-y
  menu popover .glass-reveal CSSTransition filter, opacity, scale, translate (200 ms); exit CSSAnimation glass-reveal-out [scale+opacity+filter]
  .color-field (value.js)   CSSTransition border-*-color (200 ms)
  crown svg (value.js)      CSSAnimation crown-appear [color+opacity+transform] 550 ms
  NOT CSS animations (JS spring, an inline custom property per frame, invisible to getAnimations):
    root --dock-morph-t -> scale (root), 1/scale (children), padding-inline, clip-path inset (plate),
    plate background/border color-mix ink, child opacity+scale stagger, leaving-layer opacity, --dock-pane-shift translate;
    per-face --dock-t -> face opacity crossfade.

GLASS SOURCE (v10.1.3) DRIVING THE NON-COMPOSITOR / DISCONTINUOUS PROPERTIES
  src/components/dock/composables/useDockMorph.ts:92-97   JS spring writes --dock-morph-t on the root every frame (main-thread clock)
  src/components/dock/composables/dockMorphMeasure.ts:341-443  anchor(): forced getBoundingClientRect/offsetWidth reads under
                                                         style overrides at play() start (useDockMorph.ts:93) — the collapse-start hitch window
  src/components/dock/styles/morph.css:119-123           padding-inline: calc(... * var(--dock-expand-t))  -> Layout every frame
  src/components/dock/styles/layers.css:93-105           --dock-live / --dock-size-scale
  src/components/dock/styles/layers.css:128              [data-morphing] inline-size: var(--dock-expanded-px) (box reserve; snaps to rest at settle)
  src/components/dock/styles/shape.css:105               scale: var(--dock-size-scale) 1  (non-uniform root scale: squashes the 9999px caps, border, blur)
  src/components/dock/styles/shape.css:135               scale: calc(1 / --dock-size-scale) 1 on .dock-persistent/.dock-layers (counter-scale)
  src/components/dock/styles/shape.css:68                border-radius: var(--radius-dock) (unchanged through the scale)
  src/components/dock/styles/layers.css:283-297          --child-reveal stagger: opacity + scale per child from the scalar
  src/components/dock/styles/layers.css:185,192          leaving-layer opacity; translate: var(--dock-pane-shift)
  src/components/dock/styles/dock.css:78,93,~120-135     plate backdrop-filter; clip-path inset off --dock-t; ink + border color-mix on --dock-expand-t (repaint every frame)
  src/components/dock/styles/crossfade.css:44-50         .dock-face.is-active { inline-size: max-content } -> the one-frame width snap on face swap
  src/components/dock/styles/crossfade.css:71-77         the face crossfade is opacity-only (no size channel)
  src/components/dock/DockCrossfade.vue:37-39            reserve axis: block (default) / inline peak-latch — the outer DockLayerGroup face swap has no inline reserve or morph
  src/components/dock/styles/run.css:468-479,483-523,557+ cap tokens (--dock-cap-rest/--dock-cap-cut) + scroll-timeline cap radius animations on the plate

FILES
  summary-gpu-angle-metal.json  per transition x rep x site x cell (GPU path)
  summary-swiftshader.json      same (headless default; compositor-bound)
  per-transition-table.txt      both tables flattened
  geom-gpu-per-frame.json       per-rAF painted geometry for each transition (desktop + mobile, local, GPU)
  probe-od14-trace.mjs / probe-od14-geom.mjs / summarize.py  the instruments (run via ~/.claude/guard/guarded)
