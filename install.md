# Install

The skill lives in [`skills/websites-to-worlds/`](skills/websites-to-worlds/). The fastest path requires **no install at all**; permanent install is below for repeat use.

## Fastest: no install (any agent)

Open your website's repo in any coding agent and paste:

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

The agent reads `AGENTS.md` first, then `skills/websites-to-worlds/SKILL.md`, then loads `references/` files as it needs them. It asks a few clarifying questions and only builds once you confirm. Nothing to download.

Everything below installs the skill permanently so you can invoke it with just:

> Use **websites-to-worlds** to turn this website into a mature, content-complete, explorable 3D world.

---

## Claude Code

**Plugin (recommended):**

```text
/plugin marketplace add hichipli/websites-to-worlds-skills
/plugin install websites-to-worlds@websites-to-worlds-skills
```

Claude Code auto-discovers the skill under `skills/websites-to-worlds/`. After install, Claude can invoke it on its own, or you can type `/websites-to-worlds`.

**Without the plugin system:** clone the repo and add this line to your project's `CLAUDE.md` or `.claude/` rules:

```text
When building a 3D/spatial version of a site, follow skills/websites-to-worlds/SKILL.md from <path-to-clone>.
```

---

## Codex

Copy the skill folder into your Codex skills directory:

```bash
git clone https://github.com/hichipli/websites-to-worlds-skills
cp -R websites-to-worlds-skills/skills/websites-to-worlds \
  "${CODEX_HOME:-$HOME/.codex}/skills/websites-to-worlds"
```

Codex reads `agents/openai.yaml` for the display name and default prompt.

---

## Cursor / Windsurf / other agents

These tools don't have a skill registry, so use the skill as portable context:

1. Clone or vendor the repo (or just the `skills/websites-to-worlds/` folder) into the project.
2. Add `skills/websites-to-worlds/SKILL.md` to the agent's project rules / persistent instructions (e.g. `.cursor/rules/`, a `# Rules` doc, or pinned context).
3. When the task needs detail, attach the matching file from `skills/websites-to-worlds/references/`.
4. If a headless browser is available, run `skills/websites-to-worlds/scripts/probe-three-scene.mjs` for browser smoke tests.
