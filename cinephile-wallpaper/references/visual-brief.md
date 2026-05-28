# Visual Brief Reference

## Brief Fields

```json
{
  "film_identity": {
    "title": "",
    "original_title": "",
    "original_title_language": "",
    "year": "",
    "director": "",
    "country": []
  },
  "interpretation": {
    "one_sentence_reading": "",
    "mood": [],
    "themes": [],
    "visual_motifs": [],
    "art_medium": "oil painting | sketch | gouache | acrylic | watercolor | ink | printmaking | modernism | impressionism | fauvism | abstraction | pop art | collage | other",
    "art_language": {
      "style_lane": "",
      "primary": "",
      "secondary": "",
      "movement_family": "modern_contemporary | classical | regional_traditional | material_process | counterpoint",
      "abstraction_mechanism": "",
      "semiotic_layers": [],
      "counterpoint_bridge": ""
    },
    "film_tone": {
      "color_system": "color | black-and-white | mixed | animation | unknown",
      "brightness": "high-key | mid-key | low-key | mixed",
      "contrast": "soft | hard | flat | chiaroscuro | graphic | mixed",
      "temperature": "warm | cool | neutral | mixed",
      "medium_clues": [],
      "tonal_strategy": "",
      "rationale": "",
      "avoid_tone": []
    },
    "character_anchor": {
      "name": "",
      "role": "protagonist | antagonist | supporting | ensemble",
      "actor_or_performer": "",
      "reference_mode": "auto_acquired_refs | user_uploaded_refs | image_references | text_only",
      "reference_images": [],
      "local_reference_paths": [],
      "reference_images_attached": false,
      "acquisition_method": "browser_search | web_search | trailer_frame | user_upload | text_only",
      "visual_traits": [],
      "required_traits": {
        "face": [],
        "hair": [],
        "costume": [],
        "posture": [],
        "props": [],
        "expression": []
      },
      "forbidden_substitutions": [],
      "strategy": "close portrait abstraction | frontal portrait | three-quarter face | profile | medium figure | character pair | character constellation | split composition | environmental portrait | silhouette | partial figure | costume and prop | reflection | back view | tiny figure",
      "source_urls": []
    },
    "central_metaphor": "",
    "abstraction_level": "symbolic | semi-abstract | abstract",
    "palette": [],
    "composition": "",
    "subject_strategy": "",
    "avoid": []
  },
  "prompt": {
    "unified_prompt": "",
    "text_strategy": "model_text | no_text | both",
    "composition_priority": "overall poster first; no oversized reserved blank area"
  }
}
```

## Prompt Rules

