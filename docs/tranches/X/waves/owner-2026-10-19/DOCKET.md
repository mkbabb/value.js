# Owner docket — 2026-10-19 (frames in this directory; COHESION §0gf)

Owner verbatim (2026-10-19):
> value.js still has this ellipse dock background issue--dock animations are still janky in every way, from expanded to collapsed to transitioning; changing colors is VERY slow with the slders and gradients. [12.40.23] this shows "home" and shifts the cards down on animate--remove it [12.41.18]; mosst of the more complex routes, liek gradient and mix, don't load--the "loading the scene text should be removed in favor of a skeleton shimmer (glass-ui should have this?) The loading of the complex routes is VERY slow; the card or pane transition animations is very janky and slow [12.43.27]--this should have a border around the color components [12.44.47]--fourier dock when collapsed and expanded is broken [12.45.13]--the small docks and all docks, the animations and the like, are very janky and not smooth and do not animate in place, they shift around--they should animate and expand FROM the dock from the centre, or sometimes left and right (like the small dock thereof)--this should all be fixed in the root glass-ui, too. [12.46.09]--these speed, easing, etc, should be dropdown items, not just relegated to the ellipse. [12.46.38]--sometimes when the dock collapses the expanded UI dropdowns do not collapse too--these should be synced with the glass-ui API. [12.47.16]--there's a square border in the fourier controls panel--going from one route to another should animate smoothly and subtly. [12.50.11]--darkmode toggle should be a bit bigger, and the dock ellipse issue is still present [12.50.45]--these sliders should not have a double border--they should be more like the glass-ui sliders we have, they should be glass-ui sliders that have the integrated thumb; [12.51.30]--the pop-over time item in the dock is clipped [12.52.09]--remove this; All loading times for all apps needs to be improved, every page, every app (not just keyframes) [12.52.48]--the docks hereof should be centreed, not offset [12.53.19]--we should have icons for these, too [12.53.37]--these elements could be better and more deftly integrated into the UI, cleverly and using the ball and the like. Be creative. [12.54.30]--hover state of the title item is not rounded [12.54.52]--this needs to be a dropdown and with titles thereof [12.55.09]--needs better color coding in the code--remove the check mark parsed, just have a dot, a bit bigger. [12.56.09]--left side of the dock is not roudned?

## Rows (frame → app → row)
| id | frame | app | row |
|---|---|---|---|
| OD19-V1 | frame-12.40.23.png | value (+ fourier 12.50.11; glass) | Dock plate shows an ELLIPSE background layer inside the pill (a radius-mismatched/scaled inner layer). Root cure in glass dock; consumer cause cured locally. |
| OD19-V2 | (general) | value + glass | Dock animations janky: expanded↔collapsed↔transitioning. Must animate in place, expanding FROM the dock's centre (or left/right for side docks), no layout shift. |
| OD19-V3 | (general) | value | Colour changes via sliders and gradients are VERY slow (input → paint latency). |
| OD19-V4 | frame-12.41.18.png | value | The visible route caption "Home" shifts the cards down on animate — REMOVE it visually (the route h1 stays for a11y, visually hidden; reverses §0ge.7 VC5-01). |
| OD19-V5 | (general) | value | Complex routes (gradient, mix) do not load / load VERY slowly. |
| OD19-V6 | (general) | value (all apps) | "Loading the scene" text → a skeleton shimmer (glass primitive if it exists, else request it). |
| OD19-V7 | (general) | value | Card/pane transition animations janky and slow. |
| OD19-V8 | frame-12.43.27.png | value | The L/a/b/α colour-component selector rail needs a border around the components. |
| OD19-F1 | frame-12.44.47.png | fourier | Transport dock collapsed/expanded state is broken (play, rail, "1", ×). |
| OD19-F2 | frame-12.45.13.png | fourier (+ glass) | Small docks shift around instead of animating in place from the centre/side. |
| OD19-F3 | frame-12.46.09.png | fourier | Speed and Easing are buried in the ⋯ overflow: make them real dropdown items (dock triggers with their own menus). |
| OD19-F4 | frame-12.46.38.png | fourier (+ glass) | When the dock collapses, open dropdowns do not collapse with it: sync through the glass dock API. |
| OD19-F5 | frame-12.47.16.png | fourier | Square border visible in the controls panel ("Image" header); route-to-route navigation should animate smoothly and subtly. |
| OD19-F6 | frame-12.50.11.png | fourier | Dark-mode toggle slightly bigger; dock ellipse (OD19-V1) present here too. |
| OD19-F7 | frame-12.50.45.png | fourier | Sliders have a double border: use glass-ui sliders with the integrated thumb. |
| OD19-F8 | frame-12.51.30.png | fourier | The time popover in the dock is clipped. |
| OD19-K1 | frame-12.52.09.png | keyframes | Remove "Pause the title animation" (motion still honours prefers-reduced-motion). |
| OD19-K2 | frame-12.52.48.png | keyframes | Docks must be centred, not offset (the top mini dock and the bottom dock). |
| OD19-K3 | frame-12.53.19.png | keyframes | direction / fill mode selects need icons (as easing has its curve glyph). |
| OD19-K4 | frame-12.53.37.png | keyframes | Reverse / Preview and the three dots integrated more deftly, using the ball — be creative. |
| OD19-K5 | frame-12.54.30.png | keyframes | Card title hover state not rounded. |
| OD19-K6 | frame-12.54.52.png | keyframes | The sliders/{ }/clock icon trio becomes a dropdown with titled items. |
| OD19-K7 | frame-12.55.09.png | keyframes | Better syntax colour coding in the code editor; replace "✓ Parsed" with a bigger status dot only. |
| OD19-K8 | frame-12.56.09.png | keyframes | Dock's left side is not rounded. |
| OD19-ALL | (general) | value, keyframes, fourier | Loading times improved on every page of every app; route transitions smooth and subtle. |
