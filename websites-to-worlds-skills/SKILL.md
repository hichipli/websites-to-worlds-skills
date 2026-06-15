---
name: websites-to-worlds-skills
description: Turn existing websites, personal sites, portfolios, product pages, documentation sites, or content libraries into polished, content-complete, explorable 3D web worlds with Three.js or similar web 3D stacks. Use when the user asks for a playable spatial version of a site, first-person portfolio, interactive showroom, virtual gallery, web museum, campus, spaceship, lab, command center, or other game-like route with modeling, local assets, HUD, onboarding, interaction, browser QA, and maintainable update paths.
---

# Websites to Worlds Skills

## Overview

Create real playable site-worlds, not decorative WebGL wrappers. Preserve the source website's content contract, build a coherent spatial metaphor, implement enough game systems for the experience to feel mature, and verify it with browser screenshots and interaction probes.

Use this skill for both greenfield 3D scene builds and serious upgrades to existing web 3D experiences.

## Workflow

1. Ground the task in the real project.
   - Inspect the repo, routes, deployment shape, design tokens, assets, content sources, and current entry points.
   - Identify canonical data sources. Do not duplicate data that already has a durable source.
   - Preserve the existing site or product contract unless the user explicitly asks for replacement.

2. Turn content into a spatial concept.
   - Choose a metaphor that explains the content: archive, lab, museum, campus, command center, city, observatory, showroom, factory, spaceship, mission control.
   - Map every major content area to a readable place, station, prop, or interaction.
   - Define the player promise in one line: what the user can do in the first 30 seconds.

3. Design the architecture before modeling.
   - Prefer an isolated route or subpath for substantial 3D experiences, such as `/world/`, `/explore/`, `/gallery/`, or `/lab/`.
   - Split data, world geometry, materials, player controls, interactions, audio, HUD, panels, and maps into separate modules.
   - Decide whether to vendor dependencies for static hosting or use the repo's package/build system.
   - Read `references/architecture-patterns.md` before implementing the structure.

4. Build a playable greybox first.
   - Establish world scale, spawn, navigation paths, room boundaries, collision, interactable placement, and sightlines.
   - Make the experience usable before polishing: movement, camera, prompts, interaction, pause/menu, and return path.
   - Use procedural geometry, curated 3D assets, or generated assets according to the task, but include all required assets locally or in the repo's asset pipeline.

5. Add mature world feel.
   - Use rough, layered materials, baked or procedural texture detail, readable signage, props, ambient motion, and sound.
   - Include lived-in details and small optional interactions when they fit the concept.
   - If windows or exterior views exist, model enough exterior context to avoid looking like rooms floating in a void.
   - Avoid random glowing blocks, indoor dust that reads as broken particles, floating props, z-fighting planes, and signs placed in doorways.

6. Present long content through game-grade UI.
   - Use 3D objects as teasers and affordances; use DOM overlays/panels for long text, publication lists, project details, forms, tables, or links.
   - Provide a HUD, crosshair or touch affordance, progressive tutorial, map/directory, fast travel when useful, pause/settings, WebGL fallback, and clear exit/back links.
   - Make mobile/touch interaction explicit if the experience must work on phones.

7. Keep future updates easy.
   - Route dynamic content through data manifests or existing source files.
   - Derive counts, latest items, categories, labels, and station lists at boot.
   - Make overflow behavior explicit: extra projects still appear in an index, extra publications still appear in panels, new categories get generated stations or tabs when feasible.

8. Validate like a game build.
   - Run syntax/type/build checks appropriate to the repo.
   - Serve locally, verify asset URLs, collect console/page errors, and capture screenshots across the full player journey.
   - Inspect desktop and mobile viewports, key panels, every major zone, performance-sensitive scenes, and failure states.
   - Read `references/validation-playbook.md` and use `scripts/probe-three-scene.mjs` when a Playwright-style probe is useful.

## Implementation Rules

- Treat the 3D route as part of the product, not a detached demo. Entry copy, return paths, metadata, sitemap/agent discovery, and docs must reflect that relationship.
- Prioritize player orientation: the user should always know where they are, what can be interacted with, and how to leave.
- Keep static work cheap: merge repeated static geometry, instance repeated props, reuse textures/materials, cap pixel ratio, and avoid per-frame DOM writes.
- Keep dynamic work intentional: animate only what improves presence, navigation, feedback, or delight.
- Keep text readable: render long text in DOM UI, not tiny unreadable 3D meshes.
- Prefer deterministic procedural assets for static sites and small worlds; prefer real optimized GLB/texture assets when the task needs recognizable objects or characters.
- Add comments only where they explain non-obvious world-building, performance, or update behavior.

## Reference Routing

- Read `references/example-content-site-to-world.md` when building a portfolio, profile, research site, or content-rich personal site, or when you need a concrete end-to-end example.
- Read `references/architecture-patterns.md` when selecting structure, module boundaries, data flow, interaction patterns, or performance tactics.
- Read `references/quality-rubric.md` before final polish and again before handoff.
- Read `references/validation-playbook.md` before running browser QA, screenshots, or performance checks.

## Portable Use

- For Codex, install this folder as `websites-to-worlds-skills` under the configured skills directory, commonly `~/.codex/skills/websites-to-worlds-skills`.
- For other coding agents, use `SKILL.md` as the primary instruction file and expose the `references/` and `scripts/` paths as project rules, attached context, or repository guidance.
- Keep the folder name `websites-to-worlds-skills` so prompts can say: `Use $websites-to-worlds-skills to turn this site into a mature explorable 3D world.`
