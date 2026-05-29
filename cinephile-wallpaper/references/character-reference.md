# Character Reference

Use this reference whenever a wallpaper includes identifiable film characters. Do not treat character identity as a decorative option.

## Goal

Add film recognition through protagonist or character anchors without turning the wallpaper into a literal still, live-action photorealistic portrait, or copied publicity image. Be willing to use faces when the film needs them: a painted frontal face, three-quarter view, close symbolic portrait, or character constellation is often more recognizable than another distant back-view figure.

Important distinction: **non-photorealistic does not mean text-only approximation**. The skill should avoid photo-like live-action rendering and direct still copying, but when a real actor/performer appears as a film character, identity must be preserved by using actual in-character image references. A clay, ink, cubist, gouache, minimalist, or pop-art poster can stylize the poster language, but the character identity source must be the supplied still/crop images, not an invented generic person.

Core rule: if a specific film character is depicted, the agent must establish a **character identity lock** before generation. For real actor/performer roles, the lock is not complete until actual character image files are acquired, prepared, and attached to the image-generation call. Text prompts, actor names, and visual-trait summaries are metadata only; they are not an identity-preservation mechanism.

Second core rule: if a film-specific prop, weapon, costume, vehicle, artifact, building, instrument, or craft object is depicted, the agent must establish a **prop identity lock** before generation. Do not replace culturally or historically specific objects with generic lookalikes.

## User-Uploaded Character Gate

Before image generation, ask whether the user wants recognizable film characters in the poster.

If yes, ask the user to upload one or more character photos/stills in the conversation. This is the preferred first-pass workflow for precise identity anchoring because the user can choose the exact face, costume, scene, and role version they want.

Use uploaded images with this priority:

1. user-uploaded in-character stills or screenshots;
2. user-uploaded clear character publicity/still photos from the film;
3. user-uploaded labeled group stills;
4. automatically acquired in-character stills/trailer frames;
5. automatically acquired actor photos only as weak support when no in-character reference exists.

Rules:

- uploaded character references are authoritative for this run;
- do not replace a user-uploaded reference with a web image unless the user asks;
- if several faces are in one image, ask the user to label which character(s) to use unless it is obvious;
- if no uploaded/acquired reference image can be attached to the image-generation call, do not generate a recognizable face and do not claim identity restoration;
- use only for the current run unless the user explicitly asks to save a reusable reference library.

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
3. If the user uploaded character images, inspect and use them first. Save/record the uploaded file paths or attachment identifiers for the run.
4. Automatically acquire visual references when the host has browser, web, or download capability and uploaded references are absent or insufficient:
   - search the web for in-character stills;
   - open likely source pages;
   - download or capture usable stills when allowed by the environment;
   - extract frames from official trailers or clips when stills are unavailable and the environment supports it;
   - save temporary/local reference files for the generation run.
5. Prepare a reference-image package:
   - save original source stills/screenshots;
   - crop at least one clear face/upper-body image per key character;
   - crop or save one costume/posture image when useful;
   - keep one wider context image only if it helps the poster concept;
   - avoid using only a written trait list.
6. Search for visual references from stable sources when available:
   - official stills;
   - trailers or official clips;
   - production stills;
   - trusted film databases;
   - reputable articles or image search results.
   Use multiple references when possible so the prompt captures the role, costume, posture, and face cues instead of overfitting to one still.
7. Select reference images:
   - one clear face/upper-body reference;
   - one costume/posture reference;
   - one scene/context reference when useful;
   - avoid near-duplicate images unless the character has very few available references.
