SERVED MODEL: claude-opus-5[1m]

# X.W3.7 · GF-R1 — the transport cluster's RECORDED rows, residuals, and the probe a successor installs

**Unit**: `X.W3.7` (added by the dated E-3 addendum-beside at `docs/tranches/X/waves/W3.md`,
2026-09-18, under COHESION **§0j.B / GF-R1** and `X-W0-FOLD.md` §9.3 slate entry 15 / W0.38).
**Source record**: `docs/tranches/V/megatranche/registry/adjudicated/ApiOfflineChip.md`
(AP-12 `:53` · AP-17 `:58` · AP-24 `:70` · AP-29 `:79` · AP-30 `:80` · AP-31 `:81` · AP-33 `:83`).
**Namespace guard** (X-W0-FOLD §9.1 guard 1): these ids are ⟨**ApiOfflineChip.md** · AP-*⟩ and are
**NOT** ⟨AuroraPane.md · AP-*⟩, which carry the same numerals for different rows of a different
record. The boundary-anchored probe is the only correct one:
`grep -rnE '(^|[^A-Za-z0-9-])AP-31([^0-9]|$)'`.

---

## 1. AP-30 — RECORDED, terminally; nothing is rebuilt

The row, verbatim from the record (`:80`):

> `detectDevMisconfig`'s third conjunct is a tautology at its only call site (VITE_API_URL unset
> forces the remote constant; cross-origin-vs-loopback always true once legs 1–2 pass) — the unit
> test proves a matrix the wiring cannot produce.

**Re-measured at this unit's bytes, and it holds.** `initApiEnvironment` builds its inputs from
exactly two sources (`availability.ts`): `viteApiUrlSet: Boolean(import.meta.env.VITE_API_URL)` and
the `baseUrl` the client owns, which is `import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL`
(`client.ts:35-36`). Therefore:

- leg 1 passing (`viteApiUrlSet === false`) **pins** `baseUrl` to the remote constant
  `https://api.color.babb.dev`;
- leg 2 passing pins the page to a loopback origin;
- so `isCrossOrigin(remote-constant, loopback-origin)` is **true by construction** — the third
  conjunct cannot be false once the first two pass, **at this call site**.

**Disposition: RECORDED, not cured.** Three reasons, each measured rather than asserted:

1. The record's own disposition is *"moot-on-AP-1 in effect (the detector's product consumer dies;
   the console diagnosis keeps it)"*. **AP-1 is X-W7's**, not this unit's — deleting a conjunct here
   would pre-empt a row this unit does not hold.
2. `detectDevMisconfig` is documented **"Pure + total for testing"** and is exported and exercised
   as a pure predicate by `test/status-lamp.test.ts:95-116`, which asserts each leg disarms the
   triad independently. Removing the third leg would delete a true property of the predicate to
   match one caller's wiring — the inverse of the cure order the registry's own killed-claim 5 law
   states (*the cure is adjudicated separately from the defect*).
3. The unit plan's lock says it in one line: *"**AP-30** is moot-on-AP-1 in effect — record, do not
   invent a matrix."*

The measurement is executable and is in the probe (§5, the `AP-30` block): at the only call site's
input shape the predicate returns `true`, and the matrix the unit test proves — a same-origin
`baseUrl` — returns `false`, which is the row's whole content.

## 2. AP-12 — the SPLIT, stated so neither half can be reported as the whole

`AP-12` is **one defect with two owners**, and the record splits it explicitly: *"Surface vocabulary
→ **X-W7 rider** (one transport-truth voice); latch/ref reconciliation lives in **transport**"*.

