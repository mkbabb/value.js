# SERVED MODEL: claude-opus-5-5 — KF.W13X.dh2: apply ONLY this unit's hunks to a file's
# HEAD text (the two files X-DS pass 7 also has dirty), for index-blob staging and the
# AFTER worktree. Usage: python3 shared.py <in> <out> <target|stagetest>
import sys
src, out, kind = sys.argv[1:4]
s = open(src).read()
def rep(old, new):
    global s
    assert s.count(old) == 1, old[:80]
    s = s.replace(old, new)
if kind == "target":
    i = s.index('                <template #aside>\n                    <!-- EE-SEQ-1 "the reel"')
    j = s.index('                </template>\n', s.index('</Button>', i)) + len('                </template>\n')
    s = s[:i] + s[j:]
    rep('import { Button, Card } from "@mkbabb/glass-ui";', 'import { Card } from "@mkbabb/glass-ui";')
    rep('import { Clapperboard } from "@lucide/vue";\n', '')
    rep('''            <!-- Header: the scene's name and ONE live readout, and the reel
                 (X.KF.W13X.sequence — UIA-KF-210 · UIA-KF-211 · KFA-220).''',
        '''            <!-- Header: the scene's name and ONE live readout
                 (X.KF.W13X.sequence — UIA-KF-210 · UIA-KF-211 · KFA-220).
                 X.KF.W13X.dh2 (UIA-KF-098) — the reel left the stage for the
                 Timeline pane's Stagger header, beside Reset (SequenceTimeline):
                 the card is the subject and its readout, no verb.''')
    rep('''                id-class="flex flex-nowrap items-baseline gap-3 min-w-0"
                aside-class="shrink-0"
            >''', '''                id-class="flex flex-nowrap items-baseline gap-3 min-w-0"
            >''')
    rep('The Reel button beside the readout is the discoverable twin.',
        "The Reel button in the Timeline pane's Stagger header is the\n// discoverable twin (X.KF.W13X.dh2).")
elif kind == "stagetest":
    rep(""" *   UIA-KF-210 — one readout per datum: the header is the title, ONE clock
 *     readout and the reel; no `stagger × N` caption, no ready/playing badge.""",
        """ *   UIA-KF-210 — one readout per datum: the header is the title and ONE clock
 *     readout; no `stagger × N` caption, no ready/playing badge, and no reel
 *     (X.KF.W13X.dh2, UIA-KF-098: the reel is the Timeline pane's verb).""")
    rep(" *   KFA-162 · KFA-220 — the reel resumes a held play; its status is the header's.",
        " *   KFA-162 · KFA-220 — the reel resumes a held play; its status is the pane's Reel.")
    rep('''            expect(header.querySelector('[data-stub="Button"]')!.getAttribute("data-loading")).toBe("true");''',
        '''            // X.KF.W13X.dh2 (UIA-KF-098) — the reel's status is the Timeline
            // pane's Reel Button `loading` (sequence-instrument-truth ST-4); the
            // stage header carries no verb at all.
            expect(header.querySelector('[data-stub="Button"]')).toBeNull();
            expect(demo.isReeling.value).toBe(true);''')
    rep('it("KFA-162 · KFA-220 — a reel fired mid-play shows its status in the header and resumes the master when it settles"',
        'it("KFA-162 · KFA-220 — a reel fired mid-play holds its status off the stage header and resumes the master when it settles"')
    import re
    s, n = re.subn(r'it\("UIA-KF-210 — the header is the title, ONE clock (Metric|readout) and the reel: no caption, no badge"',
        'it("UIA-KF-210 — the header is the title and ONE clock readout: no reel, no caption, no badge"', s)
    assert n == 1
    rep('''            expect(header.querySelector('[role="status"]')).toBeNull();
            expect(header.textContent).not.toMatch(/stagger|ready|playing/i);''',
        '''            expect(header.querySelector('[role="status"]')).toBeNull();
            expect(header.querySelector('[data-stub="Button"]')).toBeNull(); // UIA-KF-098 (.dh2): the reel is the pane's
            expect(header.textContent).not.toMatch(/stagger|ready|playing|reel/i);''')
open(out, "w").write(s)
