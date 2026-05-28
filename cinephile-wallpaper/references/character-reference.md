# Character Reference

Use this reference whenever a wallpaper includes identifiable film characters. Do not treat character identity as a decorative option.

## Goal

Add film recognition through protagonist or character anchors without turning the wallpaper into a literal still, live-action photorealistic portrait, or copied publicity image. Be willing to use faces when the film needs them: a painted frontal face, three-quarter view, close symbolic portrait, or character constellation is often more recognizable than another distant back-view figure.

Important distinction: **non-photorealistic does not mean non-likeness**. The skill should avoid photo-like live-action rendering and direct still copying, but it must preserve accurate role likeness when a real actor/performer appears as a film character. A clay, ink, cubist, gouache, minimalist, or pop-art interpretation should still be recognizably that character from that film, not an invented generic person.

Core rule: if a specific film character is depicted, the agent must establish a **character identity lock** before generation. If face likeness matters, the lock is not complete until real reference images are attached to the image-generation call or explicitly unavailable. When references are attached, the prompt must actively request accurate stylized likeness rather than avoiding the actor's face.

Second core rule: if a film-specific prop, weapon, costume, vehicle, artifact, building, instrument, or craft object is depicted, the agent must establish a **prop identity lock** before generation. Do not replace culturally or historically specific objects with generic lookalikes.

## Research Steps

1. Identify the protagonist(s), antagonist, and important character system: male lead, female lead, key supporting roles, rival, mentor, child, monster, or symbolic non-human character.
2. For each visible character, create a character identity lock:
   - character name;
   - actor/performer name when applicable;
   - film title and year;
   - role relationship;
   - age range and bearing in the film;
   - required face/costume/hair/prop traits;
   - forbidden generic substitutions.
3. Automatically acquire visual references when the host has browser, web, or download capability:
   - search the web for in-character stills;
   - open likely source pages;
   - download or capture usable stills when allowed by the environment;
   - extract frames from official trailers or clips when stills are unavailable and the environment supports it;
   - save temporary/local reference files for the generation run.
4. Search for visual references from stable sources when available:
   - official stills;
   - trailers or official clips;
   - production stills;
   - trusted film databases;
   - reputable articles or image search results.
   Use multiple references when possible so the prompt captures the role, costume, posture, and face cues instead of overfitting to one still.
5. Select reference images:
   - one clear face/upper-body reference;
   - one costume/posture reference;
   - one scene/context reference when useful;
   - avoid near-duplicate images unless the character has very few available references.
6. If the host image model supports image references, attach at least one and preferably two to four reference images per key character. Prefer film stills over actor red-carpet photos.
7. Verify attachment before generation: the manifest or run state must contain local reference paths and `reference_images_attached: true`.
8. Ask the user to upload stills only when automatic acquisition fails, references are low quality, access is blocked, or the host cannot pass downloaded images to the image model.
9. If image references cannot be passed, do not promise exact likeness. Proceed only with a text-only identity lock, warn that likeness will be weaker, and either ask for stills or use non-face strategies only when the user accepts that risk.
10. Extract visual traits:
   - face shape and defining features when needed;
   - age range and bearing;
   - silhouette;
   - costume;
   - hairstyle;
   - posture;
   - prop;
   - color association;
   - scale relationship;
   - environment;
   - repeated gesture.
   Do not invent character designs that do not exist in the film.
11. Record source URLs, local reference paths, acquisition method, whether actual image references were attached, and any likeness risk in the manifest.

## Prop Identity Lock

Use this whenever an object carries recognition value. The goal is to avoid failures such as rendering wing chun butterfly swords / 八斩刀 as generic crossed daggers.

Before prompting, identify:

- object name in the film and, when useful, the original-language name;
- real-world category and function;
- shape, scale, material, construction, grip/handle, blade/head/body, color, wear, and carrying/use posture;
- how it appears in the film: who uses it, scene context, symbolic meaning;
- at least one visual reference or trusted descriptive source when browser/web tools are available;
- forbidden substitutions.

Use this structure:

