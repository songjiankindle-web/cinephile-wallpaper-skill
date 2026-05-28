---
name: cinephile-wallpaper
description: Generate original high-aesthetic movie posters and device wallpapers for real films. Use when an agent is asked to produce a finished poster/wallpaper from a film title, confirm compact settings, research only what is needed, use film/character references, generate or guide the image, save outputs, and optionally set the current desktop wallpaper.
---

# Cinephile Wallpaper

## Core Idea

Turn a real film into an original movie poster or device wallpaper through research, visual curation, image generation, and optional typography. Do not treat existing web posters as the main source; use generated or user-provided visuals.

Default stance: image models create the complete art-poster image. Use deterministic layout tools only when the user needs highly accurate text, multiple text variants, or a local compositor workflow.

## Opening Prompt

Start with one concise question in the user's language. In Chinese, use:

```text
请告诉我您想看到哪部电影的海报？
```

Do not start with a long capability explanation.

## Workflow

1. **Ask for the film**
   - Accept a film title or film URL.
   - If title/year is ambiguous, ask the user to identify the correct film.
   - If no model/style is specified, choose a style lane from `references/style-distillation.md`; do not use generic visual defaults.
   - Auto-detect the user's interaction language from their request and respond in that language.
   - If the user asks for a different output language, use it for visible interaction and layout text unless film titles require original language.

2. **Use quick defaults, ask only when needed**
   - Default to `quick_mode: true`.
   - Load saved preferences if available.
   - Do not ask for settings that can be safely inferred or defaulted.
   - Ask a compact setup question only when required settings remain impossible to infer.
   - Accept explicit dimensions, device type, or device model.
   - If the user wants a phone wallpaper and does not know the resolution, ask for the exact phone model only if it was not already provided; then look up the resolution online.
   - Auto-detect current screen resolution if available; otherwise use saved size or fallback `2560x1440`.
   - Use saved output directory or default `CinephileWallpaper/outputs/YYYY/MM` unless the user provides a path.
   - Default text mode to `with_text`; generate `no_text` only when requested or when model text fails.
   - Default generation mode to `agent_image_tool` when available, then `image_skill`, then `prompt_only`.
   - Record whether the size came from user dimensions, device lookup, auto-detection, or default.

3. **Confirm text handling**
   - Do not ask unless the user has not provided a preference and default text mode would be risky for the selected model.
   - Support: `with text`, `no text`, or `both`.
   - Default text rendering path for speed: let the image model generate the full poster with integrated text if the user wants text and the selected model has acceptable text rendering.
   - Use deterministic post-layout only when the user asks for exact typography, the model is weak at text, or the generated text fails quality review.
   - If `both`, generate/save both variants.

4. **Research the film**
   - Verify the film exists.
   - Gather title, original title, year, director, country, key cast, brief plot, themes, visual motifs, and awards when useful.
   - Identify protagonist(s) or iconic character anchors when characters will appear or when they materially improve film recognition.
   - If characters appear, create a character identity lock before generation.
   - Automatically search/acquire character visual references when browser, web, or download tools are available, preferably in-character stills or trailer frames.
   - If the image model supports reference images, pass acquired references into generation and verify they were attached.
   - Ask the user to upload stills only when automatic acquisition fails, access is blocked, references are low quality, or the host cannot pass acquired images to the image model.
   - Fall back to a text-only identity lock only when no usable reference-image path exists; do not promise face likeness in this mode.
   - Prefer primary or stable sources when available. Preserve source URLs in the manifest.

5. **Create a visual brief**
   - Read `references/visual-brief.md` when writing the brief.
   - Read `references/film-tone.md` before choosing palette, brightness, contrast, color temperature, or film-stock treatment.
   - Read `references/character-reference.md` when the generated visual needs stronger connection to the film.
   - Read `references/style-distillation.md` and `references/artist-grammars.md` when the visual direction feels too normal, too illustrational, or not bold enough.
   - Translate the film into a poster concept, not a literal scene summary.
   - Extract mood, visual symbols, film-tone diagnosis, art-language strategy, palette, composition, subject strategy, metaphor, abstraction level, and avoid-list.
   - Select a concrete `style_lane` and avoid repeating recent lanes when history is available.
   - Force an art-direction choice that is bolder than conventional illustration unless the user explicitly asks for a restrained normal poster.
   - Avoid direct replication of official posters.

