# SERVED MODEL: claude-opus-5[1m]
#
# roots-census-v2.sh -- tranche X, Track D, unit X.P.W2.0.
#
# A SUCCESSOR BESIDE roots-census.sh, NEVER AN EDIT OF IT. The original is
# sealed evidence: G-3's whole proof is that `census-before.txt` and
# `census-after.txt` diff to empty (re-proved a third time at X.P.W0's close and
# a fourth at CHECK 1, digest 7f0c5b13...19d7), and an edited instrument voids
# that proof retroactively. This file therefore carries a NEW NAME and a NEW
# output shape, and is NOT substituted into G-3's captured pair.
#
# WHAT IT CURES -- X.P.W0 CHECK 1 finding D-3, routed by COHESION.md section 0l
# R-7 to X.P.W2's open:
#
#   W0.md:226 names THREE identity states for each row -- `rev-parse --short
#   HEAD` + branch, or "not a repository", or "EPERM". roots-census.sh prints
#   TWO. Under a revoked ~/Documents grant, census rows 14 and 16 would print
#   `NOT-A-GIT-ROOT` -- the reading that says "this path is fine, it simply
#   isn't a repository" -- when the truth would be "this seat cannot see it".
#   Nothing was conflated on 2026-09-17 (the grant was live and all eighteen
#   rows resolved; R-10 books the grant as DATED, not durable), so this is a
#   latent conflation, cured before it can mislead a later reading.
#
#   The same conflation lives in TWO more columns of the original, and both are
#   cured here because a partial cure is the more dangerous artifact:
#
#     * the STATE column. `[ ! -e "$p" ]` is false when a path exists AND when
#       an ancestor of it is unsearchable, so an unreachable root printed
#       ABSENT. v2 resolves the question by walking to the DEEPEST ANCESTOR IT
#       CAN SEE: if that ancestor is searchable, the child's absence is real
#       (ABSENT); if it exists but cannot be searched, absence is UNDECIDABLE
#       from here and the row reads EPERM.
#
#     * the FILE-COUNT column. The original runs `find ... 2>/dev/null`, so a
#       single unreadable subdirectory silently lowers the count -- and a
#       LOWERED COUNT IN A CENSUS WHOSE ENTIRE PURPOSE IS A BYTE-EXACT DIFF is
#       indistinguishable from deleted files. v2 counts find's stderr lines too
#       and publishes them in an ACCESS column: `OK` when the traversal was
#       complete, `PARTIAL(n)` when n entries were refused. A count that could
#       not be taken in full says so.
#
# EPERM IS A COMPLETE RESULT, NOT A FAILURE (W0.md:43, :331 -- "EPERM IS NOT
# ABSENCE"). A row reading EPERM is a row correctly disposed; this script exits
# 0 with EPERM rows present, exactly as it does with ABSENT rows present.
#
# WHY LINE 1 IS A COMMENT: the seat-receipts law puts `SERVED MODEL: <id>` at
# line 1 of every created file. In a shell script a bare `SERVED MODEL: ...`
# line would execute as a command, emit `command not found` on stderr and, on
# some shells, a non-zero status -- both of which break the sub-gate ("exits 0,
# writes no byte outside its own stdout"). The receipt is therefore carried at
# line 1 in the file's own comment syntax. As in the original there is
# deliberately NO shebang and the file is NOT marked executable: it is invoked
# as `sh <path>`, which is the form W0.md section 7 checks (`sh -n`) and runs.
#
# INVOCATION -- identical in form to the original's:
#
#     sh docs/tranches/X/parse-that/evidence/W0/roots-census-v2.sh
#
# Its stdout is NOT byte-comparable to census-before.txt / census-after.txt: it
# carries one extra column and a third state. A v2 diff pair is a v2 diff pair.
#
# EVERY LAW THE ORIGINAL OBEYS, THIS ONE OBEYS (W0.md sections 3.2/3.3/3.6,
# section 4's do-not-touch list, COHESION.md section 0j's gate-25 ruling):
#   * it writes NO byte anywhere but its own stdout -- no temp file, no lock,
#     no index refresh;
#   * it runs ONLY `git rev-parse` (with --no-optional-locks), `find`, `dirname`
#     and shell builtins. It never runs `git status` -- status refreshes the
#     index stat-cache, which is a write into the shared repository the census
#     exists to prove untouched;
#   * it never runs `gc`, `repack`, `prune`, `worktree prune`, `stash`, or any
#     branch write;
#   * it prints NO date and NO timestamp. A stamped census can never diff to
#     empty, so a stamp would silently destroy the gate it serves;
#   * `-e "$p/.git"` is the git-root test, NOT `rev-parse` alone: rev-parse
#     walks UP the directory tree and would mis-attribute a non-repository root
#     to a parent repository.
#
# DISCLOSED, NOT HIDDEN -- what v2 still cannot see:
#   * the file-count column excludes `.git`, so a `gc`/`repack` inside the
#     shared object store changes no column here (caught by G-5's inode
#     intersection and `du -sh parse-that/.git` instead);
#   * the count and the denial count are taken by TWO traversals of the same
#     root, back to back. On a quiescent tree they agree; on a tree changing
#     underneath the script they can disagree, and that disagreement shows up
#     as a changed column rather than as a hidden one, which is the whole point;
#   * an unreadable path whose PARENT is also unreadable reads EPERM, which is
#     correct and is not further resolvable from this seat's credentials.

