# Spatial craft: construct one believable place

## Derive constraints from the intended place

Start with the setting's actual spatial relationships: one room, open garden, street frontage, connected buildings or another form. Use a footprint, section, terrain or adjacency graph only where it helps. Keep visual geometry, any navigation/collision and optional maps consistent. A bounding box is a broad-phase convenience, not the mandatory shape of a place.

Where inside and outside are both visible, reconcile them. Deliberate wall cavities, double glazing, greenhouses, verandas and layered facades are legitimate. Remove accidental duplicate surfaces or unused gaps that contradict the design; do not enforce a single pane, shell or boundary. An outdoor scene need not acquire walls, a ceiling or a modeled hidden interior.

Choose scale and camera behavior for the experience. Where relevant, check circulation, seating, reach, reading distance and camera clipping from actual visitor viewpoints. A miniature, stylized diorama or seated study can use a different scale and navigation model from a walkable city.

## Build materials and light as systems

Specify a few material families by albedo, roughness, metalness, micro-normal/bump and believable seams. Separate large construction joints from microtexture. If realistic metal is intended, painted lines alone do not create it; a flat, hand-painted aesthetic is equally valid when deliberate. Give reflective surfaces something coherent to reflect; verify exposure on ordinary screens and dark materials, not just the brightest window.

Match visible light fixtures to illumination. For artificial fixtures, distinguish emission from illumination; use daylight or unlit rendering when appropriate, and don't add a point light per LED. Keep bloom from swallowing text. Decide which few objects need live shadows and how often those shadows must update.

## Conditional failure patterns → repair → evidence

These examples describe unintended defects, not required objects or construction styles. Apply only the rows relevant to the chosen design. Intentional gaps, transparency and stylization are not defects merely because they differ from the reference ship.

| Symptom | Repair the cause | Required check |
| --- | --- | --- |
| Walls flicker like mosaics | Remove duplicate/coplanar ownership, including neighbors of unequal height | Shared-surface overlap assertion plus a moving-camera view |
| An unintended gap or duplicate layer spoils a view | Reconcile the designed surfaces; retain purposeful glazing, cavities or accessible intermediate spaces | Inspect the intended view and verify each visible layer has a reason |
| Sliding door clips or blocks a perpendicular corridor | Choose a motion and construction that fit the intended opening; verify the complete swept volume, whether sliding, hinged, folding or another design | Closed, halfway, fully open and adjacent doorway clearance |
| Screen vanishes from behind | Match the intended object: a physical screen may need a back; a projection may intentionally be one-sided or translucent | Inspect both sides and asynchronous-loaded content |
| Attachments float off their intended structure | Compute anchors from the same supporting surface instead of old constants | Relevant side/below views and endpoint checks |
| Roof joints have slits | Join surfaces where closure is intended; preserve intentional openings | High/low glancing views, no coplanar duplicates |
| A new bed hides a sign | Reserve sightline and reach volumes alongside floor occupancy | Entrance and use-position screenshots |
| Coffee machine or basin flashes | Separate intersecting shell surfaces and account for countertop thickness | Close moving view; geometry bounds where meaningful |
| Pet feels disturbing | Improve silhouette, proportion, expression and material at visitor distance; use an authored asset when needed | Face/profile view; do not confuse polygon count with recognizability |
| New presentation loses old information | Keep the new presentation and original content reachable as complementary modes | Content inventory and open/close/return test |
| Key release leaves movement running | Fix held-input ownership and reset on blur/pause/capture loss | Long hold + release, late repeat, alias keys and focus recovery |

Do not patch z-fighting with arbitrary polygon offset everywhere. Do not hide a broken interaction behind a camera angle. Do not add casing geometry that consumes the corridor it was meant to protect.

## Detail hierarchy and batching

Read the primary silhouette at thumbnail size, the secondary structure at room scale and small details at interaction distance. Add geometry where it changes silhouette or a close action; use maps/atlases elsewhere. Keep static construction batched by material or instanced; keep moving doors, faces, hands, liquids and interaction targets identifiable. Assert that batching preserves transformed bounds and animated parts still move.

Supporting details depend on context and scope: a garden might show watering tools, a cafe a service counter, a cinema seating and circulation, or a bedroom simply personal belongings. Do not require plumbing, backstage, service rooms or any other facility in every build. A small coherent place is enough.
