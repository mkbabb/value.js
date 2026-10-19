// SERVED MODEL: claude-opus-5[1m]
/**
 * ADMIN-POLICY — the explicit, audited authorization branch for an admin
 * operation on a palette (X-W3 · X.W3.6 · class 9 · G-17).
 *
 * WHAT WAS WRONG. `admin/service/palettes.ts` reached
 * `services.repositories.palettes` directly at `:34-35` and `:59,64`, composing
 * no palette-domain predicate at all. Three things about class 9 had already
 * landed — the `adminAuth` bearer middleware, the `ADMIN_ACTOR_SLUG` resolvable
 * identity (U-F40, `auth.ts:35,53-55`), and a typed audit row per mutation — so
 * the question "WHO acted" was answered. The question "under WHICH authority"
 * was not. An admin featuring a public palette and an admin deleting a private
 * one emitted indistinguishable rows, and the difference between them is the
 * whole of moderation review. `API-POLICY §4` names the target: *an audited
 * policy branch; never ownership impersonation, never repository bypass.*
 *
 * WHAT THIS IS. One entry point that resolves the palette, refuses what does not
 * exist, and NAMES the branch it took by composing the class-1 predicate
 * (`palette/service/visibility.ts` `isReadable`, X.A1) rather than re-deriving
 * it. Two branches:
 *
 *   `public`         — the row is readable to any caller. The admin exercised no
 *                      privilege the public did not already have.
 *   `admin-override` — the row is NOT readable to an ordinary caller (private,
 *                      trashed, or moderation-withdrawn). The admin reached past
 *                      the object-read policy on the strength of the bearer
 *                      token alone. THIS is the reviewable event.
 *
 * The admin is never granted the OWNER's identity to obtain the second branch —
 * that would be the ownership impersonation the target forbids, and it would
 * make the audit row a lie about who acted. The viewer passed to the predicate
 * is `undefined`: the question asked is "could the public read this?", and the
 * answer is what the branch records.
 *
 * WHAT THIS IS NOT. It is not a refusal surface. An authenticated admin is
 * authorized for both branches by design; the cure for class 9 is that the
 * branch is DECIDED IN ONE PLACE and RECORDED, not that some admin operation
 * starts failing. The only refusal here is the one both call sites already
 * performed — a palette that does not exist is `404`.
 *
 * Contract of record: `docs/tranches/X/contracts/ADMIN-POLICY.md`
 * (`vnext/api-contract.source.json` is FROZEN-AS-INHERITED per M-15 / W3.md D-7
 * and is not written).
 */

import type { WithId } from "mongodb";

import type { Services } from "../../platform/http/inject-services.js";
import { NotFoundError } from "../../platform/http/errors/index.js";
import type { Palette } from "../palette/model.js";
import { isReadable } from "../palette/service/visibility.js";

/** The authority an admin operation was carried out under. */
export type AdminPolicyBranch = "public" | "admin-override";

/** The literal that prefixes every branch record, in the audit row and in canon. */
export const ADMIN_POLICY = "ADMIN-POLICY" as const;

export interface AdminPolicyDecision {
    /** The resolved palette — returned so the caller need not read it twice. */
    palette: WithId<Palette>;
    /** The branch taken, for the audit row. */
    branch: AdminPolicyBranch;
}

/**
 * Resolve a palette for an admin operation and decide the branch.
 *
 * Every admin palette operation enters here. The palette comes back with the
 * decision so the service does not re-read it — a second read would be a second
 * chance for the two to disagree about which row was acted on.
 */
export async function authorizeAdminPaletteOp(
    services: Services,
    slug: string,
): Promise<AdminPolicyDecision> {
    const palette = await services.repositories.palettes.findBySlug(slug);
    if (!palette) {
        throw new NotFoundError("Palette not found");
    }

    // The class-1 predicate, asked as the public: readable with no viewer means
    // the admin needed no privilege. Anything else is an override.
    const branch: AdminPolicyBranch = isReadable(palette, undefined)
        ? "public"
        : "admin-override";

    return { palette, branch };
}

/**
 * The branch as the audit row's human readout.
 *
 * `AdminAuditEvent.target` is the ONLY field the operator surface renders
 * (`demo/palettes/browser/admin/AdminAuditPanel.vue:77`), so a policy decision
 * that lived only in the structured payload would be invisible exactly where
 * moderation is reviewed — CC-039's failure mode (a relaxation disclosed only in
 * source) in a new coat. The structured form below is the queryable record; this
 * is the one a reviewer reads. Both come from the same decision, through these
 * two functions, so they cannot drift.
 */
export function describeAdminPolicy(branch: AdminPolicyBranch): string {
    return `policy=${ADMIN_POLICY}:${branch}`;
}

/** The branch as the audit row's structured payload (`AdminAuditEvent.payload`). */
export function adminPolicyPayload(branch: AdminPolicyBranch): Record<string, unknown> {
    return { policy: ADMIN_POLICY, branch };
}
