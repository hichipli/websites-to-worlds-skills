# Validation Playbook

Run validation after implementation and after meaningful visual changes.

## Plan and Release Scope

Run `check-world.mjs plan world-plan.json --inventory content-inventory.json` before building. Build the inventory independently from canonical source files; expand every required collection record. The example JSON files under `assets/` demonstrate the format, not a reusable theme. Connections are bidirectional, and `gated: true` means optional prerequisites. A single-zone scene needs no connections (`[]`). Panel-only plans are valid for reading/observation; action details are checked only when an action is declared. Station `access: direct` means no puzzle or achievement is needed. A connected graph does not prove collision clearance or implemented content parity: verify both in the browser.

Before committing or publishing, run `check-world.mjs scope --base <target-ref> --allow <world-path>` with every intended path explicitly listed. Refresh the target ref when appropriate. This checks the aggregate diff from the merge base through the working tree, plus untracked files, including earlier commits. It does not prove deployment configuration is safe; inspect changed configuration and the PR diff separately. Never expand the allowlist merely to silence unrelated changes.

## Static Checks

For plain ES modules:

```bash
cd <repo>/<world-route>
for f in js/**/*.js js/*.js; do node --input-type=module --check < "$f"; done
```

For package-managed apps, use the repo's normal checks:

```bash
npm run lint
npm run typecheck
npm run build
```

Use the commands that exist in the repo. Do not invent package scripts.

## Local Server Checks

Static route example:

```bash
cd <repo>
python3 -m http.server 8765
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8765/<route>/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8765/<route>/js/main.js
```

Check every vendored dependency and important shared data file. A single missing module can leave the scene blank.

## Browser Walkthrough

Capture at least:

- Landing/title screen.
- Spawn/start view after entering.
- Each major zone.
- One important interaction panel.
- Map/directory.
- Pause/settings.
- Mobile or narrow viewport if supported.
- Fallback or error state if WebGL is unavailable or blocked.

Collect:

- Console errors and page errors.
- Network 404s.
- Screenshots.
- Basic scene stats if debug hooks exist, such as mesh/light counts.

Prefer `window.__worldDebug` when available:

```js
window.__worldDebug?.getSceneStats?.()
window.__worldDebug?.getUiState?.()
window.__worldDebug?.getContentStats?.()
```

If the project only exposes `window.__scene`, use it as a fallback and note that the debug surface should be upgraded.

Optional helper:

```bash
node <skill>/scripts/probe-three-scene.mjs \
  --url http://localhost:8765/<route>/ \
  --out /tmp/websites-to-worlds-probe \
  --start-selector "#start, #board-btn, [data-start]"
```

The helper needs Playwright and a browser already available in the calling environment. `--strict` fails on runtime errors, failed HTTP requests, no visible allocated canvas, or a requested start button that was not activated. Inspect `report.json`; a nonzero canvas can still be blank. The probe cannot certify visual quality, walking, pointer lock, accessibility or frame rate. Headless GPU timings are not representative hardware measurements. Use the environment's approved browser tooling instead when required.

## Interaction Regression Matrix

Run the rows relevant to implemented features in a real browser after the main walkthrough; mark others not applicable, and do not add controls or doors to satisfy this matrix. Record pass/fail and any console output:

| Case | Expected result |
| --- | --- |
| Hold movement then release | Movement stops after a long hold; repeat across blur, pause and pointer-lock loss. |
| Exterior / instrument view | Entry saves the player pose, movement stops, and exit restores a safe position and clear controls. |
| Door animation | Closed, opening, open and closing states avoid wall, sign and corridor intersections. |
| Required information | Compare implemented IDs with the independent source inventory, including content moved into a new interaction. |
| Enter world | Landing transitions to walking state; movement/look prompt is visible. |
| Open panel with `E` | Nearest interactable opens exactly one panel and world interaction pauses. |
| Close panel with `E` | Current panel closes and does not immediately reopen. |
| Close panel with `Esc` | Panel closes or returns to the intended previous state without opening pause unless designed that way. |
| Close panel button | Click closes the panel and consumes the click; nearby interactable does not retrigger. |
| Open/close pause with `Esc` | Pause/menu opens from walking and resumes through a clear capture flow. |
| Map open/close | Map opens from walking, closes cleanly, and fast travel sets a valid position/yaw. |
| Resume pointer lock | Resume click restores capture without activating the object under the crosshair. |
| Return home/exit | Exit path returns to the normal site or prior page without trapping the user. |
| Touch open controls | Tap prompts, map, pause, close, and return controls work, or a clear unsupported fallback appears. |

If the app supports both keyboard/mouse and touch, verify that prompts say "Press E / Tap" or switch copy based on input mode. A touch build that still says only "Press E" fails the matrix.

## Browser Automation Noise

Headless Chromium and pointer lock can produce warnings that are not app regressions. Classify findings before reporting:

- **Actionable app errors:** uncaught exceptions, module 404s, missing textures/models, WebGL context loss caused by app code, blank canvases, broken state transitions, unhandled promise rejections from loaders, and accessibility-critical overlay failures.
- **Likely automation noise:** pointer-lock permission warnings in headless mode, GPU blocklist messages, WebGL software-renderer notices, transient audio-context warnings before user gesture, and browser extension noise.

Do not ignore noise silently. Put it in the handoff under "browser warnings observed" and explain why it was not treated as a regression.

## Visual Review Prompts

Look for:

- Blank canvas or black scene.
- Bloom/exposure washout.
- Rooms that are too dark to read.
- UI text clipping or overlapping.
- Signs facing the wrong way.
- Screens hidden from the entrance.
- Floating props in doorways or windows.
- Coplanar flicker.
- Particles or decorative blocks that look like broken assets.
- Windows showing unfinished exterior boxes.
- Mobile controls covering core UI.

## Performance Review

Measure before changing geometry. Record device/GPU, viewport, pixel ratio, browser, quality mode and route; compare the same warm-up and walkthrough before/after. Capture frame-time median and p95, draw calls, triangles and transfer size where available. Agree budgets for the target device instead of treating one universal FPS target as proof. Check batching preserves animation roots, culling bounds and material groups, and resize both renderer and composer.

Use DevTools or available browser tooling:

- Stable interaction at common laptop viewport sizes.
- Pixel ratio capped on high-DPI screens.
- Low-power mode disables expensive postprocessing.
- Static geometry merged where practical.
- Repeated objects instanced.
- No per-frame DOM redraw for static overlays.
- Texture resolution is justified by screen size.

## Handoff Evidence

Final response should briefly state:

- Route or local URL.
- Files changed.
- Key systems implemented.
- Validation commands and browser coverage.
- Interaction matrix results.
- Browser warnings observed, separated from actionable errors.
- Known limitations or unverified areas.
- Git state: untracked, staged, committed, or not committed files relevant to the work.

Template:

```text
Route:
Changed files:
Implemented:
Validation passed:
Interaction matrix:
Browser warnings observed:
Known limitations:
Git state:
```
