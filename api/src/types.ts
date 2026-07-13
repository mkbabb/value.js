import type { WithId } from "mongodb";
import type { Services } from "./platform/http/inject-services.js";
import type { Palette } from "./modules/palette/model.js";

export type AppEnv = {
    Variables: {
        sessionToken: string | undefined;
        userSlug: string | undefined;
        /**
         * The resolved admin actor (U-F40). Set by the `adminAuth` bearer gate
         * to a synthetic, resolvable admin identity once the bearer validates,
         * so bearer-only admin ops (which carry no session `userSlug`) attribute
         * a real actor to `admin_audit` instead of sinking `actorSlug` to `null`.
         * Present ONLY on routes mounted behind `adminAuth`; `undefined` elsewhere.
         */
        adminActor: string | undefined;
        /**
         * Typed DI container (D.W2 Lane C — D-HARDEN-3 §2.2).
         * Populated by `middleware/inject-services.ts`; accessed via
         * `c.var.services.repositories.<x>` inside route handlers + services.
         * The middleware constructs `Services` once per worker (lazy).
         */
        services: Services;
        /**
         * The owner-gated palette, stashed by the `requireOwnership` extractor
         * (N.W3.E). On `PATCH`/`DELETE`/`restore`/`revert` the ownership read
         * already fetched the full document; stashing it here lets the route's
         * ETag pre-check + the service write reuse it instead of re-reading the
         * same slug — the PATCH read-amplification collapse (4 → 2). Present
         * only on routes mounted behind `requireOwnership(paletteOwnerExtractor)`.
         */
        palette: WithId<Palette> | undefined;
    };
};