6. **Generate the visual**
   - Before generating, determine `generation_mode`: `agent_image_tool`, `image_skill`, `external_api`, `prompt_only`, or `auto`.
   - Do not ask for generation mode if an image tool or saved provider is available.
   - Read `references/model-routing.md` when configuring model/provider behavior.
   - Use the agent’s available image tool if present.
   - If no image tool is available, write a model-ready prompt and stop before pretending an image was generated.
   - If using an external API, require the user to provide credentials or endpoint details outside the skill text.
   - If the user requests a text version, allow the image model to generate integrated title and metadata directly in the poster for speed. Keep text short and provide exact strings.
   - If the user requests a no-text version, use `no text, no logos, no credits`.
   - Never request live-action photorealism, realistic celebrity portraiture, or invented characters. Use the selected style lane's concrete material/process language instead of generic art-poster adjectives.
   - Save the prompt package internally, but do not display it by default.

7. **Composite the wallpaper only when useful**
   - Use deterministic layout only for exact typography, failed model text, batch consistency, or both-variant workflows.
   - Use `scripts/create-wallpaper-html.mjs` to create an HTML layout when a visual image file exists.
   - Keep text sparse: title, original title, director/year, country or short curatorial phrase.

8. **Save outputs**
   - Save generated visual, wallpaper, prompt package, compact research notes, and manifest.
   - Follow `references/output-schema.md`.

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

- Size: infer from saved preference, current-screen detection, device-model lookup, or fallback `2560x1440`.
- Output directory: use saved/default path; ask only if writing there is impossible or user requests a different path.
- Text variants: default `with_text`; ask only when requested, risky, or ambiguous.
- Language: auto-detect from the user request; allow explicit override.
- Visual: original art-poster image, bolder than normal illustration by default.
- Tone: infer from the film's own cinematography and emotional register; do not default to dark, low-key, noir, desaturated, or gloomy palettes.
- Typography: generated directly in-image for speed when the user wants text and the model can handle it; deterministic post-layout remains available for precision.
- Prompt package: saved in the manifest/output folder; shown only for prompt-only mode, failure recovery, debugging, or explicit user request.
- Delivery: default to poster-first, low-token output.
- Interaction: quick defaults first; ask only for ambiguity, unavailable tools, external credentials, unsafe/blocked actions, or explicit user preference.
- Style: concrete style-lane-driven art direction, not photorealistic live-action and not generic AI illustration.
- Style range: draw from modern/contemporary art, classical and pre-modern art, regional traditions, experimental material processes, and controlled counterpoint. Avoid making every output a polished normal illustration.
- Style source: distill poster/design principles, not direct imitation of a single living artist.
- Style lane: every run must choose one concrete style lane; generic `fine-art poster` wording is not enough.
- Composition: overall poster design comes first; do not create large empty blank zones merely for future text.
- Film recognition: include a protagonist/character anchor when abstraction alone would make the film hard to identify.
- Character identity: if depicting a specific character, use a character identity lock and automatically acquired or user-provided image references when supported; do not rely on generic actor-name prompting.
- Character framing: prefer varied close portrait, three-quarter face, medium figure, pair, or ensemble strategies when useful; do not repeatedly hide characters as distant back-view figures.
- Preference memory: save changed defaults when the runtime supports local settings; ask only if persistent storage has privacy or location implications.
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
- realistic celebrity portraiture as the main appeal;
- invented character designs that do not match the film;
- cluttered desktop backgrounds.
- conventional illustration when the user asked for bolder art direction;
- obvious reserved blank space that weakens the poster composition;
- generated text with incorrect title, misspellings, wrong language, or unreadable letterforms.

## Resources

- `references/workflow.md`: concise user-guidance workflow.
- `references/device-size.md`: device resolution and wallpaper size lookup.
- `references/visual-brief.md`: brief structure and prompt rules.
- `references/film-tone.md`: film tone, palette, brightness, contrast, and color strategy.
- `references/model-routing.md`: generation-mode and provider selection.
- `references/style-distillation.md`: poster grammar and art-direction rules.
- `references/character-reference.md`: protagonist and character-anchor research rules.
- `references/artist-grammars.md`: distilled poster-artist grammars such as Huang Hai.
- `references/output-schema.md`: manifest and history schema.
- `scripts/create-wallpaper-html.mjs`: deterministic HTML compositor for visual + typography.
- `scripts/set-macos-wallpaper.mjs`: macOS desktop setter.
