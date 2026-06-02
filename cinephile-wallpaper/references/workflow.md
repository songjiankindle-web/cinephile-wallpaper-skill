# Workflow Reference

## Guided Flow

1. If the user has not provided a work title, character, prop, scene, or URL, start with exactly: `请问你想生成哪部电影的海报壁纸？`
2. If the user already provided a work/character/prop/scene name, treat the identity step as answered, resolve ambiguity if needed, and continue to setup. Do not start generation from the initial request alone.
3. Ask one numbered setup message:
   - size/device, with saved size as default if available;
   - output directory, with saved directory as default if available;
   - text mode: with text, no text, or both;
   - generation mode: current image tool, image skill/tool, external API, or prompt-only;
   - whether to remember changed size/output defaults.
4. After the user answers setup, ask the image-reference/design-request gate as a separate assistant turn before research or image generation.
5. If a device model is provided, look up the screen resolution; see `device-size.md`.
6. Research the work, tone references, style references, and character/prop/scene references.
7. Write a visual brief that distills the work into a symbolic poster concept with tonal specificity, character variety, and a bold art-language strategy.
8. Write and save one unified prompt package internally.
9. Generate the poster through an image model if available.
10. If no image model is available, show the no-image-capability notice and return one unified prompt.
11. Save manifest and outputs.
12. Set the current desktop wallpaper only if explicitly requested or saved as a default.
13. Final reply should be poster-first and brief: image/path(s), success status, and optional next action. Do not paste research or manifest unless requested.

## Ambiguous Film

If multiple films share the title, ask a concise clarification with year/director candidates. Do not continue with an arbitrary choice.

## Language

Default to the user's language as detected from the request. If the user specifies a language, use that language for:

- agent replies;
- visual brief headings;
- prompt package explanations only when the user requests prompts or when prompt-only mode is selected;
- layout text, except original film titles or proper nouns.

Keep the actual image prompt portable. It may be in the user's language or English depending on the selected model; if using English for better model performance, also provide a short explanation in the user's language.

## One-Turn Setup Prompt

After the work identity is confirmed, ask the base settings in one turn. This is mandatory even if the initial user message already included a title, style, or "generate now" wording. Use line breaks and numbering so first-time users can answer quickly. Include saved defaults if available. Do not include the image-reference/design-request question here.

```text
请一次确认下面 5 项设置：
1. 您想生成的海报/壁纸尺寸是多少？如果不知道具体分辨率，也可以告诉我目标设备型号或“当前电脑桌面”。
2. 文件生成后想保存到哪个本地文件夹？如果沿用默认位置，请直接说“默认”。
3. 您想要哪种版本：带文字、无文字，还是两者都要？
4. 生图方式选择哪一种：使用当前 agent 的生图能力、外部 API/生图工具，还是只要提示词？
5. 是否把以上四项都记为默认设置，方便下次沿用？
```

Adapt this to the user's language. Do not split these five base settings into several separate turns unless a required answer is missing or ambiguous. Also do not append the image-reference/design-request gate to this setup prompt; it is the next separate assistant turn.

## Image Reference Gate

After the base setup is answered and before research/generation, ask one concise question. This gate is mandatory as a separate assistant turn:

```text
是否上传您想呈现在海报中的形象图片？包括但不限于角色、道具、场景等。如果上传，我会用它锚定人物长相、道具形态、场景氛围或其他视觉细节；如果不上传，我会根据影片自行判断画面中应出现什么以及如何设计。

你也可以在这一轮顺手补充简单设计需求，例如指定美术风格、想出现的元素/道具、人物呈现方式、色调氛围、构图偏好，或不希望出现的内容；如果你提出了新的设计想法或未内置的美术风格，也可以告诉我是否记住这次设计，方便以后继续使用。如果没有特别需求，请说“无特别需求”，我将由 AI 自主决策设计。
```

Adapt this to the user's language. Do not merge this with the one-turn base setup. If the user volunteered reference/design preferences while answering setup, carry that information forward, but still present this gate as the second guided turn and ask whether they want to add or change anything.

Parse any design requirements from this same reply. Do not add a separate design-brief confirmation unless the requirement is contradictory, unsafe, or impossible with the selected generation mode. If the user gives a reusable design idea, new art style, typography preference, or avoid-list and asks to remember it, read `design-memory.md` and save a compact design-memory entry. If the user says there are no special requirements or leaves this part blank, record `user_design_request.provided: false` and `ai_autonomous_design: true`.

## No Shortcut Generation

Never treat an initial request like "给我生成一个《某电影》的海报" or "给我做一张《杰克奥特曼》的海报" as permission to generate immediately. It only supplies the work identity. The next assistant response must be the one-turn setup, or ambiguity clarification if the identity is unclear. After setup is answered, the next assistant response must be the separate image-reference/design-request gate. Research, prompt writing, image generation, file saving, and wallpaper setting are all blocked until both guided turns are complete.

If the user uploads or says they want to use image references:

