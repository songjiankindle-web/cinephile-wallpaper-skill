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
- `auto`: choose the best available mode/provider from current defaults and capabilities.

Default routing order:

1. current agent image tool;
2. image skill/tool;
3. configured external API;
4. saved provider preference, if the user explicitly made it a default;
5. prompt-only.

Ask only when credentials are missing, multiple available paid providers have meaningful cost differences, or the user explicitly wants to choose.

If no image-generation capability is available, say exactly:

```text
您的agent没有生图能力，我可以为您提供对应的提示词，您可以自行在其他生图模型中使用。
```

Then provide one unified prompt. Do not generate HTML as a substitute for image generation.

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

- one unified prompt that includes visual direction, style lane, character reference instructions, typography instructions, constraints, and avoid-list.

Do not pretend an image was generated.

In image-generation modes, save these details but keep the user-facing final answer brief.

## Text Rendering Choice

For speed, prefer direct image-model text when:

- the user requested a text poster;
- the text is short;
- the selected model is known to render text reasonably;
- exact typography is less important than fast visual iteration.

Do not use HTML or deterministic post-layout to create the poster. If model text is poor, regenerate through the image model with shorter text or provide a no-text image and the unified prompt.

Record the selected text mode as:

```json
{
  "text_rendering_mode": "model_text | no_text | both"
}
```
