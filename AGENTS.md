# AGENTS.md — entry point for AI agents

You are an AI coding agent and someone pointed you at this repository. This file orients you in ~30 seconds.

## What this repo is

A portable **skills collection**. Today it ships exactly one skill — `websites-to-worlds` — under `skills/websites-to-worlds/`; more may be added under `skills/<name>/` later. If the user names a skill, match it against the directories in `skills/`.

The `websites-to-worlds` skill encodes the full engineering path for turning an existing website (portfolio, research site, product page, docs, content library) into a polished, content-complete, **explorable 3D web world** — first-person navigation, modeling, a HUD, onboarding, interaction, browser QA, and a maintainable update path. Built around Three.js or a similar web-3D stack.

This repo contains **instructions and small validation tools, not a game runtime**. There is no app to start here. You apply the skill inside the user's project.

Distribution metadata is intentionally split by platform:

- `.codex-plugin/plugin.json` and `.agents/plugins/marketplace.json` package the collection for Codex.
- `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` package the collection for Claude Code.
- `skills/websites-to-worlds/` remains the portable installable skill folder for any agent.

## What to read, in order

1. **`skills/websites-to-worlds/SKILL.md`** — the workflow and the contract you must satisfy. Read this fully before writing any code.
2. **`skills/websites-to-worlds/references/`** — load progressively, only when you reach that phase:
   - `architecture-patterns.md` — before choosing file layout, modules, data flow, performance tactics.
   - `interaction-state-machine.md` — before implementing first-person controls, pointer lock, panels, map, pause, resume capture, or touch behavior.
   - `example-content-site-to-world.md` — the concrete end-to-end build (the live Ship below).
   - `quality-rubric.md` — before final polish and at handoff.
   - `validation-playbook.md` — before browser QA and screenshots.
3. **`skills/websites-to-worlds/scripts/probe-three-scene.mjs`** — a Playwright headless probe for smoke-testing the 3D route (screenshots, console errors, scene stats).

## How to use it

1. Ground the brief in the real site. Ask only for material missing constraints. An already approved brief or explicitly delegated design choice does not need another confirmation.
2. Inspect the **user's** repo — routes, deployment shape, design tokens, assets, and canonical content sources.
3. Follow the workflow in `SKILL.md`. Do not skip the greybox or the validation steps.
4. Treat pointer lock plus overlays as a state machine, not scattered booleans; use the interaction reference before implementing `E`, `Esc`, close, map, pause, resume capture, or touch controls.
5. Hold yourself to the contract outcomes in `SKILL.md` (brief grounded, content complete, playable, self-orienting, ships where the site ships, verified not asserted).
6. In your handoff, report the route/URL, files changed, systems implemented, validation evidence (screenshots, console), browser warnings, interaction regression results, git state, and any known limitations.

## Live reference build

**The Ship — RV CHIP-01:** <https://www.hichipli.com/ship/>
A first-person research vessel built from <https://www.hichipli.com/> whose iteration lessons inform this skill. Use it as a craft reference, not a mandatory theme or layout.

## Non-goals

This is not a game-engine template, not a component library, and not a one-click generator. It is the disciplined path a capable agent follows to deliver a real, maintainable site-world.

## Maintaining the skill

Keep the core workflow lean; route creative design to `world-design.md`, geometry repairs to `spatial-craft.md`, and distribution to `sharing-and-evidence.md`. Run `node tests/check-world.test.mjs` and syntax-check the probe after script changes. `evals/evals.json` contains fresh-context tasks for comparing skill revisions; plans are not proof of rendered-world quality. Keep both plugin manifest versions and agent metadata aligned.
