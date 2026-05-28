# Model Routing

## Generation Modes

Use one of these modes:

```json
{
  "generation_mode": "agent_image_tool | image_skill | external_api | prompt_only | auto"
}
```

- `agent_image_tool`: use the current agent's image generation capability.
- `image_skill`: call a separate image-generation skill/tool if the host has one.
- `external_api`: use a user-configured image model API.
- `prompt_only`: return prompt package and stop before image generation.
- `auto`: reuse a previously chosen mode/provider for future runs.

Default routing order:

1. saved `auto` provider;
2. current agent image tool;
3. image skill/tool;
4. configured external API;
5. prompt-only.

Ask only when credentials are missing, multiple available paid providers have meaningful cost differences, or the user explicitly wants to choose.

## Codex / OpenAI Notes

Do not assume a Codex skill automatically uses a specific image model. A skill can only use image tools exposed by the host environment.

If using OpenAI image generation directly, current official docs list GPT Image models including `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`. In the Responses API image-generation tool, the mainline model is not the image model; the tool uses a GPT Image model internally.

Do not hard-code a model as universal. Record the selected provider/model in the manifest.

## External API Setup

If using `external_api`, read from saved settings/env when possible. Ask only for missing:

- provider name;
- endpoint or SDK;
- model name;
- API key location, preferably environment variable;
- size/quality parameters;
- output directory if no output path was already selected.

Never ask the user to paste secrets into durable project files.

## Prompt-Only Mode

In prompt-only mode only, return:

- visual brief;
- image prompt;
- negative prompt;
- layout notes;
- suggested model settings.

Do not pretend an image was generated.

In image-generation modes, save these details but keep the user-facing final answer brief.

## Text Rendering Choice

For speed, prefer direct image-model text when:

- the user requested a text poster;
- the text is short;
- the selected model is known to render text reasonably;
- exact typography is less important than fast visual iteration.

Use deterministic post-layout when:

- the user requests exact text;
- the title/original title is long or multilingual;
- generated text is misspelled, unreadable, or in the wrong language;
- the workflow needs consistent batch typography.

Record the selected text mode as:

```json
{
  "text_rendering_mode": "model_text | no_text | post_layout | both"
}
```
