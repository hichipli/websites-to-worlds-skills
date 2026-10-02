# Skill design research and evaluation

Research checked 2026-10-02. The request targets September 2026 media appeal; this is not a historical popularity ranking. Public repositories illustrate useful approaches, not proof that their prompts guarantee quality or virality. No source text or implementation was copied.

## What informed this revision

| Primary source | Applied here |
| --- | --- |
| [Agent Skills: best practices](https://agentskills.io/skill-creation/best-practices) | Keep the entry point short, route specialized detail on demand, turn recurring failures into actionable instructions, use code for deterministic checks. |
| [Agent Skills: evaluating skills](https://agentskills.io/skill-creation/evaluating-skills) | Fresh-context realistic tasks, paired revision comparison and explicit limits on what a plan can establish. |
| [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | A committed, subject-specific direction and memorable focal moment instead of generic stylistic defaults. |
| [Impeccable](https://github.com/pbakaus/impeccable) | Route tasks by intent; use focused critique/repair rather than redoing everything. Keep context and validation close to the relevant workflow. |
| [Remotion skills](https://github.com/remotion-dev/skills) | Separate craft guidance and practical media-output tasks. The world skill adds truthful real-play capture guidance, not a video engine. |
| [Open Graph protocol](https://ogp.me/) and [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) | Stable share destinations, server-readable metadata, deliberate user-initiated sharing and fallback behavior. |

Markdown remains the portable instruction format. The missing capability was not another packaging layer: it was a specific creative process, smaller executable contracts and evidence from realistic tasks. No orchestration framework, mandatory asset service, bundled game engine or recorder was added.

## The design change

The quality floor fixes content access, input recovery, coherent construction and release isolation. Creative choices vary topology, visitor action, reveal, silhouette and environmental storytelling. Three candidate directions must differ in experience, not simply colors. A single representative interaction gets built and reviewed before rooms multiply.

Ship iteration failures informed the spatial repair reference: double glazing, unused shells, detached supports, coplanar flicker, screen backs, door motion, obstructed signage, lost instrument content and stuck movement. These are transferable failure patterns; the pet, ship and layout are not required templates.

The small Node checker validates an independent content inventory against a planned graph and inspects the entire branch/worktree scope against allowed paths. It cannot prove that the implementation matches the plan. A browser probe remains optional and now reports failed requests and fails strict smoke checks when the canvas or requested start action is missing.

## Evaluation method and observed results

The baseline was the skill at repository commit `79b466c`. Fresh agents received the same approved fictional tidal-station brief, their respective skill path and an output path; neither saw the other output. Both were asked only to plan, with no live service or website build. A third fresh agent received a different, bicycle-workshop brief. Reusable prompts live in `skills/websites-to-worlds/evals/evals.json`.

| Observation | Original skill | Revised skill |
| --- | --- | --- |
| Complete accessible content | Already proposed all content with direct reading | Also enumerated 22 brief-derived records and ran the structural checker; clearly distinguished placeholders from canonical IDs |
| Creative direction | One compact loop with a salinity comparator | Compared a transect, instrument courtyard and tide tower, explaining the chosen topology and rejected tradeoffs |
| Interaction and journey | Already offered a meaningful comparison and a three-minute route | Connected sampling action to a later interpretation reveal, with explicit state changes/reset and quieter return |
| Release isolation | Already proposed isolation and final diff review | Explicitly checked ancestor-commit contamination and exact allowed paths from the intended base |
| Evidence honesty | Described future QA, not completed QA | Separated structural validation, target budgets, browser verification and independent playtesting |

The different-genre workshop trial compared a shared repair stand, parts-sorting bench and test courtyard. It chose a tap-driven tyre-pumping interaction with a visible deformation and a 15-second capture sequence, rather than reusing the station's data-comparison action. It explicitly labeled inflation as illustrative, preserved ungated guide/booking access, and distinguished provisional price/access/contact placeholders from the canonical export still needed. Structural validation passed. This is one additional planning sample, not a built-world diversity benchmark.

The baseline was not poor: it already offered usable content mapping and meaningful interaction. The observed gain is more explicit divergence, executable structural checks and better stated evidence boundaries. One paired sample does not establish repeatability, increased enjoyment or improved rendered visuals. The examples use a coastal context, so that case alone cannot establish cross-genre creativity.

## Runnable verification

- `node tests/check-world.test.mjs`: valid plan, lost required content, gated access, disconnected zone, duplicate IDs, malformed input, earlier unrelated ancestor commit, untracked/staged changes, rename out of scope, and smoke diagnostic failure cases.
- `node skills/websites-to-worlds/scripts/check-world.mjs plan skills/websites-to-worlds/assets/world-plan.example.json --inventory skills/websites-to-worlds/assets/content-inventory.example.json`: example contract passes.
- Syntax checks for both scripts; skill frontmatter validation with the skill-creator validator.

No new world was built or playtested during this skill revision. Probe diagnostic decisions were exercised without launching a browser; the changed browser harness still needs an integration run in a supported Playwright environment. Before claiming a reliable increase in visual quality or visitor engagement, build representative slices in at least two genres, inspect desktop/touch behavior and real captures, and observe newcomers without coaching. The focused repair prompt is supplied for future regression evaluation and is not claimed as an executed agent trial.