8. If the host image model supports image references, attach at least one cropped character reference and preferably two to four references per key character. Prefer user-uploaded/in-character stills over actor red-carpet photos.
9. Verify attachment before generation: the manifest or run state must contain local reference paths or uploaded attachment identifiers and `reference_images_attached: true`.
10. If uploaded/acquired image references cannot be passed, do not promise character-face restoration. Proceed only if the user accepts a non-face/costume/prop/silhouette strategy, or stop with a clear request for an image-capable model/workflow.
11. Extract visual traits:
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
12. Record source URLs, uploaded file paths or attachment IDs, original still paths, cropped character reference paths, acquisition method, whether actual image references were attached, and any restoration risk in the manifest.

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
  "source_stills": [],
  "character_crops": [],
  "costume_posture_refs": [],
  "local_reference_paths": [],
  "uploaded_reference_paths": [],
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
    "unrelated actor identity",
    "new invented character"
  ]
}
```

The image prompt must mention the character by role and film identity, not only by actor name. Example: `Wong Chia Chi from Lust, Caution (2007), not a generic 1940s woman`.

## Reference-Image Identity Workflow

Use this workflow for any poster that visibly depicts a real actor/performer character:

1. Acquire one to four in-character stills/screenshots. Prefer official stills, trailer frames, production stills, or reputable film databases/articles. Do not use posters as the primary identity source.
2. Save image files locally for the current run. Do not rely on image URLs alone.
3. Prepare character crops:
   - face/upper-body crop for identity;
   - costume/posture crop for role silhouette;
   - optional wider scene crop for environment and palette.
4. Confirm the current image model/tool can accept image references.
5. Attach the cropped character reference image files to the generation call.
6. In the prompt, instruct the model to preserve the character identity from attached references while transforming the overall poster language through the selected art style.
7. After generation, inspect whether the character still reads as the referenced role. If not, retry with fewer characters, tighter crop references, and stronger identity-preservation instructions.

If the user has uploaded reference stills, start at step 2 and treat those files as the primary identity source.

If any of steps 1-5 fails, the skill cannot honestly claim character-face restoration. Ask the user to upload stills or use a non-face recognition strategy.

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

If the user already uploaded character references, skip automatic acquisition unless more references are needed. If no upload exists and browser or web tools are available, the agent may try automatic acquisition before asking for more user files.

Suggested search queries:

```text
[film title] [year] [character name] still
[film title] [year] [actor name] [character name]
[film title] official still [character name]
[film title] trailer [character name] screenshot
[original title] [character name] film still
```

Use the fewest images needed for identity. Prefer clear, in-character, non-poster images. Store only local working references needed for this run or for a user-approved project library. Do not bypass paywalls, login gates, bot protections, or watermark/copyright restrictions.

If no reliable references are available, say so briefly and ask the user for one to four character stills.

## Reference Gate

Before generating a face-forward, three-quarter, or close portrait:

1. Confirm at least one clear face/upper-body image file exists locally or is attached by the user.
2. Confirm the image model call can actually receive that reference image file.
3. Attach the reference image file to the generation call.
4. Set `reference_images_attached: true`.
5. If any of the above is false, do not claim the character is visually restored and do not create a recognizable face.

Fallback choices when the gate fails:

- ask the user for stills;
- switch to costume/prop/gesture/silhouette recognition;
- avoid claiming face restoration without attached references;
- generate a no-face symbolic poster.

Text prompts alone are not sufficient for actor/character face restoration.

Before generating a prominent film-specific object:

1. Confirm the object's real name and visual category.
2. Confirm at least one reliable visual or descriptive reference exists.
3. Confirm the prompt forbids common wrong substitutions.
4. If any of the above is false, do not make the object a central recognizable element.

## Character Anchor Strategies

Choose one or combine two when useful:

- **Silhouette**: recognizable outline without face restoration.
- **Back view**: character posture and costume in a symbolic space. Use rarely; do not select by default.
- **Partial figure**: hand, shoulder, profile, shoe, coat, hair, weapon, bag, umbrella, etc.
- **Costume + prop**: recognizable outfit and object without exact face.
- **Tiny figure in symbolic landscape**: preserves poster abstraction while adding film identity.
- **Reflected/distorted face**: use as painted/graphic character identity while preserving identity cues from attached references, not as live-action photorealism.
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

## Face Direction Bias

When a visible character is included and reference-image restoration is possible, bias strongly toward front face, profile, or three-quarter view:

- primary choices: frontal face, three-quarter face, profile, close/medium portrait, character pair facing camera or each other;
- allowed but uncommon: back view, rear three-quarter view, distant tiny figure;
- use back view only when it is a deliberate film-specific motif or when face restoration is not available and the user accepts a non-face strategy.

Prompt rule: explicitly say `avoid default back-view figure; prefer front, profile, or three-quarter character view unless a back view is a deliberate film-specific motif`.

## Prompt Pattern

```text
Character identity lock: depict [character name] from [film title, year],
played by [actor/performer if applicable]. Use the attached cropped
in-character reference images as the identity source for the face, head,
hair, costume, posture, and expression. Preserve the character identity from
those image references while rendering the overall poster in [fine-art medium].
Do not copy the still, do not make a photorealistic live-action frame, and do
not replace the role with a generic person. Integrate the referenced character
into the poster metaphor: [metaphor].
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
- claiming face restoration without attached character still/crop references;
- using text-only actor names or trait lists as the identity mechanism when image references are possible;
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
- Were the cropped character reference images actually attached to the image-generation call?
- If not, did the agent ask for user-provided stills or record `text_only` risk?
- Does the character anchor serve the central metaphor?
- Are any film-specific props or costumes accurate enough to be recognized?
- Is the result still a poster, not a screenshot?
- Is the framing varied enough, or is it falling back to the same distant back-view figure pattern?

## Failure Recovery

If the generated character does not resemble the film character:

1. Do not accept the image as final.
2. Switch from text-only to image-reference mode if available.
3. Acquire or ask for clearer in-character stills.
4. Crop tighter face/upper-body references.
5. Reduce the number of characters and focus on the most important one or two.
6. Move from full-body to face/upper-body if identity restoration matters.
7. Strengthen the attached-reference instruction and forbidden substitutions.
8. If the prop is wrong, acquire a clearer prop/still reference or remove it from the central composition.
9. If the model cannot preserve identity after reference-image retries, say so briefly and offer a non-face strategy: hands, costume, prop, silhouette, object-body fusion, or typography-led poster. Frame it as fallback after reference-image identity preservation failed.