- Describe the desired image, not the poster to copy.
- All generated visuals must be fine-art or graphic poster styles, not photorealistic live-action.
- Use media such as oil painting, sketch, gouache, acrylic, watercolor, ink, printmaking, modernism, impressionism, fauvism, abstraction, pop art, constructivism, collage, or other art/poster languages.
- Style must be more ambitious than normal illustration when the user asks for stronger art direction. Use `style-distillation.md` and `artist-grammars.md` to choose from modern/contemporary art, classical art, regional traditions, experimental materials, or deliberate counterpoint strategies.
- Do not merely list art movements. Select one primary art language, one secondary device, one abstraction mechanism, and one reason this style reveals the film.
- Before writing the prompt, choose a `style_lane` from `style-distillation.md`. The lane must control composition, material, and abstraction, not appear as a decorative adjective.
- Do not repeat the same `style_lane` or `movement_family` from recent successful generations when history is available.
- Avoid generic style anchors as the primary style: `fine-art poster`, `painterly`, `cinematic`, `beautiful illustration`, `high aesthetic`, `movie poster style`.
- If the previous result looked conventional, safe, or like ordinary illustration, the next prompt must use `style_escalation`: choose a more radical art language, an explicit abstraction mechanism, and a material/process constraint.
- Allow bold counterpoint when it deepens meaning, such as a science-fiction film rendered through Chinese ink, ukiyo-e, medieval manuscript, or Renaissance allegory.
- Do not mechanically list plot elements. Distill the film into a central metaphor or visual thesis first.
- Favor poster language over scene language: symbol, negative space, graphic structure, silhouette, material texture, iconic object, ritualized gesture, and integrated typography when requested.
- Read `film-tone.md` before choosing tonal direction. Match the film's own image language and emotional register; do not default to dark, low-key, desaturated, or noir palettes.
- Read `style-distillation.md` when the output feels too realistic or when the user requests stronger art direction.
- Read `character-reference.md` whenever a visible film character appears, not only after recognition fails.
- Use film-inspired motifs: locations, objects, light, geometry, weather, costume silhouettes, era texture.
- Make the prompt art-directed and non-photorealistic. Do not switch to live-action realism.
- Avoid asking for official poster replication.
- If depicting film characters, create a character identity lock and match the actual character design from the film. Do not invent a new unrelated character.
- If browser/web tools are available, automatically acquire in-character reference images before asking the user to upload.
- If the host supports reference images, use acquired or user-provided in-character reference images for key characters and verify `reference_images_attached: true`. If it does not, state `text_only` and make the likeness risk explicit in the prompt package.
- Do not use frontal/close likeness-heavy compositions unless real reference images are attached. Text-only prompts may describe costume and role, but they cannot guarantee actor likeness.
- Avoid realistic celebrity portraiture. Prefer stylized likeness through costume, pose, hairstyle, facial structure cues, color, and role-specific attributes.
- Text strategy depends on the run: use model-generated integrated text for speed when requested; use `no text, no logos, no credits` only for no-text or post-layout runs.
- Overall poster design comes before text accommodation. Do not reserve a large blank region only for text. Text should be integrated into the image, placed over calmer existing regions, or kept minimal.
- Text must not change the whole poster's brightness, color, contrast, saturation, or tone. Do not add full-canvas dark overlays, dimming filters, global gradients, or image-wide mattes to make text readable.

## Good Prompt Shape

```text
Style lane: [style_lane]. Build a [composition system: grid/icon/collage/
tapestry/signal field/miniature/stained glass/map/diagram/assemblage] inspired
by [film]. Translate its central idea into [metaphor] through [symbolic visual
motifs], [palette], [material/process], and [abstraction mechanism]. Avoid
conventional AI illustration, generic painterly poster style, and normal movie
concept art. No photorealism, no obvious blank title block, no logos, no credits.
```

When outputs are too normal or illustration-like, use:

```text
Style lane: [style_lane]. Create an original key visual inspired by [film],
using [primary art language] with [secondary material/process]. Do not make a
conventional illustration or generic art-poster image. Translate [theme] into
[abstraction mechanism], with semiotic layers of [symbol 1], [symbol 2], and
[spatial/color logic]. The style choice reveals the film because [reason].
The composition must be driven by [grid/icon/collage/tapestry/signal field/
miniature/stained glass/map/diagram/assemblage], not by normal scene depiction.
No photorealism, no text, no logos, no credits.
```

Stronger style escalation pattern:

```text
Style escalation: avoid polished conventional illustration, concept-art look,
and safe movie-poster normality. Use [radical art language] as the primary
structure, [material/process] as the surface, and [abstraction mechanism] to
transform the film into signs rather than scene depiction. Build layered
signifiers: [character/object], [setting/era], [theme], [film-tone cue].
Composition must feel like a finished artwork first, not an illustration with
empty space reserved for text.
Avoid conventional AI illustration and generic art-poster look.
```

For text-in-image runs:

```text
Integrate concise poster typography directly into the artwork. Use exactly
these text strings: Chinese title "[title_zh]", original title "[original]",
director/year "[director_zh] / [year]", country "[country_zh]". Keep text
minimal, intentional, and part of the poster design. Do not create a large
blank title area; preserve the full composition.
```

