# Websites to Worlds

**A portable agent skill that turns a website into an explorable 3D world.**

Point any capable coding agent — Claude Code, Codex, Cursor — at this repo, and it gains a disciplined, end-to-end workflow for turning a portfolio, research site, product page, or docs into a polished, explorable 3D experience: real navigation, modeling, a HUD, onboarding, interaction, browser QA, and an update path you can maintain.

It starts from the site's own content and code, so you do not need a separate MCP server, asset pack, or 3D starter kit. Built on Three.js or a similar web-3D stack.

> The point is not a flashy WebGL hero. The point is a **playable, content-complete edition of your site** that still ships where your site ships — and that you can verify, not just admire.

## See it live

**[The Ship — RV CHIP-01 →](https://www.hichipli.com/ship/)**

A first-person research vessel built from [hichipli.com](https://www.hichipli.com/). Its repeated modeling, interaction and layout refinements inform this skill. Explore projects, publications and the surrounding system. Use it as a craft reference, not a template every world should copy.

https://github.com/user-attachments/assets/e5bc33d0-d0fe-492b-a5f5-43dec775fa0c

## Quick start — no install

Open your website's repo in Claude Code, Codex, Cursor, or any coding agent, and **paste this**:

```text
Read https://github.com/hichipli/websites-to-worlds-skills (start with AGENTS.md),
then use the websites-to-worlds skill to turn THIS website into a mature,
content-complete, explorable 3D world under a subpath.

Inspect my content and release boundary first. Ask about material missing
constraints; honor decisions I already supplied. Compare three distinct
concepts, then build one meaningful interaction before expanding the world.
Preserve the normal site and keep required information directly readable.

(Optional — fill in if you already know what you want, otherwise leave blank
and let the agent ask:)
- Theme/metaphor:
- Subpath:
- Must include:
- Devices:
```

The agent reads the skill from GitHub and clarifies missing constraints. An already agreed brief does not trigger another approval round. Nothing to install manually.

**Already have the skill installed?** (see below) Just say:

```text
Use websites-to-worlds to turn this website into a mature, explorable 3D world.
```

## Install it permanently (optional)

For repeat use, install once so the skill is always available:

| Agent | How |
| --- | --- |
| **Claude Code** | `/plugin marketplace add hichipli/websites-to-worlds-skills` → `/plugin install websites-to-worlds@websites-to-worlds-skills` |
| **Codex** | `codex plugin marketplace add hichipli/websites-to-worlds-skills --ref main` → `codex plugin add websites-to-worlds@websites-to-worlds-skills` |
| **Codex local skill** | copy `skills/websites-to-worlds/` into `~/.codex/skills/` |
| **Cursor / other** | vendor the whole `skills/websites-to-worlds/` folder and point project rules at `SKILL.md` |

Full per-agent steps: **[install.md](install.md)**.

## What's in the box

```text
AGENTS.md                          ← agent-native entry point (read this first if you're an AI)
install.md                         ← per-agent install matrix
docs/assets/                       ← README screenshots and demo media
.codex-plugin/                     ← Codex plugin manifest
.agents/plugins/                   ← Codex repo marketplace entry
.claude-plugin/                    ← Claude Code plugin + marketplace manifests
skills/websites-to-worlds/
  SKILL.md                         ← the workflow + the contract the agent must satisfy
  agents/openai.yaml               ← Codex metadata
  references/
    world-design.md               ← concepts, topology, pacing and meaningful actions
    spatial-craft.md               ← coherent construction and common geometry failures
    sharing-and-evidence.md        ← actual-play moments, attribution and sharing
    architecture-patterns.md       ← file layout, modules, data flow, performance
    interaction-state-machine.md   ← pointer lock, overlays, pause, map, touch states
    example-content-site-to-world.md← the end-to-end Ship build, generalized
    quality-rubric.md              ← pass/fail checklist before handoff
    validation-playbook.md         ← browser QA, interaction matrix, screenshots, perf review
  assets/                          ← example plan and independent content inventory
  evals/evals.json                  ← fresh-context planning and repair tasks
  scripts/
    check-world.mjs                ← plan integrity and whole-branch scope checks
    probe-three-scene.mjs          ← Playwright smoke test (screenshots, console, debug stats)
```

## How it works

Bedrooms, studies, gardens, cities, street corners, cafes and cinemas are all valid settings. A single quiet room is a complete scope; no science-fiction style, first-person camera, multiple rooms or game mechanism is required. Physical examples are conditional construction lessons, not mandatory shapes.

Version 0.2 separates **a reliable quality floor** from **creative decisions**. Content coverage, input recovery, coherent geometry and release scope are constraints. Topology, primary action, reveal and the human details should emerge from the site's subject. A research station, a repair workshop and a living archive should not be the same corridor with new labels.

The workflow compares three directions, builds one playable slice, expands the content, then reviews the real experience. References load when relevant. Small executable checks catch missing content, disconnected plans and unrelated branch changes; they do not certify beauty or fun.

### Check a plan or release boundary

```sh
node skills/websites-to-worlds/scripts/check-world.mjs plan \
  skills/websites-to-worlds/assets/world-plan.example.json \
  --inventory skills/websites-to-worlds/assets/content-inventory.example.json

# Run from the website repository; replace paths with the agreed scope.
node /path/to/skill/scripts/check-world.mjs scope \
  --base origin/main --allow public/world
```

The source inventory must enumerate real canonical records independently of the new world. The scope check includes earlier commits since the merge base and local changes. Neither command mutates the website.

### Maintain and evaluate

Run `node tests/check-world.test.mjs` with Node.js 18+. The optional browser probe requires an existing Playwright installation; no game runtime or mandatory browser dependency is bundled. Use `evals/evals.json` for fresh-context comparisons, then validate actual built worlds separately. See [research and evaluation notes](docs/skill-design-research.md) for sources, observed results and limits.

## Scope

Intentionally bounded. The `websites-to-worlds` skill helps an agent build one web-native 3D route that keeps the source content complete, maintainable, and testable. It is **not** a game-engine template, a component library, or a one-click generator.

This repo is a **skills collection** — a marketplace that ships one skill today (`websites-to-worlds`) with room to grow. Future skills (asset pipelines, mobile/perf passes, alternate world genres) drop into `skills/<name>/` and register in the Codex and Claude marketplace manifests, without touching the existing skill.

## License

MIT — see [LICENSE](LICENSE).
