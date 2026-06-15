# Validation Playbook

Run validation after implementation and after meaningful visual changes.

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

Optional helper:

```bash
node <skill>/scripts/probe-three-scene.mjs \
  --url http://localhost:8765/<route>/ \
  --out /tmp/websites-to-worlds-probe \
  --start-selector "#start, #board-btn, [data-start]"
```

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

Use DevTools, browser tooling, or practical observation:

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
- Known limitations or unverified areas.
