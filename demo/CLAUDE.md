# demo/

Vue 3.5 color picker app. Serves as the live demo at [color.babb.dev](https://color.babb.dev).

## Structure

```
demo/
├── color-picker/
│   ├── App.vue               # main shell: 2-col layout, URL↔model sync, dark mode
│   ├── index.html            # Vite entry
│   ├── vite.d.ts             # .vue + .md module declarations
│   └── public/CNAME          # GitHub Pages domain
├── @/
│   ├── components/
│   │   ├── custom/           # 8 maintained components (see below)
│   │   └── ui/               # ~180 shadcn-vue (reka-ui) components—don't hand-edit
│   ├── composables/          # 7 composables (see below)
│   ├── lib/palette/          # palette API client, types, slugify
│   ├── styles/               # style.css (Tailwind base), utils.css
│   └── utils/                # cn() — clsx + tailwind-merge
```

## Custom components (`@/components/custom/`)

| Component | Purpose |
|-----------|---------|
| ColorPicker | Spectrum canvas, hue wheel, alpha slider, space selector, copy, saved colors |
| ColorNutritionLabel | Color space metadata, component ranges, conversion graph |
| Markdown | Dynamic .md loader with KaTeX, highlight.js, Prettier formatting |
| DarkModeToggle | Animated sun/moon SVG toggle (useDark) |
| WatercolorDot | Organic blob button with seeded PRNG animation |
| Katex | Standalone KaTeX renderer |
| PaletteDialog | Modal palette browser (fetch/display from API) |
| PaletteCard / PaletteForm | Palette display + CRUD |

## Composables (`@/composables/`)

| Composable | Purpose |
|------------|---------|
| useWatercolorBlob | Seeded PRNG (Mulberry32) + sinusoidal blob animation |
| usePaletteStore | localStorage palette CRUD (saved vs published) |
| useTouchGate | Prevents touch↔mouse interference |
| useLongPress | Long-press gesture detection |
| useSession | API session token management |
| useCustomColorNames | Fetch approved color names from API |
| useAdminAuth | Admin bearer token auth |

## Build modes

- `npm run dev` — dev server with HMR (root: `demo/color-picker/`)
- `npm run gh-pages` — production build → `dist/` (manual chunks: katex, prettier, highlight.js)
- `npm run build` — library build only (doesn't build demo)

## Library integration

The demo imports directly from `@src/` (path alias → `src/`):
- `parseCSSColor()` for input parsing
- `colorUnit2()` / `normalizeColorUnit()` for space conversion
- `COLOR_SPACE_RANGES`, `COLOR_SPACE_DENORM_UNITS` for metadata
- Color state: `shallowRef<ColorModel>` + localStorage + URL hash params (bidirectional)

## Conventions

- shadcn-vue components in `ui/` are generated—don't hand-edit
- Custom components live in `custom/` and are maintained manually
- `--reka-*` CSS variables (migrated from `--radix-*`)
- Vue 3.5 idioms: `useTemplateRef`, reactive props destructure