```json
{
  "prop": "",
  "film": "",
  "year": "",
  "reference_mode": "auto_acquired_refs | user_uploaded_refs | image_references | text_only",
  "reference_images": [],
  "local_reference_paths": [],
  "source_urls": [],
  "required_traits": {
    "category_function": "",
    "shape": [],
    "material": [],
    "scale": [],
    "usage_pose": [],
    "film_context": []
  },
  "forbidden_substitutions": [
    "generic dagger",
    "fantasy weapon",
    "modern tactical knife",
    "unrelated prop from another film"
  ]
}
```

If no reliable prop reference is found, either ask the user for a still/reference or avoid showing the prop prominently. A prominent but wrong object is worse than a subtler non-object metaphor.

## Character Identity Lock

Use this structure before writing the image prompt:

```json
{
  "character": "",
  "actor_or_performer": "",
  "film": "",
  "year": "",
  "reference_mode": "auto_acquired_refs | user_uploaded_refs | image_references | text_only",
  "reference_images": [],
  "local_reference_paths": [],
  "reference_images_attached": false,
  "acquisition_method": "browser_search | web_search | trailer_frame | user_upload | text_only",
  "required_traits": {
    "face": [],
    "hair": [],
    "costume": [],
    "posture": [],
    "props": [],
    "expression": [],
    "scene_context": []
  },
  "forbidden_substitutions": [
    "generic handsome/beautiful face",
    "modern fashion version",
    "unrelated actor likeness",
    "new invented character"
  ]
}
```

The image prompt must mention the character by role and film identity, not only by actor name. Example: `Wong Chia Chi from Lust, Caution (2007), not a generic 1940s woman`.

## Reference Image Priority

When possible, use this priority order:

1. user-provided film stills or screenshots;
2. automatically acquired official stills or official trailer frames;
3. automatically acquired production stills;
4. automatically acquired trusted film database images;
5. automatically acquired reputable article images;
6. actor images only if no in-character references exist, and only to support broad facial structure.

Avoid using official poster art as the primary character reference because it can cause poster copying.

## Auto Acquisition Rules

If browser or web tools are available, the agent should try automatic acquisition before asking the user to upload.

Suggested search queries:

```text
[film title] [year] [character name] still
[film title] [year] [actor name] [character name]
[film title] official still [character name]
[film title] trailer [character name] screenshot
[original title] [character name] film still
```

Use the fewest images needed for identity. Prefer clear, in-character, non-poster images. Store only local working references needed for this run or for a user-approved project library. Do not bypass paywalls, login gates, bot protections, or watermark/copyright restrictions.

If automatic acquisition finds no reliable references, say so briefly and ask the user for one to four character stills. This is fallback, not the primary path.

## Reference Gate

Before generating a face-forward, three-quarter, or close portrait:

1. Confirm at least one clear face/upper-body reference exists.
2. Confirm the image model call can actually receive that reference.
3. Set `reference_images_attached: true`.
4. If any of the above is false, do not claim the character is visually anchored.

Fallback choices when the gate fails:

- ask the user for stills;
- switch to costume/prop/gesture/silhouette recognition;
- avoid claiming exact facial likeness without references;
- generate a no-face symbolic poster.

Text prompts alone are not sufficient for exact actor/character likeness.

Before generating a prominent film-specific object:

1. Confirm the object's real name and visual category.
2. Confirm at least one reliable visual or descriptive reference exists.
3. Confirm the prompt forbids common wrong substitutions.
4. If any of the above is false, do not make the object a central recognizable element.

## Character Anchor Strategies

Choose one or combine two when useful:

- **Silhouette**: recognizable outline without facial likeness.
- **Back view**: character posture and costume in a symbolic space.
- **Partial figure**: hand, shoulder, profile, shoe, coat, hair, weapon, bag, umbrella, etc.
- **Costume + prop**: recognizable outfit and object without exact face.
- **Tiny figure in symbolic landscape**: preserves poster abstraction while adding film identity.
- **Reflected/distorted face**: use as stylized painted/graphic character identity while preserving role likeness cues, not as live-action photorealism.
- **Close portrait abstraction**: face or upper body as graphic planes or painterly forms, strictly based on the actual film character, not a new invented person.
- **Frontal painted portrait**: the character's face dominates the poster as a fine-art interpretation, using role-accurate face, hair, costume, and expression cues.
- **Profile or three-quarter view**: stronger character presence without full frontal realism.
- **Medium figure**: waist-up or full-body figure with readable costume, posture, and facial direction.
- **Character pair**: two key characters arranged by desire, conflict, intimacy, or distance.
- **Character constellation**: two to four important characters arranged by emotional relationship.
- **Split composition**: opposing characters or mirrored identities.
- **Object-body fusion**: protagonist traits merge with a symbolic object or environment.
- **Environmental portrait**: character dominates composition through posture, light, and space.

