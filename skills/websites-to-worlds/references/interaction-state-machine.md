# Interaction State Machine

Use this before implementing pointer lock, overlays, pause/menu, map, or touch controls. First-person web worlds fail most often when canvas capture and DOM overlays compete for input. Model the UI as one explicit state machine instead of scattered booleans.

## Required State Shape

Keep one serializable state object in the world UI/controller layer:

```js
{
  mode: 'boot' | 'walking' | 'panel' | 'map' | 'pause' | 'pointer-lost' | 'resume-capture' | 'touch',
  activePanelId: null,
  activeZoneId: null,
  nearestInteractableId: null,
  pointerLocked: false,
  inputMode: 'keyboard-mouse' | 'touch',
  lastCloseReason: null
}
```

Use different names if the project already has a convention, but keep the same concepts. Avoid independent flags like `isPaused`, `panelOpen`, `mapOpen`, and `pointerLost` unless they derive from one source of truth.

## State Responsibilities

| State | Canvas look/move | DOM focus | Main prompt | Notes |
| --- | --- | --- | --- | --- |
| `boot` | disabled | start UI | start/enter | Do not request audio or pointer lock before a user gesture. |
| `walking` | enabled | none or HUD only | nearest action | Pointer lock may be active on desktop. Raycast/proximity can update highlights. |
| `panel` | disabled or look-only | panel | close/read links | Interaction key should close the current panel before it can open another. |
| `map` | disabled | map | close/fast travel | Fast travel should close map and set a clean spawn/orientation. |
| `pause` | disabled | menu | resume/settings/exit | Escape should not also trigger browser back or reopen a panel. |
| `pointer-lost` | disabled | lightweight notice | click/tap to resume | Enter when browser unlocks pointer outside an intentional overlay transition. |
| `resume-capture` | disabled until click | full-canvas capture layer | click to resume | Consume the resume click so it cannot activate the nearest object. |
| `touch` | touch camera or orbit | touch HUD | tap prompts | Copy must say tap, not only "press E". |

## Desktop Event Rules

| Event | From `walking` | From `panel` | From `map` | From `pause` | From `pointer-lost` / `resume-capture` |
| --- | --- | --- | --- | --- | --- |
| `E` / interact | open nearest panel/action | close current panel | no-op unless a focused map item handles it | no-op | no-op |
| `Esc` | open pause, or unlock then pause if the browser forces unlock first | close panel | close map | resume walking or show resume-capture | show pause or stay resumable |
| close button | no-op | close panel and block same-tick reopen | close map | close pause/resume | no-op |
| canvas click | request pointer lock or interact if not locked | no-op outside explicit panel backdrop close | no-op | no-op | resume pointer lock only |
| map button | open map | close panel then open map only after state settles | close map | no-op | no-op |
| pause button | open pause | close panel then pause only after state settles | close map then pause | close pause/resume | no-op |

Implement a short input cooldown or event-consumption guard after closing overlays. The close click, Escape keyup, or pointer-lock resume click must not immediately re-open the object the player is still facing.

## Pointer Lock Rules

- Request pointer lock only after a user gesture.
- Treat `pointerlockchange` as an external event. If pointer lock disappears while the app is not intentionally opening a panel/map/pause menu, enter `pointer-lost` or `resume-capture`.
- When opening DOM overlays intentionally, release pointer lock and mark the transition as intentional so it does not show an erroneous "lost pointer" warning.
- When resuming, request pointer lock from a dedicated overlay click. Stop propagation and ignore interaction raycasts for at least one frame after capture.
- Do not bind world interaction to the same click that resumes pointer lock.

## Touch Rules

If mobile/touch is supported:

- Detect touch/pointer coarse input before showing copy.
- Replace "Press E" with "Tap" or show both: "Press E / Tap".
- Provide visible buttons for map, pause, close, and return home.
- Keep panel close targets large enough for thumbs.
- Avoid hover-only affordances. Highlights can appear on proximity, focus, or tap preview.

If touch is not supported, show a clear fallback on narrow or touch-first devices rather than a broken desktop-only control scheme.

## Regression Checklist

Before handoff, test these transitions in a real browser:

- Enter world -> walking.
- Walking -> panel with `E`.
- Panel -> walking with `E`.
- Panel -> walking with `Esc`.
- Panel -> walking with the close button, with no immediate reopen.
- Walking -> pause with `Esc`.
- Pause -> resume-capture -> walking without triggering nearby objects.
- Walking -> map -> walking.
- Map fast travel returns to walking with sane position/yaw.
- Pointer lock lost by clicking outside or pressing Esc behaves intentionally.
- Touch open/close/map/pause works, or touch fallback appears.
