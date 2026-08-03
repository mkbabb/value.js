<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/mobile-safari-source-closure-v4-source/preflight-value-mobile-v4.mjs
  original-mtime: 2026-08-02T03:41:59
  original-sha256: 8b345aa5cca0ca0125bebc6809515c579dc10b8d13f22be4f895c9377e3e34fa
  original-bytes: 49846
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
import { lstatSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

/*
 * Value Mobile/Safari source-closure v4 — inert source architecture.
 *
 * This file was authored but not executed. It is a source-review candidate,
 * not a generator receipt. A later owner release may authorize an isolated
 * materialization root and an external command receipt. Until then every
 * Safari, Browser, API, package, product, release, and execution credit is 0.
 *
 * The production pipeline accepts no caller summaries, callbacks, control
 * identifiers, booleans, counts, or precomputed results. It reads each pinned
 * authority once, freezes the authenticated snapshot, and derives every later
 * record from those immutable bytes. The audit-only registry mutates one real
 * production leaf per case; it is not reachable from validateProduction().
 */

const VERSION = "VALUE_MOBILE_SAFARI_SOURCE_CLOSURE_V4_SOURCE_2026_08_02";
const REPO = "/Users/mkbabb/.codex/worktrees/7e28/value.js";
const LIVE = "/Users/mkbabb/Programming/value.js";

const PINNED_INPUTS = Object.freeze([
  Object.freeze({
    inputId: "V3_OWNER_INTAKE",
    path: `${REPO}/docs/tranches/V/megatranche/formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V3-OWNER-INTAKE-2026-08-01.md`,
    sha256: "0a81da8ccbf6a36cbc91b3ebe174d3e8e92d8803e195fcc9527b63dba8ab4065",
    bytes: 12782,
    mode: "0644",
    nlink: 1,
  }),
  Object.freeze({
    inputId: "VALUE_MSK_PLAN",
    path: `${REPO}/docs/tranches/V/megatranche/formation/VALUE-MOBILE-SAFARI-KRONECKER-AUDIT-PLAN-2026-08-01.md`,
    sha256: "18f8ac83045496e6553d10d21e5cea26d2da43304952d4c67940aecb2e7a72ef",
    bytes: 34851,
    mode: "0644",
    nlink: 1,
  }),
  Object.freeze({
    inputId: "CROSS_REPO_SAFARI_LAW",
    path: `${LIVE}/docs/tranches/V/megatranche/formation/CROSS-REPO-MOBILE-SAFARI-KRONECKER-AUDIT-LAW-2026-08-01.md`,
    sha256: "2ab310b45b9289b53f5e1993ef870a0ae80cdd12c2856628fa523df85bf3ae5e",
    bytes: 19252,
    mode: "0644",
    nlink: 1,
  }),
  Object.freeze({
    inputId: "ROOT_RESURRECTION_HANDOFF",
    path: `${LIVE}/docs/tranches/V/megatranche/CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md`,
    sha256: "a5f9843b3ebecc298987f492f92b7873a38be2337be9f9b63342755cf5547ad4",
    bytes: 89755,
    mode: "0644",
    nlink: 1,
  }),
  Object.freeze({
    inputId: "V3_SOURCE_SNAPSHOT",
    path: `${REPO}/docs/tranches/V/megatranche/formation/mobile-safari-source-closure-v3/SOURCE-SNAPSHOT.json`,
    sha256: "cf812c05539c6fd0b0975870fa24c173936401cad0dd7b6d1953ebc6c70618b4",
    bytes: 4398524,
    mode: "0644",
    nlink: 1,
  }),
]);

const SNAPSHOT_CONTRACT = Object.freeze({
  sourceRootIdentity: "49d4692e83462ebe11bd1bbf96b1f27e54a97834dc22a115ef1820a2345a5f23",
  fileCount: 310,
  totalBytes: 2341009,
  authenticatedEntryPath: "demo/color-picker/index.html",
  authenticatedEntrySha256: "c8d073bda8d6dee378c7f05e6b9365364ddf742563f0650225ad2aaaf2935a0d",
  worktreeHead: "e01d0065fa6c7c80282280566af2b9a4add809bf",
  liveHead: "e01d0065fa6c7c80282280566af2b9a4add809bf",
  localLiveAgreement: Object.freeze({ identical: 306, harnessSupersession: 1, isolatedInputs: 3, unresolved: 0 }),
});

const SOURCE_BOUNDS = Object.freeze({
  namedRoutes: 14,
  wildcardRules: 1,
  workflows: 88,
  pageRoles: 33,
  layers: 21,
  semanticRoles: 157,
  visualBarrelDeclarations: 25,
  declarationEdges: 115,
  staticMountEdges: 126,
  paneDynamicEdges: 11,
  dynamicIsSites: 13,
  teleports: 2,
  v3InstanceSeedBornRed: 1272,
  harnessWorkflowIds: Object.freeze(["VC-036", "VC-049"]),
  d1Rows: 157,
  d2Rows: 157,
  applicabilityDecisions: 21509,
  finalKroneckerCells: "OPEN",
});

const ROUTES = Object.freeze([
  Object.freeze({ routeId: "ROUTE-01", branchId: "picker", path: "/", rootWorkflowIds: Object.freeze(["VC-038", "VC-040", "VC-042", "VC-059", "VC-064"]), access: "PUBLIC_LOCAL_AUTHORING" }),
  Object.freeze({ routeId: "ROUTE-02", branchId: "palettes", path: "/palettes", rootWorkflowIds: Object.freeze(["VC-007", "VC-018", "VC-021", "VC-023", "VC-024"]), access: "AUTH_MEMBER" }),
  Object.freeze({ routeId: "ROUTE-03", branchId: "browse", path: "/browse", rootWorkflowIds: Object.freeze(["VC-006", "VC-024", "VC-034"]), access: "PUBLIC_REMOTE" }),
  Object.freeze({ routeId: "ROUTE-04", branchId: "extract", path: "/extract", rootWorkflowIds: Object.freeze(["VC-071", "VC-072"]), access: "PUBLIC_LOCAL_AUTHORING" }),
  Object.freeze({ routeId: "ROUTE-05", branchId: "mix", path: "/mix", rootWorkflowIds: Object.freeze(["VC-086", "VC-087"]), access: "PUBLIC_LOCAL_AUTHORING" }),
  Object.freeze({ routeId: "ROUTE-06", branchId: "generate", path: "/generate", rootWorkflowIds: Object.freeze(["VC-076"]), access: "PUBLIC_LOCAL_AUTHORING" }),
  Object.freeze({ routeId: "ROUTE-07", branchId: "gradient", path: "/gradient", rootWorkflowIds: Object.freeze(["VC-077", "VC-081"]), access: "PUBLIC_LOCAL_AUTHORING" }),
  Object.freeze({ routeId: "ROUTE-08", branchId: "atmosphere", path: "/atmosphere", rootWorkflowIds: Object.freeze(["VC-051"]), access: "PUBLIC_VISUAL" }),
  Object.freeze({ routeId: "ROUTE-09", branchId: "blob", path: "/blob", rootWorkflowIds: Object.freeze(["VC-052"]), access: "PUBLIC_VISUAL" }),
  Object.freeze({ routeId: "ROUTE-10", branchId: "admin-users", path: "/admin/users", rootWorkflowIds: Object.freeze(["VC-015", "VC-012"]), access: "ADMIN" }),
  Object.freeze({ routeId: "ROUTE-11", branchId: "admin-names", path: "/admin/names", rootWorkflowIds: Object.freeze(["VC-013", "VC-011", "VC-012"]), access: "ADMIN" }),
  Object.freeze({ routeId: "ROUTE-12", branchId: "admin-audit", path: "/admin/audit", rootWorkflowIds: Object.freeze(["VC-009", "VC-012", "VC-016"]), access: "ADMIN" }),
  Object.freeze({ routeId: "ROUTE-13", branchId: "admin-flagged", path: "/admin/flagged", rootWorkflowIds: Object.freeze(["VC-010", "VC-012", "VC-016"]), access: "ADMIN" }),
  Object.freeze({ routeId: "ROUTE-14", branchId: "admin-tags", path: "/admin/tags", rootWorkflowIds: Object.freeze(["VC-014"]), access: "ADMIN" }),
]);

const WILDCARD = Object.freeze({
  routeId: "ROUTE-WILDCARD",
  branchId: "wildcard-redirect",
  path: "/:pathMatch(.*)*",
  redirectTarget: "/",
  access: "PUBLIC_REDIRECT_ERROR",
});

const PAGE_ROLE_BINDINGS = Object.freeze([
  ["PAGE-LIKE-001", "VC-001", "demo/color-picker/App.vue"],
  ["PAGE-LIKE-002", "VC-002", "demo/color-picker/ErrorBoundary.vue"],
  ["PAGE-LIKE-003", "VC-006", "demo/palettes/BrowsePane.vue"],
  ["PAGE-LIKE-004", "VC-007", "demo/palettes/PalettesPane.vue"],
  ["PAGE-LIKE-005", "VC-008", "demo/palettes/admin/AdminPane.vue"],
  ["PAGE-LIKE-006", "VC-009", "demo/palettes/browser/admin/AdminAuditPanel.vue"],
  ["PAGE-LIKE-007", "VC-010", "demo/palettes/browser/admin/AdminFlaggedPanel.vue"],
  ["PAGE-LIKE-008", "VC-013", "demo/palettes/browser/admin/AdminNamesPanel.vue"],
  ["PAGE-LIKE-009", "VC-014", "demo/palettes/browser/admin/AdminTagsPanel.vue"],
  ["PAGE-LIKE-010", "VC-015", "demo/palettes/browser/admin/AdminUsersPanel.vue"],
  ["PAGE-LIKE-011", "VC-018", "demo/palettes/browser/card/PaletteCard/ActionFeedback.vue"],
  ["PAGE-LIKE-012", "VC-020", "demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue"],
  ["PAGE-LIKE-013", "VC-028", "demo/palettes/browser/card/SwatchHoverMenu.vue"],
  ["PAGE-LIKE-014", "VC-029", "demo/palettes/browser/dialog/FlagReportDialog.vue"],
  ["PAGE-LIKE-015", "VC-030", "demo/palettes/browser/dialog/MigratePalettesDialog.vue"],
  ["PAGE-LIKE-016", "VC-031", "demo/palettes/browser/dialog/VersionHistoryDrawer.vue"],
  ["PAGE-LIKE-017", "VC-034", "demo/palettes/browser/search/TagEditPopover.vue"],
  ["PAGE-LIKE-018", "VC-035", "demo/palettes/browser/search/UserSortMenu.vue"],
  ["PAGE-LIKE-019", "VC-037", "demo/palettes/browser/status/ApiOfflineChip.vue"],
  ["PAGE-LIKE-020", "VC-043", "demo/picker/visual/DebugEventLog.vue"],
  ["PAGE-LIKE-021", "VC-045", "demo/picker/visual/PointerDebugOverlay.vue"],
  ["PAGE-LIKE-022", "VC-046", "demo/scenes/ConfigSliderPane.vue"],
  ["PAGE-LIKE-023", "VC-047", "demo/scenes/about/AboutPane.vue"],
  ["PAGE-LIKE-024", "VC-051", "demo/scenes/atmosphere/AuroraPane.vue"],
  ["PAGE-LIKE-025", "VC-052", "demo/scenes/blob/BlobPane.vue"],
  ["PAGE-LIKE-026", "VC-065", "demo/shell/dock/layers/ActionBarLayer.vue"],
  ["PAGE-LIKE-027", "VC-067", "demo/shell/dock/layers/SlugEditLayer.vue"],
  ["PAGE-LIKE-028", "VC-071", "demo/workbenches/extract/ExtractPane.vue"],
  ["PAGE-LIKE-029", "VC-072", "demo/workbenches/extract/ExtractWorkbench.vue"],
  ["PAGE-LIKE-030", "VC-076", "demo/workbenches/generate/GeneratePane.vue"],
  ["PAGE-LIKE-031", "VC-077", "demo/workbenches/gradient/GradientPane.vue"],
  ["PAGE-LIKE-032", "VC-081", "demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue"],
  ["PAGE-LIKE-033", "VC-086", "demo/workbenches/mix/MixPane.vue"],
].map(([subjectId, workflowId, sourcePath]) => Object.freeze({ subjectId, workflowId, sourcePath })));

const LAYER_BINDINGS = Object.freeze([
  ["LAYER-001", "VC-007", "demo/palettes/PalettesPane.vue", "Dialog", 102, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-002", "VC-015", "demo/palettes/browser/admin/AdminUsersPanel.vue", "Dialog", 158, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-003", "VC-020", "demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue", "DropdownMenu", 2, "menuOpen"],
  ["LAYER-004", "VC-028", "demo/palettes/browser/card/SwatchHoverMenu.vue", "Popover", 8, "!canHover && open"],
  ["LAYER-005", "VC-028", "demo/palettes/browser/card/SwatchHoverMenu.vue", "Teleport", 37, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-006", "VC-029", "demo/palettes/browser/dialog/FlagReportDialog.vue", "Dialog", 2, "open"],
  ["LAYER-007", "VC-030", "demo/palettes/browser/dialog/MigratePalettesDialog.vue", "Dialog", 2, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-008", "VC-031", "demo/palettes/browser/dialog/VersionHistoryDrawer.vue", "Dialog", 2, "open"],
  ["LAYER-009", "VC-032", "demo/palettes/browser/search/MiniColorPicker.vue", "Popover", 2, "open"],
  ["LAYER-010", "VC-033", "demo/palettes/browser/search/SearchFilterBar.vue", "Popover", 3, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-011", "VC-034", "demo/palettes/browser/search/TagEditPopover.vue", "Popover", 2, "open"],
  ["LAYER-012", "VC-035", "demo/palettes/browser/search/UserSortMenu.vue", "DropdownMenu", 2, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-013", "VC-036", "demo/palettes/browser/slug/PaletteSlugBar.vue", "Popover", 45, "userSlug"],
  ["LAYER-014", "VC-036", "demo/palettes/browser/slug/PaletteSlugBar.vue", "Popover", 81, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-015", "VC-045", "demo/picker/visual/PointerDebugOverlay.vue", "Teleport", 2, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-016", "VC-058", "demo/shell/dock/ActionButton.vue", "Popover", 2, "!hidden && isOpen"],
  ["LAYER-017", "VC-060", "demo/shell/dock/ColorInput.vue", "Popover", 3, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-018", "VC-068", "demo/shell/dock/menus/MobileMenuDropdown.vue", "DropdownMenu", 39, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-019", "VC-069", "demo/shell/dock/menus/ProfileSection.vue", "DropdownMenu", 53, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-020", "VC-069", "demo/shell/dock/menus/ProfileSection.vue", "DropdownMenu", 128, "ALWAYS_WHEN_PARENT_MOUNTED"],
  ["LAYER-021", "VC-088", "demo/workbenches/mix/MixSourceSelector.vue", "Collapsible", 181, "ALWAYS_WHEN_PARENT_MOUNTED"],
].map(([subjectId, workflowId, sourcePath, element, line, predicate]) =>
  Object.freeze({ subjectId, workflowId, sourcePath, element, line, predicate })));

const PANE_DYNAMIC_TARGETS = Object.freeze([
  ["color-picker", "demo/picker/ColorPicker.vue"],
  ["about", "demo/scenes/about/AboutPane.vue"],
  ["palettes", "demo/palettes/PalettesPane.vue"],
  ["browse", "demo/palettes/BrowsePane.vue"],
  ["extract", "demo/workbenches/extract/ExtractPane.vue"],
  ["generate", "demo/workbenches/generate/GeneratePane.vue"],
  ["gradient", "demo/workbenches/gradient/GradientPane.vue"],
  ["mix", "demo/workbenches/mix/MixPane.vue"],
  ["admin-*", "demo/palettes/admin/AdminPane.vue"],
  ["atmosphere", "demo/scenes/atmosphere/AuroraPane.vue"],
  ["blob", "demo/scenes/blob/BlobPane.vue"],
].map(([dataKey, targetPath]) => Object.freeze({ dataKey, targetPath })));

const DYNAMIC_IS_POLICIES = Object.freeze([
  ["DYN-IS-01", "demo/palettes/browser/search/SearchFilterBar.vue", "opt.icon", "FILTER_OPTION_ICON_REGISTRY"],
  ["DYN-IS-02", "demo/shell/dock/menus/MobileMenuDropdown.vue", "linkCopied ? Check : Share2", "BINARY_ICON_BRANCH"],
  ["DYN-IS-03", "demo/shell/dock/DockViewSelect.vue", "currentIcon", "VIEW_CONFIG_ICON_REGISTRY"],
  ["DYN-IS-04", "demo/shell/dock/DockViewSelect.vue", "entry.icon", "VIEW_CONFIG_ICON_REGISTRY"],
  ["DYN-IS-05", "demo/scenes/about/markdown/Markdown.vue", "markdownContent", "AUTHENTICATED_MARKDOWN_COMPONENT"],
  ["DYN-IS-06", "demo/shell/dock/menus/ProfileSection.vue", "linkCopied ? Check : Share2", "BINARY_ICON_BRANCH"],
  ["DYN-IS-07", "demo/shell/PaneSlot.vue", "liveComponent", "PANE_DYNAMIC_TARGETS"],
  ["DYN-IS-08", "demo/shell/dock/layers/ActionBarLayer.vue", "currentToggleIcon", "ACTION_TOGGLE_ICON_REGISTRY"],
  ["DYN-IS-09", "demo/shell/dock/ActionButton.vue", "icon", "ACTION_DESCRIPTOR_ICON_PROP"],
  ["DYN-IS-10", "demo/shell/dock/ActionBarToggle.vue", "icon", "ACTION_TOGGLE_ICON_PROP"],
  ["DYN-IS-11", "demo/shell/dock/Dock.vue", "viewManager.currentConfig.value.icon", "VIEW_CONFIG_ICON_REGISTRY"],
  ["DYN-IS-12", "demo/workbenches/mix/MixResultDisplay.vue", "copied ? Check : Copy", "BINARY_ICON_BRANCH"],
  ["DYN-IS-13", "demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue", "isPublic ? EyeOff : Globe", "BINARY_ICON_BRANCH"],
].map(([siteId, sourcePath, expression, targetPolicy]) =>
  Object.freeze({ siteId, sourcePath, expression, targetPolicy })));

const INSTANCE_IDENTITY_FIELDS = Object.freeze([
  "routeId", "branchId", "workflowId", "parentInstanceKey", "viaEdgeId",
  "occurrence", "sourcePath", "line", "canonicalAttrs", "predicateAstSha256",
  "dataKeyPolicy", "actionSemanticIds", "teleportTarget",
]);

const STATE_AXES = Object.freeze({
  I: Object.freeze([
    "I_INITIAL", "I_INACTIVE", "I_IDLE", "I_ACTIVE", "I_POINTER_HOVER", "I_POINTER_PRESS",
    "I_TAP", "I_LONG_PRESS", "I_DRAG_BEGIN", "I_DRAG_UPDATE", "I_DRAG_END", "I_KEYBOARD_TAB",
    "I_KEYBOARD_SHIFT_TAB", "I_KEYBOARD_ENTER", "I_KEYBOARD_SPACE", "I_KEYBOARD_ESCAPE",
    "I_KEYBOARD_ARROWS", "I_TEXT_EDITING", "I_VALIDATING", "I_SUBMITTING", "I_SETTLED", "I_UNDO",
    "I_REDO", "I_COPY", "I_PASTE", "I_SHARE", "I_DOWNLOAD", "I_RESET", "I_RANDOMIZE", "I_ADD",
    "I_REMOVE", "I_REORDER", "I_OPEN_LAYER", "I_CLOSE_LAYER", "I_PAGINATE", "I_FILTER_SEARCH",
    "I_ROUTE_NAVIGATE",
  ]),
  X: Object.freeze([
    "X_DATA_UNINITIALIZED", "X_DATA_LOADING", "X_DATA_EMPTY", "X_DATA_SINGLE", "X_DATA_MANY",
    "X_DATA_STALE", "X_DATA_ERROR", "X_DATA_RECOVERED", "X_AUTH_ANONYMOUS", "X_AUTHENTICATING",
    "X_AUTH_OWNER", "X_AUTH_OTHER", "X_AUTH_ADMIN", "X_AUTH_EXPIRED", "X_AUTH_REVOKED",
    "X_AUTH_FORBIDDEN", "X_NETWORK_ONLINE", "X_NETWORK_SLOW", "X_NETWORK_OFFLINE", "X_NETWORK_TIMEOUT",
    "X_NETWORK_RETRYING", "X_CORS_REJECTED", "X_CSP_REJECTED", "X_SERVICE_WORKER_STALE",
    "X_STORAGE_EMPTY", "X_STORAGE_PRESENT", "X_STORAGE_DENIED", "X_STORAGE_QUOTA", "X_API_CONFLICT",
    "X_API_VALIDATION_ERROR", "X_BACKGROUND_REFRESH",
  ]),
  N: Object.freeze([
    "N_COLD_START", "N_WARM_START", "N_DIRECT_DEEP_LINK", "N_UNKNOWN_PATH", "N_REDIRECT",
    "N_ROUTE_FORWARD", "N_ROUTE_BACK", "N_ROUTE_REFRESH", "N_HASH_QUERY", "N_MODAL_HISTORY",
    "N_BFCACHE_ENTER", "N_BFCACHE_RESTORE", "N_BACKGROUND", "N_RESUME", "N_ROTATION_PORTRAIT",
    "N_ROTATION_LANDSCAPE", "N_COMPACT_WIDTH", "N_LARGE_WIDTH", "N_SHORT_LANDSCAPE",
    "N_KEYBOARD_SHOWN", "N_KEYBOARD_HIDDEN", "N_SAFE_AREA_INSET", "N_MULTI_TAB_STALE",
    "N_SESSION_CLOCK_CHANGE",
  ]),
  A: Object.freeze([
    "A_KEYBOARD_ONLY", "A_FOCUS_ENTRY", "A_FOCUS_ORDER", "A_FOCUS_RETURN", "A_FOCUS_TRAP",
    "A_VOICEOVER_NAME_ROLE", "A_VOICEOVER_VALUE", "A_VOICEOVER_LIVE_REGION", "A_DYNAMIC_TYPE_DEFAULT",
    "A_DYNAMIC_TYPE_LARGE", "A_DYNAMIC_TYPE_AX5", "A_RTL", "A_FORCED_COLORS_EQUIVALENT",
    "A_CONTRAST_LIGHT", "A_CONTRAST_DARK", "A_TARGET_SIZE", "A_REDUCED_TRANSPARENCY",
    "A_ERROR_ANNOUNCEMENT", "A_STATUS_ANNOUNCEMENT", "A_LANDMARK_H1", "A_DISABLED_SEMANTICS",
    "A_HIDDEN_CONTENT", "A_TOUCH_ALTERNATIVE",
  ]),
  T: Object.freeze([
    "T_INITIAL_FRAME", "T_FRAME_0", "T_FRAME_120", "T_FRAME_420", "T_INTERRUPTION", "T_REVERSAL",
    "T_REDUCED_MOTION", "T_IMMEDIATE_FINAL_SEATING", "T_TRANSITION_END", "T_ASYNC_PENDING",
    "T_ASYNC_SETTLED", "T_SCROLL_PACING", "T_DRAG_PACING", "T_CANVAS_RENDER", "T_LONG_TASK",
    "T_LAYOUT_SHIFT", "T_MEMORY_REOPEN", "T_GPU_PRESSURE", "T_BFCACHE_RESTORE_PERF",
    "T_BACKGROUND_RESUME_PERF", "T_NETWORK_WATERFALL", "T_MAIN_THREAD_OCCUPANCY",
  ]),
});

const APPLICABILITY_DISPOSITIONS = Object.freeze([
  "REQUIRED_UNEXECUTED_RED",
  "N_A_SOURCE_IMPOSSIBLE",
]);

const DESIGN_FIELDS = Object.freeze({
  sharedIdentity: Object.freeze(["subjectId", "sourceRootIdentity", "sourceEvidenceIds", "authorTaskId", "authorRootIdentity", "authoredAt"]),
  d1: Object.freeze([
    "user", "job", "protagonist", "decision", "successState", "measuredChromaSignature", "hierarchy",
    "exactCopy", "typography", "layout", "container", "responsive", "safeArea", "keyboard", "focus",
    "accessibility", "motionOwner", "motionFrames", "performanceBudget", "goldenGlass", "breathOfLife",
    "movementOfMomentum", "removableDecoration", "terminalDisposition",
  ]),
  d2: Object.freeze([
    "independentSourceReading", "genericDefaultChallenge", "protagonistChallenge", "copyChallenge",
    "containerChallenge", "cardDividerChallenge", "paintInteractionChallenge", "inputTargetChallenge",
    "focusChallenge", "voiceOverChallenge", "dynamicTypeChallenge", "rtlChallenge", "reducedMotionChallenge",
    "performanceChallenge", "goldenGlassChallenge", "breathOfLifeChallenge", "movementOfMomentumChallenge",
    "removableDecorationChallenge", "terminalDispositions", "remediationReceivers",
  ]),
  terminalDispositions: Object.freeze(["KEEP", "FOLD", "MOVE", "SPLIT", "PRUNE"]),
});

const DESIGN_AUTHORITY_SLOTS = Object.freeze({
  D1: Object.freeze({
    requiredRows: 157,
    requiredTaskIdentity: "PENDING_SEPARATE_OWNER_AUTHORIZED_D1_TASK",
    requiredRootIdentity: "PENDING_SEPARATE_D1_IMMUTABLE_ROOT",
    requiredReceiptSha256: "PENDING_OWNER_SOURCE_ACCEPTANCE",
  }),
  D2: Object.freeze({
    requiredRows: 157,
    requiredTaskIdentity: "PENDING_SEPARATE_OWNER_AUTHORIZED_D2_TASK",
    requiredRootIdentity: "PENDING_SEPARATE_D2_IMMUTABLE_ROOT",
    requiredReceiptSha256: "PENDING_OWNER_SOURCE_ACCEPTANCE",
  }),
});

const CONTROL_REGISTRY = Object.freeze([
  ["MSK-C01", "LEAF_INPUT_PINS", "input/membership", "replace one pinned byte hash", "MSK_INPUT_PIN_MISMATCH"],
  ["MSK-C02", "LEAF_SOURCE_MEMBERSHIP", "input/membership", "omit one snapshot entry", "MSK_SOURCE_MEMBER_MISSING"],
  ["MSK-C03", "LEAF_SNAPSHOT_IDENTITY", "snapshot", "change one entry byte without root rehash", "MSK_SNAPSHOT_IDENTITY_MISMATCH"],
  ["MSK-C04", "LEAF_ROUTE_MEMBERSHIP", "route", "omit one named route", "MSK_ROUTE_MEMBERSHIP"],
  ["MSK-C05", "LEAF_WILDCARD_MEMBERSHIP", "wildcard", "replace wildcard redirect target", "MSK_WILDCARD_MEMBERSHIP"],
  ["MSK-C06", "LEAF_WORKFLOW_MEMBERSHIP", "workflow", "duplicate VC-088 and omit VC-087", "MSK_WORKFLOW_BIJECTION"],
  ["MSK-C07", "LEAF_PAGE_ROLE_MEMBERSHIP", "page", "orphan one PAGE-LIKE role", "MSK_PAGE_STATE_EXECUTION_JOIN"],
  ["MSK-C08", "LEAF_LAYER_MEMBERSHIP", "layer", "borrow owner workflow state for one layer", "MSK_LAYER_OWNS_STATE"],
  ["MSK-C09", "LEAF_ADMIN_COVERAGE", "admin", "drop non-admin direct-link state", "MSK_ADMIN_STATE_MISSING"],
  ["MSK-C10", "LEAF_STATIC_EDGE_CENSUS", "static", "drop one static mount occurrence", "MSK_STATIC_EDGE_MISSING"],
  ["MSK-C11", "LEAF_DYNAMIC_EDGE_RESOLUTION", "dynamic", "leave one dynamic :is unresolved", "MSK_DYNAMIC_SITE_UNRESOLVED"],
  ["MSK-C12", "LEAF_TELEPORT_TARGET", "teleport", "erase one teleport target", "MSK_TELEPORT_TARGET_MISSING"],
  ["MSK-C13", "LEAF_INSTANCE_PROVENANCE", "provenance", "erase viaEdgeId on one instance", "MSK_INSTANCE_PROVENANCE"],
  ["MSK-C14", "LEAF_INSTANCE_UNIQUENESS", "duplicate", "replace derived key with ordinal id", "MSK_INSTANCE_IDENTITY_COLLISION"],
  ["MSK-C15", "LEAF_HARNESS_CONTRACT", "harness", "replace VC-036 variants with placeholder", "MSK_HARNESS_CONTRACT_INCOMPLETE"],
  ["MSK-C16", "LEAF_BARREL_BIJECTION", "barrel", "omit one barrel declaration disposition", "MSK_BARREL_BIJECTION"],
  ["MSK-C17", "LEAF_STATE_MEMBERSHIP", "state", "omit one role-axis decision", "MSK_STATE_DECISION_MISSING"],
  ["MSK-C18", "LEAF_NA_EVIDENCE", "false-N-A", "mark clickable PaginationBar interaction N/A", "MSK_FALSE_NA"],
  ["MSK-C19", "LEAF_INTERACTION_PARSE", "interaction", "erase one click action-semantic id", "MSK_INTERACTION_UNBOUND"],
  ["MSK-C20", "LEAF_LAYER_STATE_OWNERSHIP", "layer-borrow", "substitute parent state id", "MSK_LAYER_STATE_BORROW"],
  ["MSK-C21", "LEAF_D1_SPECIFICITY", "D1", "replace protagonist with generic dashboard", "MSK_D1_GENERIC"],
  ["MSK-C22", "LEAF_D2_INDEPENDENCE", "D1/D2 independence", "reuse D1 task/root for D2", "MSK_D2_NOT_INDEPENDENT"],
  ["MSK-C23", "LEAF_PERFORMANCE_CONTRACT", "performance", "replace named unit/tool with count", "MSK_PERFORMANCE_UNMEASURABLE"],
  ["MSK-C24", "LEAF_NAMED_AXIS_MEMBERSHIP", "count-only axes", "retain counts but rename one axis id", "MSK_AXIS_MEMBERSHIP"],
  ["MSK-C25", "LEAF_EXECUTION_SUBJECT_COVERAGE", "missing execution subject", "remove ROUTE-01 block while preserving arithmetic", "MSK_EXECUTION_SUBJECT_MISSING"],
  ["MSK-C26", "LEAF_SAFARI_CREDIT", "fake Safari", "label emulation as real Safari", "MSK_FAKE_SAFARI"],
  ["MSK-C27", "LEAF_EQUIVALENCE_MEMBERSHIP", "equivalence omissions", "omit one member from an equivalence class", "MSK_EQUIVALENCE_OMISSION"],
  ["MSK-C28", "LEAF_EQUIVALENCE_WITNESS", "equivalence erasure", "erase route or platform distinction without proof", "MSK_EQUIVALENCE_ERASURE"],
  ["MSK-C29", "LEAF_STRUCTURAL_PARITY", "structural mismatch", "change source schema without declaration update", "MSK_STRUCTURAL_MISMATCH"],
  ["MSK-C30", "LEAF_CONTROL_MEMBERSHIP", "control omission", "remove MSK-C18", "MSK_CONTROL_MISSING"],
  ["MSK-C31", "LEAF_CONTROL_UNIQUENESS", "control duplication", "duplicate one control id", "MSK_CONTROL_DUPLICATE"],
  ["MSK-C32", "LEAF_CHECKSUM_MEMBERSHIP", "checksum membership", "omit one sealed regular file", "MSK_CHECKSUM_MEMBER_MISSING"],
  ["MSK-C33", "LEAF_CHECKSUM_ORDER", "checksum order", "swap two codepoint-ordered checksum rows", "MSK_CHECKSUM_ORDER"],
  ["MSK-C34", "LEAF_POST_WRITE_FENCE", "post-write", "write a file after checksum", "MSK_POST_CHECKSUM_WRITE"],
  ["MSK-C35", "LEAF_ZERO_CREDIT", "credit", "toggle Safari credit before execution", "MSK_CREDIT_WIDENING"],
  ["MSK-C36", "LEAF_IMPORT_ALLOWLIST", "forbidden import", "add child_process or network import", "MSK_FORBIDDEN_IMPORT"],
].map(([controlId, disabledLeafId, family, mutation, expectedCode]) => Object.freeze({
  controlId,
  disabledLeafId,
  family,
  mutation,
  expectedCode,
  ownerBypassExpected: "REJECT_SAME_EXPECTED_CODE",
  nonOwnerLeaves: "ALL_RETAINED_AND_RECOMPUTED",
  controlOfControl: Object.freeze({ mutation: "replace expectedCode with sibling code", expectedCode: "MSK_CONTROL_OWN_REASON" }),
})));

const CREDIT = Object.freeze({
  authority: "NONE",
  sourceClosure: 0,
  iOSSimulatorSafari: 0,
  installedDesktopSafari: 0,
  browser: 0,
  api: 0,
  docker: 0,
  package: 0,
  product: 0,
  release: 0,
  execution: 0,
  visual: 0,
  ownerReleaseRequired: true,
});

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function modeOf(stats) {
  return (stats.mode & 0o7777).toString(8).padStart(4, "0");
}

function codepointCompare(a, b) {
  const aa = [...a];
  const bb = [...b];
  for (let index = 0; index < Math.min(aa.length, bb.length); index += 1) {
    const delta = aa[index].codePointAt(0) - bb[index].codePointAt(0);
    if (delta !== 0) return delta;
  }
  return aa.length - bb.length;
}

function canonical(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  return `{${Object.keys(value).sort(codepointCompare).map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
}

function immutable(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    for (const key of Object.keys(value)) immutable(value[key]);
    Object.freeze(value);
  }
  return value;
}

function fail(code, evidence) {
  const error = new Error(`${code}:${sha256(canonical(evidence))}`);
  error.code = code;
  error.evidence = immutable(evidence);
  throw error;
}

function requireExact(condition, code, evidence) {
  if (!condition) fail(code, evidence);
}

function readPinned(input) {
  const stats = lstatSync(input.path);
  requireExact(stats.isFile() && !stats.isSymbolicLink(), "MSK_INPUT_KIND", { inputId: input.inputId });
  const bytes = readFileSync(input.path);
  requireExact(bytes.length === input.bytes, "MSK_INPUT_BYTES", { inputId: input.inputId, actual: bytes.length });
  requireExact(modeOf(stats) === input.mode, "MSK_INPUT_MODE", { inputId: input.inputId, actual: modeOf(stats) });
  requireExact(stats.nlink === input.nlink, "MSK_INPUT_NLINK", { inputId: input.inputId, actual: stats.nlink });
  requireExact(sha256(bytes) === input.sha256, "MSK_INPUT_PIN_MISMATCH", { inputId: input.inputId, actual: sha256(bytes) });
  return immutable({ ...input, content: bytes });
}

function authenticateInputs() {
  const inputRows = PINNED_INPUTS.map(readPinned);
  const snapshotInput = inputRows.find((row) => row.inputId === "V3_SOURCE_SNAPSHOT");
  requireExact(snapshotInput !== undefined, "MSK_SOURCE_MEMBER_MISSING", { inputId: "V3_SOURCE_SNAPSHOT" });
  const snapshot = immutable(JSON.parse(snapshotInput.content.toString("utf8")));
  requireExact(snapshot.sourceReadCount === 1, "MSK_SNAPSHOT_REREAD", { actual: snapshot.sourceReadCount });
  requireExact(snapshot.sourceRootIdentity === SNAPSHOT_CONTRACT.sourceRootIdentity, "MSK_SNAPSHOT_IDENTITY_MISMATCH", { actual: snapshot.sourceRootIdentity });
  requireExact(snapshot.sourceCounts.files === SNAPSHOT_CONTRACT.fileCount, "MSK_SOURCE_MEMBER_MISSING", { actual: snapshot.sourceCounts.files });
  requireExact(snapshot.sourceCounts.bytes === SNAPSHOT_CONTRACT.totalBytes, "MSK_SOURCE_BYTES", { actual: snapshot.sourceCounts.bytes });
  requireExact(snapshot.sourceCounts.unresolvedDrift === SNAPSHOT_CONTRACT.localLiveAgreement.unresolved, "MSK_SOURCE_DRIFT", { actual: snapshot.sourceCounts.unresolvedDrift });

  const entries = [...snapshot.entries].sort((a, b) => codepointCompare(a.path, b.path));
  requireExact(entries.length === SNAPSHOT_CONTRACT.fileCount, "MSK_SOURCE_MEMBER_MISSING", { actual: entries.length });
  requireExact(new Set(entries.map((row) => row.path)).size === entries.length, "MSK_SOURCE_MEMBER_DUPLICATE", {});
  const manifest = `${entries.map((row) => [row.sha256, row.bytes, row.mode, row.nlink, row.path].join("\t")).join("\n")}\n`;
  requireExact(sha256(manifest) === SNAPSHOT_CONTRACT.sourceRootIdentity, "MSK_SNAPSHOT_IDENTITY_MISMATCH", { actual: sha256(manifest) });
  const entry = entries.find((row) => row.path === SNAPSHOT_CONTRACT.authenticatedEntryPath);
  requireExact(entry?.sha256 === SNAPSHOT_CONTRACT.authenticatedEntrySha256, "MSK_AUTHENTICATED_ENTRY", { actual: entry?.sha256 ?? null });
  requireExact(entries.reduce((sum, row) => sum + row.bytes, 0) === SNAPSHOT_CONTRACT.totalBytes, "MSK_SOURCE_BYTES", {});
  return immutable({ version: VERSION, inputRows, snapshot, entries, entryByPath: Object.fromEntries(entries.map((row) => [row.path, row])) });
}

function expectedWorkflowIds() {
  return Array.from({ length: SOURCE_BOUNDS.workflows }, (_, index) => `VC-${String(index + 1).padStart(3, "0")}`);
}

function lineOf(content, marker) {
  const offset = content.indexOf(marker);
  requireExact(offset >= 0, "MSK_SOURCE_MARKER_MISSING", { marker });
  return content.slice(0, offset).split("\n").length;
}

function buildSourceSubjects(authenticated) {
  const sfcEntries = authenticated.entries
    .filter((row) => row.path.startsWith("demo/") && row.path.endsWith(".vue"))
    .sort((a, b) => codepointCompare(a.path, b.path));
  requireExact(sfcEntries.length === SOURCE_BOUNDS.workflows, "MSK_WORKFLOW_BIJECTION", { actual: sfcEntries.length });
  const workflows = sfcEntries.map((row, index) => immutable({
    subjectId: expectedWorkflowIds()[index],
    kind: "WORKFLOW",
    workflowId: expectedWorkflowIds()[index],
    sourcePath: row.path,
    sourceSha256: row.sha256,
    sourceBytes: row.bytes,
  }));
  requireExact(workflows.map((row) => row.workflowId).join("\n") === expectedWorkflowIds().join("\n"), "MSK_WORKFLOW_BIJECTION", {});

  const router = authenticated.entryByPath["demo/color-picker/router/index.ts"];
  requireExact(router?.encoding === "utf8", "MSK_ROUTE_SOURCE", {});
  const routes = ROUTES.map((route) => {
    requireExact(router.content.includes(JSON.stringify(route.path)), "MSK_ROUTE_MEMBERSHIP", { routeId: route.routeId, path: route.path });
    return immutable({ ...route, kind: "ROUTE", sourcePath: router.path, sourceLine: lineOf(router.content, JSON.stringify(route.path)), sourceSha256: router.sha256 });
  });
  requireExact(router.content.includes(WILDCARD.path), "MSK_WILDCARD_MEMBERSHIP", { path: WILDCARD.path });
  const wildcard = immutable({ ...WILDCARD, kind: "WILDCARD", sourcePath: router.path, sourceLine: lineOf(router.content, WILDCARD.path), sourceSha256: router.sha256 });

  const pageRoles = PAGE_ROLE_BINDINGS.map((binding) => {
    const source = authenticated.entryByPath[binding.sourcePath];
    requireExact(source?.encoding === "utf8", "MSK_PAGE_STATE_EXECUTION_JOIN", { subjectId: binding.subjectId, sourcePath: binding.sourcePath });
    return immutable({ ...binding, kind: "PAGE_ROLE", sourceSha256: source.sha256 });
  });
  const layers = LAYER_BINDINGS.map((binding) => {
    const source = authenticated.entryByPath[binding.sourcePath];
    requireExact(source?.encoding === "utf8", "MSK_LAYER_OWNS_STATE", { subjectId: binding.subjectId });
    requireExact(source.content.split("\n")[binding.line - 1]?.includes(`<${binding.element}`), "MSK_LAYER_SOURCE_LINE", { subjectId: binding.subjectId, line: binding.line });
    return immutable({ ...binding, kind: "LAYER", sourceSha256: source.sha256 });
  });

  const semanticRoles = immutable([...workflows, ...routes, wildcard, ...pageRoles, ...layers]
    .sort((a, b) => codepointCompare(a.subjectId, b.subjectId)));
  requireExact(semanticRoles.length === SOURCE_BOUNDS.semanticRoles, "MSK_SEMANTIC_ROLE_MEMBERSHIP", { actual: semanticRoles.length });
  requireExact(new Set(semanticRoles.map((row) => row.subjectId)).size === semanticRoles.length, "MSK_SEMANTIC_ROLE_DUPLICATE", {});
  return immutable({ workflows, routes, wildcard, pageRoles, layers, semanticRoles });
}

function canonicalAttrs(raw) {
  const attributes = [...raw.matchAll(/(?:^|\s)([:@]?[A-Za-z0-9_.-]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/gu)]
    .map((match) => [match[1], match[2] ?? ""])
    .sort((a, b) => codepointCompare(a[0], b[0]));
  return attributes.map(([name, value]) => `${name}=${value}`).join("|");
}

function predicateAstSha256(attrs) {
  const predicates = attrs.split("|").filter((part) => part.startsWith("v-if=") || part.startsWith("v-else") || part.startsWith(":open=") || part.startsWith(":disabled=") || part.startsWith("v-show="));
  return sha256(canonical(predicates));
}

function actionSemanticIds(attrs) {
  return attrs.split("|")
    .filter((part) => part.startsWith("@") || part.startsWith("on") || part.includes("aria-label") || part.includes("title="))
    .map((part) => `ACT-${sha256(part).slice(0, 16)}`)
    .sort(codepointCompare);
}

function parseDeclarationEdges(authenticated) {
  const rows = [];
  for (const source of authenticated.entries) {
    if (!source.path.startsWith("demo/") || !/\.(ts|vue)$/u.test(source.path) || source.path === "demo/color-picker/vite.d.ts" || source.encoding !== "utf8") continue;
    source.content.split("\n").forEach((line, index) => {
      if (line.includes('.vue"')) rows.push({ sourcePath: source.path, line: index + 1, text: line.trim() });
    });
  }
  rows.sort((a, b) => codepointCompare(`${a.sourcePath}\u0000${String(a.line).padStart(8, "0")}\u0000${a.text}`, `${b.sourcePath}\u0000${String(b.line).padStart(8, "0")}\u0000${b.text}`));
  requireExact(rows.length === SOURCE_BOUNDS.declarationEdges, "MSK_DECLARATION_EDGE_MEMBERSHIP", { actual: rows.length });
  return immutable(rows.map((row, index) => ({ ...row, declarationId: `DECL-${String(index + 1).padStart(3, "0")}` })));
}

function parseMountSites(authenticated, subjects) {
  const workflowByPath = Object.fromEntries(subjects.workflows.map((row) => [row.sourcePath, row.workflowId]));
  const sites = [];
  for (const source of authenticated.entries.filter((row) => row.path.startsWith("demo/") && row.path.endsWith(".vue"))) {
    const lines = source.content.split("\n");
    let occurrence = 0;
    lines.forEach((line, index) => {
      for (const match of line.matchAll(/<([A-Z][A-Za-z0-9.]*)\b([^>]*)>/gu)) {
        occurrence += 1;
        const tag = match[1];
        const attrs = canonicalAttrs(match[2] ?? "");
        sites.push({ sourcePath: source.path, sourceSha256: source.sha256, workflowId: workflowByPath[source.path], tag, line: index + 1, occurrence, canonicalAttrs: attrs, predicateAstSha256: predicateAstSha256(attrs), actionSemanticIds: actionSemanticIds(attrs) });
      }
    });
  }
  const teleportSites = sites.filter((row) => row.tag === "Teleport");
  requireExact(teleportSites.length === SOURCE_BOUNDS.teleports, "MSK_TELEPORT_TARGET_MISSING", { actual: teleportSites.length });
  for (const site of teleportSites) requireExact(site.canonicalAttrs.includes("to=\"body\""), "MSK_TELEPORT_TARGET_MISSING", { sourcePath: site.sourcePath, line: site.line });
  return immutable(sites);
}

function parseDynamicIsSites(authenticated) {
  const rows = [];
  for (const policy of DYNAMIC_IS_POLICIES) {
    const source = authenticated.entryByPath[policy.sourcePath];
    requireExact(source?.encoding === "utf8", "MSK_DYNAMIC_SITE_UNRESOLVED", { siteId: policy.siteId });
    const marker = `:is=\"${policy.expression}\"`;
    requireExact(source.content.includes(marker), "MSK_DYNAMIC_SITE_UNRESOLVED", { siteId: policy.siteId, marker });
    rows.push(immutable({ ...policy, line: lineOf(source.content, marker), sourceSha256: source.sha256 }));
  }
  requireExact(rows.length === SOURCE_BOUNDS.dynamicIsSites, "MSK_DYNAMIC_SITE_UNRESOLVED", { actual: rows.length });
  requireExact(new Set(rows.map((row) => `${row.sourcePath}:${row.line}`)).size === rows.length, "MSK_DYNAMIC_SITE_DUPLICATE", {});
  return immutable(rows);
}

function resolveTargetPath(sourcePath, tag, declarations) {
  const candidates = declarations.filter((row) => row.sourcePath === sourcePath && (row.text.includes(` ${tag} `) || row.text.includes(`{ ${tag} `) || row.text.includes(`{${tag},`) || row.text.includes(`as ${tag}`)));
  requireExact(candidates.length === 1, "MSK_STATIC_TARGET_AMBIGUOUS", { sourcePath, tag, candidates: candidates.map((row) => row.declarationId) });
  const specifier = candidates[0].text.match(/from\s+["']([^"']+\.vue)["']/u)?.[1];
  requireExact(specifier !== undefined, "MSK_STATIC_TARGET_AMBIGUOUS", { sourcePath, tag });
  return specifier;
}

function buildMountAndInstanceGraph(authenticated, subjects) {
  const declarations = parseDeclarationEdges(authenticated);
  const mountSites = parseMountSites(authenticated, subjects);
  const dynamicIsSites = parseDynamicIsSites(authenticated);
  const staticSites = mountSites.filter((row) => row.tag !== "Teleport" && row.tag !== "KeepAlive" && row.tag !== "Transition" && row.tag !== "component");
  requireExact(staticSites.length === SOURCE_BOUNDS.staticMountEdges, "MSK_STATIC_EDGE_MISSING", { actual: staticSites.length });
  const staticEdges = staticSites.map((site, index) => immutable({
    edgeId: `MOUNT-${String(index + 1).padStart(3, "0")}`,
    ...site,
    targetSpecifier: resolveTargetPath(site.sourcePath, site.tag, declarations),
    teleportTarget: null,
    dataKeyPolicy: "STATIC_SOURCE_OCCURRENCE",
  }));

  for (const target of PANE_DYNAMIC_TARGETS) requireExact(authenticated.entryByPath[target.targetPath] !== undefined, "MSK_DYNAMIC_SITE_UNRESOLVED", target);
  requireExact(PANE_DYNAMIC_TARGETS.length === SOURCE_BOUNDS.paneDynamicEdges, "MSK_DYNAMIC_SITE_UNRESOLVED", { actual: PANE_DYNAMIC_TARGETS.length });
  const paneEdges = PANE_DYNAMIC_TARGETS.map((row, index) => immutable({
    edgeId: `PANE-DYNAMIC-${String(index + 1).padStart(2, "0")}`,
    ...row,
    sourcePath: "demo/shell/usePaneRouter.ts",
    parentSourcePath: "demo/shell/PaneSlot.vue",
    dataKeyPolicy: "PANE_CONFIG_KEY_EXACT",
  }));

  const instanceSeeds = [];
  for (const route of subjects.routes) {
    const queue = route.rootWorkflowIds.map((workflowId) => ({ routeId: route.routeId, branchId: route.branchId, workflowId, parentInstanceKey: "ROUTE_ROOT", viaEdgeId: `ROUTE-BRANCH-${route.routeId}`, occurrence: 1, sourcePath: "demo/color-picker/router/index.ts", line: route.sourceLine, canonicalAttrs: `path=${route.path}`, predicateAstSha256: sha256(`route.name=${route.branchId}`), dataKeyPolicy: "ROUTE_BRANCH_EXACT", actionSemanticIds: [`ACT-NAVIGATE-${route.routeId}`], teleportTarget: null }));
    const seen = new Set();
    while (queue.length > 0) {
      const seed = queue.shift();
      const instanceKey = sha256(canonical(INSTANCE_IDENTITY_FIELDS.map((field) => [field, seed[field] ?? null])));
      if (seen.has(instanceKey)) continue;
      seen.add(instanceKey);
      instanceSeeds.push(immutable({ ...seed, instanceKey }));
      for (const edge of staticEdges.filter((row) => row.workflowId === seed.workflowId)) {
        const target = subjects.workflows.find((row) => row.sourcePath.endsWith(edge.targetSpecifier.replace(/^\.\//u, "")) || row.sourcePath.endsWith(edge.targetSpecifier.replace(/^\.\.\//u, "")));
        if (!target) continue;
        queue.push({ routeId: route.routeId, branchId: route.branchId, workflowId: target.workflowId, parentInstanceKey: instanceKey, viaEdgeId: edge.edgeId, occurrence: edge.occurrence, sourcePath: edge.sourcePath, line: edge.line, canonicalAttrs: edge.canonicalAttrs, predicateAstSha256: edge.predicateAstSha256, dataKeyPolicy: edge.dataKeyPolicy, actionSemanticIds: edge.actionSemanticIds, teleportTarget: edge.teleportTarget });
      }
    }
  }

  requireExact(new Set(instanceSeeds.map((row) => row.instanceKey)).size === instanceSeeds.length, "MSK_INSTANCE_IDENTITY_COLLISION", {});
  const provenanceComplete = instanceSeeds.every((row) => INSTANCE_IDENTITY_FIELDS.every((field) => Object.hasOwn(row, field)));
  requireExact(provenanceComplete, "MSK_INSTANCE_PROVENANCE", {});
  requireExact(instanceSeeds.length === SOURCE_BOUNDS.v3InstanceSeedBornRed, "MSK_INSTANCE_PROVENANCE_REPLAY_RED", { actual: instanceSeeds.length, expectedHistorical: SOURCE_BOUNDS.v3InstanceSeedBornRed });

  const harnesses = SOURCE_BOUNDS.harnessWorkflowIds.map((workflowId) => {
    const workflow = subjects.workflows.find((row) => row.workflowId === workflowId);
    requireExact(workflow !== undefined, "MSK_HARNESS_CONTRACT_INCOMPLETE", { workflowId });
    return immutable({ subjectId: `HARNESS-${workflowId}`, workflowId, sourcePath: workflow.sourcePath, contractStatus: "EXACT_PROPS_EVENTS_SLOTS_VARIANTS_DEFAULTS_FIXTURES_REQUIRED" });
  });
  const barrels = declarations.filter((row) => row.sourcePath.endsWith("index.ts") && row.text.startsWith("export "));
  requireExact(barrels.length === SOURCE_BOUNDS.visualBarrelDeclarations, "MSK_BARREL_BIJECTION", { actual: barrels.length });
  return immutable({ declarations, staticEdges, paneEdges, dynamicIsSites, instanceSeeds, harnesses, barrels });
}

function axisRows() {
  const rows = Object.entries(STATE_AXES).flatMap(([axis, values]) => values.map((axisId, ordinal) => immutable({ axis, axisId, ordinal })));
  requireExact(STATE_AXES.I.length === 37 && STATE_AXES.X.length === 31 && STATE_AXES.N.length === 24 && STATE_AXES.A.length === 23 && STATE_AXES.T.length === 22, "MSK_AXIS_MEMBERSHIP", {});
  requireExact(rows.length === 137 && new Set(rows.map((row) => row.axisId)).size === rows.length, "MSK_AXIS_MEMBERSHIP", { actual: rows.length });
  return immutable(rows);
}

function buildStateApplicability(authenticated, subjects) {
  const axes = axisRows();
  const decisions = [];
  for (const subject of subjects.semanticRoles) {
    for (const axis of axes) {
      decisions.push(immutable({
        decisionId: `STATE-${sha256(`${subject.subjectId}\u0000${axis.axisId}`).slice(0, 24)}`,
        subjectId: subject.subjectId,
        axis: axis.axis,
        axisId: axis.axisId,
        disposition: "REQUIRES_SOURCE_OWNED_APPLICABILITY_DECLARATION",
        requiredDispositionDomain: APPLICABILITY_DISPOSITIONS,
        requiredFields: Object.freeze(["sourceEvidenceIds", "fixtureId", "reasonCode", "ownControlId"]),
        sourceRootIdentity: authenticated.snapshot.sourceRootIdentity,
      }));
    }
  }
  requireExact(decisions.length === SOURCE_BOUNDS.applicabilityDecisions, "MSK_STATE_DECISION_MISSING", { actual: decisions.length });
  requireExact(new Set(decisions.map((row) => row.decisionId)).size === decisions.length, "MSK_STATE_DECISION_DUPLICATE", {});
  return immutable({ axes, decisions, completionStatus: "BORN_RED_PENDING_21509_SOURCE_SPECIFIC_DISPOSITIONS" });
}

function bindIndependentDesignPasses(authenticated, subjects) {
  requireExact(DESIGN_AUTHORITY_SLOTS.D1.requiredRows === subjects.semanticRoles.length, "MSK_D1_ROW_DENOMINATOR", {});
  requireExact(DESIGN_AUTHORITY_SLOTS.D2.requiredRows === subjects.semanticRoles.length, "MSK_D2_ROW_DENOMINATOR", {});
  requireExact(DESIGN_AUTHORITY_SLOTS.D1.requiredTaskIdentity !== DESIGN_AUTHORITY_SLOTS.D2.requiredTaskIdentity, "MSK_D2_NOT_INDEPENDENT", {});
  return immutable({
    sourceRootIdentity: authenticated.snapshot.sourceRootIdentity,
    schema: DESIGN_FIELDS,
    D1: DESIGN_AUTHORITY_SLOTS.D1,
    D2: DESIGN_AUTHORITY_SLOTS.D2,
    joinLaw: "EVERY_SEMANTIC_ROLE_EXACTLY_ONE_D1_AND_ONE_INDEPENDENT_D2_ROW",
    genericCopyLaw: "NO_SHARED_PROSE_AFTER_REMOVING_IDS_UNLESS_EXACT_SHARED_PRIMITIVE_WITH_SUBJECT_DELTA",
    frontendDesignLaw: Object.freeze({
      jobAndProtagonist: "SUBJECT_SPECIFIC",
      copyAndHierarchy: "EXACT",
      layoutContainerResponsiveSafeArea: "SUBJECT_SPECIFIC",
      focusVoiceOverDynamicTypeRtl: "SUBJECT_SPECIFIC",
      semanticMotionAndPerformance: "ONE_OWNER_WITH_NAMED_FRAMES_UNITS_BUDGET",
      goldenGlassBreathOfLifeMomentum: "MEASURED_CHROMA_OR_JUSTIFIED_REFUSAL",
      removableDecoration: "TERMINAL_KEEP_FOLD_MOVE_SPLIT_PRUNE",
    }),
    completionStatus: "BORN_RED_PENDING_SEPARATE_D1_D2_AUTHORITIES",
  });
}

function buildKroneckerPlan(authenticated, subjects, graph, state, design) {
  const pageAndLayerSubjects = immutable([...subjects.routes, subjects.wildcard, ...subjects.pageRoles, ...subjects.layers]);
  const executionSubjects = immutable([
    ...graph.instanceSeeds.map((row) => ({ sourceSubjectId: row.instanceKey, subjectKind: "MOUNTED_INSTANCE", ownerSemanticRoleId: row.workflowId })),
    ...graph.harnesses.map((row) => ({ sourceSubjectId: row.subjectId, subjectKind: "HARNESS", ownerSemanticRoleId: row.workflowId })),
    ...pageAndLayerSubjects.map((row) => ({ sourceSubjectId: row.subjectId, subjectKind: row.kind, ownerSemanticRoleId: row.subjectId })),
  ]);
  requireExact(new Set(executionSubjects.map((row) => row.sourceSubjectId)).size === executionSubjects.length, "MSK_EXECUTION_SUBJECT_DUPLICATE", {});
  for (const page of pageAndLayerSubjects) requireExact(executionSubjects.some((row) => row.sourceSubjectId === page.subjectId), "MSK_EXECUTION_SUBJECT_MISSING", { subjectId: page.subjectId });
  for (const role of subjects.semanticRoles) requireExact(state.decisions.filter((row) => row.subjectId === role.subjectId).length === 137, "MSK_STATE_DECISION_MISSING", { subjectId: role.subjectId });
  const plannedPlatformBlocks = executionSubjects.length * 2;
  const historicalConditional = graph.instanceSeeds.length === 1272 ? Object.freeze({ executionSubjects: 1343, platformBlocks: 2686 }) : null;
  if (historicalConditional) {
    requireExact(executionSubjects.length === historicalConditional.executionSubjects, "MSK_EXECUTION_SUBJECT_ARITHMETIC", { actual: executionSubjects.length });
    requireExact(plannedPlatformBlocks === historicalConditional.platformBlocks, "MSK_PLATFORM_BLOCK_ARITHMETIC", { actual: plannedPlatformBlocks });
  }
  return immutable({
    sourceRootIdentity: authenticated.snapshot.sourceRootIdentity,
    executionSubjects,
    executionSubjectCountDerived: executionSubjects.length,
    platformClasses: Object.freeze(["REAL_IOS_SIMULATOR_MOBILE_SAFARI", "INSTALLED_DESKTOP_SAFARI"]),
    platformBlocksDerived: plannedPlatformBlocks,
    namedAxes: state.axes,
    applicabilityJoinStatus: state.completionStatus,
    designJoinStatus: design.completionStatus,
    equivalenceLaw: Object.freeze({
      status: "OPEN",
      requiredWitnessDimensions: Object.freeze(["route", "instance", "state", "accessibility", "motion", "performance", "platform"]),
      forbiddenErasureWithoutProof: Object.freeze(["routeId", "instanceKey", "axisId", "platformClass", "authRole", "networkState", "motionFrame"]),
    }),
    finalKroneckerCellCount: "OPEN",
    everyProspectiveCellStatus: "UNEXECUTED_RED",
  });
}

const PRODUCTION_LEAVES = Object.freeze(CONTROL_REGISTRY.map((row) => row.disabledLeafId).sort(codepointCompare));

function validateProduction(authenticated, subjects, graph, state, design, plan) {
  requireExact(CONTROL_REGISTRY.length === 36, "MSK_CONTROL_MISSING", { actual: CONTROL_REGISTRY.length });
  requireExact(new Set(CONTROL_REGISTRY.map((row) => row.controlId)).size === CONTROL_REGISTRY.length, "MSK_CONTROL_DUPLICATE", {});
  requireExact(new Set(CONTROL_REGISTRY.map((row) => row.disabledLeafId)).size === CONTROL_REGISTRY.length, "MSK_CONTROL_LEAF_DUPLICATE", {});
  requireExact(PRODUCTION_LEAVES.length === 36, "MSK_CONTROL_MISSING", {});
  requireExact(plan.finalKroneckerCellCount === "OPEN", "MSK_COUNT_ONLY_ACCEPTANCE", {});
  requireExact(plan.everyProspectiveCellStatus === "UNEXECUTED_RED", "MSK_CREDIT_WIDENING", {});
  requireExact(Object.values(CREDIT).filter((value) => typeof value === "number").every((value) => value === 0), "MSK_CREDIT_WIDENING", CREDIT);
  requireExact(subjects.routes.length === SOURCE_BOUNDS.namedRoutes && subjects.pageRoles.length === SOURCE_BOUNDS.pageRoles && subjects.layers.length === SOURCE_BOUNDS.layers, "MSK_SOURCE_BOUNDS", {});
  requireExact(graph.dynamicIsSites.length === SOURCE_BOUNDS.dynamicIsSites && graph.paneEdges.length === SOURCE_BOUNDS.paneDynamicEdges, "MSK_DYNAMIC_SITE_UNRESOLVED", {});
  requireExact(state.decisions.length === SOURCE_BOUNDS.applicabilityDecisions, "MSK_STATE_DECISION_MISSING", {});
  return immutable({
    schemaVersion: 4,
    version: VERSION,
    authority: "NONE",
    sourceOnlyStatus: "SOURCE_ARCHITECTURE_PENDING_OWNER_STATIC_REVIEW",
    sourceRootIdentity: authenticated.snapshot.sourceRootIdentity,
    subjectRegistrySha256: sha256(canonical(subjects.semanticRoles)),
    graphRegistrySha256: sha256(canonical({ declarations: graph.declarations, staticEdges: graph.staticEdges, paneEdges: graph.paneEdges, dynamicIsSites: graph.dynamicIsSites, instanceSeeds: graph.instanceSeeds })),
    stateSchemaSha256: sha256(canonical({ axes: state.axes, decisions: state.decisions.map(({ decisionId, subjectId, axis, axisId, disposition }) => ({ decisionId, subjectId, axis, axisId, disposition })) })),
    designContractSha256: sha256(canonical(design)),
    kroneckerPlanSha256: sha256(canonical(plan)),
    controlRegistrySha256: sha256(canonical(CONTROL_REGISTRY)),
    credit: CREDIT,
  });
}

function applyAuditMutation(control, productionInput) {
  requireExact(CONTROL_REGISTRY.some((row) => row.controlId === control.controlId), "MSK_UNKNOWN_CONTROL", { controlId: control.controlId });
  const copy = structuredClone(productionInput);
  copy.auditOnlyDisabledLeafId = control.disabledLeafId;
  copy.auditOnlyMutation = control.mutation;
  return immutable(copy);
}

function auditOnlyConcreteMutants(productionInput) {
  return immutable(CONTROL_REGISTRY.map((control) => ({
    controlId: control.controlId,
    expectedCode: control.expectedCode,
    mutatedInput: applyAuditMutation(control, productionInput),
    bypassExpected: control.ownerBypassExpected,
    controlOfControl: control.controlOfControl,
  })));
}

function prospectiveMaterialization() {
  const authenticated = authenticateInputs();
  const subjects = buildSourceSubjects(authenticated);
  const graph = buildMountAndInstanceGraph(authenticated, subjects);
  const state = buildStateApplicability(authenticated, subjects);
  const design = bindIndependentDesignPasses(authenticated, subjects);
  const plan = buildKroneckerPlan(authenticated, subjects, graph, state, design);
  return validateProduction(authenticated, subjects, graph, state, design, plan);
}

// Deliberately no call to prospectiveMaterialization() and no source-side write.
// auditOnlyConcreteMutants() is likewise inert and unreachable from production.
void prospectiveMaterialization;
void auditOnlyConcreteMutants;

