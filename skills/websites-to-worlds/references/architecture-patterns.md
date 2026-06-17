# Architecture Patterns

## Route Strategy

Prefer an isolated route or subpath for substantial 3D experiences:

```text
world/
  index.html
  css/world.css
  vendor/
  js/
    data.js
    main.js
    world/
      materials.js
      space.js
      scene.js
    player/
      controls.js
    systems/
      interactions.js
      audio.js
    ui/
      hud.js
      panels.js
      map.js
```

Adapt names to the concept, but keep the boundaries. The main route should link into the world without losing its own purpose.

For static hosts and GitHub Pages, verify the exact deployed path early:

- Prefer route-relative asset URLs inside the world route, or derive asset URLs from a route base such as `import.meta.url`, the repo base path, or the app router base.
- Avoid root-absolute URLs like `/world/js/main.js` unless the site truly deploys at the domain root.
- Test both `<route>` and `<route>/` behavior. A missing trailing slash can break relative modules, textures, or vendored dependencies on static hosts.
- If the host requires rewrites, redirects, `_headers`, `_redirects`, or `404.html` routing, document the expected behavior before handoff.

## Data Flow

- Keep canonical sources canonical. Import or load existing data when possible.
- Put world-specific content labels, station copy, and environment metadata in a manifest.
- Derive counts, latest items, category tabs, station subtitles, and map labels at boot.
- Design overflow paths. Extra projects, publications, products, or people should appear in an index or panel even if the 3D room has limited slots.

## World Model

Use meters and a top-down layout:

- `ROOMS`: bounds, height, display name, whether it counts toward tour progress.
- `SPAWN`: start position and yaw.
- `STATIONS`: id, code, name, zone, position, yaw, and panel/action.
- `colliders`: simple AABBs or a proper physics representation.
- `interactables`: targets, prompt, position, radius, zone, and action.

Place interaction and readability before decoration. A beautiful room that hides the main terminal fails the task.

## Content Placement

- Use 3D consoles, plaques, screens, objects, and windows as orientation and story.
- Use DOM panels for long-form reading, tables, links, publication lists, forms, and accessible copy.
- Face important screens toward the likely approach path.
- Keep at least a small offset between coplanar planes to avoid z-fighting.
- Do not place signs, posters, or emitters in door gaps or window openings.

## Modeling And Assets

Choose one or combine:

- Procedural geometry for static sites, fast iteration, and fully self-contained builds.
- Optimized GLB/GLTF assets for recognizable objects, characters, vehicles, furniture, or branded environments.
- Generated bitmap assets for posters, murals, textures, skyboxes, and mood elements when the project benefits from custom art.
- CanvasTexture for signage, terminal screens, maps, simple posters, label plates, and texture atlases.

Every external asset must be accounted for: path, license or source, loading behavior, fallback, and deployment compatibility.

## Interaction Model

A mature web 3D scene usually needs:

- Title or boot state.
- `playing`, `panel`, `map`, `pause`, and fallback states.
- FPS or orbit controls appropriate to the concept.
- Desktop and touch input if mobile support is required.
- Raycast or proximity interaction.
- Prompt and highlight feedback.
- Audio feedback after a user gesture.
- A map, directory, or teleport system if the world has multiple zones.
- Persistence for settings and visited progress when useful.

For first-person controls plus DOM overlays, use an explicit state machine. Read `interaction-state-machine.md` before implementing pointer lock, panel close, Escape, pause, map, resume capture, or touch behavior.

## Debug Contract

Expose a small serializable debug surface in non-production builds or harmlessly in production:

```js
window.__worldDebug = {
  getSceneStats() {
    return { meshes, lights, materials, triangles, drawCalls };
  },
  getUiState() {
    return { mode, activePanelId, activeZoneId, pointerLocked, inputMode };
  },
  getContentStats() {
    return { projects, publications, links, stations, representedItems, missingItems };
  },
  getScreenshotLabels() {
    return [
      { id: 'spawn', label: 'Spawn view' },
      { id: 'projects', label: 'Projects zone' }
    ];
  }
};
```

Values may be approximate, but they must be JSON-serializable and safe to call from Playwright. Keep legacy helpers such as `window.__scene` only as optional fallbacks; validation should prefer `window.__worldDebug`.

## Performance Patterns

- Merge static geometry by material.
- Instance repeated props, shelves, lights, stars, plants, labels, and decorative details.
- Reuse materials and textures.
- Keep dynamic lights limited and purposeful.
- Cap pixel ratio and provide low-power mode.
- Use texture atlases for grids of labels instead of many tiny meshes.
- Avoid per-frame DOM layout work.
- Avoid high-frequency expensive readbacks except in test probes.
- Lazy-load heavy media and use placeholders.

## Main Site Integration

For a subpath world attached to an existing site:

- Add one primary entry and one contextual entry, not a noisy set of unrelated CTAs.
- Add return links from landing, pause/help, and at least one in-world panel.
- Update metadata, canonical URL, sitemap, README or developer notes, and agent-readable summaries when the repo uses them.
- Keep language integrated. The world is an edition or mode of the site, not an unrelated toy, unless the user asks for a separate demo.
