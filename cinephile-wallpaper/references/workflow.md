# Workflow Reference

## Guided Flow

1. Start with: `请告诉我您想看到哪部电影的海报？` or the equivalent in the user's language.
2. Resolve film ambiguity if needed.
3. Use quick defaults and ask only for missing decisions that cannot be inferred:
   - size: saved preference, detected current screen, or fallback `2560x1440`;
   - output directory: saved preference or `CinephileWallpaper/outputs/YYYY/MM`;
   - text mode: default `with_text`;
   - generation mode: current image tool, image skill/tool, external API if configured, or prompt-only;
   - remember defaults only when the user explicitly asks or changes a setting.
4. If a device model is provided, look up the screen resolution; see `device-size.md`.
5. Research the film, film-tone references, style references, and character references.
6. Write a visual brief that distills the film into a symbolic poster concept with tonal specificity, character variety, and a bold art-language strategy.
7. Write and save the prompt package internally.
8. Generate or request the main visual if the chosen mode continues past prompt-only.
9. Use direct in-image text for speed when requested and reliable; use deterministic composition only for exact text or failed model text.
10. Save manifest and outputs.
11. Set the current desktop wallpaper only if explicitly requested or saved as a default.
12. Final reply should be poster-first and brief: image/path(s), success status, and optional next action. Do not paste research, manifest, or prompts unless requested.

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

After the film is confirmed, do not ask setup questions if defaults or saved preferences are usable. If required information is missing, ask only once:

```text
我可以直接按默认设置生成：当前/默认尺寸、默认保存位置、带文字版、可用生图工具。若要改，请一次告诉我：尺寸/设备、保存位置、文字版本、生图方式。
```

Adapt this to the user's language. Do not split these into several separate turns unless a required answer is missing or ambiguous.

## Desktop Confirmation

After a wallpaper file exists, set it as the desktop only if the user explicitly requested it or saved that preference. Otherwise do not ask every run. Continue the flow:

1. Save prompt package internally.
2. Generate or receive visual.
3. Composite wallpaper only if useful.
4. Run the setter only when already requested.
5. Reply with the finished poster path(s), not the intermediate documents.

## Output Directory

Before writing files, use a saved/default output directory unless the user already provided another path. Ask only if the path is unavailable or unsafe. Use a concrete absolute path in local environments.

Default:

```text
CinephileWallpaper/
├── outputs/YYYY/MM/
└── history/history.json
```

Use absolute paths in final responses when running locally.

## Preference Memory

If the host agent supports persistent local settings, load saved preferences before asking repetitive setup questions. Still let the user override them.

Remember changed defaults automatically when the runtime supports local settings and the storage path is already approved. Ask only when storing preferences in a new user-visible location.

- default wallpaper/poster width and height;
- default size source or device model;
- default output directory;
- default text variant;
- default generation mode, if the user asks for automatic future behavior.

Suggested preference path for local agents:

```text
CinephileWallpaper/settings/preferences.json
```

If no persistent storage is available, explain briefly that defaults cannot be remembered in this agent, then continue normally.

## Wallpaper Size

Do not ask for intended size by default. Prefer saved preference, detected current screen, device lookup, or fallback `2560x1440`. Accept:

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

Ask only when the default `with_text` is not appropriate or the user asks to choose:

```text
您想要哪种版本：带文字、无文字，还是两者都要？带文字版可以优先由生图模型直接生成；如果你需要绝对准确文字，我再走后期排版。
```

Translate into the user's language. If the user chooses both, save both and record both output paths.

## Text Rendering Modes

Use one of:

- `model_text`: the image model generates title and metadata directly in the poster. Fastest. Use for normal runs when the selected model can render text acceptably.
- `no_text`: prompt explicitly requests no text, no logos, no credits.
- `post_layout`: generate a no-text visual, then add text with deterministic layout. Use when exact spelling, batch consistency, or typography precision matters.
- `both`: produce no-text and text versions; prefer `model_text` for the text version unless accuracy fails.

For `model_text`, provide exact short strings:

- Chinese title;
- original title;
- director/year;
- country/region.

If generated text is wrong or ugly, do not pretend it is acceptable. Either regenerate with shorter text or switch to `post_layout`.

For `post_layout`, do not alter the base poster image globally. Text may use shadows, outlines, small local backgrounds, or careful placement, but must not add a full-canvas dark overlay, dimming filter, or global gradient.

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