## Composition Variety

Do not default to a tiny back-view figure every time. Treat back view and tiny figure as special choices, not defaults. Vary scale and framing:

- close-up symbolic portrait based on the actual character;
- frontal painted face as the main visual subject;
- three-quarter face with role-specific costume and expression;
- medium shot with strong silhouette;
- profile with graphic negative space;
- character pair in tension;
- ensemble constellation;
- body cropped by object or architecture;
- reflected, shadowed, or fragmented face;
- hands/props as protagonist surrogate.

Choose the strategy that makes the film recognizable while preserving poster design.

## Prompt Pattern

```text
Character identity lock: depict [character name] from [film title, year],
played by [actor/performer if applicable], using attached reference images
when available. Preserve these identity traits: [face cues], [hair],
[costume], [posture], [props], [expression]. Render as [fine-art medium],
not photorealistic and not copied from a still, but keep accurate stylized
likeness to the actor/performer as this role. The result must be recognizable
as this film character, not a generic person. Integrate the character into the
poster metaphor: [metaphor].
```

For important props:

```text
Prop identity lock: depict [prop/object name] from [film title, year], not a
generic substitute. Preserve [shape], [scale], [material], [use posture], and
[film context] from references. Forbidden substitutions: [wrong objects].
Render it through the selected art language while keeping the object readable.
```

For multi-character films:

```text
Build a character constellation from the film's key figures: [character roles].
For each figure, preserve the identity lock: face/hair/costume/posture/prop
traits from reference images or extracted stills. Arrange them as a designed
poster system around the central metaphor: [metaphor]. Avoid the default tiny
back-view figure and avoid generic replacement faces.
```

## Avoid

- copying a still or publicity photo;
- photorealistic live-action actor-face rendering or copied-still portraiture;
- avoiding actor/performer likeness when depicting a real film character;
- invented character appearances unrelated to the film;
- generic handsome/beautiful faces replacing the real character identity;
- celebrity glamour portrait detached from the film role;
- replacing visual metaphor with a literal scene reenactment;
- using character only as decorative fan art.
- relying on actor-name alone without in-film character traits;
- using modern actor publicity photos as the main reference when in-character stills exist.
- replacing specific props, weapons, costumes, or craft objects with generic versions.

## Recognition Check

Before finalizing the prompt, ask:

- Would someone familiar with the film recognize the character before reading the title?
- Did the agent first attempt automatic reference acquisition when browser/web tools were available?
- Did the generation use reference images when the host supports them?
- Were those reference images actually attached to the image-generation call?
- If not, did the agent ask for user-provided stills or record `text_only` risk?
- Does the character anchor serve the central metaphor?
- Are any film-specific props or costumes accurate enough to be recognized?
- Is the result still a poster, not a screenshot?
- Is the framing varied enough, or is it falling back to the same distant back-view figure pattern?

## Failure Recovery

If the generated character does not resemble the film character:

1. Do not accept the image as final.
2. Switch from text-only to image-reference mode if available.
3. Reduce the number of characters and focus on the most important one or two.
4. Move from full-body to face/upper-body if likeness matters.
5. Strengthen required traits and forbidden substitutions.
6. If the prop is wrong, acquire a clearer prop/still reference or remove it from the central composition.
7. If the model cannot preserve identity after reference-image retries, say so briefly and offer a non-face strategy: hands, costume, prop, silhouette, object-body fusion, or typography-led poster. Do not frame this as "avoiding" the actor's real face; frame it as fallback after likeness failure.
