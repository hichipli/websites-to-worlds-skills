# Websites to Worlds Skills

Portable agent skill for turning an existing website, portfolio, product page, documentation site, or content library into a polished, explorable 3D web world.

The skill itself is in [`websites-to-worlds-skills/`](websites-to-worlds-skills/).

## Use With Codex

Install by copying or symlinking the skill folder into Codex skills:

```bash
cp -R websites-to-worlds-skills "${CODEX_HOME:-$HOME/.codex}/skills/"
```

Then prompt:

```text
Use $websites-to-worlds-skills to turn this website into a mature, explorable 3D world.
```

## Use With Claude Code, Cursor, Or Other Agents

These tools may not have Codex's native skill registry. Use the folder as portable agent context:

- Add `websites-to-worlds-skills/SKILL.md` to the agent's project rules or persistent instructions.
- Attach or reference the `websites-to-worlds-skills/references/` files when the task needs architecture, quality checks, or validation details.
- Run `websites-to-worlds-skills/scripts/probe-three-scene.mjs` for browser smoke testing when Playwright is available.

## Scope

This skill is intentionally bounded: it helps agents build a web-native 3D route or experience that keeps the original site's content complete, maintainable, and testable. It is not a full game engine template.
