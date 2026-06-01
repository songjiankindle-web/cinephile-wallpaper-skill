---
name: cinephile-wallpaper
description: Generate original high-aesthetic movie posters and device wallpapers for real films. Use when an agent is asked to produce a finished poster/wallpaper from a film title, ask one fixed opening question, confirm required settings in one turn with remembered defaults, use film/character/prop/scene image references, call an image-generation model when available, save outputs, or provide one unified prompt when image generation is unavailable.
---

# Cinephile Wallpaper

## Core Idea

Turn a real film into an original movie poster or device wallpaper through research, visual curation, and image generation. Do not treat existing web posters as the main source; use generated or user-provided visuals.

Default stance: image models create the complete poster/wallpaper, including visual design and typography when requested. Do not use HTML to create or composite the poster.

## Opening And Mandatory Gates

If the user has not provided a film title or URL, start with exactly this one sentence and nothing else:

```text
请问你想生成哪部电影的海报壁纸？
```

Do not introduce the skill, list features, explain usage, ask about style, or add examples before this sentence.

If the user already provided a film title in the triggering message, do not ask for the film again. Treat the film-title step as answered, resolve ambiguity if needed, then immediately ask the numbered one-turn base settings. Never start research, write a prompt, call an image model, or generate a poster from the first user message alone.

Hard gate: generation is allowed only after these are complete:

1. film identity is known and ambiguity is resolved;
2. base settings are answered or explicitly accepted as saved defaults;
3. the separate image-reference/design-request gate is answered or explicitly skipped.

The base-settings prompt and the image-reference/design-request prompt are two separate assistant turns. Do not merge them. The base-settings turn asks only size/device, output directory, text variant, generation mode, and default memory. The next assistant turn, after the user answers base settings, asks image references and optional design requirements.

## Workflow

1. **Ask for the film**
   - Accept a film title or film URL.
   - If the triggering user message already contains a film title or URL, count this step as complete and move to base settings; do not begin generation.
   - If title/year is ambiguous, ask the user to identify the correct film.
   - If no model/style is specified, draw a style lane from the weighted router in `references/style-distillation.md`; do not let plot analysis choose the safest or "most suitable" style.
   - Auto-detect the user's interaction language from their request and respond in that language.
   - If the user asks for a different output language, use it for visible interaction and layout text unless film titles require original language.

2. **Confirm base settings in one turn**
   - After the film is known and ambiguity is resolved, ask one setup message with numbered, line-broken questions for size/device, output directory, text variant, generation mode, and whether to remember changed defaults.
   - This setup message is mandatory even when the user's first message already includes the film title, style, or output intent.
   - Do not include image-reference, character-reference, prop/scene-reference, or design-requirement questions in this setup message.
   - If saved preferences exist for size/device, output directory, text variant, or generation mode, show all saved defaults and let the user say to use all defaults.
   - Accept explicit dimensions, device type, or device model.
   - If the user wants a phone wallpaper and does not know the resolution, ask for the exact phone model only if it was not already provided; then look up the resolution online.
   - Preserve memory for default size/device, output directory, text variant, and generation mode when the user asks to save or changes them.
   - Record whether the size came from user dimensions, device lookup, auto-detection, or default.

3. **Confirm image reference use**
   - Before image generation, ask whether the user wants to upload images they want represented in the poster, including but not limited to characters, props, and scenes.
   - This gate is mandatory after base settings and before research/generation. Ask it as the next assistant turn after the user answers base settings, not inside the base-settings prompt.
   - Explain that uploading image references helps the poster anchor character likeness, prop form, scene atmosphere, or other visual details more accurately. If the user does not upload references, the skill will decide whether people, props, or scenes should appear and how to design them.
   - In this separate image-reference question, invite the user to add optional design requirements such as preferred art style, desired elements/props, character treatment, color mood, composition, or anything they want to avoid. If the user has no requirements, tell them to say so and let the AI make the design decisions.
   - Treat user design requirements as constraints for this run. If no design requirements are provided, set `ai_autonomous_design` and proceed without another confirmation.
   - If the user wants reference-image restoration, ask them to upload one or more images they want represented in the poster, including but not limited to characters, props, and scenes. For characters, prefer clear in-character stills, screenshots, face/upper-body images, or labeled group stills.
   - Treat user-uploaded reference images as the strongest visual source for this run. Use them before automatic web acquisition.
   - Use uploaded references to restore the character's face and appearance as accurately as the image model allows: face structure, eyes, nose, mouth, jaw, skin tone, age, hair, expression range, bearing, costume, and role cues are mandatory identity anchors.
   - Do not cut out, paste, trace, clone, or replicate the reference image's exact body pose, action, lighting, crop, background, camera angle, or composition. Redesign pose, gesture, action, framing, and poster composition while preserving the real actor/character likeness.
   - Do not proceed with character-face restoration until at least one uploaded or locally acquired reference image file is actually attachable to the image-generation call.
   - If the user does not provide real actor/character reference images, characters may still appear through restrained non-face strategies: back view, silhouette, partial figure, hands, costume, posture, shadow, reflection without readable face, scale figure, or body-object fusion. Do not force a character-free poster.
   - Store uploaded references only for the current run unless the user explicitly asks to build a reusable reference library.

