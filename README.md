# Cinephile Wallpaper Skill

Generate high-aesthetic, non-photorealistic posters and wallpapers from real film, TV, anime, tokusatsu, documentary, franchise, character, prop, and scene titles.

This is a cross-agent skill. It focuses on finished poster delivery, broad Chinese/English poster-request triggering, numbered one-turn setup, film/work-tone analysis, randomized art-history style routing, visual-density control, user-uploaded image references, character-reference anchoring, and prop/object/scene identity locks.

## Install

Copy the `cinephile-wallpaper` folder into your agent's skills directory.

For Codex-style skills:

```text
~/.codex/skills/cinephile-wallpaper
```

## Start

```text
请问你想生成哪部电影的海报壁纸？
```

## Version

v1.61 stable release.

Current v1.61 behavior:

- lighter `SKILL.md`: the main skill body is reduced from 220 lines to about 93 lines, while detailed rules stay in references and are loaded only when needed;
- design memory: learn and remember reusable user design ideas, custom art styles outside the built-in lanes, typography preferences, and avoid-lists when the user asks to save them;
- image-reference/design-request gate now reminds users that they can propose their own design ideas and ask the skill to remember the design for future runs;
- saved custom styles use `saved_custom_style`; user-provided new styles bypass random style drawing for that run, while unspecified styles still use independent random routing;
- broad trigger metadata for Chinese/English 海报, 电影海报, 影视海报, 角色海报, poster, and wallpaper requests, including TV/anime/tokusatsu works and characters such as “给我做一张《杰克奥特曼》的海报”;
- fixed opening prompt;
- no shortcut generation: when the initial request already includes a film title, the skill must still ask the numbered setup and image-reference/design-request gate before research or generation;
- fixed two-step guidance: ask base settings first, then ask image references/design requirements in a separate assistant turn; do not merge them;
- numbered one-turn setup with default memory for size, output folder, text mode, and generation mode;
- cross-conversation defaults: `scripts/preferences.mjs get` loads persistent setup defaults before the setup round, preferring `~/.codex/skills/cinephile-wallpaper/preferences.json` and remaining compatible with older output-folder preference files;
- text-mode setup is fixed to "with text / no text / both"; it must never be rewritten as Chinese-English bilingual or any fixed language pair;
- saved setup defaults are normalized before use, so legacy `中英双语` / `bilingual` text-mode values migrate to `with_text` and display as "带文字";
- LEGO-like or other branded material requests are translated into generic interlocking-plastic-brick art direction before image prompting, avoiding brand logos and official marks;
- installation art style lane with site-specific spatial installations, immersive light environments, found-object sculptural installations, and suspended architectural interventions;
- randomized `style_lane` and `style_variant` selection unless the user specifies a style;
- style selection is decoupled from film content: draw the style first with the weighted router, then bridge the film into that style; do not choose or explain style as "suitable for the film";
- random style selection now uses `cinephile-wallpaper/scripts/draw-style.mjs`, a film-input-free draw script that records random source, rolls, effective weights, and `film_inputs_used_for_style: false`;
- image references are identity-only anchors: character references preserve likeness and role identity, but pose, expression, scale, placement, lighting, and composition must be redesigned;
- the selected art style must transform characters themselves, not only backgrounds or props;
- scripted visual-density routing via `scripts/draw-density.mjs` across `dense`, `balanced`, `sparse`, and `single_stroke`;
- higher minimal-density baseline: neutral `sparse + single_stroke` is 55%, with recent high-density suppression when outputs skew too full;
- script history cache defaults to a writable working-directory cache instead of the installed skill directory; `CINEPHILE_CACHE_DIR` and explicit `--history` are supported;
- current-screen detection cannot invent dimensions from old runs when no concrete pixel size is exposed;
- image-tool refusals are capped: one safe rewrite, then honest fallback to no-text abstract homage or prompt-only for the blocked variant;
- real-object still-life lane for exact film props, with no recognizable faces;
- intentional negative space and one-point-focus poster logic, without confusing it with dead blank title areas;
- expanded classic art-history variants including impressionism, cubism, Chinese ink, and minimalism;
- fresh generation for every request unless the user explicitly asks to retrieve an old file;
- image-model poster generation only, with one unified prompt fallback when the agent has no image capability;
- image-reference gate before image generation: ask the user whether to upload images they want represented in the poster, including but not limited to characters, props, and scenes;
- character appearance workflow: if the user wants recognizable characters, use uploaded character stills/photos first and attach them as authoritative references;
- character reference-image workflow: use uploaded/acquired real stills or crops and attach them to image generation before claiming face restoration;
- key prop/object reference gates to avoid wrong film objects.

Version archive:

- `v0.99a`: previous release candidate before the required user-uploaded character-reference gate.
- `v0.99b`: release candidate with the character appearance gate and uploaded-reference-first workflow.
- `v1.0`: stable release with the broader image-reference gate for characters, props, and scenes.
- `v1.01`: stable bugfix release that prevents direct film-title requests from skipping the guided setup flow.
- `v1.02`: stable bugfix release that hardens random style routing and forbids suitability-based style choice explanations.
- `v1.03`: stable release carrying forward two-step guidance, independent style draw, identity-only references, strong character stylization, and broad poster-request trigger metadata.
- `v1.04`: stable release keeping v1.03 behavior while making the main skill more compact and token-efficient.
- `v1.5`: stable release adding design memory and custom style memory.
- `v1.6`: stable release adding scripted visual-density draw with a stronger minimal baseline and high-density recent-run correction.
- `v1.61`: current stable release adding the `installation_art` style lane only.

See `docs/迷影桌面 PRD v1.61.md` for the product spec.
