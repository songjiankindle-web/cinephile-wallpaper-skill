# Workflow Reference

## Guided Flow

1. Start with exactly: `请问你想生成哪部电影的海报壁纸？`
2. Resolve film ambiguity if needed.
3. Ask one numbered setup message:
   - size/device, with saved size as default if available;
   - output directory, with saved directory as default if available;
   - text mode: with text, no text, or both;
   - generation mode: current image tool, image skill/tool, external API, or prompt-only;
   - whether to remember changed size/output defaults.
4. If a device model is provided, look up the screen resolution; see `device-size.md`.
5. Research the film, film-tone references, style references, and character references.
6. Write a visual brief that distills the film into a symbolic poster concept with tonal specificity, character variety, and a bold art-language strategy.
7. Write and save one unified prompt package internally.
8. Generate the poster through an image model if available.
9. If no image model is available, show the no-image-capability notice and return one unified prompt.
10. Save manifest and outputs.
11. Set the current desktop wallpaper only if explicitly requested or saved as a default.
12. Final reply should be poster-first and brief: image/path(s), success status, and optional next action. Do not paste research or manifest unless requested.

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

After the film is confirmed, ask the base settings in one turn. Use line breaks and numbering so first-time users can answer quickly. Include saved defaults if available:

```text
请一次确认下面 5 项设置：
1. 您想生成的海报/壁纸尺寸是多少？如果不知道具体分辨率，也可以告诉我目标设备型号或“当前电脑桌面”。
2. 文件生成后想保存到哪个本地文件夹？如果沿用默认位置，请直接说“默认”。
3. 您想要哪种版本：带文字、无文字，还是两者都要？
4. 生图方式选择哪一种：使用当前 agent 的生图能力、外部 API/生图工具，还是只要提示词？
5. 是否把以上四项都记为默认设置，方便下次沿用？
```

Adapt this to the user's language. Do not split these into several separate turns unless a required answer is missing or ambiguous.

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

The four base setup fields all support memory: size/device, output directory, text variant, and generation mode. On the next run, show the saved defaults in the numbered setup prompt and allow the user to answer `全部默认` / `use all defaults`. If the user only changes one field, keep the other saved defaults.

Preference memory is only for setup defaults. Do not use previous generated posters as cache entries, and do not return an old file when the user asks to generate a film again.

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

- `model_text`: the image model generates title and metadata directly in the poster. Fastest. Use for normal runs when the selected model can render text acceptably.
- `no_text`: prompt explicitly requests no text, no logos, no credits.
- `both`: produce no-text and text versions; prefer `model_text` for the text version unless accuracy fails.

For `model_text`, provide exact short strings:

- Chinese title;
- original title;
- director/year;
- country/region.

If generated text is wrong or ugly, do not pretend it is acceptable. Regenerate with shorter in-image text or provide a no-text version plus the unified prompt. Do not switch to HTML generation.

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
