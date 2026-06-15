# Websites to Worlds

**A portable agent skill that turns a website into an explorable 3D world.**

Point any capable coding agent — Claude Code, Codex, Cursor — at this repo, and it gains a disciplined, end-to-end workflow for turning a portfolio, research site, product page, or docs into a polished, first-person 3D experience: real navigation, modeling, a HUD, onboarding, interaction, browser QA, and an update path you can maintain. Built on Three.js or a similar web-3D stack.

> The point is not a flashy WebGL hero. The point is a **playable, content-complete edition of your site** that still ships where your site ships — and that you can verify, not just admire.

## See it live

**[The Ship — RV CHIP-01 →](https://www.hichipli.com/ship/)**

A first-person research vessel built from [hichipli.com](https://www.hichipli.com/) with this exact skill. Walk the gallery of projects, browse publications from a console, look out the windows at the system outside. Every fact on the flat site is in there — just spatial. That's the bar this skill aims for.

## From site to world

This reference started as a conventional personal academic website:

![Screenshot of the original hichipli.com academic homepage before the 3D world transformation](docs/assets/hichipli-source-site.jpg)

Then the same content became a first-person research vessel. This is a rough short capture for now, included just to make the output shape easier to understand: **[watch the Ship demo MP4](docs/assets/ship-demo-short.mp4)**.

The workflow is self-contained by default: no external MCP server, proprietary asset pack, or prebuilt 3D template is required. The agent can build from the target site's existing content, local files, procedural geometry/materials, and ordinary browser QA; custom GLB, generated art, or extra tools are optional upgrades when the brief calls for them.

## Quick start — no install

Open your website's repo in Claude Code, Codex, Cursor, or any coding agent, and **paste this**:

```text
Read https://github.com/hichipli/websites-to-worlds-skills (start with AGENTS.md),
then use the websites-to-worlds skill to turn THIS website into a mature,
content-complete, explorable 3D world under a subpath.

Before building anything, look at my site and ASK me a few short questions to
lock the brief — world theme/metaphor, which subpath, scope, must-have vs
optional content, and target devices. Offer concrete options with a recommended
default so I can just pick. Only start building after I confirm.

(Optional — fill in if you already know what you want, otherwise leave blank
and let the agent ask:)
- Theme/metaphor:
- Subpath:
- Must include:
- Devices:
```

The agent reads the skill straight from GitHub, asks a few clarifying questions, and only builds once you confirm. Nothing to download, and no external MCP or asset library is required.

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
docs/assets/                       ← README screenshots and temporary demo media
.codex-plugin/                     ← Codex plugin manifest
.agents/plugins/                   ← Codex repo marketplace entry
.claude-plugin/                    ← Claude Code plugin + marketplace manifests
skills/websites-to-worlds/
  SKILL.md                         ← the workflow + the contract the agent must satisfy
  agents/openai.yaml               ← Codex metadata
  references/
    architecture-patterns.md       ← file layout, modules, data flow, performance
    example-content-site-to-world.md← the end-to-end Ship build, generalized
    quality-rubric.md              ← pass/fail checklist before handoff
    validation-playbook.md         ← browser QA, screenshots, perf review
  scripts/
    probe-three-scene.mjs          ← Playwright smoke test (screenshots, console, scene stats)
```

## How it works

The skill enforces a contract — the **brief is confirmed before building**, content stays **complete**, the world is **playable**, it's **self-orienting**, it **ships where the site ships**, and it's **verified, not asserted**. It opens by locking the brief with you (theme, subpath, scope, devices), then walks the agent through the build: ground in the real repo, choose a spatial metaphor, design architecture, build a playable greybox, add mature world feel, present long content through game-grade UI, keep updates easy, and validate like a game build.

Reference files load progressively, so the agent reads architecture detail when it's laying out files and the validation playbook when it's running QA — not all at once.

## Scope

Intentionally bounded. The `websites-to-worlds` skill helps an agent build one web-native 3D route that keeps the source content complete, maintainable, and testable. It is **not** a game-engine template, a component library, or a one-click generator.

This repo is a **skills collection** — a marketplace that ships one skill today (`websites-to-worlds`) with room to grow. Future skills (asset pipelines, mobile/perf passes, alternate world genres) drop into `skills/<name>/` and register in the Codex and Claude marketplace manifests, without touching the existing skill.

## License

MIT — see [LICENSE](LICENSE).
