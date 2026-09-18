// CHALLENGE-L pass 4 — probe N-11, deterministic.
// Reproduces BrowsePane.vue:99  :is-owned="palette.userSlug === pm.userSlug.value"
// against the LIVE commons body, with pm.userSlug.value = the value
// useUserAuth.ts:32 yields for a visitor with no persisted slug:
//   ref<string | null>(safeGetItem(localStorage, SLUG_KEY))  →  null
// (useSafeStorage.ts:5-11 returns localStorage.getItem, i.e. null when absent;
//  no boot path calls ensureUser() — the only callers are publish and fork.)
const res = await fetch("https://api.color.babb.dev/palettes?limit=50");
const rows = (await res.json()).data;

const VISITOR_SLUG = null;                      // fresh visitor
const isOwned = (p) => p.userSlug === VISITOR_SLUG;   // the literal expression

// The owner-gated items, quoted from PaletteCardMenu.vue v-if expressions:
//   :49  paletteKind === 'remote' && isOwned   → Publish / Make private
//   :74  paletteKind !== 'remote' || isOwned   → Rename
//   :84  paletteKind === 'remote' && isOwned   → Edit Tags
//  :134  ... || (paletteKind === 'remote' && isOwned) → Delete
//  :144  paletteKind === 'remote' && !isOwned  → Report   (HIDDEN when owned)
const owned = rows.filter(isOwned);
console.log(`commons rows            : ${rows.length}`);
console.log(`rows with userSlug null : ${rows.filter(p => p.userSlug === null).length}`);
console.log(`isOwned===true for anon : ${owned.length}  -> ${owned.map(p=>p.slug).join(", ")}`);
console.log("");
console.log("For each of those rows an anonymous visitor is offered:");
console.log("  Publish / Make private · Rename · Edit Tags · Delete");
console.log("and is NOT offered: Report");
console.log("");
console.log("Type-level cause: api/src/modules/palette/format.ts:26  userSlug: string | null");
console.log("                  demo/palettes/types.ts:29             userSlug?: string");
console.log("The client type declares `null` impossible, so no null-guard was written.");