- **Transport's half — LANDED here** (`2d9f45ff`): `isBackendUnreachable(error)` in
  `availability.ts` is now the single trip condition for *"the backend is not answering"*: true for
  `ApiUnavailableError` alone; false for `ApiProblem` (the backend **answered**) and for
  `DevMisconfigError` (a designed dev-config state whose own message reads *'NOT "backend
  offline"'*).
- **X-W7's half — NOT landed here, by the ruling**: the seven hand-written `is unreachable.`
  sentences. Census at this unit's close, unmoved and deliberately so:

  demo/palettes/BrowsePane.vue:65:                    message="The commons is unreachable."
  demo/palettes/browser/admin/AdminAuditPanel.vue:45:            message="The ledger is unreachable."
  demo/palettes/browser/admin/AdminTagsPanel.vue:71:            message="The tag ledger is unreachable."
  demo/palettes/browser/admin/AdminUsersPanel.vue:54:            message="The roster is unreachable."
  demo/palettes/browser/admin/AdminFlaggedPanel.vue:25:            message="The flag queue is unreachable."
  demo/palettes/browser/admin/AdminNamesPanel.vue:33:                message="The proposal queue is unreachable."
  demo/palettes/browser/admin/AdminNamesPanel.vue:83:                message="The approved list is unreachable."

  ⟨cmd⟩ `grep -rn "is unreachable\." demo --include="*.vue" | wc -l` → **7**

  Each of the seven is a `message=` prop on a surface that sets it from a bare `catch`, i.e. on
  *any* thrown error — which is precisely the second trip condition the record measured against the
  latch's. **X-W7's rider consumes `isBackendUnreachable`**; until it does, the two conditions still
  disagree at the surfaces, and this unit does not claim otherwise. **Neither wave may report AP-12
  closed alone** — the same edge law COHESION §0k.3 **S-6** applies to the X-W3 ⟂ X-W7 AdminGate
  seam.

## 3. Residuals this unit carries out, each with a named owner

| # | residual | owner | why not here |
|---|---|---|---|
| 1 | **`App.vue:217`'s comment still lists `baseUrl`** among the provided members after AP-29 deleted it | **X-W5** (`demo/color-picker/App.vue` is its containment file, COHESION §0k.3 **S-7**) | the file is outside this unit's §4 widening — a one-word correction is still a write, and a write outside bounds is an ESCALATION |
| 2 | **The seven `is unreachable.` sentences** | **X-W7** (AP-12's surface half, by the record) | §2 above |
| 3 | **No permanent repo spec for these rows** — the probe is scratchpad-resident | a successor holding `test/**` bounds | `W3.md` §4, even as widened, grants this unit **no** `test/**` path; the identical constraint X.W3.6 recorded for its G-17 probe. **The probe source is embedded at §5 so installing it is a copy, not a re-derivation.** |
| 4 | **`availability.ts` and `api-problem.ts` are prettier-nonconforming** — and were **before** this unit | a formatting sitting, not a row | measured at the pre-unit commit: ⟨cmd⟩ `git show 02238dbb:demo/platform/transport/availability.ts \| npx prettier --stdin-filepath … --check` → **warns**, same for `api-problem.ts`; `client.ts` and `useApiClient.ts` → **clean, and still clean**. The single complaint in `availability.ts` is the hand-wrapped `ApiAvailability` union at `:41-45`, **a line this unit never touched**. Reformatting it would put bytes no row asks for into a cure commit. |
| 5 | **AP-1 / AP-9 / the ApiOfflineChip component itself** | **X-W7** | this unit's widening is `demo/platform/transport/**` and nothing beside it; `ApiOfflineChip.vue` is not in it |

## 4. What was considered and REFUSED, so the choice is legible

- **AP-17 — an in-flight flag.** The record names two cures: *"re-arm on allow, or a `probeInFlight`
  flag"*. **Re-arm was taken.** A flag must be cleared on both settle paths, and a request that
  never settles (the slow-failing backend this row is about) would leave it set and **wedge the
  latch shut** — trading an unbounded burst for a permanent outage. Re-arming holds no state that
  can leak: the window is a timestamp that the next failure or success overwrites. The refusal is
  written into the docstring at the byte, not only here.
- **AP-12 — tripping the latch on any thrown error** (the other way to make the two conditions one).
  Refused: an `ApiProblem` means the backend **answered**, and latching on a 404 would darken the
  instrument over a working backend. The latch's condition was already the correct one; the
  surfaces' was not.
- **AP-29 — deprecating `baseUrl` instead of deleting it.** Refused by the no-backwards-compat law
  (`feedback_no_backwards_compat`); a carved corpse behind a moved consumer set is the shim that law
  forbids.

## 5. The probe, verbatim — for the successor that holds `test/**`

Two files. Installed under `test/` the config is unnecessary (the repo's own `vitest.config.ts`
already collects `test/**/*.test.ts`, jsdom, with the vue plugin), and the absolute imports become
relative: `../demo/platform/transport/availability`. Nothing else changes.

### 5.1 `transport-cluster.probe.test.ts`

```ts
// SERVED MODEL: claude-opus-5[1m]
//
// X.W3.7 · GF-R1 — the ApiOfflineChip transport cluster, probed at the shipped
// bytes of `demo/platform/transport/**`.
//
// AP-17 (CONFIRMED MAJOR) is the BORN-RED gate: the cooldown gate's allow branch
// (`availability.ts:193`) neither re-arms `unavailableSince` nor holds an
// in-flight flag, so EVERY caller past the window passes — an unbounded burst
// against the docstring's twice-made "ONE probe" promise (`:9-11`, `:185-186`).
// Re-arm happens only on failure (`:170`).
//
// AP-31 / AP-33 / AP-24 ride the same harness. AP-12 / AP-29 / AP-30 are
// structural or record rows and are measured by grep in the unit receipt.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp, h } from "vue";

import { ApiProblem } from "/Users/mkbabb/Programming/value.js/demo/platform/transport/api-problem.ts";

import {
    apiAvailability,
    assertApiAttemptAllowed,
    ApiUnavailableError,
    detectDevMisconfig,
    DevMisconfigError,
    isBackendUnreachable,
    markApiReachable,
    markApiUnreachable,
} from "/Users/mkbabb/Programming/value.js/demo/platform/transport/availability.ts";

const COOLDOWN_MS = 30_000;
const T0 = new Date("2026-09-18T12:00:00.000Z").getTime();

/** How many of `n` consecutive gate calls are ADMITTED (do not throw). */
function admittedOf(n: number): number {
    let admitted = 0;
    for (let i = 0; i < n; i++) {
        try {
            assertApiAttemptAllowed();
            admitted++;
        } catch (e) {
            expect(e).toBeInstanceOf(ApiUnavailableError);
        }
    }
    return admitted;
}

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(T0);
    apiAvailability.value = "unknown";
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("AP-17 — the cooldown gate admits exactly ONE probe per window", () => {
    it("inside the window every caller is refused (the half that already holds)", () => {
        markApiUnreachable();
        expect(apiAvailability.value).toBe("unavailable");
        vi.setSystemTime(T0 + COOLDOWN_MS - 1);
        const admitted = admittedOf(10);
        console.log(`[AP-17] inside-window admitted = ${admitted} of 10`);
        expect(admitted).toBe(0);
    });

    it("BORN-RED: past the window, exactly ONE of 10 callers is admitted", () => {
        markApiUnreachable();
        vi.setSystemTime(T0 + COOLDOWN_MS);
        const admitted = admittedOf(10);
        console.log(`[AP-17] first-window-open admitted = ${admitted} of 10`);
        expect(admitted).toBe(1);
    });

    it("FALSIFIER: the NEXT window still opens — the cure admits, it does not wedge", () => {
        markApiUnreachable();
        vi.setSystemTime(T0 + COOLDOWN_MS);
        const first = admittedOf(10);
        vi.setSystemTime(T0 + 2 * COOLDOWN_MS + 1);
        const second = admittedOf(10);
        console.log(
            `[AP-17] window1 admitted = ${first} of 10 · window2 admitted = ${second} of 10`,
        );
        expect(first).toBe(1);
        expect(second).toBe(1);
    });

    it("a failed probe re-arms the window (markApiUnreachable, :170)", () => {
        markApiUnreachable();
        vi.setSystemTime(T0 + COOLDOWN_MS);
        expect(admittedOf(1)).toBe(1);
        markApiUnreachable(); // the probe failed
        vi.setSystemTime(T0 + COOLDOWN_MS + 1);
        expect(admittedOf(5)).toBe(0);
    });

    it("a successful probe releases the latch entirely", () => {
        markApiUnreachable();
        vi.setSystemTime(T0 + COOLDOWN_MS);
        expect(admittedOf(1)).toBe(1);
        markApiReachable(); // the probe succeeded
        expect(apiAvailability.value).toBe("available");
        expect(admittedOf(10)).toBe(10);
    });
});

describe("AP-31 — markApiReachable defends `misconfigured`", () => {
    it("BORN-RED: a reachable mark never clears a designed misconfig", () => {
        apiAvailability.value = "misconfigured";
        markApiReachable();
        console.log(`[AP-31] after markApiReachable → ${apiAvailability.value}`);
        expect(apiAvailability.value).toBe("misconfigured");
    });

    it("and still releases a real `unavailable` latch (the falsifier)", () => {
        markApiUnreachable();
        expect(apiAvailability.value).toBe("unavailable");
        markApiReachable();
        expect(apiAvailability.value).toBe("available");
    });
});

describe("AP-33 — initApiEnvironment is idempotent in fact, not only in prose", () => {
    it("BORN-RED: a second call is a no-op — one latch, ONE console.error", async () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        // A FRESH module graph: the guard is module state, so the probe must own
        // the first call rather than inherit another test's.
        vi.resetModules();
        const avail = await import(
            "/Users/mkbabb/Programming/value.js/demo/platform/transport/availability.ts"
        );
        avail.initApiEnvironment("https://api.color.babb.dev");
        avail.initApiEnvironment("https://api.color.babb.dev");
        avail.initApiEnvironment("https://api.color.babb.dev");
        console.log(
            `[AP-33] console.error calls after 3 inits = ${consoleError.mock.calls.length}`,
        );
        expect(avail.apiAvailability.value).toBe("misconfigured");
        expect(consoleError).toHaveBeenCalledTimes(1);
    });
});

describe("AP-24 — importing the transport module mutates no global state", () => {
    it("BORN-RED: importing client.ts leaves the latch `unknown` and the console silent", async () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        vi.resetModules();
        // Assert on the SAME graph the import under test wires — a stale outer
        // instance would read "unknown" for the wrong reason (a false green).
        const avail = await import(
            "/Users/mkbabb/Programming/value.js/demo/platform/transport/availability.ts"
        );
        expect(avail.apiAvailability.value).toBe("unknown");
        await import(
            "/Users/mkbabb/Programming/value.js/demo/platform/transport/client.ts"
        );
        console.log(
            `[AP-24] after bare import of client.ts → availability=${avail.apiAvailability.value} · console.error=${consoleError.mock.calls.length}`,
        );
        expect(avail.apiAvailability.value).toBe("unknown");
        expect(consoleError).not.toHaveBeenCalled();
    });

    it("and `provideApiClient()` IS the explicit seat that inits", async () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        vi.resetModules();
        const avail = await import(
            "/Users/mkbabb/Programming/value.js/demo/platform/transport/availability.ts"
        );
        const { provideApiClient } = await import(
            "/Users/mkbabb/Programming/value.js/demo/platform/transport/useApiClient.ts"
        );
        // The falsifier for this row: merely IMPORTING the seam (which pulls
        // client.ts) must not have inited. Without this line the test is green
        // before the cure, for the very side effect it exists to retire.
        expect(avail.apiAvailability.value).toBe("unknown");
        const app = createApp({
            setup() {
                provideApiClient();
                return () => h("div");
            },
        });
        app.mount(document.createElement("div"));
        console.log(
            `[AP-24] after provideApiClient() → availability=${avail.apiAvailability.value} · console.error=${consoleError.mock.calls.length}`,
        );
        expect(avail.apiAvailability.value).toBe("misconfigured");
        expect(consoleError).toHaveBeenCalledTimes(1);
        app.unmount();
    });
});