set -u

n=0

# The deepest ancestor of $1 that this seat can actually see. Used ONLY to
# decide whether a non-existent path is ABSENT (real) or EPERM (undecidable).
deepest_visible_ancestor() {
    d=$(dirname "$1")
    while [ "$d" != "/" ] && [ "$d" != "." ]; do
        if [ -e "$d" ]; then
            printf '%s\n' "$d"
            return 0
        fi
        d=$(dirname "$d")
    done
    printf '/\n'
}

census_row() {
    p=$1
    n=$((n + 1))

    # ---- column 3: state, THREE-VALUED (PRESENT / ABSENT / EPERM) ----
    if [ -e "$p" ]; then
        if [ -r "$p" ] && [ -x "$p" ]; then
            state="PRESENT"
        else
            state="EPERM"
        fi
    else
        anc=$(deepest_visible_ancestor "$p")
        if [ -r "$anc" ] && [ -x "$anc" ]; then
            state="ABSENT"
        else
            state="EPERM"
        fi
    fi

    if [ "$state" = "ABSENT" ]; then
        printf '%-2s  %-72s  %-7s  %-14s  %-42s  %7s  %s\n' \
            "$n" "$p" "ABSENT" "-" "-" "-" "-"
        return 0
    fi

    if [ "$state" = "EPERM" ]; then
        printf '%-2s  %-72s  %-7s  %-14s  %-42s  %7s  %s\n' \
            "$n" "$p" "EPERM" "EPERM" "EPERM" "EPERM" "EPERM"
        return 0
    fi

    # ---- column 4/5: identity + branch, THREE-VALUED on the identity ----
    if [ -e "$p/.git" ]; then
        if id=$(git --no-optional-locks -C "$p" rev-parse --short HEAD 2>/dev/null); then
            br=$(git --no-optional-locks -C "$p" rev-parse --abbrev-ref HEAD 2>/dev/null)
            if [ "$br" = "HEAD" ]; then
                br="HEAD (detached)"
            fi
        elif [ ! -r "$p/.git" ]; then
            # The git root is there and cannot be read. This is precisely the
            # case D-3 names: the original printed NOT-A-GIT-ROOT here.
            id="EPERM"
            br="EPERM"
        else
            id="NOT-A-GIT-ROOT"
            br="-"
        fi
    else
        id="NOT-A-GIT-ROOT"
        br="-"
    fi

    # ---- column 6/7: file count + the completeness of the traversal ----
    files=$(find "$p" -type f -not -path '*/.git/*' -not -path '*node_modules*' 2>/dev/null | wc -l | tr -d ' ')
    denied=$(find "$p" -type f -not -path '*/.git/*' -not -path '*node_modules*' 2>&1 >/dev/null | wc -l | tr -d ' ')

    if [ "$denied" -eq 0 ]; then
        access="OK"
    else
        access="PARTIAL($denied)"
    fi

    printf '%-2s  %-72s  %-7s  %-14s  %-42s  %7s  %s\n' \
        "$n" "$p" "PRESENT" "$id" "$br" "$files" "$access"
}

printf 'SERVED MODEL: claude-opus-5[1m] -- authoring seat of roots-census-v2.sh; this stream is that script'\''s verbatim stdout\n'
printf 'X.P.W0 FROZEN-ROOTS CENSUS v2 -- the eighteen preserved roots, with EPERM as a FIRST-CLASS disposition (D-3 / R-7)\n'
printf 'INSTRUMENT: git rev-parse (--no-optional-locks) + find + dirname ONLY. No status. No gc. No prune. No write. No timestamp.\n'
printf 'STATES: PRESENT / ABSENT / EPERM, never conflated. EPERM is a COMPLETE result, not a failure, and does not change the exit status.\n'
printf 'COLUMNS: ##  path  state  identity  branch  files (-type f, excluding .git and node_modules)  access\n'
printf 'NOT byte-comparable to roots-census.sh: that instrument is SEALED and its census-before/after pair stands unamended.\n'
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
#    __pycache__ residue are hashed, never edited, run, cleaned or regenerated).
#    These are THE rows D-3 is about: under a revoked grant the original printed
#    NOT-A-GIT-ROOT for them; v2 prints EPERM.
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
