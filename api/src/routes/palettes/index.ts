/**
 * Palette router entry point (D.W2 Lane A — split of `routes/palettes.ts`).
 *
 * Mounts the 5 concern-routers under the shared `/palettes` prefix. Concern
 * routers each carry a coherent sub-domain (CRUD, versions, forks, votes,
 * flags) and are independently testable.
 *
 * The actual partition (5 concerns) deviates from the wave spec's tentative
 * 6 (which proposed `export` and `slug` routers) because the original file
 * carries no export/slug endpoints. See `docs/tranches/D/audit/D.W2-palettes-split.md`
 * §2 for the recorded partition.
 *
 * Sub-router registration order — within Hono each handler matches by literal
 * path, but explicit ordering reduces surprise:
 *   1. crud      — `/`, `/mine`, `/:slug`, `POST /`, `PATCH /:slug`, `DELETE /:slug`
 *   2. versions  — `/:slug/versions`, `/:slug/versions/:hash`, `/:slug/revert`
 *   3. forks     — `/:slug/fork`, `/:slug/forks`, `/:slug/provenance`
 *   4. votes     — `/:slug/vote`
 *   5. flags     — `/:slug/flag`
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { crudRouter } from "./crud.js";
import { diffRouter } from "./diff.js";
import { flagsRouter } from "./flags.js";
import { forksRouter } from "./forks.js";
import { publishRouter } from "./publish.js";
import { versionsRouter } from "./versions.js";
import { votesRouter } from "./votes.js";

export const palettes = new Hono<AppEnv>();

palettes.route("/", crudRouter);
palettes.route("/", versionsRouter);
palettes.route("/", forksRouter);
// J.W2 remix lives in forksRouter (`/:slug/remix`); the read-only diff
// endpoint + the publish/unpublish verb pair are their own concern routers.
palettes.route("/", diffRouter);
palettes.route("/", publishRouter);
palettes.route("/", votesRouter);
palettes.route("/", flagsRouter);
