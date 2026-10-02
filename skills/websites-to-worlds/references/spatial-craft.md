# Spatial craft: construct one believable place

## Design from the same boundary

Start with a footprint/envelope, section heights and adjacency graph. Derive floor, ceiling, collision, room identification, map, shell and preview model from the same layout. A rectangular bounding box may be a broad-phase test, but it is not the final boundary of a curved room. Test at corners and transitions.

Work from outside silhouette to inside circulation and back. Fit inhabited spaces into the envelope; assign leftover volume to a plausible service function or conceal it behind opaque structure. Do not wrap every interior in a second windowed shell. Preserve one transparent boundary along a window sightline. Use different outward/inward finishes where construction demands it, without exposing indoor wall tiles as missing exterior skin.

Set a human scale. Lay out aisle clearance, chair use, interaction reach, sign reading distance and camera near-plane behavior before decorative props. View every main room from its entrance, an ordinary walking viewpoint, a seated/inspection viewpoint if supported, and outside when visible.

## Build materials and light as systems

Specify a few material families by albedo, roughness, metalness, micro-normal/bump and believable seams. Separate large construction joints from microtexture. Painted lines alone do not create metal. Give reflective surfaces something coherent to reflect; verify exposure on ordinary screens and dark materials, not just the brightest window.

Match visible light fixtures to illumination. Use emissive strips for appearance and a limited number of useful lights for illumination; don't add a point light per LED. Keep bloom from swallowing text. Decide which few objects need live shadows and how often those shadows must update.

## Failure → repair → evidence

| Symptom | Repair the cause | Required check |
| --- | --- | --- |
| Walls flicker like mosaics | Remove duplicate/coplanar ownership, including neighbors of unequal height | Shared-surface overlap assertion plus a moving-camera view |
| Windows show an empty second room | Align shell/room boundaries; remove redundant glazing | Trace window rays and inspect inside/outside views |
| Sliding door clips or blocks a perpendicular corridor | Fit a thin leaf and its full swept volume inside actual structure; use an appropriate alternative motion if no pocket fits | Closed, halfway, fully open and adjacent doorway clearance |
| Screen vanishes from behind | Model an opaque casing/back and consistent front/read direction | Inspect both sides and asynchronous-loaded content |
| Supports float off a tapered hull | Compute anchors from the same hull surface instead of old constants | Exterior side/below views and endpoint checks |
| Roof joints have slits | Use continuous joining surfaces or proper overlaps with thickness | High/low glancing views, no coplanar duplicates |
| A new bed hides a sign | Reserve sightline and reach volumes alongside floor occupancy | Entrance and use-position screenshots |
| Coffee machine or basin flashes | Separate intersecting shell surfaces and account for countertop thickness | Close moving view; geometry bounds where meaningful |
| Pet feels disturbing | Improve silhouette, proportion, expression and material at visitor distance; use an authored asset when needed | Face/profile view; do not confuse polygon count with recognizability |
| Telescope loses old information | Keep the view and original report reachable as complementary modes | Content inventory and open/close/return test |
| Key release leaves movement running | Fix held-input ownership and reset on blur/pause/capture loss | Long hold + release, late repeat, alias keys and focus recovery |

Do not patch z-fighting with arbitrary polygon offset everywhere. Do not hide a broken interaction behind a camera angle. Do not add casing geometry that consumes the corridor it was meant to protect.

## Detail hierarchy and batching

Read the primary silhouette at thumbnail size, the secondary structure at room scale and small details at interaction distance. Add geometry where it changes silhouette or a close action; use maps/atlases elsewhere. Keep static construction batched by material or instanced; keep moving doors, faces, hands, liquids and interaction targets identifiable. Assert that batching preserves transformed bounds and animated parts still move.

A convincing vessel may need lavatory, galley and maintenance space; a garden needs water and access; a theatre needs backstage and circulation. Transfer the reasoning, not a compulsory ship-room checklist.
