# Example: Content Site to Explorable World

Use this reference when building a content-rich personal site, portfolio, research profile, product site, or documentation site as a 3D world. Do not copy the theme blindly; copy the engineering path.

## Source Request

The user wanted a mature first-person 3D experience under a subpath of an existing website. It needed all site information, a clear entry from the main site, themed spatial zones, a project gallery, a publication/content archive, environmental views, onboarding, keyboard guidance, panels, menus, minimap, fast travel, and high-quality game feel without disrupting the main site.

## Final Shape

The implementation pattern lives under a dedicated route such as `/world/`, `/explore/`, or `/gallery/`:

- `<route>/index.html`: isolated 3D route shell, metadata, loading screen, landing/title screen, canvas, HUD, touch controls, panels, map overlay, pause menu, fallback.
- `<route>/css/world.css`: full-screen game UI, HUD, panels, map, pause, responsive/touch styles.
- `<route>/vendor/`: vendored Three.js and addons when static hosting needs self-contained dependencies.
- `<route>/js/data.js`: content manifest for identity, bio, news, awards, service, projects, profiles, contact, and world metadata.
- `<route>/js/main.js`: boot sequence, renderer, postprocessing, state machine, persistence, settings, station list, systems wiring, render loop.
- `<route>/js/world/materials.js`: procedural textures, signage, screen textures, posters, shared materials.
- `<route>/js/world/environment.js`: sky, exterior environment, ambient motion, and far-scene elements.
- `<route>/js/world/scene.js`: spatial layout, procedural interior/exterior, doors, props, colliders, interactables, zones.
- `<route>/js/player/controls.js`: pointer-lock FPS controls, keyboard, touch stick, drag look, collision, optional sitting/inspect modes.
- `<route>/js/systems/interactions.js`: raycast targeting, prompt ownership, emissive highlight, interact dispatch.
- `<route>/js/systems/audio.js`: WebAudio ambience, UI tones, footsteps, doors, optional fun sounds.
- `<route>/js/ui/panels.js`: DOM content panels for profile, projects, publications/content, awards, service, contact, help, directory.
- `<route>/js/ui/hud.js`: prompts, crosshair, toasts, progressive tutorial, tour progress.
- `<route>/js/ui/map.js`: minimap and full map from the same room layout.

## Agent Path

1. Inspect the existing site before writing code.
   - Read top-level files, main HTML sections, CSS, publication data, deployment headers, redirects, sitemap, `llms.txt`, README, and assets.
   - Identify site sections: about, bio, news, publications, awards, service, projects, footer/contact.

2. Preserve canonical data.
   - Existing publication or article data stayed in its original source file; the world reads the exported data or global manifest.
   - Other content moved into a world-specific `data.js`.
   - Counts, latest publication, archive categories, project slots, and screen text are derived at boot.

3. Build the route as a complete experience.
   - The 3D route has its own title screen, boot sequence, fallback, controls, pause, settings, help, and return links.
   - The main site gained integrated entries: menu item, about-side note, footer boarding pass, sitemap, `llms.txt`, README.

4. Model the world procedurally.
   - Use a top-down meter layout for rooms, doors, zones, colliders, and stations.
   - Generate wall/floor/ceiling textures with CanvasTexture.
   - Model props, signage, consoles, galleries, archives, living quarters, exterior hull, windows, nacelles, and space outside.
   - Merge static geometry by material and instance repeated details for performance.

5. Add game systems.
   - First-person movement, collision, pointer lock, mobile touch controls.
   - Raycast targeting with prompts and highlights.
   - Sliding doors, zone discovery, tour progress, map, directory, fast travel.
   - DOM panels for long content.
   - Procedural audio unlocked by user gesture.

6. Verify and iterate.
   - Run module syntax checks.
   - Start a local static server and curl key URLs.
   - Use Playwright/headless Chromium to visit the game, click the start button, travel through zones, open panels, take screenshots, and collect console errors.
   - Fix discovered issues: missing vendored dependency, selector ambiguity in tests, over-bright bloom, dark rooms, hitbox gaps, z-fighting, confusing glowing blocks, screen orientation, misplaced props, interior/exterior believability, and performance.

## Lessons To Generalize

- A 3D content site needs both spatial navigation and a conventional information UI. Put teaser content in the world; put full reading content in panels.
- A playable world must be self-orienting: tutorial, prompts, map, directory, fast travel, and pause settings are core product features.
- If the site grows, the world should still work. Dynamic slots and panels are better than one-off hardcoded card counts.
- Visual polish is often layout correctness: props must be attached to walls, signs must face entrances, windows must show real exterior context, and repeated decorative lights must not read as broken textures.
- Performance is part of taste: static batching, instancing, low-power mode, capped pixel ratio, and limited per-frame UI work keep the world credible.
