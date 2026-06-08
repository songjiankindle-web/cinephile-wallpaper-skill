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

For posters that visibly include real actor/performer characters, route to a model/tool that supports image references. If the current image tool cannot attach character stills/crops, it cannot satisfy character-face restoration. In that case, ask for a reference-image-capable model/API/tool, ask the user to choose a non-face strategy, or provide a prompt/reference checklist without claiming restoration.

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

## Image Tool Refusals

If the image tool refuses a request involving a known title, franchise, character, logo, or exact in-image title text:

1. Make at most one safer rewrite that removes protected-looking character likeness, logos, insignia, and official-poster replication language while preserving an original abstract homage.
2. If the second attempt is refused, stop image attempts for that variant. Do not keep probing with repeated minor wording changes.
3. If a no-text abstract background is likely acceptable, generate only that variant and label it honestly as a no-text abstract homage.
4. For the blocked text/title variant, provide the unified prompt package or suggest an external image model; do not pretend the text poster was generated.
5. Record the refusal and fallback in the manifest, but keep the user-facing final response concise.

Do not expose internal trial-and-error narration such as "first attempt failed, second attempt failed" unless the user asks for debugging details.

## Image Tool Server Errors

Treat provider/server failures separately from safety refusals.

Classify image-generation failures as:

- `server_error`: 5xx errors, service unavailable, overloaded, timeout, transport reset, TLS/DNS failure, empty tool response, or generic "server exception";
- `rate_limited`: 429, quota throttling, too many requests, retry-after responses;
- `auth_or_quota`: missing key, invalid key, insufficient credits, billing/quota exhausted;
- `prompt_too_large`: prompt, attachment set, or image references exceed the provider limit;
- `safety_refusal`: explicit safety/policy/copyright/trademark/likeness refusal;
- `unknown_error`: no usable error detail.

Rules:

1. Do not call a `server_error` a refusal, copyright block, or content problem.
2. For `server_error`, retry the same variant up to three total attempts with shorter prompt text and increasing delay when the runtime allows it. Preserve hard constraints; shorten decorative prose first.
3. For `rate_limited`, wait if the provider gives a retry interval; otherwise stop after one retry and tell the user it is throttling.
4. For `prompt_too_large`, compact the prompt and reduce nonessential metadata before retrying.
5. For `auth_or_quota`, stop and ask the user to fix credentials/quota or choose prompt-only.
6. Only ask the user to switch to CLI/API/external provider when they selected that route, the current provider is unavailable after retries, or credentials are missing. Do not say user consent is required for CLI/API merely because the built-in image tool had a transient server error.
7. Always save a failure manifest or run record with `error_category`, provider/tool name, attempt count, retry action, and delivered fallback. If no image was created, final output may be prompt-only, but it must say image generation failed due to provider/server availability.

User-facing language for unresolved server errors should be concise:

```text
图像服务当前返回服务端异常，不是版权拒绝，也不是提示词内容被拦截。我已重试并保存提示词；可以稍后重试，或切换到你配置的外部生图模型。
```

## Brand And Franchise Risk Reduction

When a user asks for a branded toy/material style such as LEGO-like bricks, do not put the protected brand name, brand logo, official packaging, or trademarked marks into the image prompt. Translate it to generic art direction:

```text
interlocking plastic toy bricks, visible studs, plates, bevels, translucent plastic pieces, miniature brick-built diorama
```

If the request also names a major film/franchise/character, reduce refusal risk before the first image attempt:

- avoid official logos, exact insignia, copyrighted emblems, and official poster replication language;
- avoid actor likeness unless actual reference images are attached and the selected model supports them;
- describe roles through generic costume silhouettes, color logic, props, posture, and scene grammar;
- for text variants, keep only the minimal requested title text and do not include long metadata unless necessary;
- if the first attempt is refused, the safer rewrite should remove exact character names from the image prompt where possible and use role descriptors instead.

Record the original user wording in notes if useful, but the image prompt should use the safer generic wording.

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
