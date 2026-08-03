# Live CSS probes — `http://localhost:9000` (dev server, running build), Chromium via Playwright MCP

All four probes are `page.evaluate` reads against the **served** stylesheets. No page state was mutated
beyond appending and immediately removing a detached probe element.

## P1 · the drawer's declared width is not the width it gets (desktop, 1440px viewport)

```js
const d = document.createElement('div');
d.setAttribute('data-slot','dialog-content');
d.setAttribute('data-placement','right');
d.className = 'w-[380px] sm:max-w-[420px] flex flex-col';   // ← VersionHistoryDrawer.vue:3, verbatim
document.body.appendChild(d);
getComputedStyle(d) // →
```
```json
{ "vw": 1440, "width": "384px", "maxWidth": "384px", "position": "fixed",
  "controlWidth": "380px", "controlMaxWidth": "420px" }
```
`controlWidth`/`controlMaxWidth` are the SAME two classes on a div **without** the `data-slot`/
`data-placement` attributes: 380 / 420. The utilities exist and work. With the attributes the
computed width is 384px — glass-ui's rule wins.

## P2 · same probe at a phone viewport (390 × 844)

```json
{ "innerWidth": 390, "width": "292.5px", "maxWidth": "none" }
```
292.5px = `75%` of 390. The `w-[380px]` never applies at any viewport.

## P3 · the shadowing rule, and why it wins

`node_modules/@mkbabb/glass-ui/dist/styles/index.css:1` imports **without a layer**:

```
@layer theme, base, components, utilities;
… @import "../components/dialog/placement.css";      ← UNLAYERED
```

`node_modules/@mkbabb/glass-ui/dist/components/dialog/placement.css`:

```css
:where([data-slot="dialog-content"][data-placement="right"]) {
    top: 0; bottom: 0; right: 0; height: 100%; width: 75%;
}
@media (min-width: 40rem) {
    :where([data-slot="dialog-content"][data-placement="left"]),
    :where([data-slot="dialog-content"][data-placement="right"]) { max-width: 24rem; }
}
```

Unlayered author declarations outrank every `@layer`, regardless of specificity — and Tailwind v4
emits `.w-\[380px\]` into `@layer utilities`. Confirmed present in the served CSS:

```
.w-\[380px\] { width: 380px; }
```

## P4 · `group-hover:` is media-gated to hover-capable pointers — the Revert control can never appear on touch

Extracted from the live `document.styleSheets`:

```css
.group-hover\:opacity-100 {
  &:is(:where(.group):hover *) {
    @media (hover: hover) {
      opacity: 1;
    }
  }
}
.group-focus-visible\:opacity-100 {
  &:is(:where(.group):focus-visible *) { opacity: 1; }
}
.opacity-0 { opacity: 0; }
```

`VersionHistoryDrawer.vue:79` applies `opacity-0 … group-hover:opacity-100` and nothing else. On any
device where `(hover: hover)` is false — every phone and tablet, i.e. the `safari-mobile-*` half of
the capture matrix — the only declaration that can ever raise the opacity is inside a media query
that never matches. `group-focus-visible:opacity-100` **is generated and available**; it is simply
not used here.
