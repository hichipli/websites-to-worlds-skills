---
name: websites-to-worlds
description: Build or improve an explorable 3D edition of an existing website, portfolio, research archive, product catalogue, documentation site or content library. Use for playable site-worlds, bedrooms, studies, gardens, cities, street corners, cafes, cinemas, virtual museums or other spatial editions, including requests for better level design, immersion, exploration, modeling, onboarding, performance and shareable moments. Preserve the original site and its content. Not for a decorative WebGL hero, an unrelated game, or a main-site redesign.
---

# Websites to Worlds

Build a place with a reason to explore, not a sitemap with walls. Hold the quality floor steady; vary the world, route through it and actions it makes possible. The [Ship](https://www.hichipli.com/ship/) is evidence of construction and interaction problems solved, not a layout or aesthetic to reproduce.

## Adapt to the place, scale and intent

A bedroom, study, garden, street corner, cafe, cinema, city or imagined setting is equally valid. Let the user's subject and aesthetic determine the form: everyday, historical, natural, stylized, fantastical or futuristic. No ship, enclosure, metal palette, screen, door, floor plan, first-person camera or game mechanic is mandatory.

One small room can be a complete world. Choose seated inspection, orbit, fixed views, walking or another accessible navigation model to fit it. A quiet reading or observation experience need not become a quest. For an already chosen place, refine composition and use rather than proposing unrelated themes. Scale comparison, pacing and documentation to the work; a single scene does not need multiple zones or a dramatic reveal.

## Invariants

- Preserve the original website, canonical facts, links and update path. A new presentation must not silently remove information available in the old one.
- Make required information reachable without winning a game, finding a secret, signing in or completing a tour. Keep direct reading and return-to-site routes.
- Teach one action at a time. Make enter, orient, interact, pause and leave work for a first-time non-gamer.
- Keep visible geometry, navigation and any collision or map consistent with the intended space. Multiple layers, open terrain and separate structures are valid; repair accidental overlaps and unusable gaps rather than prescribing a particular shape.
- Ground claims in actual builds, screenshots, input tests and measurements. Passing a plan validator does not prove beauty, fun, accessibility or runtime correctness.
- Keep the release scoped. Check the entire branch against the intended target, not just today's commits. Do not publish an experimental homepage because a world branch happens to descend from it.

## Route the work

| Request | Start here | Required outcome |
| --- | --- | --- |
| New world / substantial redesign | 1–7 below | Distinct direction, playable slice, complete world, evidence |
| Make an existing world more interesting | 2, then 3 and 6 | Change a meaningful action or discovery sequence; preserve content |
| Fix modeling / movement / frame rate | 4 and 6 | Reproduce, repair shared cause, check neighboring cases |
| Prepare a demo / launch | 5–7 | Actual-play proof, truthful share destination, scoped release |
| Plan only | 1–3 | Source inventory, candidate comparison, validated plan; no claim of a tested build |

## 1. Establish the brief and release boundary

Inspect routes, deployment path, canonical content, assets, existing design and git state. Ask only for missing decisions that materially change scope: metaphor, route, audience/devices, content exclusions. Honor an already approved brief or delegated creative choice; state assumptions and proceed. Do not require a ritual confirmation or replace an explicit aesthetic.

Record the intended base branch and allowed change paths. Start from the intended base, preserving dirty work and unrelated branches. Follow the user's branch naming convention. Record permitted entry-link/metadata changes separately from the world route.

Export a small **independent content inventory** from the site's canonical data: `{"items":[{"id":"paper:123","source":"app/data/papers.ts","required":true}]}`. Enumerate individual records for collections; never derive this inventory from the new world, or missing items disappear from both sides. Exclude sensitive/unpublished material. Clarify genuine scope exclusions.

## 2. Choose a direction that changes the experience

Read [world-design.md](references/world-design.md). When the direction is open, consider up to three compact candidates differing in **topology, primary verb and reveal**, not merely palette or room labels. Tie each to this site's subject and audience. Recommend one and say why the others lose. Keep this comparison short; narrow repairs do not need new concepts.

Describe the visitor promise, distinctive composition or landmark, appropriate activity, contextual detail and one deliberately omitted idea. Reading, observing, listening or choosing a viewpoint can be the activity; a mechanism is optional. If replacing the site's nouns leaves the same world, revise the concept. Avoid prescribing a spaceship, radial hub, neon console gallery or collectible quest to every brief.

## 3. Author a playable route, then a vertical slice

Create a compact `world-plan.json` using [the example](assets/world-plan.example.json) as a **format**, not a theme. Record zones/connections, content stations, a paced journey, action → visible change → reset, one shareable moment and a target-device budget. Keep existing project planning conventions; translate to this format only for the check.

```sh
node <skill>/scripts/check-world.mjs plan world-plan.json --inventory content-inventory.json
```

Repair missing content, unreachable zones and broken references before modeling. A zone is a logical place, not necessarily a room. A single-zone plan uses an empty connections array; observation/reading plans may use only panel stations. Beats describe optional visitor moments, not compulsory timed levels. This checks the authored graph, not physical clearance.

Build one representative slice: arrival → readable landmark → meaningful interaction → visible response → return/exit. Test it in-browser before multiplying rooms or props. Compare the same slice in a quiet and busy view. Check whether navigation and presentation serve the intended experience before adding decoration. For a quiet room, a satisfying reading or viewing position can be the whole slice. Keep the complete reading index available from the start.

## 4. Build a coherent inhabited world

Read [architecture-patterns.md](references/architecture-patterns.md) for modules/data/performance and [interaction-state-machine.md](references/interaction-state-machine.md) before controls/overlays. Use the existing stack; match the actual static/subpath deployment constraints. Prefer local or package-managed dependencies where reproducible/offline delivery matters.

Read [spatial-craft.md](references/spatial-craft.md) before detailed geometry. Where applicable, reconcile interior and exterior, shared surfaces, moving-object clearances and viewing cones. Choose materials and lighting appropriate to the aesthetic. Physical displays may need backs; intentionally holographic or translucent displays do not inherit that rule. Include supporting spaces only when useful to this setting and scope, not as a mandatory facilities checklist.

Use procedural geometry for fitted architecture, optimized authored assets for subjects that must be recognizable, and generated images only when useful and licensed. Do not attempt a detailed animal by endlessly adding primitive spheres; judge its face, silhouette and scale. Record asset provenance and fallbacks. Preserve a no-WebGL reading path.

Give long text to accessible DOM panels. Add direct navigation and a guided route for non-gamers; keep optional exploration rewarding. Maintain source-derived counts and collection overflow, not hardcoded display slots.

## 5. Make the real experience easy to share

Read [sharing-and-evidence.md](references/sharing-and-evidence.md) when discovery, media or launch matters. When sharing is requested, identify an authentic interaction, view or transition that communicates without audio, a recoverable direct link and an obvious path to the owner's work. Frame actual browser output for wide and vertical crops when requested. An attractive poster is not evidence that the world works. Never promise virality or invent trend statistics.

## 6. Verify both the floor and the creative result

Use [quality-rubric.md](references/quality-rubric.md) and [validation-playbook.md](references/validation-playbook.md). Run code checks, inspect real screenshots, play the route and try abnormal input transitions. The bundled browser probe is optional; use the environment's approved browser tools if it cannot run. Do not install an automation stack just to claim compliance.

Measure before optimizing: same device, viewport, route, quality setting, warmup and sampling duration. Record frame-time distribution, total draw calls including shadow/post passes, pixel ratio and asset transfer. Separate measured facts from proposed budgets. Batch only static parts; preserve animated roots, interaction targets and display backs. Cap renderer **and composer** resolution together. Retest the busiest relevant views after optimizing.

For design review, have a newcomer explain where to go and what changed after an action. If no independent visitor is available, label the walkthrough as agent review. Collect evidence for novelty and pacing, not a manufactured numeric "fun score". Fix identified blockers, confirm affected paths, then stop; don't keep ornamenting a passing build.

## 7. Check the complete release diff and hand off

```sh
node <skill>/scripts/check-world.mjs scope --base origin/main --allow public/world --allow scripts/check-world.mjs
```

Replace base and allow paths with the recorded agreement. Refresh the remote base when access is available. The scope check includes committed changes since merge-base, staged/unstaged changes and untracked files; it never changes git state. Inspect any unexpected path or ancestor commit. Do not widen the allowlist to make a contaminated branch pass. Preserve unrelated work on its branch; isolate the world changes, then recheck.

Report the route, implemented signature interaction, content coverage, measured results, actual QA evidence and remaining limitations. Distinguish designed / implemented / browser-verified / independently playtested. Commit/push/PR/deploy only within the user's authorization. A valid plan or clean screenshot alone is not release readiness.

## References on demand

- [world-design.md](references/world-design.md): divergence, topology, encounter rhythm, embodied information and creative critique.
- [spatial-craft.md](references/spatial-craft.md): interior/exterior construction and failure-to-test patterns from the Ship.
- [sharing-and-evidence.md](references/sharing-and-evidence.md): actual-play capture, entry/return, metadata and launch evidence.
- [architecture-patterns.md](references/architecture-patterns.md): modules, data, deployment and performance.
- [interaction-state-machine.md](references/interaction-state-machine.md): input ownership, overlays, recovery, touch.
- [example-content-site-to-world.md](references/example-content-site-to-world.md): reference case; adapt the process, never clone the theme.
- [quality-rubric.md](references/quality-rubric.md): hard blockers and human review.
- [validation-playbook.md](references/validation-playbook.md): browser coverage, diagnostics and handoff.
