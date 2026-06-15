# AGENTS.md — entry point for AI agents

You are an AI coding agent and someone pointed you at this repository. This file orients you in ~30 seconds.

## What this repo is

A portable **skills collection**. Today it ships exactly one skill — `websites-to-worlds` — under `skills/websites-to-worlds/`; more may be added under `skills/<name>/` later. If the user names a skill, match it against the directories in `skills/`.

The `websites-to-worlds` skill encodes the full engineering path for turning an existing website (portfolio, research site, product page, docs, content library) into a polished, content-complete, **explorable 3D web world** — first-person navigation, modeling, a HUD, onboarding, interaction, browser QA, and a maintainable update path. Built around Three.js or a similar web-3D stack.

This repo is **instructions, not a runtime**. There is no app to start here. You apply the skill inside the user's project.

## What to read, in order

1. **`skills/websites-to-worlds/SKILL.md`** — the workflow and the contract you must satisfy. Read this fully before writing any code.
2. **`skills/websites-to-worlds/references/`** — load progressively, only when you reach that phase:
   - `architecture-patterns.md` — before choosing file layout, modules, data flow, performance tactics.
   - `example-content-site-to-world.md` — the concrete end-to-end build (the live Ship below).
   - `quality-rubric.md` — before final polish and at handoff.
   - `validation-playbook.md` — before browser QA and screenshots.
3. **`skills/websites-to-worlds/scripts/probe-three-scene.mjs`** — a Playwright headless probe for smoke-testing the 3D route (screenshots, console errors, scene stats).

## How to use it

1. **Lock the brief first (step 0).** Skim the user's site, then propose a brief — theme/metaphor, subpath, scope, must-have content, target devices — with options and a recommended default, and get one confirmation before building. Don't guess your way into a wrong theme or scope.
2. Inspect the **user's** repo — routes, deployment shape, design tokens, assets, and canonical content sources.
3. Follow the workflow in `SKILL.md`. Do not skip the greybox or the validation steps.
4. Hold yourself to the contract outcomes in `SKILL.md` (brief confirmed, content complete, playable, self-orienting, ships where the site ships, verified not asserted).
5. In your handoff, report the route/URL, files changed, systems implemented, validation evidence (screenshots, console), and any known limitations.

## Live reference build

**The Ship — RV CHIP-01:** <https://www.hichipli.com/ship/>
A first-person research vessel built from <https://www.hichipli.com/> using exactly this skill. Use it as the quality bar.

## Non-goals

This is not a game-engine template, not a component library, and not a one-click generator. It is the disciplined path a capable agent follows to deliver a real, maintainable site-world.