4. **Confirm text handling**
   - Support: `with text`, `no text`, or `both`.
   - Text must be generated by the image model as part of the poster when requested.
   - If `both`, generate/save both variants.

5. **Research the film**
   - Do not start this step until the mandatory gates above are complete.
   - Verify the film exists.
   - Gather title, original title, year, director, country, key cast, brief plot, themes, visual motifs, and awards when useful.
   - Identify protagonist(s), iconic character anchors, and key props/objects when they materially improve film recognition.
   - If characters appear, create a character identity lock before generation.
   - If key props/objects appear, create a prop identity lock before generation. Confirm the real form/function/name of the object, especially for culturally specific weapons, tools, costumes, vehicles, artifacts, or architecture.
   - If the user uploaded character reference images, use them as priority-1 references and do not replace them with automatically acquired images.
   - Automatically search/acquire character visual references when browser, web, or download tools are available and the user wants characters but did not provide enough usable images, preferably in-character stills or trailer frames.
   - For any visible real actor/performer character, build a reference-image package: source stills/screenshots, one or more cropped character images, and optional costume/posture/scene references.
   - If the image model supports reference images, pass the cropped character reference images into generation and verify they were attached.
   - Do not rely on text descriptions, actor names, or style-language approximations to preserve identity. The restoration target is accurate face/appearance preservation from reference images while redesigning pose, action, framing, and composition.
   - If the user requested characters but did not upload usable references, ask for stills before attempting face restoration. Automatic acquisition may supplement missing or low-quality references when the host supports it.
   - If no usable character image file can be obtained or the host cannot pass reference images to the image model, do not promise character-face restoration. Use a restrained non-face character strategy when it improves the poster, or ask for a user-uploaded still only if the design truly needs a recognizable face.
   - Do not substitute generic objects for film-specific props. For example, a wing chun butterfly sword / 八斩刀 must not become generic crossed daggers.
   - Prefer primary or stable sources when available. Preserve source URLs in the manifest.

6. **Create a visual brief**
   - Read `references/visual-brief.md` when writing the brief.
   - Read `references/film-tone.md` before choosing palette, brightness, contrast, color temperature, or film-stock treatment.
   - Read `references/character-reference.md` when the generated visual needs stronger connection to the film.
   - Read `references/style-distillation.md` and `references/artist-grammars.md` when the visual direction feels too normal, too illustrational, or not bold enough.
   - Translate the film into a poster concept, not a literal scene summary.
   - Extract mood, visual symbols, film-tone diagnosis, art-language strategy, palette, composition, visual density, subject strategy, metaphor, abstraction level, and avoid-list.
   - Select a concrete `style_lane` by weighted random draw unless the user specifies a style. Film analysis decides elements, character anchors, props, mood, and metaphor; it must not choose, justify, or override the art style by suitability.
   - Never say or imply that the style was chosen because it is "more suitable," "matches the film," "fits the rhythm," or "best expresses the story." Say the style was drawn/selected from the weighted router, then build a `counterpoint_bridge` between that random style and the film.
   - Apply the classic fine-art boost in `references/style-distillation.md`: lanes such as impressionism, cubism, fauvism/expressionism, abstraction/suprematism, surrealism, pop art, Chinese ink, ukiyo-e, medieval/icon/glass, Renaissance/Baroque, and printmaking must collectively have a high baseline chance, not rare edge-case status.
   - Select a `visual_density` before writing the prompt: `dense`, `balanced`, `sparse`, or `single_stroke`. Use weighted randomness based on film genre, rhythm, scale, narrative complexity, and authorial tone; do not use pure random density and do not default to dense multi-element compositions.
   - Apply the global minimalism boost in `references/visual-brief.md`: increase the combined chance of `sparse` and `single_stroke` by 40% before drawing density.
   - If the selected style lane is `real_object_still_life`, focus on exact film props or body fragments; do not show recognizable faces.
   - Force an art-direction choice that is bolder than conventional illustration unless the user explicitly asks for a restrained normal poster.
   - Avoid direct replication of official posters.