- require at least one uploaded or locally acquired image file before claiming precise restoration of any character face, prop form, or scene detail;
- prefer in-character stills/screenshots over actor publicity photos;
- ask the user to label images when multiple characters appear;
- accept one image per key character/prop/scene, or one clear group image if the intended subjects are obvious;
- use uploaded images as priority-1 references for the current run;
- attach the reference image files to the image-generation call when the selected model supports references.

If the user wants accurate face/character restoration but has not uploaded a usable image, ask briefly:

```text
如果想精准还原演员/角色脸部，请上传一张包含该角色的形象图片；如果不上传，我会继续用背影、剪影、局部、服装姿态或影子等不露脸人物方式来设计。
```

Do not block the whole poster only because no reference was uploaded. The hard restriction is on readable face restoration, not on all human presence.

If the user does not upload references, let the skill decide whether people should appear. It may use props, atmosphere, abstract symbols, typography, landscape, architecture, body fragments, non-face silhouettes, back views, side views, or partial figures. Do not say this means "no people"; it means "no real-face reference restoration."

## Desktop Confirmation

After a wallpaper file exists, set it as the desktop only if the user explicitly requested it or saved that preference. Otherwise do not ask every run. Continue the flow:

1. Save prompt package internally.
2. Generate or receive visual.
3. Run the setter only when already requested.
4. Reply with the finished poster path(s), not the intermediate documents.

## Output Directory

Confirm the output directory in the one-turn setup. Use a concrete absolute path in local environments.

Default:

```text
CinephileWallpaper/
├── outputs/YYYY/MM/
└── settings/preferences.json
```

Use absolute paths in final responses when running locally.

## Preference Memory

If the host agent supports persistent local settings, load saved preferences before asking repetitive setup questions. Still let the user override them.

Remember changed defaults automatically when the runtime supports local settings and the storage path is already approved. Ask only when storing preferences in a new user-visible location.

- default wallpaper/poster width and height;
- default size source or device model;
- default output directory;
- default text variant;
- default generation mode.
- reusable design ideas, custom style profiles, typography preferences, and avoid-lists when the user asks to remember them.

The four base setup fields all support memory: size/device, output directory, text variant, and generation mode. On the next run, show the saved defaults in the numbered setup prompt and allow the user to answer `全部默认` / `use all defaults`. If the user only changes one field, keep the other saved defaults.

Setup preference memory is separate from design memory. Show setup defaults in the base-settings turn; show saved design/style preferences only in the image-reference/design-request turn. Do not use previous generated posters as cache entries, and do not return an old file when the user asks to generate a work again.

Suggested preference path for local agents:

```text
CinephileWallpaper/settings/preferences.json
```

If no persistent storage is available, explain briefly that defaults cannot be remembered in this agent, then continue normally.

## Wallpaper Size

Confirm intended size in the one-turn setup. Accept:

- exact dimensions, such as `3840x2160`;
- aspect ratio, such as `16:9 poster`;
- device class, such as desktop or phone;
- device model, such as `iPhone 15 Pro`.

Prefer device-model lookup for phones/tablets because current screen APIs often do not reflect the target device.

Use auto-detection only when the user wants the current machine's wallpaper:

- macOS: `system_profiler SPDisplaysDataType` or a host-provided screen API.
- Browser/agent runtime: viewport or screen API if it reflects the actual display.
- Headless/remote environments: ask the user or use fallback.

Record the source in the manifest:

- `user`
- `device_lookup`
- `detected_current_screen`
- `default`

## Text Variants

Ask in the one-turn setup:

```text
您想要哪种版本：带文字、无文字，还是两者都要？带文字版会由生图模型直接完成文字排版。
```

Translate into the user's language. If the user chooses both, save both and record both output paths.

## Text Rendering Modes

Use one of:

- `model_text`: the image model generates title and metadata directly in the poster. Fastest. Use for normal runs when the selected model can render text acceptably. The text must be designed lettering integrated into the poster, not a generic font overlay.
- `no_text`: prompt explicitly requests no text, no logos, no credits.
- `both`: produce no-text and text versions; prefer `model_text` for the text version unless accuracy fails.

For `model_text`, provide exact short strings:

- Chinese title;
- original title;
- director/year;
- country/region.

If generated text is wrong or ugly, do not pretend it is acceptable. Regenerate with shorter in-image text or provide a no-text version plus the unified prompt. Do not switch to HTML generation.

If generated typography looks ordinary, like a default font, database card, subtitle, or pasted label, treat it as a design failure and retry with stronger custom-lettering instructions.

## Out of Scope

Do not build timed wallpaper rotation into this skill. Windows and macOS already support timed wallpaper changes. The skill's job is to create high-quality image files.

## Token Budget

Default to concise operation:

- do not narrate research unless needed for a decision;
- do not paste long source summaries;
- do not show visual briefs, manifest JSON, negative prompts, or model notes unless requested;
- save prompt packages and manifests to disk for reproducibility;
- surface only blockers, final image paths, and short quality notes.

Show the full prompt package only when:

- user selects prompt-only mode;
- no image can be generated;
- the user asks to copy/edit the prompt;
- debugging a failed or unsatisfactory generation.
