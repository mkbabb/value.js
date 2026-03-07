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
│   │   ├── custom/           # 26 maintained components across 6 directories
│   │   └── ui/               # ~180 shadcn-vue (reka-ui) components—don't hand-edit
│   ├── composables/          # 23 composable/utility files
│   ├── lib/palette/          # palette API client, types, slugify
│   ├── styles/               # style.css (Tailwind base), utils.css
│   └── utils/                # cn() — clsx + tailwind-merge
```

## Custom components (`@/components/custom/`)

### color-picker/

| Component | Purpose |
|-----------|---------|
| ColorPicker | Spectrum canvas, hue wheel, alpha slider, space selector, copy, saved colors |
| ColorNutritionLabel | Color space metadata, component ranges, conversion graph |
| ColorInput | Color text input with validation |
| SpectrumCanvas | 2D spectrum/gradient canvas |
| ComponentSliders | Per-component slider bank |
| EditDrawer | Drawer UI for editing colors |
| ActionToolbar | Toolbar with action buttons |
| ActionButton | Individual action button |
| HeroBlob | Hero section blob visual |
| PointerDebugOverlay | Debug panel for pointer events (dev) |

### palette-browser/

| Component | Purpose |
|-----------|---------|
| PaletteDialog | Modal palette browser (fetch/display from API) |
| PaletteDialogHeader | Gradient bar, WatercolorDot, title |
| PaletteSlugBar | Slug pill, edit input, popover menu |
| CurrentPaletteEditor | Swatch grid, add/save/duplicate |
| PaletteCard | Palette display + CRUD |
| AdminPanel | Admin panel container |
| AdminNamesPanel | Admin color names management |
| AdminUsersPanel | Admin users management |
| SortFilterMenu | Sort/filter dropdown |
| UserSortMenu | User sort dropdown |
| MigratePalettesDialog | Palette migration dialog |
| ConfirmDialog | Generic confirmation dialog |

### Standalone

| Component | Purpose |
|-----------|---------|
| DarkModeToggle | Animated sun/moon SVG toggle (useDark) |
| WatercolorDot | Organic blob button with seeded PRNG animation |
| Katex | Standalone KaTeX renderer |
| Markdown | Dynamic .md loader with KaTeX, highlight.js, Prettier formatting |

## Composables (`@/composables/`)

| Composable | Purpose |
|------------|---------|
| useColorModel | Core color model state (shallowRef, space conversion, URL sync) |
| useColorParsing | Color parse/validate/set logic—extracted from useColorModel |
| useSliderGradients | Slider gradient computation—extracted from useColorModel |
| useColorNameResolution | XYZ name lookup + metadata—extracted from useColorModel |
| useColorUrl | URL hash parameter sync for color state |
| useWatercolorBlob | Seeded PRNG (Mulberry32) + sinusoidal blob animation |
| useSatelliteBlobs | Satellite blob animation |
| usePaletteStore | localStorage palette CRUD (saved vs published) |
| useBrowsePalettes | Remote palette browsing, sorting, voting, renaming |
| useSlugMigration | Slug switch/regenerate flows with migration dialog |
| useAdminOperations | Admin CRUD: users, feature/delete palettes, color queue |
| useCardMenu | Hamburger menu state/positioning |
| useHeightTransition | JS-driven expand/collapse hooks |
| useSession | API session token management |
| useUserAuth | User slug + token auth with auto-registration |
| useAdminAuth | Admin bearer token auth |
| useCustomColorNames | Fetch approved color names from API |
| useTouchGate | Prevents touch↔mouse interference |
| useHoverPopover | Shared hover-timer + floating panel positioning |
| useSafeStorage | Safe localStorage/sessionStorage wrappers (Safari private mode) |
| usePointerDebug | Pointer event debugging (circular buffer, gauges) |
| useClipboard | Clipboard copy functionality |
| prng.ts | Mulberry32 PRNG (utility, not a composable) |

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