7. **Generate the visual**
   - Do not call any image-generation tool until film identity, base settings, and image-reference/design-request gate are complete.
   - Before generating, determine `generation_mode`: `agent_image_tool`, `image_skill`, `external_api`, `prompt_only`, or `auto`.
   - Read `references/model-routing.md` when configuring model/provider behavior.
   - Use the agent’s available image tool if present.
   - If no image-generation capability is available, tell the user exactly: `您的agent没有生图能力，我可以为您提供对应的提示词，您可以自行在其他生图模型中使用。`
   - Then provide one unified copyable prompt and stop before pretending an image was generated.
   - If using an external API, require the user to provide credentials or endpoint details outside the skill text.
   - If the user requests a text version, allow the image model to generate integrated title and metadata directly in the poster for speed. Keep text short and provide exact strings.
   - Treat typography as a major visual component, not a plain font overlay. The title lettering must be art-directed and matched to the selected `style_lane`, film tone, language, and composition.
   - If the user requests a no-text version, use `no text, no logos, no credits`.
   - Never request live-action photorealism, copied stills, or invented characters. If a real actor/performer character appears, request identity preservation from the attached reference images while rendering the overall poster through the selected art lane's material/process language.
   - Save the prompt package internally, but do not display it by default.

8. **Save outputs**
   - Save generated visual, wallpaper, prompt package, compact research notes, and manifest.
   - Follow `references/output-schema.md`.
   - Do not search previous output folders for a finished version to hand back. Each user request creates a fresh generation unless the user explicitly asks to retrieve an old file.

9. **Set current desktop wallpaper if requested**
   - For macOS, use `scripts/set-macos-wallpaper.mjs`.
   - Set desktop only if explicitly requested or saved as a user default.
   - If not specified, do not ask every time; just save the file.
   - Do not implement timed wallpaper rotation; modern Windows and macOS already provide this at the OS level.

10. **Final response**
   - Default final response: show or link the finished poster/wallpaper, include output path(s), and one short status line.
   - Do not include research notes, visual brief, manifest details, or prompt text unless the user asks.
   - If no image was generated, return only the prompt package as the primary deliverable.

## Defaults