describe("AP-12 — ONE owner for \"the backend is not answering\" (transport limb)", () => {
    it("BORN-RED: the predicate trips on the LATCH's condition and nothing else", () => {
        expect(isBackendUnreachable(new ApiUnavailableError())).toBe(true);
        // The backend ANSWERED — an HTTP status is not an outage.
        expect(isBackendUnreachable(new ApiProblem("about:blank", "Not Found", 404))).toBe(
            false,
        );
        // A designed dev-config state, whose own message forbids the conflation.
        apiAvailability.value = "misconfigured";
        expect(isBackendUnreachable(new DevMisconfigError())).toBe(false);
        // The condition the seven hand-written sentences use TODAY (any throw).
        expect(isBackendUnreachable(new Error("boom"))).toBe(false);
        console.log(
            "[AP-12] predicate: ApiUnavailableError=true · ApiProblem=false · DevMisconfigError=false · bare Error=false",
        );
    });
});

describe("AP-30 — the third conjunct's reachability, measured (recorded, not rebuilt)", () => {
    it("at the ONLY call site's input shape, legs 1+2 force leg 3 true", () => {
        // `initApiEnvironment`'s inputs: viteApiUrlSet = Boolean(VITE_API_URL);
        // baseUrl = VITE_API_URL ?? DEFAULT_REMOTE_API_URL (client.ts:36-37).
        // So leg 1 passing (unset) PINS baseUrl to the remote constant, and leg 2
        // passing pins the page to loopback — cross-origin is then a tautology.
        const wired = {
            viteApiUrlSet: false,
            baseUrl: "https://api.color.babb.dev", // forced by leg 1
            pageOrigin: "http://localhost:9000", // forced by leg 2
            pageHostname: "localhost",
        };
        expect(detectDevMisconfig(wired)).toBe(true);
        // The matrix the unit test proves but the wiring cannot produce:
        expect(
            detectDevMisconfig({ ...wired, baseUrl: "http://localhost:9000/api" }),
        ).toBe(false);
        console.log(
            "[AP-30] third conjunct is a tautology at the only call site — RECORDED (moot-on-AP-1), detector left pure+total",
        );
    });
});
```

### 5.2 `vitest.probe.config.ts` — needed ONLY while the probe lives outside the project root

```ts
// SERVED MODEL: claude-opus-5[1m]
// X.W3.7 · GF-R1 — scratchpad-resident probe harness. `W3.md` §4 (as widened by
// the 2026-09-18 E-3 addendum) grants this unit NO `test/**` path, so the runtime
// probe lives here and only its transcript is banked as a §8 artefact — the same
// shape X.W3.6 used for its G-17 probe. No `proof-*.mjs` script is authored
// (CC-019's structural ban); this is a vitest run against the shipped bytes.
//
// A bare object literal, no imports: a vitest config outside the project cannot
// resolve `vitest/config` or any plugin id from its own directory.
const SCRATCH =
    "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/w37";

