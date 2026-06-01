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
  "user_design_request": {
    "provided": false,
    "raw_notes": "",
    "style_preference": "",
    "requested_elements": [],
    "character_treatment": "",
    "tone_or_palette": "",
    "composition_preference": "",
    "avoid": [],
    "ai_autonomous_design": true
  },
  "interpretation": {
    "one_sentence_reading": "",
    "mood": [],
    "themes": [],
    "visual_motifs": [],
    "art_medium": "oil painting | sketch | gouache | acrylic | watercolor | ink | printmaking | modernism | impressionism | fauvism | abstraction | pop art | collage | other",
    "art_language": {
      "style_lane": "",
      "style_variant": "",
      "style_selection_mode": "user_specified | weighted_random | corrective",
      "primary": "",
      "secondary": "",
      "movement_family": "modern_contemporary | classical | regional_traditional | material_process | counterpoint",
      "abstraction_mechanism": "",
      "semiotic_layers": [],
      "counterpoint_bridge": "",
      "style_weights": {},
      "classic_style_boost_applied": true
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
      "presence": "user_requested | user_declined | inferred | none",
      "name": "",
      "role": "protagonist | antagonist | supporting | ensemble",
      "actor_or_performer": "",
      "reference_mode": "auto_acquired_refs | user_uploaded_refs | image_references | text_only",
      "user_upload_prompt_shown": false,
      "user_uploaded_reference_paths": [],
      "source_stills": [],
      "character_crops": [],
      "costume_posture_refs": [],
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
    "prop_anchor": {
      "name": "",
      "reference_mode": "auto_acquired_refs | user_uploaded_refs | image_references | text_only | none",
      "required_traits": {
        "category_function": "",
        "shape": [],
        "material": [],
        "scale": [],
        "usage_pose": [],
        "film_context": []
      },
      "forbidden_substitutions": [],
      "source_urls": []
    },
    "central_metaphor": "",
    "abstraction_level": "symbolic | semi-abstract | abstract",
    "palette": [],
    "composition": "",
    "visual_density": {
      "mode": "dense | balanced | sparse | single_stroke",
      "selection_mode": "user_specified | weighted_random | corrective",
      "minimalism_boost_applied": true,
      "density_weights": {
        "dense": 0,
        "balanced": 0,
        "sparse": 0,
        "single_stroke": 0
      },
      "density_inputs": {
        "genres": [],
        "scale": "intimate | medium | epic",
        "tempo": "slow | moderate | fast",
        "narrative_complexity": "minimal | moderate | complex",
        "authorial_mode": "mainstream | genre | art_cinema | experimental",
        "visual_world": "realist | stylized | spectacle | austere | unknown"
      },
      "focal_point": "",
      "negative_space_role": "",
      "max_primary_elements": 3,
      "detail_budget": "low | medium | high",
      "quiet_area_ratio": "10-25% | 25-45% | 45-70% | 70%+",
      "rationale": ""
    },
    "subject_strategy": "",
    "avoid": []
  },
  "prompt": {
    "unified_prompt": "",
    "text_strategy": "model_text | no_text | both",
    "typography_design": {
      "role": "major_visual_component | minimal_metadata | none",
      "lettering_style": "",
      "style_lane_alignment": "",
      "placement": "",
      "integration_method": "",
      "avoid": []
    },
    "composition_priority": "overall poster first; no oversized reserved blank area"
  }
}
```

## Prompt Rules

- Describe the desired image, not the poster to copy.
- All generated visuals must be fine-art or graphic poster styles, not photorealistic live-action.
- Use media such as oil painting, sketch, gouache, acrylic, watercolor, ink, printmaking, modernism, impressionism, fauvism, abstraction, pop art, constructivism, collage, or other art/poster languages.
- Style must be more ambitious than normal illustration. Use `style-distillation.md` and `artist-grammars.md` to draw from modern/contemporary art, classical art, regional traditions, experimental materials, or deliberate counterpoint strategies unless the user specifies a style.
- Do not merely list art movements. Draw one primary art language, one secondary device, and one abstraction mechanism; then write a `counterpoint_bridge` explaining how the random style will hold the film's motif. Do not frame the style as chosen because it suits the film.
- Before writing the prompt, draw a `style_lane` and `style_variant` from the weighted style router in `style-distillation.md` unless the user specified one. The lane must control composition, material, and abstraction, not appear as a decorative adjective.
- Film analysis decides visual elements, character anchors, key props, tone references, and metaphor; it does not choose the style by suitability. If the random style creates tension, write a counterpoint bridge instead of replacing it or claiming it was more suitable.
- Choose a `visual_density` before writing the prompt. Default is weighted random, not pure random: infer density weights from genre, scale, tempo, narrative complexity, authorial mode, and visual world; then draw one mode from those weights. Use corrective only when recent outputs felt too full or the user asks for more restraint. The density mode controls how many elements may appear and how much silence/negative space the poster uses.
- Treat each request as a fresh generation. Do not reuse a previous output or hand back an old file for the same film.
- Avoid generic style anchors as the primary style: `fine-art poster`, `painterly`, `cinematic`, `beautiful illustration`, `high aesthetic`, `movie poster style`.
- If the current draft or just-generated image looks conventional, safe, or like ordinary illustration, retry with `style_escalation`: choose a more radical art language, an explicit abstraction mechanism, and a material/process constraint.
- Honor `user_design_request` when provided: user-specified art style, elements, character treatment, tone, composition, or avoid-list override the default random choices unless they conflict with the film identity, safety, or model capability. If not provided, proceed with AI-autonomous style, element, density, and composition decisions.
- Forbidden style-selection reasoning: do not say the style was chosen because it fits the film's rhythm, genre, tone, story, or content. Say it was drawn from the weighted router and then bridged to the film.
- Allow bold counterpoint when it deepens meaning, such as a science-fiction film rendered through Chinese ink, ukiyo-e, medieval manuscript, or Renaissance allegory.
- Do not mechanically list plot elements. Distill the film into a central metaphor or visual thesis first.
- Favor poster language over scene language: symbol, negative space, graphic structure, silhouette, material texture, iconic object, ritualized gesture, and integrated typography when requested.
- Do not overfill the image just because the research found many motifs. Select one dominant focal point, one supporting sign, and optional texture; reject extra motifs that weaken hierarchy.
- Read `film-tone.md` before choosing tonal direction. Match the film's own image language and emotional register; do not default to dark, low-key, desaturated, or noir palettes.
- Read `style-distillation.md` when the output feels too realistic or when the user requests stronger art direction.
- Read `character-reference.md` whenever a visible film character appears, not only after recognition fails.
- Use film-inspired motifs: locations, objects, light, geometry, weather, costume silhouettes, era texture.
- Use film-specific object accuracy: if a recognizable prop, weapon, costume, vehicle, artifact, building, instrument, or craft object appears, establish a prop identity lock from `character-reference.md`.
- If `style_lane` is `real_object_still_life`, make the central subject an exact film prop or real-world object. Do not show recognizable faces; allow only body fragments such as hands, feet, sleeve, glove, shoulder crop, shadow, or silhouette edge.
- Make the prompt art-directed and non-photorealistic. Do not switch to live-action realism.
- Avoid asking for official poster replication.
- If depicting film characters, create a character identity lock and match the actual character design from the film. Do not invent a new unrelated character.
- Before image generation, ask whether the user wants to upload images they want represented in the poster, including but not limited to characters, props, and scenes. This must be a separate assistant turn after the base settings turn, not merged into it. In this image-reference turn, ask for optional design requirements such as preferred style, elements, character treatment, tone, composition, or avoid-list. Explain that uploaded images improve character likeness, prop accuracy, scene atmosphere, or other visual specificity; no upload means the skill will decide what appears and how to design it. No design requirement means AI-autonomous design.
- If browser/web tools are available, automatically acquire in-character reference images only when the user wants characters and uploaded references are absent or insufficient.
- For visible real actor/performer characters, do not rely on text descriptions. Acquire or ask for actual still/screenshot image files, prepare cropped character references, and attach those images to the generation call.
- If the host supports reference images, use acquired or user-provided in-character crops for key characters and verify `reference_images_attached: true`. If it does not, state that character-face restoration is not available in this agent/model and either ask for an image-reference-capable workflow or use a non-face strategy with explicit risk.
- Use frontal/close character compositions only when real cropped reference images are attached.
- When using uploaded or acquired character references, treat the face and appearance as mandatory identity targets. Preserve the real actor/character likeness as accurately as the model allows, but redesign the body pose, action, gesture, lighting, framing, and composition. Do not paste, cut out, trace, clone, or recreate the reference still.
- If the user wants character presence but no actor/character reference image is provided or attachable, do not remove people by default. Use non-face character presence: back view, silhouette, partial figure, hands, costume, posture, shadow, reflection, small figure, or body-object fusion. Avoid readable invented faces.
- Limit back-view character compositions. If characters appear, prefer front, profile, or three-quarter views; use back view only as a deliberate film-specific motif or non-face fallback.
- Do not confuse non-photorealism with text-only approximation. Avoid copied stills and live-action photorealism, but preserve identity from the attached character image references.
- Text strategy depends on the run: use model-generated integrated text for speed when requested; use `no text, no logos, no credits` only for no-text or post-layout runs.
- In text-in-image runs, typography is a major visual component. The title lettering must be custom-designed or art-directed, matched to the selected `style_lane`, film tone, original-language title, and composition. Avoid generic default fonts.
- Overall poster design comes before text accommodation. Do not reserve a large blank region only for text. Text should be integrated into the image, placed over calmer existing regions, or kept minimal.
- Separate good negative space from bad blank space. Good negative space creates focus, rhythm, breath, symbolic silence, or scale tension. Bad blank space is an obvious empty title block or dead leftover area.
- Text must not change the whole poster's brightness, color, contrast, saturation, or tone. Do not add full-canvas dark overlays, dimming filters, global gradients, or image-wide mattes to make text readable.

## Visual Density Modes

Pick one mode before the prompt. The mode is as important as style.

- `dense`: many signs, layered texture, mural/collage/tapestry logic. Use only when the selected style or film truly benefits from abundance. Must still have a clear focal hierarchy.
- `balanced`: one dominant subject, one or two secondary motifs, readable negative space. This is the default safe design density.
- `sparse`: one dominant visual sign, large intentional quiet area, minimal supporting texture. Use when the poster needs elegance, melancholy, mystery, or a sharper icon.
- `single_stroke`: one decisive object/gesture/mark/face fragment, very high negative space, "finishing touch" design logic. Use for poetic, iconic, minimal, ink, conceptual, or tension-heavy posters.

Density rules:

- Draw density from a weighted distribution when the user has no preference. Do not pick density by pure randomness.
- Apply a global minimalism boost before drawing: after film-profile weighting, increase `sparse` and `single_stroke` together by 40% of their current combined weight, then renormalize all four weights to 100. This raises the baseline chance of minimal visual density without making it deterministic.
- Keep a minority chance for surprise. A commercial action film can still become sparse; an art film can still become dense. Weighted means biased, not deterministic.
- Bias toward `balanced`, `sparse`, and `single_stroke` if recent results felt too full.
- A minimal poster is not a weak poster. It must carry meaning through scale, placement, texture, color, and the chosen focal sign.
- For `sparse` and `single_stroke`, cap primary elements at one or two. Do not add background story fragments, decorative particles, extra faces, or multiple props.
- For `dense`, include an explicit hierarchy: foreground focal sign, secondary rhythm, background texture. No all-over equal-weight clutter.
- The unified prompt must include the chosen density mode and one density instruction such as `large intentional negative space`, `one dominant sign only`, `single decisive brush mark`, or `balanced hierarchy with two supporting motifs`.

## Density Weighting

Start from this neutral distribution, then adjust:

```json
{
  "dense": 25,
  "balanced": 40,
  "sparse": 25,
  "single_stroke": 10
}
```

Use film evidence to adjust weights:

- Commercial action, martial arts, superhero, disaster, war spectacle, heist, chase, musical ensemble, broad comedy, or large ensemble: increase `dense` and `balanced`; keep small `sparse`/`single_stroke` chance for iconic counterpoint.
- Master classic art cinema, slow cinema, chamber drama, existential drama, memory films, spiritual films, restrained melodrama, or films about solitude/absence: increase `sparse` and `single_stroke`; keep `balanced` as fallback.
- Science fiction: usually increase `sparse`, `single_stroke`, and `balanced` because empty space, scale, geometry, signal, and one iconic object often work well; increase `dense` only for cyberpunk crowds, maximalist worlds, space battles, or techno-baroque settings.
- Noir, mystery, psychological thriller, horror, and ghost stories: increase `sparse`/`single_stroke` when dread, absence, or one uncanny sign matters; increase `dense` for conspiracy webs, occult systems, or body-horror abundance.
- Historical epic, fantasy worldbuilding, myth, wuxia ensemble, political fresco, social panorama: increase `dense` and `balanced`.
- Minimal plot, one-location film, two-character relationship, road movie, or quiet coming-of-age film: increase `balanced`, `sparse`, and sometimes `single_stroke`.
- Experimental, essay film, conceptual documentary, or structurally abstract film: increase `sparse`, `single_stroke`, or `balanced`; use `dense` only for archival/collage logic.

Suggested final distributions:

```json
{
  "commercial_action": {"dense": 45, "balanced": 35, "sparse": 15, "single_stroke": 5},
  "martial_arts_or_wuxia": {"dense": 35, "balanced": 35, "sparse": 20, "single_stroke": 10},
  "art_cinema_classic": {"dense": 10, "balanced": 30, "sparse": 40, "single_stroke": 20},
  "science_fiction_austere": {"dense": 10, "balanced": 30, "sparse": 40, "single_stroke": 20},
  "science_fiction_spectacle": {"dense": 30, "balanced": 35, "sparse": 25, "single_stroke": 10},
  "psychological_or_horror": {"dense": 15, "balanced": 30, "sparse": 35, "single_stroke": 20},
  "historical_epic_or_social_panorama": {"dense": 40, "balanced": 35, "sparse": 15, "single_stroke": 10},
  "quiet_drama_or_romance": {"dense": 10, "balanced": 40, "sparse": 35, "single_stroke": 15}
}
```

If multiple categories apply, average or blend the closest distributions, then draw once.

Global minimalism boost example: if blended weights are `{dense: 45, balanced: 35, sparse: 15, single_stroke: 5}`, the minimal modes total 20. Add 8 points across `sparse` and `single_stroke` proportionally or with a slight preference to `sparse`, then renormalize. Record `minimalism_boost_applied: true`.

Record:

- the inferred category or blend;
- final weights;
- selected mode;
- why this density supports the film.

Density QA:

- Can the poster be understood from three meters away?
- Is there one clear first read?
- Does every added element earn its place?
- If the image feels tiring, remove motifs before adding style adjectives.
- If using negative space, does it feel designed rather than empty?

## Good Prompt Shape

```text
Style lane: [style_lane]. Build a [composition system: grid/icon/collage/
tapestry/signal field/miniature/stained glass/map/diagram/assemblage] inspired
by [film]. Translate its central idea into [metaphor] through [symbolic visual
motifs], [palette], [material/process], and [abstraction mechanism]. Avoid
conventional AI illustration, generic painterly poster style, and normal movie
concept art. No photorealism, no obvious blank title block, no logos, no credits.
Visual density: [dense/balanced/sparse/single_stroke], with [one clear first
read / large intentional negative space / single decisive focal sign / layered
but hierarchical detail].
```

When outputs are too normal or illustration-like, use:

```text
Style lane: [style_lane]. Create an original key visual inspired by [film],
using [primary art language] with [secondary material/process]. Do not make a
conventional illustration or generic art-poster image. Translate [theme] into
[abstraction mechanism], with semiotic layers of [symbol 1], [symbol 2], and
[spatial/color logic]. The style was drawn independently; bridge it to the film through [motif/metaphor/tone mechanism].
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
minimal, intentional, and part of the poster design. Design the title
lettering as a visual form matched to [style_lane] and [film tone], not as a
generic font overlay. Use custom letterforms, calligraphic pressure, geometric
construction, fractured type, hand-painted texture, printmaking ink, stencil,
seal-like marks, or era-specific lettering when appropriate. Do not create a
large blank title area; preserve the full composition.
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
[fine-art medium]. Use the attached in-character cropped reference image as
the mandatory identity source for the face and appearance. Accurately preserve
the referenced face/head/hair/age/expression/costume and role bearing, but
regenerate the figure in a new poster pose, action, gesture, and composition.
Do not paste, cut out, trace, clone, or recreate the still; do not copy its
lighting, background, crop, body pose, or exact posture.
```

Stronger character-lock pattern:

```text
Character identity lock: [character] from [film, year], played by [performer].
Use the attached cropped in-character reference images as the identity source,
not as loose inspiration. Accurately preserve the referenced face, head, hair,
eyes, nose, mouth, jaw, costume, prop, expression range, and role bearing
inside the poster, while changing the pose, action, gesture, crop, lighting,
background, and composition. The character must read as [character] before the
title is seen, while rendered as [art language]; not a photorealistic copied
still, not pasted cutout, not text-only approximation, not a generic replacement.
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
- Treat typography as image, rhythm, and hierarchy. It should have designed letterforms, not ordinary default font styling.
- Match lettering to the selected style lane:
  - `geometric_avant_garde`: bold geometric, constructivist, Bauhaus, Swiss-grid, diagonal or modular lettering.
  - `fragmented_modernism`: fractured cubist lettering, split planes, collage type, multi-angle title blocks.
  - `expressive_color`: hand-painted, rough contour, fauvist/expressionist strokes.
  - `pop_repetition_media`: screen-print, halftone, consumer-color, repeated title marks.
  - `east_asian_ink`: calligraphic brush, seal-like red marks, ink pressure, controlled blankness.
  - `ukiyo_e_flatworld`: vertical cartouche, woodblock-style title plaque, patterned title strip.
  - `medieval_icon_glass`: illuminated initials, gilded manuscript/cathedral label logic.
  - `renaissance_baroque_allegory`: engraved serif, fresco inscription, theatrical title ribbon.
  - `print_process`: woodcut/linocut/risograph/screen-print lettering with ink limits.
  - `minimalist_reduction`: precise sparse lettering, hard-edge spacing, one strong typographic anchor.

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