- Size: confirm in the one-turn setup; saved size can be offered as default.
- Output directory: confirm in the one-turn setup; saved output directory can be offered as default.
- Text variants: confirm in the one-turn setup: `with_text`, `no_text`, or `both`.
- Language: auto-detect from the user request; allow explicit override.
- Visual: original art-poster image, bolder than normal illustration by default.
- Tone: infer from the film's own cinematography and emotional register; do not default to dark, low-key, noir, desaturated, or gloomy palettes.
- Typography: generated directly by the image model as part of the poster when requested; no HTML compositor. Text must be custom, designed, and integrated with the poster's art language, not a generic default font.
- Prompt package: saved in the manifest/output folder; shown only for prompt-only mode, failure recovery, debugging, or explicit user request.
- Delivery: default to poster-first, low-token output.
- Interaction: fixed opening sentence, then one-turn base setup, then a separate image-reference/design-request turn. Do not merge the latter two.
- Image reference use: ask before generation whether the user wants to upload images they want represented in the poster, including but not limited to characters, props, and scenes. In that separate image-reference turn, invite optional design requirements. Uploading references improves character likeness, prop accuracy, scene atmosphere, and visual specificity; not uploading references means the skill decides the visual strategy. Require attached character references before claiming face restoration.
- Style: concrete weighted-random style-lane-driven art direction, not photorealistic live-action and not generic AI illustration.
- Style range: draw from modern/contemporary art, classical and pre-modern art, regional traditions, experimental material processes, and controlled counterpoint. Avoid making every output a polished normal illustration.
- Style source: distill poster/design principles, not direct imitation of a single living artist.
- Style lane: every run must choose one concrete style lane; generic `fine-art poster` wording is not enough.
- Style randomness: default style selection is weighted random across the style lane pool. The film's content serves the poster concept and elements, not style matching, unless the user explicitly asks for a specific style. Do not describe random style selection as suitability-based.
- Classic style weight: default style selection is weighted so classic fine-art/art-history lanes appear often. Recent absence of impressionism, cubism, abstraction, fauvism, ink, ukiyo-e, medieval/icon/glass, Renaissance/Baroque, or printmaking should trigger corrective weighting toward those lanes.
- Visual density: every run must choose a density mode through weighted randomness. Good posters may be dense, balanced, sparse, or a single decisive visual stroke. Do not fill the canvas just because more film elements were researched.
- Composition: overall poster design comes first. Do not create large empty blank zones merely for future text, but do use intentional negative space, silence, asymmetry, and one-point focus when the density mode calls for it.
- Film recognition: include a protagonist/character anchor when abstraction alone would make the film hard to identify.
- Character identity: if depicting a specific real actor/performer character, use a character identity lock plus actual in-character image files. Attach cropped character references to the image model when supported; do not rely on text-only prompting, actor-name prompting, or vague style-language approximation.
- User-uploaded character reference: first-pass preferred method for precise character anchoring. A user-uploaded still/photo is authoritative for the requested run and outranks automatic web references.
- Reference use: uploaded images are identity references, not source layers. Preserve the real actor/character face and appearance as accurately as possible, then regenerate the character inside a new poster pose, action, framing, concept, and chosen art language; never copy/paste, cut out, trace, or reproduce the uploaded image as a composited figure.
- Prop identity: if depicting a distinctive film object, weapon, costume, vehicle, artifact, or architecture, use a prop identity lock and real visual references; do not replace it with a generic lookalike.
- Character framing: prefer varied close portrait, three-quarter face, medium figure, pair, or ensemble strategies when useful; do not repeatedly hide characters as distant back-view figures.
- Face direction: when characters appear, prefer front, profile, or three-quarter views. Back view is uncommon and must be deliberate, not a default.
- No-reference character fallback: if no actor/character reference image is provided, avoid readable faces but allow elegant human presence through silhouette, back view, partial figure, hands, costume, posture, shadow, reflection, or body-object fusion. Use this as a design choice, not as a clumsy absence of people.
- Real object style: the `real_object_still_life` lane is for exact film props and real-world object materiality; people may appear only as body fragments, never recognizable faces.
- Preference memory: keep default size/device, output directory, text variant, and generation mode; update them when the user asks to remember current settings, and allow `use all defaults` on future runs.
- Fresh generation: do not reuse or auto-deliver previous generated results for the same film. Previous outputs are not a cache.
- Safety: do not bypass site protections; do not scrape copyrighted poster art as the default path.

## User Preferences To Honor

- image model or API provider;
- visual style;
- text/no text;
- protagonist/no protagonist;
- abstract/figurative;
- wallpaper size;
- output directory;
- interaction/output language;
- save-only vs set current desktop;
- generation mode: prompt-only, generate now, external API, another image skill, or automatic default.

## Quality Bar

Reject or revise outputs that look like:

- generic streaming thumbnails;
- official poster copies;
- text-heavy film database cards;
- low-effort AI fantasy art;
- illegible model-generated lettering;
- live-action photorealism;
- copied-still photorealism or celebrity glamour portraiture that ignores the film role;
- pasted/cutout-looking reference-image figures, traced poses, copied lighting, copied background, or poster designs that visibly reuse the uploaded reference image as a source layer;
- claiming character-face restoration without attached still/crop reference images;
- generating readable actor/character faces after the user requested characters but no uploaded/acquired reference image can be attached;
- using actor-name or text traits alone when the model can accept image references;
- invented character designs that do not match the film;
- cluttered desktop backgrounds.
- conventional illustration when the user asked for bolder art direction;
- obvious reserved blank space that weakens the poster composition;
- visually exhausting all-over element coverage when a stronger focal hierarchy or negative space would make the poster more memorable;
- generated text with incorrect title, misspellings, wrong language, or unreadable letterforms.
- ordinary default-looking typography, generic sans-serif/serif titles, database-card text, or text that feels pasted on instead of designed as part of the poster.

## Resources

- `references/workflow.md`: concise user-guidance workflow.
- `references/device-size.md`: device resolution and wallpaper size lookup.
- `references/visual-brief.md`: brief structure and prompt rules.
- `references/film-tone.md`: film tone, palette, brightness, contrast, and color strategy.
- `references/model-routing.md`: generation-mode and provider selection.
- `references/style-distillation.md`: poster grammar and art-direction rules.
- `references/character-reference.md`: protagonist and character-anchor research rules.
- `references/artist-grammars.md`: distilled poster-artist grammars such as Huang Hai.
- `references/output-schema.md`: manifest schema and no-cache output rule.
- `scripts/set-macos-wallpaper.mjs`: macOS desktop setter.