export default {
    root: "/Users/mkbabb/Programming/value.js",
    // The probe lives outside `root`, so a BARE specifier ("vue") resolves from
    // the probe's own directory and fails. The alias points at the project's own
    // installed copy — the same bytes the demo runs.
    resolve: {
        alias: {
            vue: "/Users/mkbabb/Programming/value.js/node_modules/vue/dist/vue.runtime.esm-bundler.js",
        },
    },
    server: { fs: { allow: ["/"] } },
    test: {
        include: [`${SCRATCH}/*.probe.test.ts`],
        environment: "jsdom",
    },
};
```

---

**Gate readings, BEFORE → AFTER** (both sides double-run; the transcripts are
`W3-7-born-red-before.txt` and `W3-7-cluster-after.txt`):

| row | BEFORE | AFTER |
|---|---|---|
| **AP-17** | first window admits **10 of 10**; window 2 admits **10 of 10** | **1 of 10**, and **1 of 10** — the window still opens |
| **AP-31** | `markApiReachable()` on a misconfigured latch → **`available`** | → **`misconfigured`**; a real `unavailable` latch still releases |
| **AP-33** | 3 inits → **3** `console.error` | 3 inits → **1** |
| **AP-24** | bare import of `client.ts` → **`misconfigured`**, `console.error` **1** | → **`unknown`**, `console.error` **0**; `provideApiClient()` → `misconfigured`, **1** |
| **AP-12** | two trip conditions, no shared owner | one predicate: `ApiUnavailableError`=true · `ApiProblem`=false · `DevMisconfigError`=false · bare `Error`=false |
| **AP-29** | `baseUrl` on the seam, zero readers | member deleted; `vue-tsc` all four bands exit **0** |
| **AP-30** | (record row) | **RECORDED** — §1 above |

Probe: **6 failed / 5 passed → 12 passed / 0 failed**. Whole suite unmoved across every landing:
**2 failed / 460 passed (35 files)**, both failures sibling waves' born-RED canaries
(`test/spectrum-luma.test.ts` C-5 · `demo/test/shell/reka-binding-idiom.test.ts` NG-6).
