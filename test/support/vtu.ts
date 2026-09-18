/**
 * SERVED MODEL: claude-opus-5[1m]
 *
 * X-W1 · X.W1.a — the mount-harness instrument law (fold R7, binding on every
 * wave that writes a component-mount gate).
 *
 * `@vue/test-utils` stubs `<Transition>` and `<TransitionGroup>` BY DEFAULT —
 * verified in the installed 2.4.11 bytes (`dist/vue-test-utils.cjs.js`: the
 * `config.global.stubs` seed and the `DEFAULT_STUBS` set, with the in-source
 * *"even if we are using `mount`"* comment). The consequence is not cosmetic:
 * a jsdom gate over a transition-wrapped affordance asserts the OPPOSITE of
 * the shipped focus/visibility behaviour, which is how a whole audit round
 * reported a defect no instrument had ever observed.
 *
 * R7's lock is *"any component-mount gate stub-strips `Transition` or runs a
 * real browser"*. Installing the strip as a vitest `setupFile` makes it the
 * harness default rather than a per-suite courtesy, so a gate cannot be
 * authored without it.
 *
 * NOT covered by this file, and stated so it is not mistaken for covered
 * (fold R53's MOUNTABILITY LOCK): a component that hard-asserts injections
 * (`inject(...)!`) cannot be mounted standalone at all. Such an oracle must
 * SUPPLY both injections explicitly or be authored as a pure-function seam
 * test — wrapping the SFC in its parent to make it mount has tested the parent.
 */
import { config } from "@vue/test-utils";

config.global.stubs = {
    ...config.global.stubs,
    transition: false,
    "transition-group": false,
};
