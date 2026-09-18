# SERVED MODEL: claude-opus-5[1m]
#
# roots-census.sh -- tranche X, Track D, X.P.W0.b.
# The executable form of the never-touch law (W0.md section 3.6): it prints the
# eighteen preserved roots' identities and NOTHING else.
#
# WHY LINE 1 IS A COMMENT: the seat-receipts law puts `SERVED MODEL: <id>` at
# line 1 of every created file. In a shell script a bare `SERVED MODEL: ...`
# line would execute as a command, emit `command not found` on stderr and, on
# some shells, a non-zero status -- both of which break the sub-gate ("exits 0,
# writes no byte outside its own stdout"). The receipt is therefore carried at
# line 1 in the file's own comment syntax. There is deliberately NO shebang and
# the file is NOT marked executable: it is invoked as `sh <path>`, which is the
# form W0.md section 7 checks (`sh -n`) and runs.
#
# INVOCATION -- both captures MUST use exactly this form, unedited, with no
# header prepended by hand and no line removed:
#
#     sh docs/tranches/X/parse-that/evidence/W0/roots-census.sh > \
#        docs/tranches/X/parse-that/evidence/W0/census-before.txt     # X.P.W0.b, BEFORE .c dispatches
#     sh docs/tranches/X/parse-that/evidence/W0/roots-census.sh > \
#        docs/tranches/X/parse-that/evidence/W0/census-after.txt      # X.P.W0.d, at close
#     diff docs/tranches/X/parse-that/evidence/W0/census-before.txt \
#          docs/tranches/X/parse-that/evidence/W0/census-after.txt    # G-3: MUST be empty
#
# The `SERVED MODEL:` line this script prints names the AUTHORING seat of this
# instrument (X.P.W0.b), not the seat that runs it. It is emitted by the script
# rather than added by hand precisely so that the before- and after-captures
# stay byte-comparable; a later seat's own model receipt belongs in that seat's
# block of `docs/tranches/X/execution/D/X-P-W0.md`, never in a diffed artifact.
#
# LAW THIS SCRIPT OBEYS (W0.md sections 3.2/3.3/3.6, section 4's do-not-touch
# list, and COHESION.md section 0j's gate-25 ruling):
#   * it writes NO byte anywhere but its own stdout -- no temp file, no lock,
#     no index refresh;
#   * it runs ONLY `git rev-parse` (with --no-optional-locks) and `find`. It
#     never runs `git status` -- status refreshes the index stat-cache, which is
#     a write into the shared repository the census exists to prove untouched;
#   * it never runs `gc`, `repack`, `prune`, `worktree prune`, `stash`, or any
#     branch write. G-3's own falsifier is that such an act makes the
#     before/after diff non-empty;
#   * it prints NO date and NO timestamp. A stamped census can never diff to
#     empty, so a stamp would silently destroy the gate it serves;
#   * `-e "$p/.git"` is the git-root test, NOT `rev-parse` alone: rev-parse walks
#     UP the directory tree and would mis-attribute a non-repository root to a
#     parent repository.
#
# WHAT IT CANNOT SEE (disclosed, not hidden): the file-count column excludes
# `.git`, so a `gc`/`repack` inside the shared object store changes no column
# here. That act is caught by G-5's checks (ii) inode intersection and (iii)
# `du -sh parse-that/.git`, taken at unit .c. This census detects moved HEADs,
# branch writes/renames, worktree adds that check out a root, appearing and
# disappearing roots, and any added or removed working-tree file.

set -u

n=0

census_row() {
    p=$1
    n=$((n + 1))

    if [ ! -e "$p" ]; then
        printf '%-2s  %-72s  %-7s  %-14s  %-42s  %7s\n' \
            "$n" "$p" "ABSENT" "-" "-" "-"
        return 0
    fi

    if [ -e "$p/.git" ] && id=$(git --no-optional-locks -C "$p" rev-parse --short HEAD 2>/dev/null); then
        br=$(git --no-optional-locks -C "$p" rev-parse --abbrev-ref HEAD 2>/dev/null)
        if [ "$br" = "HEAD" ]; then
            br="HEAD (detached)"
        fi
    else
        id="NOT-A-GIT-ROOT"
        br="-"
    fi

    files=$(find "$p" -type f -not -path '*/.git/*' -not -path '*node_modules*' 2>/dev/null | wc -l | tr -d ' ')

    printf '%-2s  %-72s  %-7s  %-14s  %-42s  %7s\n' \
        "$n" "$p" "PRESENT" "$id" "$br" "$files"
}

printf 'SERVED MODEL: claude-opus-5[1m] -- authoring seat of roots-census.sh; this stream is that script'\''s verbatim stdout\n'
printf 'X.P.W0 FROZEN-ROOTS CENSUS -- the eighteen preserved roots of the parser lane'\''s blast radius\n'
printf 'INSTRUMENT: git rev-parse (--no-optional-locks) + find ONLY. No status. No gc. No prune. No write. No timestamp.\n'
printf 'COLUMNS: ##  path  state  identity  branch  files (-type f, excluding .git and node_modules)\n'
printf -- '--\n'

# -- the seven parse-that roots (six of them worktrees of ONE shared repository) --
census_row /Users/mkbabb/Programming/parse-that
census_row /Users/mkbabb/Programming/parse-that-css-totality
census_row /Users/mkbabb/Programming/parse-that-css-totality-p1-e
census_row /Users/mkbabb/Programming/parse-that-css-totality-p1-r
census_row /Users/mkbabb/Programming/parse-that-css-totality-p1-vk
census_row /Users/mkbabb/Programming/parse-that-runtime-probes
census_row /Users/mkbabb/Programming/parse-that-skv26

# -- the eighth parse-that row: the m2 baseline. Its path is gone AND, as of
#    2026-09-17, its `prunable` worktree-registry record is gone too. The row
#    stays in the census: a root that reappears is exactly what the diff must
#    catch.
census_row /private/tmp/parse-that-m2-baseline-20260729

# -- the three ~/.codex worktrees (read/hash only, C-02 discipline) --
census_row /Users/mkbabb/.codex/worktrees/7e28/value.js
census_row /Users/mkbabb/.codex/worktrees/9167
census_row /Users/mkbabb/.codex/worktrees/d0be

# -- the two value.js sibling worktrees off this lane's path --
census_row /Users/mkbabb/Programming/value-css-totality-audit
census_row /Users/mkbabb/Programming/value-xw1-demo-boot

# -- the three Codex evidence paths (TCC-walled on 2026-08-03; readable
#    2026-09-17 -- the grant does not license a write, and the builder and its
#    __pycache__ residue are hashed, never edited, run, cleaned or regenerated)
census_row /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-v12-construction
census_row /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-and-experiment-v12
census_row /Users/mkbabb/Documents/Codex/2026-07-29/parser-p4-fresh-sol-adjudication/outputs

# -- the evidence archive and the ephemeral parser-proof job tree: the two roots
#    most likely to be mistaken for scratch, which is why they are rows --
census_row /Users/mkbabb/Programming/.p-totality
census_row /Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof

printf -- '--\n'
printf 'ROOTS ENUMERATED: %s\n' "$n"

exit 0
