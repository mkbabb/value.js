# CHALLENGE-L — `ConsoleRail.vue` library-boundary audit

Source `demo/picker/controls/ComponentSliders/ConsoleRail.vue`, lines 1–329, SHA-256 `a37d644bfda320772782c72ccb67e8433a04a691ad9101f36467abcfd5b6e279`. Static review only.

**Verdict: SOURCE-RED.** The rail consumes several good producer primitives but is tightly bound to ambient demo state and deep internal modules, preventing a clean component contract.

## Dependency trace

| family | imports | ruling |
|---|---|---|
| framework | Vue computed/inject/ref | appropriate |
| producer UI | tooltip, WatercolorDot, dark, breakpoint | useful, but spread across forwarding and package subpaths |
| demo color internals | ink, live surface probe, color-space metadata/model/keys | **high coupling** |

## Findings

1. The prop surface supplies channels and active state, while current space, ranges, live color, ambient ink, and theme arrive through four ambient dependencies. The rail cannot be understood or reused from its props.
2. `inject(COLOR_MODEL_KEY)!` makes a required provider implicit. `INK_AMBIENT_KEY` is optional, producing a second visual calculation path.
3. `colorSpaceInfo as any` discards the metadata type at the exact boundary where channel descriptions are derived.
4. The component directly coordinates navigation, semantic role, tooltip content, producer dot, contrast computation, theme, breakpoint, and CSS. These should be split between a typed channel model and a presentational rail.
5. The glyph registry is local while range/description registries are external; three sources can drift for a newly added space.

## Target boundary

Pass one validated `ChannelRailModel` containing space, ordered channels, glyph, label, range, selected ID, and live color. Keep ambient theme only. Centralize glyph/description/range in the color-space registry and choose a producer semantic primitive matching the final interaction role.
