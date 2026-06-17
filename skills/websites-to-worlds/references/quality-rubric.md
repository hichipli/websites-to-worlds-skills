# Quality Rubric

Use this before final handoff. A good Websites to Worlds delivery should pass each category.

## Content Completeness

- All required source information is represented somewhere in the world or its panels.
- The most important content is reachable within one minute.
- Long content is readable, searchable/filterable where appropriate, and link-safe.
- Counts and latest items are derived from data, not manually duplicated in several places.
- Future additions have an overflow path.

## Player Experience

- The first screen tells the user what the world is and how to start.
- The first 30 seconds teach movement, looking, and interaction.
- The user can always find controls, map/directory, pause/settings, and exit/back.
- Interactables are visible, reachable, and named by prompt.
- Every major zone has a reason to exist and a clear affordance.
- Mobile/touch behavior is either supported or explicitly handled with a fallback.

## Visual Maturity

- A dedicated visual polish pass happened after the playable greybox, not before.
- Materials have roughness, texture, seams, wear, or construction logic.
- Materials use maps, procedural noise, CanvasTexture detail, or simple atlases where flat colors make the world feel unfinished.
- Lighting supports navigation and mood without washing out screens.
- Screens and signs face the expected player approach.
- Signs are readable at the intended approach distance and are not occluded by props, door frames, particles, or bloom.
- Windows reveal a believable exterior or environment.
- Each major zone has its own model identity, not just the same room with relabeled panels.
- Props are attached to floors, walls, desks, rails, or ceilings.
- Repeated environmental detail is instanced, batched, or procedurally generated instead of copied as many unrelated meshes.
- No random decorative fragments read as broken textures or missing assets.
- No obvious z-fighting, floating signs, wall clipping, doorway obstruction, or text overlap.

## Game Feel

- Movement feels stable and collision does not snag in ordinary paths.
- Interactions have immediate feedback: highlight, prompt, sound, toast, animation, or panel.
- Ambient motion sells the place without overwhelming content.
- Optional easter eggs reward exploration without blocking core information.
- Audio is useful, optional, and unlocked only after user gesture.

## Engineering

- Route works under the intended deployment path.
- Static subpath behavior is verified for root vs project-page deployment, route-relative assets, and trailing slashes.
- Dependencies are vendored or package-managed consistently.
- Static assets return 200 in local server checks.
- Modules pass syntax/type/build checks.
- Browser console is free of actionable errors.
- Expected browser automation noise is separated from real app errors in the validation notes.
- Core scene is nonblank in desktop and mobile viewports.
- `window.__worldDebug` or an equivalent debug hook reports scene, UI, and content stats when practical.
- Performance is acceptable with low-power controls if needed.
- The code documents where future content updates should happen.

## Red Flags

- A 3D hero exists, but most requested information is missing.
- The world has only decoration and no real interaction.
- The agent handwaves assets instead of providing or generating them.
- The experience depends on an external CDN when the deployment constraints require static self-hosting.
- The world breaks when data grows.
- The final answer claims quality without screenshots, browser checks, or console verification.