For post-layout text:

```text
Keep the base image visually unchanged. Add typography only as text, local
micro-background, outline, or text shadow. Do not darken, desaturate, blur,
or recolor the whole poster. The with-text and no-text versions should have
the same overall brightness and color impression.
```

For no-text or post-layout runs:

```text
No text, no logos, no credits. Do not create obvious empty title blocks or
oversized blank margins. Preserve an elegant full poster composition; later
text, if any, should sit lightly over the design.
```

When recognition is weak, add:

```text
Include a protagonist character anchor through [face/costume/posture/prop],
strictly matching the film character's visual identity while rendered in
[fine-art medium], recognizable but not a live-action photorealistic actor
portrait, integrated into the central poster metaphor rather than copied from a still.
```

Stronger character-lock pattern:

```text
Character identity lock: [character] from [film, year], played by [performer].
Use the attached in-character reference images as visual identity anchors.
Preserve [face], [hair], [costume], [posture], [prop], and [expression] cues.
The character must read as [character] before the title is seen, while rendered
as [art language], not photorealistic, not a copied still, not a generic
replacement.
```

If all prior generations look like distant back-view figures, force variety:

```text
Avoid a tiny distant back-view figure. Use [close symbolic portrait / profile /
three-quarter face / frontal painted portrait / character pair / character
constellation / split composition / environmental portrait] to make the film's
key character presence more immediate while staying poster-like.
```

When prior outputs are too dark, force tonal specificity:

```text
Do not default to a dark prestige-poster palette. Base the tonal system on
the film's actual image language: [color or B&W], [brightness], [contrast],
[temperature], [film stock or texture clue]. Use [tonal strategy] with
[specific colors] so the result reflects this film rather than generic gloom.
```

When prior outputs were too realistic, prefer:

```text
Style lane: [style_lane]. Create an original key visual inspired by [film].
Do not depict a literal scene, photorealistic live-action frame, or realistic
movie still. Translate the film's
central emotional pressure into a symbolic poster device: [metaphor].
Use [lane-specific structure], [palette], [material/process], and
[abstraction mechanism]. Avoid generic painterly poster style, no text, no
logos, no credits, with a complete poster composition.
```

## From Plot To Poster

Before writing the prompt, perform this reduction:

1. Plot fact: what happens.
2. Emotional pressure: what it feels like.
3. Visual thesis: what single image could carry that feeling.
4. Poster device: how to stylize it through composition, symbol, color, texture, and negative space.
5. Film tone: what brightness, color, contrast, and medium quality belong to the film.
6. Character anchor: which protagonist trait makes the film recognizable without becoming a still.

Example:

```text
Not: "a woman screaming in a shower"
Better: "a fractured white-tile grid dissolving into black diagonal cuts, a drain like an eye, cold silver water rendered as graphic lines"
```

Use recognizable essence, not literal reenactment.

## Typography Guidance

Typography rule:

- First line: Chinese film title.
- Second line: original title in the film's country/language of origin, e.g. English for US/UK, French for France, German for Germany, Japanese for Japan.
- Director and country/region must be in Chinese.
- Optional: one short curatorial phrase in Chinese unless the user requests another language.

Keep typography readable, but never sacrifice the whole poster to a blank title field. If the image is visually busy, use small integrated type, a local micro-matte behind only the text, outline, or text shadow; avoid full-image overlays, huge reserved whitespace, and heavy shadows.

## Prompt Package Handling

Every run should save one unified prompt in the manifest or output folder. Do not display it by default after a successful image generation; the user asked for the poster, not the working notes.

Display the package only when prompt-only mode is selected, generation fails, the user asks for it, or debugging requires it.

````markdown
### Unified Prompt
```text
[one copyable prompt that includes visual direction, style lane, character reference instructions, typography instructions, image constraints, and avoid-list]
```
````

Keep the prompt portable across models. Avoid model-only syntax unless the user chose a specific model.
