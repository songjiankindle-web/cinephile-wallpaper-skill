---
name: cinephile-wallpaper
description: "Generate original high-aesthetic posters and wallpapers for films, TV series, animation, anime, tokusatsu, documentaries, shorts, franchises, characters, props, and scenes. Use for Chinese or English requests to make/generate/create a 海报, 电影海报, 影视海报, 角色海报, poster, wallpaper, or device wallpaper for a named audiovisual work or character, e.g. “给我做一张《杰克奥特曼》的海报”. Always run the fixed guided flow: confirm work identity, ask base settings in one turn, ask image references/design requirements in a second turn, then generate via an image model or provide one unified prompt if no image capability exists."
---

# Cinephile Wallpaper

## Core Idea

Turn a real audiovisual work, character, prop, or scene into an original art-poster wallpaper. Use image generation as the poster-making path. Do not scrape or copy existing posters, do not use HTML/CSS as the poster renderer, and do not deliver old cached outputs unless explicitly asked.

## Opening And Mandatory Gates

If the user has not provided a work title, character, prop, scene, or URL, start with exactly this one sentence and nothing else:

```text
请问你想生成哪部电影的海报壁纸？
```

Do not introduce the skill, list features, explain usage, ask about style, or add examples before this sentence.

If the triggering message already names a work/character/prop/scene, do not ask for it again. Resolve ambiguity if needed, then immediately ask the numbered one-turn base settings. Never research, write a prompt, call an image model, or generate from the first user message alone.

Hard gate: generation is allowed only after these are complete:

1. work identity is known and ambiguity is resolved;
2. base settings are answered or explicitly accepted as saved defaults;
3. the separate image-reference/design-request gate is answered or explicitly skipped.

The base-settings prompt and the image-reference/design-request prompt are two separate assistant turns. Do not merge them.

## Workflow

1. Read `references/workflow.md` for the guided flow, setup prompt, image-reference gate, preference memory, output directory, text variants, and low-token final response.
2. Before asking setup, load cross-conversation defaults with `scripts/preferences.mjs get` when local script execution is available.
3. Confirm the work identity. If ambiguous, ask a concise clarification. If already provided, move to base settings.
4. Ask the one-turn base settings. It must include only size/device, output folder, text variant, generation mode, and whether to remember defaults.
5. After base settings are answered, ask the separate image-reference/design-request gate. Do not merge it with base settings.
6. Only after both gates are complete, research the work enough to verify identity, tone, core characters, props, motifs, and recognition anchors.
7. If no user-specified style exists, run `scripts/draw-style.mjs` before work interpretation affects style. Use the returned style exactly; work content may shape elements and metaphor, not style choice.
8. Run `scripts/draw-density.mjs` after identifying the work profile, then build a concise visual brief using the relevant reference files listed below.
9. Route generation through an image model when available; otherwise return one unified copyable prompt. Never substitute HTML for image generation.
10. Save output image(s), compact prompt package, research notes, and manifest. Follow `references/output-schema.md`.
11. Final response is poster-first: show/link the image path(s) and one short status line. Do not paste research, visual brief, manifest, or prompt unless requested or prompt-only mode is used.

## Non-Negotiables

- Auto-detect interaction language; honor explicit output language.
- Ask only the two mandatory setup turns before research/generation.
- Remember defaults for size/device, output folder, text variant, and generation mode when the user asks or the runtime supports it.
- Cross-conversation defaults must be loaded from persistent JSON before setup, not inferred from chat history.
- Normalize saved defaults before using them; never display or save `中英双语`/`bilingual` as a text variant.
- Remember reusable user design ideas, custom styles, typography preferences, and avoid-lists when the user asks to save them.
- In the base-settings prompt, the text-variant question is only about output variants: with text, no text, or both. Never rewrite it as a language choice such as "Chinese-English bilingual" or any fixed language pair.
- Generate text directly inside the image model when text is requested; keep typography designed, short, and integrated.
- Do not darken or globally filter text versions just to improve text readability.
- Default style selection is weighted random and decoupled from work content. Never explain style as "suitable" for the work unless the user specified it.
- Visual density must be selected by `scripts/draw-density.mjs`; use its mode and prompt instruction exactly.
- If depicting recognizable real actor/performer faces, attach actual image references; actor names and descriptions are not enough.
- Uploaded references are identity/shape/atmosphere anchors, not compositing layers. Redesign pose, scale, placement, expression, lighting, and composition.
- Without usable face references, characters may still appear through non-face strategies; do not invent readable substitute faces.
- Film-specific props require prop identity locks and visual references when prominent.
- Every request creates a fresh generation unless the user explicitly asks for an old file.
- Keep user-facing output brief and save details to files.
- Do not expose internal command counts, sandbox/cache failures, or repeated image-refusal retries unless the user asks for debugging details.
- If current screen resolution cannot be concretely detected, use a saved confirmed default or ask; do not infer from previous runs.
- If an image tool refuses a title/character/text variant twice, stop retrying that variant and fall back honestly.
- For branded material styles such as LEGO-like bricks, use generic material language in image prompts and avoid brand logos or official marks.

## Quality Bar

Reject or revise outputs that look like:

- generic streaming thumbnails;
- official poster copies;
- text-heavy film database cards;
- low-effort AI fantasy art;
- illegible or ordinary model-generated lettering;
- live-action photorealism;
- copied-still photorealism or celebrity glamour portraiture;
- pasted/cutout-looking reference-image figures, traced poses, copied lighting, copied background, or poster designs that visibly reuse the uploaded reference image as a source layer;
- claiming character-face restoration without attached still/crop reference images;
- generating readable actor/character faces after the user requested characters but no uploaded/acquired reference image can be attached;
- invented character designs that do not match the work;
- cluttered desktop backgrounds;
- conventional illustration when the user asked for bolder art direction;
- obvious reserved blank space that weakens the poster composition;
- visually exhausting all-over element coverage;
- generated text with incorrect title, wrong language, misspellings, or pasted-on default typography.

## Resources

- Read `references/workflow.md` at the start of each run.
- Read `references/design-memory.md` when the user provides design ideas, custom styles, or asks to remember preferences.
- Read `references/device-size.md` only for device-size lookup.
- Read `references/model-routing.md` before generation-mode/provider decisions.
- Read `references/visual-brief.md` when writing the brief; run `scripts/draw-density.mjs` for density selection.
- Read `references/film-tone.md` before palette, brightness, contrast, color temperature, or medium decisions.
- Read `references/style-distillation.md` before style routing/prompting; run `scripts/draw-style.mjs` when style is not user-specified.
- Read `references/character-reference.md` when characters, props, or scene/object identity need visual anchoring.
- Read `references/artist-grammars.md` only when a stronger poster-design grammar is needed.
- Read `references/output-schema.md` when saving outputs.
- `scripts/set-macos-wallpaper.mjs`: macOS desktop setter.
