---
name: websites-to-worlds
description: Turn an existing website, personal site, portfolio, product page, documentation site, or content library into a polished, content-complete, explorable 3D web world built with Three.js or a similar web-3D stack. Use when the user asks for a playable spatial version of a site, a first-person portfolio, an interactive showroom, a virtual gallery, a web museum, a campus, a spaceship, a lab, or a command center — anything with modeling, local assets, a HUD, onboarding, interaction, browser QA, and a maintainable update path. Works greenfield or as a serious upgrade to an existing web-3D experience.
---

# Websites to Worlds

You are building a real, playable site-world — not a decorative WebGL wrapper over a hero section. This skill gives you the engineering path that takes a content website and turns a subroute of it into an explorable 3D experience that keeps every fact from the source, feels mature, and stays easy to update.

A live reference build exists: **[The Ship — RV CHIP-01](https://www.hichipli.com/ship/)**, a first-person research vessel built from [hichipli.com](https://www.hichipli.com/) using exactly this workflow. When you need to picture the target quality bar, that is it.

## The contract

When this skill is active, hold yourself to these outcomes. Everything below is in service of them.

- **The brief is confirmed before building.** You don't guess the theme, scope, or subpath from a one-line request. You propose a brief with options and a default, and get one confirmation first (see step 0).
- **Content stays complete.** Every meaningful fact on the source site is reachable in the world or its panels. You do not silently drop publications, projects, or links to make the 3D look cleaner.
- **The world is playable, not just pretty.** Movement, look, interaction, orientation, and exit all work before you polish a single material.
- **The build is self-orienting.** A first-time visitor knows what this is, how to move, what they can touch, and how to leave — without reading external docs.
- **It ships where the site ships.** It runs under the real deployment path, dependencies are vendored or package-managed to match, and assets return 200.
- **It is verified, not asserted.** You serve it, walk it in a real browser, capture screenshots across the journey, and read the console before you claim it works.

If you cannot meet one of these, say so explicitly in your handoff rather than papering over it.

## Workflow

### 0. Lock the brief before you build
Do not start modeling from a vague request. First skim the source site so your questions are informed, then **ask the user to confirm the brief** — offer concrete options with a recommended default for each so they can just pick:

- **World theme / metaphor** (archive, lab, museum, spaceship, command center, …) — propose 2–3 that fit *their* content.
- **Subpath** where it lives (e.g. `/world/`, `/explore/`, `/ship/`).
- **Scope** — full-site edition vs a focused slice (e.g. projects-only).
- **Must-have vs optional content**, and what may overflow into a panel/index.
- **Target devices** — desktop-only, or must it work on touch/mobile?
- **Asset approach** — procedural, real GLB assets, or generated art.

If the user already specified these, confirm your understanding in one line and proceed. If they said "just do it" or left it open, still surface your proposed brief and **get one confirmation** before building — a wrong theme or scope is expensive to undo. Don't block on trivia you can decide yourself; ask only what changes the build.

### 1. Ground the task in the real project
Inspect the repo first — routes, deployment shape (`_headers`, `_redirects`, host), design tokens, fonts, assets, and the actual content sources. Identify canonical data: publication arrays, JSON, CMS exports, existing globals. Do **not** duplicate data that already has a durable source — read or import it. Preserve the existing site contract unless the user explicitly asks to replace it.

### 2. Turn content into a spatial concept
Pick a metaphor that *explains* the content: archive, lab, museum, campus, command center, observatory, showroom, factory, spaceship, mission control. Map every major content area to a readable place, station, prop, or interaction. Write the player promise in one sentence: what can the user do in the first 30 seconds?

### 3. Design the architecture before you model
Put substantial 3D work on an isolated subpath (`/world/`, `/explore/`, `/gallery/`, `/ship/`, `/lab/`). Split data, world geometry, materials, player controls, interactions, audio, HUD, panels, and maps into separate modules. Decide early whether to vendor dependencies for static hosting or use the repo's package/build system. **Read `references/architecture-patterns.md` before laying out files.**

### 4. Build a playable greybox first
Establish world scale, spawn, navigation paths, room boundaries, collision, interactable placement, and sightlines. Make it *usable* — movement, camera, prompts, interaction, pause/menu, return path — before any polish. Use procedural geometry, curated GLB assets, or generated assets as the task demands, but include every required asset locally or in the repo's pipeline. No external-CDN dependencies when the site is statically hosted.

### 5. Add mature world feel
Layer rough materials, baked or procedural texture detail, readable signage, props, ambient motion, and sound. Add lived-in detail and small optional interactions that fit the concept. If windows or exterior views exist, model enough exterior context that rooms don't float in a void. Avoid the failure set: random glowing blocks, particle fog that reads as broken, floating props, z-fighting planes, signs jammed in doorways.

### 6. Present long content through game-grade UI
3D objects are teasers and affordances; long text, publication lists, project detail, forms, tables, and links live in DOM overlay panels. Provide a HUD, a crosshair or touch affordance, a progressive tutorial, a map/directory, fast travel when useful, pause/settings, a WebGL fallback, and clear exit/back links. If it must work on phones, make touch interaction explicit.

### 7. Keep future updates easy
Route dynamic content through data manifests or existing source files. Derive counts, latest items, categories, labels, and station lists at boot — never hardcode "12 projects" in three places. Make overflow behavior explicit: extra projects still appear in an index, extra publications still appear in panels, new categories get generated stations or tabs when feasible.

### 8. Validate like a game build
Run the repo-appropriate syntax/type/build checks. Serve locally, verify asset URLs, collect console and page errors, and capture screenshots across the **full** player journey — desktop and mobile, key panels, every major zone, performance-sensitive scenes, and failure states. **Read `references/validation-playbook.md`** and use `scripts/probe-three-scene.mjs` when a headless browser probe is available.

## Implementation rules

- Treat the 3D route as part of the product, not a detached demo. Entry copy, return paths, metadata, sitemap, agent discovery (`llms.txt`/`AGENTS.md`), and docs must reflect that relationship.
- Prioritize orientation: the user should always know where they are, what is interactable, and how to leave.
- Keep static work cheap — merge repeated static geometry by material, instance repeated props, reuse textures/materials, cap pixel ratio, avoid per-frame DOM writes.
- Keep dynamic work intentional — animate only what improves presence, navigation, feedback, or delight.
- Keep text readable — long text belongs in DOM UI, not tiny 3D meshes.
- Prefer deterministic procedural assets for static sites and small worlds; prefer real optimized GLB/textures when the task needs recognizable objects or characters.
- Account for every external asset: path, license/source, loading behavior, fallback, deployment compatibility.
- Comment only where it explains non-obvious world-building, performance, or update behavior.

## Reference routing

Load these progressively — don't read all four up front.

- `references/architecture-patterns.md` — before choosing structure, module boundaries, data flow, interaction patterns, or performance tactics.
- `references/example-content-site-to-world.md` — when building a portfolio, profile, research site, or content-rich personal site, or when you want a concrete end-to-end example (the live Ship build).
- `references/quality-rubric.md` — before final polish, and again before handoff.
- `references/validation-playbook.md` — before running browser QA, screenshots, or performance checks.

## Portability

This skill is agent-agnostic. The folder `skills/websites-to-worlds/` is the installable unit.

- **Codex** — copy the folder under the skills directory (commonly `~/.codex/skills/websites-to-worlds`); see `agents/openai.yaml`.
- **Claude Code** — install via the repo's plugin manifest (`/plugin marketplace add hichipli/websites-to-worlds-skills`), or point project rules at this `SKILL.md`.
- **Cursor / other agents** — use `SKILL.md` as the primary instruction file and expose `references/` and `scripts/` as project rules or attached context.

Once installed, invoke with: `Use websites-to-worlds to turn this site into a mature, explorable 3D world.` See the repo's `install.md` for exact per-agent steps.
